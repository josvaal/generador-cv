/**
 * Extract plain text from HTML string
 * Removes all HTML tags and returns clean text
 */
export function extractTextFromHTML(html: string): string {
  if (!html) return '';

  // Create a temporary div element to parse HTML
  const div = document.createElement('div');
  div.innerHTML = html;

  return div.textContent || div.innerText || '';
}

/**
 * Extract paragraphs from HTML string
 * Returns an array of strings, one for each <p> tag
 */
export function extractParagraphsFromHTML(html: string): string[] {
  if (!html) return [];

  const div = document.createElement('div');
  div.innerHTML = html;

  const paragraphs: string[] = div.querySelectorAll('p').forEach(p => {
    paragraphs.push(p.textContent || p.innerText || '');
  });

  return paragraphs;
}

/**
 * Extract all text content from HTML, preserving structure
 * Converts <br> to newlines, <p> to double newlines
 */
export function extractStructuredText(html: string): string {
  if (!html) return '';

  // Replace <br> with newline
  let text = html.replace(/<br\s*\/?>/gi, '\n');

  // Replace <p> tags with newlines
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<p>/gi, '');

  // Remove all remaining HTML tags
  text = text.replace(/<[^>]*>/g, '');

  // Decode HTML entities
  const div = document.createElement('div');
  div.innerHTML = text;
  text = div.textContent || div.innerText || '';

  // Clean up extra whitespace
  text = text.replace(/\n{3,}/g, '\n\n').trim();

  return text;
}

/**
 * Process achievements array (which may contain HTML)
 * Returns array of plain text strings
 */
export function processAchievements(achievements: string[]): string[] {
  if (!achievements || !Array.isArray(achievements)) return [];

  return achievements.map(achievement => extractStructuredText(achievement));
}
