import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const STAR_COUNT = 100000;
const GALAXY_RADIUS = 50;
const GALAXY_HEIGHT = 5;
const ARM_COUNT = 4;
const ARM_TIGHTNESS = 0.5;
const EXPLOSION_STRENGTH = 20; // How far stars explode from their initial galaxy position
const INTERACTIVE_FORCE_RADIUS = 150; // Radius around mouse where stars react
const INTERACTIVE_FORCE_STRENGTH = 5; // How strongly stars react to mouse
const RETURN_TO_SPREAD_SPEED = 1; // How fast stars return to their spread state

type AnimationPhase = 'initial' | 'exploding' | 'interactive';

const ExplodingGalaxyContent: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { size, viewport } = useThree();

  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('initial');
  const [explosionProgress, setExplosionProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState<THREE.Vector2>(new THREE.Vector2());

  // Generate initial galaxy positions, explosion vectors, and spread positions
  const { initialPositions, explosionVectors, spreadPositions } = useMemo(() => {
    const initialPositions = new Float32Array(STAR_COUNT * 3);
    const explosionVectors = new Float32Array(STAR_COUNT * 3);
    const spreadPositions = new Float32Array(STAR_COUNT * 3);

    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;

      // Galaxy formation logic
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * GALAXY_RADIUS;
      const armAngle = (angle + radius * ARM_TIGHTNESS) % (Math.PI * 2 / ARM_COUNT);
      const armOffset = (armAngle - Math.PI / ARM_COUNT) * 0.5;

      const x = Math.cos(angle + armOffset) * radius;
      const z = Math.sin(angle + armOffset) * radius;
      const y = (Math.random() - 0.5) * GALAXY_HEIGHT * (1 - radius / GALAXY_RADIUS);

      initialPositions[i3] = x;
      initialPositions[i3 + 1] = y;
      initialPositions[i3 + 2] = z;

      // Explosion vector (random direction in 3D space)
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      explosionVectors[i3] = Math.sin(theta) * Math.cos(phi);
      explosionVectors[i3 + 1] = Math.sin(theta) * Math.sin(phi);
      explosionVectors[i3 + 2] = Math.cos(theta);

      // Target positions after the explosion (spread out)
      spreadPositions[i3] = initialPositions[i3] + explosionVectors[i3] * EXPLOSION_STRENGTH;
      spreadPositions[i3 + 1] = initialPositions[i3 + 1] + explosionVectors[i3 + 1] * EXPLOSION_STRENGTH;
      spreadPositions[i3 + 2] = initialPositions[i3 + 2] + explosionVectors[i3 + 2] * EXPLOSION_STRENGTH;
    }
    return { initialPositions, explosionVectors, spreadPositions };
  }, []);

  // Generate random colors for stars
  const colors = useMemo(() => {
    const colors = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = 0.8 + Math.random() * 0.2;
      const g = 0.8 + Math.random() * 0.2;
      const b = 0.8 + Math.random() * 0.2;
      const i3 = i * 3;
      colors[i3] = r;
      colors[i3 + 1] = g;
      colors[i3 + 2] = b;
    }
    return colors;
  }, []);

  // Handle mouse movement to update mousePosition state
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse coordinates to normalized device coordinates (-1 to 1)
      const x = (event.clientX / size.width) * 2 - 1;
      const y = -(event.clientY / size.height) * 2 + 1;
      setMousePosition(new THREE.Vector2(x, y));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size.width, size.height]);

  // Trigger explosion after an initial delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase('exploding');
    }, 3000); // Start explosion after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  // Animation loop using useFrame
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const currentPositions = new THREE.Vector3();
    const targetPosition = new THREE.Vector3();
    const mouseWorld = new THREE.Vector3();

    // Convert mousePosition (NDC) to world coordinates on a plane at y=0 (galaxy plane)
    const mouseRaycaster = new THREE.Raycaster();
    mouseRaycaster.setFromCamera(mousePosition, state.camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // Plane at y=0
    const intersectionPoint = new THREE.Vector3();
    mouseRaycaster.ray.intersectPlane(plane, intersectionPoint);
    if (intersectionPoint) {
      mouseWorld.copy(intersectionPoint);
    } else {
      // Fallback if no intersection (e.g., camera looking parallel to plane)
      // Project mouse to a fixed distance in front of the camera
      mouseWorld.set(mousePosition.x, mousePosition.y, 0.5).unproject(state.camera);
    }

    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;
      currentPositions.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);

      if (animationPhase === 'initial') {
        // Stars remain in their initial galaxy formation
        // No movement in this phase, waiting for explosion
      } else if (animationPhase === 'exploding') {
        // Animate explosion progress
        setExplosionProgress(prev => {
          const newProgress = Math.min(prev + delta * 0.5, 1); // Explosion speed
          if (newProgress >= 1 && prev < 1) {
            setAnimationPhase('interactive'); // Transition to interactive phase
          }
          return newProgress;
        });

        // Interpolate star positions from initial galaxy to spread-out explosion target
        targetPosition.set(
          initialPositions[i3] + explosionVectors[i3] * EXPLOSION_STRENGTH * explosionProgress,
          initialPositions[i3 + 1] + explosionVectors[i3 + 1] * EXPLOSION_STRENGTH * explosionProgress,
          initialPositions[i3 + 2] + explosionVectors[i3 + 2] * EXPLOSION_STRENGTH * explosionProgress
        );
        currentPositions.lerp(targetPosition, 0.1); // Smooth transition
      } else if (animationPhase === 'interactive') {
        // Stars react to cursor and slowly return to their spread state
        targetPosition.set(spreadPositions[i3], spreadPositions[i3 + 1], spreadPositions[i3 + 2]);

        const distanceToMouse = currentPositions.distanceTo(mouseWorld);

        if (distanceToMouse < INTERACTIVE_FORCE_RADIUS) {
          const direction = currentPositions.clone().sub(mouseWorld).normalize();
          const force = (1 - distanceToMouse / INTERACTIVE_FORCE_RADIUS) * INTERACTIVE_FORCE_STRENGTH;
          currentPositions.add(direction.multiplyScalar(force * delta * 10)); // Apply force
        }

        // Slowly lerp back to the spread positions
        currentPositions.lerp(targetPosition, RETURN_TO_SPREAD_SPEED * delta * 10);
      }

      positions[i3] = currentPositions.x;
      positions[i3 + 1] = currentPositions.y;
      positions[i3 + 2] = currentPositions.z;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={initialPositions} // Start with initial galaxy positions
          count={initialPositions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors={true}
        size={0.1}
        sizeAttenuation={true}
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const ExplodingGalaxy: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        shadows
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <PerspectiveCamera makeDefault position={[0, 50, 100]} fov={60} />

        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={100} color="#ffffff" />

        <ExplodingGalaxyContent />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={10}
          maxDistance={200}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 4}
          autoRotate={false} // Disable auto-rotate for interactive phase
        />
      </Canvas>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800/70 backdrop-blur-sm px-4 py-2 rounded-lg text-xs text-gray-300">
        Drag to rotate • Scroll to zoom • Move cursor to interact with stars
      </div>
    </div>
  );
};

export default ExplodingGalaxy;