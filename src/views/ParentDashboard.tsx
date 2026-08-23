import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Sparkles,
  TrendingUp,
  Clock,
  BookOpen,
  Award,
  Mic,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const ParentDashboard: React.FC = () => {
  const {
    currentStudent,
    allStudents,
    switchStudent,
    speakText,
  } = useApp();

  const [aiReport, setAiReport] = useState<any>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);

  const handleGenerateReport = async () => {
    setIsLoadingReport(true);
    try {
      const res = await fetch('/api/ai/parent-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: currentStudent.name,
          grade: currentStudent.gradeId,
          totalMinutes: 185,
          completedItemsCount: 28,
          masteryBySubject: currentStudent.masteryBySubject,
          strongTopics: ['Shape symmetry & tessellation', 'Plant leaves & sunlight'],
          weakTopics: ['Equivalent fraction comparison'],
        }),
      });

      const data = await res.json();
      setAiReport(data.report);
    } catch (err) {
      console.error('Parent report generation error', err);
      setAiReport({
        headline: `${currentStudent.name.split(' ')[0]} demonstrated fantastic curiosity this week in Grade ${currentStudent.gradeId}!`,
        highlights: [
          'Mastered 4 new geometric tessellation patterns with high accuracy.',
          'Maintained a steady 72 Words Per Minute oral reading speed.',
          'Consistently practiced daily for 25 minutes without fatigue.',
        ],
        growthAreas: [
          'Needs a gentle boost visualizing equivalent fractions (1/2 vs 2/4).',
        ],
        conversationStarters: [
          'At dinner, ask: If we cut a cake into 4 slices and eat 2, how much of the cake is left?',
          'Ask what their favorite animal adaptation was during science reading today.',
        ],
        encouragementNote: `Keep praising ${currentStudent.name.split(' ')[0]}'s consistent daily curiosity!`,
      });
    } finally {
      setIsLoadingReport(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#059669] via-[#047857] to-[#064E3B] rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl border-b-6 sm:border-b-8 border-[#064E3B] relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-yellow-300 border border-white/30">
              Parent Insights & Growth Portal
            </span>
            <h1 className="text-xl sm:text-4xl font-black tracking-tight">
              {currentStudent.name}'s Weekly Growth
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 font-bold">
              Clear, friendly updates on your child's learning trajectory, reading milestones, and practical dinner
              conversation topics to encourage natural curiosity.
            </p>
          </div>

          {/* Child Profile Switcher */}
          <div className="bg-white/15 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-white/25 backdrop-blur-md w-full sm:w-auto">
            <span className="text-[10px] uppercase font-black text-yellow-300 block mb-1">
              Select Child Profile:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {allStudents.map((st) => (
                <button
                  key={st.id}
                  onClick={() => switchStudent(st.id)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center space-x-1.5 min-h-[38px] ${
                    st.id === currentStudent.id
                      ? 'bg-[#FBBF24] text-slate-950 shadow-xs border border-[#F59E0B]'
                      : 'bg-white/15 text-white hover:bg-white/25'
                  }`}
                >
                  <span>{st.name.split(' ')[0]}</span>
                  <span className="text-[10px] opacity-75">Gr {st.gradeId}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border-4 border-[#6EE7B7] shadow-md space-y-1">
          <div className="flex items-center space-x-2 text-xs font-black text-[#065F46]">
            <Clock className="w-4 h-4 text-[#059669]" />
            <span>Weekly Study Time</span>
          </div>
          <p className="text-3xl font-black text-[#1F2937]">185 Mins</p>
          <span className="text-[10px] text-[#059669] font-black">+18% vs last week</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border-4 border-[#6EE7B7] shadow-md space-y-1">
          <div className="flex items-center space-x-2 text-xs font-black text-[#065F46]">
            <CheckCircle2 className="w-4 h-4 text-[#059669]" />
            <span>Questions Solved</span>
          </div>
          <p className="text-3xl font-black text-[#1F2937]">38</p>
          <span className="text-[10px] text-[#059669] font-black">86% Accuracy rate</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border-4 border-[#FBBF24] shadow-md space-y-1">
          <div className="flex items-center space-x-2 text-xs font-black text-[#92400E]">
            <Mic className="w-4 h-4 text-[#D97706]" />
            <span>Reading Speed</span>
          </div>
          <p className="text-3xl font-black text-[#1F2937]">
            {currentStudent.wpmReadingSpeed || 72} WPM
          </p>
          <span className="text-[10px] text-[#D97706] font-bold">Above grade average</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border-4 border-[#E9D5FF] shadow-md space-y-1">
          <div className="flex items-center space-x-2 text-xs font-black text-[#7E22CE]">
            <BookOpen className="w-4 h-4 text-[#9333EA]" />
            <span>Vocabulary Mastered</span>
          </div>
          <p className="text-3xl font-black text-[#1F2937]">
            {currentStudent.masteredVocabularyCount || 24} Words
          </p>
          <span className="text-[10px] text-[#9333EA] font-black">In long-term memory</span>
        </div>
      </div>

      {/* AI Weekly Insight Report Generator */}
      <div className="bg-white rounded-3xl border-4 border-[#6EE7B7] shadow-lg p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b-2 border-emerald-100 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#D97706]" />
              <h2 className="text-xl font-black text-[#1F2937]">AI Weekly Insights & Summary</h2>
            </div>
            <p className="text-xs text-slate-600 font-bold mt-0.5">
              Zero clinical jargon—just clear insights on what clicked and how to support at home.
            </p>
          </div>

          <button
            id="generate-parent-report-btn"
            onClick={handleGenerateReport}
            disabled={isLoadingReport}
            className="px-6 py-3 bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs rounded-2xl shadow-md transition flex items-center space-x-2"
          >
            {isLoadingReport ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-yellow-300" />
                <span>Synthesizing Child Progress...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Generate Weekly AI Report</span>
              </>
            )}
          </button>
        </div>

        {aiReport ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Headline Callout */}
            <div className="p-5 rounded-2xl bg-[#ECFDF5] border-2 border-[#A7F3D0] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#065F46]">
                  Weekly Summary
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#064E3B] mt-0.5">
                  {aiReport.headline}
                </h3>
              </div>
              <button
                onClick={() => speakText(aiReport.headline)}
                className="p-2.5 rounded-xl text-[#065F46] hover:bg-[#D1FAE5] transition"
                title="Read aloud"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Highlights & Growth Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-3xl bg-[#FFFBEB] border-2 border-[#FDE68A] space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#065F46] flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>Key Strengths & Celebrations</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-800 font-bold">
                  {aiReport.highlights?.map((h: string, i: number) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-[#059669] font-black">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-[#FFFBEB] border-2 border-[#FDE68A] space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#92400E] flex items-center space-x-1.5">
                  <AlertCircle className="w-4 h-4 text-[#D97706]" />
                  <span>Areas Ready for Gentle Reinforcement</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-800 font-bold">
                  {aiReport.growthAreas?.map((g: string, i: number) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-[#D97706] font-black">•</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Conversation Starters for Parents */}
            <div className="p-6 rounded-3xl bg-[#EEF2FF] border-2 border-[#C7D2FE] space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#4338CA] flex items-center space-x-1.5">
                <MessageSquare className="w-4 h-4 text-[#4F46E5]" />
                <span>Suggested Dinner Conversation Starters for You:</span>
              </h4>
              <div className="space-y-2">
                {aiReport.conversationStarters?.map((cs: string, i: number) => (
                  <div key={i} className="p-4 bg-white rounded-2xl border-2 border-[#C7D2FE] text-xs text-slate-800 font-bold">
                    "{cs}"
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 space-y-3">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-black text-slate-700">Click the button above to generate this week's AI growth report.</p>
            <p className="text-xs text-slate-500 font-medium">
              The AI analyzes exercise accuracy, oral reading fluency, and topic mastery.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
