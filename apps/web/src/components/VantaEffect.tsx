'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

interface VantaEffectProps {
  effect?: string;
  config?: any;
  className?: string;
}

export default function VantaEffect({ 
  effect = 'NET', 
  config = {},
  className = "w-full h-full"
}: VantaEffectProps) {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<any>(null)

  useEffect(() => {
    if (!vantaRef.current) return

    // Učitaj Three.js i Vanta.js ako nisu učitani
    const loadScripts = async () => {
      if (!window.THREE) {
        const threeScript = document.createElement('script')
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
        document.head.appendChild(threeScript)
        
        await new Promise(resolve => {
          threeScript.onload = resolve
        })
      }

      if (!window.VANTA) {
        const vantaScript = document.createElement('script')
        vantaScript.src = `https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.${effect.toLowerCase()}.min.js`
        document.head.appendChild(vantaScript)
        
        await new Promise(resolve => {
          vantaScript.onload = resolve
        })
      }

      // Inicijalizuj Vanta efekat
      if (window.VANTA && window.VANTA[effect]) {
        vantaEffect.current = window.VANTA[effect]({
          el: vantaRef.current,
          THREE: window.THREE,
          color: 0x3b82f6,
          backgroundColor: 0x0f172a,
          points: 10,
          maxDistance: 20,
          spacing: 15,
          ...config
        })
      }
    }

    loadScripts()

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
      }
    }
  }, [effect, config])

  return <div ref={vantaRef} className={className} />
}