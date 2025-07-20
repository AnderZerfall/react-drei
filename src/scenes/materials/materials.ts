import * as THREE from "three";

export const materials = {
  screen: {
    green: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#22e50c"),
      metalness: 0.2,
      roughness: 0.1,
      reflectivity: 0.8,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      ior: 1.3,
      transmission: 0,
      opacity: 1,
      emissiveIntensity: 1,
      emissive: new THREE.Color("#22e50c"),
      transparent: false,
    }),
  },
  metal: {
    aluminum: new THREE.MeshPhysicalMaterial({
      metalness: 0.97,
      roughness: 0.2,
      reflectivity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0,
      color: new THREE.Color("#212124ff"),
    }),
  },
};
