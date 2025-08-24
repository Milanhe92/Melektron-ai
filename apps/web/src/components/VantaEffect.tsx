'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VantaEffect = () => {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initVanta = async () => {
      if (!vantaRef.current) return;
      
      const { NET } = await import('vanta/dist/vanta.net.min');
      const effect = NET({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x8a2be2,
        backgroundColor: 0x0a0a18,
        points: 15.00,
        maxDistance: 24.00,
        spacing: 17.00
      });

      return () => {
        if (effect) effect.destroy();
      };
    };

    initVanta();
  }, []);

  return <div ref={vantaRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default VantaEffect;