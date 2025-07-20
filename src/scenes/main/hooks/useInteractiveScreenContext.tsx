import { useContext } from "react";
import { InteractiveScreenContext } from "../context/InterfactiveScreenContext";

export const useInteractiveScreen = () => {
  const context = useContext(InteractiveScreenContext);

  if (!context) {
    throw new Error(
      "useInteractiveScreen must be used within an InteractiveScreenProvider"
    );
  }

  return context;
};
