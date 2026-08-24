import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  Bot,
  Mic,
  Menu,
  Sparkles,
  Zap,
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
    t,
  } = useApp();

  return (
    <nav
      id="mobile-bottom-nav"
      aria-label="Mobile Navigation"
      className="xl:hidden fixed bottom-0 left-0 right-0 z-[999] bg-white/95 backdrop-blur-lg border-t-2 border-amber-300 shadow-[0_-4px_24px_rgba(0,0,0,0.15)] px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1 items-center">
        {/* Study Dashboard */}
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

        {/* Classes Catalog */}
        <button
          id="mobile-nav-classes"
          onClick={() => setActiveView('classes_catalog')}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition min-h-[46px] ${
            activeView === 'classes_catalog' || activeView === 'subject_detail' || activeView === 'chapter_detail'
              ? 'text-amber-700 font-black bg-amber-50'
              : 'text-slate-600 hover:text-slate-900 font-bold'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">{t('classes', 'Classes')}</span>
        </button>

        {/* Central AI Tutor Highlight Action */}
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

        {/* Reading Coach */}
        <button
          id="mobile-nav-reading"
          onClick={() => setActiveView('reading_coach')}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition min-h-[46px] ${
            activeView === 'reading_coach' || activeView === 'vocabulary_vault'
              ? 'text-amber-700 font-black bg-amber-50'
              : 'text-slate-600 hover:text-slate-900 font-bold'
          }`}
        >
          <Mic className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">{t('reading_coach', 'Reading')}</span>
        </button>

        {/* Full Menu Drawer Trigger */}
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
