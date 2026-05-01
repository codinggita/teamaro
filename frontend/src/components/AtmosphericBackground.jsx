import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

const CloudNode = ({ position, speed, size }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.position.y += Math.sin(t * speed) * 0.002;
    mesh.current.position.x += Math.cos(t * speed) * 0.002;
    mesh.current.rotation.z += 0.001;
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color="#bae6fd" 
          transparent 
          opacity={0.3} 
          roughness={0} 
          metalness={0.1}
          emissive="#7dd3fc"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
};

const Particles = ({ count = 200 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 40;
      p[i * 3 + 1] = (Math.random() - 0.5) * 40;
      p[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return p;
  }, [count]);

  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.y += 0.001;
    mesh.current.rotation.x += 0.0005;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

const Scene = () => {
  const clouds = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      ],
      speed: 1 + Math.random() * 2,
      size: 0.1 + Math.random() * 0.5
    }));
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#0ea5e9" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#6366f1" />
      
      {clouds.map((cloud, i) => (
        <CloudNode key={i} {...cloud} />
      ))}
      
      <Particles />
      <Environment preset="city" />
    </>
  );
};

const AtmosphericBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-br from-white via-sky-50 to-indigo-50">
      <Canvas dpr={[1, 2]}>
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
    </div>
  );
};

export default AtmosphericBackground;
