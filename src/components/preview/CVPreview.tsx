import type { CVData, CVTheme } from '../../types/cv.types';

interface CVPreviewProps {
  data: CVData;
  theme?: CVTheme;
}

/**
 * CVPreview - container for the CV preview
 * Displays at A4 width (210mm) with proper scaling
 */
export function CVPreview({ data, theme }: CVPreviewProps) {
  if (!theme) {
    return (
      <div className="preview-error">
        No theme selected
      </div>
    );
  }

  return (
    <div className="cv-preview-container">
      <div className="cv-preview">
        <theme.HTMLPreview data={data} />
      </div>
    </div>
  );
}

export default CVPreview;
