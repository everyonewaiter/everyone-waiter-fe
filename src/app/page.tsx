"use client";

import { useEffect, useState } from "react";
import Splash from "./(splash)/page";

export default function Home() {
  const FADE_OUT_DURATION = 1000;
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), FADE_OUT_DURATION);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Splash fadeOut={fadeOut} duration={FADE_OUT_DURATION} />}
      <div>hi</div>
    </>
  );
}
