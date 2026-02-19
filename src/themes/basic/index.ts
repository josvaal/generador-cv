import type { CVTheme } from '../../types/cv.types';
import { BasicHTMLPreview } from './html-preview';
import { BasicPDFDocument } from './pdf-preview';

/**
 * Basic Theme - clean and simple CV layout
 */
export const basicTheme: CVTheme = {
  id: 'basic',
  name: 'Basic',
  HTMLPreview: BasicHTMLPreview,
  PDFDocument: BasicPDFDocument,
};
