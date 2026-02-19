import { View, Text } from '@react-pdf/renderer';
import type { Education } from '../../../types/cv.types';

interface PDFEducationSectionProps {
  education: Education[];
  sectionTitle: string;
  styles: any;
}

/**
 * PDF Education Section - displays education entries
 */
export function PDFEducationSection({ education, sectionTitle, styles }: PDFEducationSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text wrap style={styles.sectionTitle}>
          {sectionTitle}
        </Text>
      </View>

      {education.map((edu) => (
        <View key={edu.id} style={styles.education}>
          {/* Degree and Dates */}
          <View style={styles.educationHeader}>
            <Text wrap style={styles.educationDegree}>
              {edu.degree}
            </Text>
            <Text wrap style={styles.educationDates}>
              {formatDateRange(edu.startDate, edu.endDate, edu.current)}
            </Text>
          </View>

          {/* Institute */}
          <Text wrap style={styles.educationInstitute}>
            {edu.institute}
          </Text>

          {/* Location */}
          {edu.location && (
            <Text wrap style={styles.educationLocation}>
              {edu.location}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}

/**
 * Format date range for display
 */
function formatDateRange(startDate: string, endDate: string, current?: boolean): string {
  if (!startDate) return '';
  const start = formatMonthYear(startDate);
  const end = current ? 'Present' : formatMonthYear(endDate);
  return `${start} - ${end}`;
}

/**
 * Format date string from YYYY-MM to Month YYYY
 */
function formatMonthYear(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  if (!year || !month) return dateStr;

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const monthIndex = parseInt(month, 10) - 1;
  const monthName = months[monthIndex] || month;

  return `${monthName} ${year}`;
}
