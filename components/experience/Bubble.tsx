"use client";

import { Billboard, useTexture } from "@react-three/drei";
import * as THREE from "three";

function LogoMat({ url }: { url: string }) {
  const tex = useTexture(url);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  // unlit + not tonemapped so brand colours stay vivid and legible in the dark
  return <meshBasicMaterial map={tex} transparent toneMapped={false} depthWrite={false} />;
}

// A glassy sphere (real env reflections via the scene HDRI) carrying a real
// tool logo that always faces the camera, so it stays readable as the cluster
// spins.
export function Bubble({
  position,
  radius,
  logo,
  tint = "#cfe0ff",
}: {
  position: [number, number, number];
  radius: number;
  logo?: string;
  tint?: string;
}) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[radius, 44, 44]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={radius * 0.45}
          roughness={0.05}
          metalness={0}
          ior={1.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.7}
          color={tint}
          attenuationColor={tint}
          attenuationDistance={4}
          transparent
        />
      </mesh>
      {logo && (
        <Billboard>
          {/* sit the logo just in FRONT of the glass so it stays crisp + unrefracted */}
          <mesh position={[0, 0, radius + 0.05]} renderOrder={2}>
            <planeGeometry args={[radius * 1.5, radius * 1.5]} />
            <LogoMat url={logo} />
          </mesh>
        </Billboard>
      )}
    </group>
  );
}
