import { jsPDF } from 'jspdf'
import type { DumbbellSpec } from '@/lib/calculations'
import { translations, type Language } from '@/lib/i18n/translations'

/**
 * PDF Template Generator for Hexagonal Prism Dumbbell Molds
 */

interface PDFGeneratorOptions {
  spec: DumbbellSpec
  projectName?: string
  language?: Language
}

// Convert cm to PDF points (72 points = 1 inch = 2.54 cm)
const cmToPt = (cm: number): number => (cm / 2.54) * 72
const cmToMm = (cm: number): number => cm * 10

// A4 dimensions in points
const A4_WIDTH = 595.28
const A4_HEIGHT = 841.89
const MARGIN = 40
const CONTENT_WIDTH = A4_WIDTH - 2 * MARGIN
const CONTENT_HEIGHT = A4_HEIGHT - 2 * MARGIN

/**
 * Draw a hexagon at specified position
 */
function drawHexagon(
  doc: jsPDF,
  centerX: number,
  centerY: number,
  sideLengthPt: number,
  options: {
    fill?: boolean;
    label?: string;
    showDimensions?: boolean;
    sideLengthCm?: number;
    t?: typeof translations.en.pdf;
    bevelOffsetPt?: number;
    faceSideLengthPt?: number;
  } = {}
): void {
  const { fill = false, label, showDimensions = false, sideLengthCm, t, faceSideLengthPt } = options

  // Draw Outer Hexagon (Max Extents)
  const outerPoints: [number, number][] = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2
    const x = centerX + Math.cos(angle) * sideLengthPt
    const y = centerY + Math.sin(angle) * sideLengthPt
    outerPoints.push([x, y])
  }

  doc.setLineWidth(1)
  doc.setDrawColor(47, 47, 47)

  if (fill) {
    doc.setFillColor(200, 200, 200)
  }

  doc.moveTo(outerPoints[0][0], outerPoints[0][1])
  for (let i = 1; i < outerPoints.length; i++) {
    doc.lineTo(outerPoints[i][0], outerPoints[i][1])
  }
  doc.lineTo(outerPoints[0][0], outerPoints[0][1])

  if (fill) doc.fill()
  doc.stroke()

  // Draw Inner Hexagon (Face) if bevel is present
  if (faceSideLengthPt && faceSideLengthPt < sideLengthPt) {
    const innerPoints: [number, number][] = []
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2
      const x = centerX + Math.cos(angle) * faceSideLengthPt
      const y = centerY + Math.sin(angle) * faceSideLengthPt
      innerPoints.push([x, y])
    }

    doc.setLineWidth(0.5)
    doc.setDrawColor(100, 100, 100)
    // Connect corners (chamfer lines)
    for (let i = 0; i < 6; i++) {
      doc.line(outerPoints[i][0], outerPoints[i][1], innerPoints[i][0], innerPoints[i][1])
    }

    // Draw inner hex
    doc.moveTo(innerPoints[0][0], innerPoints[0][1])
    for (let i = 1; i < innerPoints.length; i++) {
      doc.lineTo(innerPoints[i][0], innerPoints[i][1])
    }
    doc.lineTo(innerPoints[0][0], innerPoints[0][1])
    doc.stroke()
  }

  // Label
  if (label) {
    doc.setFontSize(12)
    doc.setTextColor(47, 47, 47)
    doc.setFont('helvetica', 'bold')
    doc.text(label, centerX, centerY + 4, { align: 'center' })
  }

  // Dimension annotation
  if (showDimensions && sideLengthCm && t) {
    doc.setFontSize(8)
    doc.setTextColor(106, 106, 106)
    doc.setFont('helvetica', 'normal')
    doc.text(`${t.sideLength}: ${sideLengthCm} cm`, centerX, centerY + sideLengthPt + 15, { align: 'center' })
  }
}

/**
 * Draw a rectangular side panel
 */
