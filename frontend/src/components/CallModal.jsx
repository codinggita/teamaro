import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff } from 'lucide-react';

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
  ],
};

const CallModal = ({ socket, user }) => {
  const [callState, setCallState] = useState('IDLE');
  const [callType, setCallType] = useState(null);
  const [remoteInfo, setRemoteInfo] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);

  // Refs mirror state so async callbacks always get latest values
  const callTypeRef = useRef(null);
  const callStateRef = useRef('IDLE');
  const remoteInfoRef = useRef(null);
  const localStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);

  // Video element refs — always mounted in DOM so they're ready before streams arrive
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const setCallTypeSynced = (val) => { callTypeRef.current = val; setCallType(val); };
  const setCallStateSynced = (val) => { callStateRef.current = val; setCallState(val); };
  const setRemoteInfoSynced = (val) => { remoteInfoRef.current = val; setRemoteInfo(val); };

  // ── Attach local stream to video element whenever stream or state changes ──
  useEffect(() => {
    if (localVideoRef.current && localStreamRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }
  }, [callState]); // re-run when state flips to IN_CALL (video element becomes visible)

  // ── Cleanup ────────────────────────────────────────────────────────────────
  const cleanup = useCallback(() => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(t => t.stop());
      localStreamRef.current = null;
    }
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    callTypeRef.current = null;
    callStateRef.current = 'IDLE';
    remoteInfoRef.current = null;
    setCallState('IDLE');
    setCallType(null);
    setRemoteInfo(null);
    setIsMuted(false);
    setIsCamOff(false);
  }, []);

  // ── Get local camera/mic stream ────────────────────────────────────────────
  const getLocalStream = useCallback(async (type) => {
    try {
      const constraints = {
        audio: true,
        video: type === 'video'
          ? { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' }
          : false,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      localStreamRef.current = stream;

      // Attach immediately if ref is ready; the useEffect above handles the late case
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      return stream;
    } catch (err) {
      console.error('[Call] Camera/mic access denied:', err);
      throw err;
    }
  }, []);

  // ── Build RTCPeerConnection ────────────────────────────────────────────────
  const createPeerConnection = useCallback((targetSocketId) => {
    const pc = new RTCPeerConnection(ICE_SERVERS);
    peerConnectionRef.current = pc;

    pc.onicecandidate = ({ candidate }) => {
      if (candidate) {
        socket.emit('webrtc:ice-candidate', { candidate, targetSocketId });
      }
    };

    // When remote stream tracks arrive, attach to remoteVideoRef
    pc.ontrack = (event) => {
      console.log('[WebRTC] Remote track received:', event.streams);
      if (remoteVideoRef.current && event.streams[0]) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    pc.onconnectionstatechange = () => {
      console.log('[WebRTC] Peer connection state:', pc.connectionState);
    };

    pc.oniceconnectionstatechange = () => {
      console.log('[WebRTC] ICE connection state:', pc.iceConnectionState);
    };

    return pc;
  }, [socket]);

  // ── All socket listeners — mounted ONCE ───────────────────────────────────
  useEffect(() => {
    if (!socket) return;

    const onIncoming = ({ callType: type, callerName, callerSocketId }) => {
      console.log('[Call] Incoming from', callerName, 'type:', type);
      if (callStateRef.current !== 'IDLE') return;
      setCallTypeSynced(type);
      setRemoteInfoSynced({ name: callerName, socketId: callerSocketId });
      setCallStateSynced('RINGING_IN');
    };

    const onAccepted = async ({ accepterSocketId, accepterName }) => {
      console.log('[Call] Accepted by', accepterName);
      setRemoteInfoSynced({ name: accepterName, socketId: accepterSocketId });
      const type = callTypeRef.current;
      try {
        const stream = await getLocalStream(type);
        const pc = createPeerConnection(accepterSocketId);
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('webrtc:offer', { offer, targetSocketId: accepterSocketId });
        setCallStateSynced('IN_CALL');
      } catch (err) {
        console.error('[Call] Offer creation failed:', err);
        cleanup();
      }
    };

    const onDeclined = ({ declinerName }) => {
      console.log('[Call] Declined by', declinerName);
      cleanup();
    };

    const onOffer = async ({ offer, senderSocketId }) => {
      console.log('[Call] Received WebRTC offer from', senderSocketId);
      const type = callTypeRef.current;
      try {
        const stream = await getLocalStream(type);
        const pc = createPeerConnection(senderSocketId);
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('webrtc:answer', { answer, targetSocketId: senderSocketId });
        setCallStateSynced('IN_CALL');
      } catch (err) {
        console.error('[Call] Offer handling failed:', err);
        cleanup();
      }
    };

    const onAnswer = async ({ answer }) => {
      console.log('[Call] Received WebRTC answer');
      try {
        if (peerConnectionRef.current) {
          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        }
      } catch (err) {
        console.error('[Call] Setting remote description failed:', err);
      }
    };

    const onIceCandidate = async ({ candidate }) => {
      try {
        if (peerConnectionRef.current && candidate) {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
      } catch (err) {
        console.error('[Call] ICE candidate error:', err);
      }
    };

    const onEnded = () => {
      console.log('[Call] Remote ended call');
      cleanup();
    };

    socket.on('call:incoming', onIncoming);
    socket.on('call:accepted', onAccepted);
    socket.on('call:declined', onDeclined);
    socket.on('webrtc:offer', onOffer);
    socket.on('webrtc:answer', onAnswer);
    socket.on('webrtc:ice-candidate', onIceCandidate);
    socket.on('call:ended', onEnded);

    return () => {
      socket.off('call:incoming', onIncoming);
      socket.off('call:accepted', onAccepted);
      socket.off('call:declined', onDeclined);
      socket.off('webrtc:offer', onOffer);
      socket.off('webrtc:answer', onAnswer);
      socket.off('webrtc:ice-candidate', onIceCandidate);
      socket.off('call:ended', onEnded);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // ── Initiate outgoing call ─────────────────────────────────────────────────
  const initiateCall = useCallback((type) => {
    if (!socket || !user || callStateRef.current !== 'IDLE') return;
    console.log('[Call] Initiating', type, 'call');
    setCallTypeSynced(type);
    setCallStateSynced('RINGING_OUT');
    socket.emit('call:initiate', {
      callType: type,
      callerName: user.name,
      callerId: user.id || user.accountId || user.name,
    });
  }, [socket, user]);

  useEffect(() => {
    window.__vanguardInitiateCall = initiateCall;
    return () => { delete window.__vanguardInitiateCall; };
  }, [initiateCall]);

  const acceptCall = useCallback(() => {
    const info = remoteInfoRef.current;
    if (!info) return;
    socket.emit('call:accept', { callerSocketId: info.socketId, accepterName: user.name });
    setCallStateSynced('IN_CALL');
  }, [socket, user]);

  const declineCall = useCallback(() => {
    const info = remoteInfoRef.current;
    if (!info) return;
    socket.emit('call:decline', { callerSocketId: info.socketId, declinerName: user.name });
    cleanup();
  }, [socket, user, cleanup]);

  const endCall = useCallback(() => {
    socket.emit('call:end', { targetSocketId: remoteInfoRef.current?.socketId || null });
    cleanup();
  }, [socket, cleanup]);

  const toggleMute = useCallback(() => {
    if (!localStreamRef.current) return;
    localStreamRef.current.getAudioTracks().forEach(t => { t.enabled = !t.enabled; });
    setIsMuted(prev => !prev);
  }, []);

  const toggleCam = useCallback(() => {
    if (!localStreamRef.current) return;
    localStreamRef.current.getVideoTracks().forEach(t => { t.enabled = !t.enabled; });
    setIsCamOff(prev => !prev);
  }, []);

  const isVisible = callState !== 'IDLE';

  return (
    <>
      {/*
        ── Always-mounted hidden video elements ──────────────────────────────
        Keeping these in the DOM at all times means the refs are always
        populated, so srcObject can be set the moment streams arrive.
      */}
      <video ref={remoteVideoRef} autoPlay playsInline
        className={`fixed inset-0 w-full h-full object-cover z-[9998] bg-slate-950 ${callState === 'IN_CALL' ? 'block' : 'hidden'}`}
      />
      <video ref={localVideoRef} autoPlay playsInline muted
        className={`fixed z-[10000] rounded-3xl border-2 border-white/20 shadow-2xl object-cover bg-slate-900
          ${callState === 'IN_CALL' && callType === 'video' ? 'block' : 'hidden'}
          top-6 right-6 w-36 h-48 md:w-44 md:h-60`}
      />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl"
          >
            {/* ── Incoming Ring ── */}
            {callState === 'RINGING_IN' && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-[40px] p-12 max-w-sm w-full mx-4 shadow-2xl text-center space-y-8"
              >
                <div className="relative mx-auto w-32 h-32">
                  <div className="absolute inset-0 rounded-full bg-sky-200 animate-ping opacity-50" />
                  <div className="absolute inset-2 rounded-full bg-sky-100 animate-ping opacity-30" style={{ animationDelay: '0.3s' }} />
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${remoteInfo?.name}`}
                    className="relative w-full h-full rounded-full border-4 border-sky-500 shadow-xl bg-sky-50 object-cover"
                    alt="Caller"
                  />
                </div>
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 rounded-full border border-sky-100">
                    {callType === 'video' ? <Video size={12} className="text-sky-500" /> : <Phone size={12} className="text-sky-500" />}
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-sky-600">
                      Incoming {callType === 'video' ? 'Video' : 'Voice'} Call
                    </p>
                  </div>
                  <h2 className="text-3xl font-black text-slate-950 tracking-tight">{remoteInfo?.name}</h2>
                  <p className="text-sm text-slate-400 font-medium">Requesting to connect...</p>
                </div>
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center space-y-2">
                    <button onClick={declineCall} className="w-20 h-20 bg-rose-500 hover:bg-rose-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-rose-500/30 transition-all active:scale-95">
                      <PhoneOff size={28} />
                    </button>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Decline</p>
                  </div>
                  <div className="text-center space-y-2">
                    <button onClick={acceptCall} className="w-20 h-20 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-500/30 transition-all active:scale-95 animate-bounce">
                      <Phone size={28} />
                    </button>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Accept</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Outgoing Ring ── */}
            {callState === 'RINGING_OUT' && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="bg-slate-950 rounded-[40px] p-12 max-w-sm w-full mx-4 shadow-2xl text-center space-y-8 border border-slate-800"
              >
                <div className="relative mx-auto w-32 h-32">
                  <div className="absolute inset-0 rounded-full bg-sky-500/20 animate-ping" />
                  <div className="absolute inset-4 rounded-full bg-sky-500/30 animate-ping" style={{ animationDelay: '0.4s' }} />
                  <div className="relative w-full h-full rounded-full bg-slate-900 border-2 border-sky-500/50 flex items-center justify-center">
                    {callType === 'video' ? <Video size={48} className="text-sky-400" /> : <Phone size={48} className="text-sky-400" />}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-sky-500">Calling Community...</p>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    {callType === 'video' ? 'Video' : 'Voice'} Call
                  </h2>
                  <p className="text-sm text-slate-400">Waiting for someone to answer</p>
                </div>
                <button onClick={endCall} className="mx-auto w-20 h-20 bg-rose-500 hover:bg-rose-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-rose-500/30 transition-all active:scale-95">
                  <PhoneOff size={28} />
                </button>
              </motion.div>
            )}

            {/* ── Active Call UI overlay (controls + info — videos are behind this) ── */}
            {callState === 'IN_CALL' && (
              <div className="relative w-full h-full flex flex-col pointer-events-none">
                {/* Gradient scrim at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-slate-950 to-transparent" />

                {/* Black placeholder when cam is off */}
                {isCamOff && callType === 'video' && (
                  <div className="fixed top-6 right-6 w-36 h-48 md:w-44 md:h-60 rounded-3xl bg-slate-900 border-2 border-white/20 shadow-2xl z-[10001] flex items-center justify-center">
                    <VideoOff size={28} className="text-slate-500" />
                  </div>
                )}

                {/* Call info */}
                <div className="absolute top-6 left-6 z-10 pointer-events-auto">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-sky-400">
                    {callType === 'video' ? 'Video' : 'Voice'} Call
                  </p>
                  <h2 className="text-2xl font-black text-white tracking-tight mt-1">
                    {remoteInfo?.name || 'Community'}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Live</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="absolute bottom-10 inset-x-0 z-10 flex items-center justify-center gap-5 pointer-events-auto">
                  <button onClick={toggleMute} className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all active:scale-90 shadow-xl ${isMuted ? 'bg-rose-500 shadow-rose-500/30' : 'bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/10'}`}>
                    {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                  </button>
                  {callType === 'video' && (
                    <button onClick={toggleCam} className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all active:scale-90 shadow-xl ${isCamOff ? 'bg-rose-500 shadow-rose-500/30' : 'bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/10'}`}>
                      {isCamOff ? <VideoOff size={24} /> : <Video size={24} />}
                    </button>
                  )}
                  <button onClick={endCall} className="w-20 h-20 bg-rose-500 hover:bg-rose-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-rose-500/40 transition-all active:scale-90">
                    <PhoneOff size={30} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CallModal;
