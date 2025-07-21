import { useEffect, useRef, useState, type JSX } from "react";
import * as THREE from "three";
import { useInteractiveScreen } from "../hooks/useInteractiveScreenContext";
import { materials } from "../../materials/materials";
import { useFrame } from "@react-three/fiber";
import { AnimatedKey as AnimatedKeyState } from "../models/AnimatedKey";

export type AnimatedKeyProps = JSX.IntrinsicElements["mesh"] & {
  relevantKey: string;
};

export const AnimatedKey = ({ relevantKey, ...props }: AnimatedKeyProps) => {
  const ref = useRef<THREE.Mesh>(null);

  const { position } = props;
  const keyStates = AnimatedKeyState.create(
    Array.isArray(position) && position ? position[1] : 0
  );

  const [currentState, setCurrentState] = useState(keyStates.default);
  const { pressedKey } = useInteractiveScreen();

  useEffect(() => {
    if (!ref.current) return;

    if (!pressedKey) {
      setCurrentState(keyStates.default);
      ref.current.material = materials.metal.aluminum;
    }

    if (pressedKey === relevantKey) {
      setCurrentState(keyStates.pressed);
      ref.current.material = materials.screen.purple;
    }
  }, [keyStates, pressedKey, relevantKey]);

  useFrame(() => {
    if (!ref.current) return;

    ref.current.position.lerp(
      { ...ref.current.position, y: currentState },
      0.1
    );
  });

  return <mesh ref={ref} {...props} />;
};
