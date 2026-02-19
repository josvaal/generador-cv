import { View, Text } from '@react-pdf/renderer';
import type { Experience } from '../../../types/cv.types';
import { processAchievements } from '../../../lib/html-parser';

interface PDFExperiencesSectionProps {
  experiences: Experience[];
  sectionTitle: string;
  styles: any;
}

/**
 * PDF Experiences Section - displays work experience with achievements
 */
export function PDFExperiencesSection({ experiences, sectionTitle, styles }: PDFExperiencesSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text wrap style={styles.sectionTitle}>
          {sectionTitle}
        </Text>
      </View>

      {experiences.map((experience) => (
        <View key={experience.id} style={styles.experience}>
          {/* Role and Dates */}
          <View style={styles.experienceHeader}>
            <Text wrap style={styles.experienceRole}>
              {experience.role}
            </Text>
            <Text wrap style={styles.experienceDates}>
              {formatDateRange(experience.startDate, experience.endDate, experience.current)}
            </Text>
          </View>

          {/* Company */}
          <Text wrap style={styles.experienceCompany}>
            {experience.company}
          </Text>

          {/* Achievements */}
          {experience.achievements && experience.achievements.length > 0 && (
            <View>
              {processAchievements(experience.achievements).map((achievement, idx) => (
                <Text key={idx} wrap style={styles.achievement}>
                  {achievement}
                </Text>
              ))}
            </View>
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
