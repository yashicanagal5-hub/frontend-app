'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Input, Textarea, Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { useResumeStore } from '@/store/resumeStore';
import { Experience } from '@/types/resume';

export function ExperienceEditor() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResumeStore();

  const handleChange = (id: string, field: keyof Experience) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    updateExperience(id, { [field]: value });
  };

  const handleCurrentChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateExperience(id, { 
      current: e.target.checked,
      endDate: e.target.checked ? '' : resumeData.experience.find(exp => exp.id === id)?.endDate || ''
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Work Experience
          <Button onClick={addExperience} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="border rounded-lg p-4 relative">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Company"
                  value={exp.company}
                  onChange={handleChange(exp.id, 'company')}
                  placeholder="Company Name"
                />
                <Input
                  label="Position"
                  value={exp.position}
                  onChange={handleChange(exp.id, 'position')}
                  placeholder="Job Title"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Input
                  label="Start Date"
                  type="month"
                  value={exp.startDate}
                  onChange={handleChange(exp.id, 'startDate')}
                />
                <Input
                  label="End Date"
                  type="month"
                  value={exp.endDate}
                  onChange={handleChange(exp.id, 'endDate')}
                  disabled={exp.current}
                />
                <div className="flex items-center space-x-2 mt-6">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={handleCurrentChange(exp.id)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor={`current-${exp.id}`} className="text-sm">
                    Current Position
                  </label>
                </div>
              </div>
              
              <Input
                label="Location (Optional)"
                value={exp.location || ''}
                onChange={handleChange(exp.id, 'location')}
                placeholder="City, State"
                className="mb-4"
              />
              
              <Textarea
                label="Description"
                value={exp.description}
                onChange={handleChange(exp.id, 'description')}
                placeholder="• Accomplished X by implementing Y which led to Z&#10;• Managed a team of X people&#10;• Increased efficiency by X%"
                className="min-h-[100px]"
              />
              
              <p className="text-sm text-muted-foreground mt-2">
                Use bullet points to highlight your achievements and quantify results when possible.
              </p>
            </div>
          ))}
          
          {resumeData.experience.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No work experience added yet.</p>
              <Button onClick={addExperience} className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Experience
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}