import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Zap,
  Search,
  BookOpen,
  Bot,
  GraduationCap,
  Play,
  Sparkles,
  ChevronRight,
  Flame,
  Star,
  CheckCircle2,
  HelpCircle,
  Mic,
  RotateCcw,
  Clock,
  Compass,
  Layers,
  Award,
  ArrowRight,
} from 'lucide-react';

type CardFilterTab = 'all' | 'tests' | 'speech' | 'subjects' | 'ai';

export const MobileStudentHub: React.FC = () => {
  const {
    currentStudent,
    selectedGradeId,
    setSelectedGradeId,
    openExamPrep,
    setActiveView,
    setSelectedSubjectId,
    openAITutorWithContext,
    openHelpModal,
    getFilteredSubjects,
    getChaptersForSubject,
    localizeSubject,
    t,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<CardFilterTab>('all');

  const currentGrade = selectedGradeId || currentStudent.gradeId;
  const isJunior = currentGrade <= 5;

  const studentSubjects = getFilteredSubjects(
    currentStudent.boardId,
    currentGrade,
    currentStudent.streamId
  ).map(localizeSubject);

  return (
    <div className="space-y-4 pb-6">
      {/* 1. Header Profile & Progress Card */}
      <div className="bg-white p-4 rounded-3xl border-2 border-amber-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3 min-w-0">
            <img
              src={currentStudent.avatar}
              alt={currentStudent.name}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-amber-400 shrink-0 shadow-xs"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="text-base font-black text-slate-900 truncate">
                  {t('greeting', 'Hello')}, {currentStudent.name.split(' ')[0]}! 👋
                </h1>
              </div>
              <p className="text-xs text-slate-500 font-bold">
                {isJunior ? '🌱 Junior Scholar' : '🎓 Senior Scholar'} • {currentStudent.boardId.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Streak Badge */}
            <div className="flex items-center space-x-1 bg-amber-50 border border-amber-300 px-2.5 py-1.5 rounded-xl shadow-2xs">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-xs font-black text-amber-900">{currentStudent.streakDays}d</span>
            </div>
            {/* XP Stars */}
            <div className="flex items-center space-x-1 bg-yellow-50 border border-yellow-300 px-2.5 py-1.5 rounded-xl shadow-2xs">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-black text-yellow-900">{currentStudent.totalPoints}</span>
            </div>
          </div>
        </div>

        {/* Grade Selection Slider */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-black text-slate-700 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-600" />
              <span>Selected Grade:</span>
            </span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
              Active: Grade {currentGrade}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {Array.from({ length: 11 }, (_, i) => i + 1).map((g) => {
              const isSel = currentGrade === g;
              const isGJun = g <= 5;
              return (
                <button
                  key={g}
                  onClick={() => setSelectedGradeId(g)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1 cursor-pointer ${
                    isSel
                      ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-400'
                      : 'bg-slate-100 hover:bg-amber-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{isGJun ? '🌱' : '🎓'}</span>
                  <span>Gr {g}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Filter Navigation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: '🌟 All Cards' },
          { id: 'tests', label: '📝 Mock Tests' },
          { id: 'speech', label: '🎙️ Speech & Reading' },
          { id: 'subjects', label: '📚 Subjects' },
          { id: 'ai', label: '🤖 AI Tutor' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as CardFilterTab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all shrink-0 cursor-pointer ${
              activeFilter === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Card-Based Main Action Cards Grid */}
      <div className="space-y-3.5">
        {/* CARD 1: 📝 Mock Exam Center (Grade-Wise 30-Question Tests) */}
        {(activeFilter === 'all' || activeFilter === 'tests') && (
          <div className="p-4 rounded-3xl bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 text-white shadow-md space-y-3 border-2 border-rose-400">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-white/20 text-rose-100 border border-white/30 backdrop-blur-xs">
                  {isJunior ? 'Fun Quiz Zone' : 'Official Board Format'}
                </span>
                <h2 className="text-base font-black text-white leading-tight flex items-center gap-1.5">
                  <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>Grade {currentGrade} Mock Exams</span>
                </h2>
                <p className="text-xs text-rose-100 font-medium">
                  {isJunior
                    ? 'Play interactive visual quizzes across all your primary subjects!'
                    : 'Authentic 30 unique questions per exam with timer & solutions.'}
                </p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 border border-white/30">
                <Play className="w-5 h-5 fill-white" />
              </div>
            </div>

            <button
              onClick={() => openExamPrep('mock_tests', currentGrade)}
              className="w-full py-3 bg-white hover:bg-rose-50 text-rose-700 font-black text-xs sm:text-sm rounded-2xl shadow-sm flex items-center justify-center space-x-2 active:scale-95 transition min-h-[46px] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-rose-700" />
              <span>
                {isJunior
                  ? `Start Grade ${currentGrade} Quiz (${studentSubjects.length} Subjects)`
                  : `Launch Grade ${currentGrade} Mock Exam (30 Qs)`}
              </span>
            </button>
          </div>
        )}

        {/* CARD 2: 🎙️ AI Reading & Speech Coach (Read Aloud) */}
        {(activeFilter === 'all' || activeFilter === 'speech') && (
          <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-teal-700 text-white shadow-md space-y-3 border-2 border-emerald-400">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-white/20 text-emerald-100 border border-white/30 backdrop-blur-xs">
                  Voice Fluency & Pronunciation
                </span>
                <h2 className="text-base font-black text-white leading-tight flex items-center gap-1.5">
                  <Mic className="w-4 h-4 text-emerald-200" />
                  <span>Speech & Reading Coach</span>
                </h2>
                <p className="text-xs text-emerald-100 font-medium">
                  Read stories in English & Hindi, check live spoken accuracy, and test your reading speed!
                </p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 border border-white/30">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
            </div>

            <button
              onClick={() => setActiveView('reading_coach')}
              className="w-full py-3 bg-white hover:bg-emerald-50 text-emerald-800 font-black text-xs sm:text-sm rounded-2xl shadow-sm flex items-center justify-center space-x-2 active:scale-95 transition min-h-[46px] cursor-pointer"
            >
              <Mic className="w-4 h-4 text-emerald-700" />
              <span>Start Reading Practice (English & Hindi)</span>
            </button>
          </div>
        )}

        {/* CARD 3: 🔍 Instant Question Search & Bank */}
        {(activeFilter === 'all' || activeFilter === 'tests') && (
          <div className="p-4 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 text-white shadow-md space-y-3 border-2 border-blue-400">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-white/20 text-blue-100 border border-white/30 backdrop-blur-xs">
                  Instant Solutions
                </span>
                <h2 className="text-base font-black text-white leading-tight flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-blue-200" />
                  <span>Search Grade {currentGrade} Questions</span>
                </h2>
                <p className="text-xs text-blue-100 font-medium">
                  Search any topic, chapter, or formula to get step-by-step explanations.
                </p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 border border-white/30">
                <Search className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Quick Topic Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none text-[11px]">
              <span className="text-blue-200 font-bold shrink-0">Popular:</span>
              {(isJunior
                ? ['Numbers', 'Shapes', 'Animals', 'Spelling']
                : ['Algebra', 'Light & Optics', 'Chemical Reactions', 'Grammar']
              ).map((topic) => (
                <button
                  key={topic}
                  onClick={() => openExamPrep('search_questions', currentGrade)}
                  className="px-2.5 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold transition shrink-0 border border-white/20 cursor-pointer"
                >
                  {topic}
                </button>
              ))}
            </div>

            <button
              onClick={() => openExamPrep('search_questions', currentGrade)}
              className="w-full py-3 bg-white hover:bg-blue-50 text-blue-700 font-black text-xs sm:text-sm rounded-2xl shadow-sm flex items-center justify-center space-x-2 active:scale-95 transition min-h-[46px] cursor-pointer"
            >
              <Search className="w-4 h-4 text-blue-700" />
              <span>Search Question Bank (Grade {currentGrade})</span>
            </button>
          </div>
        )}

        {/* CARD 4: 📚 My Subjects Grid */}
        {(activeFilter === 'all' || activeFilter === 'subjects') && (
          <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <h2 className="font-black text-sm text-slate-900">
                  Grade {currentGrade} Subjects ({studentSubjects.length})
                </h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                {isJunior ? 'Primary Curriculum' : 'Secondary Curriculum'}
              </span>
            </div>

            {/* Subject Cards Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {studentSubjects.map((subj) => {
                const chapCount = getChaptersForSubject(subj.id).length;
                return (
                  <button
                    key={subj.id}
                    onClick={() => {
                      setSelectedSubjectId(subj.id);
                      setActiveView('subject_detail');
                    }}
                    className="p-3.5 rounded-2xl border-2 border-slate-100 hover:border-amber-400 bg-slate-50/80 hover:bg-amber-50/40 text-left space-y-1.5 transition active:scale-[0.98] cursor-pointer shadow-2xs group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                        {subj.code}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 transition" />
                    </div>
                    <div className="font-bold text-xs text-slate-900 line-clamp-1">
                      {subj.name}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {chapCount} {chapCount === 1 ? 'Chapter' : 'Chapters'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* CARD 5: 24/7 AI Tutor & Learning Boosters */}
        {(activeFilter === 'all' || activeFilter === 'ai') && (
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => openAITutorWithContext()}
              className="p-3.5 rounded-3xl bg-gradient-to-br from-violet-600 to-purple-700 text-white text-left space-y-1 shadow-sm active:scale-[0.98] transition cursor-pointer border border-violet-400"
            >
              <Bot className="w-5 h-5 text-white" />
              <div className="font-black text-xs">24/7 AI Tutor</div>
              <div className="text-[10px] text-violet-200 font-medium">
                Ask any doubt anytime
              </div>
            </button>

            <button
              onClick={() => setActiveView('spaced_revision')}
              className="p-3.5 rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-600 text-white text-left space-y-1 shadow-sm active:scale-[0.98] transition cursor-pointer border border-cyan-400"
            >
              <RotateCcw className="w-5 h-5 text-white" />
              <div className="font-black text-xs">Daily Revision</div>
              <div className="text-[10px] text-cyan-100 font-medium">
                Spaced flashcards
              </div>
            </button>
          </div>
        )}

        {/* CARD 6: Student Help & Web App Guide */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-200 flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4 text-amber-800" />
            </div>
            <div>
              <p className="text-xs font-black text-amber-950">New to this app?</p>
              <p className="text-[11px] text-amber-800 font-medium">Tap to view a quick 1-minute student guide.</p>
            </div>
          </div>
          <button
            onClick={openHelpModal}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-black rounded-xl shrink-0 cursor-pointer shadow-2xs"
          >
            Guide
          </button>
        </div>
      </div>
    </div>
  );
};
