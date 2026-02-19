import { View, Text } from '@react-pdf/renderer';
import type { Project } from '../../../types/cv.types';

interface PDFProjectsSectionProps {
  projects: Project[];
  sectionTitle: string;
  styles: any;
}

/**
 * PDF Projects Section - displays project entries
 */
export function PDFProjectsSection({ projects, sectionTitle, styles }: PDFProjectsSectionProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text wrap style={styles.sectionTitle}>
          {sectionTitle}
        </Text>
      </View>

      {projects.map((project) => (
        <View key={project.id} style={styles.project}>
          <Text wrap style={styles.projectName}>
            {project.name}
          </Text>

          {project.url && (
            <Text wrap style={styles.projectUrl}>
              {project.url}
            </Text>
          )}

          {project.github && (
            <Text wrap style={styles.projectUrl}>
              {project.github}
            </Text>
          )}

          {project.description && (
            <Text wrap style={styles.projectDescription}>
              {project.description}
            </Text>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <Text wrap style={styles.projectTechnologies}>
              Tech: {project.technologies.join(', ')}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}
