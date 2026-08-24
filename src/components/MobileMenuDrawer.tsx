import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { LanguageSelector } from './LanguageSelector';
import {
  X,
  GraduationCap,
  Users,
  BookOpen,
  ShieldCheck,
  Search,
  Sparkles,
  Flame,
  Star,
  Mic,
  Brain,
  HelpCircle,
  Clock,
  RotateCcw,
  Zap,
  Volume2,
  VolumeX,
  ChevronRight,
  Plus,
  Home,
  Bot,
  Globe,
  UserCheck,
  ChevronDown,
} from 'lucide-react';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({ isOpen, onClose }) => {
  const {
    currentRole,
    setCurrentRole,
    activeView,
    setActiveView,
    currentStudent,
    allStudents,
    switchStudent,
    selectedGradeId,
    setSelectedGradeId,
    selectedBoardId,
    boards,
    grades,
    setIsSearchOpen,
    isSpeaking,
    stopSpeaking,
    speakText,
    openAITutorWithContext,
    openLoginModal,
    t,
  } = useApp();

  const [isStudentListOpen, setIsStudentListOpen] = useState(false);
  const [isGradeSelectorOpen, setIsGradeSelectorOpen] = useState(false);

  if (!isOpen) return null;

  const activeBoard = boards.find((b) => b.id === selectedBoardId);
  const activeGrade = grades.find((g) => g.id === selectedGradeId);

  const navigateTo = (view: any) => {
    setActiveView(view);
    if (view === 'landing') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        const heroEl = document.getElementById('home-hero-section');
        if (heroEl) {
          heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    }
    onClose();
  };

  const changeRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'parent') setActiveView('parent_dashboard');
    else if (role === 'teacher') setActiveView('teacher_dashboard');
    else if (role === 'admin') setActiveView('admin_dashboard');
    else setActiveView('student_dashboard');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Dark backdrop overlay covering remaining screen */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Drawer Panel: Responsive width (88vw on small phones, max-w-sm on tablets/desktops), no horizontal cutoffs */}
      <aside
        aria-label="Mobile Navigation Menu"
        className="relative w-[88vw] sm:w-96 max-w-[400px] h-full bg-white border-l-2 sm:border-l-4 border-amber-400 shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200"
      >
        {/* Top Header */}
        <div className="px-3.5 py-3 sm:px-4 sm:py-3.5 border-b-2 border-amber-200/80 bg-gradient-to-r from-amber-100/90 to-amber-50 flex items-center justify-between shrink-0">
          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center space-x-2.5 text-left group cursor-pointer min-w-0"
            title="Return to Home Page"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-lg sm:text-xl shadow-xs group-hover:scale-105 transition-transform shrink-0">
              A
            </div>
            <div className="min-w-0">
              <div className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-1.5 leading-tight truncate">
                <span>DESHNA</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-black border border-amber-300 shrink-0">
                  AI HUB
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold text-amber-800 truncate">
                {t('tagline', 'Learn Smarter • Practice Better')}
              </p>
            </div>
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-700 hover:bg-amber-200/80 transition min-w-[36px] min-h-[36px] flex items-center justify-center shrink-0 ml-1"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="px-3.5 py-3 sm:px-4 sm:py-4 space-y-3.5 overflow-y-auto flex-1 divide-y divide-slate-100">
          {/* Quick Academic Grade & Board Switcher Bar */}
          <div className="space-y-2 pb-1">
            <div className="flex items-center justify-between bg-emerald-50 border-2 border-emerald-200 p-2 rounded-xl">
              <div className="flex items-center space-x-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-black text-emerald-950 truncate block">
                    {activeGrade?.name || `Grade ${selectedGradeId}`} • {activeBoard?.code || 'CBSE'}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold block">Active Curriculum</span>
                </div>
              </div>
              <button
                onClick={() => setIsGradeSelectorOpen(!isGradeSelectorOpen)}
                className="text-[11px] font-black px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition shrink-0 flex items-center space-x-1"
              >
                <span>Change</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isGradeSelectorOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Collapsible Grade Picker */}
            {isGradeSelectorOpen && (
              <div className="p-2.5 bg-white border-2 border-emerald-300 rounded-xl space-y-2 animate-in fade-in zoom-in-95 duration-150 shadow-xs">
                <div className="text-[11px] font-black text-slate-700">Select Grade:</div>
                <div className="grid grid-cols-4 gap-1.5">
                  {Array.from({ length: 11 }, (_, i) => i + 1).map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        setSelectedGradeId(g);
                        setIsGradeSelectorOpen(false);
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-black transition ${
                        selectedGradeId === g
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
                      }`}
                    >
                      Gr {g}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Search & Fast Action */}
            <button
              onClick={() => {
                onClose();
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-3 py-2 bg-amber-50 hover:bg-amber-100/80 border-2 border-amber-200 rounded-xl text-xs font-bold text-amber-950 transition min-w-0"
            >
              <div className="flex items-center space-x-2 min-w-0">
                <Search className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="truncate text-slate-700">{t('search_placeholder', 'Search syllabus, topics, Qs...')}</span>
              </div>
              <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded font-bold text-amber-800 border border-amber-200 shrink-0 ml-1">
                Search
              </kbd>
            </button>

            {/* Login / Register Account Button */}
            <button
              onClick={() => {
                onClose();
                openLoginModal(currentRole === 'admin' ? 'admin' : currentRole === 'parent' ? 'parent' : 'student');
              }}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 rounded-xl font-black text-xs flex items-center justify-center space-x-2 shadow-xs transition"
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>{t('login_onboard', '+ Login / Onboard Account')}</span>
            </button>
          </div>

          {/* 1. PRIMARY HEADER NAVIGATION LINKS */}
          <div className="pt-3 space-y-1">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1 py-0.5">
              Main Menu & Navigation
            </div>
            <div className="grid grid-cols-1 gap-1">
              {/* Home */}
              <button
                onClick={() => navigateTo('landing')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-bold transition ${
                  activeView === 'landing'
                    ? 'bg-amber-100 text-amber-950 border-2 border-amber-300 font-black'
                    : 'hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-amber-100 text-amber-800 shrink-0">
                    <Home className="w-4 h-4" />
                  </div>
                  <span className="truncate">Home (मुख्य पृष्ठ)</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {/* All Classes (Grades 1-11) */}
              <button
                onClick={() => navigateTo('classes_catalog')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-bold transition ${
                  activeView === 'classes_catalog'
                    ? 'bg-amber-100 text-amber-950 border-2 border-amber-300 font-black'
                    : 'hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-blue-100 text-blue-800 shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold block truncate">{t('classes', 'Classes & Curriculum')}</span>
                    <span className="block text-[10px] text-slate-500 font-medium truncate">Grades 1–11 (CBSE, ICSE, State)</span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {/* Study Mode / Student Dashboard */}
              <button
                onClick={() => navigateTo('student_dashboard')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-bold transition ${
                  activeView === 'student_dashboard'
                    ? 'bg-amber-100 text-amber-950 border-2 border-amber-300 font-black'
                    : 'hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-100 text-emerald-800 shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold block truncate">{t('study_mode', 'Study Dashboard')}</span>
                    <span className="block text-[10px] text-slate-500 font-medium truncate">Adaptive Practice & Syllabus</span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {/* Exam Prep (30-Question Mock Tests) */}
              <button
                onClick={() => navigateTo('exam_prep')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-bold transition ${
                  activeView === 'exam_prep'
                    ? 'bg-rose-100 text-rose-950 border-2 border-rose-300 font-black'
                    : 'hover:bg-rose-50 text-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-rose-100 text-rose-700 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-black text-rose-900 block truncate">{t('exam_prep', 'Board & Exam Prep')}</span>
                    <span className="block text-[10px] text-rose-600 font-medium truncate">30-Question Full Mock Tests</span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              </button>
            </div>
          </div>

          {/* 2. AI LEARNING TOOLS & FEATURES */}
          <div className="pt-3 space-y-1">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1 py-0.5">
              AI Learning Features
            </div>
            <div className="grid grid-cols-1 gap-1">
              {[
                {
                  id: 'ai_tutor_action',
                  name: t('ask_ai_tutor', 'Ask 24/7 AI Tutor'),
                  sub: 'Step-by-step conceptual help',
                  icon: Bot,
                  color: 'text-pink-700 bg-pink-100',
                  action: () => {
                    onClose();
                    openAITutorWithContext();
                  },
                },
                {
                  id: 'reading_coach',
                  name: t('reading_coach', 'AI Reading Coach'),
                  sub: 'Speech & phonics fluency',
                  icon: Mic,
                  color: 'text-rose-700 bg-rose-100',
                  action: () => navigateTo('reading_coach'),
                },
                {
                  id: 'doubt_solver',
                  name: t('ask_doubt', 'Instant Doubt Solver'),
                  sub: 'Socratic step-by-step guidance',
                  icon: HelpCircle,
                  color: 'text-teal-700 bg-teal-100',
                  action: () => navigateTo('doubt_solver'),
                },
                {
                  id: 'vocabulary_vault',
                  name: t('vocabulary', 'Vocabulary Vault'),
                  sub: 'Word mastery & definitions',
                  icon: Brain,
                  color: 'text-purple-700 bg-purple-100',
                  action: () => navigateTo('vocabulary_vault'),
                },
                {
                  id: 'spaced_revision',
                  name: t('revision', 'Spaced Revision'),
                  sub: 'Long-term memory retention',
                  icon: Clock,
                  color: 'text-indigo-700 bg-indigo-100',
                  action: () => navigateTo('spaced_revision'),
                },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs font-bold transition ${
                      isActive
                        ? 'bg-amber-100 text-amber-950 border-2 border-amber-300 font-black'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">{item.name}</div>
                        <div className="text-[10px] text-slate-500 font-medium truncate">{item.sub}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. PORTALS & ROLE SWITCHER */}
          <div className="pt-3 space-y-1">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1 py-0.5">
              Portals & User Roles
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => changeRole('student')}
                className={`p-2 rounded-xl text-xs font-black flex items-center space-x-2 border transition ${
                  currentRole === 'student'
                    ? 'bg-blue-100 text-blue-900 border-blue-300 ring-2 ring-blue-300'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">Student Hub</span>
              </button>

              <button
                onClick={() => changeRole('parent')}
                className={`p-2 rounded-xl text-xs font-black flex items-center space-x-2 border transition ${
                  currentRole === 'parent'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300 ring-2 ring-emerald-300'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">Parent Portal</span>
              </button>

              <button
                onClick={() => changeRole('teacher')}
                className={`p-2 rounded-xl text-xs font-black flex items-center space-x-2 border transition ${
                  currentRole === 'teacher'
                    ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-300'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="truncate">Teacher Mode</span>
              </button>

              <button
                onClick={() => changeRole('admin')}
                className={`p-2 rounded-xl text-xs font-black flex items-center space-x-2 border transition ${
                  currentRole === 'admin'
                    ? 'bg-rose-100 text-rose-900 border-rose-300 ring-2 ring-rose-300'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="truncate">Admin Console</span>
              </button>
            </div>
          </div>

          {/* 4. LANGUAGE SETTINGS (Collapsible Indian Languages) */}
          <div className="pt-3 space-y-1">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1 py-0.5">
              {t('switch_language', 'Language Preferences')}
            </div>
            <div className="p-1 bg-amber-50/90 border-2 border-amber-200 rounded-2xl">
              <LanguageSelector variant="mobile" />
            </div>
          </div>

          {/* 5. ACTIVE LEARNER PROFILE & SWITCHER */}
          <div className="pt-3 space-y-2">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1 py-0.5">
              Active Student Profile
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <img
                    src={currentStudent.avatar}
                    alt={currentStudent.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-400 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-black text-xs text-slate-900 truncate">{currentStudent.name}</div>
                    <div className="text-[11px] text-blue-700 font-bold truncate">
                      {activeGrade?.name || `Grade ${selectedGradeId}`} • {activeBoard?.code || 'CBSE'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsStudentListOpen(!isStudentListOpen)}
                  className="text-[11px] font-black px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-1 shrink-0 ml-1"
                >
                  <span>Switch</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              {/* Collapsible other student list */}
              {isStudentListOpen && (
                <div className="space-y-1 pt-2 border-t border-blue-200 animate-in fade-in duration-150">
                  {allStudents.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        switchStudent(s.id);
                        setIsStudentListOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-1.5 rounded-lg text-xs font-bold transition ${
                        s.id === currentStudent.id
                          ? 'bg-blue-200 text-blue-900 font-black'
                          : 'bg-white text-slate-700 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2 min-w-0">
                        <img src={s.avatar} alt={s.name} className="w-5 h-5 rounded-full object-cover shrink-0" />
                        <span className="truncate">{s.name} (Grade {s.gradeId})</span>
                      </div>
                      {s.id === currentStudent.id && <span className="text-[10px] text-blue-700 font-black shrink-0">Active</span>}
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <div className="flex items-center space-x-1 text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md truncate">
                  <Flame className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                  <span className="truncate">{currentStudent.streakDays}d Streak</span>
                </div>
                <div className="flex items-center space-x-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md truncate">
                  <Star className="w-3 h-3 text-emerald-500 fill-emerald-500 shrink-0" />
                  <span className="truncate">{currentStudent.totalPoints} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Bottom Bar: Voice narration toggle & AI Tutor button */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2 shrink-0">
          <button
            onClick={() => {
              isSpeaking ? stopSpeaking() : speakText(`Welcome to DESHNA AI Learning Hub for Grade ${currentStudent.gradeId}`);
            }}
            className={`flex-1 flex items-center justify-center space-x-1.5 py-2.5 rounded-xl text-xs font-black border transition min-h-[42px] ${
              isSpeaking
                ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? 'Stop Voice' : 'Voice'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              openAITutorWithContext();
            }}
            className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl text-xs font-black shadow-sm min-h-[42px]"
          >
            <Bot className="w-4 h-4" />
            <span>AI Tutor</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
