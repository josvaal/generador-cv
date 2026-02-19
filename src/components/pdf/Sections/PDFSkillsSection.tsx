import { View, Text } from '@react-pdf/renderer';
import type { Skill } from '../../../types/cv.types';

interface PDFSkillsSectionProps {
  skills: Skill[];
  sectionTitle: string;
  styles: any;
}

/**
 * PDF Skills Section - displays skills by category
 */
export function PDFSkillsSection({ skills, sectionTitle, styles }: PDFSkillsSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text wrap style={styles.sectionTitle}>
          {sectionTitle}
        </Text>
      </View>

      <View style={styles.skillsContainer}>
        {skills.map((skill) => (
          <View key={skill.id} style={styles.skillCategory}>
            <Text wrap style={styles.skillTitle}>
              {skill.title}
            </Text>
            <Text wrap style={styles.skillDetails}>
              {skill.details}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
