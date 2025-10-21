'use client';

import React from 'react';
import { Plus, Trash2, Award } from 'lucide-react';
import { Input, Textarea, Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { useResumeStore } from '@/store/resumeStore';
import { Achievement } from '@/types/resume';

export function AchievementsEditor() {
  const { resumeData, addAchievement, updateAchievement, removeAchievement } = useResumeStore();

  const handleChange = (id: string, field: keyof Achievement) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateAchievement(id, { [field]: e.target.value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Achievements & Certifications
          <Button onClick={addAchievement} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Achievement
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {resumeData.achievements.map((achievement, index) => (
            <div key={achievement.id} className="border rounded-lg p-4 relative">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  Achievement {index + 1}
                </h3>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeAchievement(achievement.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <Input
                label="Title"
                value={achievement.title}
                onChange={handleChange(achievement.id, 'title')}
                placeholder="AWS Certified Developer, Employee of the Month, etc."
                className="mb-4"
              />
              
              <Textarea
                label="Description"
                value={achievement.description}
                onChange={handleChange(achievement.id, 'description')}
                placeholder="Describe the achievement, certification details, or what you accomplished..."
                className="min-h-[80px] mb-4"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Date Achieved"
                  type="month"
                  value={achievement.date}
                  onChange={handleChange(achievement.id, 'date')}
                />
                <Input
                  label="Issuing Organization (Optional)"
                  value={achievement.issuer || ''}
                  onChange={handleChange(achievement.id, 'issuer')}
                  placeholder="Amazon Web Services, Company Name, etc."
                />
              </div>
            </div>
          ))}
          
          {resumeData.achievements.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No achievements added yet.</p>
              <p className="text-sm mb-4">
                Add certifications, awards, recognitions, or notable accomplishments.
              </p>
              <Button onClick={addAchievement} className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Achievement
              </Button>
            </div>
          )}
        </div>
        
        {resumeData.achievements.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Tips for Achievements</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Include relevant certifications and professional credentials</li>
              <li>• Add awards and recognition you&apos;ve received</li>
              <li>• Mention significant accomplishments or milestones</li>
              <li>• Include relevant coursework or training certificates</li>
              <li>• List publications, patents, or notable contributions</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}