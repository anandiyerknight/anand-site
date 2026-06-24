"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Bubble } from "../Bubble";
import { getScrollProgress } from "../scroll";

const L = "/experience/logos";

type Node = { logo?: string; pos: [number, number, number]; r: number; tint?: string };

// central hub + orbiting tool bubbles, roughly matching the reference cluster
const NODES: Node[] = [
  { logo: `${L}/linkedin.png`, pos: [0, 0, 0], r: 1.15, tint: "#dbe8ff" },
  { logo: `${L}/slack.png`, pos: [2.5, 1.0, -0.4], r: 0.82 },
  { logo: `${L}/hubspot.png`, pos: [0.5, -2.05, 0.3], r: 0.8, tint: "#ffe0cf" },
  { logo: `${L}/whatsapp.png`, pos: [-2.45, 1.55, 0.2], r: 0.62, tint: "#d6ffe6" },
  { logo: `${L}/salesforce.png`, pos: [3.0, -1.05, -0.6], r: 0.52, tint: "#cfe6ff" },
  { logo: `${L}/googleanalytics.png`, pos: [3.05, 1.7, -0.3], r: 0.46, tint: "#ffe9cf" },
  { logo: `${L}/zapier.png`, pos: [-2.7, -1.45, -0.2], r: 0.52, tint: "#ffd9c9" },
  { logo: `${L}/instagram.png`, pos: [-3.05, 0.2, 0.4], r: 0.58 },
  // empty decorative glass
  { pos: [1.4, 2.1, 0.7], r: 0.34 },
  { pos: [-1.5, -2.5, 0.5], r: 0.3 },
  { pos: [1.7, -1.05, 1.05], r: 0.27 },
];

const HUB = new THREE.Vector3(0, 0, 0);
const WARM = "#ff9d4d";

export function IntegrationHub() {
  const group = useRef<THREE.Group>(null);
  const pulses = useRef<(THREE.Mesh | null)[]>([]);
  const { size } = useThree();

  // glowing connectors from the hub to every tool bubble
  const links = useMemo(() => {
    const out: { curve: THREE.QuadraticBezierCurve3; geo: THREE.TubeGeometry; off: number }[] = [];
    NODES.forEach((n, i) => {
      if (!n.logo || (n.pos[0] === 0 && n.pos[1] === 0)) return;
      const end = new THREE.Vector3(...n.pos);
      const mid = HUB.clone().add(end).multiplyScalar(0.5);
      mid.z += 0.6 + (i % 3) * 0.25;
      mid.x += (i % 2 ? 0.3 : -0.3);
      const curve = new THREE.QuadraticBezierCurve3(HUB.clone(), mid, end);
      const geo = new THREE.TubeGeometry(curve, 40, 0.018, 8, false);
      out.push({ curve, geo, off: (i * 0.17) % 1 });
    });
    return out;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = getScrollProgress();
    if (group.current) {
      // vertical scroll -> horizontal (Y) spin, plus a slow idle drift
      group.current.rotation.y = p * Math.PI * 2 * 1.25 + t * 0.04;
      group.current.rotation.x = Math.sin(t * 0.25) * 0.06;
      const s = THREE.MathUtils.clamp(size.width / 1200, 0.56, 1);
      group.current.scale.setScalar(s);
    }
    links.forEach((lk, i) => {
      const m = pulses.current[i];
      if (!m) return;
      const tt = (t * 0.32 + lk.off) % 1;
      m.position.copy(lk.curve.getPoint(tt));
    });
  });

  return (
    <group ref={group}>
      {links.map((lk, i) => (
        <group key={i}>
          <mesh geometry={lk.geo}>
            <meshBasicMaterial color={WARM} transparent opacity={0.5} toneMapped={false} />
          </mesh>
          <mesh
            ref={(el) => {
              pulses.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color={"#ffd9a0"} toneMapped={false} />
          </mesh>
        </group>
      ))}

      {NODES.map((n, i) => (
        <Bubble key={i} position={n.pos} radius={n.r} logo={n.logo} tint={n.tint} />
      ))}
    </group>
  );
}
