'use client'

import { useEffect, useRef } from 'react'

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

    const loadVantaEffect = async () => {
      try {
        const THREE = await import('three')
        const VantaModule = await import('vanta/dist/vanta.net.min')

        if (VantaModule.default && vantaRef.current) {
          vantaEffect.current = VantaModule.default({
            el: vantaRef.current,
            THREE: THREE,
            color: 0x3b82f6,
            backgroundColor: 0x0f172a,
            points: 10,
            maxDistance: 20,
            spacing: 15,
            ...config
          })
        }
      } catch (error) {
        console.error('Failed to load Vanta effect:', error)
      }
    }

    loadVantaEffect()

    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy()
        } catch (error) {
          console.warn('Error destroying Vanta effect:', error)
        }
      }
    }
  }, [effect, config])

  return <div ref={vantaRef} className={className} />
}