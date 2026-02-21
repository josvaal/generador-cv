import { useState, useEffect, useMemo } from 'react'
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

const LOCAL_STORAGE_KEYS = {
  CV_DATA: 'cv-data',
  CUSTOM_PHOTO: 'cv-custom-photo',
  SELECTED_THEME: 'cv-selected-theme',
} as const

registerTheme(basicTheme)
registerTheme(academicoTheme)
registerTheme(modernoTheme)
registerTheme(programadorTheme)

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [baseData, setBaseData] = useState<CVData>(cvData as CVData)
  const [customPhoto, setCustomPhoto] = useState<string | null>(null)
  const [photoGrayscale, setPhotoGrayscale] = useState<string | null>(null)
  const [selectedTheme, setSelectedTheme] = useState('basic')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  // Cargar datos de LocalStorage al iniciar
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        // Cargar tema seleccionado
        const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEYS.SELECTED_THEME)
        if (savedTheme && getTheme(savedTheme)) {
          setSelectedTheme(savedTheme)
        }

        // Cargar datos del CV
        const savedCVData = localStorage.getItem(LOCAL_STORAGE_KEYS.CV_DATA)
        if (savedCVData) {
          const parsedData = JSON.parse(savedCVData)
          setBaseData(parsedData)
        }

        // Cargar foto personalizada
        const savedPhoto = localStorage.getItem(LOCAL_STORAGE_KEYS.CUSTOM_PHOTO)
        if (savedPhoto) {
          setCustomPhoto(savedPhoto)
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFromStorage()
  }, [])

  // Guardar datos del CV en LocalStorage cuando cambian
  useEffect(() => {
    if (isLoading) return

    try {
      const dataToSave = JSON.stringify(baseData)
      console.log('=== GUARDANDO EN LOCALSTORAGE ===')
      console.log('Order:', baseData.sectionConfig.order)
      console.log('Stringified:', dataToSave.substring(0, 200))
      localStorage.setItem(LOCAL_STORAGE_KEYS.CV_DATA, dataToSave)
    } catch (error) {
      console.error('Error saving CV data to localStorage:', error)
    }
  }, [baseData, isLoading])

  // Guardar foto personalizada en LocalStorage cuando cambia
  useEffect(() => {
    if (isLoading) return

    try {
      if (customPhoto) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.CUSTOM_PHOTO, customPhoto)
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.CUSTOM_PHOTO)
      }
    } catch (error) {
      console.error('Error saving custom photo to localStorage:', error)
    }
  }, [customPhoto, isLoading])

  // Guardar tema seleccionado en LocalStorage
  useEffect(() => {
    if (isLoading) return

    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_THEME, selectedTheme)
    } catch (error) {
      console.error('Error saving theme to localStorage:', error)
    }
  }, [selectedTheme, isLoading])

  const currentPhoto = customPhoto || defaultPhoto

  useEffect(() => {
    processGrayscaleImage(currentPhoto)
      .then(setPhotoGrayscale)
      .catch(console.error)
  }, [currentPhoto])

  // Usar useMemo para recalcular data cuando cambian baseData, selectedTheme o photoGrayscale
  const data: CVData = useMemo(() => {
    return {
      ...baseData,
      basicInfo: {
        ...baseData.basicInfo,
        photo: selectedTheme === 'academico' && photoGrayscale ? photoGrayscale : currentPhoto,
      },
    }
  }, [baseData, selectedTheme, photoGrayscale, currentPhoto])

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

  const handleImportJSON = (importedData: CVData) => {
    setBaseData(importedData)
  }

  const handleImportPhoto = (photo: string) => {
    setCustomPhoto(photo)
  }

  const handleLoadTemplate = () => {
    // Cargar datos de ejemplo y resetear foto personalizada
    // Crear una copia profunda para evitar referencias
    const templateData = JSON.parse(JSON.stringify(cvData)) as CVData
    console.log('Cargando datos de ejemplo - order:', templateData.sectionConfig.order)
    console.log('Antes de setBaseData - baseData.order:', baseData.sectionConfig.order)

    // Limpiar LocalStorage primero para asegurar que no haya datos antiguos
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CV_DATA)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CUSTOM_PHOTO)

    setBaseData(templateData)
    setCustomPhoto(null)
    setSelectedTheme('basic')

    console.log('Después de setBaseData (síncrono)')
  }

  // Mostrar pantalla de carga mientras se cargan datos de LocalStorage
  if (isLoading || !photoGrayscale) {
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
        onLoadTemplate={handleLoadTemplate}
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
