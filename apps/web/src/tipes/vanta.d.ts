// Global Window extensions
declare global {
  interface Window {
    THREE?: any;
    VANTA?: any;
  }
}

// Vanta module declarations
declare module 'vanta/dist/vanta.net.min' {
  interface VantaNetOptions {
    el: HTMLElement;
    THREE?: any;
    color?: number;
    backgroundColor?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    [key: string]: any;
  }

  interface VantaEffect {
    destroy(): void;
    setOptions?(options: Partial<VantaNetOptions>): void;
  }

  function NET(options: VantaNetOptions): VantaEffect;
  
  export default NET;
}

declare module 'vanta/dist/vanta.waves.min' {
  interface VantaWavesOptions {
    el: HTMLElement;
    THREE?: any;
    color?: number;
    waveHeight?: number;
    waveSpeed?: number;
    zoom?: number;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    [key: string]: any;
  }

  interface VantaEffect {
    destroy(): void;
    setOptions?(options: Partial<VantaWavesOptions>): void;
  }

  function WAVES(options: VantaWavesOptions): VantaEffect;
  
  export default WAVES;
}

declare module 'vanta' {
  export interface VantaEffect {
    destroy(): void;
  }
}

// Other module declarations
declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

export {}