function drawSidePanel(
  doc: jsPDF,
  x: number,
  y: number,
  widthPt: number,
  heightPt: number,
  label: string,
  showDimensions: boolean = false,
  widthCm?: number,
  heightCm?: number,
  bevelHeightPt?: number,
  topWidthPt?: number
): void {
  // If bevel parameters are present, draw the complex shape (Trapezoid - Rect - Trapezoid)
  if (bevelHeightPt && topWidthPt && bevelHeightPt > 0) {
    // 45 degree bevel means the slant length on paper is bevelHeight * sqrt(2)
    const slantHeightPt = bevelHeightPt * Math.sqrt(2)
    const centerHeightPt = heightPt - 2 * bevelHeightPt

    // Coordinates relative to center
    const centerX = x + widthPt / 2

    // Y positions (Top to Bottom)
    // We start drawing from y
    const startY = y

    const yTop = startY
    const yFoldTop = startY + slantHeightPt
    const yFoldBottom = yFoldTop + centerHeightPt
    const yBottom = yFoldBottom + slantHeightPt

    // X positions
    // Flaps are narrower (topWidthPt)
    const xTopLeft = centerX - topWidthPt / 2
    const xTopRight = centerX + topWidthPt / 2

    // Center is full width (widthPt)
    const xFoldLeft = x
    const xFoldRight = x + widthPt

    doc.setLineWidth(1)
    doc.setDrawColor(47, 47, 47)
    doc.setFillColor(200, 200, 200)

    // Draw Outline
    doc.moveTo(xTopLeft, yTop)
    doc.lineTo(xTopRight, yTop)
    doc.lineTo(xFoldRight, yFoldTop) // Slant down right
    doc.lineTo(xFoldRight, yFoldBottom) // Straight down right
    doc.lineTo(xTopRight, yBottom) // Slant down right (to bottom flap width) - WAIT.
    // Bottom flap is also tapered? 
    // Yes, bottom hexagon is same as top hexagon.
    // So bottom flap tapers FROM xFoldRight TO xTopRight? No.
    // Bottom flap tapers FROM widthPt TO topWidthPt.
    // So bottom vertices are xTopRight (if symmetrical) but shifted down.
    // Wait, xTopRight is (centerX + topWidthPt/2). Correct.

    doc.lineTo(xTopRight, yBottom) // Slant down
    doc.lineTo(xTopLeft, yBottom) // Bottom edge
    doc.lineTo(xFoldLeft, yFoldBottom) // Slant up
    doc.lineTo(xFoldLeft, yFoldTop) // Straight up
    doc.lineTo(xTopLeft, yTop) // Slant up

    doc.fill()
    doc.stroke()

    // Draw Fold Lines (Dashed) - Orange
    doc.setLineWidth(0.5)
    doc.setDrawColor(255, 140, 0)
    doc.setLineDashPattern([3, 3], 0)

    doc.line(xFoldLeft, yFoldTop, xFoldRight, yFoldTop)
    doc.line(xFoldLeft, yFoldBottom, xFoldRight, yFoldBottom)

    // Draw Vertical Separator (if not S1)
    if (label !== 'S1') {
      doc.line(xFoldLeft, yFoldTop, xFoldLeft, yFoldBottom)

      // Cut lines between flaps
      doc.setLineDashPattern([], 0)
      doc.setDrawColor(47, 47, 47)
      doc.line(xFoldLeft, yTop, xFoldLeft, yFoldTop) // This is technically outside the shape if tapered
      // Wait, if tapered, the flap edges are SLANTED. They are not vertical.
      // The neighbors share the SLANTED edge? 
      // If you fold a tapered flap, the gap opens up if not shared?
      // Actually, for papercraft, usually you have tabs. 
      // Here we assume butt joint + tape.
      // The shape drawn is the NET surface.
      // If we print S1, S2, S3 side-by-side.
      // Center parts touch.
      // Flaps do NOT touch because they taper inwards.
      // So there is a GAP between the top flap of S1 and top flap of S2.
      // So we don't need a cut line, we need to draw the gap.
      // But 'drawSidePanel' is called in a loop with x offset = scaledWidth.
      // scaledWidth = panelWidth = sidePt.
      // If we draw tapered flaps centered on that width, they will naturally have gaps between them!
      // Perfect.
      // So just draw the vertical separator on the main body.
    }

    doc.setLineDashPattern([], 0)

    // Label
    doc.setFontSize(14)
    doc.setTextColor(47, 47, 47)
    doc.setFont('helvetica', 'bold')
    doc.text(label, centerX, yFoldTop + centerHeightPt / 2 + 4, { align: 'center' })

    // Dimensions
    if (showDimensions && widthCm && heightCm) {
      doc.setFontSize(7)
      doc.setTextColor(106, 106, 106)
      doc.setFont('helvetica', 'normal')

      // Main Size (Center)
      doc.text(`${widthCm} cm`, centerX, yFoldBottom - 10, { align: 'center' })

      // Bevel Instruction
      doc.setFontSize(6)
      doc.setTextColor(255, 69, 0)
      doc.text(`FOLD 45°`, centerX, yFoldTop - 5, { align: 'center' })
      doc.text(`FOLD 45°`, centerX, yFoldBottom + 8, { align: 'center' })
    }

  } else {
    // Standard Rectangular drawing (fallback)
    doc.setLineWidth(1)
    doc.setDrawColor(47, 47, 47)
    doc.setFillColor(200, 200, 200)
    doc.rect(x, y, widthPt, heightPt, 'FD')

    // Fold lines
    doc.setLineWidth(0.5)
    doc.setDrawColor(184, 134, 11)
    doc.setLineDashPattern([3, 3], 0)

    if (label !== 'S1') {
      doc.line(x, y, x, y + heightPt)
    }

    doc.setLineDashPattern([], 0)

    // Label
    doc.setFontSize(14)
    doc.setTextColor(47, 47, 47)
    doc.setFont('helvetica', 'bold')
    doc.text(label, x + widthPt / 2, y + heightPt / 2 + 4, { align: 'center' })

    // Dimensions
    if (showDimensions && widthCm && heightCm) {
      doc.setFontSize(8)
      doc.setTextColor(106, 106, 106)
      doc.setFont('helvetica', 'normal')
      doc.text(`${widthCm} × ${heightCm} cm`, x + widthPt / 2, y + heightPt - 10, { align: 'center' })
    }
  }
}

