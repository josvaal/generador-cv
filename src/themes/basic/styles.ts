import { StyleSheet } from '@react-pdf/renderer';

/**
 * PDF Styles for Basic Theme
 * Used by @react-pdf/renderer components
 */
export const basicPDFStyles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  container: {
    width: '100%',
  },

  // Basic Info Section
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  role: {
    fontSize: 18,
    color: '#555555',
    marginBottom: 15,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    fontSize: 10,
    color: '#666666',
  },
  contactItem: {
    marginRight: 15,
  },

  // Photo
  photoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    objectFit: 'cover',
  },

  // Section Headers
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#333333',
    paddingBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Summary Section
  summary: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#333333',
  },

  // Experience Section
  experience: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  experienceRole: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
  },
  experienceDates: {
    fontSize: 11,
    color: '#666666',
    minWidth: 80,
    textAlign: 'right',
  },
  experienceCompany: {
    fontSize: 12,
    color: '#444444',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  achievement: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333333',
    marginBottom: 3,
  },

  // Education Section
  education: {
    marginBottom: 12,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  educationDegree: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
  },
  educationDates: {
    fontSize: 11,
    color: '#666666',
    minWidth: 80,
    textAlign: 'right',
  },
  educationInstitute: {
    fontSize: 12,
    color: '#444444',
    marginBottom: 2,
  },
  educationLocation: {
    fontSize: 10,
    color: '#666666',
    fontStyle: 'italic',
  },

  // Skills Section
  skillsContainer: {
    marginBottom: 15,
  },
  skillCategory: {
    marginBottom: 10,
  },
  skillTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  skillDetails: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#333333',
  },

  // Projects Section
  project: {
    marginBottom: 12,
  },
  projectName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 3,
  },
  projectDescription: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333333',
    marginBottom: 3,
  },
  projectTechnologies: {
    fontSize: 10,
    color: '#666666',
    fontStyle: 'italic',
  },
  projectUrl: {
    fontSize: 9,
    color: '#0066cc',
    marginBottom: 2,
  },
});

/**
 * CSS Styles for HTML Preview (Basic Theme)
 */
export const basicHTMLStyles = `
.basic-cv {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background: #fff;
  padding: 40px;
  max-width: 210mm;
  margin: 0 auto;
}

.basic-cv .header {
  margin-bottom: 20px;
}

.basic-cv .name {
  font-size: 28px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 5px;
}

.basic-cv .role {
  font-size: 18px;
  color: #555;
  margin-bottom: 15px;
}

.basic-cv .contact-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 10px;
  color: #666;
}

.basic-cv .contact-item {
  margin-right: 15px;
}

.basic-cv .photo-container {
  margin-bottom: 20px;
  text-align: center;
}

.basic-cv .photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.basic-cv .section-header {
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: 2px solid #333;
  padding-bottom: 5px;
}

.basic-cv .section-title {
  font-size: 16px;
  font-weight: bold;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.basic-cv .summary {
  font-size: 11px;
  line-height: 1.6;
  color: #333;
}

.basic-cv .experience {
  margin-bottom: 15px;
}

.basic-cv .experience-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
}

.basic-cv .experience-role {
  font-size: 13px;
  font-weight: bold;
  color: #1a1a1a;
  flex: 1;
}

.basic-cv .experience-dates {
  font-size: 11px;
  color: #666;
  min-width: 80px;
  text-align: right;
}

.basic-cv .experience-company {
  font-size: 12px;
  color: #444;
  font-style: italic;
  margin-bottom: 5px;
}

.basic-cv .achievement {
  font-size: 10px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 3px;
}

.basic-cv .education {
  margin-bottom: 12px;
}

.basic-cv .education-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
}

.basic-cv .education-degree {
  font-size: 13px;
  font-weight: bold;
  color: #1a1a1a;
  flex: 1;
}

.basic-cv .education-dates {
  font-size: 11px;
  color: #666;
  min-width: 80px;
  text-align: right;
}

.basic-cv .education-institute {
  font-size: 12px;
  color: #444;
  margin-bottom: 2px;
}

.basic-cv .education-location {
  font-size: 10px;
  color: #666;
  font-style: italic;
}

.basic-cv .skills-container {
  margin-bottom: 15px;
}

.basic-cv .skill-category {
  margin-bottom: 10px;
}

.basic-cv .skill-title {
  font-size: 12px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.basic-cv .skill-details {
  font-size: 11px;
  line-height: 1.5;
  color: #333;
}

.basic-cv .project {
  margin-bottom: 12px;
}

.basic-cv .project-name {
  font-size: 13px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 3px;
}

.basic-cv .project-description {
  font-size: 10px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 3px;
}

.basic-cv .project-technologies {
  font-size: 10px;
  color: #666;
  font-style: italic;
}

.basic-cv .project-url {
  font-size: 9px;
  color: #0066cc;
  margin-bottom: 2px;
}

.basic-cv a {
  color: #0066cc;
  text-decoration: none;
}

.basic-cv a:hover {
  text-decoration: underline;
}

.basic-cv strong {
  font-weight: bold;
}

.basic-cv em {
  font-style: italic;
}

.basic-cv u {
  text-decoration: underline;
}
`;
