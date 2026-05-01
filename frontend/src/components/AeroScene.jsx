import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';

const AeroShape = () => {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.cos(t / 4) / 8;
    mesh.current.rotation.y = Math.sin(t / 4) / 8;
    mesh.current.rotation.z = Math.sin(t / 4) / 10;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={mesh} args={[1, 100, 100]} scale={2}>
        <MeshDistortMaterial
          color="#2563eb"
          speed={3}
          distort={0.3}
          radius={1}
        />
      </Sphere>
    </Float>
  );
};

export const AeroScene = () => {
  return (
    <div className="w-full h-full min-h-[600px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#4f46e5" />
        <AeroShape />
      </Canvas>
    </div>
  );
};
