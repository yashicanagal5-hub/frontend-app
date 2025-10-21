'use client';

import React from 'react';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { Input, Textarea, Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { useResumeStore } from '@/store/resumeStore';
import { Project } from '@/types/resume';

export function ProjectsEditor() {
  const { resumeData, addProject, updateProject, removeProject } = useResumeStore();

  const handleChange = (id: string, field: keyof Project) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateProject(id, { [field]: e.target.value });
  };

  const handleTechnologiesChange = (id: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const technologies = e.target.value.split(',').map(tech => tech.trim()).filter(Boolean);
    updateProject(id, { technologies });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Projects
          <Button onClick={addProject} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {resumeData.projects.map((project, index) => (
            <div key={project.id} className="border rounded-lg p-4 relative">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Project {index + 1}</h3>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <Input
                label="Project Name"
                value={project.name}
                onChange={handleChange(project.id, 'name')}
                placeholder="My Awesome Project"
                className="mb-4"
              />
              
              <Textarea
                label="Description"
                value={project.description}
                onChange={handleChange(project.id, 'description')}
                placeholder="Describe what the project does, its key features, and your role in developing it..."
                className="min-h-[80px] mb-4"
              />
              
              <Input
                label="Technologies Used (comma-separated)"
                value={project.technologies.join(', ')}
                onChange={handleTechnologiesChange(project.id)}
                placeholder="React, Node.js, PostgreSQL, AWS"
                className="mb-4"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Start Date"
                  type="month"
                  value={project.startDate}
                  onChange={handleChange(project.id, 'startDate')}
                />
                <Input
                  label="End Date (Optional)"
                  type="month"
                  value={project.endDate || ''}
                  onChange={handleChange(project.id, 'endDate')}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Live Demo URL (Optional)"
                  value={project.url || ''}
                  onChange={handleChange(project.id, 'url')}
                  placeholder="https://myproject.com"
                />
                <Input
                  label="GitHub Repository (Optional)"
                  value={project.github || ''}
                  onChange={handleChange(project.id, 'github')}
                  placeholder="https://github.com/username/project"
                />
              </div>
              
              {/* Technology Preview */}
              {project.technologies.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Technologies:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center px-2 py-1 rounded text-xs bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Links Preview */}
              {(project.url || project.github) && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Links:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {resumeData.projects.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No projects added yet.</p>
              <Button onClick={addProject} className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Project
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}