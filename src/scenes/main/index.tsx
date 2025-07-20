import {
  BakeShadows,
  MeshReflectorMaterial,
  OrbitControls,
  useHelper,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { Keyboard } from "./components/Keyboard";
import { Laptop } from "./components/Laptop";
import { Suspense, useRef } from "react";
import { useControls } from "leva";
import { DirectionalLight, DirectionalLightHelper } from "three";
import { MainScene } from "./MainScene";

export const Scene = () => {
  return (
    <Canvas
      style={{ width: "100%", height: "100vh" }}
      shadows
      dpr={[1, 2]}
      camera={{
        position: [
          0.00039792758325033476, 1.1920566976502652e-17, 0.19467722583000083,
        ],
        fov: 10,
        near: 0.1,
        far: 100,
      }}
      eventPrefix="client"
    >
      <Suspense fallback={null}>
        <MainScene />
      </Suspense>
    </Canvas>
  );
};