/**
 * Draw tube hole template circle
 */
function drawTubeHole(
  doc: jsPDF,
  x: number,
  y: number,
  diameterCm: number,
  t: typeof translations.en.pdf
): void {
  const radiusPt = cmToPt(diameterCm / 2)

  doc.setLineWidth(1.5)
  doc.setDrawColor(255, 69, 0)
  doc.circle(x, y, radiusPt)

  // Cross-hair
  doc.setLineWidth(0.5)
  doc.setLineDashPattern([2, 2], 0)
  doc.line(x - radiusPt - 10, y, x + radiusPt + 10, y)
  doc.line(x, y - radiusPt - 10, x, y + radiusPt + 10)
  doc.setLineDashPattern([], 0)

  // Dimension
  doc.setFontSize(10)
  doc.setTextColor(255, 69, 0)
  doc.setFont('helvetica', 'bold')
  const label = t.cutHole.replace('{diameter}', diameterCm.toString())
  // Clean up if font doesn't support ∅
  const dimLabel = `D=${diameterCm} cm`
  doc.text(dimLabel, x, y + radiusPt + 20, { align: 'center' })
}

/**
 * PAGE 1: Project Information
 */
function drawProjectInfoPage(doc: jsPDF, spec: DumbbellSpec, projectName: string, t: typeof translations.en.pdf): void {
  const dims = spec.hex_dimensions
  const lineHeight = 16

  // === HEADER ===
  doc.setFillColor(47, 47, 47)
  doc.rect(0, 0, A4_WIDTH, 50, 'F')

  doc.setFontSize(16)
  doc.setTextColor(239, 239, 239)
  doc.setFont('helvetica', 'bold')
  // Use translations for brand if desired or fixed
  doc.text(t.title, MARGIN, 32)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`${spec.target_weight_kg}kg ${t.template}`, A4_WIDTH - MARGIN, 32, { align: 'right' })

  // === PROJECT NAME ===
  doc.setFontSize(18)
  doc.setTextColor(47, 47, 47)
  doc.setFont('helvetica', 'bold')
  doc.text(projectName.toUpperCase(), MARGIN, 85)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(106, 106, 106)
  doc.text(`${t.generated}: ${new Date().toLocaleDateString()}`, MARGIN, 100)

  // === DIMENSIONS ===
  let y = 140
  doc.setFontSize(12)
  doc.setTextColor(47, 47, 47)
  doc.setFont('helvetica', 'bold')
  doc.text(t.dimensions, MARGIN, y)

  doc.setDrawColor(47, 47, 47)
  doc.setLineWidth(0.5)
  doc.line(MARGIN, y + 5, MARGIN + 120, y + 5)

  y += 25
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)

  const dimRows = [
    [t.sideLength + ':', `${dims.side_length_cm} cm`],
    [t.height + ':', `${dims.height_cm} cm`],
    [t.width + ':', `${dims.width_cm} cm`],
    [t.volume + ':', `${dims.volume_liters.toFixed(2)} L`],
  ]

  dimRows.forEach((row) => {
    doc.setTextColor(106, 106, 106)
    doc.text(row[0], MARGIN, y)
    doc.setTextColor(47, 47, 47)
    doc.text(row[1], MARGIN + 120, y) // Increased spacing for long labels
    y += lineHeight
  })

  // === MATERIALS NEEDED ===
  y = 140
  const rightCol = A4_WIDTH / 2 + 20
  doc.setFontSize(12)
  doc.setTextColor(47, 47, 47)
  doc.setFont('helvetica', 'bold')
  doc.text(t.materials, rightCol, y)

  doc.line(rightCol, y + 5, rightCol + 140, y + 5)

  y += 25
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)

  const totalMortar = spec.mortar_volume_per_mold * spec.molds_needed
  const mortarLabel = `${totalMortar.toFixed(2)} L`
  const moldsLabel = `${spec.molds_needed} (${spec.quantity} ${spec.quantity > 1 ? t.dumbbells : t.dumbbell})`

  const matRows = [
    [t.cement + ':', `${spec.materials.cement_bags} ${t.bag}`],
    [t.sand + ':', `${spec.materials.sand_volume.toFixed(3)} m³`],
    [t.totalMortar + ':', mortarLabel],
    [t.pvcTube + ':', `${spec.materials.tube_length} cm × ∅${spec.materials.tube_diameter} cm`],
    [t.moldsRequired + ':', moldsLabel],
  ]

  matRows.forEach((row) => {
    doc.setTextColor(106, 106, 106)
    doc.text(row[0], rightCol, y)
    doc.setTextColor(47, 47, 47)
    // Wrap long text if needed, simple approach here
    doc.text(row[1], rightCol + 100, y)
    y += lineHeight
  })

  // === INSTRUCTIONS ===
  y = 300
  doc.setFontSize(12)
  doc.setTextColor(47, 47, 47)
  doc.setFont('helvetica', 'bold')
  doc.text(t.instructions, MARGIN, y)
  doc.line(MARGIN, y + 5, MARGIN + 180, y + 5)

  y += 25
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(106, 106, 106)

  const instructions = [
    t.step1, t.step2, t.step3, t.step4, t.step5, t.step6, t.step7, t.step8, t.step9
  ]

  instructions.forEach((text) => {
    // splitTextToSize handles line wrapping
    const lines = doc.splitTextToSize(text, A4_WIDTH - 2 * MARGIN)
    doc.text(lines, MARGIN, y)
    y += lines.length * 14
  })

  // === TUBE HOLE TEMPLATE ===
  y = 550
  doc.setFontSize(12)
  doc.setTextColor(47, 47, 47)
  doc.setFont('helvetica', 'bold')
  doc.text(t.tubeHoleTemplate, MARGIN, y)
  doc.line(MARGIN, y + 5, MARGIN + 220, y + 5)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(106, 106, 106)
  doc.text(t.cutHoleNote, MARGIN, y + 20)

  // Draw actual-size tube hole
  const tubeHoleX = MARGIN + 80
  const tubeHoleY = y + 100
  drawTubeHole(doc, tubeHoleX, tubeHoleY, spec.materials.tube_diameter, t)

  // Page count note
  const isLargeWeight = spec.target_weight_kg > 12.5
  const totalPages = isLargeWeight ? 5 : 3

  doc.setFontSize(10)
  doc.setTextColor(47, 47, 47)
  doc.setFont('helvetica', 'bold')
  const pageCountText = t.pageCountNote.replace('{count}', totalPages.toString())
  doc.text(pageCountText, MARGIN, y + 180)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(106, 106, 106)
  doc.text(t.printNote, MARGIN, y + 195)

  // === FOOTER ===
  doc.setFillColor(47, 47, 47)
  doc.rect(0, A4_HEIGHT - 25, A4_WIDTH, 25, 'F')
  doc.setFontSize(8)
  doc.setTextColor(239, 239, 239)
  doc.text(`${t.page} 1 | lets-dumbbell.vercel.app`, A4_WIDTH / 2, A4_HEIGHT - 10, { align: 'center' })
}

