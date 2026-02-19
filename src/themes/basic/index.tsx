import { Document, Page, View, Text, Image, StyleSheet, Svg, Path, Font } from '@react-pdf/renderer'
import type { CVData } from '../../types/cv.types'
import { iconPaths } from '../../lib/icons'

Font.registerHyphenationCallback(word => [word])

const PAGE_PADDING = 35
const SIDEBAR_WIDTH = 200

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: PAGE_PADDING,
    paddingBottom: PAGE_PADDING,
    paddingLeft: PAGE_PADDING,
    paddingRight: PAGE_PADDING,
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    paddingRight: 25,
    marginRight: 25,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  mainContent: {
    flex: 1,
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 2,
    lineHeight: 1.1,
  },
  role: {
    fontSize: 11,
    color: '#0EA5E9',
    fontWeight: '600',
    marginBottom: 24,
    lineHeight: 1.3,
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 12,
    lineHeight: 1.2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 8,
    color: '#475569',
    marginLeft: 8,
    flex: 1,
    lineHeight: 1.4,
  },
  skillGroup: {
    marginBottom: 12,
  },
  skillTitle: {
    fontSize: 8,
    color: '#64748B',
    marginBottom: 6,
    fontWeight: '600',
    lineHeight: 1.2,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 3,
    fontSize: 7,
    color: '#334155',
    marginRight: 4,
    marginBottom: 4,
  },
  sectionHeader: {
    borderBottomWidth: 2,
    borderBottomColor: '#0EA5E9',
    paddingBottom: 6,
    marginBottom: 14,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    lineHeight: 1.2,
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.7,
    color: '#334155',
  },
  experience: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 3,
  },
  experienceRole: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0F172A',
    flex: 1,
    lineHeight: 1.2,
  },
  experienceDates: {
    fontSize: 8,
    color: '#0EA5E9',
    fontWeight: '600',
    marginLeft: 8,
    lineHeight: 1.2,
  },
  experienceCompany: {
    fontSize: 9,
    color: '#64748B',
    fontStyle: 'italic',
    marginBottom: 6,
    lineHeight: 1.3,
  },
  achievement: {
    fontSize: 8,
    color: '#334155',
    lineHeight: 1.6,
    marginBottom: 3,
    paddingLeft: 8,
  },
  education: {
    marginBottom: 14,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 3,
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0F172A',
    flex: 1,
    lineHeight: 1.2,
  },
  educationDates: {
    fontSize: 8,
    color: '#0EA5E9',
    fontWeight: '600',
    marginLeft: 8,
    lineHeight: 1.2,
  },
  educationInstitute: {
    fontSize: 9,
    color: '#64748B',
    lineHeight: 1.3,
    marginBottom: 2,
  },
  educationLocation: {
    fontSize: 8,
    color: '#94A3B8',
    fontStyle: 'italic',
    lineHeight: 1.3,
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 1.2,
    marginBottom: 3,
  },
  projectDescription: {
    fontSize: 8,
    color: '#334155',
    lineHeight: 1.6,
    marginBottom: 3,
  },
  projectTech: {
    fontSize: 7,
    color: '#64748B',
    lineHeight: 1.4,
  },
})

function PDFIcon({ name, size = 10, color = '#0EA5E9' }: { name: keyof typeof iconPaths; size?: number; color?: string }) {
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
  return achievements.map(a => a.replace(/<[^>]*>/g, '').trim()).filter(Boolean)
}

function Sidebar({ basicInfo, skills, sectionConfig }: { basicInfo: CVData['basicInfo']; skills: CVData['skills']; sectionConfig: CVData['sectionConfig'] }) {
  return (
    <View style={styles.sidebar} fixed>
      {basicInfo.photo && (
        <Image src={basicInfo.photo} style={styles.photo} />
      )}
      <Text style={styles.name}>{basicInfo.name}</Text>
      <Text style={styles.role}>{basicInfo.role}</Text>

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
  )
}

export function BasicDocument({ data }: { data: CVData }) {
  const { basicInfo, summary, experiences, education, skills, projects, sectionConfig } = data

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <Sidebar basicInfo={basicInfo} skills={skills} sectionConfig={sectionConfig} />

        <View style={styles.mainContent}>
          {sectionConfig.order.map(section => {
            if (!sectionConfig.visibility[section]) return null
            if (section === 'skills') return null

            switch (section) {
              case 'summary':
                return (
                  <View key="summary" wrap={false}>
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
                      <View key={exp.id} style={styles.experience} wrap={false}>
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
                      <View key={edu.id} style={styles.education} wrap={false}>
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
                      <View key={project.id} style={{ marginBottom: 10 }} wrap={false}>
                        <Text style={styles.projectName}>{project.name}</Text>
                        {project.description && <Text style={styles.projectDescription}>{project.description}</Text>}
                        {project.technologies && project.technologies.length > 0 && (
                          <Text style={styles.projectTech}>Tech: {project.technologies.join(', ')}</Text>
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
