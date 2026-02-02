import { create } from 'zustand'
import { calculateDumbbell, type DumbbellSpec } from '@/lib/calculations'

interface ForgeState {
  weightKg: number
  quantity: 1 | 2
  chamferFactor: number
  spec: DumbbellSpec
  realisticMode: boolean
  setWeight: (weight: number) => void
  setQuantity: (qty: 1 | 2) => void
  setChamferFactor: (factor: number) => void
  setRealisticMode: (enabled: boolean) => void
}

export const useForgeStore = create<ForgeState>((set) => ({
  weightKg: 10,
  quantity: 2,
  chamferFactor: 0.15,
  spec: calculateDumbbell(10, 2, 0.15),
  realisticMode: false,
  setWeight: (weight) =>
    set((state) => ({
      weightKg: weight,
      spec: calculateDumbbell(weight, state.quantity, state.chamferFactor),
    })),
  setQuantity: (qty) =>
    set((state) => ({
      quantity: qty,
      spec: calculateDumbbell(state.weightKg, qty, state.chamferFactor),
    })),
  setChamferFactor: (factor) =>
    set((state) => ({
      chamferFactor: factor,
      spec: calculateDumbbell(state.weightKg, state.quantity, factor),
    })),
  setRealisticMode: (enabled) => set({ realisticMode: enabled }),
}))
