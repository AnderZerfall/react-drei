const PRESSED_DIFF = 0.006;

export interface AnimatedKey {
  default: number;
  pressed: number;
}

export const AnimatedKey = {
  create,
};

export function create(defaultState: number): AnimatedKey {
  return {
    default: defaultState,
    pressed: defaultState - PRESSED_DIFF,
  };
}
