import { PDFViewer } from '@react-pdf/renderer'
import type { CVData, CVTheme } from '../../types/cv.types'

interface CVPreviewProps {
  data: CVData
  theme?: CVTheme
}

export function CVPreview({ data, theme }: CVPreviewProps) {
  if (!theme) {
    return (
      <div className="alert alert-error max-w-sm mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>No hay tema seleccionado</span>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[210mm] mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <PDFViewer
            style={{
              width: '100%',
              height: 'calc(100vh - 48px)',
              border: 'none',
              borderRadius: '8px',
            }}
            showToolbar={false}
          >
            <theme.Document data={data} />
          </PDFViewer>
        </div>
      </div>
    </div>
  )
}

export default CVPreview
