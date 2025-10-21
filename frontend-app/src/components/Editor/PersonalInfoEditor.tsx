'use client';

import React from 'react';
import { Input, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { useResumeStore } from '@/store/resumeStore';

export function PersonalInfoEditor() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = resumeData;

  const handleChange = (field: keyof typeof personalInfo) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updatePersonalInfo({ [field]: e.target.value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={personalInfo.fullName}
            onChange={handleChange('fullName')}
            placeholder="John Doe"
          />
          <Input
            label="Email"
            type="email"
            value={personalInfo.email}
            onChange={handleChange('email')}
            placeholder="john@example.com"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone"
            value={personalInfo.phone}
            onChange={handleChange('phone')}
            placeholder="+1 (555) 123-4567"
          />
          <Input
            label="Location"
            value={personalInfo.location}
            onChange={handleChange('location')}
            placeholder="New York, NY"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Website (Optional)"
            value={personalInfo.website || ''}
            onChange={handleChange('website')}
            placeholder="https://yourwebsite.com"
          />
          <Input
            label="LinkedIn (Optional)"
            value={personalInfo.linkedin || ''}
            onChange={handleChange('linkedin')}
            placeholder="linkedin.com/in/yourprofile"
          />
        </div>
        
        <Input
          label="GitHub (Optional)"
          value={personalInfo.github || ''}
          onChange={handleChange('github')}
          placeholder="github.com/yourusername"
        />
      </CardContent>
    </Card>
  );
}