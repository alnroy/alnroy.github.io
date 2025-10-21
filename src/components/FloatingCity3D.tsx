import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Interactive Hotspot Component
function Hotspot({ position, label, onClick }: { position: [number, number, number]; label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <mesh
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color={hovered ? "#ff00ff" : "#00ffff"}
        emissive={hovered ? "#ff00ff" : "#00ffff"}
        emissiveIntensity={hovered ? 1.5 : 0.8}
        metalness={0.9}
        roughness={0.1}
      />
      {hovered && (
        <Html distanceFactor={10}>
          <div className="glass-strong px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap pointer-events-none">
            {label}
          </div>
        </Html>
      )}
    </mesh>
  );
}

// Glass Panel Component
function GlassPanel({ position, rotation, scale }: { position: [number, number, number]; rotation?: [number, number, number]; scale?: [number, number, number] }) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 0.05, 1]} />
      <meshPhysicalMaterial
        color="#88ddff"
        transparent
        opacity={0.3}
        metalness={0.1}
        roughness={0.1}
        transmission={0.9}
        thickness={0.5}
        envMapIntensity={1}
      />
    </mesh>
  );
}

// Main Floating City Structure
function FloatingCityStructure({ onHotspotClick }: { onHotspotClick: (label: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(time * 0.3) * 0.3;
      groupRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Core - Large platform */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[3, 0.4, 3]} />
        <meshStandardMaterial
          color="#1a2332"
          metalness={0.8}
          roughness={0.3}
          emissive="#00d4ff"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Glass panels on top of central core */}
      <GlassPanel position={[0, 0.25, 0]} scale={[2.8, 1, 2.8]} />

      {/* Neon edges around central platform */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[3.1, 0.05, 3.1]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0.2}
        />
      </mesh>

      {/* Floating Side Modules - Left */}
      <group position={[-2.5, 0.5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.8, 1.2]} />
          <meshStandardMaterial
            color="#1a2332"
            metalness={0.7}
            roughness={0.4}
            emissive="#ff00aa"
            emissiveIntensity={0.15}
          />
        </mesh>
        <GlassPanel position={[0, 0.45, 0]} scale={[1.15, 1, 1.15]} />
        {/* Emissive lines */}
        <mesh position={[0, 0, 0.61]} scale={[1.2, 0.05, 0.05]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={1.2}
          />
        </mesh>
      </group>

      {/* Floating Side Modules - Right */}
      <group position={[2.5, -0.3, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#1a2332"
            metalness={0.7}
            roughness={0.4}
            emissive="#00ffff"
            emissiveIntensity={0.15}
          />
        </mesh>
        <GlassPanel position={[0, 0.55, 0]} scale={[0.95, 1, 0.95]} />
        <mesh position={[0.51, 0, 0]} scale={[0.05, 1, 0.05]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={1.2}
          />
        </mesh>
      </group>

      {/* Floating Top Module */}
      <group position={[0, 1.8, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.6, 0.8, 0.6, 6]} />
          <meshStandardMaterial
            color="#1a2332"
            metalness={0.9}
            roughness={0.2}
            emissive="#00d4ff"
            emissiveIntensity={0.2}
          />
        </mesh>
        <GlassPanel position={[0, 0.35, 0]} scale={[0.75, 1, 0.75]} />
      </group>

      {/* Bottom Support Modules */}
      <group position={[0, -1.2, 1.5]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.5, 0.8]} />
          <meshStandardMaterial
            color="#1a2332"
            metalness={0.6}
            roughness={0.5}
            emissive="#aa00ff"
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>

      <group position={[0, -1.2, -1.5]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.5, 0.8]} />
          <meshStandardMaterial
            color="#1a2332"
            metalness={0.6}
            roughness={0.5}
            emissive="#00ffaa"
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>

      {/* Interactive Hotspots */}
      <Hotspot
        position={[0, 0.6, 0]}
        label="CaterCraft Platform"
        onClick={() => onHotspotClick("CaterCraft Platform")}
      />
      <Hotspot
        position={[-2.5, 1, 0]}
        label="Admin Module"
        onClick={() => onHotspotClick("Admin Module")}
      />
      <Hotspot
        position={[2.5, 0.2, 0]}
        label="Event Hub"
        onClick={() => onHotspotClick("Event Hub")}
      />

      {/* Connecting energy beams */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.cos(angle) * 1.5;
        const z = Math.sin(angle) * 1.5;
        return (
          <mesh key={i} position={[x, -0.2, z]}>
            <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.8}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Main Component
const FloatingCity3D = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  const handleHotspotClick = (label: string) => {
    setSelectedHotspot(label);
    setTimeout(() => setSelectedHotspot(null), 3000);
  };

  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <PerspectiveCamera makeDefault position={[6, 4, 8]} fov={50} />
        
        {/* Lighting Setup - Cyan and Magenta theme */}
        <ambientLight intensity={0.2} />
        
        {/* Cyan key light */}
        <pointLight
          position={[5, 5, 5]}
          intensity={1.5}
          color="#00d4ff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        {/* Magenta fill light */}
        <pointLight
          position={[-5, 3, -5]}
          intensity={1}
          color="#ff00aa"
        />
        
        {/* Cyan rim light */}
        <pointLight
          position={[0, -3, 5]}
          intensity={0.8}
          color="#00ffff"
        />
        
        {/* Top accent light */}
        <spotLight
          position={[0, 8, 0]}
          angle={0.5}
          penumbra={1}
          intensity={0.5}
          color="#88ddff"
          castShadow
        />

        {/* Main City Structure */}
        <FloatingCityStructure onHotspotClick={handleHotspotClick} />

        {/* Orbital particles */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 5;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle + Date.now() * 0.0001) * radius,
                Math.sin(i * 0.5 + Date.now() * 0.0002) * 2,
                Math.sin(angle + Date.now() * 0.0001) * radius,
              ]}
            >
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#00ffff" : "#ff00ff"}
                emissive={i % 2 === 0 ? "#00ffff" : "#ff00ff"}
                emissiveIntensity={1}
              />
            </mesh>
          );
        })}

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 4}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>

      {/* Hotspot notification */}
      {selectedHotspot && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 glass-strong px-6 py-3 rounded-xl neon-glow animate-fade-in z-10">
          <p className="text-sm font-semibold gradient-text">
            Clicked: {selectedHotspot}
          </p>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-lg text-xs text-muted-foreground">
        Click hotspots • Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default FloatingCity3D;
