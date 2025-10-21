export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  current: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  startDate: string;
  endDate?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  issuer?: string;
}

export interface ResumeSection {
  id: string;
  type: 'personalInfo' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'achievements';
  title: string;
  visible: boolean;
  order: number;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  achievements: Achievement[];
  sections: ResumeSection[];
}

export interface ResumeTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    section: string;
    item: string;
  };
}

export interface ResumeTemplate {
  id: string;
  name: string;
  preview: string;
  description: string;
  layout: 'single-column' | 'two-column' | 'sidebar';
  category: 'professional' | 'creative' | 'minimal';
}

export interface AppSettings {
  currentTemplate: string;
  currentTheme: string;
  darkMode: boolean;
  autoSave: boolean;
  exportFormat: 'pdf' | 'docx';
}