import { z } from 'zod'

/**
 * Zod schema for dumbbell input validation
 * Includes chamferFactor for realistic beveled edges
 */
export const DumbbellInputSchema = z.object({
  weightKg: z.number().min(0.5).max(100),
  quantity: z.union([z.literal(1), z.literal(2)]).default(2),
  chamferFactor: z.number().min(0).max(0.4).default(0.15), // 0 = pure prism, 0.4 = heavily rounded
})

export type DumbbellInput = z.infer<typeof DumbbellInputSchema>

/**
 * Chamfered hexagonal prism dimensions
 * Extended to include chamfer-specific measurements
 */
export interface HexPrismDimensions {
  volume_liters: number
  volume_cm3: number
  side_length_cm: number          // The outer side length (L)
  actual_side_length_cm: number   // Same as side_length_cm (sides are not cut in width)
  chamfer_width_cm: number        // Width of the bevel (C = k*L)
  height_cm: number
  width_cm: number                // Face-to-face distance (max)
  corner_width_cm: number         // Point-to-point (max)
  aspect_ratio: number
  bevel_offset_cm: number         // Amount the face is smaller than the body
  face_side_length_cm: number     // Side length of the top/bottom face (L')
}

/**
 * Complete dumbbell specification including materials
 */
export interface DumbbellSpec {
  target_weight_kg: number
  quantity: 1 | 2
  chamfer_factor: number
  mortar_density: number // kg/L (default: 2.1)
  molds_needed: number
  mortar_volume_per_mold: number
  tube_volume_per_dumbbell: number
  hex_dimensions: HexPrismDimensions
  materials: {
    cement_bags: number // 1 bag = 25kg
    sand_volume: number // cubic meters
    tube_length: number // cm
    tube_diameter: number // cm (standard: 2.54cm / 1")
  }
}

/**
 * Calculates CHAMFERED hexagonal prism dimensions for a given volume
 * 
 * The chamfer is applied as a BEVEL to the top and bottom edges (lids).
 * The prism consists of:
 * 1. A central hexagonal prism of height (H - 2C) and side L
 * 2. Two hexagonal frustums (top and bottom) of height C, connecting outer side L to inner side L'
 * 
 * @param liters - Volume in liters
 * @param chamferFactor - 0 to 0.4 (fraction of side length used for bevel)
 * @returns HexPrismDimensions object with all calculated dimensions
 */
export function calculateHexagonalPrism(
  liters: number,
  chamferFactor: number = 0.15
): HexPrismDimensions {
  const VOLUME_CM3 = liters * 1000
  const ASPECT_RATIO = 2.1
  const HEX_CONSTANT = (3 * Math.sqrt(3)) / 2 // Area factor for hexagon side=1

  // k = chamferFactor
  // C = k * L (bevel height/width)
  // L' = L * (1 - 2k/sqrt(3))
  // beta = L'/L = 1 - 2k/sqrt(3)
  
  const k = chamferFactor
  const beta = 1 - (2 * k) / Math.sqrt(3)

  // Volume Calculation:
  // V_frustum = L^3 * (k * HEX_CONSTANT / 3) * (1 + beta + beta^2)
  // V_center = L^3 * HEX_CONSTANT * (ASPECT_RATIO - 2 * k)
  // V_total = V_center + 2 * V_frustum
  
  const frustumFactor = (k * HEX_CONSTANT / 3) * (1 + beta + Math.pow(beta, 2))
  const centerFactor = HEX_CONSTANT * (ASPECT_RATIO - 2 * k)
  const totalFactor = centerFactor + 2 * frustumFactor

  // Solve for L
  const sideLength = Math.cbrt(VOLUME_CM3 / totalFactor)

  const height = sideLength * ASPECT_RATIO
  const chamferWidth = sideLength * k
  
  // Calculate L' (inner face side length)
  const faceSideLength = sideLength * beta

  // Face-to-face width (max width at center)
  const faceWidth = sideLength * Math.sqrt(3)

  // Point-to-point width (max width at center)
  const cornerWidth = sideLength * 2

  return {
    volume_liters: liters,
    volume_cm3: VOLUME_CM3,
    side_length_cm: parseFloat(sideLength.toFixed(2)),
    actual_side_length_cm: parseFloat(sideLength.toFixed(2)),
    chamfer_width_cm: parseFloat(chamferWidth.toFixed(2)),
    height_cm: parseFloat(height.toFixed(2)),
    width_cm: parseFloat(faceWidth.toFixed(2)),
    corner_width_cm: parseFloat(cornerWidth.toFixed(2)),
    aspect_ratio: ASPECT_RATIO,
    bevel_offset_cm: parseFloat(chamferWidth.toFixed(2)),
    face_side_length_cm: parseFloat(faceSideLength.toFixed(2)),
  }
}

/**
 * Calculates complete dumbbell specifications including dimensions and materials
 * 
 * @param weightKg - Target weight per dumbbell in kilograms
 * @param quantity - Number of dumbbells to produce (1 or 2)
 * @param chamferFactor - Edge rounding factor (0-0.4, default 0.15)
 * @returns Complete specification including dimensions and materials
 */
export function calculateDumbbell(
  weightKg: number,
  quantity: 1 | 2 = 2,
  chamferFactor: number = 0.15
): DumbbellSpec {
  const MORTAR_DENSITY = 2.1 // kg/L
  const TUBE_DIAMETER = 2.54 // cm (1 inch standard)
  const TUBE_LENGTH = 15 // cm (fixed grip length)

  // Each dumbbell = 2 molds (left + right weight)
  const moldsPerDumbbell = 2
  const totalMolds = moldsPerDumbbell * quantity

  // Calculate mortar volume per mold
  // Weight per side = weightKg / 2
  // Volume = Weight / Density
  const mortarVolumePerMold = weightKg / 2 / MORTAR_DENSITY

  // Calculate tube volume (cylinder: V = πr²h)
  const tubeRadius = TUBE_DIAMETER / 2
  const tubeVolume =
    (Math.PI * Math.pow(tubeRadius, 2) * TUBE_LENGTH) / 1000 // Convert to liters

  // Get hex dimensions for the mold (with chamfer compensation)
  const hexDimensions = calculateHexagonalPrism(mortarVolumePerMold, chamferFactor)

  // Calculate materials
  const totalMortarVolume = mortarVolumePerMold * totalMolds // Liters
  const mortarWeight = totalMortarVolume * MORTAR_DENSITY // kg

  // Mix ratio: 1 part cement : 2 parts sand (by volume)
  const cementWeight = mortarWeight / 3
  const sandWeight = (mortarWeight / 3) * 2

  return {
    target_weight_kg: weightKg,
    quantity,
    chamfer_factor: chamferFactor,
    mortar_density: MORTAR_DENSITY,
    molds_needed: totalMolds,
    mortar_volume_per_mold: parseFloat(mortarVolumePerMold.toFixed(2)),
    tube_volume_per_dumbbell: parseFloat(tubeVolume.toFixed(2)),
    hex_dimensions: hexDimensions,
    materials: {
      cement_bags: Math.ceil(cementWeight / 25), // Round up to nearest bag
      sand_volume: parseFloat((sandWeight / 1600).toFixed(3)), // Sand density ~1600 kg/m³
      tube_length: TUBE_LENGTH,
      tube_diameter: TUBE_DIAMETER,
    },
  }
}
