import { Document, Page, View, Text, StyleSheet, Font, Image } from '@react-pdf/renderer'
import type { CVData } from '../../types/cv.types'

Font.register({
  family: 'Times New Roman',
  fonts: [
    { src: '/fonts/Times New Roman/Times New Roman.ttf' },
    { src: '/fonts/Times New Roman/Times New Roman - Bold.ttf', fontWeight: 'bold' },
    { src: '/fonts/Times New Roman/Times New Roman - Italic.ttf', fontStyle: 'italic' },
    { src: '/fonts/Times New Roman/Times New Roman - Bold Italic.ttf', fontWeight: 'bold', fontStyle: 'italic' },
  ],
})

Font.registerHyphenationCallback(word => [word])

const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
}

const SPACING = {
  page: 36,
  sectionGap: 18,
  itemGap: 10,
}

const FONTS = {
  title: 24,
  subtitle: 14,
  body: 11,
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.white,
    paddingTop: SPACING.page,
    paddingBottom: SPACING.page,
    paddingLeft: SPACING.page,
    paddingRight: SPACING.page,
    fontFamily: 'Times New Roman',
  },
  header: {
    marginBottom: SPACING.sectionGap,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  photoContainer: {
    marginRight: 20,
  },
  photo: {
    width: 85,
    height: 85,
    borderRadius: 2,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: FONTS.title,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 2,
    fontFamily: 'Times New Roman',
  },
  role: {
    fontSize: FONTS.subtitle,
    color: COLORS.black,
    fontFamily: 'Times New Roman',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  contactItem: {
    fontSize: FONTS.body - 1,
    color: COLORS.black,
    fontFamily: 'Times New Roman',
    marginRight: 12,
  },
  section: {
    marginBottom: SPACING.sectionGap,
  },
  sectionHeader: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: FONTS.subtitle,
    fontWeight: 'bold',
    color: COLORS.black,
    textTransform: 'uppercase',
    fontFamily: 'Times New Roman',
    letterSpacing: 1,
    marginBottom: 4,
  },
  sectionLine: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    marginTop: 2,
  },
  summaryText: {
    fontSize: FONTS.body,
    lineHeight: 1.25,
    color: COLORS.black,
    fontFamily: 'Times New Roman',
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: SPACING.itemGap,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  experienceRole: {
    fontSize: FONTS.body,
    fontWeight: 'bold',
    color: COLORS.black,
    fontFamily: 'Times New Roman',
  },
  experienceDates: {
    fontSize: FONTS.body,
    color: COLORS.black,
    fontFamily: 'Times New Roman',
  },
  experienceCompany: {
    fontSize: FONTS.body,
    color: COLORS.black,
    fontStyle: 'italic',
    marginBottom: 3,
    fontFamily: 'Times New Roman',
  },
  achievementItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  achievementBullet: {
    fontSize: FONTS.body,
    color: COLORS.black,
    fontFamily: 'Times New Roman',
    marginRight: 4,
  },
  achievementText: {
    flex: 1,
    fontSize: FONTS.body,
    lineHeight: 1.25,
    color: COLORS.black,
    fontFamily: 'Times New Roman',
  },
  educationItem: {
    marginBottom: SPACING.itemGap,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  educationDegree: {
    fontSize: FONTS.body,
    fontWeight: 'bold',
    color: COLORS.black,
    flex: 1,
    fontFamily: 'Times New Roman',
  },
  educationDates: {
    fontSize: FONTS.body,
    color: COLORS.black,
    fontFamily: 'Times New Roman',
  },
  educationInstitute: {
    fontSize: FONTS.body,
    color: COLORS.black,
    fontStyle: 'italic',
    marginBottom: 1,
    fontFamily: 'Times New Roman',
  },
  educationLocation: {
    fontSize: FONTS.body,
    color: COLORS.black,
    fontFamily: 'Times New Roman',
  },
  skillsContainer: {
    marginBottom: 6,
  },
  skillTitle: {
    fontSize: FONTS.body,
    fontWeight: 'bold',
    color: COLORS.black,
    fontFamily: 'Times New Roman',
  },
  skillDetails: {
    fontSize: FONTS.body,
    color: COLORS.black,
    fontFamily: 'Times New Roman',
    marginBottom: 4,
  },
  projectItem: {
    marginBottom: SPACING.itemGap,
  },
  projectName: {
    fontSize: FONTS.body,
    fontWeight: 'bold',
    color: COLORS.black,
    fontFamily: 'Times New Roman',
  },
  projectDescription: {
    fontSize: FONTS.body,
    lineHeight: 1.25,
    color: COLORS.black,
    fontFamily: 'Times New Roman',
  },
  projectTech: {
    fontSize: FONTS.body,
    color: COLORS.black,
    fontStyle: 'italic',
    fontFamily: 'Times New Roman',
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

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionLine} />
    </View>
  )
}

function Header({ basicInfo }: { basicInfo: CVData['basicInfo'] }) {
  return (
    <View style={styles.header}>
      {basicInfo.photo && (
        <View style={styles.photoContainer}>
          <Image src={basicInfo.photo} style={styles.photo} />
        </View>
      )}
      <View style={styles.headerText}>
        <Text style={styles.name}>{basicInfo.name}</Text>
        <Text style={styles.role}>{basicInfo.role}</Text>
        <View style={styles.contactRow}>
          {basicInfo.email && <Text style={styles.contactItem}>{basicInfo.email}</Text>}
          {basicInfo.phone && <Text style={styles.contactItem}>{basicInfo.phone}</Text>}
          {basicInfo.location && <Text style={styles.contactItem}>{basicInfo.location}</Text>}
        </View>
        <View style={styles.contactRow}>
          {basicInfo.website && <Text style={styles.contactItem}>{basicInfo.website}</Text>}
          {basicInfo.github && <Text style={styles.contactItem}>{basicInfo.github}</Text>}
          {basicInfo.linkedin && <Text style={styles.contactItem}>{basicInfo.linkedin}</Text>}
        </View>
      </View>
    </View>
  )
}

function SkillsSection({ skills, title }: { skills: CVData['skills']; title: string }) {
  if (skills.length === 0) return null
  
  return (
    <View style={styles.section}>
      <SectionHeader title={title} />
      {skills.map(skill => (
        <View key={skill.id} style={styles.skillsContainer}>
          <Text style={styles.skillTitle}>{skill.title}: <Text style={{ fontWeight: 'normal' }}>{skill.details}</Text></Text>
        </View>
      ))}
    </View>
  )
}

function SummarySection({ summary, title }: { summary: CVData['summary']; title: string }) {
  return (
    <View style={styles.section}>
      <SectionHeader title={title} />
      <Text style={styles.summaryText}>{summary.content}</Text>
    </View>
  )
}

function ExperienceSection({ experiences, title }: { experiences: CVData['experiences']; title: string }) {
  return (
    <View style={styles.section}>
      <SectionHeader title={title} />
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
      <SectionHeader title={title} />
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
      <SectionHeader title={title} />
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

export function AcademicoDocument({ data }: { data: CVData }) {
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

export const academicoTheme = {
  id: 'academico',
  name: 'Académico',
  Document: AcademicoDocument,
}
