'use client';

import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderOpen, 
  Award,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
  Settings,
  Palette
} from 'lucide-react';
import { Button } from '@/components/ui';
import { useResumeStore } from '@/store/resumeStore';
import { cn } from '@/utils/helpers';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sectionIcons = {
  personalInfo: User,
  summary: FileText,
  experience: Briefcase,
  education: GraduationCap,
  skills: Code,
  projects: FolderOpen,
  achievements: Award,
};

const sectionLabels = {
  personalInfo: 'Personal Info',
  summary: 'Summary',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  achievements: 'Achievements',
};

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { resumeData, toggleSectionVisibility } = useResumeStore();
  const [expandedGroups, setExpandedGroups] = useState({
    content: true,
    appearance: false,
  });

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group as keyof typeof prev]
    }));
  };

  const visibleSections = resumeData.sections
    .filter(section => section.type !== 'personalInfo')
    .sort((a, b) => a.order - b.order);

  return (
    <div className="w-64 bg-card border-r h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Resume Sections</h2>
        
        {/* Personal Info - Always visible */}
        <div className="mb-4">
          <Button
            variant={activeSection === 'personalInfo' ? 'default' : 'ghost'}
            className="w-full justify-start mb-1"
            onClick={() => onSectionChange('personalInfo')}
          >
            <User className="h-4 w-4 mr-2" />
            Personal Info
          </Button>
        </div>

        {/* Content Sections */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="w-full justify-between p-2 h-auto"
            onClick={() => toggleGroup('content')}
          >
            <span className="text-sm font-medium">Content</span>
            {expandedGroups.content ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          
          {expandedGroups.content && (
            <div className="mt-2 space-y-1">
              {visibleSections.map((section) => {
                const Icon = sectionIcons[section.type as keyof typeof sectionIcons];
                const label = sectionLabels[section.type as keyof typeof sectionLabels];
                
                return (
                  <div key={section.id} className="flex items-center">
                    <Button
                      variant={activeSection === section.type ? 'default' : 'ghost'}
                      className={cn(
                        'flex-1 justify-start text-sm',
                        !section.visible && 'opacity-50'
                      )}
                      onClick={() => onSectionChange(section.type)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {label}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto ml-1"
                      onClick={() => toggleSectionVisibility(section.id)}
                      title={section.visible ? 'Hide section' : 'Show section'}
                    >
                      {section.visible ? (
                        <Eye className="h-3 w-3" />
                      ) : (
                        <EyeOff className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Appearance Settings */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="w-full justify-between p-2 h-auto"
            onClick={() => toggleGroup('appearance')}
          >
            <span className="text-sm font-medium">Appearance</span>
            {expandedGroups.appearance ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          
          {expandedGroups.appearance && (
            <div className="mt-2 space-y-1">
              <Button
                variant={activeSection === 'templates' ? 'default' : 'ghost'}
                className="w-full justify-start text-sm"
                onClick={() => onSectionChange('templates')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Templates
              </Button>
              <Button
                variant={activeSection === 'themes' ? 'default' : 'ghost'}
                className="w-full justify-start text-sm"
                onClick={() => onSectionChange('themes')}
              >
                <Palette className="h-4 w-4 mr-2" />
                Themes
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}