import { PDFViewer } from '@react-pdf/renderer'
import type { CVData, CVTheme } from '../../types/cv.types'

interface CVPreviewProps {
  data: CVData
  theme?: CVTheme
}

export function CVPreview({ data, theme }: CVPreviewProps) {
  if (!theme) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="alert alert-error shadow-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-bold">Error de configuración</h3>
            <div className="text-xs">No hay tema seleccionado para renderizar el CV</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[210mm] mx-auto">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div className="card bg-base-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          <div className="card-body p-0 relative">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <div className="badge badge-sm bg-base-200/80 backdrop-blur border-0 text-base-content/60 gap-1 shadow">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                Vista previa
              </div>
              <div className="badge badge-sm bg-base-200/80 backdrop-blur border-0 text-base-content/60 shadow">
                A4 • 210×297mm
              </div>
            </div>
            <PDFViewer
              style={{
                width: '100%',
                height: 'calc(100vh - 64px)',
                border: 'none',
                borderRadius: '12px',
              }}
              showToolbar={false}
            >
              <theme.Document data={data} />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CVPreview