/**
 * Draw page header for cutting template pages
 */
function drawCuttingPageHeader(doc: jsPDF, title: string, pageNum: number, totalPages: number, t: typeof translations.en.pdf): void {
  doc.setFillColor(47, 47, 47)
  doc.rect(0, 0, A4_WIDTH, 40, 'F')

  doc.setFontSize(12)
  doc.setTextColor(239, 239, 239)
  doc.setFont('helvetica', 'bold')
  doc.text(title, MARGIN, 26)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  const scaleText = t.printNote.split('.')[0] || '100% scale' // rough fallback if split fails, but t.printNote is "Print ... at 100% scale"
  doc.text('100% Scale', A4_WIDTH - MARGIN, 26, { align: 'right' })

  // Footer
  doc.setFillColor(47, 47, 47)
  doc.rect(0, A4_HEIGHT - 25, A4_WIDTH, 25, 'F')
  doc.setFontSize(8)
  doc.setTextColor(239, 239, 239)
  doc.text(`${t.page} ${pageNum} / ${totalPages} | lets-dumbbell.vercel.app`, A4_WIDTH / 2, A4_HEIGHT - 10, { align: 'center' })
}

/**
 * PAGE 2+: Side panels
 */
function drawSidePanelsPage(
  doc: jsPDF,
  spec: DumbbellSpec,
  panelNumbers: number[],
  hexLabel: string | null,
  pageNum: number,
  totalPages: number,
  t: typeof translations.en.pdf
): void {
  const dims = spec.hex_dimensions
  const sidePt = cmToPt(dims.side_length_cm)
  const heightPt = cmToPt(dims.height_cm)
  const bevelPt = dims.chamfer_width_cm ? cmToPt(dims.chamfer_width_cm) : 0
  const topWidthPt = dims.face_side_length_cm ? cmToPt(dims.face_side_length_cm) : sidePt

  const panelWidth = sidePt
  const totalPanelWidth = panelWidth * panelNumbers.length

  const maxWidth = CONTENT_WIDTH
  const scale = Math.min(1, maxWidth / totalPanelWidth)
  const scaledWidth = panelWidth * scale
  const scaledHeight = Math.min(heightPt * scale, CONTENT_HEIGHT * 0.5)
  const scaledBevel = bevelPt * scale
  const scaledTopWidth = topWidthPt * scale

  let title = `${t.cuttingTemplate}: ${t.panels} S${panelNumbers[0]}-S${panelNumbers[2]}`
  if (hexLabel) {
    title += ` + ${hexLabel} ${t.hexagon}`
  }

  drawCuttingPageHeader(doc, title, pageNum, totalPages, t)

  const startX = MARGIN
  const panelY = 80

  panelNumbers.forEach((num, i) => {
    drawSidePanel(
      doc,
      startX + i * scaledWidth,
      panelY,
      scaledWidth,
      scaledHeight,
      `S${num}`,
      true,
      dims.side_length_cm,
      dims.height_cm,
      scaledBevel,
      scaledTopWidth
    )
  })

  if (hexLabel) {
    const hexRadius = Math.min(sidePt * scale, (CONTENT_HEIGHT - scaledHeight - 100) / 2)
    const hexY = panelY + scaledHeight + hexRadius + 60
    const hexX = MARGIN + CONTENT_WIDTH / 2

    // For the template, we want the INNER hexagon as the lid
    // But we might want to draw the outer bounds as reference?
    // No, if the sides fold in, the lid must be the small hexagon.

    // Calculate scaled face radius (inner)
    const faceRadius = dims.face_side_length_cm ? (dims.face_side_length_cm / dims.side_length_cm) * hexRadius : hexRadius

    // Draw the hexagon Lid.
    // If we pass faceSideLengthPt, drawHexagon draws inner hex.
    // We want the CUT line to be the small hexagon?
    // Yes, the top/base lid is the small hexagon.

    drawHexagon(doc, hexX, hexY, faceRadius, {
      fill: true,
      label: hexLabel + ' ' + t.hexagon,
      showDimensions: true,
      sideLengthCm: dims.face_side_length_cm || dims.side_length_cm, // Label correct size
      t
    })

    const tubeRadiusPt = cmToPt(spec.materials.tube_diameter / 2) * scale
    doc.setLineWidth(0.5)
    doc.setDrawColor(255, 69, 0)
    doc.setLineDashPattern([2, 2], 0)
    doc.circle(hexX, hexY, tubeRadiusPt)
    doc.setLineDashPattern([], 0)
  }
}

