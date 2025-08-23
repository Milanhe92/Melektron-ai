declare module 'vanta/dist/vanta.net.min' {
  interface VantaNetOptions {
    el: HTMLElement;
    THREE?: any;
    color?: number;
    backgroundColor?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
    [key: string]: any;
  }

  interface VantaEffect {
    destroy(): void;
    setOptions?(options: Partial<VantaNetOptions>): void;
  }

  const NET: {
    default: (options: VantaNetOptions) => VantaEffect;
  };
  
  export = NET;
}

declare module 'vanta/dist/vanta.waves.min' {
  interface VantaWavesOptions {
    el: HTMLElement;
    THREE?: any;
    color?: number;
    waveHeight?: number;
    waveSpeed?: number;
    zoom?: number;
    [key: string]: any;
  }

  interface VantaEffect {
    destroy(): void;
    setOptions?(options: Partial<VantaWavesOptions>): void;
  }

  const WAVES: {
    default: (options: VantaWavesOptions) => VantaEffect;
  };
  
  export = WAVES;
}

declare module 'vanta' {
  export interface VantaEffect {
    destroy(): void;
  }
}