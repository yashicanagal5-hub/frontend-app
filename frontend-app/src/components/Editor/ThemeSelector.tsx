'use client';

import React from 'react';
import { Check, Palette } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { useResumeStore } from '@/store/resumeStore';
import { cn } from '@/utils/helpers';

export function ThemeSelector() {
  const { themes, settings, updateSettings } = useResumeStore();

  const handleThemeChange = (themeId: string) => {
    updateSettings({ currentTheme: themeId });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="h-5 w-5 mr-2" />
          Color Themes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={cn(
                'relative border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md',
                settings.currentTheme === theme.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              )}
              onClick={() => handleThemeChange(theme.id)}
            >
              {settings.currentTheme === theme.id && (
                <div className="absolute top-2 right-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">{theme.name}</h4>
                  
                  {/* Color Palette Preview */}
                  <div className="flex space-x-2 mb-3">
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: theme.colors.primary }}
                      title="Primary Color"
                    />
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: theme.colors.secondary }}
                      title="Secondary Color"
                    />
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: theme.colors.accent }}
                      title="Accent Color"
                    />
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: theme.colors.text }}
                      title="Text Color"
                    />
                  </div>
                  
                  {/* Typography Preview */}
                  <div className="text-sm">
                    <p style={{ fontFamily: theme.fonts.heading }} className="font-semibold">
                      {theme.fonts.heading} (Headings)
                    </p>
                    <p style={{ fontFamily: theme.fonts.body }} className="text-muted-foreground">
                      {theme.fonts.body} (Body Text)
                    </p>
                  </div>
                </div>
                
                <Button
                  variant={settings.currentTheme === theme.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleThemeChange(theme.id);
                  }}
                >
                  {settings.currentTheme === theme.id ? 'Selected' : 'Select'}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Custom Theme Section */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-4">Custom Theme</h3>
          <div className="p-4 border rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-3">
              Create your own color scheme and typography combinations.
            </p>
            <Button variant="outline" disabled>
              Coming Soon
            </Button>
          </div>
        </div>
        
        {/* Theme Information */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-4">Theme Guide</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-4 h-4 bg-blue-500 rounded mt-0.5"></div>
              <div>
                <strong>Professional:</strong> Classic blue color scheme with clean typography, perfect for corporate and business roles.
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-4 h-4 bg-purple-500 rounded mt-0.5"></div>
              <div>
                <strong>Creative:</strong> Vibrant purple and pink accents with modern fonts, ideal for design and creative positions.
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-4 h-4 bg-gray-600 rounded mt-0.5"></div>
              <div>
                <strong>Minimal:</strong> Grayscale palette with system fonts, focusing on content clarity and simplicity.
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}