function drawHexagonOnlyPage(
  doc: jsPDF,
  spec: DumbbellSpec,
  hexLabel: string,
  pageNum: number,
  totalPages: number,
  t: typeof translations.en.pdf
): void {
  const dims = spec.hex_dimensions

  drawCuttingPageHeader(doc, `${t.cuttingTemplate}: ${hexLabel} ${t.hexagon}`, pageNum, totalPages, t)

  const maxRadius = Math.min(CONTENT_WIDTH / 2, (CONTENT_HEIGHT - 80) / 2)
  const sidePt = cmToPt(dims.side_length_cm)
  const scale = Math.min(1, maxRadius / sidePt)

  // Outer radius (reference only, maybe dotted?)
  const scaledRadius = sidePt * scale

  // Inner radius (actual cut)
  const faceRadius = dims.face_side_length_cm ? (dims.face_side_length_cm / dims.side_length_cm) * scaledRadius : scaledRadius

  const hexX = A4_WIDTH / 2
  const hexY = 80 + maxRadius

  // Draw the CUT hexagon (Inner)
  drawHexagon(doc, hexX, hexY, faceRadius, {
    fill: true,
    label: hexLabel + ' ' + t.hexagon,
    showDimensions: true,
    sideLengthCm: dims.face_side_length_cm || dims.side_length_cm,
    t
  })

  const tubeRadiusPt = cmToPt(spec.materials.tube_diameter / 2) * scale
  doc.setLineWidth(1)
  doc.setDrawColor(255, 69, 0)
  doc.circle(hexX, hexY, tubeRadiusPt)

  doc.setFontSize(9)
  doc.setTextColor(255, 69, 0)
  const cutText = t.cutHole.replace('{diameter}', spec.materials.tube_diameter.toString())
  doc.text(cutText, hexX, hexY + tubeRadiusPt + 15, { align: 'center' })

  if (scale < 1) {
    doc.setFontSize(10)
    doc.setTextColor(255, 69, 0)
    doc.setFont('helvetica', 'bold')
    const warnText = t.scaledWarning.replace('{scale}', (scale * 100).toFixed(0))
    doc.text(warnText, A4_WIDTH / 2, A4_HEIGHT - 50, { align: 'center' })
  }
}

