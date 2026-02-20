import { Document, Page, View, Text, Image, StyleSheet, Font } from '@react-pdf/renderer'
import type { CVData } from '../../types/cv.types'

Font.register({
  family: 'Montserrat',
  fonts: [
    { src: '/fonts/Montserrat/static/Montserrat-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/Montserrat/static/Montserrat-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/Montserrat/static/Montserrat-SemiBold.ttf', fontWeight: 600 },
    { src: '/fonts/Montserrat/static/Montserrat-Bold.ttf', fontWeight: 700 },
    { src: '/fonts/Montserrat/static/Montserrat-Italic.ttf', fontStyle: 'italic' },
  ],
})

Font.registerHyphenationCallback(word => [word])

const COLORS = {
  primary: '#3E5F8A',
  primaryDark: '#2F4F7C',
  accent: '#6EA0D8',
  background: '#F1F4F7',
  text: '#4A4A4A',
  textLight: '#6B7B8A',
  white: '#FFFFFF',
}

const SPACING = {
  page: 40,
  sectionGap: 18,
  itemGap: 14,
}

const FONTS = {
  title: 36,
  subtitle: 14,
  body: 11,
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.background,
    paddingTop: SPACING.page,
    paddingBottom: SPACING.page,
    paddingLeft: SPACING.page,
    paddingRight: SPACING.page,
    fontFamily: 'Montserrat',
    position: 'relative',
  },
  gradientTopRight: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#4F7BB8',
    opacity: 0.35,
  },
  gradientTopRightInner: {
    position: 'absolute',
    top: -40,
    right: -120,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#8FB4E3',
    opacity: 0.25,
  },
  gradientBottomLeft: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.accent,
    opacity: 0.18,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
  header: {
    marginBottom: SPACING.sectionGap + 8,
    alignItems: 'center',
  },
  photo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 16,
  },
  name: {
    fontSize: FONTS.title,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 8,
    fontFamily: 'Montserrat',
  },
  role: {
    fontSize: FONTS.subtitle,
    color: COLORS.primaryDark,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 16,
    fontFamily: 'Montserrat',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  contactItem: {
    fontSize: FONTS.body - 1,
    fontWeight: 500,
    color: COLORS.textLight,
    marginHorizontal: 8,
    marginBottom: 4,
    fontFamily: 'Montserrat',
  },
  section: {
    marginBottom: SPACING.sectionGap,
  },
  sectionTitle: {
    fontSize: FONTS.subtitle - 1,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
    fontFamily: 'Montserrat',
  },
  summaryText: {
    fontSize: FONTS.body,
    fontWeight: 500,
    lineHeight: 1.7,
    color: COLORS.text,
    textAlign: 'center',
    fontFamily: 'Montserrat',
    paddingHorizontal: 20,
  },
  experienceItem: {
    marginBottom: SPACING.itemGap,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  experienceRole: {
    fontSize: FONTS.body + 1,
    fontWeight: '600',
    color: COLORS.primaryDark,
    fontFamily: 'Montserrat',
  },
  experienceDates: {
    fontSize: FONTS.body - 1,
    fontWeight: 500,
    color: COLORS.textLight,
    fontFamily: 'Montserrat',
  },
  experienceCompany: {
    fontSize: FONTS.body,
    fontWeight: 500,
    color: COLORS.textLight,
    fontStyle: 'italic',
    marginBottom: 6,
    fontFamily: 'Montserrat',
  },
  achievementItem: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 4,
  },
  achievementBullet: {
    width: 12,
    fontSize: FONTS.body,
    color: COLORS.accent,
    fontFamily: 'Montserrat',
  },
  achievementText: {
    flex: 1,
    fontSize: FONTS.body,
    fontWeight: 500,
    lineHeight: 1.6,
    color: COLORS.text,
    fontFamily: 'Montserrat',
  },
  educationItem: {
    marginBottom: SPACING.itemGap,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  educationDegree: {
    fontSize: FONTS.body + 1,
    fontWeight: '600',
    color: COLORS.primaryDark,
    flex: 1,
    fontFamily: 'Montserrat',
  },
  educationDates: {
    fontSize: FONTS.body - 1,
    fontWeight: 500,
    color: COLORS.textLight,
    fontFamily: 'Montserrat',
  },
  educationInstitute: {
    fontSize: FONTS.body,
    fontWeight: 500,
    color: COLORS.textLight,
    fontStyle: 'italic',
    fontFamily: 'Montserrat',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  skillTag: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: FONTS.body - 1,
    color: COLORS.primary,
    marginHorizontal: 5,
    marginBottom: 8,
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
  projectItem: {
    marginBottom: SPACING.itemGap,
  },
  projectName: {
    fontSize: FONTS.body + 1,
    fontWeight: '600',
    color: COLORS.primaryDark,
    marginBottom: 4,
    fontFamily: 'Montserrat',
  },
  projectDescription: {
    fontSize: FONTS.body,
    fontWeight: 500,
    lineHeight: 1.6,
    color: COLORS.text,
    marginBottom: 4,
    fontFamily: 'Montserrat',
  },
  projectTech: {
    fontSize: FONTS.body - 1,
    fontWeight: 500,
    color: COLORS.textLight,
    fontStyle: 'italic',
    fontFamily: 'Montserrat',
  },
})

function formatDateRange(startDate: string, endDate: string, current?: boolean): string {
  if (!startDate) return ''
  const start = formatMonthYear(startDate)
  const end = current ? 'Presente' : formatMonthYear(endDate)
  return `${start} – ${end}`
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

function GradientBackground() {
  return (
    <>
      <View style={styles.gradientTopRight} fixed />
      <View style={styles.gradientTopRightInner} fixed />
      <View style={styles.gradientBottomLeft} fixed />
    </>
  )
}

function Header({ basicInfo }: { basicInfo: CVData['basicInfo'] }) {
  const contactItems = [
    basicInfo.email,
    basicInfo.phone,
    basicInfo.location,
    basicInfo.website,
    basicInfo.github,
    basicInfo.linkedin,
  ].filter(Boolean)

  return (
    <View style={styles.header} wrap={false}>
      {basicInfo.photo && (
        <Image src={basicInfo.photo} style={styles.photo} />
      )}
      <Text style={styles.name}>{basicInfo.name}</Text>
      <Text style={styles.role}>{basicInfo.role}</Text>
      <View style={styles.contactRow}>
        {contactItems.map((item, idx) => (
          <Text key={idx} style={styles.contactItem}>{item}</Text>
        ))}
      </View>
    </View>
  )
}

function SkillsSection({ skills, title }: { skills: CVData['skills']; title: string }) {
  if (skills.length === 0) return null
  
  const allSkills = skills.flatMap(s => s.details.split(',').map(d => d.trim()))
  
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.skillsContainer}>
        {allSkills.map((skill, idx) => (
          <Text key={idx} style={styles.skillTag}>{skill}</Text>
        ))}
      </View>
    </View>
  )
}

