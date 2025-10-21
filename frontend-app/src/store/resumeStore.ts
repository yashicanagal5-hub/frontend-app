import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, ResumeTheme, ResumeTemplate, AppSettings, ResumeSection } from '@/types/resume';

// Default data
const defaultPersonalInfo = {
  fullName: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  website: 'https://johndoe.dev',
  linkedin: 'linkedin.com/in/johndoe',
  github: 'github.com/johndoe',
};

const defaultSections: ResumeSection[] = [
  { id: 'personalInfo', type: 'personalInfo', title: 'Personal Information', visible: true, order: 0 },
  { id: 'summary', type: 'summary', title: 'Professional Summary', visible: true, order: 1 },
  { id: 'experience', type: 'experience', title: 'Work Experience', visible: true, order: 2 },
  { id: 'education', type: 'education', title: 'Education', visible: true, order: 3 },
  { id: 'skills', type: 'skills', title: 'Skills', visible: true, order: 4 },
  { id: 'projects', type: 'projects', title: 'Projects', visible: true, order: 5 },
  { id: 'achievements', type: 'achievements', title: 'Achievements', visible: false, order: 6 },
];

const defaultResumeData: ResumeData = {
  personalInfo: defaultPersonalInfo,
  summary: 'Experienced software developer with expertise in React, Node.js, and cloud technologies. Passionate about creating scalable web applications and leading development teams.',
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Frontend Developer',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: '• Led development of React-based dashboard serving 10,000+ users\\n• Improved application performance by 40% through optimization\\n• Mentored junior developers and established coding standards',
      location: 'New York, NY',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: '2020-03',
      endDate: '2021-12',
      current: false,
      description: '• Built and maintained RESTful APIs using Node.js and Express\\n• Developed responsive web applications with React and TypeScript\\n• Collaborated with design team to implement pixel-perfect UIs',
      location: 'San Francisco, CA',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2016-09',
      endDate: '2020-05',
      gpa: '3.8',
      current: false,
    },
  ],
  skills: [
    { id: '1', name: 'React', level: 'Expert', category: 'Frontend' },
    { id: '2', name: 'TypeScript', level: 'Advanced', category: 'Programming' },
    { id: '3', name: 'Node.js', level: 'Advanced', category: 'Backend' },
    { id: '4', name: 'Python', level: 'Intermediate', category: 'Programming' },
    { id: '5', name: 'AWS', level: 'Intermediate', category: 'Cloud' },
  ],
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with React frontend and Node.js backend, supporting 1000+ concurrent users.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      url: 'https://demo-ecommerce.com',
      github: 'https://github.com/johndoe/ecommerce',
      startDate: '2023-01',
      endDate: '2023-06',
    },
  ],
  achievements: [
    {
      id: '1',
      title: 'AWS Certified Developer',
      description: 'Amazon Web Services Certified Developer - Associate',
      date: '2023-03',
      issuer: 'Amazon Web Services',
    },
  ],
  sections: defaultSections,
};

