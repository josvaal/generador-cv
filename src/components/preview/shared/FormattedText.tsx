import DOMPurify from 'dompurify';
import { useMemo } from 'react';

interface FormattedTextProps {
  html: string;
}

/**
 * FormattedText - renders sanitized HTML content
 * Supports: <p>, <br>, <strong>, <em>, <u>, <a>
 */
export function FormattedText({ html }: FormattedTextProps) {
  const sanitizedHTML = useMemo(() => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
    });
  }, [html]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      style={{
        display: 'inline',
      }}
    />
  );
}

export default FormattedText;
