import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  socket = null;

  connect() {
    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Connected to AERO Real-time Engine');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from AERO Real-time Engine');
    });
  }

  on(event, callback) {
    if (!this.socket) return;
    this.socket.on(event, callback);
  }

  emit(event, data) {
    if (!this.socket) return;
    this.socket.emit(event, data);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketService();
