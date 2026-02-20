import { Document, Page, View, Text, Image, StyleSheet, Svg, Path, Font } from '@react-pdf/renderer'
import type { CVData } from '../../types/cv.types'
import { iconPaths } from '../../lib/icons'

Font.register({
  family: 'JetBrains Mono',
  fonts: [
    { src: '/fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf' },
    { src: '/fonts/JetBrains_Mono/JetBrainsMono-Italic-VariableFont_wght.ttf', fontStyle: 'italic' },
  ],
})

Font.registerHyphenationCallback(word => [word])

const COLORS = {
  background: '#1E1E2E',
  surface: '#2A2A3E',
  border: '#3D3D5C',
  primary: '#89B4FA',
  secondary: '#CDD6F4',
  muted: '#6C7086',
  accent: '#F5C2E7',
  green: '#A6E3A1',
  yellow: '#F9E2AF',
  text: '#CDD6F4',
  textDim: '#9399B2',
}

const SPACING = {
  page: 28,
  sectionGap: 14,
  itemGap: 10,
}

const FONTS = {
  title: 26,
  subtitle: 13,
  body: 10,
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.background,
    paddingTop: SPACING.page,
    paddingBottom: SPACING.page,
    paddingLeft: SPACING.page,
    paddingRight: SPACING.page,
    fontFamily: 'JetBrains Mono',
  },
  header: {
    marginBottom: SPACING.sectionGap + 4,
    paddingBottom: SPACING.sectionGap,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  photoContainer: {
    marginRight: 16,
    padding: 2,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 6,
  },
  photo: {
    width: 92,
    height: 92,
    borderRadius: 4,
  },
  headerInfo: {
    flex: 1,
  },
  commentLine: {
    fontSize: FONTS.body - 2,
    color: COLORS.muted,
    marginBottom: 6,
  },
  name: {
    fontSize: FONTS.title,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
    letterSpacing: 1,
  },
  role: {
    fontSize: FONTS.subtitle,
    color: COLORS.accent,
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
    marginBottom: 4,
  },
  contactText: {
    fontSize: FONTS.body - 1,
    color: COLORS.textDim,
    marginLeft: 5,
  },
  section: {
    marginBottom: SPACING.sectionGap,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionNumber: {
    fontSize: FONTS.body - 2,
    color: COLORS.muted,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: FONTS.subtitle,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  summaryText: {
    fontSize: FONTS.body,
    lineHeight: 1.65,
    color: COLORS.text,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.border,
  },
  experienceItem: {
    marginBottom: SPACING.itemGap,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.border,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  experienceRole: {
    fontSize: FONTS.body + 1,
    fontWeight: 'bold',
    color: COLORS.yellow,
    flex: 1,
  },
  experienceDates: {
    fontSize: FONTS.body - 2,
    color: COLORS.muted,
  },
  experienceCompany: {
    fontSize: FONTS.body,
    color: COLORS.green,
    marginBottom: 4,
  },
  achievementItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  achievementBullet: {
    fontSize: FONTS.body - 1,
    color: COLORS.primary,
    width: 14,
  },
  achievementText: {
    flex: 1,
    fontSize: FONTS.body - 1,
    lineHeight: 1.5,
    color: COLORS.text,
  },
  educationItem: {
    marginBottom: SPACING.itemGap,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.border,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  educationDegree: {
    fontSize: FONTS.body + 1,
    fontWeight: 'bold',
    color: COLORS.yellow,
    flex: 1,
  },
  educationDates: {
    fontSize: FONTS.body - 2,
    color: COLORS.muted,
  },
  educationInstitute: {
    fontSize: FONTS.body,
    color: COLORS.green,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillCategory: {
    width: '50%',
    marginBottom: 10,
    paddingRight: 8,
  },
  skillLabel: {
    fontSize: FONTS.body - 1,
    color: COLORS.accent,
    marginBottom: 4,
  },
  skillValue: {
    fontSize: FONTS.body - 1,
    color: COLORS.text,
    lineHeight: 1.5,
  },
  projectItem: {
    marginBottom: SPACING.itemGap,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.border,
  },
  projectName: {
    fontSize: FONTS.body + 1,
    fontWeight: 'bold',
    color: COLORS.yellow,
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: FONTS.body - 1,
    lineHeight: 1.5,
    color: COLORS.text,
    marginBottom: 2,
  },
  projectTech: {
    fontSize: FONTS.body - 2,
    color: COLORS.textDim,
  },
})

function formatDateRange(startDate: string, endDate: string, current?: boolean): string {
  if (!startDate) return ''
  const start = formatMonthYear(startDate)
  const end = current ? 'Presente' : formatMonthYear(endDate)
  return `${start} → ${end}`
}

function formatMonthYear(dateStr: string): string {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  if (!year || !month) return dateStr
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return `${months[parseInt(month, 10) - 1]} ${year}`
}

function cleanText(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

function Icon({ name, size = 10, color = COLORS.green }: { name: keyof typeof iconPaths; size?: number; color?: string }) {
  return (
    <Svg viewBox="0 0 256 256" width={size} height={size}>
      <Path d={iconPaths[name]} fill={color} />
    </Svg>
  )
}

function Header({ basicInfo }: { basicInfo: CVData['basicInfo'] }) {
  return (
    <View style={styles.header} wrap={false}>
      <View style={styles.headerTop}>
        {basicInfo.photo && (
          <View style={styles.photoContainer}>
            <Image src={basicInfo.photo} style={styles.photo} />
          </View>
        )}
        <View style={styles.headerInfo}>
          <Text style={styles.commentLine}>// Perfil profesional</Text>
          <Text style={styles.name}>{basicInfo.name}</Text>
          <Text style={styles.role}>{basicInfo.role}</Text>
          <View style={styles.contactRow}>
            {basicInfo.email && (
              <View style={styles.contactItem}>
                <Icon name="envelope" size={10} color={COLORS.green} />
                <Text style={styles.contactText}>{basicInfo.email}</Text>
              </View>
            )}
            {basicInfo.phone && (
              <View style={styles.contactItem}>
                <Icon name="phone" size={10} color={COLORS.green} />
                <Text style={styles.contactText}>{basicInfo.phone}</Text>
              </View>
            )}
            {basicInfo.location && (
              <View style={styles.contactItem}>
                <Icon name="mapPin" size={10} color={COLORS.green} />
                <Text style={styles.contactText}>{basicInfo.location}</Text>
              </View>
            )}
            {basicInfo.website && (
              <View style={styles.contactItem}>
                <Icon name="globe" size={10} color={COLORS.green} />
                <Text style={styles.contactText}>{basicInfo.website}</Text>
              </View>
            )}
            {basicInfo.github && (
              <View style={styles.contactItem}>
                <Icon name="githubLogo" size={10} color={COLORS.green} />
                <Text style={styles.contactText}>{basicInfo.github}</Text>
              </View>
            )}
            {basicInfo.linkedin && (
              <View style={styles.contactItem}>
                <Icon name="linkedinLogo" size={10} color={COLORS.green} />
                <Text style={styles.contactText}>{basicInfo.linkedin}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  )
}

function SummarySection({ summary, title }: { summary: CVData['summary']; title: string }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionNumber}>01.</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <Text style={styles.summaryText}>{summary.content}</Text>
    </View>
  )
}

function ExperienceSection({ experiences, title }: { experiences: CVData['experiences']; title: string }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionNumber}>02.</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {experiences.map(exp => (
        <View key={exp.id} style={styles.experienceItem}>
          <View style={styles.experienceHeader}>
            <Text style={styles.experienceRole}>{exp.role}</Text>
            <Text style={styles.experienceDates}>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</Text>
          </View>
          <Text style={styles.experienceCompany}>@ {exp.company}</Text>
          {exp.achievements && exp.achievements.map((achievement, idx) => (
            <View key={idx} style={styles.achievementItem} wrap={false}>
              <Text style={styles.achievementBullet}>→</Text>
              <Text style={styles.achievementText} wrap>{cleanText(achievement)}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

function EducationSection({ education, title }: { education: CVData['education']; title: string }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionNumber}>03.</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {education.map(edu => (
        <View key={edu.id} style={styles.educationItem}>
          <View style={styles.educationHeader}>
            <Text style={styles.educationDegree}>{edu.degree}</Text>
            <Text style={styles.educationDates}>{formatDateRange(edu.startDate, edu.endDate, edu.current)}</Text>
          </View>
          <Text style={styles.educationInstitute}>@ {edu.institute}{edu.location ? `, ${edu.location}` : ''}</Text>
        </View>
      ))}
    </View>
  )
}

function SkillsSection({ skills, title }: { skills: CVData['skills']; title: string }) {
  if (skills.length === 0) return null
  
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionNumber}>04.</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.skillsContainer}>
        {skills.map(skill => (
          <View key={skill.id} style={styles.skillCategory}>
            <Text style={styles.skillLabel}>{skill.title}</Text>
            <Text style={styles.skillValue}>{skill.details}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

function ProjectsSection({ projects, title }: { projects: CVData['projects']; title: string }) {
  if (projects.length === 0) return null
  
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionNumber}>05.</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {projects.map(project => (
        <View key={project.id} style={styles.projectItem}>
          <Text style={styles.projectName}>{project.name}</Text>
          {project.description && <Text style={styles.projectDescription}>{project.description}</Text>}
          {project.technologies && project.technologies.length > 0 && (
            <Text style={styles.projectTech}>Stack: {project.technologies.join(' • ')}</Text>
          )}
        </View>
      ))}
    </View>
  )
}

export function ProgramadorDocument({ data }: { data: CVData }) {
  const { basicInfo, summary, experiences, education, skills, projects, sectionConfig } = data

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <Header basicInfo={basicInfo} />
        
        {sectionConfig.order.map(section => {
          if (!sectionConfig.visibility[section]) return null

          switch (section) {
            case 'summary':
              return <SummarySection key="summary" summary={summary} title={sectionConfig.titles.summary} />
            case 'experiences':
              return <ExperienceSection key="experiences" experiences={experiences} title={sectionConfig.titles.experiences} />
            case 'education':
              return <EducationSection key="education" education={education} title={sectionConfig.titles.education} />
            case 'skills':
              return <SkillsSection key="skills" skills={skills} title={sectionConfig.titles.skills} />
            case 'projects':
              return <ProjectsSection key="projects" projects={projects} title={sectionConfig.titles.projects} />
            default:
              return null
          }
        })}
      </Page>
    </Document>
  )
}

export const programadorTheme = {
  id: 'programador',
  name: 'Programador',
  Document: ProgramadorDocument,
}
