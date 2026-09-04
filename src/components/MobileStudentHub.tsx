import React from 'react';
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
} from 'lucide-react';

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
    localizeSubject,
    t,
  } = useApp();

  const isJunior = (selectedGradeId || currentStudent.gradeId) <= 5;
  const currentGrade = selectedGradeId || currentStudent.gradeId;

  const studentSubjects = getFilteredSubjects(
    currentStudent.boardId,
    currentGrade,
    currentStudent.streamId
  ).map(localizeSubject);

  return (
    <div className="space-y-4 pb-4">
      {/* 1. Grade-Adaptive Mobile Welcome Header Card */}
      <div
        className={`p-4 rounded-2xl text-white shadow-md relative overflow-hidden transition-all ${
          isJunior
            ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 border-b-4 border-emerald-800'
            : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 border-b-4 border-indigo-900'
        }`}
      >
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0">
            <img
              src={currentStudent.avatar}
              alt={currentStudent.name}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/50 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="text-base font-black truncate text-white">
                  {t('greeting', 'Hello')}, {currentStudent.name.split(' ')[0]}!
                </h1>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/20 text-yellow-300 border border-white/30 shrink-0">
                  {isJunior ? '🌱 Junior (1–5)' : '🎓 Senior (6–11)'}
                </span>
              </div>
              <p className="text-[11px] text-white/90 font-semibold truncate">
                Grade {currentGrade} • {currentStudent.boardId.toUpperCase()} Curriculum
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0 bg-white/20 px-2.5 py-1.5 rounded-xl backdrop-blur-xs border border-white/30">
            <div className="text-center">
              <div className="flex items-center space-x-1 text-amber-300 font-black text-xs">
                <Flame className="w-3.5 h-3.5 fill-amber-300" />
                <span>{currentStudent.streakDays}d</span>
              </div>
            </div>
            <div className="h-4 w-px bg-white/30" />
            <div className="text-center">
              <div className="flex items-center space-x-1 text-yellow-300 font-black text-xs">
                <Star className="w-3.5 h-3.5 fill-yellow-300" />
                <span>{currentStudent.totalPoints}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Grade Switcher Slider */}
      <div className="bg-white p-3 rounded-2xl border-2 border-amber-200 shadow-2xs space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-black text-slate-800 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-amber-600" />
            <span>Select Your Grade:</span>
          </span>
          <span className="font-bold text-rose-600 text-[11px]">
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
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1 ${
                  isSel
                    ? isGJun
                      ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-400'
                      : 'bg-[#E11D48] text-white shadow-xs ring-2 ring-rose-400'
                    : 'bg-slate-100 text-slate-700 hover:bg-amber-50 border border-slate-200'
                }`}
              >
                <span>{isGJun ? '🌱' : '🎓'}</span>
                <span>Gr {g}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. CARD 1: Grade-Wise Mock Tests & Quizzes */}
      <div
        className={`p-4 rounded-2xl border-3 shadow-xs space-y-3 transition-all ${
          isJunior
            ? 'bg-gradient-to-br from-emerald-50 to-teal-50/40 border-emerald-300'
            : 'bg-gradient-to-br from-rose-50 to-pink-50/40 border-rose-300'
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <span
              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                isJunior
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {isJunior ? 'Fun Quiz Zone' : 'Board Exam Center'}
            </span>
            <h2 className="font-black text-base text-slate-900 leading-tight">
              {isJunior
                ? `🌱 Grade ${currentGrade} Quizzes & Practice`
                : `🎓 Grade ${currentGrade} 30-Question Mock Tests`}
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              {isJunior
                ? 'Quick tests with instant badges covering all primary subjects.'
                : 'Full-length 30 questions with timer, retakes, and step-by-step solutions.'}
            </p>
          </div>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isJunior ? 'bg-emerald-600 text-white' : 'bg-[#E11D48] text-white'
            }`}
          >
            <Zap className="w-5 h-5 fill-white" />
          </div>
        </div>

        {/* Single Required Primary Click Button */}
        <button
          onClick={() => openExamPrep('mock_tests', currentGrade)}
          className={`w-full py-3 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 active:scale-95 transition min-h-[46px] ${
            isJunior
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-[#E11D48] hover:bg-[#BE123C]'
          }`}
        >
          <Play className="w-4 h-4 fill-white" />
          <span>
            {isJunior
              ? `Play Grade ${currentGrade} Quiz (${studentSubjects.length} Subjects)`
              : `Start Grade ${currentGrade} Mock Exam (30 Qs)`}
          </span>
        </button>
      </div>

      {/* CARD: 🎙️ AI Reading & Speech Coach (Read Aloud) */}
      <div className="p-4 rounded-2xl border-3 border-teal-300 bg-gradient-to-br from-teal-50 via-emerald-50/40 to-white shadow-xs space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">
              Voice & Fluency Coach
            </span>
            <h2 className="font-black text-base text-slate-900 leading-tight">
              🎙️ Practice Reading Aloud
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Read stories in English or Hindi, check your speech accuracy, test microphone and listen to your voice playback.
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
            <Mic className="w-5 h-5" />
          </div>
        </div>

        <button
          onClick={() => setActiveView('reading_coach')}
          className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 active:scale-95 transition min-h-[46px]"
        >
          <BookOpen className="w-4 h-4" />
          <span>Start Reading Practice (English & Hindi)</span>
        </button>
      </div>

      {/* 4. CARD 2: Grade-Wise Question Search & Question Bank */}
      <div className="p-4 rounded-2xl border-3 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50/40 shadow-xs space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
              Instant Question Search
            </span>
            <h2 className="font-black text-base text-slate-900 leading-tight">
              🔍 Search Grade {currentGrade} Questions
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              {isJunior
                ? 'Search shapes, numbers, vowels, and solve questions 1-by-1!'
                : 'Search algebra, physics, chemistry, and concept questions with solutions.'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Search className="w-5 h-5" />
          </div>
        </div>

        {/* Quick Topic Search Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none text-[11px]">
          <span className="text-slate-500 font-bold shrink-0">Topics:</span>
          {(isJunior
            ? ['Numbers', 'Shapes', 'Animals', 'Addition']
            : ['Algebra', 'Photosynthesis', 'Gravitation', 'Reactions']
          ).map((term) => (
            <button
              key={term}
              onClick={() => openExamPrep('search_questions', currentGrade)}
              className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-900 font-bold hover:bg-blue-100 transition shrink-0"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Single Required Primary Click Button */}
        <button
          onClick={() => openExamPrep('search_questions', currentGrade)}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 active:scale-95 transition min-h-[46px]"
        >
          <Search className="w-4 h-4" />
          <span>Search Question Bank (Grade {currentGrade})</span>
        </button>
      </div>

      {/* 5. CARD 3: My Subjects & Chapters (Grade Standardized) */}
      <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <h2 className="font-black text-sm text-slate-900">
              Grade {currentGrade} Subjects ({studentSubjects.length})
            </h2>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
            {isJunior ? '4 Core Subjects' : '7+ Full Subjects'}
          </span>
        </div>

        {/* Subject Cards - Card Ways Basis */}
        <div className="grid grid-cols-2 gap-2">
          {studentSubjects.map((subj) => (
            <button
              key={subj.id}
              onClick={() => {
                setSelectedSubjectId(subj.id);
                setActiveView('subject_detail');
              }}
              className="p-3 rounded-xl border-2 border-slate-100 hover:border-amber-300 bg-slate-50/70 text-left space-y-1.5 transition active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                  {subj.code}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="font-bold text-xs text-slate-900 line-clamp-1">
                {subj.name}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                Tap to explore
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 6. CARD 4: 24/7 AI Tutor & Help Guides */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => openAITutorWithContext()}
          className="p-3 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white text-left space-y-1 shadow-xs active:scale-[0.98] transition"
        >
          <Bot className="w-5 h-5 text-white" />
          <div className="font-black text-xs">24/7 AI Tutor</div>
          <div className="text-[10px] text-pink-100 font-medium">
            Ask any question anytime
          </div>
        </button>

        <button
          onClick={openHelpModal}
          className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-left space-y-1 shadow-xs active:scale-[0.98] transition"
        >
          <HelpCircle className="w-5 h-5 text-white" />
          <div className="font-black text-xs">Student Help Guide</div>
          <div className="text-[10px] text-emerald-100 font-medium">
            How to use this web app
          </div>
        </button>
      </div>
    </div>
  );
};