function SummarySection({ summary, title }: { summary: CVData['summary']; title: string }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.summaryText}>{summary.content}</Text>
    </View>
  )
}

function ExperienceSection({ experiences, title }: { experiences: CVData['experiences']; title: string }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {experiences.map(exp => (
        <View key={exp.id} style={styles.experienceItem}>
          <View style={styles.experienceHeader}>
            <Text style={styles.experienceRole}>{exp.role}</Text>
            <Text style={styles.experienceDates}>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</Text>
          </View>
          <Text style={styles.experienceCompany}>{exp.company}</Text>
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
      <Text style={styles.sectionTitle}>{title}</Text>
      {education.map(edu => (
        <View key={edu.id} style={styles.educationItem}>
          <View style={styles.educationHeader}>
            <Text style={styles.educationDegree}>{edu.degree}</Text>
            <Text style={styles.educationDates}>{formatDateRange(edu.startDate, edu.endDate, edu.current)}</Text>
          </View>
          <Text style={styles.educationInstitute}>{edu.institute}{edu.location ? `, ${edu.location}` : ''}</Text>
        </View>
      ))}
    </View>
  )
}

function ProjectsSection({ projects, title }: { projects: CVData['projects']; title: string }) {
  if (projects.length === 0) return null
  
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
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

export function ModernoDocument({ data }: { data: CVData }) {
  const { basicInfo, summary, experiences, education, skills, projects, sectionConfig } = data

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <GradientBackground />
        <View style={styles.content}>
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
        </View>
      </Page>
    </Document>
  )
}

export const modernoTheme = {
  id: 'moderno',
  name: 'Moderno',
  Document: ModernoDocument,
}
