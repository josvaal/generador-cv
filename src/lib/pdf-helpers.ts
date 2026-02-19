import { Text, View, TextProps, ViewProps, Style } from '@react-pdf/renderer';

/**
 * PDF Paragraph component - ensures text wraps properly
 * Use this wrapper for any text that needs to wrap across lines
 */
export function PDFParagraph({
  children,
  style,
  ...props
}: TextProps & { children: React.ReactNode }) {
  return (
    <Text wrap style={style} {...props}>
      {children}
    </Text>
  );
}

/**
 * PDF Multi Paragraph component - renders multiple paragraphs with spacing
 * Use this for lists, achievements, or any content with multiple paragraphs
 */
export function PDFMultiParagraph({
  paragraphs,
  itemStyle,
  containerStyle,
  bullet = false,
}: {
  paragraphs: string[];
  itemStyle?: Style;
  containerStyle?: ViewProps['style'];
  bullet?: boolean;
}) {
  if (!paragraphs || paragraphs.length === 0) return null;

  return (
    <View style={containerStyle}>
      {paragraphs.map((paragraph, index) => (
        <View key={index} style={{ flexDirection: 'row', marginBottom: 3 }}>
          {bullet && (
            <Text style={{ marginRight: 4 }}>-</Text>
          )}
          <PDFParagraph style={itemStyle}>
            {paragraph}
          </PDFParagraph>
        </View>
      ))}
    </View>
  );
}

/**
 * Safe text wrapper - ensures text content is always properly wrapped
 * Handles empty strings and null values
 */
export function SafeText({ children, style, ...props }: TextProps) {
  const textContent = children?.toString() || '';
  if (!textContent) return null;

  return (
    <Text wrap style={style} {...props}>
      {textContent}
    </Text>
  );
}
