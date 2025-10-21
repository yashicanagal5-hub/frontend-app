'use client';

import React from 'react';
import { PersonalInfoEditor } from './PersonalInfoEditor';
import { SummaryEditor } from './SummaryEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { EducationEditor } from './EducationEditor';
import { SkillsEditor } from './SkillsEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { AchievementsEditor } from './AchievementsEditor';
import { TemplateSelector } from './TemplateSelector';
import { ThemeSelector } from './ThemeSelector';

interface EditorPanelProps {
  activeSection: string;
}

export function EditorPanel({ activeSection }: EditorPanelProps) {
  const renderEditor = () => {
    switch (activeSection) {
      case 'personalInfo':
        return <PersonalInfoEditor />;
      case 'summary':
        return <SummaryEditor />;
      case 'experience':
        return <ExperienceEditor />;
      case 'education':
        return <EducationEditor />;
      case 'skills':
        return <SkillsEditor />;
      case 'projects':
        return <ProjectsEditor />;
      case 'achievements':
        return <AchievementsEditor />;
      case 'templates':
        return <TemplateSelector />;
      case 'themes':
        return <ThemeSelector />;
      default:
        return <PersonalInfoEditor />;
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {renderEditor()}
      </div>
    </div>
  );
}