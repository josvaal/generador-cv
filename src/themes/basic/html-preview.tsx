import { FormattedText } from '../../components/preview/shared/FormattedText';
import type { CVData } from '../../types/cv.types';
import { basicHTMLStyles } from './styles';

/**
 * Basic Theme - HTML Preview Component
 * Renders the CV as HTML for web preview
 */
export function BasicHTMLPreview({ data }: { data: CVData }) {
  const { basicInfo, summary, experiences, education, skills, projects, sectionConfig } = data;

  return (
    <div className="basic-cv" style={{ all: 'initial', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
      <style>{basicHTMLStyles}</style>

      <div className="header">
        <div className="name">{basicInfo.name}</div>
        <div className="role">{basicInfo.role}</div>
        <div className="contact-row">
          {basicInfo.email && <span className="contact-item">{basicInfo.email}</span>}
          {basicInfo.phone && <span className="contact-item">{basicInfo.phone}</span>}
          {basicInfo.location && <span className="contact-item">{basicInfo.location}</span>}
          {basicInfo.website && <span className="contact-item">{basicInfo.website}</span>}
          {basicInfo.github && <span className="contact-item">{basicInfo.github}</span>}
          {basicInfo.linkedin && <span className="contact-item">{basicInfo.linkedin}</span>}
        </div>
        {basicInfo.photo && (
          <div className="photo-container">
            <img src={basicInfo.photo} alt={basicInfo.name} className="photo" />
          </div>
        )}
      </div>

      {/* Render sections in configured order */}
      {sectionConfig.order.map((section) => {
        if (!sectionConfig.visibility[section]) return null;

        switch (section) {
          case 'summary':
            return (
              <div key="summary" style={{ all: 'initial' }}>
                <div className="section-header">
                  <div className="section-title">{sectionConfig.titles.summary}</div>
                </div>
                <div className="summary">{summary.content}</div>
              </div>
            );

          case 'experiences':
            return (
              <div key="experiences" style={{ all: 'initial' }}>
                <div className="section-header">
                  <div className="section-title">{sectionConfig.titles.experiences}</div>
                </div>
                {experiences.map((exp) => (
                  <div key={exp.id} className="experience" style={{ all: 'initial' }}>
                    <div className="experience-header" style={{ all: 'initial' }}>
                      <div className="experience-role" style={{ all: 'initial' }}>{exp.role}</div>
                      <div className="experience-dates" style={{ all: 'initial' }}>
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                      </div>
                    </div>
                    <div className="experience-company">{exp.company}</div>
                    {exp.achievements && exp.achievements.map((achievement, idx) => (
                      <div key={idx} className="achievement" style={{ all: 'initial' }}>
                        <FormattedText html={achievement} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            );

          case 'education':
            return (
              <div key="education" style={{ all: 'initial' }}>
                <div className="section-header">
                  <div className="section-title">{sectionConfig.titles.education}</div>
                </div>
                {education.map((edu) => (
                  <div key={edu.id} className="education" style={{ all: 'initial' }}>
                    <div className="education-header" style={{ all: 'initial' }}>
                      <div className="education-degree" style={{ all: 'initial' }}>{edu.degree}</div>
                      <div className="education-dates" style={{ all: 'initial' }}>
                        {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                      </div>
                    </div>
                    <div className="education-institute">{edu.institute}</div>
                    {edu.location && <div className="education-location">{edu.location}</div>}
                  </div>
                ))}
              </div>
            );

          case 'skills':
            return (
              <div key="skills" style={{ all: 'initial' }}>
                <div className="section-header">
                  <div className="section-title">{sectionConfig.titles.skills}</div>
                </div>
                <div className="skills-container">
                  {skills.map((skill) => (
                    <div key={skill.id} className="skill-category" style={{ all: 'initial' }}>
                      <div className="skill-title">{skill.title}</div>
                      <div className="skill-details">{skill.details}</div>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'projects':
            if (projects.length === 0) return null;
            return (
              <div key="projects" style={{ all: 'initial' }}>
                <div className="section-header">
                  <div className="section-title">{sectionConfig.titles.projects}</div>
                </div>
                {projects.map((project) => (
                  <div key={project.id} className="project" style={{ all: 'initial' }}>
                    <div className="project-name">{project.name}</div>
                    {project.url && <div className="project-url">{project.url}</div>}
                    {project.github && <div className="project-url">{project.github}</div>}
                    {project.description && <div className="project-description">{project.description}</div>}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="project-technologies">
                        Tech: {project.technologies.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

/**
 * Format date range for display
 */
function formatDateRange(startDate: string, endDate: string, current?: boolean): string {
  if (!startDate) return '';
  const start = formatMonthYear(startDate);
  const end = current ? 'Present' : formatMonthYear(endDate);
  return `${start} - ${end}`;
}

/**
 * Format date string from YYYY-MM to Month YYYY
 */
function formatMonthYear(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  if (!year || !month) return dateStr;

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthIndex = parseInt(month, 10) - 1;
  const monthName = months[monthIndex] || month;

  return `${monthName} ${year}`;
}
