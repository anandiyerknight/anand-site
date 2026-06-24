"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Grade } from "./Grade";
import { IntegrationHub } from "./scenes/IntegrationHub";

// Fixed full-viewport WebGL canvas behind the scrolling DOM overlay.
// Dynamically imported (ssr:false) by the route, so three never hits the server.
export default function ExperienceCanvas() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background: "linear-gradient(180deg,#11192c 0%,#0a1020 46%,#05070e 100%)",
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.75]}
        camera={{ fov: 50, position: [0, 0, 7.8], near: 0.1, far: 100 }}
      >
        <fog attach="fog" args={["#0a1020", 16, 40]} />

        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 6, 4]} intensity={1.7} color="#ffe1c2" />
        <directionalLight position={[-6, 2, -4]} intensity={0.85} color="#a9c2ff" />

        <Suspense fallback={null}>
          <Environment files="/experience/hdri/studio.hdr" environmentIntensity={1.0} />
          <IntegrationHub />
        </Suspense>

        <Grade dof={false} />
        <AdaptiveDpr pixelated={false} />
      </Canvas>
    </div>
  );
}
