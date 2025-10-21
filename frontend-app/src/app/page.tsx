'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Layout/Header';
import { Sidebar } from '@/components/Layout/Sidebar';
import { EditorPanel } from '@/components/Editor/EditorPanel';
import { ResumePreview } from '@/components/Preview/ResumePreview';
import { useResumeStore } from '@/store/resumeStore';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [showPreview, setShowPreview] = useState(false);
  const { settings } = useResumeStore();

  // Apply dark mode on mount
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  const handleTogglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header onTogglePreview={handleTogglePreview} showPreview={showPreview} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile: Show either editor or preview */}
        <div className="md:hidden w-full">
          {showPreview ? (
            <div className="w-full h-full overflow-auto bg-gray-50 dark:bg-gray-900 p-4">
              <ResumePreview />
            </div>
          ) : (
            <div className="flex h-full">
              <Sidebar 
                activeSection={activeSection} 
                onSectionChange={setActiveSection} 
              />
              <EditorPanel activeSection={activeSection} />
            </div>
          )}
        </div>

        {/* Desktop: Show both editor and preview */}
        <div className="hidden md:flex w-full">
          {/* Left side - Editor */}
          <div className="flex w-1/2 border-r">
            <Sidebar 
              activeSection={activeSection} 
              onSectionChange={setActiveSection} 
            />
            <EditorPanel activeSection={activeSection} />
          </div>

          {/* Right side - Preview */}
          <div className="w-1/2 bg-gray-50 dark:bg-gray-900 p-4 overflow-auto">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
}