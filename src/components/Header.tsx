import React, { useState, useRef, useEffect } from 'react';
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
  HelpCircle,
  Sparkles,
  LayoutDashboard,
  Mic,
  Brain,
  RotateCcw,
  Clock,
  Compass,
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
    openHelpModal,
    isSpeaking,
    stopSpeaking,
    speakText,
    openLoginModal,
    t,
  } = useApp();

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isStudyMenuOpen, setIsStudyMenuOpen] = useState(false);

  const studyMenuRef = useRef<HTMLDivElement>(null);
  const roleMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        studyMenuRef.current &&
        !studyMenuRef.current.contains(event.target as Node)
      ) {
        setIsStudyMenuOpen(false);
      }
      if (
        roleMenuRef.current &&
        !roleMenuRef.current.contains(event.target as Node)
      ) {
        setIsRoleMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
    setIsRoleMenuOpen(false);
  };

  const activeBoard = boards.find((b) => b.id === selectedBoardId);
  const activeGrade = grades.find((g) => g.id === selectedGradeId);

  const studyModules = [
    {
      id: 'classes_catalog',
      name: t('classes', 'Classes & Syllabus'),
      shortName: 'Classes',
      icon: BookOpen,
      desc: 'All curriculum subjects, chapters & topics',
      badge: 'Syllabus',
      color: 'text-amber-700 bg-amber-100/80 border-amber-300',
    },
    {
      id: 'student_dashboard',
      name: t('study_mode', 'Daily Study Dashboard'),
      shortName: 'Study Mode',
      icon: LayoutDashboard,
      desc: 'Streaks, XP, daily plan & progress',
      badge: 'Daily Plan',
      color: 'text-blue-700 bg-blue-100/80 border-blue-300',
    },
    {
      id: 'reading_coach',
      name: t('reading_coach', 'Reading Coach (Speech AI)'),
      shortName: 'Reading Coach',
      icon: Mic,
      desc: 'AI speech fluency, accuracy & speed',
      badge: 'Speech AI',
      color: 'text-pink-700 bg-pink-100/80 border-pink-300',
    },
    {
      id: 'vocabulary_vault',
      name: t('vocabulary', 'Vocabulary Vault'),
      shortName: 'Vocabulary',
      icon: Brain,
      desc: 'Word flashcards, definitions & meanings',
      badge: 'Words',
      color: 'text-purple-700 bg-purple-100/80 border-purple-300',
    },
    {
      id: 'doubt_solver',
      name: t('ask_doubt', 'Ask Doubt Solver'),
      shortName: 'Ask Doubt',
      icon: HelpCircle,
      desc: 'Instant camera, equation & step solver',
      badge: '24/7 AI',
      color: 'text-indigo-700 bg-indigo-100/80 border-indigo-300',
    },
    {
      id: 'spaced_revision',
      name: t('revision', 'Spaced Repetition Revision'),
      shortName: 'Revision',
      icon: RotateCcw,
      desc: 'Smart flashcards for permanent memory',
      badge: 'Memory',
      color: 'text-cyan-700 bg-cyan-100/80 border-cyan-300',
    },
    {
      id: 'exam_prep',
      name: t('exam_prep', 'Mock Exam Prep & Tests'),
      shortName: 'Exam Prep',
      icon: Clock,
      desc: 'Timed board papers, time trials & mocks',
      badge: 'Tests',
      color: 'text-emerald-700 bg-emerald-100/80 border-emerald-300',
    },
  ];

  const currentActiveModule = studyModules.find((m) => m.id === activeView);

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
                  className="flex items-center space-x-1 px-2.5 py-1 text-xs font-black rounded-xl bg-[#D1FAE5] hover:bg-[#6EE7B7] text-[#065F46] border-2 border-[#6EE7B7] transition whitespace-nowrap cursor-pointer shadow-2xs"
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

          {/* Center: Streamlined Dropdown List for Study Modules (No Horizontal Overflow) */}
          {currentRole === 'student' && (
            <div className="hidden md:flex items-center space-x-1.5" ref={studyMenuRef}>
              {/* Quick direct access to Classes & Exam Prep */}
              <button
                id="header-quick-classes-btn"
                onClick={() => setActiveView('classes_catalog')}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition whitespace-nowrap cursor-pointer border-2 ${
                  activeView === 'classes_catalog'
                    ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-xs'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
                }`}
              >
                {t('classes', 'Classes')}
              </button>

              <button
                id="header-quick-exam-btn"
                onClick={() => setActiveView('exam_prep')}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition whitespace-nowrap cursor-pointer border-2 ${
                  activeView === 'exam_prep'
                    ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-xs'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
                }`}
              >
                {t('exam_prep', 'Exam Prep')}
              </button>

              {/* Study Modules Dropdown Trigger */}
              <div className="relative">
                <button
                  id="study-modules-dropdown-btn"
                  onClick={() => setIsStudyMenuOpen(!isStudyMenuOpen)}
                  className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-black rounded-xl transition whitespace-nowrap cursor-pointer border-2 shadow-2xs ${
                    isStudyMenuOpen || (currentActiveModule && currentActiveModule.id !== 'classes_catalog' && currentActiveModule.id !== 'exam_prep')
                      ? 'bg-amber-500 text-white border-amber-600'
                      : 'bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] border-[#FDE68A]'
                  }`}
                  title="Explore All Study Modules"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {currentActiveModule && currentActiveModule.id !== 'classes_catalog' && currentActiveModule.id !== 'exam_prep'
                      ? currentActiveModule.shortName
                      : t('study_hub', 'Study Modules')}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isStudyMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu Panel */}
                {isStudyMenuOpen && (
                  <div
                    id="study-modules-dropdown-panel"
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border-4 border-amber-400 p-2.5 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-amber-900 flex items-center justify-between border-b border-amber-100 pb-1.5">
                      <span>Explore Learning Modules</span>
                      <span className="text-[10px] text-amber-700 font-bold">7 Interactive Modes</span>
                    </div>

                    <div className="grid grid-cols-1 gap-1 max-h-[380px] overflow-y-auto pt-1">
                      {studyModules.map((module) => {
                        const IconComp = module.icon;
                        const isCurrent = activeView === module.id;
                        return (
                          <button
                            key={module.id}
                            id={`study-mod-link-${module.id}`}
                            onClick={() => {
                              setActiveView(module.id as any);
                              setIsStudyMenuOpen(false);
                            }}
                            className={`w-full p-2 rounded-xl text-left flex items-start space-x-2.5 transition border cursor-pointer ${
                              isCurrent
                                ? 'bg-amber-100/90 text-amber-950 border-amber-400 font-black shadow-2xs'
                                : 'hover:bg-amber-50/70 text-slate-800 border-transparent hover:border-amber-200'
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${module.color}`}
                            >
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-black text-xs truncate">
                                  {module.name}
                                </span>
                                <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-amber-200/80 text-amber-900 font-black shrink-0">
                                  {module.badge}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                                {module.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Right: Help Button, Language Dropdown, AI Tutor, Login / Onboard, Voice Narration, Role switch */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* Student & Parent Help Guide Button */}
            <button
              id="header-student-help-btn"
              onClick={openHelpModal}
              className="flex items-center space-x-1.5 px-2 sm:px-3 py-1.5 sm:py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-2 border-emerald-300 rounded-xl text-xs font-black shadow-2xs transition transform active:scale-95 whitespace-nowrap cursor-pointer"
              title="Open Student & Parent Help Guide"
            >
              <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              <span className="hidden sm:inline">{t('help_guide', 'Student Help')}</span>
              <span className="inline sm:hidden text-[10px] font-black">{t('help_short', 'Help')}</span>
            </button>

            {/* Indian Languages Dropdown Selector */}
            <LanguageSelector variant="header" />

            {/* AI Tutor Primary Button */}
            <button
              id="ask-ai-tutor-header-btn"
              onClick={() => openAITutorWithContext()}
              className="flex items-center space-x-1.5 px-3 py-1.5 sm:py-2 bg-[#F472B6] hover:bg-[#DB2777] text-white rounded-xl text-xs font-black shadow-xs transition transform active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">{t('ask_ai_tutor', 'Ask AI Tutor')}</span>
            </button>

            {/* Direct Login / Add Account Modal Button */}
            <button
              id="header-login-register-btn"
              onClick={() => openLoginModal(currentRole === 'admin' ? 'admin' : currentRole === 'parent' ? 'parent' : 'student')}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border-2 border-amber-400 bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-black shadow-xs transition whitespace-nowrap cursor-pointer"
              title="Add or Login Student / Parent / Admin"
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t('login_onboard', '+ Login / Onboard')}</span>
            </button>

            {/* Speech synthesis audio toggle */}
            <button
              id="speech-toggle-btn"
              onClick={() => (isSpeaking ? stopSpeaking() : speakText(`Welcome to DESHNA AI Learning Hub for Grade ${currentStudent.gradeId}!`))}
              className={`p-2 rounded-xl border-2 text-xs font-bold transition min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer ${
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
              className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-amber-100/80 transition min-w-[36px] min-h-[36px] flex items-center justify-center shrink-0 border border-amber-200 cursor-pointer"
              aria-label="Open Mobile Menu"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-amber-900" />
            </button>

            {/* Role Switcher Menu */}
            <div className="relative hidden md:block" ref={roleMenuRef}>
              <button
                id="role-switcher-btn"
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="flex items-center space-x-1.5 px-3 py-1.5 sm:py-2 rounded-xl border-2 border-[#DBEAFE] bg-[#EFF6FF] hover:bg-[#DBEAFE] text-xs font-black text-[#1E40AF] transition whitespace-nowrap cursor-pointer"
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
                    className={`w-full p-2 rounded-xl text-left flex items-center space-x-2 text-xs font-bold transition cursor-pointer ${
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
                    className={`w-full p-2 rounded-xl text-left flex items-center space-x-2 text-xs font-bold transition cursor-pointer ${
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
                    className={`w-full p-2 rounded-xl text-left flex items-center space-x-2 text-xs font-bold transition cursor-pointer ${
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
                    className={`w-full p-2 rounded-xl text-left flex items-center space-x-2 text-xs font-bold transition cursor-pointer ${
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

