import { PDFViewer } from '@react-pdf/renderer'
import type { CVData, CVTheme } from '../../types/cv.types'

interface CVPreviewProps {
  data: CVData
  theme?: CVTheme
}

export function CVPreview({ data, theme }: CVPreviewProps) {
  if (!theme) {
    return (
      <div className="preview-error">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p>No hay tema seleccionado</p>
      </div>
    )
  }

  return (
    <div className="cv-preview-container">
      <PDFViewer
        style={{
          width: '100%',
          height: 'calc(100vh - 88px)',
          border: 'none',
          borderRadius: '8px',
        }}
        showToolbar={false}
      >
        <theme.Document data={data} />
      </PDFViewer>
    </div>
  )
}

export default CVPreview
