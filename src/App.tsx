import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { MobileNavigation } from './components/MobileNavigation';
import { MobileMenuDrawer } from './components/MobileMenuDrawer';
import { AITutorDrawer } from './components/AITutorDrawer';
import { SearchModal } from './components/SearchModal';
import { LoginModal } from './components/LoginModal';
import { LandingView } from './views/LandingView';
import { ClassesCatalogView } from './views/ClassesCatalogView';
import { StudentDashboard } from './views/StudentDashboard';
import { SubjectView } from './views/SubjectView';
import { ChapterView } from './views/ChapterView';
import { DoubtSolverView } from './views/DoubtSolverView';
import { ReadingCoachView } from './views/ReadingCoachView';
import { VocabularyView } from './views/VocabularyView';
import { RevisionView } from './views/RevisionView';
import { ExamPrepView } from './views/ExamPrepView';
import { ParentDashboard } from './views/ParentDashboard';
import { TeacherDashboard } from './views/TeacherDashboard';
import { AdminDashboard } from './views/AdminDashboard';

const MainContent: React.FC = () => {
  const { activeView, currentRole } = useApp();

  // If landing or catalog, always render them regardless of role
  if (activeView === 'landing') {
    return <LandingView />;
  }
  if (activeView === 'classes_catalog') {
    return <ClassesCatalogView />;
  }

  // If in non-student role, render corresponding role dashboard
  if (currentRole === 'parent') {
    return <ParentDashboard />;
  }
  if (currentRole === 'teacher') {
    return <TeacherDashboard />;
  }
  if (currentRole === 'admin') {
    return <AdminDashboard />;
  }

  // Student & other views
  switch (activeView) {
    case 'student_dashboard':
      return <StudentDashboard />;
    case 'subject_detail':
      return <SubjectView />;
    case 'chapter_detail':
      return <ChapterView />;
    case 'doubt_solver':
      return <DoubtSolverView />;
    case 'reading_coach':
      return <ReadingCoachView />;
    case 'vocabulary_vault':
      return <VocabularyView />;
    case 'spaced_revision':
      return <RevisionView />;
    case 'exam_prep':
      return <ExamPrepView />;
    case 'parent_dashboard':
      return <ParentDashboard />;
    case 'teacher_dashboard':
      return <TeacherDashboard />;
    case 'admin_dashboard':
      return <AdminDashboard />;
    default:
      return <StudentDashboard />;
  }
};

const AppShell: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#1F2937] flex flex-col font-sans antialiased selection:bg-[#FBBF24] selection:text-[#78350F]">
      <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      <main className="flex-1 pb-28 xl:pb-8">
        <MainContent />
      </main>
      <MobileNavigation onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <AITutorDrawer />
      <SearchModal />
      <LoginModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

