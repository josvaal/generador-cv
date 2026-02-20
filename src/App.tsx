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
import { processGrayscaleImage } from './lib/image-utils'
import profilePhoto from './assets/profile.png'
import './App.css'

registerTheme(basicTheme)
registerTheme(academicoTheme)
registerTheme(modernoTheme)
registerTheme(programadorTheme)

function App() {
  const [baseData] = useState<CVData>(cvData as CVData)
  const [photoGrayscale, setPhotoGrayscale] = useState<string | null>(null)
  const [selectedTheme, setSelectedTheme] = useState(() => {
    if (baseData.activeTheme && getTheme(baseData.activeTheme)) {
      return baseData.activeTheme
    }
    return 'basic'
  })
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    processGrayscaleImage(profilePhoto)
      .then(setPhotoGrayscale)
      .catch(console.error)
  }, [])

  const data: CVData = {
    ...baseData,
    basicInfo: {
      ...baseData.basicInfo,
      photo: selectedTheme === 'academico' && photoGrayscale ? photoGrayscale : profilePhoto,
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
        onThemeChange={setSelectedTheme}
        currentTheme={selectedTheme}
        isGenerating={isGenerating}
        themes={themes}
        cvData={data}
      />
      <div className="flex-1 ml-80 p-8 flex justify-center items-start overflow-auto">
        <CVPreview data={data} theme={theme} />
      </div>
    </div>
  )
}

export default App
