import type { CVTheme } from '../../types/cv.types';
import logo from '../../assets/logo.png';

interface ToolbarProps {
  onExportPDF: () => void;
  onThemeChange: (themeId: string) => void;
  currentTheme: string;
  isGenerating: boolean;
  themes: CVTheme[];
}

export function Toolbar({ onExportPDF, onThemeChange, currentTheme, isGenerating, themes }: ToolbarProps) {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-72 bg-base-200 shadow-xl flex flex-col z-50">
      <div className="p-6 border-b border-base-300">
        <div className="flex flex-col items-center gap-4">
          <div className="p-1.5 border-2 border-primary rounded-[5px]">
            <img src={logo} alt="Logo" className="w-16 h-16 object-contain rounded-[5px]" />
          </div>
          <h1 className="text-xl font-bold text-base-content text-center">Generador de CV</h1>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Tema del CV</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={currentTheme}
            onChange={(e) => onThemeChange(e.target.value)}
          >
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6 border-t border-base-300">
        <button
          className="btn btn-primary w-full gap-2"
          onClick={onExportPDF}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Generando...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Descargar PDF
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

export default Toolbar;
