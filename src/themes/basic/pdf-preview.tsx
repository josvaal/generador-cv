import { Document, Page } from '@react-pdf/renderer';
import type { CVData } from '../../types/cv.types';
import { basicPDFStyles } from './styles';
import { PDFBasicInfoSection } from '../../components/pdf/Sections/PDFBasicInfoSection';
import { PDFSummarySection } from '../../components/pdf/Sections/PDFSummarySection';
import { PDFExperiencesSection } from '../../components/pdf/Sections/PDFExperiencesSection';
import { PDFEducationSection } from '../../components/pdf/Sections/PDFEducationSection';
import { PDFSkillsSection } from '../../components/pdf/Sections/PDFSkillsSection';
import { PDFProjectsSection } from '../../components/pdf/Sections/PDFProjectsSection';

/**
 * Basic Theme - PDF Document Component
 * Renders the CV as a PDF document using @react-pdf/renderer
 */
export function BasicPDFDocument({ data }: { data: CVData }) {
  const { basicInfo, summary, experiences, education, skills, projects, sectionConfig } = data;

  return (
    <Document>
      <Page size="A4" style={basicPDFStyles.page}>
        {/* Basic Info - always shown at top */}
        {sectionConfig.visibility.basicInfo && (
          <PDFBasicInfoSection basicInfo={basicInfo} styles={basicPDFStyles} />
        )}

        {/* Render sections in configured order */}
        {sectionConfig.order.map((section) => {
          if (!sectionConfig.visibility[section]) return null;

          switch (section) {
            case 'summary':
              return (
                <PDFSummarySection
                  key="summary"
                  summary={summary}
                  styles={basicPDFStyles}
                />
              );

            case 'experiences':
              return (
                <PDFExperiencesSection
                  key="experiences"
                  experiences={experiences}
                  sectionTitle={sectionConfig.titles.experiences}
                  styles={basicPDFStyles}
                />
              );

            case 'education':
              return (
                <PDFEducationSection
                  key="education"
                  education={education}
                  sectionTitle={sectionConfig.titles.education}
                  styles={basicPDFStyles}
                />
              );

            case 'skills':
              return (
                <PDFSkillsSection
                  key="skills"
                  skills={skills}
                  sectionTitle={sectionConfig.titles.skills}
                  styles={basicPDFStyles}
                />
              );

            case 'projects':
              return (
                <PDFProjectsSection
                  key="projects"
                  projects={projects}
                  sectionTitle={sectionConfig.titles.projects}
                  styles={basicPDFStyles}
                />
              );

            default:
              return null;
          }
        })}
      </Page>
    </Document>
  );
}
