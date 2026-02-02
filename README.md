# ⚙️ LET'S DUMBBELL

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React Three Fiber](https://img.shields.io/badge/3D-React--Three--Fiber-blue)](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Let's Dumbbell** is a high-performance, professional-grade web utility designed for the DIY fitness community. It enables users to "forge" custom hexagonal mortar dumbbells through precise geometric calculations, real-time 3D visualization, and automated blueprint generation.

[**Launch the Forge**](https://lets-dumbbell.vercel.app/tools/forge) | [**View Workshop**](https://lets-dumbbell.vercel.app/workshop)

---

## 🏗️ Core Pillars

### 1. The 3D Forge
A real-time visualizer built with **React Three Fiber** and **Three.js**. Tweak weights, adjust chamfer factors (beveled edges), and see your future equipment in a high-fidelity environment.
- **Realistic Mode**: Optional post-processing pipeline (Bloom, Noise, High-Res Shadows) for a cinematic experience.
- **Live Geometry**: Watch the hexagonal prism adapt as you change volume and weight parameters.

### 2. Precision Engineering
Unlike simple calculators, our engine accounts for:
- **Mortar Density**: Dynamic calculation based on material weight (defaulting to 2.1 kg/L).
- **Tube Displacement**: Subtracts the volume occupied by the handle tube (1" standard) for exact weight accuracy.
- **Chamfer Logic**: Calculates the surface area and volume of complex chamfered hexagonal prisms.

### 3. Automated Blueprints
Generate assembly-ready **PDF blueprints** in seconds.
- **Templates**: 1:1 scale templates for hexagonal faces and side panels.
- **Material Lists**: Precise estimates for cement bags, sand volume, and tube lengths.
- **Assembly Guide**: Technical drawings included in the PDF output.

### 4. The Workshop
A central hub for DIY fitness tools. While **The Forge** is the flagship module, the workshop is designed to host a suite of optimizers for home gym construction:
- **The Vector**: Parallettes & Dip Bar optimizer (PVC pipe logic).
- **The Box**: 3-in-1 Plyometric Box nesting calculator.
- **The Orb**: Medicine Ball / Slamball density calculator.
- **The Silo**: Sandbag filler system optimizer.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **3D Engine**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (Brutalist Industrial Design)
- **PDF Engine**: [jsPDF](https://github.com/parallax/jsPDF)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/) + [Zod](https://zod.dev/)

---

## 📂 Project Structure

```text
src/
├── app/              # Next.js App Router (Forge & Workshop pages)
├── components/       
│   ├── 3d/           # R3F Scenes and Dumbbell models
│   ├── layout/       # Landing page sections (Hero, Philosophy)
│   └── ui/           # Brutalist UI components (Buttons, Overlays)
├── lib/
│   ├── calculations/ # Hexagonal prism and mortar math engine
│   ├── pdf/          # Blueprint generation logic
│   └── stores/       # Global state (Forge & Language)
└── types/            # Shared TypeScript interfaces
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm / pnpm / yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/lets-dumbbell.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

---

## 📋 Roadmap

- [x] **The Forge**: Hexagonal mortar dumbbell generator.
- [ ] **Material Presets**: Selection between different concrete mixes (high-strength, standard, vermiculite).
- [ ] **The Vector**: Blueprint generator for PVC Parallettes.
- [ ] **The Box**: Plywood cutting diagrams for Plyometric boxes.
- [ ] **AR Preview**: View the 3D equipment in your actual room using WebXR.
- [ ] **Custom Engraving**: Upload patterns to be embossed in the 3D model and PDF.

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🤝 Acknowledgements

- Inspired by the DIY fitness community and the search for accessible home gym solutions.
- 3D textures provided by [Poly Haven](https://polyhaven.com/).
- Icons by [Lucide React](https://lucide.dev/).

---
<p align="center">Built for the strong. Designed for the makers.</p>
