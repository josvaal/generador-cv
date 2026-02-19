import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import cvData from './assets/cv-data.json'
import type { CVData } from './types/cv.types'
import { getTheme, registerTheme, getAllThemes } from './themes'
import { basicTheme } from './themes/basic'
import { academicoTheme } from './themes/academico'
import Toolbar from './components/toolbar/Toolbar'
import CVPreview from './components/preview/CVPreview'
import './App.css'

registerTheme(basicTheme)
registerTheme(academicoTheme)

function App() {
  const [data] = useState<CVData>(cvData as CVData)
  const [selectedTheme, setSelectedTheme] = useState(() => {
    if (data.activeTheme && getTheme(data.activeTheme)) {
      return data.activeTheme
    }
    return 'basic'
  })
  const [isGenerating, setIsGenerating] = useState(false)

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
