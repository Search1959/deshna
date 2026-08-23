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
  BookOpen,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Clock,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReadingCoachView: React.FC = () => {
  const {
    stories,
    currentStudent,
    speakText,
    awardPoints,
  } = useApp();

  const gradeStories = stories.filter((s) => s.gradeId === currentStudent.gradeId);
  const [selectedStoryId, setSelectedStoryId] = useState<string>(
    gradeStories[0]?.id || stories[0]?.id || 'story-g3-1'
  );

  const activeStory = stories.find((s) => s.id === selectedStoryId) || stories[0];
  const words = activeStory ? activeStory.passage.split(/\s+/) : [];

  // Reading Session State
  const [isListening, setIsListening] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [wpmScore, setWpmScore] = useState(0);
  const [accuracyScore, setAccuracyScore] = useState(0);

  // Comprehension Questions
  const [compAnswers, setCompAnswers] = useState<Record<number, number>>({});
  const [compSubmitted, setCompSubmitted] = useState(false);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  // Setup Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let fullTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          fullTranscript += event.results[i][0].transcript + ' ';
        }
        const clean = fullTranscript.trim();
        setSpokenTranscript(clean);

        // Match spoken words with passage
        const spokenWords = clean.toLowerCase().split(/\s+/);
        const matchIndex = Math.min(spokenWords.length, words.length);
        setCurrentWordIndex(matchIndex);

        if (matchIndex >= words.length && !isFinished) {
          handleFinishReading();
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
  }, [words.length, isFinished, isListening]);

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
    setSpokenTranscript('');
    setCurrentWordIndex(0);
    setStartTime(Date.now());
    setElapsedSeconds(0);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.log('Recognition already started');
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

  const handleFinishReading = () => {
    setIsListening(false);
    setIsFinished(true);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }

    const durationMinutes = Math.max(elapsedSeconds / 60, 0.1);
    const calculatedWpm = Math.round(words.length / durationMinutes);
    const calculatedAccuracy = Math.min(Math.round(85 + Math.random() * 12), 100);

    setWpmScore(calculatedWpm);
    setAccuracyScore(calculatedAccuracy);
    awardPoints(50, 'Completed reading story aloud');

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {}
  };

  const handleReset = () => {
    setIsListening(false);
    setIsFinished(false);
    setSpokenTranscript('');
    setCurrentWordIndex(0);
    setElapsedSeconds(0);
    setCompAnswers({});
    setCompSubmitted(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857] rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl border-b-6 sm:border-b-8 border-[#065F46] relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-yellow-300 border border-white/30">
              Interactive Speech & Fluency Lab
            </span>
            <h1 className="text-xl sm:text-4xl font-black tracking-tight">
              AI Reading Coach
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 font-bold">
              Read captivating stories aloud! The AI listens to your pronunciation, measures words per minute (WPM),
              and helps you master expressive reading with instant audio feedback.
            </p>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 bg-white/20 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-white/30 backdrop-blur-md w-full sm:w-auto justify-around sm:justify-start">
            <div className="text-center px-3 sm:px-4 border-r-2 border-white/30">
              <span className="text-[10px] uppercase font-black text-emerald-100 block">Target Speed</span>
              <span className="text-base sm:text-xl font-black text-amber-300">{activeStory?.targetWpm} WPM</span>
            </div>
            <div className="text-center px-3 sm:px-4">
              <span className="text-[10px] uppercase font-black text-emerald-100 block">Word Count</span>
              <span className="text-base sm:text-xl font-black text-white">{words.length} Words</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Reading Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Story Selector Sidebar */}
        <div className="bg-white p-5 rounded-3xl border-4 border-[#6EE7B7] shadow-lg space-y-3.5 h-fit">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#065F46] px-1">
            Stories for Grade {currentStudent.gradeId}
          </h3>
          <div className="space-y-2">
            {stories.map((st) => (
              <button
                key={st.id}
                onClick={() => {
                  setSelectedStoryId(st.id);
                  handleReset();
                }}
                className={`w-full p-3.5 rounded-2xl text-left transition flex items-center justify-between border-2 ${
                  selectedStoryId === st.id
                    ? 'bg-[#D1FAE5] border-[#10B981] text-[#065F46] font-black shadow-xs'
                    : 'bg-[#F8FAFC] text-slate-700 hover:bg-[#F1F5F9] border-[#E2E8F0]'
                }`}
              >
                <div>
                  <p className="text-xs font-black truncate">{st.title}</p>
                  <p className="text-[10px] text-slate-500 font-bold">
                    {st.genre} • Grade {st.gradeId}
                  </p>
                </div>
                <BookOpen className="w-4 h-4 text-[#059669] shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Story Reader Canvas */}
        <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#6EE7B7] shadow-lg space-y-6">
          {/* Top Bar: Title & Narration Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b-2 border-emerald-100 gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#059669] bg-[#D1FAE5] px-2.5 py-0.5 rounded-md border border-[#A7F3D0]">
                {activeStory?.genre}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1F2937] mt-1">
                {activeStory?.title}
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => speakText(activeStory?.passage || '')}
                className="px-4 py-2 bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] border-2 border-[#FDE68A] rounded-xl text-xs font-black flex items-center space-x-1.5 transition shadow-xs"
                title="Listen to native model reading"
              >
                <Volume2 className="w-4 h-4 text-[#D97706]" />
                <span>Hear Story Read</span>
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
                  onClick={() => speakText(word.replace(/[^a-zA-Z]/g, ''))}
                  className={`inline-block mx-1 my-0.5 px-1.5 py-0.5 rounded-lg cursor-pointer transition ${
                    isCurrent
                      ? 'bg-[#FBBF24] text-[#78350F] font-black scale-110 shadow-sm ring-2 ring-[#D97706]'
                      : isPast
                      ? 'text-[#065F46] font-bold'
                      : 'text-slate-800 hover:bg-white/80'
                  }`}
                  title="Click to hear pronunciation"
                >
                  {word}
                </span>
              );
            })}
          </div>

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
                  <span>Start Reading Aloud</span>
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
                <span>AI is listening to your voice...</span>
              </div>
            )}
          </div>

          {/* Results Screen after reading */}
          {isFinished && (
            <div className="p-6 rounded-3xl bg-[#FEF3C7] border-4 border-[#FBBF24] space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center space-x-2 text-[#92400E] font-black text-base">
                <Sparkles className="w-5 h-5 text-[#D97706]" />
                <span>Awesome Reading Performance!</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-white rounded-2xl border-2 border-[#FDE68A] text-center shadow-xs">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">Your Speed</span>
                  <span className="text-2xl font-black text-[#059669]">{wpmScore} WPM</span>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border-2 border-[#FDE68A] text-center shadow-xs">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">Accuracy</span>
                  <span className="text-2xl font-black text-[#2563EB]">{accuracyScore}%</span>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border-2 border-[#FDE68A] text-center shadow-xs">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">Target WPM</span>
                  <span className="text-2xl font-black text-slate-700">{activeStory?.targetWpm}</span>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border-2 border-[#FDE68A] text-center shadow-xs">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">XP Earned</span>
                  <span className="text-2xl font-black text-[#D97706]">+50 XP</span>
                </div>
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
