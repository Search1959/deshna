import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { LanguageSelector } from './LanguageSelector';
import {
  Bot,
  Volume2,
  VolumeX,
  GraduationCap,
  Users,
  ShieldCheck,
  BookOpen,
  ChevronDown,
  Menu,
} from 'lucide-react';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const {
    currentRole,
    setCurrentRole,
    activeView,
    setActiveView,
    currentStudent,
    selectedGradeId,
    selectedBoardId,
    boards,
    grades,
    openAITutorWithContext,
    isSpeaking,
    stopSpeaking,
    speakText,
    openLoginModal,
    t,
  } = useApp();

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
    setIsRoleMenuOpen(false);
  };

  const activeBoard = boards.find((b) => b.id === selectedBoardId);
  const activeGrade = grades.find((g) => g.id === selectedGradeId);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b-4 border-[#FBBF24] shadow-sm">
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2">
          {/* Left: Brand Logo & Academic Class/Board Badge */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Web App Logo & Branding */}
            <button
              id="brand-logo-btn"
              onClick={() => {
                setActiveView('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => {
                  const heroEl = document.getElementById('home-hero-section');
                  if (heroEl) {
                    heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }, 50);
              }}
              className="flex items-center space-x-2 text-left group cursor-pointer"
              title="Return to Home Page"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#F59E0B] rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-base sm:text-xl font-black shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <span>A</span>
              </div>
              <div className="min-w-0">
                <span className="text-sm sm:text-xl font-black tracking-tight text-[#1F2937] flex items-center gap-1 leading-tight">
                  <span className="truncate">DESHNA</span>
                  <span className="text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] font-black border border-[#FDE68A] shrink-0">
                    AI HUB
                  </span>
                </span>
                <p className="text-[10px] font-bold text-[#92400E] hidden sm:block truncate">
                  {t('tagline', 'Learn Smarter • Practice Better')}
                </p>
              </div>
            </button>

            {/* Academic Class & Board Badge Pill */}
            {currentRole === 'student' && (
              <div className="hidden lg:flex items-center pl-2.5 border-l-2 border-[#FDE68A]">
                <button
                  id="header-class-selector"
                  onClick={() => setActiveView('classes_catalog')}
                  className="flex items-center space-x-1 px-2.5 py-1 text-xs font-black rounded-xl bg-[#D1FAE5] hover:bg-[#6EE7B7] text-[#065F46] border-2 border-[#6EE7B7] transition whitespace-nowrap"
                  title="Change Class or Board"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#065F46]" />
                  <span>{activeGrade?.name || `Grade ${selectedGradeId}`}</span>
                  <span className="text-[#065F46]/40 font-normal">|</span>
                  <span>{activeBoard?.code || 'CBSE'}</span>
                  <ChevronDown className="w-3 h-3 text-[#065F46]" />
                </button>
              </div>
            )}
          </div>

          {/* Center: Quick Links Navigation Bar */}
          {currentRole === 'student' && (
            <nav className="hidden xl:flex items-center bg-[#FEF3C7] p-1 rounded-2xl border-2 border-[#FDE68A] gap-0.5 shadow-2xs">
              <button
                id="nav-dashboard"
                onClick={() => setActiveView('student_dashboard')}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition whitespace-nowrap ${
                  activeView === 'student_dashboard'
                    ? 'bg-white text-[#D97706] shadow-xs'
                    : 'text-[#92400E] hover:bg-white/60 hover:text-[#78350F]'
                }`}
              >
                {t('study_mode', 'Study Mode')}
              </button>
              <button
                id="nav-classes"
                onClick={() => setActiveView('classes_catalog')}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition whitespace-nowrap ${
                  activeView === 'classes_catalog'
                    ? 'bg-white text-[#D97706] shadow-xs'
                    : 'text-[#92400E] hover:bg-white/60 hover:text-[#78350F]'
                }`}
              >
                {t('classes', 'Classes')}
              </button>
              <button
                id="nav-reading-coach"
                onClick={() => setActiveView('reading_coach')}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition whitespace-nowrap ${
                  activeView === 'reading_coach'
                    ? 'bg-white text-[#D97706] shadow-xs'
                    : 'text-[#92400E] hover:bg-white/60 hover:text-[#78350F]'
                }`}
              >
                {t('reading_coach', 'Reading Coach')}
              </button>
              <button
                id="nav-vocabulary"
                onClick={() => setActiveView('vocabulary_vault')}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition whitespace-nowrap ${
                  activeView === 'vocabulary_vault'
                    ? 'bg-white text-[#D97706] shadow-xs'
                    : 'text-[#92400E] hover:bg-white/60 hover:text-[#78350F]'
                }`}
              >
                {t('vocabulary', 'Vocabulary')}
              </button>
              <button
                id="nav-doubts"
                onClick={() => setActiveView('doubt_solver')}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition whitespace-nowrap ${
                  activeView === 'doubt_solver'
                    ? 'bg-white text-[#D97706] shadow-xs'
                    : 'text-[#92400E] hover:bg-white/60 hover:text-[#78350F]'
                }`}
              >
                {t('ask_doubt', 'Ask Doubt')}
              </button>
              <button
                id="nav-revision"
                onClick={() => setActiveView('spaced_revision')}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition whitespace-nowrap ${
                  activeView === 'spaced_revision'
                    ? 'bg-white text-[#D97706] shadow-xs'
                    : 'text-[#92400E] hover:bg-white/60 hover:text-[#78350F]'
                }`}
              >
                {t('revision', 'Revision')}
              </button>
              <button
                id="nav-exam-prep"
                onClick={() => setActiveView('exam_prep')}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition whitespace-nowrap ${
                  activeView === 'exam_prep'
                    ? 'bg-white text-[#D97706] shadow-xs'
                    : 'text-[#92400E] hover:bg-white/60 hover:text-[#78350F]'
                }`}
              >
                {t('exam_prep', 'Exam Prep')}
              </button>
            </nav>
          )}

          {/* Right: Language Dropdown, AI Tutor, Login / Onboard, Voice Narration, Role switch */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* Indian Languages Dropdown Selector */}
            <LanguageSelector variant="header" />

            {/* AI Tutor Primary Button */}
            <button
              id="ask-ai-tutor-header-btn"
              onClick={() => openAITutorWithContext()}
              className="flex items-center space-x-1.5 px-3 py-1.5 sm:py-2 bg-[#F472B6] hover:bg-[#DB2777] text-white rounded-xl text-xs font-black shadow-xs transition transform active:scale-95 whitespace-nowrap"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">{t('ask_ai_tutor', 'Ask AI Tutor')}</span>
            </button>

            {/* Direct Login / Add Account Modal Button */}
            <button
              id="header-login-register-btn"
              onClick={() => openLoginModal(currentRole === 'admin' ? 'admin' : currentRole === 'parent' ? 'parent' : 'student')}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border-2 border-amber-400 bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-black shadow-xs transition whitespace-nowrap"
              title="Add or Login Student / Parent / Admin"
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t('login_onboard', '+ Login / Onboard')}</span>
            </button>

            {/* Speech synthesis audio toggle */}
            <button
              id="speech-toggle-btn"
              onClick={() => (isSpeaking ? stopSpeaking() : speakText(`Welcome to DESHNA AI Learning Hub for Grade ${currentStudent.gradeId}!`))}
              className={`p-2 rounded-xl border-2 text-xs font-bold transition min-h-[36px] min-w-[36px] flex items-center justify-center ${
                isSpeaking ? 'bg-[#FCE7F3] text-[#BE185D] border-[#F472B6] animate-pulse' : 'bg-[#EFF6FF] text-[#1E40AF] border-[#DBEAFE] hover:bg-[#DBEAFE]'
              }`}
              title={isSpeaking ? 'Stop Voice Narration' : 'Test Speech Narration'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Mobile Hamburger Drawer Trigger placed cleanly for mobile/tablet/laptop */}
            <button
              id="header-mobile-menu-btn"
              onClick={onOpenMobileMenu}
              className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-amber-100/80 transition min-w-[36px] min-h-[36px] flex items-center justify-center shrink-0 border border-amber-200"
              aria-label="Open Mobile Menu"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-amber-900" />
            </button>

            {/* Role Switcher Menu */}
            <div className="relative hidden md:block">
              <button
                id="role-switcher-btn"
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="flex items-center space-x-1.5 px-3 py-1.5 sm:py-2 rounded-xl border-2 border-[#DBEAFE] bg-[#EFF6FF] hover:bg-[#DBEAFE] text-xs font-black text-[#1E40AF] transition whitespace-nowrap"
              >
                {currentRole === 'student' && <GraduationCap className="w-4 h-4 text-[#2563EB]" />}
                {currentRole === 'parent' && <Users className="w-4 h-4 text-[#059669]" />}
                {currentRole === 'teacher' && <BookOpen className="w-4 h-4 text-[#D97706]" />}
                {currentRole === 'admin' && <ShieldCheck className="w-4 h-4 text-[#E11D48]" />}
                <span className="capitalize">{currentRole}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#1E40AF]" />
              </button>

              {isRoleMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border-4 border-[#60A5FA] p-3 z-50 space-y-1">
                  <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-[#1E40AF]">
                    Switch Workspace Role
                  </div>
                  <button
                    id="role-select-student"
                    onClick={() => handleRoleSelect('student')}
                    className={`w-full p-2 rounded-xl text-left flex items-center space-x-2 text-xs font-bold transition ${
                      currentRole === 'student' ? 'text-[#1E40AF] font-black bg-[#EFF6FF] border-2 border-[#DBEAFE]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-[#2563EB]" />
                    <div className="flex-1">
                      <p className="font-black">Student Hub</p>
                      <p className="text-[10px] text-slate-500">Personalized learning</p>
                    </div>
                  </button>
                  <button
                    id="role-select-parent"
                    onClick={() => handleRoleSelect('parent')}
                    className={`w-full p-2 rounded-xl text-left flex items-center space-x-2 text-xs font-bold transition ${
                      currentRole === 'parent' ? 'text-[#065F46] font-black bg-[#D1FAE5] border-2 border-[#6EE7B7]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Users className="w-4 h-4 text-[#059669]" />
                    <div className="flex-1">
                      <p className="font-black">Parent Insights</p>
                      <p className="text-[10px] text-slate-500">Growth reports</p>
                    </div>
                  </button>
                  <button
                    id="role-select-teacher"
                    onClick={() => handleRoleSelect('teacher')}
                    className={`w-full p-2 rounded-xl text-left flex items-center space-x-2 text-xs font-bold transition ${
                      currentRole === 'teacher' ? 'text-[#92400E] font-black bg-[#FEF3C7] border-2 border-[#FDE68A]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-[#D97706]" />
                    <div className="flex-1">
                      <p className="font-black">Teacher / Mentor</p>
                      <p className="text-[10px] text-slate-500">Class rosters</p>
                    </div>
                  </button>
                  <button
                    id="role-select-admin"
                    onClick={() => handleRoleSelect('admin')}
                    className={`w-full p-2 rounded-xl text-left flex items-center space-x-2 text-xs font-bold transition ${
                      currentRole === 'admin' ? 'text-[#9F1239] font-black bg-[#FCE7F3] border-2 border-[#F472B6]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-[#E11D48]" />
                    <div className="flex-1">
                      <p className="font-black">Admin CMS</p>
                      <p className="text-[10px] text-slate-500">Curriculum & Qs</p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
