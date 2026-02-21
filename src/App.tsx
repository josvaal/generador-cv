import { useState, useEffect } from 'react'
import { pdf } from '@react-pdf/renderer'
import cvData from './assets/cv-data.json'
import type { CVData } from './types/cv.types'
import { getTheme, registerTheme, getAllThemes } from './themes'
import { basicTheme } from './themes/basic'
import { academicoTheme } from './themes/academico'
import { modernoTheme } from './themes/moderno'
import { programadorTheme } from './themes/programador'
import Toolbar from './components/toolbar/Toolbar'
import CVPreview from './components/preview/CVPreview'
import ImportModal from './components/modal/ImportModal'
import { processGrayscaleImage } from './lib/image-utils'
import { exportCVData } from './lib/json-utils'
import defaultPhoto from '/pfp.jpg'
import './App.css'

registerTheme(basicTheme)
registerTheme(academicoTheme)
registerTheme(modernoTheme)
registerTheme(programadorTheme)

function App() {
  const [baseData, setBaseData] = useState<CVData>(cvData as CVData)
  const [customPhoto, setCustomPhoto] = useState<string | null>(null)
  const [photoGrayscale, setPhotoGrayscale] = useState<string | null>(null)
  const [selectedTheme, setSelectedTheme] = useState(() => {
    if (baseData.activeTheme && getTheme(baseData.activeTheme)) {
      return baseData.activeTheme
    }
    return 'basic'
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  const currentPhoto = customPhoto || defaultPhoto

  useEffect(() => {
    processGrayscaleImage(currentPhoto)
      .then(setPhotoGrayscale)
      .catch(console.error)
  }, [currentPhoto])

  const data: CVData = {
    ...baseData,
    basicInfo: {
      ...baseData.basicInfo,
      photo: selectedTheme === 'academico' && photoGrayscale ? photoGrayscale : currentPhoto,
    },
  }

  const theme = getTheme(selectedTheme)
  const themes = getAllThemes()

  const handleExportPDF = async () => {
    if (!theme) return

    setIsGenerating(true)
    try {
      const doc = <theme.Document data={data} />
      const blob = await pdf(doc).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `cv-${data.basicInfo.name.replace(/\s+/g, '-').toLowerCase()}.pdf`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExportJSON = () => {
    exportCVData(baseData)
  }

  const handleImportJSON = (data: CVData) => {
    setBaseData(data)
  }

  const handleImportPhoto = (photo: string) => {
    setCustomPhoto(photo)
  }

  if (!photoGrayscale) {
    return (
      <div data-theme="logo-theme" className="min-h-screen flex flex-col bg-gradient-to-br from-base-300 via-base-200 to-base-300">
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
            <span className="loading loading-spinner loading-xl text-primary relative z-10"></span>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-base-content">Preparando tu CV</p>
            <p className="text-sm text-base-content/60 mt-1">Un momento...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-theme="logo-theme" className="min-h-screen flex bg-base-300">
      <Toolbar
        onExportPDF={handleExportPDF}
        onExportJSON={handleExportJSON}
        onImportClick={() => setIsImportModalOpen(true)}
        onThemeChange={setSelectedTheme}
        currentTheme={selectedTheme}
        isGenerating={isGenerating}
        themes={themes}
        cvData={data}
      />
      <div className="flex-1 ml-80 p-8 flex justify-center items-start overflow-auto">
        <CVPreview data={data} theme={theme} />
      </div>
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportJSON={handleImportJSON}
        onImportPhoto={handleImportPhoto}
      />
    </div>
  )
}

export default App
