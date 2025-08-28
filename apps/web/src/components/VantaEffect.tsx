'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface VantaEffectProps {
  effect: string
  config?: any
  className?: string
}

const VantaEffect = ({ effect, config = {}, className = '' }: VantaEffectProps) => {
  const vantaRef = useRef<HTMLDivElement>(null)
  const effectInstance = useRef<any>(null)

  useEffect(() => {
    if (!vantaRef.current) return

    const initEffect = async () => {
      // Ukloni postojeći efekat ako postoji
      if (effectInstance.current) {
        effectInstance.current.destroy?.()
      }

      try {
        let vantaModule
        switch (effect) {
          case 'NET':
            vantaModule = await import('vanta/dist/vanta.net.min')
            break
          case 'GLOBE':
            vantaModule = await import('vanta/dist/vanta.globe.min')
            break
          case 'CELLS':
            vantaModule = await import('vanta/dist/vanta.cells.min')
            break
          case 'WAVES':
            vantaModule = await import('vanta/dist/vanta.waves.min')
            break
          default:
            vantaModule = await import('vanta/dist/vanta.net.min')
        }

        effectInstance.current = vantaModule.default({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x00ffff,
          backgroundColor: 0x0a0a23,
          points: 15.00,
          maxDistance: 25.00,
          spacing: 18.00,
          ...config
        })
      } catch (error) {
        console.error('Failed to load Vanta effect:', error)
      }
    }

    initEffect()

    return () => {
      if (effectInstance.current) {
        effectInstance.current.destroy?.()
      }
    }
  }, [effect, config])

  return <div ref={vantaRef} className={className} />
}

export default VantaEffect