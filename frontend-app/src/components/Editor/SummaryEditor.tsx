'use client';

import React from 'react';
import { Textarea, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { useResumeStore } from '@/store/resumeStore';

export function SummaryEditor() {
  const { resumeData, updateSummary } = useResumeStore();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSummary(e.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          label="Summary"
          value={resumeData.summary}
          onChange={handleChange}
          placeholder="Write a compelling professional summary that highlights your key skills, experience, and career objectives..."
          className="min-h-[120px]"
        />
        <p className="text-sm text-muted-foreground mt-2">
          Tip: Keep it concise (2-3 sentences) and focus on your most relevant achievements and skills.
        </p>
      </CardContent>
    </Card>
  );
}