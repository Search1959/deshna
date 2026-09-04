import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Bot,
  Menu,
  Zap,
  Search,
} from 'lucide-react';

interface MobileNavigationProps {
  onOpenMobileMenu: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ onOpenMobileMenu }) => {
  const {
    activeView,
    setActiveView,
    currentRole,
    openAITutorWithContext,
    isAITutorOpen,
    setIsAITutorOpen,
    currentStudent,
    selectedGradeId,
    openExamPrep,
    examPrepInitialTab,
    t,
  } = useApp();

  const targetGrade = selectedGradeId || currentStudent?.gradeId || 1;

  return (
    <nav
      id="mobile-bottom-nav"
      aria-label="Mobile Navigation"
      className="xl:hidden fixed bottom-0 left-0 right-0 z-[999] bg-white/95 backdrop-blur-lg border-t-2 border-amber-300 shadow-[0_-4px_24px_rgba(0,0,0,0.15)] px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1 items-center">
        {/* 1. Study Dashboard */}
        <button
          id="mobile-nav-dashboard"
          onClick={() => setActiveView(currentRole === 'student' ? 'student_dashboard' : activeView)}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition min-h-[46px] ${
            activeView === 'student_dashboard' || activeView === 'parent_dashboard' || activeView === 'teacher_dashboard' || activeView === 'admin_dashboard'
              ? 'text-amber-700 font-black bg-amber-50'
              : 'text-slate-600 hover:text-slate-900 font-bold'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">{t('study_mode', 'Study')}</span>
        </button>

        {/* 2. Mock Tests (Grade-Wise) */}
        <button
          id="mobile-nav-mocks"
          onClick={() => openExamPrep('mock_tests', targetGrade)}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition min-h-[46px] ${
            activeView === 'exam_prep' && examPrepInitialTab !== 'search_questions'
              ? 'text-rose-700 font-black bg-rose-50'
              : 'text-slate-600 hover:text-slate-900 font-bold'
          }`}
        >
          <Zap className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Mock Tests</span>
        </button>

        {/* 3. Central AI Tutor Highlight Action */}
        <div className="flex justify-center -mt-5">
          <button
            id="mobile-nav-ai-tutor"
            onClick={() => {
              if (isAITutorOpen) {
                setIsAITutorOpen(false);
              } else {
                openAITutorWithContext();
              }
            }}
            className={`w-12 h-12 rounded-full text-white shadow-lg flex items-center justify-center border-4 border-white transition active:scale-95 ${
              isAITutorOpen
                ? 'bg-gradient-to-tr from-rose-600 to-pink-600 ring-2 ring-pink-400 shadow-pink-500/50'
                : 'bg-gradient-to-tr from-pink-500 to-rose-500 shadow-pink-500/30 hover:scale-105'
            }`}
            aria-label="Toggle AI Tutor"
          >
            <Bot className="w-6 h-6" />
          </button>
        </div>

        {/* 4. Search Questions (Grade-Wise) */}
        <button
          id="mobile-nav-search-questions"
          onClick={() => openExamPrep('search_questions', targetGrade)}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition min-h-[46px] ${
            activeView === 'exam_prep' && examPrepInitialTab === 'search_questions'
              ? 'text-blue-700 font-black bg-blue-50'
              : 'text-slate-600 hover:text-slate-900 font-bold'
          }`}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Search Qs</span>
        </button>

        {/* 5. Menu Trigger */}
        <button
          id="mobile-nav-menu"
          onClick={onOpenMobileMenu}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-600 hover:text-slate-900 font-bold transition min-h-[46px]"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Menu</span>
        </button>
      </div>
    </nav>
  );
};
