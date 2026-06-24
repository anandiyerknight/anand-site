"use client";

import { RoundedBox, useTexture } from "@react-three/drei";
import { forwardRef } from "react";
import * as THREE from "three";

type CardProps = { url: string; size?: number };

// A glossy, photoreal card showing a REAL work asset, lit by the HDRI
// environment. The outer group is the animation handle (position/rotation/
// scale set by the parent scene); materials are transparent so opacity can be
// driven for the fan-out.
export const Card = forwardRef<THREE.Group, CardProps>(function Card({ url, size = 1 }, ref) {
  const tex = useTexture(url);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  const img = tex.image as { width: number; height: number } | undefined;
  const aspect = img && img.width && img.height ? img.width / img.height : 0.8;
  const w = aspect >= 1 ? size : size * aspect;
  const h = aspect >= 1 ? size / aspect : size;
  const depth = 0.05;

  return (
    <group ref={ref}>
      {/* glossy dark bezel / body */}
      <RoundedBox args={[w + 0.07, h + 0.07, depth]} radius={0.03} smoothness={3}>
        <meshStandardMaterial color="#0b0b0d" roughness={0.3} metalness={0.75} envMapIntensity={1.15} transparent />
      </RoundedBox>
      {/* the real screenshot */}
      <mesh position={[0, 0, depth / 2 + 0.003]}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial map={tex} roughness={0.42} metalness={0.05} envMapIntensity={0.5} transparent />
      </mesh>
    </group>
  );
});
