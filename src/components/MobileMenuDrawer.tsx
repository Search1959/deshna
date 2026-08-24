import React from 'react';
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
    selectedBoardId,
    boards,
    grades,
    setIsSearchOpen,
    isSpeaking,
    stopSpeaking,
    speakText,
    openAITutorWithContext,
    openLoginModal,
  } = useApp();

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
    onClose();
  };

  return (
    <div className="fixed inset-0 bottom-16 sm:bottom-[68px] xl:bottom-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Mobile Navigation Menu"
          className="w-screen max-w-sm bg-white border-l-4 border-amber-400 shadow-2xl flex flex-col justify-between overflow-y-auto"
        >
          {/* Top Header */}
          <div className="p-4 border-b-2 border-amber-200/80 bg-amber-50 flex items-center justify-between">
            <button
              onClick={() => navigateTo('landing')}
              className="flex items-center space-x-2.5 text-left group cursor-pointer"
              title="Return to Home Page"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-xs group-hover:scale-105 transition-transform">
                A
              </div>
              <div>
                <span className="font-black text-slate-900 text-base">DESHNA AI HUB</span>
                <p className="text-[11px] font-bold text-amber-800">Learn Smarter • K-12 AI</p>
              </div>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-600 hover:bg-amber-200/60 transition"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 space-y-4 flex-1">
            {/* Current Student Profile Banner */}
            {currentRole === 'student' && (
              <div className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={currentStudent.avatar}
                      alt={currentStudent.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-blue-400"
                    />
                    <div>
                      <div className="font-black text-sm text-slate-900">{currentStudent.name}</div>
                      <div className="text-xs text-blue-700 font-bold">
                        {activeGrade?.name || `Grade ${selectedGradeId}`} • {activeBoard?.code || 'CBSE'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigateTo('classes_catalog')}
                    className="text-[11px] font-black px-2.5 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Change
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-blue-100">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-800 bg-amber-100/70 px-2 py-1 rounded-lg">
                    <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{currentStudent.streakDays} Days Streak</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                    <span>{currentStudent.totalPoints} XP Points</span>
                  </div>
                </div>
              </div>
            )}

            {/* Search Trigger Bar */}
            <button
              onClick={() => {
                onClose();
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-amber-50/80 hover:bg-amber-100/80 border-2 border-amber-200 rounded-2xl text-xs font-bold text-amber-900 transition"
            >
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-amber-600" />
                <span>Search curriculum, topics & Qs</span>
              </div>
              <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded font-bold text-amber-800 border border-amber-200">
                Search
              </kbd>
            </button>

            {/* Student Navigation Links */}
            {currentRole === 'student' && (
              <div className="space-y-1">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-2 py-1">
                  Learning Modes
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: 'student_dashboard', name: 'Study Dashboard', icon: GraduationCap, color: 'text-blue-600 bg-blue-50' },
                    { id: 'classes_catalog', name: 'All Classes & Subjects (Grades 1-11)', icon: BookOpen, color: 'text-amber-600 bg-amber-50' },
                    { id: 'reading_coach', name: 'AI Reading & Fluency Coach', icon: Mic, color: 'text-pink-600 bg-pink-50' },
                    { id: 'vocabulary_vault', name: 'Vocabulary Vault', icon: Brain, color: 'text-purple-600 bg-purple-50' },
                    { id: 'doubt_solver', name: 'Ask 24/7 AI Doubt Solver', icon: HelpCircle, color: 'text-emerald-600 bg-emerald-50' },
                    { id: 'spaced_revision', name: 'Spaced Repetition Revision', icon: Clock, color: 'text-indigo-600 bg-indigo-50' },
                    { id: 'exam_prep', name: 'High-Yield Exam Prep & Mock Tests', icon: Zap, color: 'text-rose-600 bg-rose-50' },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => navigateTo(item.id)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-bold transition ${
                          isActive
                            ? 'bg-amber-100 text-amber-950 border-2 border-amber-300 font-black'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${item.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span>{item.name}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Language Setting Section (Collapsible) */}
            <div className="space-y-1 pt-1">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-2">
                Language Preferences
              </div>
              <div className="p-1 bg-amber-50/90 border-2 border-amber-200 rounded-2xl">
                <LanguageSelector variant="mobile" />
              </div>
            </div>

            {/* Login / Onboard Account Button */}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  onClose();
                  openLoginModal('student');
                }}
                className="w-full py-2.5 px-3 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-black text-xs flex items-center justify-center space-x-2 shadow-xs transition"
              >
                <Users className="w-4 h-4" />
                <span>+ Login / Register Account</span>
              </button>
            </div>

            {/* Switch Role Section */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-2 py-1">
                Switch Role / Portal
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => changeRole('student')}
                  className={`p-2.5 rounded-xl text-xs font-black flex items-center space-x-2 border transition ${
                    currentRole === 'student'
                      ? 'bg-blue-100 text-blue-900 border-blue-300'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Student</span>
                </button>
                <button
                  onClick={() => changeRole('parent')}
                  className={`p-2.5 rounded-xl text-xs font-black flex items-center space-x-2 border transition ${
                    currentRole === 'parent'
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Parent</span>
                </button>
                <button
                  onClick={() => changeRole('teacher')}
                  className={`p-2.5 rounded-xl text-xs font-black flex items-center space-x-2 border transition ${
                    currentRole === 'teacher'
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Teacher</span>
                </button>
                <button
                  onClick={() => changeRole('admin')}
                  className={`p-2.5 rounded-xl text-xs font-black flex items-center space-x-2 border transition ${
                    currentRole === 'admin'
                      ? 'bg-rose-100 text-rose-900 border-rose-300'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  <span>Admin CMS</span>
                </button>
              </div>
            </div>

            {/* Switch Student Profile (if student) */}
            {currentRole === 'student' && allStudents.length > 1 && (
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-2 py-1">
                  Other Student Profiles
                </div>
                <div className="space-y-1">
                  {allStudents
                    .filter((s) => s.id !== currentStudent.id)
                    .map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          switchStudent(s.id);
                          onClose();
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 border border-slate-100"
                      >
                        <div className="flex items-center space-x-2">
                          <img src={s.avatar} alt={s.name} className="w-6 h-6 rounded-full object-cover" />
                          <span>{s.name}</span>
                          <span className="text-[10px] text-slate-500">(Grade {s.gradeId})</span>
                        </div>
                        <span className="text-[10px] text-blue-600 font-bold">Switch</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer Controls */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                isSpeaking ? stopSpeaking() : speakText(`DESHNA AI Learning Hub is ready for Grade ${currentStudent.gradeId}`);
              }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-black border transition ${
                isSpeaking
                  ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? 'Stop Voice' : 'Voice Narration'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                openAITutorWithContext();
              }}
              className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl text-xs font-black shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Tutor</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