const defaultThemes: ResumeTheme[] = [
  {
    id: 'professional',
    name: 'Professional',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#0ea5e9',
      text: '#1e293b',
      background: '#ffffff',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    spacing: {
      section: '1.5rem',
      item: '1rem',
    },
  },
  {
    id: 'creative',
    name: 'Creative',
    colors: {
      primary: '#7c3aed',
      secondary: '#a855f7',
      accent: '#ec4899',
      text: '#374151',
      background: '#ffffff',
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter',
    },
    spacing: {
      section: '2rem',
      item: '1.25rem',
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    colors: {
      primary: '#374151',
      secondary: '#6b7280',
      accent: '#111827',
      text: '#1f2937',
      background: '#ffffff',
    },
    fonts: {
      heading: 'system-ui',
      body: 'system-ui',
    },
    spacing: {
      section: '1.25rem',
      item: '0.75rem',
    },
  },
];

const defaultTemplates: ResumeTemplate[] = [
  {
    id: 'professional',
    name: 'Professional',
    preview: '/templates/professional.png',
    description: 'Clean, traditional layout perfect for corporate roles',
    layout: 'single-column',
    category: 'professional',
  },
  {
    id: 'modern',
    name: 'Modern',
    preview: '/templates/modern.png',
    description: 'Contemporary design with sidebar for skills and contact',
    layout: 'two-column',
    category: 'professional',
  },
  {
    id: 'creative',
    name: 'Creative',
    preview: '/templates/creative.png',
    description: 'Bold design for creative professionals',
    layout: 'sidebar',
    category: 'creative',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    preview: '/templates/minimal.png',
    description: 'Simple, clean design focusing on content',
    layout: 'single-column',
    category: 'minimal',
  },
];

interface ResumeStore {
  // Data
  resumeData: ResumeData;
  themes: ResumeTheme[];
  templates: ResumeTemplate[];
  settings: AppSettings;
  
  // Actions
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, experience: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, education: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, skill: Partial<ResumeData['skills'][0]>) => void;
  removeSkill: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, project: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  addAchievement: () => void;
  updateAchievement: (id: string, achievement: Partial<ResumeData['achievements'][0]>) => void;
  removeAchievement: (id: string) => void;
  reorderSections: (sections: ResumeSection[]) => void;
  toggleSectionVisibility: (sectionId: string) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetResume: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resumeData: defaultResumeData,
      themes: defaultThemes,
      templates: defaultTemplates,
      settings: {
        currentTemplate: 'professional',
        currentTheme: 'professional',
        darkMode: false,
        autoSave: true,
        exportFormat: 'pdf',
      },

      updatePersonalInfo: (info) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: { ...state.resumeData.personalInfo, ...info },
          },
        })),

      updateSummary: (summary) =>
        set((state) => ({
          resumeData: { ...state.resumeData, summary },
        })),

      addExperience: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [
              ...state.resumeData.experience,
              {
                id: generateId(),
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
                location: '',
              },
            ],
          },
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((exp) => exp.id !== id),
          },
        })),

      addEducation: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [
              ...state.resumeData.education,
              {
                id: generateId(),
                institution: '',
                degree: '',
                field: '',
                startDate: '',
                endDate: '',
                gpa: '',
                current: false,
              },
            ],
          },
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id),
          },
        })),

      addSkill: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: [
              ...state.resumeData.skills,
              {
                id: generateId(),
                name: '',
                level: 'Beginner',
                category: '',
              },
            ],
          },
        })),

      updateSkill: (id, skill) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.map((s) =>
              s.id === id ? { ...s, ...skill } : s
            ),
          },
        })),

      removeSkill: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((skill) => skill.id !== id),
          },
        })),

      addProject: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: [
              ...state.resumeData.projects,
              {
                id: generateId(),
                name: '',
                description: '',
                technologies: [],
                url: '',
                github: '',
                startDate: '',
                endDate: '',
              },
            ],
          },
        })),

      updateProject: (id, project) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.map((proj) =>
              proj.id === id ? { ...proj, ...project } : proj
            ),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.filter((proj) => proj.id !== id),
          },
        })),

      addAchievement: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            achievements: [
              ...state.resumeData.achievements,
              {
                id: generateId(),
                title: '',
                description: '',
                date: '',
                issuer: '',
              },
            ],
          },
        })),

      updateAchievement: (id, achievement) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            achievements: state.resumeData.achievements.map((ach) =>
              ach.id === id ? { ...ach, ...achievement } : ach
            ),
          },
        })),

      removeAchievement: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            achievements: state.resumeData.achievements.filter((ach) => ach.id !== id),
          },
        })),

      reorderSections: (sections) =>
        set((state) => ({
          resumeData: { ...state.resumeData, sections },
        })),

      toggleSectionVisibility: (sectionId) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            sections: state.resumeData.sections.map((section) =>
              section.id === sectionId
                ? { ...section, visible: !section.visible }
                : section
            ),
          },
        })),

      updateSettings: (settings) =>
        set((state) => ({
          settings: { ...state.settings, ...settings },
        })),

      resetResume: () =>
        set(() => ({
          resumeData: defaultResumeData,
          settings: {
            currentTemplate: 'professional',
            currentTheme: 'professional',
            darkMode: false,
            autoSave: true,
            exportFormat: 'pdf',
          },
        })),
    }),
    {
      name: 'resume-builder-storage',
    }
  )
);