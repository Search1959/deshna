import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getIntelligentQuestionsForChapter } from '../data/curriculumData';
import { getIntelligentLessonForTopic } from '../data/curriculumGenerator';
import { generateInstantChapterQuestion } from '../utils/dynamicQuestionBuilder';
import { Question } from '../types';
import { DetailedAnswerModal } from '../components/DetailedAnswerModal';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Volume2,
  RotateCcw,
  Zap,
  Award,
  Layers,
  ChevronRight,
  Lightbulb,
  Check,
  RefreshCw,
  Plus,
  Shuffle,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ChapterView: React.FC = () => {
  const {
    chapters,
    subjects,
    topics,
    lessons,
    questions,
    selectedChapterId,
    selectedSubjectId,
    getChaptersForSubject,
    setActiveView,
    openAITutorWithContext,
    speakText,
    awardPoints,
    updateStudentMastery,
    currentStudent,
    selectedLanguage,
    t,
    localizeSubject,
    localizeChapter,
    localizeTopic,
    localizeLesson,
    localizeQuestion,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'summary'>('learn');
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);

  // Dynamic / AI generated questions
  const [extraGeneratedQuestions, setExtraGeneratedQuestions] = useState<Question[]>([]);
  const [isGeneratingAIQuestions, setIsGeneratingAIQuestions] = useState(false);

  // Practice session state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showDetailedAnswerModal, setShowDetailedAnswerModal] = useState(false);

  // Lookup chapter in static/stored chapters or in dynamically provisioned list
  const rawChapter =
    chapters.find((c) => c.id === selectedChapterId) ||
    (selectedSubjectId ? getChaptersForSubject(selectedSubjectId).find((c) => c.id === selectedChapterId) : undefined) ||
    (selectedSubjectId ? getChaptersForSubject(selectedSubjectId)[0] : chapters[0]);
  const rawSubj = subjects.find((s) => s.id === rawChapter?.subjectId);
  const currentChapter = rawChapter ? localizeChapter(rawChapter) : rawChapter;
  const currentSubj = rawSubj ? localizeSubject(rawSubj) : rawSubj;
  const rawChapterTopics = topics.filter((t) => t.chapterId === rawChapter?.id);
  const chapterTopics = (rawChapterTopics.length > 0 ? rawChapterTopics : [{ id: 'top-fallback', chapterId: rawChapter?.id || 'ch', title: 'Core Concepts & Principles', summary: 'Foundational ideas and applications.', difficulty: 'easy' } as any]).map(localizeTopic);
  const currentTopic = chapterTopics[selectedTopicIndex] || chapterTopics[0];
  const currentLesson = lessons.find((l) => l.topicId === currentTopic?.id);
  const rawLesson = currentLesson || getIntelligentLessonForTopic(currentTopic, currentChapter, currentSubj);
  const resolvedLesson = localizeLesson(rawLesson);

  const [shuffledQuestions, setShuffledQuestions] = useState<Question[] | null>(null);

  // Resolve questions: preseeded, extra generated, or fallback intelligent generator
  const baseQuestions = questions.filter((q) => q.chapterId === rawChapter?.id);
  const initialResolvedQuestions =
    baseQuestions.length > 0
      ? baseQuestions
      : getIntelligentQuestionsForChapter(
          rawChapter?.id || 'ch-default',
          rawSubj?.id || 'subj-default',
          rawChapter?.gradeId || currentStudent.gradeId,
          rawChapter?.title,
          rawSubj?.name
        );

  const rawChapterQuestions = [...initialResolvedQuestions, ...extraGeneratedQuestions];
  const allChapterQuestions = (shuffledQuestions && shuffledQuestions.length === rawChapterQuestions.length
    ? shuffledQuestions
    : rawChapterQuestions
  ).map(localizeQuestion);
  const activeQuestion = allChapterQuestions[currentQIndex] || allChapterQuestions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const getCorrectOptionIndex = (q: Question): number => {
    if (typeof q?.correctAnswer === 'number') return q.correctAnswer;
    if (typeof q?.correctAnswer === 'string') {
      const idx = q.options?.findIndex((opt: string) => opt.toLowerCase() === (q.correctAnswer as string).toLowerCase());
      if (idx !== -1 && idx !== undefined) return idx;
      const letterIdx = (q.correctAnswer as string).charCodeAt(0) - 65;
      if (letterIdx >= 0 && letterIdx < (q.options?.length || 4)) return letterIdx;
    }
    return 0;
  };

  const handleSubmitAnswer = () => {
    if (isAnswerSubmitted || !activeQuestion || selectedOption === null) return;

    const correctIdx = getCorrectOptionIndex(activeQuestion);
    const isCorrect = selectedOption === correctIdx;

    setIsAnswerSubmitted(true);

    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      awardPoints(20, 'Correct practice question');
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      } catch {}
    }

    if (currentSubj && currentChapter && currentTopic) {
      updateStudentMastery(currentSubj.id, currentChapter.id, currentTopic.id, isCorrect);
    }
  };

  const handleNextQuestion = () => {
    setShowDetailedAnswerModal(false);
    if (currentQIndex < allChapterQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleResetPractice = () => {
    setShowDetailedAnswerModal(false);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setQuizScore(0);
    setIsQuizCompleted(false);
  };

  // Shuffle questions and options with mathematically preserved correct answer indices
  const handleShufflePractice = () => {
    const questionsToShuffle = [...rawChapterQuestions];
    for (let i = questionsToShuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionsToShuffle[i], questionsToShuffle[j]] = [questionsToShuffle[j], questionsToShuffle[i]];
    }

    const rebalancedQuestions = questionsToShuffle.map((q) => {
      const originalOptions = [...(q.options || [])];
      if (originalOptions.length <= 1) return q;

      const correctIdx = getCorrectOptionIndex(q);
      const correctOptionValue = originalOptions[correctIdx] ?? originalOptions[0];

      // Shuffle options
      const newOptions = [...originalOptions];
      for (let oi = newOptions.length - 1; oi > 0; oi--) {
        const oj = Math.floor(Math.random() * (oi + 1));
        [newOptions[oi], newOptions[oj]] = [newOptions[oj], newOptions[oi]];
      }

      const newCorrectIdx = newOptions.indexOf(correctOptionValue);

      return {
        ...q,
        options: newOptions,
        correctAnswer: newCorrectIdx !== -1 ? newCorrectIdx : 0,
      };
    });

    setShuffledQuestions(rebalancedQuestions);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setQuizScore(0);
    setIsQuizCompleted(false);
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    } catch {}
  };

  // Generate extra AI questions on the fly (Instant with zero lag)
  const handleGenerateAIQuestions = async () => {
    setIsGeneratingAIQuestions(true);
    try {
      // 1. Immediately create instant high-quality, chapter-tailored curriculum questions with 0 latency
      const instantQ = generateInstantChapterQuestion(
        currentChapter,
        currentSubj,
        currentTopic,
        extraGeneratedQuestions.length + initialResolvedQuestions.length,
        selectedLanguage
      );

      // Append immediately
      setExtraGeneratedQuestions((prev) => [...prev, instantQ]);

      // Fast brief feedback delay (200ms) for pleasant UI reactivity
      await new Promise((r) => setTimeout(r, 200));
    } catch (err) {
      console.error('Fast question generation error:', err);
      const localGen = getIntelligentQuestionsForChapter(
        currentChapter?.id || 'chap',
        currentSubj?.id || 'subj',
        currentChapter?.gradeId || currentStudent.gradeId,
        currentChapter?.title,
        currentSubj?.name
      );
      if (localGen && localGen.length > 0) {
        setExtraGeneratedQuestions((prev) => [...prev, localGen[0]]);
      }
    } finally {
      setIsGeneratingAIQuestions(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-5 sm:space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-bold text-[#78350F]">
        <button
          onClick={() => setActiveView('student_dashboard')}
          className="hover:text-[#D97706] transition bg-[#FEF3C7] px-2.5 py-1 rounded-lg border border-[#FDE68A]"
        >
          {t('dashboard', 'Dashboard')}
        </button>
        <span className="text-[#B45309]">/</span>
        <button
          onClick={() => setActiveView('subject_detail')}
          className="hover:text-[#D97706] transition bg-[#FEF3C7] px-2.5 py-1 rounded-lg border border-[#FDE68A]"
        >
          {currentSubj?.name || t('subject', 'Subject')}
        </button>
        <span className="text-[#B45309]">/</span>
        <span className="text-[#1F2937] font-black bg-[#D1FAE5] text-[#065F46] px-2.5 py-1 rounded-lg border border-[#6EE7B7] truncate max-w-[200px] sm:max-w-none">
          {t('chapter', 'Ch')} {currentChapter?.number}: {currentChapter?.title}
        </span>
      </div>

      {/* Chapter Hero Card */}
      <div className="bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl relative overflow-hidden border-b-6 sm:border-b-8 border-[#1E40AF]">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-yellow-300 border border-white/30">
                {currentSubj?.name} • {t('chapter', 'Chapter')} {currentChapter?.number}
              </span>
              <span className="text-[11px] text-blue-100 font-bold">~{currentChapter?.estMinutes} {t('min', 'mins')}</span>
            </div>
            <h1 className="text-xl sm:text-4xl font-black tracking-tight">
              {currentChapter?.title}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-bold">
              {currentChapter?.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() =>
                openAITutorWithContext({
                  subject: currentSubj?.name,
                  chapter: currentChapter?.title,
                  topic: currentTopic?.title,
                })
              }
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 bg-[#F59E0B] hover:bg-[#D97706] text-slate-900 rounded-xl sm:rounded-2xl font-black text-xs shadow-md transition flex items-center justify-center space-x-2 shrink-0 border-2 border-yellow-300 min-h-[42px]"
            >
              <Sparkles className="w-4 h-4 text-slate-900" />
              <span>{t('ask_ai_tutor', 'Ask Chapter Tutor')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation Controls: [LEARN] [PRACTICE] [SUMMARY & REVISION] */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b-2 border-amber-200/80 -mx-3 px-3 sm:mx-0 sm:px-0">
        <button
          onClick={() => setActiveTab('learn')}
          className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center space-x-2 whitespace-nowrap min-h-[40px] shrink-0 ${
            activeTab === 'learn'
              ? 'bg-[#3B82F6] text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. {t('learn_topic', 'Learn Topics')} ({chapterTopics.length || 1})</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center space-x-2 whitespace-nowrap min-h-[40px] shrink-0 ${
            activeTab === 'practice'
              ? 'bg-[#3B82F6] text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-200'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-500" />
          <span>2. {t('practice', 'Practice & Quiz')} ({allChapterQuestions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('summary')}
          className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center space-x-2 whitespace-nowrap min-h-[40px] shrink-0 ${
            activeTab === 'summary'
              ? 'bg-[#3B82F6] text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>3. {t('flash_summary', 'Flash Summary & Notes')}</span>
        </button>
      </div>

      {/* Tab 1: [LEARN] Topic Sidebar & Pedagogical Lesson */}
      {activeTab === 'learn' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column: Topic Navigator */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-3 h-fit">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
              Chapter Topics
            </h3>
            <div className="space-y-2">
              {(chapterTopics.length > 0 ? chapterTopics : [{ id: 'top-fallback', title: 'Core Concepts & Principles', summary: 'Foundational ideas and applications.', difficulty: 'easy' }]).map((topic: any, idx: number) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicIndex(idx)}
                  className={`w-full p-3 rounded-2xl text-left transition flex items-center space-x-3 text-xs font-semibold ${
                    selectedTopicIndex === idx
                      ? 'bg-blue-50 border border-blue-200 text-blue-900 font-bold'
                      : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                      selectedTopicIndex === idx
                        ? 'bg-[#3B82F6] text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="truncate">{topic.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Pedagogical Lesson Content */}
          <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <span className="text-[11px] font-bold text-[#2563EB] uppercase">
                  Topic {selectedTopicIndex + 1} of {Math.max(1, chapterTopics.length)}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                  {currentTopic?.title || currentChapter?.title}
                </h2>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    speakText(
                      currentTopic?.summary ||
                        currentChapter?.description ||
                        ''
                    )
                  }
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition"
                  title="Read lesson aloud"
                >
                  <Volume2 className="w-4 h-4 text-[#2563EB]" />
                  <span>Listen</span>
                </button>
                <button
                  onClick={() => setActiveTab('practice')}
                  className="px-3 py-1.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
                >
                  <Zap className="w-4 h-4" />
                  <span>Practice Questions</span>
                </button>
              </div>
            </div>

            {/* Concept Summary Callout */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
              <div className="flex items-center space-x-2 font-bold text-blue-900">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Concept Summary & Key Takeaway</span>
              </div>
              <p>{currentTopic?.summary || currentChapter?.description}</p>
            </div>

            {/* Structured Lesson Sections */}
            {resolvedLesson?.sections && resolvedLesson.sections.length > 0 ? (
              <div className="space-y-6">
                {resolvedLesson.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-3 pt-2">
                    <h3 className="text-base font-bold text-slate-900">{sec.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {sec.content}
                    </p>
                    {sec.analogy && (
                      <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 font-medium">
                        💡 <strong>Real-world Analogy:</strong> {sec.analogy}
                      </div>
                    )}
                    {sec.example && (
                      <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950">
                        🔍 <strong>Example:</strong> {sec.example}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-sm text-slate-900">Core Learning Objective</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Master the principles of {currentChapter?.title} through structured step-by-step reasoning, real-world examples, and continuous interactive quiz practice.
                  </p>
                </div>
                {currentChapter?.learningObjectives && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <h4 className="font-bold text-xs uppercase text-emerald-900">Key Chapter Goals:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-emerald-950">
                      {currentChapter.learningObjectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Key Takeaways */}
            {resolvedLesson?.keyTakeaways && (
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 space-y-2">
                <span className="text-xs font-bold uppercase text-purple-900">Key Takeaways</span>
                <ul className="list-disc pl-5 space-y-1 text-xs text-purple-950">
                  {resolvedLesson.keyTakeaways.map((k, i) => (
                    <li key={i}>{k}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: [PRACTICE] Adaptive Questions & Step-by-Step Solutions */}
      {activeTab === 'practice' && (
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
          {/* Header Bar with Shuffle & AI Generate Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Question {currentQIndex + 1} of {allChapterQuestions.length}
              </span>
              <span className="text-xs font-bold capitalize text-slate-500">
                {activeQuestion?.difficulty || 'Standard'} Level
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleShufflePractice}
                title={t('shuffle_questions', 'Shuffle Questions & Options')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border border-slate-200"
              >
                <Shuffle className="w-3.5 h-3.5 text-blue-600" />
                <span>{t('shuffle', 'Shuffle')}</span>
              </button>

              <button
                onClick={handleGenerateAIQuestions}
                disabled={isGeneratingAIQuestions}
                className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-white rounded-xl text-xs font-black shadow-xs transition flex items-center space-x-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingAIQuestions ? 'animate-spin' : ''}`} />
                <span>{isGeneratingAIQuestions ? 'Generating Quiz...' : '+ Generate More AI Questions'}</span>
              </button>
            </div>
          </div>

          {!isQuizCompleted && activeQuestion ? (
            <div className="space-y-6">
              {/* Question Text */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed flex-1">
                    {activeQuestion.text}
                  </p>
                  {isAnswerSubmitted && (
                    <button
                      id="btn-view-detailed-answer"
                      onClick={() => setShowDetailedAnswerModal(true)}
                      title={t('view_detailed_answer_tooltip', 'Click to open detailed explanation window and concept breakdown')}
                      className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-xs shadow-md shadow-blue-500/20 transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer border border-blue-400/40"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                      <span>{t('view_detailed_answer', 'View Detailed Answer')}</span>
                    </button>
                  )}
                </div>
                {activeQuestion.diagramUrl && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-center">
                    <img
                      src={activeQuestion.diagramUrl}
                      alt="Question Diagram"
                      className="max-h-48 object-contain rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Options for MCQ */}
              {activeQuestion.options && (
                <div className="space-y-2.5">
                  {activeQuestion.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const correctIdx = getCorrectOptionIndex(activeQuestion);
                    const isCorrect = idx === correctIdx;
                    let btnStyle = 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800';

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-50 border-rose-500 text-rose-900';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-blue-50 border-blue-600 text-blue-900 font-bold ring-1 ring-blue-600';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswerSubmitted}
                        className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition flex items-center justify-between ${btnStyle}`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isAnswerSubmitted && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Hint Reveal Section */}
              <div className="pt-2">
                {!showHint ? (
                  <button
                    onClick={() => setShowHint(true)}
                    className="text-xs font-semibold text-[#2563EB] hover:text-blue-800 flex items-center space-x-1"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t('need_a_hint', 'Need a hint?')}</span>
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start space-x-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>{t('hint', 'Hint')}:</strong> {activeQuestion.hints?.[0] || 'Review the core definition.'}
                    </div>
                  </div>
                )}
              </div>

              {/* Step-by-Step Solution Breakdown after submission */}
              {isAnswerSubmitted && (
                <div className="p-4.5 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-3 text-xs sm:text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-1.5 font-bold text-blue-900">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{t('explanation', 'Step-by-Step Pedagogical Explanation')}:</span>
                    </div>
                    <button
                      onClick={() => setShowDetailedAnswerModal(true)}
                      className="px-2.5 py-1 bg-white hover:bg-blue-100/90 text-blue-700 font-bold text-xs rounded-lg border border-blue-300 transition flex items-center space-x-1 shadow-2xs cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>{t('open_deep_dive_window', 'Open Detailed Breakdown Window ↗')}</span>
                    </button>
                  </div>
                  <p className="text-slate-800 leading-relaxed">{activeQuestion.explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() =>
                    openAITutorWithContext({
                      subject: currentSubj?.name,
                      chapter: currentChapter?.title,
                      topic: activeQuestion.text,
                    })
                  }
                  className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('ask_ai_tutor', 'Ask AI Tutor to clarify')}</span>
                </button>

                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="px-6 py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-xs transition"
                  >
                    {t('submit_answer', 'Submit Answer')}
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1"
                  >
                    <span>{currentQIndex < allChapterQuestions.length - 1 ? t('next_question', 'Next Question') : t('finish_quiz', 'Finish Quiz')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{t('practice_completed', 'Practice Session Completed!')}</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                {t('you_scored', 'You scored')} {quizScore} / {allChapterQuestions.length} {t('correct', 'correctly')}!
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={handleShufflePractice}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>{t('shuffle_and_restart', 'Shuffle & Practice Again')}</span>
                </button>
                <button
                  onClick={handleResetPractice}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 border border-slate-200 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t('retake_practice', 'Retake Practice')}</span>
                </button>
                <button
                  onClick={handleGenerateAIQuestions}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t('generate_ai_questions', 'Generate New AI Questions')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: [SUMMARY] Quick Revision Formula Sheets */}
      {activeTab === 'summary' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              Chapter {currentChapter?.number} Summary Sheet
            </h3>
            <p className="text-xs text-slate-500">Key takeaways, memory tricks, and core formulas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(chapterTopics.length > 0 ? chapterTopics : [{ id: 'sum-1', title: currentChapter?.title || 'Core Principles', summary: currentChapter?.description || 'Foundational syllabus objectives.' }]).map((top: any, idx: number) => (
              <div key={top.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                  Topic {idx + 1}
                </span>
                <h4 className="font-bold text-slate-900 text-sm">{top.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{top.summary}</p>
                {top.keyConcepts && (
                  <div className="pt-2 flex flex-wrap gap-1">
                    {top.keyConcepts.map((k: string, ki: number) => (
                      <span
                        key={ki}
                        className="text-[10px] bg-blue-100 text-blue-900 px-2 py-0.5 rounded-md font-medium"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Answer & Step-by-Step Pedagogical Explanation Window */}
      <DetailedAnswerModal
        isOpen={showDetailedAnswerModal}
        onClose={() => setShowDetailedAnswerModal(false)}
        question={activeQuestion}
        selectedOptionIndex={selectedOption}
        subjectName={currentSubj?.name}
        chapterTitle={currentChapter?.title}
        onNextQuestion={handleNextQuestion}
        hasNextQuestion={currentQIndex < allChapterQuestions.length - 1}
      />
    </div>
  );
};
