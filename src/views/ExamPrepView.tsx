import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Play,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Layers,
  Flag,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Check,
  Filter,
  BarChart3,
  Flame,
  Shuffle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getMockExamQuestionsForSubject } from '../data/curriculumData';

export const ExamPrepView: React.FC = () => {
  const {
    currentStudent,
    selectedGradeId,
    setSelectedGradeId,
    selectedBoardId,
    selectedStreamId,
    getFilteredSubjects,
    subjects,
    questions,
    chapters,
    awardPoints,
    openAITutorWithContext,
    t,
    localizeSubject,
    localizeQuestion,
  } = useApp();

  const [selectedGradeFilter, setSelectedGradeFilter] = useState<number>(() => selectedGradeId || currentStudent.gradeId || 7);
  const [testMode, setTestMode] = useState<'selection' | 'running' | 'results'>('selection');
  const [questionCountChoice, setQuestionCountChoice] = useState<number>(30);
  const [isShuffleEnabled, setIsShuffleEnabled] = useState<boolean>(true);

  // Keep selectedGradeFilter strictly in sync whenever selectedGradeId changes globally
  useEffect(() => {
    if (selectedGradeId && selectedGradeId !== selectedGradeFilter) {
      setSelectedGradeFilter(selectedGradeId);
    }
  }, [selectedGradeId]);

  const handleGradeFilterChange = (newGrade: number) => {
    setSelectedGradeFilter(newGrade);
    setSelectedGradeId(newGrade);
  };

  // Active Test Execution State
  const [activeSubject, setActiveSubject] = useState<any>(null);
  const [testQuestions, setTestQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(1800); // 30 minutes for 30 questions
  const [initialDuration, setInitialDuration] = useState(1800);
  const [resultFilter, setResultFilter] = useState<'all' | 'incorrect' | 'correct' | 'flagged'>('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const availableSubjs = getFilteredSubjects(selectedBoardId, selectedGradeFilter, selectedStreamId).map(localizeSubject);
  const gradeSubjects = availableSubjs.length > 0 ? availableSubjs : subjects.filter((s) => s.gradeId === selectedGradeFilter).map(localizeSubject);

  const getCorrectOptionIndex = (q: any): number => {
    if (typeof q?.correctOptionIndex === 'number') return q.correctOptionIndex;
    if (typeof q?.correctAnswer === 'number') return q.correctAnswer;
    if (typeof q?.correctAnswer === 'string') {
      const idx = q.options?.findIndex((opt: string) => opt.toLowerCase() === q.correctAnswer.toLowerCase());
      if (idx !== -1 && idx !== undefined) return idx;
      const letterIdx = q.correctAnswer.charCodeAt(0) - 65;
      if (letterIdx >= 0 && letterIdx < (q.options?.length || 4)) return letterIdx;
    }
    return 0;
  };

  // Shuffles both the questions order and the 4 options within each question
  const shuffleQuestionsAndOptions = (qs: any[]): any[] => {
    const shuffledQs = [...qs].sort(() => Math.random() - 0.5);
    return shuffledQs.map((q) => {
      if (!q.options || q.options.length <= 1) return q;

      const correctIdx = getCorrectOptionIndex(q);
      const indexedOptions = q.options.map((opt: string, i: number) => ({
        opt,
        isCorrect: i === correctIdx,
      }));

      const shuffledOptions = [...indexedOptions].sort(() => Math.random() - 0.5);
      const newCorrectIndex = shuffledOptions.findIndex((item) => item.isCorrect);

      return {
        ...q,
        options: shuffledOptions.map((item) => item.opt),
        correctOptionIndex: newCorrectIndex !== -1 ? newCorrectIndex : 0,
        correctAnswer: newCorrectIndex !== -1 ? newCorrectIndex : 0,
      };
    });
  };

  // Load questions when starting test
  const handleStartTest = (subjectIdToUse: string, count: number = 30, forceShuffle: boolean = isShuffleEnabled) => {
    const subj = subjects.find((s) => s.id === subjectIdToUse);
    setActiveSubject(subj);

    const fullMock = getMockExamQuestionsForSubject(
      subjectIdToUse,
      selectedGradeFilter,
      count,
      questions,
      chapters,
      subj
    );

    const finalQuestions = forceShuffle ? shuffleQuestionsAndOptions(fullMock) : fullMock;
    const duration = count === 30 ? 1800 : count === 15 ? 900 : 1200; // 30 min for 30 Qs, 15 min for 15 Qs

    setTestQuestions(finalQuestions);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setCurrentIdx(0);
    setTimeLeftSeconds(duration);
    setInitialDuration(duration);
    setShowSubmitModal(false);
    setTestMode('running');
  };

  // Retake test with fresh shuffle or exact replay
  const handleRetakeTest = (shouldShuffle: boolean = true) => {
    if (!activeSubject) {
      setTestMode('selection');
      return;
    }

    const count = testQuestions.length || questionCountChoice || 30;
    const fullMock = getMockExamQuestionsForSubject(
      activeSubject.id,
      selectedGradeFilter,
      count,
      questions,
      chapters,
      activeSubject
    );

    const questionsToUse = shouldShuffle ? shuffleQuestionsAndOptions(fullMock) : fullMock;
    const duration = count === 30 ? 1800 : count === 15 ? 900 : 1200;

    setTestQuestions(questionsToUse);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setCurrentIdx(0);
    setTimeLeftSeconds(duration);
    setInitialDuration(duration);
    setShowSubmitModal(false);
    setTestMode('running');

    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    } catch {}
  };

  // In-session shuffle
  const handleShuffleCurrentTest = () => {
    const shuffled = shuffleQuestionsAndOptions(testQuestions);
    setTestQuestions(shuffled);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setCurrentIdx(0);
  };

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (testMode === 'running' && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            handleFinishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testMode, timeLeftSeconds]);

  const handleFinishTest = () => {
    setShowSubmitModal(false);
    setTestMode('results');
    awardPoints(150, 'Completed 30-Question Full Mock Test');
    try {
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
    } catch {}
  };

  const calculateScore = () => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    testQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === undefined) {
        unattempted++;
      } else if (selectedAnswers[idx] === getCorrectOptionIndex(q)) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const total = testQuestions.length || 1;
    return {
      correct,
      incorrect,
      unattempted,
      total: testQuestions.length,
      percentage: Math.round((correct / total) * 100),
      timeSpent: initialDuration - timeLeftSeconds,
    };
  };

  const scoreResult = calculateScore();
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQRaw = testQuestions[currentIdx];
  const currentQ = currentQRaw ? localizeQuestion(currentQRaw) : currentQRaw;
  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = testQuestions.length - answeredCount;

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#F43F5E] via-[#E11D48] to-[#BE123C] rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-xl border-b-6 sm:border-b-8 border-[#9F1239] relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-yellow-300 border border-white/30">
              Board & Comprehensive Mock Center
            </span>
            <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-black/20 text-white border border-white/20">
              Grade {selectedGradeFilter} • 30 Questions per Subject
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            Full-Length Subject Mock Exams (30 Questions)
          </h1>
          <p className="text-xs sm:text-sm text-rose-100 font-medium">
            Simulate real board and annual test conditions. Each mock exam contains 30 syllabus-aligned, balanced questions covering all chapters with timed countdown, shuffle re-take option, instant review, and step-by-step solutions.
          </p>
        </div>
      </div>

      {/* ================= 1. SELECTION MODE ================= */}
      {testMode === 'selection' && (
        <div className="bg-white p-5 sm:p-8 rounded-3xl border-4 border-[#FDA4AF] shadow-lg space-y-6">
          {/* Grade, Format, and Shuffle Filter Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b-2 border-rose-100">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Choose Subject for 30-Question Mock Test
              </h2>
              <p className="text-xs text-slate-600 font-bold">
                Select your grade, format, and shuffle preference to start.
              </p>
            </div>

            {/* Controls: Grade Switcher, Question Count Choice & Shuffle Toggle */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-1 bg-rose-50 p-1 rounded-xl border border-rose-200">
                <span className="text-[11px] font-black text-rose-900 px-2">Grade:</span>
                <select
                  value={selectedGradeFilter}
                  onChange={(e) => handleGradeFilterChange(Number(e.target.value))}
                  aria-label="Select Grade for Mock Test"
                  className="bg-white text-xs font-black text-slate-800 py-1.5 px-2.5 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  {Array.from({ length: 11 }, (_, i) => i + 1).map((g) => (
                    <option key={g} value={g}>
                      Grade {g}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-1 bg-amber-50 p-1 rounded-xl border border-amber-200">
                <span className="text-[11px] font-black text-amber-900 px-2">Format:</span>
                <button
                  onClick={() => setQuestionCountChoice(30)}
                  className={`text-xs font-black px-2.5 py-1 rounded-lg transition ${
                    questionCountChoice === 30
                      ? 'bg-[#E11D48] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-amber-100'
                  }`}
                >
                  Full Mock (30 Qs)
                </button>
                <button
                  onClick={() => setQuestionCountChoice(15)}
                  className={`text-xs font-black px-2.5 py-1 rounded-lg transition ${
                    questionCountChoice === 15
                      ? 'bg-[#E11D48] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-amber-100'
                  }`}
                >
                  Quick (15 Qs)
                </button>
              </div>

              {/* Shuffle Toggle Button */}
              <button
                onClick={() => setIsShuffleEnabled(!isShuffleEnabled)}
                className={`text-xs font-black px-3 py-2 rounded-xl border transition flex items-center space-x-1.5 ${
                  isShuffleEnabled
                    ? 'bg-purple-100 text-purple-900 border-purple-300 shadow-2xs'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
                title="Shuffle question sequence and 4-choice options randomly"
              >
                <Shuffle className={`w-3.5 h-3.5 ${isShuffleEnabled ? 'text-purple-700' : 'text-slate-500'}`} />
                <span>Shuffle: {isShuffleEnabled ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gradeSubjects.map((subj) => {
              const subjChapters = chapters.filter((c) => c.subjectId === subj.id);
              return (
                <div
                  key={subj.id}
                  className="p-5 sm:p-6 rounded-3xl border-4 border-[#FECDD3] bg-gradient-to-br from-[#FFF1F2] to-white hover:from-[#FFE4E6] hover:to-[#FFF1F2] space-y-4 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-xl bg-white text-[#BE123C] border border-[#FDA4AF] shadow-xs">
                        Grade {selectedGradeFilter} • {subj.code}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-lg">
                        {questionCountChoice} Questions Ready
                      </span>
                    </div>

                    <h3 className="font-black text-lg text-slate-900 group-hover:text-[#BE123C] transition">
                      {subj.name}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium line-clamp-2">
                      {subj.description || `Comprehensive full mock test spanning all chapters for Grade ${selectedGradeFilter}.`}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] text-rose-900 font-bold">
                      <span className="bg-rose-100/80 px-2 py-0.5 rounded-md">
                        {subjChapters.length || 4} Chapters Covered
                      </span>
                      <span className="bg-rose-100/80 px-2 py-0.5 rounded-md">
                        ⏱️ {questionCountChoice === 30 ? '30 Mins' : '15 Mins'}
                      </span>
                      <span className="bg-purple-100 text-purple-900 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Shuffle className="w-3 h-3" />
                        <span>Shuffle Enabled</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => handleStartTest(subj.id, questionCountChoice, isShuffleEnabled)}
                      className="w-full py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white font-black text-xs rounded-2xl transition flex items-center justify-center space-x-2 shadow-md hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Start {questionCountChoice}-Question Mock Exam</span>
                    </button>
                    <button
                      onClick={() => handleStartTest(subj.id, questionCountChoice, true)}
                      className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold text-[11px] rounded-xl transition flex items-center justify-center space-x-1.5"
                    >
                      <Shuffle className="w-3.5 h-3.5 text-purple-700" />
                      <span>Start with Instant Shuffle</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {gradeSubjects.length === 0 && (
            <div className="text-center py-12 space-y-3 bg-rose-50/50 rounded-2xl border-2 border-dashed border-rose-200">
              <BookOpen className="w-10 h-10 text-rose-400 mx-auto" />
              <p className="text-sm font-black text-slate-800">No subjects found for Grade {selectedGradeFilter}.</p>
              <button
                onClick={() => setSelectedGradeFilter(1)}
                className="text-xs font-black px-4 py-2 bg-rose-600 text-white rounded-xl shadow-xs"
              >
                Switch to Grade 1
              </button>
            </div>
          )}
        </div>
      )}

      {/* ================= 2. ACTIVE TEST RUNNING MODE ================= */}
      {testMode === 'running' && currentQ && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Interface (3 Cols) */}
          <div className="lg:col-span-3 bg-white p-5 sm:p-8 rounded-3xl border-4 border-[#FDA4AF] shadow-lg space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Top Navigation & Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-rose-100">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-black text-[#E11D48] bg-[#FFF1F2] px-3.5 py-1.5 rounded-xl border border-[#FECDD3]">
                    Question {currentIdx + 1} of {testQuestions.length}
                  </span>
                  {activeSubject && (
                    <span className="text-xs font-bold text-slate-600 hidden sm:inline-block">
                      {activeSubject.name} (Grade {selectedGradeFilter})
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {/* Shuffle Button inside test */}
                  <button
                    onClick={handleShuffleCurrentTest}
                    className="px-3 py-1.5 rounded-xl text-xs font-black flex items-center space-x-1.5 transition bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200"
                    title="Reshuffle question sequence"
                  >
                    <Shuffle className="w-3.5 h-3.5 text-purple-700" />
                    <span className="hidden sm:inline">Shuffle Qs</span>
                  </button>

                  {/* Flag for Review */}
                  <button
                    onClick={() =>
                      setFlaggedQuestions((prev) => ({
                        ...prev,
                        [currentIdx]: !prev[currentIdx],
                      }))
                    }
                    className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center space-x-1.5 transition border-2 ${
                      flaggedQuestions[currentIdx]
                        ? 'bg-[#FEF3C7] text-[#92400E] border-[#F59E0B]'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{flaggedQuestions[currentIdx] ? 'Flagged' : 'Flag'}</span>
                  </button>

                  {/* Timer Display */}
                  <div
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-black border-2 ${
                      timeLeftSeconds < 300
                        ? 'bg-rose-100 text-rose-800 border-rose-400 animate-pulse'
                        : 'bg-[#FFF1F2] text-[#BE123C] border-[#FDA4AF]'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(timeLeftSeconds)}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>Progress: {answeredCount} / {testQuestions.length} Answered</span>
                  <span>{Math.round((answeredCount / (testQuestions.length || 1)) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-rose-500 to-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${(answeredCount / (testQuestions.length || 1)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    Difficulty: {currentQ?.difficulty || 'Medium'}
                  </span>
                  {currentQ?.topicId && (
                    <span className="text-[10px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md">
                      Chapter Concept
                    </span>
                  )}
                </div>
                <p className="text-base sm:text-lg font-black text-slate-900 leading-relaxed">
                  {currentQ?.text}
                </p>
                {currentQ?.diagramUrl && (
                  <div className="p-4 bg-[#FFFBEB] rounded-2xl border-2 border-[#FDE68A] flex justify-center">
                    <img src={currentQ.diagramUrl} alt="Question Diagram" className="max-h-48 object-contain" />
                  </div>
                )}
              </div>

              {/* 4 Options Grid */}
              <div className="space-y-2.5 pt-2">
                {currentQ.options?.map((opt: string, optIdx: number) => {
                  const isSelected = selectedAnswers[currentIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => setSelectedAnswers({ ...selectedAnswers, [currentIdx]: optIdx })}
                      className={`w-full p-3.5 sm:p-4 rounded-2xl border-2 text-left text-xs sm:text-sm transition flex items-center space-x-3.5 ${
                        isSelected
                          ? 'bg-[#FFE4E6] border-[#E11D48] text-[#881337] font-black shadow-xs ring-2 ring-[#E11D48]/30'
                          : 'bg-[#FFF1F2]/60 hover:bg-[#FFE4E6] border-[#FECDD3] text-slate-800 font-bold'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-xl border-2 shrink-0 flex items-center justify-center font-black text-xs ${
                          isSelected
                            ? 'bg-[#E11D48] text-white border-[#BE123C]'
                            : 'bg-white border-[#FDA4AF] text-[#BE123C]'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-snug">{opt}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#E11D48] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Action Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t-2 border-rose-100 mt-4">
              <div className="flex items-center space-x-2">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-black text-xs rounded-xl border border-slate-200 transition"
                >
                  ← Previous
                </button>
                {selectedAnswers[currentIdx] !== undefined && (
                  <button
                    onClick={() => {
                      const copy = { ...selectedAnswers };
                      delete copy[currentIdx];
                      setSelectedAnswers(copy);
                    }}
                    className="px-3 py-2 text-slate-500 hover:text-rose-600 font-bold text-xs rounded-xl hover:bg-rose-50 transition"
                  >
                    Clear Choice
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {currentIdx < testQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx((prev) => Math.min(testQuestions.length - 1, prev + 1))}
                    className="px-6 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-black text-xs rounded-xl shadow-md transition flex items-center space-x-1.5"
                  >
                    <span>Save & Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubmitModal(true)}
                    className="px-6 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs rounded-xl shadow-md transition flex items-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Review & Submit</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Question Palette (1 Col) - 30 Numbered Buttons */}
          <div className="bg-white p-5 rounded-3xl border-4 border-[#FBBF24] shadow-lg space-y-4 h-fit">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#92400E]">
                30-Question Palette
              </h3>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                {answeredCount}/{testQuestions.length}
              </span>
            </div>

            {/* 30 Questions Grid: 5 or 6 columns for clean symmetry */}
            <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-1.5 max-h-[380px] overflow-y-auto p-1">
              {testQuestions.map((_, idx) => {
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isFlagged = flaggedQuestions[idx];
                const isCurrent = currentIdx === idx;

                let badgeColor = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
                if (isFlagged) badgeColor = 'bg-[#FBBF24] text-[#78350F] font-black border-[#F59E0B]';
                else if (isAnswered) badgeColor = 'bg-[#10B981] text-white font-black border-[#059669]';

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-9 rounded-lg text-xs font-black flex items-center justify-center border-2 transition ${badgeColor} ${
                      isCurrent ? 'ring-3 ring-[#E11D48] ring-offset-1 scale-105 z-10' : ''
                    }`}
                    title={`Jump to Question ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Palette Legend */}
            <div className="pt-3 border-t-2 border-amber-100 text-[11px] space-y-1.5 text-[#92400E] font-bold">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-md bg-[#10B981]" />
                  <span>Answered</span>
                </div>
                <span className="font-black">{answeredCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-md bg-[#FBBF24]" />
                  <span>Flagged</span>
                </div>
                <span className="font-black">{Object.values(flaggedQuestions).filter(Boolean).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-md bg-slate-200" />
                  <span>Unanswered</span>
                </div>
                <span className="font-black">{unansweredCount}</span>
              </div>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl transition shadow-xs flex items-center justify-center space-x-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Test ({answeredCount}/{testQuestions.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border-4 border-rose-300 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-black">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Submit Mock Test?</h3>
                <p className="text-xs text-slate-600 font-bold">Grade {selectedGradeFilter} • {activeSubject?.name}</p>
              </div>
            </div>

            <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200 text-xs font-bold text-slate-700 space-y-1.5">
              <div className="flex justify-between">
                <span>Total Questions:</span>
                <span className="font-black text-slate-900">{testQuestions.length}</span>
              </div>
              <div className="flex justify-between text-emerald-800">
                <span>Answered:</span>
                <span className="font-black">{answeredCount}</span>
              </div>
              {unansweredCount > 0 && (
                <div className="flex justify-between text-rose-800">
                  <span>Unanswered Remaining:</span>
                  <span className="font-black">{unansweredCount}</span>
                </div>
              )}
              <div className="flex justify-between text-amber-800">
                <span>Time Remaining:</span>
                <span className="font-black font-mono">{formatTime(timeLeftSeconds)}</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-[11px] text-rose-700 font-bold">
                ⚠️ You still have {unansweredCount} unanswered question{unansweredCount > 1 ? 's' : ''}. You can return to answer them or submit now.
              </p>
            )}

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl"
              >
                Continue Test
              </button>
              <button
                onClick={handleFinishTest}
                className="px-5 py-2 bg-[#E11D48] hover:bg-[#BE123C] text-white font-black text-xs rounded-xl shadow-sm"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 3. TEST RESULTS & 30-QUESTION REVIEW ================= */}
      {testMode === 'results' && (
        <div className="bg-white p-5 sm:p-8 rounded-3xl border-4 border-[#6EE7B7] shadow-xl space-y-8 animate-in fade-in duration-300">
          {/* Top Score Banner */}
          <div className="text-center space-y-4 pb-6 border-b-2 border-emerald-100">
            <div className="w-16 h-16 rounded-3xl bg-[#D1FAE5] text-[#065F46] border-2 border-[#A7F3D0] flex items-center justify-center mx-auto shadow-sm">
              <Award className="w-9 h-9" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                30-Question Mock Test Assessment Report
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                Grade {selectedGradeFilter} • {activeSubject?.name || 'Subject'} Full Examination Analysis
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
              <div className="p-3.5 bg-[#EFF6FF] rounded-2xl border-2 border-[#BFDBFE]">
                <span className="text-[10px] uppercase font-black text-[#1E40AF] block">Score</span>
                <span className="text-2xl sm:text-3xl font-black text-[#2563EB]">
                  {scoreResult.correct} / {scoreResult.total}
                </span>
              </div>
              <div className="p-3.5 bg-[#ECFDF5] rounded-2xl border-2 border-[#A7F3D0]">
                <span className="text-[10px] uppercase font-black text-[#065F46] block">Accuracy</span>
                <span className="text-2xl sm:text-3xl font-black text-[#059669]">{scoreResult.percentage}%</span>
              </div>
              <div className="p-3.5 bg-[#FEF2F2] rounded-2xl border-2 border-[#FECACA]">
                <span className="text-[10px] uppercase font-black text-[#991B1B] block">Incorrect</span>
                <span className="text-2xl sm:text-3xl font-black text-[#DC2626]">{scoreResult.incorrect}</span>
              </div>
              <div className="p-3.5 bg-[#FFFBEB] rounded-2xl border-2 border-[#FDE68A]">
                <span className="text-[10px] uppercase font-black text-[#92400E] block">Time Spent</span>
                <span className="text-xl sm:text-2xl font-black text-[#B45309] font-mono">
                  {formatTime(scoreResult.timeSpent)}
                </span>
              </div>
            </div>
          </div>

          {/* Review Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-black text-slate-900">
                Detailed Solutions for All {testQuestions.length} Questions:
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: `All (${testQuestions.length})` },
                { id: 'incorrect', label: `Incorrect (${scoreResult.incorrect})` },
                { id: 'correct', label: `Correct (${scoreResult.correct})` },
                { id: 'flagged', label: 'Flagged' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setResultFilter(f.id as any)}
                  className={`text-xs font-black px-3 py-1.5 rounded-xl border transition ${
                    resultFilter === f.id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* 30 Questions Answer Key & Detailed Step-by-Step Solutions */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {testQuestions
              .filter((q, idx) => {
                const userAns = selectedAnswers[idx];
                const correctIdx = getCorrectOptionIndex(q);
                const isCorrect = userAns === correctIdx;
                if (resultFilter === 'incorrect') return userAns !== undefined && !isCorrect;
                if (resultFilter === 'correct') return isCorrect;
                if (resultFilter === 'flagged') return flaggedQuestions[idx];
                return true;
              })
              .map((rawQ, idx) => {
                const q = localizeQuestion(rawQ);
                const originalIdx = testQuestions.findIndex((tq) => tq.id === rawQ.id || tq.text === rawQ.text);
                const itemNumber = originalIdx !== -1 ? originalIdx + 1 : idx + 1;
                const userAns = selectedAnswers[originalIdx !== -1 ? originalIdx : idx];
                const correctIdx = getCorrectOptionIndex(rawQ);
                const isAnswered = userAns !== undefined;
                const isCorrect = isAnswered && userAns === correctIdx;

                return (
                  <div
                    key={q.id || idx}
                    className={`p-5 rounded-2xl border-2 space-y-3 transition ${
                      !isAnswered
                        ? 'bg-slate-50 border-slate-200'
                        : isCorrect
                        ? 'bg-emerald-50/70 border-emerald-200'
                        : 'bg-rose-50/70 border-rose-200'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-xs bg-white px-2.5 py-0.5 rounded-md border border-slate-300 text-slate-800">
                            Question {itemNumber} of {testQuestions.length}
                          </span>
                          {flaggedQuestions[itemNumber - 1] && (
                            <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                              Flagged
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-black text-slate-900 leading-snug pt-1">
                          {q.text}
                        </p>
                      </div>

                      {/* Result Badge */}
                      {!isAnswered ? (
                        <span className="text-slate-600 text-xs font-black bg-slate-200 px-2.5 py-1 rounded-lg border border-slate-300">
                          Unanswered
                        </span>
                      ) : isCorrect ? (
                        <span className="text-emerald-700 text-xs font-black flex items-center gap-1 bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-300">
                          <CheckCircle2 className="w-4 h-4" /> Correct (+1)
                        </span>
                      ) : (
                        <span className="text-rose-700 text-xs font-black flex items-center gap-1 bg-rose-100 px-2.5 py-1 rounded-lg border border-rose-300">
                          <XCircle className="w-4 h-4" /> Incorrect (0)
                        </span>
                      )}
                    </div>

                    {/* Option Choices Breakdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options?.map((opt: string, optIndex: number) => {
                        const isStudentChoice = userAns === optIndex;
                        const isThisCorrect = correctIdx === optIndex;

                        let optStyle = 'bg-white text-slate-700 border-slate-200';
                        if (isThisCorrect) {
                          optStyle = 'bg-emerald-100 text-emerald-950 font-black border-emerald-400 ring-2 ring-emerald-400/40';
                        } else if (isStudentChoice && !isThisCorrect) {
                          optStyle = 'bg-rose-100 text-rose-950 font-black border-rose-400';
                        }

                        return (
                          <div
                            key={optIndex}
                            className={`p-2.5 rounded-xl border flex items-center space-x-2 ${optStyle}`}
                          >
                            <span className="w-5 h-5 rounded-md bg-white border border-slate-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <span className="flex-1">{opt}</span>
                            {isThisCorrect && (
                              <span className="text-[10px] bg-emerald-600 text-white font-black px-1.5 py-0.5 rounded">
                                Correct
                              </span>
                            )}
                            {isStudentChoice && !isThisCorrect && (
                              <span className="text-[10px] bg-rose-600 text-white font-black px-1.5 py-0.5 rounded">
                                Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Pedagogical Explanation */}
                    {q.explanation && (
                      <div className="p-3 bg-blue-50/90 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
                        <p className="font-medium">
                          💡 <strong>Concept Explanation:</strong> {q.explanation}
                        </p>
                        {q.stepByStepSolution && q.stepByStepSolution.length > 0 && (
                          <div className="pt-1.5 border-t border-blue-200/80">
                            <span className="font-black text-[11px] uppercase tracking-wider text-blue-950 block mb-1">
                              Step-by-Step Breakdown:
                            </span>
                            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-blue-800">
                              {q.stepByStepSolution.map((st: string, sIdx: number) => (
                                <li key={sIdx}>{st}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          {/* Bottom Action Footer with Shuffle & Retake Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-emerald-100">
            <div className="flex flex-wrap items-center gap-2">
              {/* Primary Shuffle & Retake Button */}
              <button
                id="shuffle-retake-mock-btn"
                onClick={() => handleRetakeTest(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs rounded-2xl flex items-center space-x-2 shadow-md transition hover:scale-105"
                title="Shuffle question sequence and option order for a fresh retake"
              >
                <Shuffle className="w-4 h-4 text-white" />
                <span>Shuffle & Retake Test</span>
              </button>

              {/* Exact Replay Button */}
              <button
                id="retake-same-mock-btn"
                onClick={() => handleRetakeTest(false)}
                className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 font-black text-xs rounded-2xl shadow-xs transition flex items-center space-x-2"
                title="Retake the same questions to improve your score"
              >
                <RotateCcw className="w-4 h-4 text-slate-600" />
                <span>Retake Same Questions</span>
              </button>

              {/* Return to Subject Selection */}
              <button
                onClick={() => setTestMode('selection')}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition"
              >
                Choose Another Subject
              </button>
            </div>

            <button
              onClick={() =>
                openAITutorWithContext({
                  subject: activeSubject?.name || 'Mock Exam Diagnostic',
                  chapter: '30-Question Test Analysis',
                  topic: `Score ${scoreResult.correct}/${scoreResult.total} Review`,
                })
              }
              className="px-6 py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white font-black text-xs rounded-2xl flex items-center space-x-2 shadow-md transition hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Discuss Mistakes with 24/7 AI Tutor</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
