'use client';

import React from 'react';
import { ResumeData, ResumeTheme } from '@/types/resume';
import { formatDate } from '@/utils/helpers';

interface TemplateProps {
  resumeData: ResumeData;
  theme?: ResumeTheme;
}

export function MinimalTemplate({ resumeData, theme }: TemplateProps) {
  const visibleSections = resumeData.sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order);

  const styles = {
    primary: theme?.colors.primary || '#374151',
    secondary: theme?.colors.secondary || '#6b7280',
    accent: theme?.colors.accent || '#111827',
    text: theme?.colors.text || '#1f2937',
    background: theme?.colors.background || '#ffffff',
    headingFont: theme?.fonts.heading || 'system-ui',
    bodyFont: theme?.fonts.body || 'system-ui',
  };

  return (
    <div className="p-8 max-w-4xl mx-auto" style={{ fontFamily: styles.bodyFont }}>
      {/* Minimal Header */}
      <header className="mb-8">
        <h1 
          className="text-3xl font-light mb-3"
          style={{ 
            color: styles.primary, 
            fontFamily: styles.headingFont,
            letterSpacing: '0.05em'
          }}
        >
          {resumeData.personalInfo.fullName}
        </h1>
        
        <div className="flex flex-wrap gap-4 text-sm" style={{ color: styles.secondary }}>
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>•</span>}
          {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span>•</span>}
          {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
          {resumeData.personalInfo.website && <span>•</span>}
          {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
        </div>
      </header>

      {/* Minimal Sections */}
      <div className="space-y-6">
        {visibleSections.map((section) => {
          switch (section.type) {
            case 'summary':
              return (
                <section key={section.id}>
                  <h2 
                    className="text-sm uppercase tracking-wide font-medium mb-3 pb-1 border-b"
                    style={{ 
                      color: styles.primary,
                      borderColor: styles.secondary + '40',
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
                <section key={section.id}>
                  <h2 
                    className="text-sm uppercase tracking-wide font-medium mb-4 pb-1 border-b"
                    style={{ 
                      color: styles.primary,
                      borderColor: styles.secondary + '40',
                      fontFamily: styles.headingFont
                    }}
                  >
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-medium" style={{ color: styles.text }}>
                            {exp.position}, {exp.company}
                          </h3>
                          <span className="text-sm" style={{ color: styles.secondary }}>
                            {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                          </span>
                        </div>
                        <div className="text-sm" style={{ color: styles.text, lineHeight: '1.5' }}>
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
                <section key={section.id}>
                  <h2 
                    className="text-sm uppercase tracking-wide font-medium mb-4 pb-1 border-b"
                    style={{ 
                      color: styles.primary,
                      borderColor: styles.secondary + '40',
                      fontFamily: styles.headingFont
                    }}
                  >
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-baseline">
                          <div>
                            <h3 className="font-medium" style={{ color: styles.text }}>
                              {edu.degree} in {edu.field}
                            </h3>
                            <p className="text-sm" style={{ color: styles.secondary }}>
                              {edu.institution}
                              {edu.gpa && ` • GPA: ${edu.gpa}`}
                            </p>
                          </div>
                          <span className="text-sm" style={{ color: styles.secondary }}>
                            {formatDate(edu.startDate)} – {edu.current ? 'Present' : formatDate(edu.endDate)}
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
                <section key={section.id}>
                  <h2 
                    className="text-sm uppercase tracking-wide font-medium mb-4 pb-1 border-b"
                    style={{ 
                      color: styles.primary,
                      borderColor: styles.secondary + '40',
                      fontFamily: styles.headingFont
                    }}
                  >
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {Object.entries(groupedSkills).map(([category, skills]) => (
                      <div key={category}>
                        <h4 className="font-medium text-sm mb-1" style={{ color: styles.text }}>
                          {category}
                        </h4>
                        <p className="text-sm" style={{ color: styles.secondary, lineHeight: '1.5' }}>
                          {skills.map(skill => `${skill.name} (${skill.level})`).join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'projects':
              return (
                <section key={section.id}>
                  <h2 
                    className="text-sm uppercase tracking-wide font-medium mb-4 pb-1 border-b"
                    style={{ 
                      color: styles.primary,
                      borderColor: styles.secondary + '40',
                      fontFamily: styles.headingFont
                    }}
                  >
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {resumeData.projects.map((project) => (
                      <div key={project.id}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-medium" style={{ color: styles.text }}>
                            {project.name}
                          </h3>
                          <span className="text-sm" style={{ color: styles.secondary }}>
                            {formatDate(project.startDate)} – {project.endDate ? formatDate(project.endDate) : 'Ongoing'}
                          </span>
                        </div>
                        <p className="text-sm mb-2" style={{ color: styles.text }}>
                          {project.description}
                        </p>
                        {project.technologies.length > 0 && (
                          <p className="text-sm" style={{ color: styles.secondary }}>
                            {project.technologies.join(', ')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'achievements':
              return (
                <section key={section.id}>
                  <h2 
                    className="text-sm uppercase tracking-wide font-medium mb-4 pb-1 border-b"
                    style={{ 
                      color: styles.primary,
                      borderColor: styles.secondary + '40',
                      fontFamily: styles.headingFont
                    }}
                  >
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {resumeData.achievements.map((achievement) => (
                      <div key={achievement.id}>
                        <div className="flex justify-between items-baseline">
                          <div>
                            <h3 className="font-medium" style={{ color: styles.text }}>
                              {achievement.title}
                            </h3>
                            {achievement.issuer && (
                              <p className="text-sm" style={{ color: styles.secondary }}>
                                {achievement.issuer}
                              </p>
                            )}
                          </div>
                          <span className="text-sm" style={{ color: styles.secondary }}>
                            {formatDate(achievement.date)}
                          </span>
                        </div>
                        {achievement.description && (
                          <p className="text-sm" style={{ color: styles.text }}>
                            {achievement.description}
                          </p>
                        )}
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
    </div>
  );
}