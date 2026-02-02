'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Edges, useTexture } from '@react-three/drei'
import * as THREE from 'three'
interface HexDumbbellProps {
  sideLength: number // cm (outer side length)
  height: number // cm
  tubeLength?: number // cm
  tubeDiameter?: number // cm
  chamferWidth?: number // cm (bevel size)
  realisticMode?: boolean
}

export function HexDumbbell({
  sideLength,
  height,
  tubeLength = 15,
  tubeDiameter = 2.54,
  chamferWidth = 0, // Default to 0 if not provided
  realisticMode = false,
}: HexDumbbellProps) {
  const groupRef = useRef<THREE.Group>(null)

  // --- TEXTURES ---
  // Load concrete textures
  const concreteTexture = useTexture({
    map: '/images/textures/concrete-diffuse.jpg',
    normalMap: '/images/textures/concrete-normal.jpg',
    roughnessMap: '/images/textures/concrete-roughness.jpg',
  })

  // Load metal textures (optional, or use material properties)
  // Let's assume user will provide metal textures too as per request strategy
  /* 
  const metalTexture = useTexture({
    map: '/images/textures/metal-diffuse.jpg',
    normalMap: '/images/textures/metal-normal.jpg',
    roughnessMap: '/images/textures/metal-roughness.jpg',
  })
  */

  // Configure textures
  useMemo(() => {
    // Concrete
    concreteTexture.map.wrapS = concreteTexture.map.wrapT = THREE.RepeatWrapping
    concreteTexture.normalMap.wrapS = concreteTexture.normalMap.wrapT = THREE.RepeatWrapping
    concreteTexture.roughnessMap.wrapS = concreteTexture.roughnessMap.wrapT = THREE.RepeatWrapping
    
    // Adjust repeat based on size? 
    // For now, fixed repeat is fine, or scale it with the object size
    concreteTexture.map.repeat.set(1, 1) 
    concreteTexture.normalMap.repeat.set(1, 1)
    concreteTexture.roughnessMap.repeat.set(1, 1)
  }, [concreteTexture])

  // Slow idle rotation with mouse parallax
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.3
      groupRef.current.rotation.x = 0.1
    }
  })
  // Convert cm to Three.js units (scale down)
  const scale = 0.02
  const scaledSide = sideLength * scale
  const scaledHeight = height * scale
  const scaledTubeLen = tubeLength * scale
  const scaledTubeRad = (tubeDiameter / 2) * scale
  const scaledChamfer = chamferWidth * scale

  // Calculate inner hexagon side length (L')
  // L' = L - 2C/sqrt(3)
  const scaledInnerSide = scaledSide - (2 * scaledChamfer) / Math.sqrt(3)

  // Create hexagonal prism geometry (Inner Shape)
  const hexShape = useMemo(() => {
    const shape = new THREE.Shape()
    // Use inner side length for the base shape
    const side = scaledInnerSide > 0 ? scaledInnerSide : 0.001 // Prevent negative side
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i
      const x = Math.cos(angle) * side
      const y = Math.sin(angle) * side
      if (i === 0) shape.moveTo(x, y)
      else shape.lineTo(x, y)
    }
    shape.closePath()
    return shape
  }, [scaledInnerSide])

  const extrudeSettings = {
    steps: 1,
    depth: scaledHeight - 2 * scaledChamfer, // Reduce depth by 2*bevel
    bevelEnabled: scaledChamfer > 0,
    bevelThickness: scaledChamfer,
    bevelSize: scaledChamfer,
    bevelSegments: 1, // Flat bevel (chamfer)
  }

  // Force re-mount of Edges when geometry changes
  const edgesKey = `edges-${scaledSide}-${scaledHeight}-${scaledChamfer}`

  return (
    <group ref={groupRef}>
      {/* Inner group offset so tube center aligns with rotation origin */}
      <group position={[-scaledHeight / 2, 0, 0]}>
        {/* Left weight */}
        <mesh
          position={[-(scaledTubeLen / 2 + scaledHeight / 2), 0, 0]}
          rotation={[0, Math.PI / 2, Math.PI / 2]}
          castShadow
          receiveShadow
        >
          <extrudeGeometry args={[hexShape, extrudeSettings]} />
          <meshStandardMaterial 
            {...concreteTexture}
            color="#a0a0a0" // Mix with base color if texture is light/dark
            roughness={1} // Map will override
            metalness={0.1} 
          />
          {!realisticMode && <Edges key={edgesKey} color="#6a6a6a" />}
        </mesh>

        {/* Center tube - original position for proper connection */}
        <mesh
          position={[scaledHeight / 2.35, 0, 0]} // fine-tune position
          rotation={[0, 0, Math.PI / 2]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry
            args={[scaledTubeRad, scaledTubeRad, scaledTubeLen, 32]}
          />
          <meshStandardMaterial 
            color="#1a1a1a" 
            roughness={0.4} 
            metalness={0.8} 
          />
        </mesh>

        {/* Right weight */}
        <mesh
          position={[(scaledTubeLen / 2 + scaledHeight / 2), 0, 0]}
          rotation={[0, Math.PI / 2, Math.PI / 2]}
          castShadow
          receiveShadow
        >
          <extrudeGeometry args={[hexShape, extrudeSettings]} />
          <meshStandardMaterial 
            {...concreteTexture}
            color="#a0a0a0"
            roughness={1}
            metalness={0.1} 
          />
          {!realisticMode && <Edges key={edgesKey} color="#6a6a6a" />}
        </mesh>
      </group>
    </group>
  )
}