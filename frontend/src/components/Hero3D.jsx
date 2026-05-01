import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from '@react-three/drei';

const Scene = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) / 4;
      meshRef.current.rotation.y = Math.sin(t / 4) / 4;
      meshRef.current.rotation.z = Math.sin(t / 4) / 4;
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#2563eb" />
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere ref={meshRef} args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#2563eb"
            speed={3}
            distort={0.4}
            radius={1}
          />
        </Sphere>
      </Float>
    </>
  );
};

export const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-[-1] opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export const Deco3D = ({ color = "#2563eb", speed = 2 }) => {
  return (
    <div className="w-full h-full">
      <Canvas>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <Float speed={speed} rotationIntensity={2} floatIntensity={2}>
          <Sphere args={[1, 32, 32]} scale={0.5}>
            <MeshWobbleMaterial color={color} factor={1} speed={speed} />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
};
