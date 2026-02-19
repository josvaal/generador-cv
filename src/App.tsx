import { useState, useEffect } from 'react'
import { pdf } from '@react-pdf/renderer'
import cvData from './assets/cv-data.json'
import type { CVData } from './types/cv.types'
import { getTheme, registerTheme, getAllThemes } from './themes'
import { basicTheme } from './themes/basic'
import { academicoTheme } from './themes/academico'
import Toolbar from './components/toolbar/Toolbar'
import CVPreview from './components/preview/CVPreview'
import { processGrayscaleImage } from './lib/image-utils'
import profilePhoto from './assets/profile.png'
import './App.css'

registerTheme(basicTheme)
registerTheme(academicoTheme)

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
      <div className="app-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <Toolbar
        onExportPDF={handleExportPDF}
        onThemeChange={setSelectedTheme}
        currentTheme={selectedTheme}
        isGenerating={isGenerating}
        themes={themes}
      />
      <div className="preview-container">
        <CVPreview data={data} theme={theme} />
      </div>
    </div>
  )
}

export default App
