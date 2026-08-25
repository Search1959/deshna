import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mic,
  MicOff,
  Volume2,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  Globe2,
  Filter,
  Check,
  Languages,
  Shuffle,
  History,
  FileText,
  VolumeX,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { evaluateReadingAttempt, ReadingEvaluationResult } from '../utils/readingEvaluator';

export const ReadingCoachView: React.FC = () => {
  const {
    stories,
    currentStudent,
    speakText,
    awardPoints,
    selectedLanguage,
    readingRecords,
    recordReadingAttempt,
  } = useApp();

  // Language filter: defaults to current app language or 'all'
  const [selectedLangFilter, setSelectedLangFilter] = useState<string>('all');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<number | 'all'>('all');

  // Filtered stories based on language and grade
  const filteredStories = stories.filter((s) => {
    const matchesLang =
      selectedLangFilter === 'all' ||
      s.languageCode === selectedLangFilter ||
      (selectedLangFilter === 'en' && (!s.languageCode || s.languageCode === 'en'));
    const matchesGrade =
      selectedGradeFilter === 'all' || s.gradeId === selectedGradeFilter;
    return matchesLang && matchesGrade;
  });

  const [selectedStoryId, setSelectedStoryId] = useState<string>(
    () => filteredStories[0]?.id || stories[0]?.id || 'story-g3-1'
  );

  // Keep selectedStoryId valid if filteredStories changes
  useEffect(() => {
    if (filteredStories.length > 0 && !filteredStories.some((s) => s.id === selectedStoryId)) {
      setSelectedStoryId(filteredStories[0].id);
      handleReset();
    }
  }, [selectedLangFilter, selectedGradeFilter]);

  const activeStory = stories.find((s) => s.id === selectedStoryId) || filteredStories[0] || stories[0];
  const words = activeStory ? activeStory.passage.split(/\s+/) : [];

  // Reading Session State
  const [isListening, setIsListening] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<ReadingEvaluationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Comprehension Questions
  const [compAnswers, setCompAnswers] = useState<Record<number, number>>({});
  const [compSubmitted, setCompSubmitted] = useState(false);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  // Speech Recognition language mapping
  const getRecognitionLang = (langCode?: string) => {
    switch (langCode) {
      case 'hi': return 'hi-IN';
      case 'mr': return 'mr-IN';
      case 'gu': return 'gu-IN';
      case 'ta': return 'ta-IN';
      case 'te': return 'te-IN';
      case 'bn': return 'bn-IN';
      case 'sa': return 'hi-IN';
      default: return 'en-IN';
    }
  };

  // Setup Web Speech Recognition with dynamic language
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = getRecognitionLang(activeStory?.languageCode);

      recognition.onresult = (event: any) => {
        let fullTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          fullTranscript += event.results[i][0].transcript + ' ';
        }
        const clean = fullTranscript.trim();
        setSpokenTranscript(clean);

        // Run authentic evaluation in real-time
        if (activeStory) {
          const liveEval = evaluateReadingAttempt(
            activeStory.passage,
            clean,
            elapsedSeconds || 1,
            activeStory.language || 'English'
          );
          setCurrentWordIndex(liveEval.matchedWordsCount);
        }
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition status:', e.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        if (isListening && !isFinished) {
          try {
            recognition.start();
          } catch {}
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [words.length, isFinished, isListening, activeStory?.languageCode, elapsedSeconds]);

  // Timer interval when reading
  useEffect(() => {
    if (isListening) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isListening]);

  const handleStartReading = () => {
    setIsListening(true);
    setIsFinished(false);
    setEvaluationResult(null);
    setSpokenTranscript('');
    setCurrentWordIndex(0);
    setStartTime(Date.now());
    setElapsedSeconds(0);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = getRecognitionLang(activeStory?.languageCode);
        recognitionRef.current.start();
      } catch (err) {
        console.log('Recognition start attempt');
      }
    }
  };

  const handleStopReading = () => {
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    handleFinishReading();
  };

  const handleFinishReading = async () => {
    setIsListening(false);
    setIsFinished(true);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }

    if (!activeStory) return;

    // Run 100% authentic deterministic speech evaluation
    const evaluation = evaluateReadingAttempt(
      activeStory.passage,
      spokenTranscript,
      elapsedSeconds,
      activeStory.language || 'English'
    );

    setEvaluationResult(evaluation);

    // Save genuine verified record to persistence store
    recordReadingAttempt({
      studentId: currentStudent.id,
      storyId: activeStory.id,
      storyTitle: activeStory.title,
      language: activeStory.language || 'English',
      languageCode: activeStory.languageCode || 'en',
      wpm: evaluation.actualWpm,
      accuracy: evaluation.accuracyPercent,
      durationSeconds: elapsedSeconds,
      wordsSpoken: evaluation.totalSpokenWords,
      wordsMatched: evaluation.matchedWordsCount,
      totalWords: evaluation.totalPassageWords,
      status: evaluation.status,
      transcriptSnippet: spokenTranscript ? spokenTranscript.slice(0, 100) : undefined,
      struggledWords: evaluation.struggledWords || [],
    });

    if (evaluation.xpAwarded > 0) {
      awardPoints(evaluation.xpAwarded, `Reading Practice (${activeStory.language}): ${activeStory.title}`);
    }

    if (evaluation.accuracyPercent >= 75) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {}
    }
  };

  const handleReset = () => {
    setIsListening(false);
    setIsFinished(false);
    setEvaluationResult(null);
    setSpokenTranscript('');
    setCurrentWordIndex(0);
    setElapsedSeconds(0);
    setCompAnswers({});
    setCompSubmitted(false);
  };

  const handleHearStory = () => {
    if (activeStory) {
      speakText(activeStory.passage, activeStory.languageCode || 'en');
    }
  };

  const handleHearWord = (word: string) => {
    const cleanWord = word.replace(/[.,!?"'()]/g, '');
    speakText(cleanWord, activeStory?.languageCode || 'en');
  };

  const handleShuffleStory = () => {
    if (filteredStories.length <= 1) return;
    const remaining = filteredStories.filter((s) => s.id !== selectedStoryId);
    const randomStory = remaining[Math.floor(Math.random() * remaining.length)];
    if (randomStory) {
      setSelectedStoryId(randomStory.id);
      handleReset();
    }
  };

  // Language counts
  const languagesList = [
    { code: 'all', label: 'All Languages', native: 'All Languages', count: stories.length },
    { code: 'en', label: 'English', native: 'English', count: stories.filter((s) => !s.languageCode || s.languageCode === 'en').length },
    { code: 'bn', label: 'Bengali', native: 'বাংলা', count: stories.filter((s) => s.languageCode === 'bn').length },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी', count: stories.filter((s) => s.languageCode === 'hi').length },
    { code: 'mr', label: 'Marathi', native: 'मराठी', count: stories.filter((s) => s.languageCode === 'mr').length },
    { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી', count: stories.filter((s) => s.languageCode === 'gu').length },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்', count: stories.filter((s) => s.languageCode === 'ta').length },
    { code: 'te', label: 'Telugu', native: 'తెలుగు', count: stories.filter((s) => s.languageCode === 'te').length },
    { code: 'sa', label: 'Sanskrit', native: 'संस्कृतम्', count: stories.filter((s) => s.languageCode === 'sa').length },
  ];

  // Recent student reading sessions
  const studentRecentRecords = readingRecords.filter((r) => r.studentId === currentStudent.id).slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857] rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl border-b-6 sm:border-b-8 border-[#065F46] relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-yellow-300 border border-white/30">
                Verified Speech & Reading Diagnostics
              </span>
              <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-900/40 text-emerald-100 border border-white/20">
                {stories.length} Stories • English, বাংলা, हिन्दी & Regional
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              AI Reading Coach
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 font-bold">
              Practice oral reading in English, বাংলা (Bengali), हिन्दी, and regional languages. The AI analyzes actual spoken words, measures real Words Per Minute (WPM), and records truthful progress reports for parents and teachers.
            </p>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 bg-white/20 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-white/30 backdrop-blur-md w-full sm:w-auto justify-around sm:justify-start">
            <div className="text-center px-3 sm:px-4 border-r-2 border-white/30">
              <span className="text-[10px] uppercase font-black text-emerald-100 block">Target Speed</span>
              <span className="text-base sm:text-xl font-black text-amber-300">{activeStory?.targetWpm || 80} WPM</span>
            </div>
            <div className="text-center px-3 sm:px-4">
              <span className="text-[10px] uppercase font-black text-emerald-100 block">Passage Words</span>
              <span className="text-base sm:text-xl font-black text-white">{words.length} Words</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Reading Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Story Selector Sidebar with Language & Grade Filters */}
        <div className="bg-white p-5 rounded-3xl border-4 border-[#6EE7B7] shadow-lg space-y-4 h-fit">
          {/* Language Selector Header with Quick Select Dropdown */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#065F46] flex items-center gap-1">
                <Languages className="w-4 h-4 text-[#059669]" />
                Select Language
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                {filteredStories.length} Stories
              </span>
            </div>

            {/* Quick Dropdown Selector */}
            <div className="w-full">
              <select
                value={selectedLangFilter}
                onChange={(e) => setSelectedLangFilter(e.target.value)}
                aria-label="Select Story Language"
                className="w-full bg-emerald-50 hover:bg-emerald-100/70 text-emerald-950 font-black text-xs py-2 px-3 rounded-xl border-2 border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
              >
                {languagesList.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.native} ({lang.label}) • {lang.count} {lang.count === 1 ? 'Story' : 'Stories'}
                  </option>
                ))}
              </select>
            </div>

            {/* Scrollable Language Filter Chips */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span>Quick Filter:</span>
                <span className="text-[10px] text-emerald-600 font-black">Scroll / Click ⇄</span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth">
                {languagesList
                  .filter((l) => l.count > 0 || l.code === 'all')
                  .map((lang) => {
                    const isSelected = selectedLangFilter === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => setSelectedLangFilter(lang.code)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-xl border transition flex items-center space-x-1 shrink-0 ${
                          isSelected
                            ? 'bg-[#10B981] text-white border-[#059669] shadow-xs font-black ring-2 ring-emerald-300/60'
                            : 'bg-[#F8FAFC] text-slate-700 hover:bg-[#E2E8F0] border-slate-200'
                        }`}
                      >
                        <span>{lang.native || lang.label}</span>
                        <span className={`text-[10px] px-1 rounded-md ${isSelected ? 'bg-emerald-700/70 text-white font-black' : 'bg-slate-200 text-slate-600 font-bold'}`}>
                          {lang.count}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Grade & Shuffle Controls */}
          <div className="space-y-2 pt-2 border-t border-emerald-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Filter Grade:</span>
              <select
                value={selectedGradeFilter}
                onChange={(e) => setSelectedGradeFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                aria-label="Filter stories by Grade"
                className="bg-emerald-50 text-emerald-950 font-black text-xs py-1 px-2 rounded-lg border border-emerald-200 focus:outline-none"
              >
                <option value="all">All Grades (1-10)</option>
                <option value={currentStudent.gradeId}>My Grade ({currentStudent.gradeId})</option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((g) => (
                  <option key={g} value={g}>
                    Grade {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Shuffle Story Button */}
            <button
              onClick={handleShuffleStory}
              className="w-full py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition shadow-2xs"
            >
              <Shuffle className="w-3.5 h-3.5 text-amber-600" />
              <span>Shuffle / Pick Random Story</span>
            </button>
          </div>

          {/* Stories List */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredStories.map((st) => {
              const isSelected = selectedStoryId === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    setSelectedStoryId(st.id);
                    handleReset();
                  }}
                  className={`w-full p-3.5 rounded-2xl text-left transition flex items-start justify-between gap-2 border-2 ${
                    isSelected
                      ? 'bg-[#D1FAE5] border-[#10B981] text-[#065F46] font-black shadow-xs ring-2 ring-emerald-400/30'
                      : 'bg-[#F8FAFC] text-slate-700 hover:bg-[#F1F5F9] border-[#E2E8F0]'
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-1">
                    <p className="text-xs font-black leading-snug break-words">{st.title}</p>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                        {st.language || 'English'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold">
                        Grade {st.gradeId}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        • {st.genre}
                      </span>
                    </div>
                  </div>
                  <BookOpen className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-[#059669]' : 'text-slate-400'}`} />
                </button>
              );
            })}

            {filteredStories.length === 0 && (
              <div className="p-4 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                No stories match this filter. Try selecting "All Languages" or "All Grades".
              </div>
            )}
          </div>
        </div>

        {/* Story Reader Canvas */}
        <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#6EE7B7] shadow-lg space-y-6">
          {/* Top Bar: Title & Narration Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b-2 border-emerald-100 gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#059669] bg-[#D1FAE5] px-2.5 py-0.5 rounded-md border border-[#A7F3D0]">
                  {activeStory?.genre}
                </span>
                <span className="text-[10px] font-black text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  {activeStory?.language || 'English'} • Grade {activeStory?.gradeId}
                </span>
                <span className="text-[10px] font-bold text-slate-500">
                  Target: {activeStory?.targetWpm} WPM
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1F2937] leading-tight">
                {activeStory?.title}
              </h2>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={handleHearStory}
                className="px-4 py-2 bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] border-2 border-[#FDE68A] rounded-xl text-xs font-black flex items-center space-x-1.5 transition shadow-xs"
                title={`Listen to native ${activeStory?.language || 'English'} narration`}
              >
                <Volume2 className="w-4 h-4 text-[#D97706]" />
                <span>Hear Story Read ({activeStory?.language || 'English'})</span>
              </button>
            </div>
          </div>

          {/* Interactive Passage Display with Word Highlight */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#ECFDF5] border-2 border-[#A7F3D0] leading-loose text-base sm:text-xl font-serif text-slate-800 selection:bg-emerald-200">
            {words.map((word, idx) => {
              const isCurrent = idx === currentWordIndex && isListening;
              const isPast = idx < currentWordIndex;

              return (
                <span
                  key={idx}
                  onClick={() => handleHearWord(word)}
                  className={`inline-block mx-1 my-0.5 px-1.5 py-0.5 rounded-lg cursor-pointer transition ${
                    isCurrent
                      ? 'bg-[#FBBF24] text-[#78350F] font-black scale-110 shadow-sm ring-2 ring-[#D97706]'
                      : isPast
                      ? 'text-[#065F46] font-bold bg-emerald-100/80'
                      : 'text-slate-800 hover:bg-white/80'
                  }`}
                  title="Click to hear pronunciation"
                >
                  {word}
                </span>
              );
            })}
          </div>

          {/* Vocabulary / Difficult Words Tag Strip */}
          {activeStory?.difficultWords && activeStory.difficultWords.length > 0 && (
            <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-black text-[#065F46] uppercase text-[10px] tracking-wider">
                Key Vocabulary (Click to Hear):
              </span>
              {activeStory.difficultWords.map((dw, dwIdx) => (
                <button
                  key={dwIdx}
                  onClick={() => handleHearWord(dw)}
                  className="px-2.5 py-1 bg-white hover:bg-emerald-100 text-[#065F46] font-bold rounded-lg border border-emerald-200 transition shadow-2xs flex items-center space-x-1"
                >
                  <Volume2 className="w-3 h-3 text-[#059669]" />
                  <span>{dw}</span>
                </button>
              ))}
            </div>
          )}

          {/* Real-time Reading Control Strip */}
          <div className="p-5 rounded-2xl bg-[#D1FAE5] border-2 border-[#6EE7B7] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              {!isListening ? (
                <button
                  id="start-reading-aloud-btn"
                  onClick={handleStartReading}
                  className="px-6 py-3 bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition flex items-center space-x-2 transform active:scale-95"
                >
                  <Mic className="w-5 h-5" />
                  <span>Start Reading Aloud ({activeStory?.language || 'English'})</span>
                </button>
              ) : (
                <button
                  id="stop-reading-aloud-btn"
                  onClick={handleStopReading}
                  className="px-6 py-3 bg-[#EF4444] hover:bg-[#DC2626] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition flex items-center space-x-2 animate-pulse"
                >
                  <MicOff className="w-5 h-5" />
                  <span>Finish Reading</span>
                </button>
              )}

              <div className="flex items-center space-x-2 text-xs font-black text-[#065F46]">
                <Clock className="w-4 h-4 text-[#059669]" />
                <span>Elapsed: {elapsedSeconds}s</span>
              </div>
            </div>

            {isListening && (
              <div className="flex items-center space-x-2 text-xs text-[#065F46] font-black bg-white px-3.5 py-2 rounded-xl border-2 border-[#6EE7B7] shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                <span>Listening in {activeStory?.language || 'English'}...</span>
              </div>
            )}
          </div>

          {/* Live Detected Speech Log */}
          {(spokenTranscript || isListening) && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-emerald-600" />
                  Live Microphone Audio Transcript
                </span>
                <span className="text-[10px] text-slate-400 font-bold">
                  {spokenTranscript ? spokenTranscript.split(/\s+/).filter(Boolean).length : 0} Spoken Words
                </span>
              </div>
              <p className="text-xs font-medium text-slate-700 italic bg-white p-3 rounded-xl border border-slate-100 min-h-[38px]">
                {spokenTranscript || 'Speak aloud into the microphone...'}
              </p>
            </div>
          )}

          {/* Genuine Results Screen after reading */}
          {isFinished && evaluationResult && (
            <div
              className={`p-6 rounded-3xl border-4 space-y-4 animate-in fade-in duration-300 ${
                evaluationResult.accuracyPercent >= 75
                  ? 'bg-[#FEF3C7] border-[#FBBF24]'
                  : evaluationResult.accuracyPercent > 0
                  ? 'bg-[#EFF6FF] border-[#60A5FA]'
                  : 'bg-[#FFF1F2] border-[#FDA4AF]'
              }`}
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center space-x-2 font-black text-sm sm:text-base">
                  {evaluationResult.accuracyPercent >= 75 ? (
                    <Sparkles className="w-5 h-5 text-[#D97706]" />
                  ) : evaluationResult.accuracyPercent > 0 ? (
                    <Award className="w-5 h-5 text-[#2563EB]" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-[#E11D48]" />
                  )}
                  <span className={evaluationResult.accuracyPercent === 0 ? 'text-[#9F1239]' : 'text-slate-900'}>
                    {evaluationResult.statusTitle}
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-black text-xs rounded-xl border border-slate-300 shadow-2xs flex items-center space-x-1"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Re-take / Practice Again</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-white rounded-2xl border-2 border-slate-200 text-center shadow-xs">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">Truthful Speed</span>
                  <span className="text-2xl font-black text-[#059669]">{evaluationResult.actualWpm} WPM</span>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border-2 border-slate-200 text-center shadow-xs">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">Actual Accuracy</span>
                  <span className={`text-2xl font-black ${evaluationResult.accuracyPercent > 0 ? 'text-[#2563EB]' : 'text-[#E11D48]'}`}>
                    {evaluationResult.accuracyPercent}%
                  </span>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border-2 border-slate-200 text-center shadow-xs">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">Words Matched</span>
                  <span className="text-2xl font-black text-slate-700">
                    {evaluationResult.matchedWordsCount} / {evaluationResult.totalPassageWords}
                  </span>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border-2 border-slate-200 text-center shadow-xs">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">XP Earned</span>
                  <span className="text-2xl font-black text-[#D97706]">+{evaluationResult.xpAwarded} XP</span>
                </div>
              </div>

              {/* Actionable Feedback Box */}
              <div className="p-4 bg-white/90 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                <p className="font-black text-slate-900 mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  Reading Coach Diagnostic Advice:
                </p>
                <p>{evaluationResult.diagnosticAdvice}</p>
              </div>
            </div>
          )}

          {/* Recent Verified Reading History */}
          {studentRecentRecords.length > 0 && (
            <div className="pt-4 border-t border-emerald-100 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <History className="w-4 h-4 text-emerald-600" />
                  Recent Verified Reading Attempts ({currentStudent.name})
                </h4>
                <span className="text-[10px] text-slate-400">Strictly Verified Speech Metrics</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {studentRecentRecords.map((rec) => (
                  <div key={rec.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <p className="font-bold text-slate-800 truncate">{rec.storyTitle}</p>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-500">
                        <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">{rec.language}</span>
                        <span>{new Date(rec.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-black text-emerald-700 block">{rec.wpm} WPM</span>
                      <span className={`text-[10px] font-bold ${rec.accuracy >= 50 ? 'text-blue-600' : 'text-rose-600'}`}>
                        {rec.accuracy}% Acc
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comprehension Questions Section */}
          {activeStory?.comprehensionQuestions && activeStory.comprehensionQuestions.length > 0 && (
            <div className="pt-6 border-t-2 border-emerald-100 space-y-4">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-[#059669]" />
                <h3 className="text-sm font-black text-[#1F2937]">
                  Story Comprehension Check ({activeStory.comprehensionQuestions.length} Questions)
                </h3>
              </div>

              <div className="space-y-4">
                {activeStory.comprehensionQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="p-5 rounded-2xl bg-[#ECFDF5] border-2 border-[#A7F3D0] space-y-3">
                    <p className="text-xs sm:text-sm font-black text-slate-900">
                      {qIdx + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = compAnswers[qIdx] === optIdx;
                        const isCorrect = optIdx === q.correctIndex;
                        let optStyle = 'bg-white border-2 border-[#A7F3D0] hover:bg-emerald-50 text-slate-800';

                        if (compSubmitted) {
                          if (isCorrect) optStyle = 'bg-[#D1FAE5] border-2 border-[#10B981] text-[#065F46] font-black';
                          else if (isChosen && !isCorrect) optStyle = 'bg-[#FEE2E2] border-2 border-[#EF4444] text-[#991B1B] font-bold';
                        } else if (isChosen) {
                          optStyle = 'bg-[#D1FAE5] border-2 border-[#059669] text-[#065F46] font-black shadow-xs';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={compSubmitted}
                            onClick={() => setCompAnswers({ ...compAnswers, [qIdx]: optIdx })}
                            className={`p-3 rounded-xl border text-left text-xs transition font-bold ${optStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {!compSubmitted ? (
                <button
                  onClick={() => {
                    setCompSubmitted(true);
                    awardPoints(30, 'Completed story comprehension questions');
                  }}
                  disabled={Object.keys(compAnswers).length < activeStory.comprehensionQuestions.length}
                  className="px-6 py-3 bg-[#10B981] hover:bg-[#059669] disabled:opacity-50 text-white font-black text-xs rounded-2xl shadow-md transition"
                >
                  Submit Comprehension Answers
                </button>
              ) : (
                <div className="p-4 bg-[#D1FAE5] border-2 border-[#6EE7B7] rounded-2xl text-xs font-black text-[#065F46] flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                  <span>Great job completing the comprehension questions!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
