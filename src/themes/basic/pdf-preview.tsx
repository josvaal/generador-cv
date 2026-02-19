import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import type { CVData } from '../../types/cv.types';
import { basicPDFStyles } from './styles';
import { processAchievements } from '../../lib/html-parser';

/**
 * Basic Theme - PDF Document Component
 * Modern two-column layout with sidebar
 */
export function BasicPDFDocument({ data }: { data: CVData }) {
  const { basicInfo, summary, experiences, education, skills, projects, sectionConfig } = data;

  // Format date helper
  const formatDateRange = (startDate: string, endDate: string, current?: boolean) => {
    if (!startDate) return '';
    const start = formatMonthYear(startDate);
    const end = current ? 'Present' : formatMonthYear(endDate);
    return `${start} - ${end}`;
  };

  const formatMonthYear = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    if (!year || !month) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = months[parseInt(month, 10) - 1] || month;
    return `${monthName} ${year}`;
  };

  return (
    <Document>
      <Page size="A4" style={basicPDFStyles.page}>
        <View style={basicPDFStyles.container}>
          {/* Left Sidebar - 32% width */}
          <View style={basicPDFStyles.sidebar}>
            {/* Photo */}
            {basicInfo.photo && (
              <View style={basicPDFStyles.photoContainer}>
                <Image src={basicInfo.photo} style={basicPDFStyles.photo} />
              </View>
            )}

            {/* Contact Section */}
            <View style={basicPDFStyles.contactSection}>
              <Text wrap style={basicPDFStyles.contactLabel}>CONTACT</Text>
              {basicInfo.email && (
                <View style={basicPDFStyles.contactItem}>
                  <Text style={basicPDFStyles.contactIcon}>✉</Text>
                  <Text wrap>{basicInfo.email}</Text>
                </View>
              )}
              {basicInfo.phone && (
                <View style={basicPDFStyles.contactItem}>
                  <Text style={basicPDFStyles.contactIcon}>📱</Text>
                  <Text wrap>{basicInfo.phone}</Text>
                </View>
              )}
              {basicInfo.location && (
                <View style={basicPDFStyles.contactItem}>
                  <Text style={basicPDFStyles.contactIcon}>📍</Text>
                  <Text wrap>{basicInfo.location}</Text>
                </View>
              )}
              {basicInfo.website && (
                <View style={basicPDFStyles.contactItem}>
                  <Text style={basicPDFStyles.contactIcon}>🌐</Text>
                  <Text wrap>{basicInfo.website}</Text>
                </View>
              )}
              {basicInfo.github && (
                <View style={basicPDFStyles.contactItem}>
                  <Text style={basicPDFStyles.contactIcon}>💻</Text>
                  <Text wrap>{basicInfo.github}</Text>
                </View>
              )}
              {basicInfo.linkedin && (
                <View style={basicPDFStyles.contactItem}>
                  <Text style={basicPDFStyles.contactIcon}>in</Text>
                  <Text wrap>{basicInfo.linkedin}</Text>
                </View>
              )}
            </View>

            {/* Skills in Sidebar (Compact) */}
            {sectionConfig.visibility.skills && skills.length > 0 && (
              <View style={basicPDFStyles.sidebarSkills}>
                <Text wrap style={basicPDFStyles.sidebarSectionLabel}>SKILLS</Text>
                {skills.map((skill) => (
                  <View key={skill.id} style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 8, marginBottom: 4, color: '#BDC3C7' }}>
                      {skill.title.toUpperCase()}
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      {skill.details.split(',').map((s, i) => (
                        <Text key={i} style={basicPDFStyles.sidebarSkillTag}>
                          {s.trim()}
                        </Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Main Content - 68% width */}
          <View style={basicPDFStyles.mainContent}>
            {/* Header */}
            <View style={basicPDFStyles.header}>
              <Text wrap style={basicPDFStyles.name}>{basicInfo.name}</Text>
              <Text wrap style={basicPDFStyles.role}>{basicInfo.role}</Text>
              <Text wrap style={basicPDFStyles.location}>{basicInfo.location}</Text>
            </View>

            {/* Render sections in configured order (excluding skills since they're in sidebar) */}
            {sectionConfig.order.map((section) => {
              if (!sectionConfig.visibility[section]) return null;
              if (section === 'skills') return null; // Skip skills, shown in sidebar

              switch (section) {
                case 'summary':
                  return (
                    <View key="summary">
                      <View style={basicPDFStyles.sectionHeader}>
                        <Text wrap style={basicPDFStyles.sectionTitle}>
                          {sectionConfig.titles.summary}
                        </Text>
                      </View>
                      <Text wrap style={basicPDFStyles.summary}>
                        {summary.content}
                      </Text>
                    </View>
                  );

                case 'experiences':
                  return (
                    <View key="experiences">
                      <View style={basicPDFStyles.sectionHeader}>
                        <Text wrap style={basicPDFStyles.sectionTitle}>
                          {sectionConfig.titles.experiences}
                        </Text>
                      </View>
                      {experiences.map((exp) => (
                        <View key={exp.id} style={basicPDFStyles.experience}>
                          <View style={basicPDFStyles.experienceHeader}>
                            <Text wrap style={basicPDFStyles.experienceRole}>
                              {exp.role}
                            </Text>
                            <Text wrap style={basicPDFStyles.experienceDates}>
                              {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                            </Text>
                          </View>
                          <Text wrap style={basicPDFStyles.experienceCompany}>
                            {exp.company}
                          </Text>
                          {exp.achievements && exp.achievements.length > 0 && (
                            <View>
                              {processAchievements(exp.achievements).map((achievement, idx) => (
                                <Text key={idx} wrap style={basicPDFStyles.achievement}>
                                  • {achievement}
                                </Text>
                              ))}
                            </View>
                          )}
                        </View>
                      ))}
                    </View>
                  );

                case 'education':
                  return (
                    <View key="education">
                      <View style={basicPDFStyles.sectionHeader}>
                        <Text wrap style={basicPDFStyles.sectionTitle}>
                          {sectionConfig.titles.education}
                        </Text>
                      </View>
                      {education.map((edu) => (
                        <View key={edu.id} style={basicPDFStyles.education}>
                          <View style={basicPDFStyles.educationHeader}>
                            <Text wrap style={basicPDFStyles.educationDegree}>
                              {edu.degree}
                            </Text>
                            <Text wrap style={basicPDFStyles.educationDates}>
                              {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                            </Text>
                          </View>
                          <Text wrap style={basicPDFStyles.educationInstitute}>
                            {edu.institute}
                          </Text>
                          {edu.location && (
                            <Text wrap style={basicPDFStyles.educationLocation}>
                              {edu.location}
                            </Text>
                          )}
                        </View>
                      ))}
                    </View>
                  );

                case 'projects':
                  if (projects.length === 0) return null;
                  return (
                    <View key="projects">
                      <View style={basicPDFStyles.sectionHeader}>
                        <Text wrap style={basicPDFStyles.sectionTitle}>
                          {sectionConfig.titles.projects}
                        </Text>
                      </View>
                      {projects.map((project) => (
                        <View key={project.id} style={basicPDFStyles.project}>
                          <Text wrap style={basicPDFStyles.projectName}>
                            {project.name}
                          </Text>
                          {project.url && (
                            <Text wrap style={basicPDFStyles.projectUrl}>
                              {project.url}
                            </Text>
                          )}
                          {project.github && (
                            <Text wrap style={basicPDFStyles.projectUrl}>
                              {project.github}
                            </Text>
                          )}
                          {project.description && (
                            <Text wrap style={basicPDFStyles.projectDescription}>
                              {project.description}
                            </Text>
                          )}
                          {project.technologies && project.technologies.length > 0 && (
                            <Text wrap style={basicPDFStyles.projectTechnologies}>
                              Tech: {project.technologies.join(', ')}
                            </Text>
                          )}
                        </View>
                      ))}
                    </View>
                  );

                default:
                  return null;
              }
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
}
