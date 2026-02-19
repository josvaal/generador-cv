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
        No theme selected
      </div>
    )
  }

  return (
    <PDFViewer
      style={{
        width: '100%',
        height: 'calc(100vh - 80px)',
        border: 'none',
      }}
      showToolbar={false}
    >
      <theme.Document data={data} />
    </PDFViewer>
  )
}

export default CVPreview
