import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Box, Torus } from "@react-three/drei";
import * as THREE from "three";

// Animated 3D objects
function FloatingGeometry() {
  const boxRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (boxRef.current) {
      boxRef.current.rotation.x = time * 0.3;
      boxRef.current.rotation.y = time * 0.2;
      boxRef.current.position.y = Math.sin(time * 0.5) * 0.5;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.2;
      torusRef.current.rotation.z = time * 0.3;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <group>
      {/* Central Sphere with distortion */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={sphereRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#00d4ff"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Rotating Box */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <Box ref={boxRef} args={[0.8, 0.8, 0.8]} position={[-2.5, 1, -1]}>
          <meshStandardMaterial
            color="#ff00ff"
            roughness={0.3}
            metalness={0.9}
            emissive="#ff00ff"
            emissiveIntensity={0.2}
          />
        </Box>
      </Float>

      {/* Torus Ring */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.8}>
        <Torus ref={torusRef} args={[1, 0.3, 16, 100]} position={[2.5, -0.5, -1]}>
          <meshStandardMaterial
            color="#00ffff"
            roughness={0.2}
            metalness={1}
            emissive="#00ffff"
            emissiveIntensity={0.3}
          />
        </Torus>
      </Float>

      {/* Additional floating boxes for depth */}
      <Float speed={1.2} rotationIntensity={0.6}>
        <Box args={[0.5, 0.5, 0.5]} position={[-1.5, -1.5, -2]}>
          <meshStandardMaterial color="#4400ff" roughness={0.4} metalness={0.7} />
        </Box>
      </Float>

      <Float speed={1.4} rotationIntensity={0.7}>
        <Box args={[0.6, 0.6, 0.6]} position={[1.8, 1.5, -2.5]}>
          <meshStandardMaterial color="#ff0088" roughness={0.3} metalness={0.8} />
        </Box>
      </Float>

      {/* Ambient light */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
      <spotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#ffffff" />
    </group>
  );
}

const Hero3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <FloatingGeometry />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2.5}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;
