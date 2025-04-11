'use client';

import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

const Gsap = () => {
  const textRef = useRef<HTMLDivElement | null>(null);

  const didEffect = useRef(false);

  useEffect(() => {
    if (didEffect.current) return;
    didEffect.current = true;
    gsap.to(textRef.current, {
      x: '20%',
      color: 'red',
    });
  }, []);

  return <div ref={textRef}>Welcome to GSAP!</div>;
};

export default Gsap;
