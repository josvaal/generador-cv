import type { CVTheme, CVData } from '../../types/cv.types';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { Lightbulb } from '@phosphor-icons/react';
import logo from '../../assets/logo.png';

interface ToolbarProps {
  onExportPDF: () => void;
  onExportJSON: () => void;
  onImportJSON: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onThemeChange: (themeId: string) => void;
  currentTheme: string;
  isGenerating: boolean;
  themes: CVTheme[];
  cvData: CVData;
}

export function Toolbar({ onExportPDF, onExportJSON, onImportJSON, onThemeChange, currentTheme, isGenerating, themes, cvData }: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const themeIcons: Record<string, ReactNode> = {
    basic: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    academico: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    moderno: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    programador: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  };

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-80 bg-base-200/80 backdrop-blur-xl shadow-2xl flex flex-col z-50 border-r border-base-300/50">
      <div className="p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative p-1 bg-base-200 rounded-xl">
              <img src={logo} alt="Logo" className="w-24 h-24 object-contain rounded-lg" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Generador de CV
            </h1>
            <p className="text-sm text-base-content/60 mt-1">Crea tu currículum profesional</p>
          </div>
        </div>
      </div>

      <div className="divider my-0 px-6"></div>

      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        <div className="card bg-base-100/50 border border-base-300/50">
          <div className="card-body p-4 gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 text-primary rounded-full w-10 h-10 flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{cvData.basicInfo.name}</p>
                <p className="text-xs text-white/70 truncate">{cvData.basicInfo.role}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="badge badge-primary/20 badge-sm gap-1 text-white">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                {cvData.experiences.length} exp.
              </div>
              <div className="badge badge-secondary/20 badge-sm gap-1 text-white">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                {cvData.education.length} edu.
              </div>
              <div className="badge badge-accent/20 badge-sm gap-1 text-white">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
                {cvData.skills.length} skills
              </div>
            </div>
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label pb-1">
            <span className="label-text font-semibold text-white/90">Plantilla</span>
            <span className="label-text-alt text-white/60">Selecciona un estilo</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                className={`btn btn-sm justify-start gap-2 h-auto py-2 ${currentTheme === theme.id ? 'btn-primary' : 'btn-ghost bg-base-100/50'}`}
                onClick={() => onThemeChange(theme.id)}
              >
                {themeIcons[theme.id] || themeIcons.basic}
                <span className="text-xs">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label pb-1">
            <span className="label-text font-semibold text-white/90">Datos</span>
            <span className="label-text-alt text-white/60">Importar/Exportar</span>
          </label>
          <div className="flex gap-2">
            <button
              className="btn btn-sm flex-1 gap-2 btn-ghost bg-base-100/50 hover:bg-primary/20 border border-base-300/50"
              onClick={handleImportClick}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span className="text-xs">Importar</span>
            </button>
            <button
              className="btn btn-sm flex-1 gap-2 btn-ghost bg-base-100/50 hover:bg-secondary/20 border border-base-300/50"
              onClick={onExportJSON}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="text-xs">Exportar</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={onImportJSON}
            />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
          <div className="card-body p-4 gap-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="text-primary" size={18} weight="fill" />
              <span className="font-medium text-sm text-white">Consejo</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Cada plantilla está optimizada para diferentes industrias. "Académico" es ideal para investigadores, "Programador" para desarrolladores.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-base-300/50 bg-base-100/30">
        <button
          className="btn btn-primary w-full gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
          onClick={onExportPDF}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Generando PDF...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Descargar CV en PDF
            </>
          )}
        </button>
        <p className="text-xs text-center text-white/60 mt-3">
          Archivo listo para imprimir o enviar
        </p>
      </div>
    </aside>
  );
}

export default Toolbar;
