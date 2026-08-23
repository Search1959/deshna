import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Flame,
  Star,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  BookOpen,
  Mic,
  Brain,
  HelpCircle,
  Award,
  Layers,
  Zap,
  TrendingUp,
  AlertCircle,
  Play,
  RotateCcw,
  Volume2,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentStudent,
    dailyPlan,
    toggleDailyPlanItem,
    setDailyPlanMinutes,
    subjects,
    chapters,
    setSelectedSubjectId,
    setSelectedChapterId,
    setActiveView,
    openAITutorWithContext,
    badges,
    revisionItems,
    speakText,
    getFilteredSubjects,
    getChaptersForSubject,
  } = useApp();

  const [isRegeneratingPlan, setIsRegeneratingPlan] = useState(false);

  const studentSubjects = getFilteredSubjects(
    currentStudent.boardId,
    currentStudent.gradeId,
    currentStudent.streamId
  );
  const isPrimary = currentStudent.gradeId <= 5;
  const isSenior = currentStudent.gradeId >= 9;

  const dueRevisions = revisionItems.filter((r) => r.studentId === currentStudent.id && r.status === 'due');

  const handlePlanTimeChange = async (minutes: number) => {
    setIsRegeneratingPlan(true);
    await setDailyPlanMinutes(minutes);
    setIsRegeneratingPlan(false);
  };

  const handleLaunchPlanItem = (item: any) => {
    setSelectedSubjectId(item.subjectId);
    setSelectedChapterId(item.chapterId);
    if (item.activityType === 'reading') {
      setActiveView('reading_coach');
    } else if (item.activityType === 'revise') {
      setActiveView('spaced_revision');
    } else if (item.activityType === 'practice') {
      setActiveView('chapter_detail');
    } else {
      setActiveView('chapter_detail');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* Top Welcome Banner with Grade-Adaptive Accent */}
      <div
        className="rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl relative overflow-hidden bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] border-b-6 sm:border-b-8 border-[#1E40AF]"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <img
              src={currentStudent.avatar}
              alt={currentStudent.name}
              className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover ring-4 ring-white/40 shadow-md shrink-0"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white">
                  Hello, {currentStudent.name.split(' ')[0]} 👋
                </h1>
                <span className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-white font-black backdrop-blur-xs border border-white/30">
                  Grade {currentStudent.gradeId} • {currentStudent.boardId.toUpperCase()}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blue-100 font-bold">
                {currentStudent.examTarget
                  ? `Target Goal: ${currentStudent.examTarget}`
                  : 'Ready to learn something exciting today? Your customized AI study plan is ready below.'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 bg-white/20 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl backdrop-blur-md border-2 border-white/30 w-full sm:w-auto justify-around sm:justify-start">
            <div className="text-center px-3 sm:px-4 border-r-2 border-white/30">
              <span className="text-[10px] uppercase font-black text-blue-100 block">Daily Streak</span>
              <div className="flex items-center justify-center space-x-1 text-amber-300 font-black text-base sm:text-xl">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-300" />
                <span>{currentStudent.streakDays} Days</span>
              </div>
            </div>
            <div className="text-center px-3 sm:px-4">
              <span className="text-[10px] uppercase font-black text-blue-100 block">Learning XP</span>
              <div className="flex items-center justify-center space-x-1 text-yellow-300 font-black text-base sm:text-xl">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-300" />
                <span>{currentStudent.totalPoints}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left = Today's Plan & Modules | Right = Mastery, Revisions & Weak Points */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Dynamic Learning Plan + Hub Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Learning Plan Card */}
          <div className="bg-white rounded-3xl border-4 border-[#60A5FA] p-6 sm:p-7 shadow-lg space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b-2 border-blue-100 gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-[#10B981] animate-ping" />
                  <h2 className="text-lg sm:text-xl font-black text-[#1E3A8A]">Today's AI Learning Plan</h2>
                </div>
                <p className="text-xs font-bold text-slate-600 mt-0.5">{dailyPlan.summary}</p>
              </div>

              {/* Time duration picker (15m, 30m, 45m) */}
              <div className="flex items-center space-x-1.5 bg-[#EFF6FF] p-1.5 rounded-2xl border-2 border-[#DBEAFE]">
                {[15, 30, 45].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => handlePlanTimeChange(mins)}
                    disabled={isRegeneratingPlan}
                    className={`px-3 py-1 text-xs font-black rounded-xl transition ${
                      dailyPlan.totalMinutes === mins
                        ? 'bg-[#3B82F6] text-white shadow-xs'
                        : 'text-[#1E40AF] hover:bg-white/80'
                    }`}
                  >
                    {mins} min
                  </button>
                ))}
              </div>
            </div>

            {/* Plan Activity Items */}
            <div className="space-y-3">
              {dailyPlan.items.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border-2 transition flex items-start sm:items-center justify-between gap-3 ${
                    item.completed
                      ? 'bg-[#ECFDF5] border-[#A7F3D0] opacity-85'
                      : 'bg-[#F8FAFC] hover:bg-[#EFF6FF] border-[#E2E8F0] hover:border-[#93C5FD]'
                  }`}
                >
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <button
                      onClick={() => toggleDailyPlanItem(item.id)}
                      className="mt-0.5 text-slate-400 hover:text-indigo-600 transition shrink-0"
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-[#10B981] fill-[#D1FAE5]" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-300 hover:text-[#3B82F6]" />
                      )}
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className="text-xs font-black text-slate-900">{item.subjectName}</span>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider bg-[#DBEAFE] text-[#1E40AF] border border-[#BFDBFE]">
                          {item.activityType}
                        </span>
                        <span className="text-[11px] text-slate-500 font-bold">
                          • {item.durationMinutes} mins
                        </span>
                      </div>
                      <p
                        className={`text-xs font-bold truncate ${
                          item.completed ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {item.topicTitle}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-snug line-clamp-1">{item.reason}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLaunchPlanItem(item)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center space-x-1.5 shrink-0 shadow-xs ${
                      item.completed
                        ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        : 'bg-[#3B82F6] hover:bg-[#2563EB] text-white'
                    }`}
                  >
                    <span>{item.completed ? 'Review' : 'Start'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Hub Activity Tiles (Vibrant Palette 3D Tactile Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button
              id="hub-reading-coach"
              onClick={() => setActiveView('reading_coach')}
              className="p-5 rounded-3xl bg-[#6EE7B7] hover:bg-[#34D399] border-b-6 border-[#059669] text-left transition group space-y-2 shadow-md"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#065F46] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#065F46]">Reading Coach</h4>
                <p className="text-[11px] font-bold text-[#047857] mt-0.5">Read aloud & WPM</p>
              </div>
            </button>

            <button
              id="hub-doubt-solver"
              onClick={() => setActiveView('doubt_solver')}
              className="p-5 rounded-3xl bg-[#FBBF24] hover:bg-[#F59E0B] border-b-6 border-[#D97706] text-left transition group space-y-2 shadow-md"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#78350F] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#78350F]">Ask a Doubt</h4>
                <p className="text-[11px] font-bold text-[#92400E] mt-0.5">Camera & Math solve</p>
              </div>
            </button>

            <button
              id="hub-vocabulary"
              onClick={() => setActiveView('vocabulary_vault')}
              className="p-5 rounded-3xl bg-[#F472B6] hover:bg-[#EC4899] border-b-6 border-[#DB2777] text-left transition group space-y-2 shadow-md"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#831843] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#831843]">Vocabulary</h4>
                <p className="text-[11px] font-bold text-[#9D174D] mt-0.5">Spaced flashcards</p>
              </div>
            </button>

            <button
              id="hub-revision"
              onClick={() => setActiveView('spaced_revision')}
              className="p-5 rounded-3xl bg-[#818CF8] hover:bg-[#6366F1] border-b-6 border-[#4F46E5] text-left transition group space-y-2 shadow-md"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#312E81] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#312E81]">Revision Deck</h4>
                <p className="text-[11px] font-bold text-[#3730A3] mt-0.5">
                  {dueRevisions.length} due today
                </p>
              </div>
            </button>
          </div>

          {/* Enrolled Subjects Row */}
          <div className="bg-white rounded-3xl border-4 border-[#6EE7B7] p-6 sm:p-7 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-[#065F46] flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#059669]" />
                <span>My Subjects • Grade {currentStudent.gradeId}</span>
              </h3>
              <button
                onClick={() => setActiveView('classes_catalog')}
                className="text-xs font-black text-[#059669] hover:text-[#065F46] bg-[#D1FAE5] px-3 py-1.5 rounded-xl border border-[#A7F3D0] transition"
              >
                View Full Catalog →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {studentSubjects.map((subj) => {
                const mastery = currentStudent.masteryBySubject[subj.id] || 68;
                return (
                  <button
                    key={subj.id}
                    onClick={() => {
                      setSelectedSubjectId(subj.id);
                      setActiveView('subject_detail');
                    }}
                    className="p-4 rounded-2xl border-2 border-[#A7F3D0] bg-[#ECFDF5] hover:bg-[#D1FAE5] text-left transition flex items-center justify-between group shadow-xs"
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-black text-[#065F46] group-hover:text-[#047857] transition">
                        {subj.name}
                      </p>
                      <p className="text-[11px] font-bold text-[#059669]">{subj.chaptersCount} Chapters</p>
                      <div className="flex items-center space-x-2 pt-1">
                        <div className="w-24 h-2 rounded-full bg-[#A7F3D0] overflow-hidden">
                          <div
                            className="h-full bg-[#059669] rounded-full"
                            style={{ width: `${mastery}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black text-[#065F46]">{mastery}%</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#059669] group-hover:translate-x-1 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Insights, Weak Points, Revisions & Badges */}
        <div className="space-y-6">
          {/* AI Focus Recommendation */}
          <div className="bg-[#FEF3C7] rounded-3xl p-6 border-4 border-[#FBBF24] shadow-lg space-y-3.5">
            <div className="flex items-center space-x-2 text-[#92400E]">
              <Sparkles className="w-5 h-5 text-[#D97706]" />
              <h3 className="text-xs font-black uppercase tracking-wider">AI Learning Insight</h3>
            </div>
            <p className="text-xs text-[#78350F] leading-relaxed font-bold">
              "{currentStudent.name.split(' ')[0]} excels at visual shape symmetry (88% mastery). To boost your overall math score, spend 10 minutes
              practicing <strong>Equivalent Fractions</strong> today!"
            </p>
            <button
              onClick={() => openAITutorWithContext({ subject: 'Mathematics', chapter: 'Fractions', topic: 'Equivalent Fractions' })}
              className="w-full py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-2xl text-xs font-black shadow-md transition flex items-center justify-center space-x-1.5"
            >
              <span>Ask AI Tutor About Fractions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Weak Topics to Strengthen */}
          <div className="bg-white rounded-3xl border-4 border-[#F87171] p-6 shadow-lg space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#991B1B] flex items-center space-x-1.5">
                <AlertCircle className="w-4 h-4 text-[#EF4444]" />
                <span>Topics Needing Practice</span>
              </h3>
            </div>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-[#FEF2F2] border-2 border-[#FECACA] flex items-center justify-between text-xs">
                <div>
                  <p className="font-black text-[#991B1B]">Equivalent Fractions</p>
                  <p className="text-[10px] font-bold text-[#B91C1C]">Mathematics • Ch 5</p>
                </div>
                <span className="text-xs font-black text-[#DC2626] bg-white px-2 py-0.5 rounded-md border border-[#FCA5A5]">58%</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] flex items-center justify-between text-xs">
                <div>
                  <p className="font-black text-[#92400E]">States of Matter Phase Changes</p>
                  <p className="text-[10px] font-bold text-[#B45309]">Science • Ch 2</p>
                </div>
                <span className="text-xs font-black text-[#D97706] bg-white px-2 py-0.5 rounded-md border border-[#FCD34D]">64%</span>
              </div>
            </div>
          </div>

          {/* Recent Badges & Milestones */}
          <div className="bg-white rounded-3xl border-4 border-[#FBBF24] p-6 shadow-lg space-y-3.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#92400E] flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-[#D97706]" />
              <span>Unlocked Achievements</span>
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {badges.slice(0, 3).map((b) => (
                <div
                  key={b.id}
                  className="p-3 rounded-2xl bg-[#FEF3C7] border-2 border-[#FDE68A] flex flex-col items-center text-center space-y-1.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-white text-[#D97706] flex items-center justify-center shadow-xs">
                    <Star className="w-4 h-4 fill-[#F59E0B]" />
                  </div>
                  <span className="text-[10px] font-black text-[#78350F] leading-tight">{b.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
