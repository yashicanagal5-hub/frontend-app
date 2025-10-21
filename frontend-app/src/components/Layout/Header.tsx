'use client';

import React from 'react';
import { FileText, Download, Settings, Moon, Sun, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui';
import { useResumeStore } from '@/store/resumeStore';
import { exportToPDF, downloadJSON } from '@/utils/helpers';

interface HeaderProps {
  onTogglePreview?: () => void;
  showPreview?: boolean;
}

export function Header({ onTogglePreview, showPreview }: HeaderProps) {
  const { settings, updateSettings, resumeData } = useResumeStore();

  const handleToggleDarkMode = () => {
    updateSettings({ darkMode: !settings.darkMode });
    document.documentElement.classList.toggle('dark');
  };

  const handleExportPDF = () => {
    exportToPDF('resume-preview', 'resume.pdf');
  };

  const handleExportData = () => {
    downloadJSON(resumeData, 'resume-data.json');
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Resume Builder</h1>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Preview Toggle */}
            {onTogglePreview && (
              <Button
                variant="outline"
                size="sm"
                onClick={onTogglePreview}
                className="md:hidden"
              >
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? 'Edit' : 'Preview'}
              </Button>
            )}

            {/* Save Status */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <Save className="h-4 w-4" />
              <span>Auto-saved</span>
            </div>

            {/* Export Options */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExportData}
                title="Export Resume Data"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>

            {/* Settings */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleDarkMode}
              title="Toggle Theme"
            >
              {settings.darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}