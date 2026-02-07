import React, { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, Stars, Trail, MeshTransmissionMaterial, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { projects } from '../data/projects';
import { useActiveProject } from '../hooks/useActiveProject';

// Types for geometry map
type GeometryKey = 'torus' | 'icosahedron' | 'octahedron' | 'sphere' | 'dodecahedron';

const MorphicCenter: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const activeProject = useActiveProject();
  
  // Declarative Geometries (Re-used for performance)
  const torusGeom = useMemo(() => new THREE.TorusKnotGeometry(1.2, 0.4, 128, 32), []);
  const icosaGeom = useMemo(() => new THREE.IcosahedronGeometry(1.5, 0), []);
  const octaGeom = useMemo(() => new THREE.OctahedronGeometry(1.5, 0), []);
  const sphereGeom = useMemo(() => new THREE.SphereGeometry(1.5, 32, 32), []);
  const dodecaGeom = useMemo(() => new THREE.DodecahedronGeometry(1.5, 0), []);

  const geometryMap: Record<GeometryKey, THREE.BufferGeometry> = {
    torus: torusGeom,
    icosahedron: icosaGeom,
    octahedron: octaGeom,
    sphere: sphereGeom,
    dodecahedron: dodecaGeom
  };

  const currentShape: GeometryKey = (activeProject?.shapeType as GeometryKey) || 'torus';    
  const geometry = geometryMap[currentShape] || torusGeom;

  useFrame((state) => {
    if (meshRef.current) {
      // Smoother rotations
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, state.clock.getElapsedTime() * 0.2, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, state.clock.getElapsedTime() * 0.15, 0.1);
      
      // Subtle pulse
      const scale = 1 + Math.sin(state.clock.getElapsedTime()) * 0.03;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <MeshTransmissionMaterial
        backside
        backsideThickness={5}
        thickness={2}
        roughness={0.1}
        transmission={1}
        chromaticAberration={0.5}
        anisotropy={0.5}
        distortion={0.3}
        distortionScale={0.5}
        temporalDistortion={0.1}
        color={activeProject?.color || "#a5f3fc"}
        bg="#020617"
      />
    </mesh>
  );
};

const OrbitingProject: React.FC<{
  index: number;
  total: number;
  project: typeof projects[0];
}> = ({ index, total, project }) => {
  const groupRef = useRef<THREE.Group>(null);
  const activeProject = useActiveProject();
  const radius = 5.0;
  const angleOffset = (index / total) * Math.PI * 2;

  const isSelected = activeProject?.id === project.id;
  const projectColor = useMemo(() => new THREE.Color(project.color), [project.color]);       
  const sphereGeom = useMemo(() => new THREE.SphereGeometry(0.06, 16, 16), []);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime() * 0.3;
      const angle = angleOffset + t;
      
      // Elliptical orbit logic
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 2) * 0.8;

      groupRef.current.position.lerp(new THREE.Vector3(x, y, z), 0.1);
      groupRef.current.lookAt(0, 0, 0);

      const targetScale = isSelected ? 3.0 : 1.0;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <Trail
        width={isSelected ? 3 : 1}
        length={isSelected ? 15 : 8}
        color={projectColor}
        attenuation={(t) => t * t}
      >
        <mesh geometry={sphereGeom}>
          <meshBasicMaterial color={projectColor} toneMapped={false} />
        </mesh>
      </Trail>

      <Float speed={isSelected ? 10 : 2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.18}
          anchorX="center"
          anchorY="middle"
          color={isSelected ? "white" : "#666"}
          font={undefined}
        >
          {project?.title?.toUpperCase() || 'NODE'}
        </Text>
      </Float>
    </group>
  );
};

const CameraController: React.FC = () => {
  const { camera } = useThree();
  const activeProject = useActiveProject();
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      scrollRef.current = window.scrollY / (totalHeight || 1);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    const scroll = scrollRef.current;
    // Dramatic zoom on scroll vs project selection
    const targetZ = activeProject ? 5.5 : (9 - scroll * 4);
    const targetY = activeProject ? 0.5 : (scroll * 2);
    
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, scroll * 0.15, 0.04);
  });

  return null;
};

const SceneContent: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <CameraController />
      
      <ambientLight intensity={0.4} />
      <pointLight position={[15, 10, 10]} intensity={1.5} color="#22d3ee" />
      <pointLight position={[-15, -10, -10]} intensity={1.5} color="#e879f9" />

      <Stars 
        radius={120} 
        depth={60} 
        count={7000} 
        factor={6} 
        saturation={0} 
        fade 
        speed={1.5} 
      />

      <MorphicCenter />

      {projects.filter(p => !p.isArchived).map((project, idx, filtered) => (
        <OrbitingProject
          key={project.id}
          index={idx}
          total={filtered.length}
          project={project}
        />
      ))}
      <Preload all />
    </Suspense>
  );
};

export const Experience3D: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        shadows={false}
        dpr={[1, 2]} // Support high-DPI
        camera={{ position: [0, 0, 9], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};
