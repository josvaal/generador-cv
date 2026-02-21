import type { CVData } from '../types/cv.types'

export function exportCVData(data: CVData): void {
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  const fileName = data.basicInfo.name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
  link.download = `cv-${fileName}.json`
  link.click()
  URL.revokeObjectURL(url)
}

export async function importCVData(file: File): Promise<CVData> {
  const text = await file.text()
  const data = JSON.parse(text) as CVData

  if (!validateCVData(data)) {
    throw new Error('Invalid CV data structure')
  }

  // Normalizar el order para eliminar duplicados
  const normalizedOrder = Array.from(new Set(data.sectionConfig.order))
  data.sectionConfig.order = normalizedOrder

  return data
}

export function validateCVData(data: unknown): data is CVData {
  if (typeof data !== 'object' || data === null) return false

  const d = data as Record<string, unknown>

  // Validar basicInfo
  if (
    typeof d.basicInfo !== 'object' ||
    d.basicInfo === null ||
    typeof (d.basicInfo as Record<string, unknown>).name !== 'string' ||
    typeof (d.basicInfo as Record<string, unknown>).role !== 'string' ||
    typeof (d.basicInfo as Record<string, unknown>).email !== 'string' ||
    typeof (d.basicInfo as Record<string, unknown>).phone !== 'string'
  ) {
    return false
  }

  // Validar summary
  if (
    typeof d.summary !== 'object' ||
    d.summary === null ||
    typeof (d.summary as Record<string, unknown>).content !== 'string'
  ) {
    return false
  }

  // Validar experiences
  if (!Array.isArray(d.experiences)) return false
  for (const exp of d.experiences) {
    if (
      typeof exp !== 'object' ||
      exp === null ||
      typeof (exp as Record<string, unknown>).id !== 'string' ||
      typeof (exp as Record<string, unknown>).role !== 'string' ||
      typeof (exp as Record<string, unknown>).company !== 'string' ||
      typeof (exp as Record<string, unknown>).startDate !== 'string' ||
      typeof (exp as Record<string, unknown>).endDate !== 'string' ||
      !Array.isArray((exp as Record<string, unknown>).achievements)
    ) {
      return false
    }
  }

  // Validar education
  if (!Array.isArray(d.education)) return false
  for (const edu of d.education) {
    if (
      typeof edu !== 'object' ||
      edu === null ||
      typeof (edu as Record<string, unknown>).id !== 'string' ||
      typeof (edu as Record<string, unknown>).degree !== 'string' ||
      typeof (edu as Record<string, unknown>).institute !== 'string' ||
      typeof (edu as Record<string, unknown>).location !== 'string' ||
      typeof (edu as Record<string, unknown>).startDate !== 'string' ||
      typeof (edu as Record<string, unknown>).endDate !== 'string'
    ) {
      return false
    }
  }

  // Validar skills
  if (!Array.isArray(d.skills)) return false
  for (const skill of d.skills) {
    if (
      typeof skill !== 'object' ||
      skill === null ||
      typeof (skill as Record<string, unknown>).id !== 'string' ||
      typeof (skill as Record<string, unknown>).title !== 'string' ||
      typeof (skill as Record<string, unknown>).details !== 'string'
    ) {
      return false
    }
  }

  // Validar projects (puede estar vacío)
  if (!Array.isArray(d.projects)) return false
  for (const proj of d.projects) {
    if (
      typeof proj !== 'object' ||
      proj === null ||
      typeof (proj as Record<string, unknown>).id !== 'string' ||
      typeof (proj as Record<string, unknown>).name !== 'string' ||
      typeof (proj as Record<string, unknown>).description !== 'string' ||
      !Array.isArray((proj as Record<string, unknown>).technologies)
    ) {
      return false
    }
  }

  // Validar activeTheme
  if (typeof d.activeTheme !== 'string' || d.activeTheme === '') {
    return false
  }

  // Validar sectionConfig
  if (
    typeof d.sectionConfig !== 'object' ||
    d.sectionConfig === null
  ) {
    return false
  }

  const sc = d.sectionConfig as Record<string, unknown>
  if (
    typeof sc.visibility !== 'object' ||
    sc.visibility === null ||
    typeof sc.titles !== 'object' ||
    sc.titles === null ||
    !Array.isArray(sc.order)
  ) {
    return false
  }

  return true
}
