/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { KeyMapper } from "../utils/KeyMapper";

interface InteractiveScreenContextType {
  text: string;
  setText: (text: string) => void;
  pressedKey: string | null;
  setKey: (key: string | null) => void;
}

export const InteractiveScreenContext = createContext<
  InteractiveScreenContextType | undefined
>(undefined);

export const InteractiveScreenProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [text, setText] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const [key, setKey] = useState<string | null>(null);

  const handleFocus = useCallback(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", (event) => setKey(event.key));

    return () =>
      document.removeEventListener("keydown", (event) => setKey(event.key));
  }, []);

  useEffect(() => {
    handleFocus();
  }, [handleFocus]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (key) setKey(null);
    }, 100);

    return () => clearTimeout(timeout);
  }, [key]);

  const pressedKey = key && KeyMapper(key);

  return (
    <InteractiveScreenContext.Provider
      value={{ text, setText, pressedKey, setKey }}
    >
      <input
        style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
        ref={ref}
        type="text"
        onChange={(e) => setText(e.target.value)}
        autoFocus
        onBlur={handleFocus}
        // onKeyDownCapture={(e) => setKey(e.key)}
      />
      {children}
    </InteractiveScreenContext.Provider>
  );
};
