'use client';

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

function detectSafari(userAgent: string) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  const isSafari = ua.includes("safari") && !ua.includes("chrome") && !ua.includes("crios") && !ua.includes("android") && !ua.includes("fxios") && !ua.includes("edge") && !ua.includes("edg");
  return isSafari;
}

export function useMotionPreferences() {
  const prefersReducedMotion = useReducedMotion();
  const [isSafari, setIsSafari] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    setIsSafari(detectSafari(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const handleChange = (event?: MediaQueryListEvent) => {
      if (event) {
        setIsTouchDevice(event.matches);
      } else {
        setIsTouchDevice(mediaQuery.matches);
      }
    };

    handleChange();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const shouldReduceMotion = useMemo(() => {
    return Boolean(prefersReducedMotion) || isSafari || isTouchDevice;
  }, [prefersReducedMotion, isSafari, isTouchDevice]);

  return {
    allowMotion: !shouldReduceMotion,
    shouldReduceMotion,
    isSafari,
    isTouchDevice,
  };
}
