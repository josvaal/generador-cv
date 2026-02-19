import { Document, Page, View, Text, Image, StyleSheet, Svg, Path, Font } from '@react-pdf/renderer'
import type { CVData } from '../../types/cv.types'
import { iconPaths } from '../../lib/icons'

Font.registerHyphenationCallback(word => [word])

const PAGE_PADDING = 35

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    paddingTop: PAGE_PADDING,
    paddingBottom: PAGE_PADDING,
    paddingLeft: PAGE_PADDING,
    paddingRight: PAGE_PADDING,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#0EA5E9',
  },
  headerLeft: {
    width: 100,
    marginRight: 20,
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  headerRight: {
    flex: 1,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
    lineHeight: 1.1,
  },
  role: {
    fontSize: 12,
    color: '#0EA5E9',
    fontWeight: '600',
    marginBottom: 12,
    lineHeight: 1.2,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  contactText: {
    fontSize: 8,
    color: '#475569',
    marginLeft: 6,
    lineHeight: 1.2,
  },
  skillsSection: {
    marginBottom: 20,
    marginTop: 16,
  },
  skillsLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
    lineHeight: 1.2,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillGroup: {
    marginRight: 20,
    marginBottom: 8,
  },
  skillTitle: {
    fontSize: 7,
    color: '#64748B',
    marginBottom: 4,
    fontWeight: '600',
    lineHeight: 1.2,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 2,
    fontSize: 7,
    color: '#334155',
    marginRight: 3,
    marginBottom: 2,
  },
  sectionHeader: {
    borderBottomWidth: 2,
    borderBottomColor: '#0EA5E9',
    paddingBottom: 5,
    marginBottom: 12,
    marginTop: 14,
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
    marginBottom: 14,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
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
    marginBottom: 5,
    lineHeight: 1.3,
  },
  achievement: {
    fontSize: 8,
    color: '#334155',
    lineHeight: 1.6,
    marginBottom: 2,
    paddingLeft: 8,
  },
  education: {
    marginBottom: 12,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
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

function PDFIcon({ name, size = 9, color = '#0EA5E9' }: { name: keyof typeof iconPaths; size?: number; color?: string }) {
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

function Header({ basicInfo }: { basicInfo: CVData['basicInfo'] }) {
  return (
    <View style={styles.header} wrap={false}>
      {basicInfo.photo && (
        <View style={styles.headerLeft}>
          <Image src={basicInfo.photo} style={styles.photo} />
        </View>
      )}
      <View style={styles.headerRight}>
        <Text style={styles.name}>{basicInfo.name}</Text>
        <Text style={styles.role}>{basicInfo.role}</Text>
        <View style={styles.contactRow}>
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
      </View>
    </View>
  )
}

function SkillsSection({ skills }: { skills: CVData['skills'] }) {
  if (skills.length === 0) return null
  
  return (
    <View style={styles.skillsSection} wrap={false}>
      <Text style={styles.skillsLabel}>Skills</Text>
      <View style={styles.skillsRow}>
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
    </View>
  )
}

function ContentSections({ summary, experiences, education, projects, sectionConfig }: { 
  summary: CVData['summary']
  experiences: CVData['experiences']
  education: CVData['education']
  projects: CVData['projects']
  sectionConfig: CVData['sectionConfig']
}) {
  return (
    <>
      {sectionConfig.order.map(section => {
        if (!sectionConfig.visibility[section]) return null

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

          case 'skills':
            return null

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
    </>
  )
}

export function BasicDocument({ data }: { data: CVData }) {
  const { basicInfo, summary, experiences, education, skills, projects, sectionConfig } = data

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <Header basicInfo={basicInfo} />
        {sectionConfig.visibility.skills && <SkillsSection skills={skills} />}
        <ContentSections 
          summary={summary}
          experiences={experiences}
          education={education}
          projects={projects}
          sectionConfig={sectionConfig}
        />
      </Page>
    </Document>
  )
}

export const basicTheme = {
  id: 'basic',
  name: 'Basic',
  Document: BasicDocument,
}
