import { Document, Page, View, Text, Image, StyleSheet, Svg, Path } from '@react-pdf/renderer'
import type { CVData } from '../../types/cv.types'
import { iconPaths } from '../../lib/icons'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  sidebar: {
    width: '35%',
    backgroundColor: '#1E293B',
    padding: 30,
    paddingTop: 40,
  },
  mainContent: {
    width: '65%',
    padding: 40,
    paddingTop: 40,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  nameSidebar: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  roleSidebar: {
    fontSize: 11,
    color: '#38BDF8',
    marginBottom: 24,
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 9,
    color: '#E2E8F0',
    marginLeft: 8,
    flex: 1,
  },
  skillGroup: {
    marginBottom: 12,
  },
  skillTitle: {
    fontSize: 8,
    color: '#94A3B8',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillTag: {
    backgroundColor: '#334155',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 3,
    fontSize: 7,
    color: '#E2E8F0',
    marginRight: 4,
    marginBottom: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  role: {
    fontSize: 13,
    color: '#0EA5E9',
    fontWeight: '600',
    marginBottom: 20,
  },
  sectionHeader: {
    borderBottomWidth: 2,
    borderBottomColor: '#0EA5E9',
    paddingBottom: 6,
    marginBottom: 12,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#334155',
  },
  experience: {
    marginBottom: 14,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  experienceRole: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0F172A',
    flex: 1,
  },
  experienceDates: {
    fontSize: 9,
    color: '#0EA5E9',
    fontWeight: '600',
  },
  experienceCompany: {
    fontSize: 10,
    color: '#64748B',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  achievement: {
    fontSize: 9,
    color: '#334155',
    lineHeight: 1.5,
    marginBottom: 2,
    paddingLeft: 8,
  },
  education: {
    marginBottom: 12,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  educationDegree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0F172A',
    flex: 1,
  },
  educationDates: {
    fontSize: 9,
    color: '#0EA5E9',
    fontWeight: '600',
  },
  educationInstitute: {
    fontSize: 10,
    color: '#64748B',
  },
  educationLocation: {
    fontSize: 9,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
})

function PDFIcon({ name, size = 12, color = '#38BDF8' }: { name: keyof typeof iconPaths; size?: number; color?: string }) {
  return (
    <Svg viewBox="0 0 256 256" width={size} height={size}>
      <Path d={iconPaths[name]} fill={color} />
    </Svg>
  )
}

function formatDateRange(startDate: string, endDate: string, current?: boolean): string {
  if (!startDate) return ''
  const start = formatMonthYear(startDate)
  const end = current ? 'Present' : formatMonthYear(endDate)
  return `${start} - ${end}`
}

function formatMonthYear(dateStr: string): string {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  if (!year || !month) return dateStr
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[parseInt(month, 10) - 1]} ${year}`
}

function processAchievements(achievements: string[]): string[] {
  return achievements.map(a => {
    return a.replace(/<[^>]*>/g, '').trim()
  }).filter(Boolean)
}

export function BasicDocument({ data }: { data: CVData }) {
  const { basicInfo, summary, experiences, education, skills, projects, sectionConfig } = data

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          {basicInfo.photo && (
            <Image src={basicInfo.photo} style={styles.photo} />
          )}
          <Text style={styles.nameSidebar}>{basicInfo.name}</Text>
          <Text style={styles.roleSidebar}>{basicInfo.role}</Text>

          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarLabel}>Contact</Text>
            {basicInfo.email && (
              <View style={styles.contactItem}>
                <PDFIcon name="envelope" />
                <Text style={styles.contactText}>{basicInfo.email}</Text>
              </View>
            )}
            {basicInfo.phone && (
              <View style={styles.contactItem}>
                <PDFIcon name="phone" />
                <Text style={styles.contactText}>{basicInfo.phone}</Text>
              </View>
            )}
            {basicInfo.location && (
              <View style={styles.contactItem}>
                <PDFIcon name="mapPin" />
                <Text style={styles.contactText}>{basicInfo.location}</Text>
              </View>
            )}
            {basicInfo.website && (
              <View style={styles.contactItem}>
                <PDFIcon name="globe" />
                <Text style={styles.contactText}>{basicInfo.website}</Text>
              </View>
            )}
            {basicInfo.github && (
              <View style={styles.contactItem}>
                <PDFIcon name="githubLogo" />
                <Text style={styles.contactText}>{basicInfo.github}</Text>
              </View>
            )}
            {basicInfo.linkedin && (
              <View style={styles.contactItem}>
                <PDFIcon name="linkedinLogo" />
                <Text style={styles.contactText}>{basicInfo.linkedin}</Text>
              </View>
            )}
          </View>

          {sectionConfig.visibility.skills && skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarLabel}>Skills</Text>
              {skills.map(skill => (
                <View key={skill.id} style={styles.skillGroup}>
                  <Text style={styles.skillTitle}>{skill.title}</Text>
                  <View style={styles.skillTags}>
                    {skill.details.split(',').map((s, i) => (
                      <Text key={i} style={styles.skillTag}>{s.trim()}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.mainContent}>
          <Text style={styles.name}>{basicInfo.name}</Text>
          <Text style={styles.role}>{basicInfo.role}</Text>

          {sectionConfig.order.map(section => {
            if (!sectionConfig.visibility[section]) return null
            if (section === 'skills') return null

            switch (section) {
              case 'summary':
                return (
                  <View key="summary">
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>{sectionConfig.titles.summary}</Text>
                    </View>
                    <Text style={styles.summary}>{summary.content}</Text>
                  </View>
                )

              case 'experiences':
                return (
                  <View key="experiences">
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>{sectionConfig.titles.experiences}</Text>
                    </View>
                    {experiences.map(exp => (
                      <View key={exp.id} style={styles.experience}>
                        <View style={styles.experienceHeader}>
                          <Text style={styles.experienceRole}>{exp.role}</Text>
                          <Text style={styles.experienceDates}>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</Text>
                        </View>
                        <Text style={styles.experienceCompany}>{exp.company}</Text>
                        {exp.achievements && processAchievements(exp.achievements).map((achievement, idx) => (
                          <Text key={idx} style={styles.achievement}>• {achievement}</Text>
                        ))}
                      </View>
                    ))}
                  </View>
                )

              case 'education':
                return (
                  <View key="education">
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>{sectionConfig.titles.education}</Text>
                    </View>
                    {education.map(edu => (
                      <View key={edu.id} style={styles.education}>
                        <View style={styles.educationHeader}>
                          <Text style={styles.educationDegree}>{edu.degree}</Text>
                          <Text style={styles.educationDates}>{formatDateRange(edu.startDate, edu.endDate, edu.current)}</Text>
                        </View>
                        <Text style={styles.educationInstitute}>{edu.institute}</Text>
                        {edu.location && <Text style={styles.educationLocation}>{edu.location}</Text>}
                      </View>
                    ))}
                  </View>
                )

              case 'projects':
                if (projects.length === 0) return null
                return (
                  <View key="projects">
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>{sectionConfig.titles.projects}</Text>
                    </View>
                    {projects.map(project => (
                      <View key={project.id} style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0F172A' }}>{project.name}</Text>
                        {project.description && <Text style={{ fontSize: 9, color: '#334155', marginTop: 2 }}>{project.description}</Text>}
                        {project.technologies && project.technologies.length > 0 && (
                          <Text style={{ fontSize: 8, color: '#64748B', marginTop: 2 }}>Tech: {project.technologies.join(', ')}</Text>
                        )}
                      </View>
                    ))}
                  </View>
                )

              default:
                return null
            }
          })}
        </View>
      </Page>
    </Document>
  )
}

export const basicTheme = {
  id: 'basic',
  name: 'Basic',
  Document: BasicDocument,
}
