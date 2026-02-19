import type { CVTheme } from '../../types/cv.types';
import './Toolbar.css';

interface ToolbarProps {
  onExportPDF: () => void;
  onThemeChange: (themeId: string) => void;
  currentTheme: string;
  isGenerating: boolean;
  themes: CVTheme[];
}

/**
 * Toolbar - contains theme selector and PDF export button
 */
export function Toolbar({ onExportPDF, onThemeChange, currentTheme, isGenerating, themes }: ToolbarProps) {
  return (
    <div className="toolbar">
      <div className="toolbar-content">
        <div className="toolbar-section">
          <label htmlFor="theme-selector" className="toolbar-label">
            Theme:
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

        <div className="toolbar-section">
          <button
            className="toolbar-button"
            onClick={onExportPDF}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Export PDF'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
