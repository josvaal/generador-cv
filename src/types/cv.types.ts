import { ReactElement } from 'react';

/**
 * Basic information for the CV
 */
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

/**
 * Summary section
 */
export interface Summary {
  content: string;
}

/**
 * Achievement entry (can contain HTML)
 */
export type Achievement = string;

/**
 * Work experience entry
 */
export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  achievements: Achievement[];
}

/**
 * Education entry
 */
export interface Education {
  id: string;
  degree: string;
  institute: string;
  location: string;
  startDate: string;
  endDate: string;
  current?: boolean;
}

/**
 * Skill category entry
 */
export interface Skill {
  id: string;
  title: string;
  details: string;
}

/**
 * Project entry
 */
export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
}

/**
 * Section configuration - controls visibility, titles and order
 */
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

/**
 * Complete CV data structure
 */
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

/**
 * Theme interface - defines what a theme must provide
 */
export interface CVTheme {
  id: string;
  name: string;
  HTMLPreview: React.FC<{ data: CVData }>;
  PDFDocument: React.FC<{ data: CVData }>;
}
