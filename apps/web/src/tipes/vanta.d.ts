declare module 'vanta/dist/vanta.net.min' {
  interface VantaNetOptions {
    el: HTMLElement | string;
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
    setOptions(options: Partial<VantaNetOptions>): void;
  }

  function NET(options: VantaNetOptions): VantaEffect;
  
  export default NET;
}

declare module 'vanta/dist/vanta.waves.min' {
  interface VantaWavesOptions {
    el: HTMLElement | string;
    THREE?: any;
    color?: number;
    waveHeight?: number;
    waveSpeed?: number;
    zoom?: number;
    [key: string]: any;
  }

  interface VantaEffect {
    destroy(): void;
    setOptions(options: Partial<VantaWavesOptions>): void;
  }

  function WAVES(options: VantaWavesOptions): VantaEffect;
  
  export default WAVES;
}

declare module 'vanta' {
  export * from 'vanta/dist/vanta.net.min';
  export * from 'vanta/dist/vanta.waves.min';
}