'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Input, Select, Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { useResumeStore } from '@/store/resumeStore';
import { Skill } from '@/types/resume';

const skillLevels = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
  { value: 'Expert', label: 'Expert' },
];

const skillCategories = [
  { value: 'Programming', label: 'Programming Languages' },
  { value: 'Frontend', label: 'Frontend Development' },
  { value: 'Backend', label: 'Backend Development' },
  { value: 'Database', label: 'Database & Storage' },
  { value: 'Cloud', label: 'Cloud & DevOps' },
  { value: 'Tools', label: 'Tools & Software' },
  { value: 'Design', label: 'Design & UX' },
  { value: 'Other', label: 'Other' },
];

export function SkillsEditor() {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResumeStore();

  const handleChange = (id: string, field: keyof Skill) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    updateSkill(id, { [field]: e.target.value });
  };

  const groupedSkills = resumeData.skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Skills
          <Button onClick={addSkill} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {resumeData.skills.map((skill, index) => (
            <div key={skill.id} className="border rounded-lg p-4 relative">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Skill {index + 1}</h3>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSkill(skill.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Skill Name"
                  value={skill.name}
                  onChange={handleChange(skill.id, 'name')}
                  placeholder="React, Python, Photoshop, etc."
                />
                <Select
                  label="Proficiency Level"
                  value={skill.level}
                  onChange={handleChange(skill.id, 'level')}
                  options={skillLevels}
                />
                <Select
                  label="Category"
                  value={skill.category || 'Other'}
                  onChange={handleChange(skill.id, 'category')}
                  options={skillCategories}
                />
              </div>
            </div>
          ))}
          
          {resumeData.skills.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No skills added yet.</p>
              <Button onClick={addSkill} className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Skill
              </Button>
            </div>
          )}
        </div>

        {/* Skills Preview by Category */}
        {resumeData.skills.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Skills Preview</h3>
            <div className="space-y-4">
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <div key={category} className="bg-muted/50 rounded-lg p-3">
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">
                    {skillCategories.find(cat => cat.value === category)?.label || category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center px-2 py-1 rounded text-xs bg-primary/10 text-primary"
                      >
                        {skill.name}
                        <span className="ml-1 text-muted-foreground">
                          ({skill.level})
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}