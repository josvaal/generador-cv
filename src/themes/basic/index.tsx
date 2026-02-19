import { Document, Page, View, Text, Image, StyleSheet, Svg, Path, Font } from '@react-pdf/renderer'
import type { CVData } from '../../types/cv.types'
import { iconPaths } from '../../lib/icons'
import profilePhoto from '../../assets/profile.png'

Font.register({
  family: 'DMSans',
  fonts: [
    { src: '/fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf' },
    { src: '/fonts/DM_Sans/DMSans-Italic-VariableFont_opsz,wght.ttf', fontStyle: 'italic' },
  ],
})

Font.registerHyphenationCallback(word => [word])

const COLORS = {
  primary: '#0F172A',
  accent: '#0284C7',
  muted: '#64748B',
  light: '#94A3B8',
  background: '#F8FAFC',
  text: '#334155',
  border: '#E2E8F0',
}

const SPACING = {
  page: 28,
  sectionGap: 12,
  itemGap: 10,
  inline: 6,
}

const FONTS = {
  title: 24,
  subtitle: 12,
  body: 10,
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    paddingTop: SPACING.page,
    paddingBottom: SPACING.page,
    paddingLeft: SPACING.page,
    paddingRight: SPACING.page,
    fontFamily: 'DMSans',
  },
  header: {
    flexDirection: 'row',
    marginBottom: SPACING.sectionGap,
    alignItems: 'center',
  },
  photoContainer: {
    marginRight: 18,
  },
  photo: {
    width: 85,
    height: 85,
    borderRadius: 42,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: FONTS.title,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
    fontFamily: 'DMSans',
  },
  role: {
    fontSize: FONTS.subtitle,
    color: COLORS.accent,
    fontWeight: '600',
    marginBottom: 10,
    fontFamily: 'DMSans',
  },
  contactGrid: {
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
    fontSize: FONTS.body,
    color: COLORS.text,
    marginLeft: 5,
    fontFamily: 'DMSans',
  },
  divider: {
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.border,
    marginBottom: SPACING.sectionGap,
  },
  section: {
    marginBottom: SPACING.sectionGap,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.accent,
    paddingBottom: 5,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: FONTS.subtitle,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'DMSans',
  },
  summaryText: {
    fontSize: FONTS.body,
    lineHeight: 1.65,
    color: COLORS.text,
    fontFamily: 'DMSans',
  },
  experienceItem: {
    marginBottom: SPACING.itemGap,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
    marginTop: 5
  },
  experienceRole: {
    fontSize: FONTS.body,
    fontWeight: 'bold',
    color: COLORS.primary,
    flex: 1,
    fontFamily: 'DMSans',
  },
  experienceDates: {
    fontSize: FONTS.body,
    color: COLORS.accent,
    fontWeight: '500',
    marginLeft: 4,
    fontFamily: 'DMSans',
  },
  experienceCompany: {
    fontSize: FONTS.body,
    color: COLORS.muted,
    fontStyle: 'italic',
    marginBottom: 2,
    lineHeight: 1,
    fontFamily: 'DMSans',
  },
  experienceMeta: {
    marginBottom: SPACING.itemGap,
  },
  achievementItem: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 2,
  },
  achievementBullet: {
    width: 10,
    fontSize: FONTS.body,
    color: COLORS.accent,
    fontFamily: 'DMSans',
  },
  achievementText: {
    flex: 1,
    fontSize: FONTS.body,
    lineHeight: 1.5,
    color: COLORS.text,
    fontFamily: 'DMSans',
  },
  educationItem: {
    marginBottom: SPACING.itemGap,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  educationDegree: {
    fontSize: FONTS.body,
    fontWeight: 'bold',
    color: COLORS.primary,
    flex: 1,
    paddingRight: 10,
    fontFamily: 'DMSans',
  },
  educationDates: {
    fontSize: FONTS.body,
    color: COLORS.accent,
    fontWeight: '500',
    marginLeft: 4,
    fontFamily: 'DMSans',
  },
  educationInstitute: {
    fontSize: FONTS.body,
    color: COLORS.muted,
    marginBottom: 2,
    lineHeight: 1.4,
    fontFamily: 'DMSans',
  },
  educationLocation: {
    fontSize: FONTS.body,
    color: COLORS.light,
    lineHeight: 1.4,
    fontFamily: 'DMSans',
  },
  skillsContainer: {
    marginBottom: 10,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillCategory: {
    width: '50%',
    marginBottom: 12,
    paddingRight: 10,
  },
  skillTitle: {
    fontSize: FONTS.body,
    fontWeight: '600',
    color: COLORS.muted,
    marginBottom: 5,
    fontFamily: 'DMSans',
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 3,
    fontSize: FONTS.body,
    color: COLORS.text,
    marginRight: 4,
    marginBottom: 4,
    fontFamily: 'DMSans',
  },
  projectItem: {
    marginBottom: SPACING.itemGap,
  },
  projectName: {
    fontSize: FONTS.body,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 3,
    fontFamily: 'DMSans',
  },
  projectDescription: {
    fontSize: FONTS.body,
    lineHeight: 1.55,
    color: COLORS.text,
    marginBottom: 3,
    fontFamily: 'DMSans',
  },
  projectTech: {
    fontSize: FONTS.body,
    color: COLORS.muted,
    fontFamily: 'DMSans',
  },
})

function Icon({ name, size = 10, color = COLORS.accent }: { name: keyof typeof iconPaths; size?: number; color?: string }) {
  return (
    <Svg viewBox="0 0 256 256" width={size} height={size}>
      <Path d={iconPaths[name]} fill={color} />
    </Svg>
  )
}

