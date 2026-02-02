'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Html, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette, TiltShift, BrightnessContrast } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { HexDumbbell } from './HexDumbbell'

interface SceneProps {
  sideLength?: number
  height?: number
  tubeLength?: number
  tubeDiameter?: number
  chamferWidth?: number
  realisticMode?: boolean
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-concrete-mid border-t-accent-forge rounded-full animate-spin" />
      </div>
    </Html>
  )
}

export default function Scene({
  sideLength = 9.24,
  height = 19.4,
  tubeLength = 15,
  tubeDiameter = 2.54,
  chamferWidth = 0,
  realisticMode = false,
}: SceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 2], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: realisticMode ? '#1a1a1a' : 'transparent' }}
    >
      {/* Lighting - industrial harsh spotlight */}
      <ambientLight intensity={realisticMode ? 0.1 : 0.5} />
      
      {/* Main Key Light - High Contrast */}
      <spotLight
        position={[8, 12, 8]}
        angle={0.2}
        penumbra={0.4} // Sharper shadows
        intensity={realisticMode ? 4 : 2}
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize={[2048, 2048]} // High res shadows
      />
      
      {/* Fill Light (Subtle blueish for contrast) */}
      <pointLight position={[-10, -5, -10]} intensity={realisticMode ? 0.2 : 0.5} color={realisticMode ? "#cfd8dc" : "#ffffff"} />
      
      {/* Rim Light (Dramatic Accent) */}
      {realisticMode && (
          <spotLight
              position={[-5, 2, -5]} // Back-left
              intensity={8}
              color="#ff4500" // Accent forge color light
              angle={0.4}
              penumbra={0.3}
              castShadow // Rim light also casting shadows for self-shadowing details
          />
      )}

      <Suspense fallback={<LoadingFallback />}>
        <HexDumbbell
          sideLength={sideLength}
          height={height}
          tubeLength={tubeLength}
          tubeDiameter={tubeDiameter}
          chamferWidth={chamferWidth}
          realisticMode={realisticMode}
        />
        <Environment preset={realisticMode ? "city" : "warehouse"} blur={realisticMode ? 0.8 : 0} background={false} />
        
        {realisticMode && (
            <>
                {/* Dust Motes - Subtle floating particles */}
                <Sparkles 
                  count={120} 
                  scale={6} 
                  size={0.6} // Small dust size
                  speed={0.2} // Slow float
                  opacity={0.4} 
                  color="#ffffff" 
                  noise={0.1}
                />
                
                {/* Cinematic Post-Processing */}
                <EffectComposer enableNormalPass={false}>
                    <Bloom luminanceThreshold={1.1} mipmapBlur intensity={0.4} />
                    <TiltShift blur={0.05} /> 
                    <Vignette eskil={false} offset={0.3} darkness={0.9} />
                    <BrightnessContrast
                      brightness={0.0}
                      contrast={0.15}
                    />
                    <Noise opacity={0.06} />
                </EffectComposer>
            </>
        )}
      </Suspense>

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={realisticMode ? 0.3 : 0.5} // Slower rotate in cinematic mode
        enablePan={false}
      />
    </Canvas>
  )
}
