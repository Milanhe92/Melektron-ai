declare global {
  interface Window {
    THREE?: any;
    VANTA?: any;
  }
}

declare module 'vanta/dist/vanta.net.min' {
  interface VantaNetOptions {
    el: HTMLElement;
    THREE?: any;
    [key: string]: any;
  }
  interface VantaEffect { destroy(): void; }
  function NET(options: VantaNetOptions): VantaEffect;
  export default NET;
}

declare module 'vanta/dist/vanta.globe.min' {
  interface VantaGlobeOptions {
    el: HTMLElement;
    THREE?: any;
    [key: string]: any;
  }
  interface VantaEffect { destroy(): void; }
  function GLOBE(options: VantaGlobeOptions): VantaEffect;
  export default GLOBE;
}

declare module 'vanta/dist/vanta.cells.min' {
  interface VantaCellsOptions {
    el: HTMLElement;
    THREE?: any;
    [key: string]: any;
  }
  interface VantaEffect { destroy(): void; }
  function CELLS(options: VantaCellsOptions): VantaEffect;
  export default CELLS;
}

declare module 'vanta/dist/vanta.waves.min' {
  interface VantaWavesOptions {
    el: HTMLElement;
    THREE?: any;
    [key: string]: any;
  }
  interface VantaEffect { destroy(): void; }
  function WAVES(options: VantaWavesOptions): VantaEffect;
  export default WAVES;
}

export {}