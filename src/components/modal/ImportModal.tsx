import { useState, useCallback } from 'react'
import type { CVData } from '../../types/cv.types'
import { validateCVData } from '../../lib/json-utils'

interface ImportModalProps {
  isOpen: boolean
  onClose: () => void
  onImportJSON: (data: CVData) => void
  onImportPhoto: (photo: string) => void
}

export function ImportModal({ isOpen, onClose, onImportJSON, onImportPhoto }: ImportModalProps) {
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false)
  const [isDraggingJSON, setIsDraggingJSON] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [jsonFileName, setJsonFileName] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ photo?: string; json?: string }>({})
  const [loadedData, setLoadedData] = useState<CVData | null>(null)
  const [loadedPhoto, setLoadedPhoto] = useState<string | null>(null)

  const validatePhoto = useCallback((file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'El archivo debe ser una imagen (JPG, PNG, etc.)'
    }
    if (file.size > 5 * 1024 * 1024) {
      return 'La imagen no puede superar los 5MB'
    }
    return null
  }, [])

  const validateJSON = useCallback((file: File): string | null => {
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      return 'El archivo debe ser un JSON'
    }
    if (file.size > 1024 * 1024) {
      return 'El archivo no puede superar los 1MB'
    }
    return null
  }, [])

  const handlePhotoDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingPhoto(false)

    const file = e.dataTransfer.files[0]
    if (!file) return

    const error = validatePhoto(file)
    if (error) {
      setErrors(prev => ({ ...prev, photo: error }))
      return
    }

    setErrors(prev => ({ ...prev, photo: undefined }))

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setPhotoPreview(result)
      setLoadedPhoto(result)
    }
    reader.readAsDataURL(file)
  }, [validatePhoto])

  const handleJSONDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingJSON(false)

    const file = e.dataTransfer.files[0]
    if (!file) return

    const error = validateJSON(file)
    if (error) {
      setErrors(prev => ({ ...prev, json: error }))
      return
    }

    setErrors(prev => ({ ...prev, json: undefined }))
    setJsonFileName(file.name)

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string
        const data = JSON.parse(text)

        if (!validateCVData(data)) {
          setErrors(prev => ({ ...prev, json: 'El JSON no tiene el formato correcto de un CV' }))
          return
        }

        setErrors(prev => ({ ...prev, json: undefined }))
        setLoadedData(data)
      } catch (err) {
        setErrors(prev => ({ ...prev, json: 'Error al leer el archivo JSON' }))
      }
    }
    reader.readAsText(file)
  }, [validateJSON])

  const handlePhotoFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const error = validatePhoto(file)
    if (error) {
      setErrors(prev => ({ ...prev, photo: error }))
      return
    }

    setErrors(prev => ({ ...prev, photo: undefined }))

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setPhotoPreview(result)
      setLoadedPhoto(result)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }, [validatePhoto])

  const handleJSONFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const error = validateJSON(file)
    if (error) {
      setErrors(prev => ({ ...prev, json: error }))
      return
    }

    setErrors(prev => ({ ...prev, json: undefined }))
    setJsonFileName(file.name)

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string
        const data = JSON.parse(text)

        if (!validateCVData(data)) {
          setErrors(prev => ({ ...prev, json: 'El JSON no tiene el formato correcto de un CV' }))
          return
        }

        setErrors(prev => ({ ...prev, json: undefined }))
        setLoadedData(data)
      } catch (err) {
        setErrors(prev => ({ ...prev, json: 'Error al leer el archivo JSON' }))
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }, [validateJSON])

  const handleImport = useCallback(() => {
    if (loadedData) {
      onImportJSON(loadedData)
    }
    if (loadedPhoto) {
      onImportPhoto(loadedPhoto)
    }
    handleClose()
  }, [loadedData, loadedPhoto, onImportJSON, onImportPhoto])

  const handleClose = useCallback(() => {
    setPhotoPreview(null)
    setJsonFileName(null)
    setErrors({})
    setLoadedData(null)
    setLoadedPhoto(null)
    onClose()
  }, [onClose])

  if (!isOpen) return null

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl bg-base-200/95 backdrop-blur-xl border border-base-300/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Importar Datos del CV</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost text-white hover:bg-base-300"
            onClick={handleClose}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photo Dropzone */}
          <div>
            <label className="label pb-1">
              <span className="label-text font-semibold text-white/90">Foto de Perfil</span>
            </label>
            <div
              className={`
                border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer
                ${isDraggingPhoto ? 'border-primary bg-primary/10' : 'border-base-300/50 hover:border-primary hover:bg-base-100/30'}
                ${errors.photo ? 'border-error bg-error/10' : ''}
                ${photoPreview ? 'border-success bg-success/10' : ''}
              `}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDraggingPhoto(true)
              }}
              onDragLeave={() => setIsDraggingPhoto(false)}
              onDrop={handlePhotoDrop}
              onClick={() => document.getElementById('photo-input')?.click()}
            >
              {photoPreview ? (
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <>
                  <svg className="w-12 h-12 text-base-content/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <p className="text-sm text-center text-base-content/70">
                    Arrastra una foto o haz clic para seleccionar
                  </p>
                  <p className="text-xs text-center text-base-content/50">
                    JPG, PNG (máx. 5MB)
                  </p>
                </>
              )}
              {errors.photo && (
                <p className="text-xs text-error mt-2">{errors.photo}</p>
              )}
            </div>
            <input
              id="photo-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoFileSelect}
            />
          </div>

          {/* JSON Dropzone */}
          <div>
            <label className="label pb-1">
              <span className="label-text font-semibold text-white/90">Datos del CV (JSON)</span>
            </label>
            <div
              className={`
                border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer min-h-[200px]
                ${isDraggingJSON ? 'border-primary bg-primary/10' : 'border-base-300/50 hover:border-primary hover:bg-base-100/30'}
                ${errors.json ? 'border-error bg-error/10' : ''}
                {jsonFileName && !errors.json ? 'border-success bg-success/10' : ''}
              `}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDraggingJSON(true)
              }}
              onDragLeave={() => setIsDraggingJSON(false)}
              onDrop={handleJSONDrop}
              onClick={() => document.getElementById('json-input')?.click()}
            >
              {jsonFileName ? (
                <>
                  <svg className="w-12 h-12 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <p className="text-sm text-center text-success font-medium">{jsonFileName}</p>
                  <p className="text-xs text-center text-base-content/60">
                    ✓ Formato válido
                  </p>
                </>
              ) : (
                <>
                  <svg className="w-12 h-12 text-base-content/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <p className="text-sm text-center text-base-content/70">
                    Arrastra un JSON o haz clic para seleccionar
                  </p>
                  <p className="text-xs text-center text-base-content/50">
                    Archivo JSON (máx. 1MB)
                  </p>
                </>
              )}
              {errors.json && (
                <p className="text-xs text-error mt-2">{errors.json}</p>
              )}
            </div>
            <input
              id="json-input"
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleJSONFileSelect}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            className="btn btn-ghost text-white hover:bg-base-300"
            onClick={handleClose}
          >
            Cancelar
          </button>
          <button
            className="btn btn-primary gap-2"
            onClick={handleImport}
            disabled={!loadedData && !loadedPhoto}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Importar
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  )
}

export default ImportModal
