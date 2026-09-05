import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DetailedAnswerModal } from '../components/DetailedAnswerModal';
import { Question } from '../types';
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
  Search,
  Lightbulb,
  X,
  Star,
  GraduationCap,
  Volume2,
  CheckCircle,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Send,
  Edit3,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getMockExamQuestionsForSubject } from '../data/curriculumData';
import {
  isStudentAnswerCorrect,
  getCorrectAnswerDisplay,
  getCorrectOptionIndex,
} from '../utils/answerChecker';

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
    examPrepInitialTab,
    setExamPrepInitialTab,
    speakText,
    t,
    localizeSubject,
    localizeQuestion,
  } = useApp();

  const [selectedGradeFilter, setSelectedGradeFilter] = useState<number>(() => selectedGradeId || currentStudent.gradeId || 7);
  const [testMode, setTestMode] = useState<'selection' | 'running' | 'results'>('selection');
  const [questionCountChoice, setQuestionCountChoice] = useState<number>(30);
  const [isShuffleEnabled, setIsShuffleEnabled] = useState<boolean>(true);

  // Tab State: Mock Tests vs Question Search
  const [activeTab, setActiveTab] = useState<'mock_tests' | 'search_questions'>(() => examPrepInitialTab || 'mock_tests');
  const [questionSearchQuery, setQuestionSearchQuery] = useState<string>('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<string>('all');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [userPracticeAnswers, setUserPracticeAnswers] = useState<Record<string, any>>({});
  const [practiceInputDrafts, setPracticeInputDrafts] = useState<Record<string, string>>({});
  const [practicePage, setPracticePage] = useState<number>(1);
  const [practicePageSize, setPracticePageSize] = useState<number>(20);

  // Synchronize when examPrepInitialTab changes externally
  useEffect(() => {
    if (examPrepInitialTab && examPrepInitialTab !== activeTab) {
      setActiveTab(examPrepInitialTab);
    }
  }, [examPrepInitialTab]);

  // Detail Modal State
  const [modalQuestion, setModalQuestion] = useState<Question | null>(null);
  const [modalSelectedOption, setModalSelectedOption] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, any>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(1800); // 30 minutes for 30 questions
  const [initialDuration, setInitialDuration] = useState(1800);
  const [resultFilter, setResultFilter] = useState<'all' | 'incorrect' | 'correct' | 'flagged'>('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const availableSubjs = getFilteredSubjects(selectedBoardId, selectedGradeFilter, selectedStreamId).map(localizeSubject);
  const gradeSubjects = availableSubjs.length > 0 ? availableSubjs : subjects.filter((s) => s.gradeId === selectedGradeFilter).map(localizeSubject);

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

  const isLowerGrade = selectedGradeFilter <= 5;

  // Grade-wise question pool ensuring every subject has ample practice questions
  const gradeQuestionsPool = useMemo(() => {
    let list = questions.filter((q) => q.gradeId === selectedGradeFilter);

    gradeSubjects.forEach((subj) => {
      const existingCount = list.filter((q) => q.subjectId === subj.id).length;
      if (existingCount < 6) {
        const extra = getMockExamQuestionsForSubject(
          subj.id,
          selectedGradeFilter,
          8,
          questions,
          chapters,
          subj
        );
        list = [...list, ...extra];
      }
    });

    const seen = new Set<string>();
    return list.filter((q) => {
      if (!q.id || seen.has(q.id)) return false;
      seen.add(q.id);
      return true;
    });
  }, [questions, selectedGradeFilter, gradeSubjects, chapters]);

  // Filtered questions based on search query, subject filter, and difficulty
  const filteredGradeQuestions = useMemo(() => {
    const qNorm = questionSearchQuery.toLowerCase().trim();
    return gradeQuestionsPool.filter((q) => {
      if (selectedSubjectFilter !== 'all' && q.subjectId !== selectedSubjectFilter) {
        return false;
      }
      if (selectedDifficultyFilter !== 'all' && q.difficulty !== selectedDifficultyFilter) {
        return false;
      }
      if (!qNorm) return true;
      const textMatch = q.text?.toLowerCase().includes(qNorm);
      const optMatch = q.options?.some((opt: string) => opt.toLowerCase().includes(qNorm));
      const expMatch = q.explanation?.toLowerCase().includes(qNorm);
      const hintMatch = q.hints?.some((h: string) => h.toLowerCase().includes(qNorm));
      return textMatch || optMatch || expMatch || hintMatch;
    });
  }, [gradeQuestionsPool, questionSearchQuery, selectedSubjectFilter, selectedDifficultyFilter]);

  // Reset practice page whenever filters change
  useEffect(() => {
    setPracticePage(1);
  }, [questionSearchQuery, selectedSubjectFilter, selectedDifficultyFilter, selectedGradeFilter]);

  const effectivePageSize = practicePageSize === 0 ? Math.max(1, filteredGradeQuestions.length) : practicePageSize;
  const totalPracticePages = Math.max(1, Math.ceil(filteredGradeQuestions.length / effectivePageSize));

  const paginatedPracticeQuestions = useMemo(() => {
    if (practicePageSize === 0) return filteredGradeQuestions;
    const start = (practicePage - 1) * practicePageSize;
    return filteredGradeQuestions.slice(start, start + practicePageSize);
  }, [filteredGradeQuestions, practicePage, practicePageSize]);

  const handlePracticeOptionClick = (questionId: string, optionIdx: number, q: Question) => {
    setUserPracticeAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    const isCorrect = isStudentAnswerCorrect(q, optionIdx);
    if (isCorrect) {
      awardPoints(5, 'Mastered practice question!');
      try {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.85 } });
      } catch {}
    }
  };

  const handlePracticeInputSubmit = (questionId: string, q: Question) => {
    const textVal = practiceInputDrafts[questionId]?.trim() || '';
    if (!textVal) return;
    setUserPracticeAnswers((prev) => ({ ...prev, [questionId]: textVal }));
    const isCorrect = isStudentAnswerCorrect(q, textVal);
    if (isCorrect) {
      awardPoints(5, 'Mastered fill-in/input question!');
      try {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.85 } });
      } catch {}
    }
  };

  const toggleRevealSolution = (questionId: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handlePageChange = (newPage: number) => {
    const target = Math.max(1, Math.min(totalPracticePages, newPage));
    setPracticePage(target);
    const el = document.getElementById('questions-practice-top');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderPaginationToolbar = (position: 'top' | 'bottom') => {
    if (filteredGradeQuestions.length === 0) return null;

    const startItem = practicePageSize === 0 ? 1 : (practicePage - 1) * practicePageSize + 1;
    const endItem =
      practicePageSize === 0
        ? filteredGradeQuestions.length
        : Math.min(filteredGradeQuestions.length, practicePage * practicePageSize);

    return (
      <div
        className={`flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs ${
          position === 'top' ? 'mb-2' : 'mt-4'
        }`}
      >
        {/* Count info */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-black border border-slate-200">
            {startItem} – {endItem} of {filteredGradeQuestions.length} Questions
          </span>
          {practicePageSize > 0 && (
            <span className="text-slate-400 hidden sm:inline">
              (Page {practicePage} of {totalPracticePages})
            </span>
          )}
        </div>

        {/* Page navigation controls */}
        {practicePageSize > 0 && totalPracticePages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(1)}
              disabled={practicePage === 1}
              title="First Page"
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer text-slate-700"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handlePageChange(practicePage - 1)}
              disabled={practicePage === 1}
              title="Previous Page"
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer text-xs font-bold text-slate-700 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Page number buttons */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPracticePages }, (_, i) => i + 1)
                .filter((p) => {
                  if (totalPracticePages <= 7) return true;
                  if (p === 1 || p === totalPracticePages) return true;
                  return Math.abs(p - practicePage) <= 1;
                })
                .map((p, idx, arr) => {
                  const prevP = arr[idx - 1];
                  const hasGap = prevP && p - prevP > 1;

                  return (
                    <React.Fragment key={p}>
                      {hasGap && <span className="text-xs text-slate-400 px-1">...</span>}
                      <button
                        onClick={() => handlePageChange(p)}
                        className={`w-8 h-8 rounded-xl font-black text-xs transition cursor-pointer flex items-center justify-center border ${
                          practicePage === p
                            ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {p}
                      </button>
                    </React.Fragment>
                  );
                })}
            </div>

            <button
              onClick={() => handlePageChange(practicePage + 1)}
              disabled={practicePage === totalPracticePages}
              title="Next Page"
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer text-xs font-bold text-slate-700 flex items-center gap-1"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handlePageChange(totalPracticePages)}
              disabled={practicePage === totalPracticePages}
              title="Last Page"
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer text-slate-700"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Page size dropdown / buttons */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-bold hidden sm:inline">Per page:</span>
          {[20, 50, 100, 0].map((size) => (
            <button
              key={size}
              onClick={() => {
                setPracticePageSize(size);
                setPracticePage(1);
              }}
              className={`px-2 py-1 rounded-lg text-xs font-black border transition cursor-pointer ${
                practicePageSize === size
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {size === 0 ? 'All' : size}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const calculateScore = () => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    testQuestions.forEach((q, idx) => {
      const ans = selectedAnswers[idx];
      if (ans === undefined || ans === '') {
        unattempted++;
      } else if (isStudentAnswerCorrect(q, ans)) {
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
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-8 space-y-4 sm:space-y-6">
      {/* Header Banner - Adaptive for Junior (1-5) and Senior (6-11) */}
      <div
        className={`rounded-2xl sm:rounded-3xl p-4 sm:p-7 text-white shadow-lg border-b-6 sm:border-b-8 relative overflow-hidden transition-all duration-300 ${
          isLowerGrade
            ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 border-emerald-800'
            : 'bg-gradient-to-r from-[#F43F5E] via-[#E11D48] to-[#BE123C] border-[#9F1239]'
        }`}
      >
        <div className="relative z-10 max-w-3xl space-y-1.5 sm:space-y-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-yellow-300 border border-white/30">
              {isLowerGrade ? '🌱 Junior Learning & Practice' : '🎓 Board & Comprehensive Prep'}
            </span>
            <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-black/20 text-white border border-white/20">
              Grade {selectedGradeFilter} • {activeTab === 'mock_tests' ? 'Mock Tests' : 'Question Bank'}
            </span>
          </div>
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-black tracking-tight">
            {isLowerGrade
              ? `Grade ${selectedGradeFilter} Quizzes & Practice Questions`
              : `Grade ${selectedGradeFilter} Mock Exams & Question Bank`}
          </h1>
          <p className="text-xs sm:text-sm text-white/90 font-medium line-clamp-2">
            {isLowerGrade
              ? 'Kid-friendly quizzes and instant question practice designed specifically for primary students.'
              : 'Timed 30-question mock exams, shuffle retakes, and chapter-wise question search for board excellence.'}
          </p>
        </div>
      </div>

      {/* ================= 1. SELECTION MODE ================= */}
      {testMode === 'selection' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Interactive Grade Selector Slider (Grades 1 to 11) */}
          <div className="bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-amber-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Select Grade
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 hidden sm:inline-block">
                  {selectedGradeFilter <= 5 ? '🌱 Junior (1-5)' : '🎓 Senior & Board (6-11)'}
                </span>
              </div>
              <span className="text-xs font-black text-rose-600">
                Grade {selectedGradeFilter} Selected
              </span>
            </div>

            {/* Horizontal Touch Carousel for Grades */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
              {Array.from({ length: 11 }, (_, i) => i + 1).map((g) => {
                const isSelected = selectedGradeFilter === g;
                const isGJunior = g <= 5;
                return (
                  <button
                    key={g}
                    onClick={() => handleGradeFilterChange(g)}
                    className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 ${
                      isSelected
                        ? isGJunior
                          ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400 scale-105'
                          : 'bg-[#E11D48] text-white shadow-md ring-2 ring-rose-400 scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-amber-100 border border-slate-200'
                    }`}
                  >
                    <span>{isGJunior ? '🌱' : '🎓'}</span>
                    <span>Grade {g}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary View Switcher: Mock Tests vs Question Search */}
          <div className="grid grid-cols-2 gap-2 bg-slate-200/70 p-1.5 rounded-2xl border border-slate-300">
            <button
              onClick={() => setActiveTab('mock_tests')}
              className={`py-2.5 sm:py-3 px-3 rounded-xl font-black text-xs sm:text-sm transition flex items-center justify-center space-x-2 ${
                activeTab === 'mock_tests'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current text-rose-600" />
              <span>Mock Tests (Grade {selectedGradeFilter})</span>
            </button>
            <button
              onClick={() => setActiveTab('search_questions')}
              className={`py-2.5 sm:py-3 px-3 rounded-xl font-black text-xs sm:text-sm transition flex items-center justify-center space-x-2 ${
                activeTab === 'search_questions'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-blue-600" />
              <span>Search Questions ({filteredGradeQuestions.length})</span>
            </button>
          </div>

          {/* ================= TAB 1: MOCK TESTS & QUIZZES ================= */}
          {activeTab === 'mock_tests' && (
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-[#FDA4AF] shadow-md space-y-4 sm:space-y-6">
              {/* Format & Shuffle Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-rose-100">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    {isLowerGrade
                      ? `Choose Subject for Grade ${selectedGradeFilter} Quiz`
                      : `Choose Subject for Grade ${selectedGradeFilter} Mock Test`}
                  </h2>
                  <p className="text-xs text-slate-600 font-medium">
                    Tap your subject below to start with instant evaluation and solutions.
                  </p>
                </div>

                {/* Quick Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center space-x-1 bg-amber-50 p-1 rounded-xl border border-amber-200">
                    <span className="text-[11px] font-black text-amber-900 px-2">Format:</span>
                    {isLowerGrade ? (
                      <>
                        <button
                          onClick={() => setQuestionCountChoice(15)}
                          className={`text-xs font-black px-2.5 py-1 rounded-lg transition ${
                            questionCountChoice === 15
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-slate-700 hover:bg-amber-100'
                          }`}
                        >
                          15 Qs
                        </button>
                        <button
                          onClick={() => setQuestionCountChoice(5)}
                          className={`text-xs font-black px-2.5 py-1 rounded-lg transition ${
                            questionCountChoice === 5
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-slate-700 hover:bg-amber-100'
                          }`}
                        >
                          5 Qs (Quick)
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setQuestionCountChoice(30)}
                          className={`text-xs font-black px-2.5 py-1 rounded-lg transition ${
                            questionCountChoice === 30
                              ? 'bg-[#E11D48] text-white shadow-xs'
                              : 'text-slate-700 hover:bg-amber-100'
                          }`}
                        >
                          30 Qs (Full)
                        </button>
                        <button
                          onClick={() => setQuestionCountChoice(15)}
                          className={`text-xs font-black px-2.5 py-1 rounded-lg transition ${
                            questionCountChoice === 15
                              ? 'bg-[#E11D48] text-white shadow-xs'
                              : 'text-slate-700 hover:bg-amber-100'
                          }`}
                        >
                          15 Qs
                        </button>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => setIsShuffleEnabled(!isShuffleEnabled)}
                    className={`text-xs font-black px-3 py-1.5 rounded-xl border transition flex items-center space-x-1.5 ${
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

              {/* Subject Cards Grid - Card Ways Basis */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {gradeSubjects.map((subj) => {
                  const subjChapters = chapters.filter((c) => c.subjectId === subj.id);
                  return (
                    <div
                      key={subj.id}
                      className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-3 border-[#FECDD3] bg-gradient-to-br from-[#FFF1F2] to-white hover:from-[#FFE4E6] hover:to-[#FFF1F2] space-y-3 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-lg bg-white text-[#BE123C] border border-[#FDA4AF]">
                            Grade {selectedGradeFilter} • {subj.code}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-md">
                            {questionCountChoice} Qs Ready
                          </span>
                        </div>

                        <h3 className="font-black text-base sm:text-lg text-slate-900 group-hover:text-[#BE123C] transition">
                          {subj.name}
                        </h3>
                        <p className="text-xs text-slate-600 font-medium line-clamp-2">
                          {subj.description || `Comprehensive mock test spanning all chapters for Grade ${selectedGradeFilter}.`}
                        </p>

                        <div className="pt-1 flex flex-wrap gap-1.5 text-[10px] sm:text-[11px] text-rose-900 font-bold">
                          <span className="bg-rose-100/80 px-2 py-0.5 rounded-md">
                            {subjChapters.length || 4} Chapters Covered
                          </span>
                          <span className="bg-rose-100/80 px-2 py-0.5 rounded-md">
                            ⏱️ {questionCountChoice === 30 ? '30 Mins' : questionCountChoice === 15 ? '15 Mins' : '5 Mins'}
                          </span>
                        </div>
                      </div>

                      {/* Card Action Buttons: ONLY 1 Primary Button on Mobile */}
                      <div className="space-y-2 pt-2">
                        <button
                          onClick={() => handleStartTest(subj.id, questionCountChoice, isShuffleEnabled)}
                          className={`w-full py-3 text-white font-black text-xs sm:text-sm rounded-2xl transition flex items-center justify-center space-x-2 shadow-md active:scale-95 min-h-[46px] ${
                            isLowerGrade
                              ? 'bg-emerald-600 hover:bg-emerald-700'
                              : 'bg-[#E11D48] hover:bg-[#BE123C]'
                          }`}
                        >
                          <Play className="w-4 h-4 fill-white" />
                          <span>
                            {isLowerGrade
                              ? `Play ${questionCountChoice}-Question Quiz`
                              : `Start ${questionCountChoice}-Question Mock Exam`}
                          </span>
                        </button>

                        {/* Secondary shuffle button is hidden on mobile to keep cards simple and uncluttered */}
                        <button
                          onClick={() => handleStartTest(subj.id, questionCountChoice, true)}
                          className="hidden sm:flex w-full py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold text-[11px] rounded-xl transition items-center justify-center space-x-1.5"
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
                <div className="text-center py-10 space-y-3 bg-rose-50/50 rounded-2xl border-2 border-dashed border-rose-200">
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

          {/* ================= TAB 2: SEARCH QUESTIONS & PRACTICE BANK ================= */}
          {activeTab === 'search_questions' && (
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-blue-200 shadow-md space-y-4 sm:space-y-6">
              {/* Question Search Header */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                      <Search className="w-4 h-4 text-blue-600" />
                      Search Grade {selectedGradeFilter} Questions & Quests
                    </h2>
                    <p className="text-xs text-slate-600 font-medium">
                      Find any question, practice with 1 tap, reveal solutions, or ask AI tutor!
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200 self-start sm:self-auto">
                    {filteredGradeQuestions.length} Questions Available
                  </span>
                </div>

                {/* Search Bar Input */}
                <div className="relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={questionSearchQuery}
                    onChange={(e) => setQuestionSearchQuery(e.target.value)}
                    placeholder={
                      isLowerGrade
                        ? `Search Grade ${selectedGradeFilter} topics (e.g. shapes, numbers, animals, fractions)...`
                        : `Search Grade ${selectedGradeFilter} concepts (e.g. algebra, photosynthesis, gravitation)...`
                    }
                    className="w-full pl-11 pr-10 py-3 bg-slate-50 border-2 border-slate-200 focus:border-blue-500 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                  />
                  {questionSearchQuery && (
                    <button
                      onClick={() => setQuestionSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Quick Topic Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                  <span className="text-slate-400 font-bold flex-shrink-0">Quick Search:</span>
                  {(isLowerGrade
                    ? ['Numbers', 'Shapes', 'Animals', 'Addition', 'Vowels', 'Colors']
                    : ['Algebra', 'Photosynthesis', 'Motion', 'Gravitation', 'Chemical Reactions', 'Grammar']
                  ).map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuestionSearchQuery(term)}
                      className={`flex-shrink-0 px-2.5 py-1 rounded-lg font-bold transition ${
                        questionSearchQuery.toLowerCase() === term.toLowerCase()
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>

                {/* Filter Pills: Subject & Difficulty */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {/* Subject Filter */}
                  <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
                    <span className="text-[10px] font-black uppercase text-slate-500 px-1.5">Subject:</span>
                    <button
                      onClick={() => setSelectedSubjectFilter('all')}
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-lg transition ${
                        selectedSubjectFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      All
                    </button>
                    {gradeSubjects.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedSubjectFilter(s.id)}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-lg transition ${
                          selectedSubjectFilter === s.id ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                        }`}
                      >
                        {s.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  {/* Difficulty Filter */}
                  <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
                    <span className="text-[10px] font-black uppercase text-slate-500 px-1.5">Level:</span>
                    {['all', 'easy', 'medium', 'hard'].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setSelectedDifficultyFilter(lvl)}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-lg capitalize transition ${
                          selectedDifficultyFilter === lvl ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Questions Cards List - Card Ways Basis */}
              <div id="questions-practice-top" className="space-y-4">
                {/* Top Pagination Toolbar */}
                {renderPaginationToolbar('top')}

                {paginatedPracticeQuestions.map((q, idx) => {
                  const qSubject = subjects.find((s) => s.id === q.subjectId);
                  const userChoice = userPracticeAnswers[q.id];
                  const isAnswered = userChoice !== undefined && userChoice !== '';
                  const isCorrect = isAnswered && isStudentAnswerCorrect(q, userChoice);
                  const isSolutionOpen = revealedSolutions[q.id];
                  const itemIndex = practicePageSize === 0 ? idx : (practicePage - 1) * practicePageSize + idx;

                  const isInteractiveText =
                    q.questionType === 'fill_blank' ||
                    q.questionType === 'numerical' ||
                    q.questionType === 'short_answer' ||
                    !q.options ||
                    q.options.length === 0;

                  return (
                    <div
                      key={q.id || idx}
                      className="bg-white rounded-2xl sm:rounded-3xl border-2 border-slate-200 hover:border-blue-300 p-4 sm:p-6 space-y-3.5 transition shadow-xs"
                    >
                      {/* Card Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-black px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                            Q#{itemIndex + 1} • {qSubject?.name || 'Curriculum'}
                          </span>
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                              q.difficulty === 'easy'
                                ? 'bg-emerald-50 text-emerald-700'
                                : q.difficulty === 'hard'
                                ? 'bg-rose-50 text-rose-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {q.difficulty || 'medium'}
                          </span>
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                            {isInteractiveText ? (q.questionType === 'numerical' ? 'Write Numerical' : 'Fill in Blank') : 'Multiple Choice'}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => speakText(q.text)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                            title="Read question aloud"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          {isAnswered && (
                            <span
                              className={`text-[11px] font-black px-2 py-0.5 rounded-md flex items-center space-x-1 ${
                                isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                                  <span>Correct! (+5 pts)</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3 h-3 text-rose-700" />
                                  <span>Incorrect</span>
                                </>
                              )}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Question Text */}
                      <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                        {q.text}
                      </p>

                      {/* Interactive Section: Input Box vs MCQ Buttons */}
                      {isInteractiveText ? (
                        <div className="space-y-3 pt-1">
                          <div className="p-4 bg-amber-50/70 rounded-2xl border-2 border-amber-200 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-black uppercase text-amber-900 tracking-wider flex items-center gap-1.5">
                                <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                                <span>✍️ Type Your Answer (Fill in the Blank):</span>
                              </label>
                              {isAnswered && (
                                <span className={`text-[11px] font-black px-2 py-0.5 rounded-md ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                                  {isCorrect ? '✓ Correct Answer' : '✗ Try Again'}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={practiceInputDrafts[q.id] !== undefined ? practiceInputDrafts[q.id] : (typeof userChoice === 'string' ? userChoice : '')}
                                onChange={(e) => setPracticeInputDrafts((prev) => ({ ...prev, [q.id]: e.target.value }))}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handlePracticeInputSubmit(q.id, q);
                                  }
                                }}
                                placeholder="Type your answer here (e.g., Photosynthesis, 12, True)..."
                                className="flex-1 p-3 rounded-xl border-2 border-amber-300 focus:border-blue-500 bg-white font-bold text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200 transition shadow-inner"
                              />
                              <button
                                onClick={() => handlePracticeInputSubmit(q.id, q)}
                                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5 shrink-0 cursor-pointer"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>Check</span>
                              </button>
                            </div>
                            {isAnswered && !isCorrect && (
                              <p className="text-[11px] text-rose-700 font-bold">
                                Not quite right. Check your spelling or calculation, or click "View Solution & Steps" below.
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {(q.options || ['Option A', 'Option B', 'Option C', 'Option D']).map(
                            (opt: string, optIdx: number) => {
                              const isThisSelected = userChoice === optIdx;
                              const correctIdx = getCorrectOptionIndex(q);
                              const isThisCorrect = optIdx === correctIdx;
                              const optionLetter = String.fromCharCode(65 + optIdx);

                              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-blue-50/60 hover:border-blue-300';
                              if (isAnswered) {
                                if (isThisSelected && isThisCorrect) {
                                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300';
                                } else if (isThisSelected && !isThisCorrect) {
                                  btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-300';
                                } else if (isThisCorrect) {
                                  btnStyle = 'bg-emerald-50/60 border-emerald-400 text-emerald-900 border-dashed';
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handlePracticeOptionClick(q.id, optIdx, q)}
                                  className={`w-full min-h-[44px] p-3 text-left rounded-xl border-2 text-xs sm:text-sm font-semibold transition-all flex items-center space-x-3 active:scale-[0.98] cursor-pointer ${btnStyle}`}
                                >
                                  <span
                                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${
                                      isThisSelected && isThisCorrect
                                        ? 'bg-emerald-600 text-white'
                                        : isThisSelected && !isThisCorrect
                                        ? 'bg-rose-600 text-white'
                                        : 'bg-white border border-slate-300 text-slate-700'
                                    }`}
                                  >
                                    {optionLetter}
                                  </span>
                                  <span className="flex-1">{opt}</span>
                                  {isAnswered && isThisCorrect && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                  )}
                                  {isAnswered && isThisSelected && !isThisCorrect && (
                                    <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                                  )}
                                </button>
                              );
                            }
                          )}
                        </div>
                      )}

                      {/* Card Action Buttons: Only Required Buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => toggleRevealSolution(q.id)}
                          className="px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition flex items-center space-x-1.5 min-h-[40px] cursor-pointer"
                        >
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                          <span>{isSolutionOpen ? 'Hide Solution' : 'View Solution & Steps'}</span>
                        </button>

                        <button
                          onClick={() =>
                            openAITutorWithContext({
                              subject: qSubject?.name || `Grade ${selectedGradeFilter}`,
                              chapter: q.text,
                              topic: `Explain question: ${q.text}`,
                            })
                          }
                          className="px-3 py-1.5 text-xs font-bold rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition flex items-center space-x-1.5 min-h-[40px] cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                          <span>Ask AI Tutor</span>
                        </button>
                      </div>

                      {/* Step-by-Step Solution Breakdown */}
                      {isSolutionOpen && (
                        <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 space-y-2 text-xs text-amber-950 animate-in fade-in duration-150">
                          <div className="font-black text-amber-900 flex items-center space-x-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Correct / Accepted Answer: {getCorrectAnswerDisplay(q)}</span>
                          </div>
                          <p className="font-medium text-slate-700 leading-relaxed">
                            {q.explanation || 'According to the curriculum standard, this concept applies the fundamental definition taught in this chapter.'}
                          </p>
                          {q.stepByStepSolution && q.stepByStepSolution.length > 0 && (
                            <div className="pt-2 border-t border-amber-200/60 space-y-1">
                              <span className="font-bold text-amber-900 uppercase text-[10px] tracking-wider block">Step-by-Step Solution:</span>
                              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-700">
                                {q.stepByStepSolution.map((s: string, sIdx: number) => (
                                  <li key={sIdx}>{s}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Bottom Pagination Toolbar */}
                {renderPaginationToolbar('bottom')}

                {filteredGradeQuestions.length === 0 && (
                  <div className="text-center py-10 space-y-3 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <Search className="w-10 h-10 text-slate-300 mx-auto" />
                    <p className="text-sm font-black text-slate-800">
                      No questions found matching "{questionSearchQuery}" for Grade {selectedGradeFilter}.
                    </p>
                    <button
                      onClick={() => setQuestionSearchQuery('')}
                      className="text-xs font-black px-4 py-2 bg-blue-600 text-white rounded-xl shadow-xs"
                    >
                      Clear Search Query
                    </button>
                  </div>
                )}
              </div>
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

              {/* Options Grid OR Text Write-In Field */}
              {(() => {
                const isInteractiveText =
                  currentQ?.questionType === 'fill_blank' ||
                  currentQ?.questionType === 'numerical' ||
                  currentQ?.questionType === 'short_answer' ||
                  !currentQ?.options ||
                  currentQ.options.length === 0;

                if (isInteractiveText) {
                  const currentTyped = typeof selectedAnswers[currentIdx] === 'string' ? selectedAnswers[currentIdx] : '';
                  return (
                    <div className="space-y-3 pt-2">
                      <div className="p-4 bg-amber-50/80 rounded-2xl border-2 border-amber-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-black uppercase text-amber-900 tracking-wider flex items-center gap-1.5">
                            <Edit3 className="w-4 h-4 text-amber-700" />
                            <span>✍️ Type Your Answer in the Input Box:</span>
                          </label>
                          {currentTyped && (
                            <span className="text-[11px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                              Answer Saved
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={currentTyped}
                          onChange={(e) => setSelectedAnswers({ ...selectedAnswers, [currentIdx]: e.target.value })}
                          placeholder="Type your answer here (e.g., Photosynthesis, 12, True)..."
                          className="w-full p-3.5 sm:p-4 rounded-xl border-2 border-amber-300 focus:border-rose-500 bg-white font-bold text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-3 focus:ring-rose-200 transition shadow-xs"
                        />
                        <p className="text-[11px] text-amber-800 font-medium">
                          💡 <strong>Instruction:</strong> Enter your answer directly. Both numeric and text answers are evaluated upon test submission.
                        </p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="space-y-2.5 pt-2">
                    {currentQ.options?.map((opt: string, optIdx: number) => {
                      const isSelected = selectedAnswers[currentIdx] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => setSelectedAnswers({ ...selectedAnswers, [currentIdx]: optIdx })}
                          className={`w-full p-3.5 sm:p-4 rounded-2xl border-2 text-left text-xs sm:text-sm transition flex items-center space-x-3.5 cursor-pointer ${
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
                );
              })()}
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
                const isCorrect = isStudentAnswerCorrect(q, userAns);
                if (resultFilter === 'incorrect') return (userAns !== undefined && userAns !== '') && !isCorrect;
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
                const isAnswered = userAns !== undefined && userAns !== '';
                const isCorrect = isAnswered && isStudentAnswerCorrect(rawQ, userAns);

                const isInteractiveText =
                  rawQ.questionType === 'fill_blank' ||
                  rawQ.questionType === 'numerical' ||
                  rawQ.questionType === 'short_answer' ||
                  !rawQ.options ||
                  rawQ.options.length === 0;

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
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                            {isInteractiveText ? (rawQ.questionType === 'numerical' ? 'Numerical' : 'Fill in Blank') : 'Multiple Choice'}
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

                    {/* Option Choices Breakdown OR Write-in Student Response */}
                    {isInteractiveText ? (
                      <div className="p-3.5 bg-white/90 rounded-xl border border-slate-200 text-xs space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-slate-500">Your Answer:</span>
                          <span
                            className={`font-black px-2.5 py-1 rounded-lg ${
                              !isAnswered
                                ? 'bg-slate-100 text-slate-500'
                                : isCorrect
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-rose-100 text-rose-900 border border-rose-300'
                            }`}
                          >
                            {!isAnswered ? '(Unanswered)' : String(userAns)}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-emerald-800">Accepted / Correct Answer:</span>
                          <span className="font-black text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                            {getCorrectAnswerDisplay(rawQ)}
                          </span>
                        </div>
                      </div>
                    ) : (
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
                    )}

                    {/* Detailed Pedagogical Explanation */}
                    {q.explanation && (
                      <div className="p-3 bg-blue-50/90 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-medium flex-1">
                            💡 <strong>Concept Explanation:</strong> {q.explanation}
                          </p>
                          <button
                            onClick={() => {
                              setModalQuestion(q);
                              setModalSelectedOption(userAns ?? null);
                              setIsDetailModalOpen(true);
                            }}
                            className="px-2.5 py-1 bg-white hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-lg border border-blue-300 transition flex items-center space-x-1 shadow-2xs cursor-pointer shrink-0"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>{t('view_detailed_answer', 'Deep-Dive Window ↗')}</span>
                          </button>
                        </div>
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

      {/* Detailed Answer & Step-by-Step Breakdown Modal */}
      <DetailedAnswerModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        question={modalQuestion}
        selectedOptionIndex={modalSelectedOption}
        subjectName={activeSubject?.name}
        chapterTitle="Test Review & Concept Diagnostic"
      />
    </div>
  );
};
