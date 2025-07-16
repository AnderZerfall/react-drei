import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Solid } from "./components/Solid";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import { BakeShadows, MeshReflectorMaterial } from "@react-three/drei";

function App() {
  return (
    <Canvas
      style={{ width: "100%", height: "100vh" }}
      shadows
      dpr={[1, 2]}
      camera={{ fov: 40, near: 0.1, far: 100 }}
      eventPrefix="client"
    >
      {/* <Environment /> */}
      <ambientLight intensity={0.2} color="#88aaff" />
      {/* <directionalLight
        position={[0, 10, 20]}
        intensity={0.1}
        color="#88aaff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      /> */}
      <color attach="background" args={["black"]} />
      {/* <hemisphereLight intensity={0.15} groundColor="black" /> */}
      <spotLight
        decay={0}
        position={[0, 50, 60]}
        angle={0.12}
        penumbra={1}
        intensity={1.2}
        castShadow
        shadow-mapSize={1024}
      />
      <CameraBelow />
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.45, 0]}
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
      {/* <spotLight
        decay={0}
        position={[10, 20, 10]}
        angle={0.12}
        penumbra={1}
        intensity={0.1}
        castShadow
        shadow-mapSize={1024}
      /> */}
      <EffectComposer enableNormalPass={false}>
        <Bloom
          luminanceThreshold={0}
          mipmapBlur
          luminanceSmoothing={0.0}
          intensity={5}
        />
        <DepthOfField
          target={[0, 0, 3]}
          focalLength={0.2}
          bokehScale={10}
          height={700}
        />
      </EffectComposer>
      <Solid />
      <BakeShadows />
      {/* <OrbitControls
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      /> */}
    </Canvas>
  );
}

function CameraBelow() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, -0.2, 1.7);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

export default App;
