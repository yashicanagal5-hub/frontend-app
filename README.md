# 📝 Resume Builder - Frontend Application

> A modern, interactive resume builder built with Next.js and React

**Developer:** Yashica Nagal  
**Project Type:** Web Development Project (Zidio Development Task) 
**Status:** ✅ Completed

---

## 📖 About This Project

This is a full-featured resume builder web application that allows users to create, customize, and export professional resumes. The project demonstrates modern web development practices using React, Next.js, and TypeScript.

### 🎯 Project Goals

- Build a responsive, user-friendly interface for resume creation
- Implement state management using Zustand
- Create reusable React components following best practices
- Support multiple resume templates with real-time preview
- Enable PDF export functionality
- Practice TypeScript for type-safe development

---

## ✨ Features

### Core Functionality
- ✅ **Real-time Resume Editing** - Live preview as you type
- ✅ **Multiple Templates** - 4 professional resume templates (Modern, Professional, Creative, Minimal)
- ✅ **Theme Customization** - Multiple color schemes and fonts
- ✅ **PDF Export** - Download resume as PDF
- ✅ **Data Persistence** - Save and load resume data
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

### Resume Sections Supported
- Personal Information
- Professional Summary
- Work Experience
- Education
- Skills
- Projects
- Achievements

---

## 🛠️ Technologies Used

### Frontend Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI component library
- **TypeScript** - Type-safe JavaScript

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Icon library

### State Management
- **Zustand** - Lightweight state management

### Development Tools
- **ESLint** - Code linting
- **Jest** - Testing framework
- **PostCSS** - CSS processing

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Editor/           # Resume editing components
│   │   ├── PersonalInfoEditor.tsx
│   │   ├── ExperienceEditor.tsx
│   │   ├── EducationEditor.tsx
│   │   ├── SkillsEditor.tsx
│   │   ├── ProjectsEditor.tsx
│   │   ├── AchievementsEditor.tsx
│   │   ├── SummaryEditor.tsx
│   │   ├── TemplateSelector.tsx
│   │   └── ThemeSelector.tsx
│   ├── Preview/          # Resume preview components
│   │   ├── ResumePreview.tsx
│   │   └── templates/    # Template components
│   │       ├── ModernTemplate.tsx
│   │       ├── ProfessionalTemplate.tsx
│   │       ├── CreativeTemplate.tsx
│   │       └── MinimalTemplate.tsx
│   ├── Layout/           # Layout components
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ui/              # Reusable UI components
├── store/               # State management
│   └── resumeStore.ts   # Zustand store
├── types/               # TypeScript type definitions
│   └── resume.ts
└── utils/               # Utility functions
    └── helpers.ts
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Extract the project files**
   ```bash
   unzip frontend-app.zip
   cd frontend-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to: http://localhost:3000
   ```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run test     # Run tests
```

---

## 💡 How It Works

### State Management Flow

1. **User Input** → Editor components receive user data
2. **State Update** → Zustand store updates the resume state
3. **Re-render** → Preview components automatically update
4. **Export** → Generate PDF from the current state

### Component Architecture

- **Editor Panel** - Left side, contains all editing forms
- **Preview Panel** - Right side, shows live resume preview
- **Template System** - Swappable templates with consistent data structure
- **Theme System** - Color and font customization

---

## 🎨 Customization

### Adding a New Template

1. Create a new template component in `src/components/Preview/templates/`
2. Follow the existing template structure
3. Add the template to the template selector

### Adding a New Section

1. Create an editor component in `src/components/Editor/`
2. Update the resume type definitions in `src/types/resume.ts`
3. Update the Zustand store in `src/store/resumeStore.ts`
4. Add the section to all template components

---

## 🧪 Testing

Run the test suite:

```bash
npm run test
```

---

## 📝 Key Learnings

### Technical Skills Gained
- ✅ Next.js App Router and server/client components
- ✅ TypeScript for type-safe React development
- ✅ Zustand for lightweight state management
- ✅ Tailwind CSS for rapid UI development
- ✅ Component composition and reusability
- ✅ Real-time data synchronization
- ✅ PDF generation in the browser

### Development Best Practices
- Component-driven development
- Type-safe programming with TypeScript
- Responsive design principles
- State management patterns
- Code organization and structure

---

## 🚧 Future Enhancements

Potential improvements for future versions:

- [ ] User authentication and cloud storage
- [ ] More resume templates (5+ additional designs)
- [ ] AI-powered content suggestions
- [ ] Collaborative editing features
- [ ] Resume analytics and insights
- [ ] ATS (Applicant Tracking System) optimization checker
- [ ] Multi-language support
- [ ] Cover letter builder
- [ ] LinkedIn import functionality

---

## 🐛 Known Issues

- PDF export may have minor formatting differences from preview
- Dark mode support is partial
- Mobile responsiveness needs improvement for template selector

---

## 📚 Resources & References

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Tutorials Used
- Next.js 14 App Router tutorial
- Tailwind CSS crash course
- TypeScript with React best practices

---

## 📄 License

This project is open source and available for educational purposes.

---

## 👤 Author

**Yashica Nagal**

Feel free to reach out for questions or collaboration opportunities!

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS approach
- The React community for excellent resources and support
- Open source contributors for the libraries used in this project
- Zidio Development for providing this opportunity/task challenge that helped me a lot to polish my skills.

---

**Last Updated:** October 2025  
**Version:** 1.0.0
