/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 Laptop.glb -t --transform 
Files: Laptop.glb [2.9MB] > F:\DreiCoolStuff\react-drei\Laptop-transformed.glb [132.89KB] (95%)
*/

import * as THREE from "three";
import { type JSX } from "react";
import { useGLTF } from "@react-three/drei";
import { type GLTF } from "three-stdlib";
import { materials } from "../../materials/materials";
import { Screen } from "./Screen";

export type GLTFResult = GLTF & {
  nodes: {
    laptop: THREE.Mesh;
    screen: THREE.Mesh;
  };
  materials: {
    Base: THREE.MeshStandardMaterial;
    Screen: THREE.MeshStandardMaterial;
  };
  meshes: {
    laptop: THREE.Mesh;
    screen: THREE.Mesh;
  };
};

export function Laptop(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("/Laptop-transformed.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.laptop.geometry}
        material={materials.metal.aluminum}
        position={[0.666, -0.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <Screen />
    </group>
  );
}

useGLTF.preload("/Laptop-transformed.glb");
