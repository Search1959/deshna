import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Brain,
  Volume2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RevisionView: React.FC = () => {
  const {
    revisionItems,
    currentStudent,
    markRevisionDone,
    openAITutorWithContext,
    speakText,
    awardPoints,
  } = useApp();

  const studentRevisions = revisionItems.filter((r) => r.studentId === currentStudent.id);
  const dueItems = studentRevisions.filter((r) => r.status === 'due');
  const upcomingItems = studentRevisions.filter((r) => r.status === 'upcoming');

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const activeItem = dueItems[activeItemIndex] || dueItems[0];

  const handleRateRetention = (rating: 'hard' | 'good' | 'easy') => {
    if (!activeItem) return;
    markRevisionDone(activeItem.id, rating);
    awardPoints(25, 'Completed spaced revision topic');
    setIsAnswerRevealed(false);

    if (activeItemIndex >= dueItems.length - 1) {
      try {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      } catch {}
    } else {
      setActiveItemIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#06B6D4] via-[#0891B2] to-[#0E7490] rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl border-b-6 sm:border-b-8 border-[#155E75] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-yellow-300 border border-white/30">
            Memory Retention & Spaced Repetition Curve
          </span>
          <h1 className="text-xl sm:text-4xl font-black tracking-tight">
            Spaced Revision Center
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100 font-bold">
            Reinforce what you learned at optimal cognitive intervals (1 day, 3 days, 7 days, 14 days, 30 days) to
            convert short-term study into permanent long-term memory.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Flash Deck */}
        <div className="lg:col-span-2 space-y-6">
          {dueItems.length > 0 && activeItem ? (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#67E8F9] shadow-lg space-y-6">
              {/* Top Card Info */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-cyan-100">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0891B2] bg-[#ECFEFF] px-2.5 py-1 rounded-xl border border-[#A5F3FC]">
                    Card {activeItemIndex + 1} of {dueItems.length} Due Today
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-[#1F2937] mt-1.5">
                    {activeItem.topicTitle}
                  </h2>
                </div>
                <button
                  onClick={() =>
                    openAITutorWithContext({
                      subject: activeItem.subjectName,
                      chapter: activeItem.topicTitle,
                      topic: activeItem.topicTitle,
                    })
                  }
                  className="text-xs font-black text-[#2563EB] hover:text-[#1D4ED8] bg-[#EFF6FF] px-3.5 py-1.5 rounded-xl border border-[#DBEAFE] shadow-xs"
                >
                  Ask AI Tutor →
                </button>
              </div>

              {/* Front of Card: Recall Prompt */}
              <div className="p-6 rounded-3xl bg-[#ECFEFF] border-2 border-[#A5F3FC] space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-[#0891B2]">
                  Concept Prompt & Recall Challenge
                </span>
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                  "Explain the fundamental principle of <strong>{activeItem.topicTitle}</strong> in{' '}
                  {activeItem.subjectName} and write down the key formula or application."
                </p>
                <div className="flex items-center space-x-2 text-xs font-bold text-[#0E7490] pt-1">
                  <Clock className="w-4 h-4 text-[#0891B2]" />
                  <span>Previous interval: {activeItem.intervalDays} days • Next target: +{activeItem.intervalDays * 2} days</span>
                </div>
              </div>

              {/* Reveal Button or Answer Breakdown */}
              {!isAnswerRevealed ? (
                <div className="text-center pt-2">
                  <button
                    onClick={() => setIsAnswerRevealed(true)}
                    className="px-8 py-3.5 bg-[#0891B2] hover:bg-[#0E7490] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition"
                  >
                    Show Memory Summary & Solution
                  </button>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-5 rounded-2xl bg-[#CFFAFE] border-2 border-[#67E8F9] space-y-2">
                    <div className="flex items-center justify-between text-xs font-black text-[#155E75]">
                      <span>Key Memory Summary:</span>
                      <button
                        onClick={() =>
                          speakText(
                            `Summary of ${activeItem.topicTitle}. Key concept and formulas are reinforced.`
                          )
                        }
                        className="text-[#0891B2] hover:text-[#155E75] p-1 rounded-lg bg-white/60"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold">
                      Reinforce the core definition, proportional reasoning, and error checks before moving on.
                    </p>
                  </div>

                  {/* Rating Buttons */}
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block mb-2.5 text-center">
                      How easily did you recall this concept?
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => handleRateRetention('hard')}
                        className="p-3.5 rounded-2xl bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] border-2 border-[#F59E0B] text-center font-black text-xs transition shadow-xs"
                      >
                        <div className="text-sm">Hard</div>
                        <div className="text-[10px] font-bold text-[#B45309]">Review in 1-2 days</div>
                      </button>
                      <button
                        onClick={() => handleRateRetention('good')}
                        className="p-3.5 rounded-2xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1E40AF] border-2 border-[#3B82F6] text-center font-black text-xs transition shadow-xs"
                      >
                        <div className="text-sm">Good</div>
                        <div className="text-[10px] font-bold text-[#2563EB]">Review in 4-7 days</div>
                      </button>
                      <button
                        onClick={() => handleRateRetention('easy')}
                        className="p-3.5 rounded-2xl bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#065F46] border-2 border-[#10B981] text-center font-black text-xs transition shadow-xs"
                      >
                        <div className="text-sm">Easy</div>
                        <div className="text-[10px] font-bold text-[#059669]">Review in 14+ days</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border-4 border-[#6EE7B7] shadow-lg text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-[#D1FAE5] text-[#065F46] border-2 border-[#A7F3D0] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-black text-[#1F2937]">All Due Revisions Completed!</h3>
              <p className="text-xs text-slate-600 font-bold max-w-md mx-auto">
                Your brain's retention curve for today is fully reinforced. Check back tomorrow for the next batch of
                spaced intervals.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Upcoming Schedule Queue */}
        <div className="bg-white p-6 rounded-3xl border-4 border-[#FBBF24] shadow-lg space-y-4 h-fit">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#92400E] flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#D97706]" />
            <span>Upcoming Revision Queue</span>
          </h3>

          <div className="space-y-2.5">
            {upcomingItems.map((item) => (
              <div key={item.id} className="p-3.5 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] space-y-1">
                <div className="flex items-center justify-between text-xs font-black text-[#78350F]">
                  <span className="truncate">{item.topicTitle}</span>
                  <span className="text-[#D97706] shrink-0 text-[10px] bg-white px-2 py-0.5 rounded-lg border border-[#FDE68A]">Due in {item.intervalDays}d</span>
                </div>
                <p className="text-[10px] text-[#92400E] font-bold">{item.subjectName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
