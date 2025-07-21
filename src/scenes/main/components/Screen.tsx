import { PerspectiveCamera, RenderTexture, Text } from "@react-three/drei";
import { type JSX, type ReactNode } from "react";
import * as THREE from "three";
import { useInteractiveScreen } from "../hooks/useInteractiveScreenContext";

export type ScreenBaseProps = JSX.IntrinsicElements["group"] & {
  children: ReactNode;
};

export type ScreenProps = JSX.IntrinsicElements["group"] & {
  screen?: string;
};

export const ScreenBase = ({ children, ...props }: ScreenBaseProps) => {
  return (
    <group {...props}>
      <mesh
        geometry={new THREE.PlaneGeometry(1, 1)}
        scale={0.3}
        position={[0.666, 0.15, -0.09]}
        rotation={[-Math.PI / 9, 0, 0]}
      >
        <meshPhysicalMaterial
          emissive="#0c1025"
          emissiveIntensity={0.3}
          toneMapped={false}
          metalness={0.2}
          roughness={0.1}
          reflectivity={0.8}
          ior={1.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
        >
          <RenderTexture width={512} height={512} attach="map" anisotropy={16}>
            {children}
          </RenderTexture>
        </meshPhysicalMaterial>
      </mesh>
    </group>
  );
};

export interface TextAreaProps {
  defaultText?: string;
}

export const TextArea = ({ defaultText }: TextAreaProps) => {
  return (
    <Text
      textAlign="center"
      font="/mem-prop-5x6.ttf"
      fontSize={0.4}
      color="white"
      direction="ltr"
      maxWidth={6.5}
      overflowWrap="break-word"
    >
      {defaultText}
      <meshStandardMaterial
        attach="material"
        color="#7703fc"
        emissive="#7703fc"
        emissiveIntensity={6}
      />
    </Text>
  );
};


const DEFAULT_TEXT = "Welcome to the VOID :] Type anything . . ."

export const Screen = ({ ...props }: ScreenProps) => {
  const { text } = useInteractiveScreen();
  return (
    <ScreenBase {...props}>
      <PerspectiveCamera
        makeDefault
        manual
        aspect={1 / 1}
        position={[0, 0, 7.51]}
      />
      <color attach="background" args={["#0c1025"]} />
      <ambientLight intensity={0.5} />
      <TextArea defaultText={text || DEFAULT_TEXT} />
    </ScreenBase>
  );
};
