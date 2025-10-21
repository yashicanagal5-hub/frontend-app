'use client';

import React from 'react';
import { ResumeData, ResumeTheme } from '@/types/resume';
import { formatDate } from '@/utils/helpers';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
  theme?: ResumeTheme;
}

export function ProfessionalTemplate({ resumeData, theme }: TemplateProps) {
  const visibleSections = resumeData.sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order);

  const styles = {
    primary: theme?.colors.primary || '#2563eb',
    secondary: theme?.colors.secondary || '#64748b',
    accent: theme?.colors.accent || '#0ea5e9',
    text: theme?.colors.text || '#1e293b',
    background: theme?.colors.background || '#ffffff',
    headingFont: theme?.fonts.heading || 'Inter',
    bodyFont: theme?.fonts.body || 'Inter',
    sectionSpacing: theme?.spacing.section || '1.5rem',
    itemSpacing: theme?.spacing.item || '1rem',
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <header className="text-center border-b pb-6" style={{ borderColor: styles.primary }}>
        <h1 
          className="text-3xl font-bold mb-2"
          style={{ 
            color: styles.primary, 
            fontFamily: styles.headingFont 
          }}
        >
          {resumeData.personalInfo.fullName}
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm" style={{ color: styles.secondary }}>
          {resumeData.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{resumeData.personalInfo.email}</span>
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{resumeData.personalInfo.phone}</span>
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{resumeData.personalInfo.location}</span>
            </div>
          )}
        </div>
        
        {(resumeData.personalInfo.website || resumeData.personalInfo.linkedin || resumeData.personalInfo.github) && (
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm mt-2" style={{ color: styles.secondary }}>
            {resumeData.personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{resumeData.personalInfo.website}</span>
              </div>
            )}
            {resumeData.personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" />
                <span>{resumeData.personalInfo.linkedin}</span>
              </div>
            )}
            {resumeData.personalInfo.github && (
              <div className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                <span>{resumeData.personalInfo.github}</span>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Sections */}
      {visibleSections.map((section) => {
        switch (section.type) {
          case 'summary':
            return (
              <section key={section.id} className="resume-section">
                <h2 
                  className="text-lg font-semibold mb-3 pb-1 border-b-2"
                  style={{ 
                    color: styles.primary,
                    borderColor: styles.primary,
                    fontFamily: styles.headingFont
                  }}
                >
                  {section.title}
                </h2>
                <p style={{ color: styles.text, lineHeight: '1.6' }}>
                  {resumeData.summary}
                </p>
              </section>
            );

          case 'experience':
            return (
              <section key={section.id} className="resume-section">
                <h2 
                  className="text-lg font-semibold mb-3 pb-1 border-b-2"
                  style={{ 
                    color: styles.primary,
                    borderColor: styles.primary,
                    fontFamily: styles.headingFont
                  }}
                >
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="resume-item">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-semibold" style={{ color: styles.text }}>
                            {exp.position}
                          </h3>
                          <p className="font-medium" style={{ color: styles.accent }}>
                            {exp.company}
                            {exp.location && <span className="text-sm" style={{ color: styles.secondary }}> • {exp.location}</span>}
                          </p>
                        </div>
                        <span className="text-sm whitespace-nowrap" style={{ color: styles.secondary }}>
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                      <div className="prose prose-sm" style={{ color: styles.text }}>
                        {exp.description.split('\\n').map((line, index) => (
                          <p key={index} className="mb-1">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'education':
            return (
              <section key={section.id} className="resume-section">
                <h2 
                  className="text-lg font-semibold mb-3 pb-1 border-b-2"
                  style={{ 
                    color: styles.primary,
                    borderColor: styles.primary,
                    fontFamily: styles.headingFont
                  }}
                >
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="resume-item">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold" style={{ color: styles.text }}>
                            {edu.degree} in {edu.field}
                          </h3>
                          <p style={{ color: styles.accent }}>{edu.institution}</p>
                          {edu.gpa && (
                            <p className="text-sm" style={{ color: styles.secondary }}>
                              GPA: {edu.gpa}
                            </p>
                          )}
                        </div>
                        <span className="text-sm whitespace-nowrap" style={{ color: styles.secondary }}>
                          {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'skills':
            const groupedSkills = resumeData.skills.reduce((acc, skill) => {
              const category = skill.category || 'Other';
              if (!acc[category]) acc[category] = [];
              acc[category].push(skill);
              return acc;
            }, {} as Record<string, typeof resumeData.skills>);

            return (
              <section key={section.id} className="resume-section">
                <h2 
                  className="text-lg font-semibold mb-3 pb-1 border-b-2"
                  style={{ 
                    color: styles.primary,
                    borderColor: styles.primary,
                    fontFamily: styles.headingFont
                  }}
                >
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {Object.entries(groupedSkills).map(([category, skills]) => (
                    <div key={category}>
                      <h4 className="font-medium mb-2" style={{ color: styles.accent }}>
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <span
                            key={skill.id}
                            className="px-2 py-1 text-sm rounded"
                            style={{ 
                              backgroundColor: `${styles.primary}10`,
                              color: styles.primary,
                              border: `1px solid ${styles.primary}30`
                            }}
                          >
                            {skill.name} ({skill.level})
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'projects':
            return (
              <section key={section.id} className="resume-section">
                <h2 
                  className="text-lg font-semibold mb-3 pb-1 border-b-2"
                  style={{ 
                    color: styles.primary,
                    borderColor: styles.primary,
                    fontFamily: styles.headingFont
                  }}
                >
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {resumeData.projects.map((project) => (
                    <div key={project.id} className="resume-item">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold" style={{ color: styles.text }}>
                          {project.name}
                        </h3>
                        <span className="text-sm whitespace-nowrap" style={{ color: styles.secondary }}>
                          {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Ongoing'}
                        </span>
                      </div>
                      <p className="mb-2" style={{ color: styles.text }}>
                        {project.description}
                      </p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs rounded"
                              style={{ 
                                backgroundColor: `${styles.secondary}20`,
                                color: styles.secondary
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {(project.url || project.github) && (
                        <div className="text-sm" style={{ color: styles.accent }}>
                          {project.url && <span>Demo: {project.url}</span>}
                          {project.url && project.github && ' • '}
                          {project.github && <span>Code: {project.github}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'achievements':
            return (
              <section key={section.id} className="resume-section">
                <h2 
                  className="text-lg font-semibold mb-3 pb-1 border-b-2"
                  style={{ 
                    color: styles.primary,
                    borderColor: styles.primary,
                    fontFamily: styles.headingFont
                  }}
                >
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {resumeData.achievements.map((achievement) => (
                    <div key={achievement.id} className="resume-item">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold" style={{ color: styles.text }}>
                            {achievement.title}
                          </h3>
                          {achievement.issuer && (
                            <p style={{ color: styles.accent }}>{achievement.issuer}</p>
                          )}
                          <p className="text-sm" style={{ color: styles.text }}>
                            {achievement.description}
                          </p>
                        </div>
                        <span className="text-sm whitespace-nowrap" style={{ color: styles.secondary }}>
                          {formatDate(achievement.date)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}