import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, Stars, Trail, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECTS } from '../constants';

// Fix for TypeScript errors regarding Three.js elements in JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      group: any;
      torusKnotGeometry: any;
      sphereGeometry: any;
      meshBasicMaterial: any;
      ambientLight: any;
      pointLight: any;
    }
  }
}

const TorusKnot: React.FC<{ scrollOffset: number }> = ({ scrollOffset }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Rotate based on time and scroll
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2 + scrollOffset * 2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      
      // Pulse scale
      const scale = 1 + Math.sin(state.clock.getElapsedTime()) * 0.02;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
      <MeshTransmissionMaterial
        backside
        backsideThickness={5}
        thickness={2}
        roughness={0.2}
        transmission={1}
        chromaticAberration={1}
        anisotropy={0.5}
        distortion={0.5}
        distortionScale={0.5}
        temporalDistortion={0.2}
        color="#a5f3fc" // cyan-200 tint
        bg="#020617"
      />
    </mesh>
  );
};

const OrbitingProject: React.FC<{ 
  index: number; 
  total: number; 
  project: typeof PROJECTS[0];
  scrollOffset: number; 
}> = ({ index, total, project, scrollOffset }) => {
  const meshRef = useRef<THREE.Group>(null);
  const radius = 3.5;
  const angle = (index / total) * Math.PI * 2;

  useFrame((state) => {
    if (meshRef.current) {
      // Calculate position based on scroll and time (Orbit)
      const t = state.clock.getElapsedTime() * 0.5 + scrollOffset * Math.PI;
      const curAngle = angle + t;
      
      const x = Math.cos(curAngle) * radius;
      const z = Math.sin(curAngle) * radius;
      // Möbius-like vertical wave
      const y = Math.sin(curAngle * 2) * 1.5; 

      meshRef.current.position.set(x, y, z);
      meshRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={meshRef}>
      <Trail
        width={1} // Width of the line
        length={6} // Length of the trail
        color={new THREE.Color(project.color)} // Color of the trail
        attenuation={(t) => t * t} // Transparency
      >
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={project.color} toneMapped={false} />
        </mesh>
      </Trail>
      
      <Float speed={5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.2}
          font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
          anchorX="center"
          anchorY="middle"
          color="white"
          characters="abcdefghijklmnopqrstuvwxyz0123456789!"
        >
          {project.title.toUpperCase()}
        </Text>
      </Float>
    </group>
  );
};

const SceneContent: React.FC<{ scrollOffset: number }> = ({ scrollOffset }) => {
  const { camera } = useThree();

  useFrame(() => {
    // Camera gentle movement based on scroll to simulate "Deep Parallax"
    // We want to move 'into' the scene slightly as we scroll
    const targetZ = 8 - scrollOffset * 3;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    
    // Slight rotation of camera for cinematic feel
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, scrollOffset * 0.2, 0.05);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#e879f9" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <TorusKnot scrollOffset={scrollOffset} />

      {PROJECTS.map((project, idx) => (
        <OrbitingProject 
          key={project.id} 
          index={idx} 
          total={PROJECTS.length} 
          project={project}
          scrollOffset={scrollOffset}
        />
      ))}
    </>
  );
};

export const Experience3D: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  return (
    <div className="fixed inset-0 z-0 bg-slate-950 pointer-events-none">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <SceneContent scrollOffset={scrollProgress} />
      </Canvas>
    </div>
  );
};