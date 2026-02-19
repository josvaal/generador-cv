export interface BasicInfo {
  name: string;
  role: string;
  location: string;
  email: string;
  website: string;
  phone: string;
  github: string;
  linkedin: string;
  photo?: string;
}

export interface Summary {
  content: string;
}

export type Achievement = string;

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  achievements: Achievement[];
}

export interface Education {
  id: string;
  degree: string;
  institute: string;
  location: string;
  startDate: string;
  endDate: string;
  current?: boolean;
}

export interface Skill {
  id: string;
  title: string;
  details: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
}

export interface SectionConfig {
  visibility: {
    basicInfo: boolean;
    summary: boolean;
    experiences: boolean;
    education: boolean;
    skills: boolean;
    projects: boolean;
  };
  titles: {
    summary: string;
    experiences: string;
    education: string;
    skills: string;
    projects: string;
  };
  order: Array<'summary' | 'experiences' | 'education' | 'skills' | 'projects'>;
}

export interface CVData {
  basicInfo: BasicInfo;
  summary: Summary;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  activeTheme: string;
  sectionConfig: SectionConfig;
}

export interface CVTheme {
  id: string;
  name: string;
  Document: React.FC<{ data: CVData }>;
}
