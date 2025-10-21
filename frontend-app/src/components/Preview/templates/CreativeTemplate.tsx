'use client';

import React from 'react';
import { ResumeData, ResumeTheme } from '@/types/resume';
import { formatDate } from '@/utils/helpers';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
  theme?: ResumeTheme;
}

export function CreativeTemplate({ resumeData, theme }: TemplateProps) {
  const visibleSections = resumeData.sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order);

  const styles = {
    primary: theme?.colors.primary || '#7c3aed',
    secondary: theme?.colors.secondary || '#a855f7',
    accent: theme?.colors.accent || '#ec4899',
    text: theme?.colors.text || '#374151',
    background: theme?.colors.background || '#ffffff',
    headingFont: theme?.fonts.heading || 'Poppins',
    bodyFont: theme?.fonts.body || 'Inter',
  };

  return (
    <div className="p-8">
      {/* Creative Header */}
      <header className="relative mb-8">
        <div 
          className="absolute inset-0 rounded-2xl opacity-10"
          style={{ 
            background: `linear-gradient(135deg, ${styles.primary} 0%, ${styles.accent} 100%)` 
          }}
        />
        <div className="relative p-6">
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ 
              color: styles.primary, 
              fontFamily: styles.headingFont 
            }}
          >
            {resumeData.personalInfo.fullName}
          </h1>
          
          <div className="grid grid-cols-2 gap-4 text-sm mt-4">
            <div className="space-y-2">
              {resumeData.personalInfo.email && (
                <div className="flex items-center gap-2" style={{ color: styles.text }}>
                  <div 
                    className="p-1 rounded"
                    style={{ backgroundColor: `${styles.primary}20` }}
                  >
                    <Mail className="h-4 w-4" style={{ color: styles.primary }} />
                  </div>
                  <span>{resumeData.personalInfo.email}</span>
                </div>
              )}
              {resumeData.personalInfo.phone && (
                <div className="flex items-center gap-2" style={{ color: styles.text }}>
                  <div 
                    className="p-1 rounded"
                    style={{ backgroundColor: `${styles.primary}20` }}
                  >
                    <Phone className="h-4 w-4" style={{ color: styles.primary }} />
                  </div>
                  <span>{resumeData.personalInfo.phone}</span>
                </div>
              )}
              {resumeData.personalInfo.location && (
                <div className="flex items-center gap-2" style={{ color: styles.text }}>
                  <div 
                    className="p-1 rounded"
                    style={{ backgroundColor: `${styles.primary}20` }}
                  >
                    <MapPin className="h-4 w-4" style={{ color: styles.primary }} />
                  </div>
                  <span>{resumeData.personalInfo.location}</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              {resumeData.personalInfo.website && (
                <div className="flex items-center gap-2" style={{ color: styles.text }}>
                  <div 
                    className="p-1 rounded"
                    style={{ backgroundColor: `${styles.accent}20` }}
                  >
                    <Globe className="h-4 w-4" style={{ color: styles.accent }} />
                  </div>
                  <span className="break-all">{resumeData.personalInfo.website}</span>
                </div>
              )}
              {resumeData.personalInfo.linkedin && (
                <div className="flex items-center gap-2" style={{ color: styles.text }}>
                  <div 
                    className="p-1 rounded"
                    style={{ backgroundColor: `${styles.accent}20` }}
                  >
                    <Linkedin className="h-4 w-4" style={{ color: styles.accent }} />
                  </div>
                  <span className="break-all">{resumeData.personalInfo.linkedin}</span>
                </div>
              )}
              {resumeData.personalInfo.github && (
                <div className="flex items-center gap-2" style={{ color: styles.text }}>
                  <div 
                    className="p-1 rounded"
                    style={{ backgroundColor: `${styles.accent}20` }}
                  >
                    <Github className="h-4 w-4" style={{ color: styles.accent }} />
                  </div>
                  <span className="break-all">{resumeData.personalInfo.github}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Creative Sections */}
      <div className="space-y-8">
        {visibleSections.map((section) => {
          const sectionContent = (() => {
            switch (section.type) {
              case 'summary':
                return (
                  <div 
                    className="p-4 rounded-lg"
                    style={{ 
                      backgroundColor: `${styles.secondary}10`,
                      border: `2px solid ${styles.secondary}30`
                    }}
                  >
                    <p style={{ color: styles.text, lineHeight: '1.6', fontSize: '16px' }}>
                      {resumeData.summary}
                    </p>
                  </div>
                );

              case 'experience':
                return (
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div 
                        key={exp.id} 
                        className="relative pl-6"
                        style={{
                          borderLeft: `3px solid ${index % 2 === 0 ? styles.primary : styles.accent}`
                        }}
                      >
                        <div 
                          className="absolute w-4 h-4 rounded-full -left-2 top-1"
                          style={{
                            backgroundColor: index % 2 === 0 ? styles.primary : styles.accent
                          }}
                        />
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-lg" style={{ color: styles.text }}>
                              {exp.position}
                            </h3>
                            <p className="font-semibold" style={{ color: styles.primary }}>
                              {exp.company}
                            </p>
                          </div>
                          <span 
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{ 
                              backgroundColor: `${styles.accent}20`,
                              color: styles.accent
                            }}
                          >
                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                          </span>
                        </div>
                        <div style={{ color: styles.text }}>
                          {exp.description.split('\\n').map((line, lineIndex) => (
                            <p key={lineIndex} className="mb-1">{line}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );

              case 'skills':
                const groupedSkills = resumeData.skills.reduce((acc, skill) => {
                  const category = skill.category || 'Other';
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(skill);
                  return acc;
                }, {} as Record<string, typeof resumeData.skills>);

                return (
                  <div className="grid grid-cols-2 gap-6">
                    {Object.entries(groupedSkills).map(([category, skills]) => (
                      <div key={category}>
                        <h4 
                          className="font-bold mb-3"
                          style={{ color: styles.primary }}
                        >
                          {category}
                        </h4>
                        <div className="space-y-2">
                          {skills.map((skill) => (
                            <div key={skill.id} className="flex items-center justify-between">
                              <span style={{ color: styles.text }}>{skill.name}</span>
                              <span 
                                className="px-2 py-1 rounded text-xs font-medium"
                                style={{
                                  backgroundColor: `${styles.accent}20`,
                                  color: styles.accent
                                }}
                              >
                                {skill.level}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );

              default:
                return null;
            }
          })();

          if (!sectionContent) return null;

          return (
            <section key={section.id}>
              <h2 
                className="text-2xl font-bold mb-4 relative"
                style={{ 
                  color: styles.primary,
                  fontFamily: styles.headingFont
                }}
              >
                <span className="relative z-10">{section.title}</span>
                <div 
                  className="absolute bottom-0 left-0 h-1 w-16 rounded"
                  style={{
                    background: `linear-gradient(90deg, ${styles.primary} 0%, ${styles.accent} 100%)`
                  }}
                />
              </h2>
              {sectionContent}
            </section>
          );
        })}
      </div>
    </div>
  );
}