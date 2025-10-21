'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { useResumeStore } from '@/store/resumeStore';
import { cn } from '@/utils/helpers';

export function TemplateSelector() {
  const { templates, settings, updateSettings } = useResumeStore();

  const handleTemplateChange = (templateId: string) => {
    updateSettings({ currentTemplate: templateId });
  };

  const categorizedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, typeof templates>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(categorizedTemplates).map(([category, categoryTemplates]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-3 capitalize">
                {category} Templates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={cn(
                      'relative border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md',
                      settings.currentTemplate === template.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    )}
                    onClick={() => handleTemplateChange(template.id)}
                  >
                    {settings.currentTemplate === template.id && (
                      <div className="absolute top-2 right-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    
                    {/* Template Preview Placeholder */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 rounded mb-3 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-1">{template.name}</div>
                        <div className="text-sm text-muted-foreground">Preview</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-1">{template.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {template.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-secondary px-2 py-1 rounded">
                          {template.layout}
                        </span>
                        <Button
                          variant={settings.currentTemplate === template.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTemplateChange(template.id);
                          }}
                        >
                          {settings.currentTemplate === template.id ? 'Selected' : 'Select'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-4">Template Layouts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 border rounded">
              <strong>Single Column:</strong>
              <p className="text-muted-foreground mt-1">
                Traditional layout with all sections in a single column. Great for ATS systems.
              </p>
            </div>
            <div className="p-3 border rounded">
              <strong>Two Column:</strong>
              <p className="text-muted-foreground mt-1">
                Main content on the left, sidebar with skills and contact on the right.
              </p>
            </div>
            <div className="p-3 border rounded">
              <strong>Sidebar:</strong>
              <p className="text-muted-foreground mt-1">
                Prominent sidebar with contact and skills, main content takes remaining space.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}