function formatDateRange(startDate: string, endDate: string, current?: boolean): string {
  if (!startDate) return ''
  const start = formatMonthYear(startDate)
  const end = current ? 'Actualidad' : formatMonthYear(endDate)
  return `${start} — ${end}`
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

function Header({ basicInfo }: { basicInfo: CVData['basicInfo'] }) {
  return (
    <View style={styles.header} wrap={false}>
      <View style={styles.photoContainer}>
        <Image src={profilePhoto} style={styles.photo} />
      </View>
      <View style={styles.headerInfo}>
        <Text style={styles.name}>{basicInfo.name}</Text>
        <Text style={styles.role}>{basicInfo.role}</Text>
        <View style={styles.contactGrid}>
          {basicInfo.email && (
            <View style={styles.contactItem}>
              <Icon name="envelope" size={10} />
              <Text style={styles.contactText}>{basicInfo.email}</Text>
            </View>
          )}
          {basicInfo.phone && (
            <View style={styles.contactItem}>
              <Icon name="phone" size={10} />
              <Text style={styles.contactText}>{basicInfo.phone}</Text>
            </View>
          )}
          {basicInfo.location && (
            <View style={styles.contactItem}>
              <Icon name="mapPin" size={10} />
              <Text style={styles.contactText}>{basicInfo.location}</Text>
            </View>
          )}
          {basicInfo.website && (
            <View style={styles.contactItem}>
              <Icon name="globe" size={10} />
              <Text style={styles.contactText}>{basicInfo.website}</Text>
            </View>
          )}
          {basicInfo.github && (
            <View style={styles.contactItem}>
              <Icon name="githubLogo" size={10} />
              <Text style={styles.contactText}>{basicInfo.github}</Text>
            </View>
          )}
          {basicInfo.linkedin && (
            <View style={styles.contactItem}>
              <Icon name="linkedinLogo" size={10} />
              <Text style={styles.contactText}>{basicInfo.linkedin}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

function SectionHeader({ title, iconName }: { title: string; iconName: keyof typeof iconPaths }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionIcon}>
        <Icon name={iconName} size={12} color={COLORS.accent} />
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  )
}

function SkillsSection({ skills, title }: { skills: CVData['skills']; title: string }) {
  if (skills.length === 0) return null
  
  return (
    <View style={styles.skillsContainer}>
      <SectionHeader title={title} iconName="code" />
      <View style={styles.skillsGrid}>
        {skills.map(skill => (
          <View key={skill.id} style={styles.skillCategory}>
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

function SummarySection({ summary, title }: { summary: CVData['summary']; title: string }) {
  return (
    <View style={styles.section}>
      <SectionHeader title={title} iconName="arrowRight" />
      <Text style={styles.summaryText}>{summary.content}</Text>
    </View>
  )
}

function ExperienceSection({ experiences, title }: { experiences: CVData['experiences']; title: string }) {
  return (
    <View style={styles.section}>
      <SectionHeader title={title} iconName="briefcase" />
      {experiences.map(exp => (
        <View key={exp.id}>
          <View style={styles.experienceMeta} wrap={false}>
            <View style={styles.experienceHeader}>
              <Text style={styles.experienceRole}>{exp.role}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="calendarBlank" size={10} color={COLORS.accent} />
                <Text style={styles.experienceDates}>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</Text>
              </View>
            </View>
            <Text style={styles.experienceCompany}>{exp.company}</Text>
          </View>
          {exp.achievements && exp.achievements.map((achievement, idx) => (
            <View key={idx} style={styles.achievementItem} wrap={false}>
              <Text style={styles.achievementBullet}>•</Text>
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
      <SectionHeader title={title} iconName="graduationCap" />
      {education.map(edu => (
        <View key={edu.id} style={styles.educationItem}>
          <View style={styles.educationHeader} wrap={false}>
            <Text style={styles.educationDegree}>{edu.degree}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="calendarBlank" size={10} color={COLORS.accent} />
              <Text style={styles.educationDates}>{formatDateRange(edu.startDate, edu.endDate, edu.current)}</Text>
            </View>
          </View>
          <Text style={styles.educationInstitute}>{edu.institute}</Text>
          {edu.location && <Text style={styles.educationLocation}>{edu.location}</Text>}
        </View>
      ))}
    </View>
  )
}

function ProjectsSection({ projects, title }: { projects: CVData['projects']; title: string }) {
  if (projects.length === 0) return null
  
  return (
    <View style={styles.section}>
      <SectionHeader title={title} iconName="folder" />
      {projects.map(project => (
        <View key={project.id} style={styles.projectItem}>
          <Text style={styles.projectName}>{project.name}</Text>
          {project.description && <Text style={styles.projectDescription}>{project.description}</Text>}
          {project.technologies && project.technologies.length > 0 && (
            <Text style={styles.projectTech}>Tecnologías: {project.technologies.join(', ')}</Text>
          )}
        </View>
      ))}
    </View>
  )
}

export function BasicDocument({ data }: { data: CVData }) {
  const { basicInfo, summary, experiences, education, skills, projects, sectionConfig } = data

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <Header basicInfo={basicInfo} />
        <View style={styles.divider} />
        
        {sectionConfig.visibility.skills && (
          <SkillsSection skills={skills} title={sectionConfig.titles.skills} />
        )}
        
        {sectionConfig.order.map(section => {
          if (!sectionConfig.visibility[section]) return null

          switch (section) {
            case 'summary':
              return <SummarySection key="summary" summary={summary} title={sectionConfig.titles.summary} />
            case 'experiences':
              return <ExperienceSection key="experiences" experiences={experiences} title={sectionConfig.titles.experiences} />
            case 'education':
              return <EducationSection key="education" education={education} title={sectionConfig.titles.education} />
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

export const basicTheme = {
  id: 'basic',
  name: 'Básico',
  Document: BasicDocument,
}
