import type { CVTheme } from '../../types/cv.types';
import './Toolbar.css';

interface ToolbarProps {
  onExportPDF: () => void;
  onThemeChange: (themeId: string) => void;
  currentTheme: string;
  isGenerating: boolean;
  themes: CVTheme[];
}

export function Toolbar({ onExportPDF, onThemeChange, currentTheme, isGenerating, themes }: ToolbarProps) {
  return (
    <header className="toolbar">
      <div className="toolbar-content">
        <div className="toolbar-brand">
          <svg className="toolbar-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span className="toolbar-title">Generador de CV</span>
        </div>

        <div className="toolbar-actions">
          <div className="toolbar-field">
            <label htmlFor="theme-selector" className="toolbar-label">
              Tema
            </label>
            <select
              id="theme-selector"
              className="toolbar-select"
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

          <button
            className="toolbar-button"
            onClick={onExportPDF}
            disabled={isGenerating}
          >
            <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {isGenerating ? 'Generando...' : 'Descargar PDF'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Toolbar;