/**
 * Generate the complete multi-page PDF template
 */
export function generateDumbbellPDF(options: PDFGeneratorOptions): void {
  const { spec, projectName = 'Hexagonal Dumbbell', language = 'en' } = options
  const t = translations[language].pdf

  const weight = spec.target_weight_kg
  let panelGroups: number[][] = []
  let separateHexagons = false

  // Determine layout based on weight
  if (weight > 17.5) {
    // 1 panel per page
    panelGroups = [[1], [2], [3], [4], [5], [6]]
    separateHexagons = true
  } else if (weight > 6) {
    // 2 panels per page
    panelGroups = [[1, 2], [3, 4], [5, 6]]
    separateHexagons = true
  } else {
    // 3 panels per page (Default small)
    panelGroups = [[1, 2, 3], [4, 5, 6]]
    separateHexagons = false
  }

  // Calculate total pages
  // Info page is always page 1
  let totalPages = 1

  if (separateHexagons) {
    totalPages += panelGroups.length // Pages for panels
    totalPages += 2 // Pages for hexagons (TOP and BASE)
  } else {
    totalPages += panelGroups.length // Pages for panels+hexagons
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  })

  // NOTE: jsPDF has limited font support for non-Latin characters (like Japanese).
  // For production JA support, we would need to load a font (e.g. NotoSansJP-Regular.ttf)
  // and add it to VFS. For this demo, we'll assume Latin output or standard fallback.
  // If language is 'ja', text might display incorrectly without a font. 
  // We will force 'helvetica' which only supports Latin.

  drawProjectInfoPage(doc, spec, projectName, t)

  let currentPage = 2

  if (separateHexagons) {
    // Draw all panel pages
    for (const group of panelGroups) {
      doc.addPage()
      drawSidePanelsPage(doc, spec, group, null, currentPage++, totalPages, t)
    }

    // Draw Hexagons on separate pages
    doc.addPage()
    drawHexagonOnlyPage(doc, spec, 'TOP', currentPage++, totalPages, t)

    doc.addPage()
    drawHexagonOnlyPage(doc, spec, 'BASE', currentPage++, totalPages, t)

  } else {
    // Combined pages (panels + hexagon on same page)
    // We assume 2 groups for <= 6kg case: [1,2,3] and [4,5,6]
    if (panelGroups.length >= 1) {
      doc.addPage()
      drawSidePanelsPage(doc, spec, panelGroups[0], 'TOP', currentPage++, totalPages, t)
    }

    if (panelGroups.length >= 2) {
      doc.addPage()
      drawSidePanelsPage(doc, spec, panelGroups[1], 'BASE', currentPage++, totalPages, t)
    }
  }

  doc.save(`project-dumbbell-${spec.target_weight_kg}kg-${language}.pdf`)
}
