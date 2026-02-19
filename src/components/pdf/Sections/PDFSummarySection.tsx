import { View, Text } from '@react-pdf/renderer';
import type { Summary } from '../../../types/cv.types';

interface PDFSummarySectionProps {
  summary: Summary;
  styles: any;
}

/**
 * PDF Summary Section - displays the professional summary
 */
export function PDFSummarySection({ summary, styles }: PDFSummarySectionProps) {
  return (
    <View style={styles.summaryContainer}>
      <Text wrap style={styles.summary}>
        {summary.content}
      </Text>
    </View>
  );
}
