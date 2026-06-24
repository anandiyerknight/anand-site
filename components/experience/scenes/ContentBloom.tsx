"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Card } from "../Card";
import { CONTENT_TILES, SEED_TILE } from "../assets";
import { band, getScrollProgress, smoothstep } from "../scroll";

const COLS = 6;
const ROWS = 5;
const ANG = 0.21; // angular pitch between columns (curved wall)
const RC = 8.4; // cylinder radius
const YS = 1.32; // vertical pitch

type Target = { pos: THREE.Vector3; rotY: number };

// THE signature scene: one real content card multiplies into ~30 real
// carousels/posters fanning into a gently curved wall facing the camera.
export function ContentBloom() {
  const group = useRef<THREE.Group>(null);
  const seedRef = useRef<THREE.Group>(null);
  const refs = useRef<(THREE.Group | null)[]>([]);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  const targets = useMemo<Target[]>(
    () =>
      CONTENT_TILES.map((_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const ang = (col - (COLS - 1) / 2) * ANG;
        return {
          pos: new THREE.Vector3(
            Math.sin(ang) * RC,
            ((ROWS - 1) / 2 - row) * YS,
            RC * (Math.cos(ang) - 1)
          ),
          rotY: -ang,
        };
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = getScrollProgress();
    const open = band(p, 0.08, 0.55);

    if (group.current) group.current.rotation.y = Math.sin(t * 0.12) * 0.04;

    refs.current.forEach((g, i) => {
      if (!g) return;
      const delay = (i / CONTENT_TILES.length) * 0.45;
      const e = smoothstep((open - delay) / (1 - 0.45));
      const tg = targets[i];

      tmp.set(0, 0, 0.2 + (i % 6) * 0.012).lerp(tg.pos, e);
      g.position.copy(tmp);
      g.position.y += Math.sin(t * 0.6 + i) * 0.02 * e;
      g.scale.setScalar(0.12 + e * 0.88);
      g.rotation.y = tg.rotY * e;
      g.rotation.z = (1 - e) * 0.3 * (i % 2 ? 1 : -1);

      const op = 0.12 + e * 0.88;
      g.traverse((o) => {
        const m = (o as THREE.Mesh).material as THREE.Material | undefined;
        if (m) (m as THREE.MeshStandardMaterial).opacity = op;
      });
    });

    if (seedRef.current) {
      const so = 1 - smoothstep(band(p, 0.05, 0.3));
      seedRef.current.visible = so > 0.02;
      seedRef.current.scale.setScalar(1.6);
      seedRef.current.position.set(0, 0, 0.6);
      seedRef.current.rotation.y = Math.sin(t * 0.2) * 0.12;
      seedRef.current.traverse((o) => {
        const m = (o as THREE.Mesh).material as THREE.Material | undefined;
        if (m) (m as THREE.MeshStandardMaterial).opacity = so;
      });
    }
  });

  return (
    <group ref={group}>
      <Card ref={seedRef} url={SEED_TILE} size={1.4} />
      {CONTENT_TILES.map((url, i) => (
        <Card
          key={url}
          ref={(el) => {
            refs.current[i] = el;
          }}
          url={url}
          size={1}
        />
      ))}
    </group>
  );
}
