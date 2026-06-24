"use client";

import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
  Noise,
  HueSaturation,
  BrightnessContrast,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";

// Warm cinematic grade: filmic tonemap, gentle warm bloom, a touch of
// contrast/saturation, vignette, and faint film grain. Depth-of-field is
// optional (desktop only) because it is the heaviest pass.
export function Grade({ dof = false }: { dof?: boolean }) {
  return (
    <EffectComposer>
      {dof ? (
        <DepthOfField focusDistance={0.012} focalLength={0.04} bokehScale={2.4} height={480} />
      ) : (
        <></>
      )}
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.62}
        luminanceSmoothing={0.3}
        mipmapBlur
        radius={0.62}
      />
      <HueSaturation hue={0.02} saturation={0.07} />
      <BrightnessContrast brightness={0.0} contrast={0.1} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <Vignette eskil={false} offset={0.26} darkness={0.62} />
      <Noise opacity={0.022} blendFunction={BlendFunction.OVERLAY} />
    </EffectComposer>
  );
}
