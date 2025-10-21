'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Input, Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { useResumeStore } from '@/store/resumeStore';
import { Education } from '@/types/resume';

export function EducationEditor() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore();

  const handleChange = (id: string, field: keyof Education) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    updateEducation(id, { [field]: value });
  };

  const handleCurrentChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateEducation(id, { 
      current: e.target.checked,
      endDate: e.target.checked ? '' : resumeData.education.find(edu => edu.id === id)?.endDate || ''
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Education
          <Button onClick={addEducation} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="border rounded-lg p-4 relative">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Education {index + 1}</h3>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Institution"
                  value={edu.institution}
                  onChange={handleChange(edu.id, 'institution')}
                  placeholder="University Name"
                />
                <Input
                  label="Degree"
                  value={edu.degree}
                  onChange={handleChange(edu.id, 'degree')}
                  placeholder="Bachelor of Science, Master of Arts, etc."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Field of Study"
                  value={edu.field}
                  onChange={handleChange(edu.id, 'field')}
                  placeholder="Computer Science, Business Administration, etc."
                />
                <Input
                  label="GPA (Optional)"
                  value={edu.gpa || ''}
                  onChange={handleChange(edu.id, 'gpa')}
                  placeholder="3.8, 4.0, etc."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Input
                  label="Start Date"
                  type="month"
                  value={edu.startDate}
                  onChange={handleChange(edu.id, 'startDate')}
                />
                <Input
                  label="End Date"
                  type="month"
                  value={edu.endDate}
                  onChange={handleChange(edu.id, 'endDate')}
                  disabled={edu.current}
                />
                <div className="flex items-center space-x-2 mt-6">
                  <input
                    type="checkbox"
                    id={`current-${edu.id}`}
                    checked={edu.current}
                    onChange={handleCurrentChange(edu.id)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor={`current-${edu.id}`} className="text-sm">
                    Currently Enrolled
                  </label>
                </div>
              </div>
            </div>
          ))}
          
          {resumeData.education.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No education added yet.</p>
              <Button onClick={addEducation} className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Education
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}