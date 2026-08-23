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
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { getIntelligentQuestionsForChapter } from '../data/curriculumData';

export const ExamPrepView: React.FC = () => {
  const {
    currentStudent,
    subjects,
    questions,
    chapters,
    awardPoints,
    openAITutorWithContext,
  } = useApp();

  const studentSubjects = subjects.filter((s) => s.gradeId === currentStudent.gradeId);
  const [testMode, setTestMode] = useState<'selection' | 'running' | 'results'>('selection');

  // Test Execution State
  const [testQuestions, setTestQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(600); // 10 minutes

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

  // Load questions when starting test
  const handleStartTest = (subjectIdToUse: string) => {
    const subj = subjects.find((s) => s.id === subjectIdToUse);
    const subjChapters = chapters.filter((c) => c.subjectId === subjectIdToUse);
    let pool = questions.filter((q) => q.subjectId === subjectIdToUse);

    if (pool.length < 5) {
      subjChapters.forEach((chap) => {
        const extra = getIntelligentQuestionsForChapter(
          chap.id,
          subjectIdToUse,
          currentStudent.gradeId,
          chap.title,
          subj?.name
        );
        pool = [...pool, ...extra];
      });
    }

    if (pool.length === 0) {
      pool = getIntelligentQuestionsForChapter(
        'mock-ch-1',
        subjectIdToUse,
        currentStudent.gradeId,
        'Comprehensive Exam Mock',
        subj?.name || 'Subject'
      );
    }

    setTestQuestions(pool.slice(0, 5));
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setCurrentIdx(0);
    setTimeLeftSeconds(600);
    setTestMode('running');
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
    setTestMode('results');
    awardPoints(100, 'Completed exam mock test');
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {}
  };

  const calculateScore = () => {
    let correct = 0;
    testQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === getCorrectOptionIndex(q)) {
        correct++;
      }
    });
    return {
      correct,
      total: testQuestions.length,
      percentage: Math.round((correct / (testQuestions.length || 1)) * 100),
    };
  };

  const scoreResult = calculateScore();
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ = testQuestions[currentIdx];

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#F43F5E] via-[#E11D48] to-[#BE123C] rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl border-b-6 sm:border-b-8 border-[#9F1239] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-yellow-300 border border-white/30">
            Exam Prep & Diagnostic Mock Center
          </span>
          <h1 className="text-xl sm:text-4xl font-black tracking-tight">
            Board Pattern & Chapter Mocks
          </h1>
          <p className="text-xs sm:text-sm text-rose-100 font-bold">
            Simulate real board and chapter test environments with timed conditions, question palettes, and deep
            diagnostic performance analytics.
          </p>
        </div>
      </div>

      {testMode === 'selection' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#FDA4AF] shadow-lg space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-[#1F2937]">Select Exam Practice Test</h2>
            <p className="text-xs text-slate-600 font-bold">
              Choose a subject to launch a customized timed test for Grade {currentStudent.gradeId} (
              {currentStudent.boardId.toUpperCase()})
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {studentSubjects.map((subj) => (
              <div
                key={subj.id}
                className="p-6 rounded-3xl border-4 border-[#FECDD3] bg-[#FFF1F2] hover:bg-[#FFE4E6] space-y-3.5 flex flex-col justify-between transition shadow-md"
              >
                <div>
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-xl bg-white text-[#BE123C] border border-[#FDA4AF]">
                    {subj.code}
                  </span>
                  <h3 className="font-black text-lg text-slate-900 mt-2">{subj.name}</h3>
                  <p className="text-xs text-[#9F1239] font-bold mt-1">{subj.chaptersCount} Chapters Covered</p>
                </div>
                <button
                  onClick={() => handleStartTest(subj.id)}
                  className="w-full py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white font-black text-xs rounded-2xl transition flex items-center justify-center space-x-2 shadow-md"
                >
                  <Play className="w-4 h-4" />
                  <span>Start 10-Min Mock Test</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {testMode === 'running' && currentQ && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Panel */}
          <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#FDA4AF] shadow-lg space-y-6">
            {/* Top Status Bar */}
            <div className="flex items-center justify-between pb-4 border-b-2 border-rose-100">
              <span className="text-xs font-black text-[#E11D48] bg-[#FFF1F2] px-3 py-1 rounded-xl border border-[#FECDD3]">
                Question {currentIdx + 1} of {testQuestions.length}
              </span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    setFlaggedQuestions((prev) => ({
                      ...prev,
                      [currentIdx]: !prev[currentIdx],
                    }))
                  }
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center space-x-1.5 transition border-2 ${
                    flaggedQuestions[currentIdx]
                      ? 'bg-[#FEF3C7] text-[#92400E] border-[#F59E0B]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{flaggedQuestions[currentIdx] ? 'Flagged' : 'Flag for Review'}</span>
                </button>

                <div className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#FFF1F2] text-[#BE123C] font-mono text-xs font-black border-2 border-[#FDA4AF]">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(timeLeftSeconds)}</span>
                </div>
              </div>
            </div>

            {/* Prompt */}
            <div className="space-y-4">
              <p className="text-sm sm:text-base font-black text-slate-900 leading-relaxed">
                {currentQ.text}
              </p>
              {currentQ.diagramUrl && (
                <div className="p-4 bg-[#FFFBEB] rounded-2xl border-2 border-[#FDE68A] flex justify-center">
                  <img src={currentQ.diagramUrl} alt="Diagram" className="max-h-48 object-contain" />
                </div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options?.map((opt: string, optIdx: number) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => setSelectedAnswers({ ...selectedAnswers, [currentIdx]: optIdx })}
                    className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm transition flex items-center space-x-3 ${
                      isSelected
                        ? 'bg-[#FFE4E6] border-[#E11D48] text-[#881337] font-black shadow-xs'
                        : 'bg-[#FFF1F2] hover:bg-[#FFE4E6] border-[#FECDD3] text-slate-800 font-bold'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center font-black text-xs ${
                      isSelected ? 'bg-[#E11D48] text-white border-[#BE123C]' : 'bg-white border-[#FDA4AF] text-[#BE123C]'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-4 border-t-2 border-rose-100">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => prev - 1)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-black text-xs rounded-2xl border border-slate-200"
              >
                Previous
              </button>

              {currentIdx < testQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx((prev) => prev - 1)}
                  className="px-6 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-black text-xs rounded-2xl shadow-md"
                >
                  Save & Next
                </button>
              ) : (
                <button
                  onClick={handleFinishTest}
                  className="px-6 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs rounded-2xl shadow-md"
                >
                  Submit Mock Test
                </button>
              )}
            </div>
          </div>

          {/* Right Question Palette */}
          <div className="bg-white p-6 rounded-3xl border-4 border-[#FBBF24] shadow-lg space-y-4 h-fit">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#92400E]">
              Question Palette
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {testQuestions.map((_, idx) => {
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isFlagged = flaggedQuestions[idx];
                const isCurrent = currentIdx === idx;

                let badgeColor = 'bg-[#F8FAFC] text-slate-700 border-2 border-slate-200';
                if (isFlagged) badgeColor = 'bg-[#FBBF24] text-[#78350F] font-black border-2 border-[#F59E0B]';
                else if (isAnswered) badgeColor = 'bg-[#10B981] text-white font-black border-2 border-[#059669]';

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-10 rounded-xl text-xs flex items-center justify-center transition ${badgeColor} ${
                      isCurrent ? 'ring-4 ring-[#E11D48] ring-offset-1 scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t-2 border-amber-100 text-[11px] space-y-2 text-[#92400E] font-bold">
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-md bg-[#10B981]" />
                <span>Answered ({Object.keys(selectedAnswers).length})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-md bg-[#FBBF24]" />
                <span>Flagged for Review</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-md bg-slate-200 border border-slate-300" />
                <span>Unvisited</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {testMode === 'results' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#6EE7B7] shadow-xl space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-3 pb-6 border-b-2 border-emerald-100">
            <div className="w-16 h-16 rounded-3xl bg-[#D1FAE5] text-[#065F46] border-2 border-[#A7F3D0] flex items-center justify-center mx-auto">
              <Award className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-black text-[#1F2937]">Mock Test Assessment Report</h2>
            <p className="text-xs text-slate-600 font-bold">
              Diagnostic performance evaluation for Grade {currentStudent.gradeId}
            </p>

            <div className="flex justify-center gap-4 pt-2">
              <div className="p-4 bg-[#EFF6FF] rounded-2xl border-2 border-[#BFDBFE] min-w-[130px]">
                <span className="text-[10px] uppercase font-black text-[#1E40AF] block">Score</span>
                <span className="text-3xl font-black text-[#2563EB]">
                  {scoreResult.correct} / {scoreResult.total}
                </span>
              </div>
              <div className="p-4 bg-[#ECFDF5] rounded-2xl border-2 border-[#A7F3D0] min-w-[130px]">
                <span className="text-[10px] uppercase font-black text-[#065F46] block">Accuracy</span>
                <span className="text-3xl font-black text-[#059669]">{scoreResult.percentage}%</span>
              </div>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900">Detailed Answer Key & Explanations:</h3>
            <div className="space-y-3">
              {testQuestions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const correctIdx = getCorrectOptionIndex(q);
                const isCorrect = userAns === correctIdx;
                return (
                  <div key={q.id || idx} className="p-5 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-black text-slate-900">Q{idx + 1}: {q.text}</span>
                      {isCorrect ? (
                        <span className="text-[#059669] font-black flex items-center gap-1 bg-[#D1FAE5] px-2.5 py-1 rounded-lg border border-[#A7F3D0]">
                          <CheckCircle2 className="w-4 h-4" /> Correct
                        </span>
                      ) : (
                        <span className="text-[#DC2626] font-black flex items-center gap-1 bg-[#FEE2E2] px-2.5 py-1 rounded-lg border border-[#FCA5A5]">
                          <XCircle className="w-4 h-4" /> Incorrect
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-700 font-bold">
                      <span className="text-slate-900 font-black">Correct Answer:</span> {q.options?.[correctIdx] || q.correctAnswer}
                    </p>
                    <p className="text-xs text-[#1E40AF] bg-[#EFF6FF] p-3 rounded-xl border border-[#BFDBFE] font-medium">
                      💡 <strong>Explanation:</strong> {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center space-x-3 pt-4 border-t-2 border-emerald-100">
            <button
              onClick={() => setTestMode('selection')}
              className="px-5 py-3 bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#92400E] border-2 border-[#FDE68A] font-black text-xs rounded-2xl shadow-xs"
            >
              Take Another Mock Test
            </button>
            <button
              onClick={() =>
                openAITutorWithContext({
                  subject: 'Mock Test Review',
                  chapter: 'Error Analysis',
                  topic: 'Diagnostic Remediation',
                })
              }
              className="px-6 py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white font-black text-xs rounded-2xl flex items-center space-x-2 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Discuss Mistakes with AI Tutor</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
