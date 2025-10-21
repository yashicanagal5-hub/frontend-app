'use client';

import React from 'react';
import { ResumeData, ResumeTheme } from '@/types/resume';
import { formatDate } from '@/utils/helpers';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
  theme?: ResumeTheme;
}

export function ModernTemplate({ resumeData, theme }: TemplateProps) {
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
  };

  const sidebarSections = visibleSections.filter(s => 
    ['personalInfo', 'skills', 'achievements'].includes(s.type)
  );
  const mainSections = visibleSections.filter(s => 
    !['personalInfo', 'skills', 'achievements'].includes(s.type)
  );

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div 
        className="w-1/3 p-6 text-white"
        style={{ backgroundColor: styles.primary }}
      >
        {/* Personal Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: styles.headingFont }}>
            {resumeData.personalInfo.fullName}
          </h1>
          
          <div className="space-y-2 text-sm opacity-90">
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
            {resumeData.personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="break-all">{resumeData.personalInfo.website}</span>
              </div>
            )}
            {resumeData.personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <span className="break-all">{resumeData.personalInfo.linkedin}</span>
              </div>
            )}
            {resumeData.personalInfo.github && (
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                <span className="break-all">{resumeData.personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {visibleSections.find(s => s.type === 'skills') && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: styles.headingFont }}>
              Skills
            </h2>
            <div className="space-y-3">
              {Object.entries(
                resumeData.skills.reduce((acc, skill) => {
                  const category = skill.category || 'Other';
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(skill);
                  return acc;
                }, {} as Record<string, typeof resumeData.skills>)
              ).map(([category, skills]) => (
                <div key={category}>
                  <h4 className="font-medium text-sm mb-1 opacity-90">{category}</h4>
                  <div className="space-y-1">
                    {skills.map((skill) => (
                      <div key={skill.id} className="text-sm">
                        {skill.name} ({skill.level})
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {visibleSections.find(s => s.type === 'achievements') && resumeData.achievements.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: styles.headingFont }}>
              Achievements
            </h2>
            <div className="space-y-3">
              {resumeData.achievements.map((achievement) => (
                <div key={achievement.id} className="text-sm">
                  <div className="font-medium">{achievement.title}</div>
                  {achievement.issuer && (
                    <div className="opacity-80">{achievement.issuer}</div>
                  )}
                  <div className="opacity-70">{formatDate(achievement.date)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {mainSections.map((section) => {
          switch (section.type) {
            case 'summary':
              return (
                <section key={section.id} className="mb-6">
                  <h2 
                    className="text-xl font-bold mb-3"
                    style={{ color: styles.primary, fontFamily: styles.headingFont }}
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
                <section key={section.id} className="mb-6">
                  <h2 
                    className="text-xl font-bold mb-4"
                    style={{ color: styles.primary, fontFamily: styles.headingFont }}
                  >
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-semibold" style={{ color: styles.text }}>
                              {exp.position}
                            </h3>
                            <p style={{ color: styles.accent }}>{exp.company}</p>
                          </div>
                          <span className="text-sm" style={{ color: styles.secondary }}>
                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                          </span>
                        </div>
                        <div style={{ color: styles.text }}>
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
                <section key={section.id} className="mb-6">
                  <h2 
                    className="text-xl font-bold mb-4"
                    style={{ color: styles.primary, fontFamily: styles.headingFont }}
                  >
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id}>
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
                          <span className="text-sm" style={{ color: styles.secondary }}>
                            {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'projects':
              return (
                <section key={section.id} className="mb-6">
                  <h2 
                    className="text-xl font-bold mb-4"
                    style={{ color: styles.primary, fontFamily: styles.headingFont }}
                  >
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {resumeData.projects.map((project) => (
                      <div key={project.id}>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold" style={{ color: styles.text }}>
                            {project.name}
                          </h3>
                          <span className="text-sm" style={{ color: styles.secondary }}>
                            {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Ongoing'}
                          </span>
                        </div>
                        <p className="mb-2" style={{ color: styles.text }}>
                          {project.description}
                        </p>
                        {project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1">
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