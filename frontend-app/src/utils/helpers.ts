import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function exportToPDF(elementId: string, filename: string = 'resume.pdf'): void {
  // This will be implemented with jsPDF and html2canvas
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found for PDF export');
    return;
  }
  
  // For now, we'll use the browser's print functionality
  // In a full implementation, we'd use jsPDF + html2canvas
  window.print();
}

export function downloadJSON(data: any, filename: string = 'resume-data.json'): void {
  const dataStr = JSON.stringify(data, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = filename;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}