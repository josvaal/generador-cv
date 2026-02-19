import { StyleSheet } from '@react-pdf/renderer';

/**
 * PDF Styles for Basic Theme
 * Modern two-column layout with sidebar
 */
export const basicPDFStyles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },

  // Left Sidebar - 32% width
  sidebar: {
    width: '32%',
    backgroundColor: '#2C3E50',
    padding: 30,
    color: '#ECF0F1',
  },

  // Main Content - 68% width
  mainContent: {
    width: '68%',
    padding: 30,
    backgroundColor: '#FFFFFF',
  },

  // Sidebar Photo
  photoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    objectFit: 'cover',
    borderWidth: 3,
    borderColor: '#ECF0F1',
  },

  // Sidebar Contact
  contactSection: {
    marginBottom: 30,
  },
  contactLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
    color: '#BDC3C7',
  },
  contactItem: {
    flexDirection: 'row',
    marginBottom: 8,
    fontSize: 9,
    color: '#ECF0F1',
    lineHeight: 1.4,
  },
  contactIcon: {
    width: 16,
    fontSize: 10,
    color: '#3498DB',
    marginRight: 8,
  },

  // Sidebar Skills (compact)
  sidebarSectionLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
    color: '#BDC3C7',
  },
  sidebarSkills: {
    marginBottom: 20,
  },
  sidebarSkillItem: {
    fontSize: 9,
    marginBottom: 6,
    color: '#ECF0F1',
  },
  sidebarSkillTag: {
    backgroundColor: '#34495E',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    fontSize: 8,
    marginRight: 4,
    marginBottom: 4,
  },

  // Header in Main Content
  header: {
    marginBottom: 25,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#3498DB',
    fontWeight: '600',
    marginBottom: 8,
  },
  location: {
    fontSize: 10,
    color: '#7F8C8D',
  },

  // Section Headers
  sectionHeader: {
    marginTop: 20,
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#3498DB',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },

  // Summary Section
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#34495E',
  },

  // Experience Section - Compact
  experience: {
    marginBottom: 18,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  experienceRole: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
  },
  experienceDates: {
    fontSize: 9,
    color: '#3498DB',
    fontWeight: '600',
    minWidth: 70,
    textAlign: 'right',
  },
  experienceCompany: {
    fontSize: 10,
    color: '#7F8C8D',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  achievement: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#34495E',
    marginBottom: 2,
    paddingLeft: 10,
  },

  // Education Section - Compact
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
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
  },
  educationDates: {
    fontSize: 9,
    color: '#3498DB',
    fontWeight: '600',
    minWidth: 70,
    textAlign: 'right',
  },
  educationInstitute: {
    fontSize: 10,
    color: '#7F8C8D',
    marginBottom: 2,
  },
  educationLocation: {
    fontSize: 9,
    color: '#95A5A6',
    fontStyle: 'italic',
  },

  // Skills Section in Main Content
  skillsContainer: {
    marginBottom: 15,
  },
  skillCategory: {
    marginBottom: 8,
  },
  skillTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  skillDetails: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#34495E',
  },

  // Projects Section
  project: {
    marginBottom: 12,
  },
  projectName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 3,
  },
  projectDescription: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#34495E',
    marginBottom: 3,
  },
  projectTechnologies: {
    fontSize: 8,
    color: '#7F8C8D',
  },
  projectUrl: {
    fontSize: 8,
    color: '#3498DB',
    marginBottom: 2,
  },
});

/**
 * CSS Styles for HTML Preview (Basic Theme)
 * Modern two-column layout
 */
