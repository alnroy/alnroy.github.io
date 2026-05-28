import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Floating glowing orb
const GlowOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    meshRef.current.rotation.y += 0.004;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[1.8, 64, 64]} />
        <MeshDistortMaterial
          color="#6366f1"
          emissive="#4f46e5"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.8}
          distort={0.35}
          speed={2}
          transparent
          opacity={0.92}
        />
      </mesh>
      {/* Inner glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.04, 16, 100]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.8, 0.025, 16, 100]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.3} />
      </mesh>
    </Float>
  );
};

// Orbiting tech icon rings
const OrbitRing = ({ radius, speed, color }: { radius: number; speed: number; color: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * speed;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.012, 16, 200]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      {/* Orbiting dot */}
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
};

// Floating particles
const ParticleField = () => {
  const count = 800;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 8;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#a78bfa"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={3} color="#818cf8" />
        <pointLight position={[-5, -5, -5]} intensity={2} color="#c084fc" />
        <pointLight position={[0, 5, 0]} intensity={1.5} color="#67e8f9" />

        <GlowOrb />
        <OrbitRing radius={3.5} speed={0.4} color="#818cf8" />
        <OrbitRing radius={4.5} speed={-0.25} color="#c084fc" />
        <OrbitRing radius={5.5} speed={0.15} color="#67e8f9" />
        <ParticleField />

        <Sparkles
          count={60}
          scale={12}
          size={1.5}
          speed={0.3}
          color="#a78bfa"
          opacity={0.6}
        />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
