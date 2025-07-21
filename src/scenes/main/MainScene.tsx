import {
  BakeShadows,
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
  Sparkles,
  Stars,
  useHelper,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { Keyboard } from "./components/Keyboard";
import { Laptop } from "./components/Laptop";
import { useRef } from "react";
import { useControls } from "leva";
import { easing } from "maath";
import {
  DirectionalLight,
  DirectionalLightHelper,
  PointLight,
  PointLightHelper,
  SpotLight,
  SpotLightHelper,
} from "three";
import { BlendFunction } from "postprocessing";
import { Bulb } from "./components/Bulb";
import { clamp } from "three/src/math/MathUtils.js";

export const MainScene = () => {
  const directionalLightRef = useRef<DirectionalLight>(null!);
  const pointLightRef = useRef<PointLight>(null!);
  const bulbLightRef = useRef<PointLight>(null!);
  const spotLightRef = useRef<SpotLight>(null!);

  //   useHelper(directionalLightRef, DirectionalLightHelper, 1, "cyan");
  //   useHelper(pointLightRef, PointLightHelper, 0.1, "cyan");
  //  useHelper(bulbLightRef, PointLightHelper, 0.1, "yellow");
  //   useHelper(spotLightRef, SpotLightHelper, "pink");

  const { intensity, color } = useControls("Hemisphere Light", {
    intensity: { value: 0.2, min: 0, max: 2, step: 0.01 },
    color: {
      value: "#4378fff",
    },
  });

  const {
    intensity: intensityDirectional,
    color: colorDirectional,
    x,
    y,
    z,
  } = useControls("Directional Light", {
    intensity: { value: 0.05, min: 0, max: 2, step: 0.01 },
    color: {
      value: "#006bd1",
    },
    x: { value: 0, min: -10, max: 10, step: 0.01 },
    y: { value: 0.1, min: -10, max: 10, step: 0.01 },
    z: { value: 1.6, min: -10, max: 10, step: 0.01 },
  });

  const {
    intensity: intensityPoint,
    color: colorPoint,
    x: xPoint,
    y: yPoint,
    z: zPoint,
  } = useControls("Point Light", {
    intensity: { value: 0.2, min: 0, max: 2, step: 0.01 },
    color: {
      value: "#9c83eb",
    },
    x: { value: 0, min: -2, max: 2, step: 0.001 },
    y: { value: 0.07, min: -2, max: 2, step: 0.001 },
    z: { value: -0.8, min: -2, max: 2, step: 0.001 },
  });

  const {
    intensity: intensityBulb,
    color: colorBulb,
    x: xBulb,
    y: yBulb,
    z: zBulb,
  } = useControls("Bulb Light", {
    intensity: { value: 0.2, min: 0, max: 2, step: 0.01 },
    color: {
      value: "#f8a614",
    },
    x: { value: 0.64, min: -2, max: 2, step: 0.001 },
    y: { value: 0.18, min: -2, max: 2, step: 0.001 },
    z: { value: -1.5, min: -2, max: 2, step: 0.001 },
  });

  const {
    intensity: intensitySpot,
    color: colorSpot,
    x: xSpot,
    y: ySpot,
    z: zSpot,
  } = useControls("Spot Light", {
    intensity: { value: 0.03, min: 0, max: 2, step: 0.01 },
    color: {
      value: "#8ac1ff",
    },
    x: { value: 0.14, min: -5, max: 5, step: 0.001 },
    y: { value: 1.77, min: -5, max: 5, step: 0.001 },
    z: { value: 0.74, min: -5, max: 5, step: 0.001 },
  });

  return (
    <>
      <color attach="background" args={["black"]} />
      <hemisphereLight
        intensity={intensity}
        groundColor="black"
        color={color}
      />
      <directionalLight
        ref={directionalLightRef}
        position={[x, y, z]}
        intensity={intensityDirectional}
        color={colorDirectional}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <pointLight
        ref={pointLightRef}
        position={[xPoint, yPoint, zPoint]}
        intensity={intensityPoint}
        color={colorPoint}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
           <pointLight
        ref={bulbLightRef}
        position={[xBulb, yBulb, zBulb]}
        intensity={intensityBulb}
        color={colorBulb}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight
        ref={spotLightRef}
        position={[xSpot, ySpot, zSpot]}
        intensity={intensitySpot}
        color={colorSpot}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.16, 0]}
      >
        <planeGeometry args={[10, 10]} />
        <MeshReflectorMaterial
          blur={[300, 30]}
          resolution={2048}
          mixBlur={1}
          mixStrength={180}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#202020"
          metalness={0.8}
        />
      </mesh>
      <EffectComposer enableNormalPass={false}>
        <Bloom luminanceThreshold={0} luminanceSmoothing={1} height={300} />
        <DepthOfField
          focusDistance={0.06}
          focalLength={0.6}
          bokehScale={10}
          height={700}
        />
        <Vignette eskil={false} offset={0.2} darkness={1.2} />
      </EffectComposer>
      <Bulb scale={0.1} position={[0.6, 0.2, -1.4]} />
      <Keyboard position={[-0.545, -0.1, -1]} />
      <Laptop position={[-0.67, -0.1, -1]} />
      <BakeShadows />
      <AnimatedCamera />
      {/* <CameraInfoLogger /> */}
    </>
  );
};

function CameraInfoLogger() {
  const { camera } = useThree();

  return (
    <OrbitControls
      onChange={() => {
        console.log("Camera position:", camera.position); // THREE.Vector3
        console.log("Camera FOV:", camera.view); // number
      }}
      enableZoom={true}
      enablePan={false}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2}
    />
  );
}


function AnimatedCamera() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        -1 + (state.pointer.x * state.viewport.width) / 3,
        clamp((1 + state.pointer.y), 0, 1) / 2,
        5.5,
      ],
      0.5,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}
