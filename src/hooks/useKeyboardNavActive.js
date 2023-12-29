import { useState, useEffect } from "react";

export default function useKeyboardNavActive() {
  const [keyboardNavActive, setKeyboardNavActive] = useState(false);

  const handleKeyDown = () => {
    setKeyboardNavActive(true);
  };

  const handleMouseMove = () => {
    setKeyboardNavActive(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return keyboardNavActive;
}