export const basicHTMLStyles = `
* {
  box-sizing: border-box;
}

.basic-cv {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.5;
  color: #333;
  background: #fff;
  display: flex;
  flex-direction: row;
  width: 100%;
}

/* Sidebar - 32% width */
.basic-cv .sidebar {
  width: 32%;
  min-width: 32%;
  background: #2C3E50;
  padding: 30px 20px;
  color: #ECF0F1;
}

/* Main Content - 68% width */
.basic-cv .main-content {
  width: 68%;
  min-width: 68%;
  padding: 30px 25px;
  background: #FFFFFF;
}

/* Sidebar Photo */
.basic-cv .photo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}

.basic-cv .photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ECF0F1;
}

/* Sidebar Contact */
.basic-cv .contact-section {
  margin-bottom: 30px;
}

.basic-cv .contact-label {
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 12px;
  color: #BDC3C7;
}

.basic-cv .contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 9px;
  color: #ECF0F1;
  line-height: 1.4;
}

.basic-cv .contact-icon {
  color: #3498DB;
  margin-right: 10px;
  flex-shrink: 0;
}

/* Sidebar Skills */
.basic-cv .sidebar-section-label {
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 12px;
  color: #BDC3C7;
}

.basic-cv .sidebar-skills {
  margin-bottom: 20px;
}

.basic-cv .skill-group {
  margin-bottom: 12px;
}

.basic-cv .skill-group-title {
  font-size: 9px;
  font-weight: 600;
  color: #BDC3C7;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.basic-cv .skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.basic-cv .sidebar-skill-tag {
  display: inline-block;
  background: #34495E;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 8px;
  color: #ECF0F1;
}

/* Header in Main Content */
.basic-cv .header {
  margin-bottom: 25px;
}

.basic-cv .name {
  font-size: 32px;
  font-weight: bold;
  color: #2C3E50;
  margin-bottom: 4px;
  line-height: 1.2;
}

.basic-cv .role {
  font-size: 14px;
  color: #3498DB;
  font-weight: 600;
  margin-bottom: 8px;
}

.basic-cv .location {
  font-size: 10px;
  color: #7F8C8D;
}

/* Section Headers */
.basic-cv .section-header {
  margin-top: 20px;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 2px solid #3498DB;
}

.basic-cv .section-title {
  font-size: 14px;
  font-weight: bold;
  color: #2C3E50;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Summary Section */
.basic-cv .summary {
  font-size: 10px;
  line-height: 1.6;
  color: #34495E;
}

/* Experience Section - Compact */
.basic-cv .experience {
  margin-bottom: 18px;
}

.basic-cv .experience-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.basic-cv .experience-role {
  font-size: 12px;
  font-weight: bold;
  color: #2C3E50;
  flex: 1;
}

.basic-cv .experience-dates {
  font-size: 9px;
  color: #3498DB;
  font-weight: 600;
  min-width: 70px;
  text-align: right;
}

.basic-cv .experience-company {
  font-size: 10px;
  color: #7F8C8D;
  margin-bottom: 6px;
  font-style: italic;
}

.basic-cv .achievement {
  font-size: 9px;
  line-height: 1.5;
  color: #34495E;
  margin-bottom: 2px;
  padding-left: 10px;
  position: relative;
}

.basic-cv .achievement::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #3498DB;
}

/* Education Section - Compact */
.basic-cv .education {
  margin-bottom: 14px;
}

.basic-cv .education-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 3px;
}

.basic-cv .education-degree {
  font-size: 11px;
  font-weight: bold;
  color: #2C3E50;
  flex: 1;
}

.basic-cv .education-dates {
  font-size: 9px;
  color: #3498DB;
  font-weight: 600;
  min-width: 70px;
  text-align: right;
}

.basic-cv .education-institute {
  font-size: 10px;
  color: #7F8C8D;
  margin-bottom: 2px;
}

.basic-cv .education-location {
  font-size: 9px;
  color: #95A5A6;
  font-style: italic;
}

/* Skills Section in Main Content */
.basic-cv .skills-container {
  margin-bottom: 15px;
}

.basic-cv .skill-category {
  margin-bottom: 8px;
}

.basic-cv .skill-title {
  font-size: 10px;
  font-weight: bold;
  color: #2C3E50;
  margin-bottom: 4px;
}

.basic-cv .skill-details {
  font-size: 9px;
  line-height: 1.5;
  color: #34495E;
}

/* Projects Section */
.basic-cv .project {
  margin-bottom: 12px;
}

.basic-cv .project-name {
  font-size: 11px;
  font-weight: bold;
  color: #2C3E50;
  margin-bottom: 3px;
}

.basic-cv .project-description {
  font-size: 9px;
  line-height: 1.5;
  color: #34495E;
  margin-bottom: 3px;
}

.basic-cv .project-technologies {
  font-size: 8px;
  color: #7F8C8D;
}

.basic-cv .project-url {
  font-size: 8px;
  color: #3498DB;
  margin-bottom: 2px;
}

/* Links */
.basic-cv a {
  color: #3498DB;
  text-decoration: none;
}

.basic-cv a:hover {
  text-decoration: underline;
}

/* HTML tags styling */
.basic-cv strong {
  font-weight: bold;
}

.basic-cv em {
  font-style: italic;
}

.basic-cv u {
  text-decoration: underline;
}

.basic-cv p {
  margin: 0 0 4px 0;
}

.basic-cv p:last-child {
  margin-bottom: 0;
}
`;
