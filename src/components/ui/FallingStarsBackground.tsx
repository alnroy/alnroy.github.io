import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FallingStarsBackgroundProps {
  mousePosition: { x: number; y: number };
}

const FallingStarsBackground: React.FC<FallingStarsBackgroundProps> = ({ mousePosition }) => {
  const groupRef = useRef<THREE.Group>(null);
  const starCount = 2000;
  const starFieldSize = 100; // Size of the cube where stars are generated
  const fallSpeed = 0.05;
  const parallaxStrength = 0.05; // How much the stars move with the mouse

  const positions = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * starFieldSize; // x
      positions[i3 + 1] = Math.random() * starFieldSize - starFieldSize / 2; // y
      positions[i3 + 2] = (Math.random() - 0.5) * starFieldSize; // z
    }
    return positions;
  }, [starCount, starFieldSize]);

  useFrame(() => {
    if (groupRef.current && groupRef.current.children.length > 0) {
      const pointsMesh = groupRef.current.children[0];
      // Ensure it's a Points object and has a geometry
      if (pointsMesh instanceof THREE.Points && pointsMesh.geometry instanceof THREE.BufferGeometry) {
        const geometry = pointsMesh.geometry;
        const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;

        // Apply parallax effect based on mouse position
        groupRef.current.position.x = -mousePosition.x * parallaxStrength;
        groupRef.current.position.y = mousePosition.y * parallaxStrength;

        // Animate falling stars
        for (let i = 0; i < starCount; i++) {
          const i3 = i * 3;
          positionAttribute.array[i3 + 1] -= fallSpeed; // Move star down

          // If star falls below the view, reset it to the top
          if (positionAttribute.array[i3 + 1] < -starFieldSize / 2) {
            positionAttribute.array[i3 + 1] = starFieldSize / 2;
          }
        }
        positionAttribute.needsUpdate = true; // Tell Three.js to update the buffer
      }
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.1}
          sizeAttenuation
          transparent
          opacity={0.8}
          depthWrite={false} // Helps with blending
        />
      </points>
    </group>
  );
};

export default FallingStarsBackground;