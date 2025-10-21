'use client';

import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';

interface ResumePreviewProps {
  className?: string;
}

export function ResumePreview({ className }: ResumePreviewProps) {
  const { settings, resumeData, themes } = useResumeStore();
  
  const currentTheme = themes.find(theme => theme.id === settings.currentTheme);
  
  const renderTemplate = () => {
    const props = {
      resumeData,
      theme: currentTheme,
    };
    
    switch (settings.currentTemplate) {
      case 'professional':
        return <ProfessionalTemplate {...props} />;
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      case 'minimal':
        return <MinimalTemplate {...props} />;
      default:
        return <ProfessionalTemplate {...props} />;
    }
  };

  return (
    <div className={className}>
      <div className="sticky top-4">
        <div 
          id="resume-preview" 
          className="resume-preview overflow-hidden"
          style={{
            backgroundColor: currentTheme?.colors.background || '#ffffff',
            color: currentTheme?.colors.text || '#1e293b',
            fontFamily: currentTheme?.fonts.body || 'Inter',
            fontSize: '14px',
            lineHeight: '1.4',
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}