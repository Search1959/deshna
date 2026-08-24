import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  HelpCircle,
  Play,
  RotateCcw,
  Zap,
  Bot,
  Layers,
  ChevronLeft,
} from 'lucide-react';

export const SubjectView: React.FC = () => {
  const {
    selectedSubjectId,
    subjects,
    getChaptersForSubject,
    setSelectedChapterId,
    setActiveView,
    openAITutorWithContext,
    currentStudent,
    t,
    localizeSubject,
    localizeChapter,
  } = useApp();

  const rawSubj = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];
  const currentSubj = rawSubj ? localizeSubject(rawSubj) : rawSubj;
  const rawChapters = rawSubj ? getChaptersForSubject(rawSubj.id) : [];
  const subjectChapters = rawChapters.map(localizeChapter);
  const mastery = currentStudent.masteryBySubject[currentSubj?.id || ''] || 72;

  const handleOpenChapter = (chapId: string) => {
    setSelectedChapterId(chapId);
    setActiveView('chapter_detail');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-bold text-[#78350F]">
        <button
          onClick={() => setActiveView('student_dashboard')}
          className="hover:text-[#D97706] flex items-center space-x-1 bg-[#FEF3C7] px-2.5 py-1 rounded-lg border border-[#FDE68A]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('dashboard', 'Dashboard')}</span>
        </button>
        <span className="text-[#B45309]">/</span>
        <button
          onClick={() => setActiveView('classes_catalog')}
          className="hover:text-[#D97706] bg-[#FEF3C7] px-2.5 py-1 rounded-lg border border-[#FDE68A]"
        >
          {t('grade', 'Grade')} {currentSubj?.gradeId} {t('catalog', 'Catalog')}
        </button>
        <span className="text-[#B45309]">/</span>
        <span className="text-[#1F2937] font-black bg-[#D1FAE5] text-[#065F46] px-2.5 py-1 rounded-lg border border-[#6EE7B7]">
          {currentSubj?.name}
        </span>
      </div>

      {/* Subject Header Banner */}
      <div className="bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl border-b-6 sm:border-b-8 border-[#1E40AF] relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-yellow-300 border border-white/30">
              {currentSubj?.code} • {t('grade', 'Grade')} {currentSubj?.gradeId}
            </span>
            <h1 className="text-xl sm:text-4xl font-black tracking-tight">
              {currentSubj?.name}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-bold leading-relaxed">
              {currentSubj?.description}
            </p>
          </div>

          {/* Mastery Stats Box */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border-2 border-white/30 w-full md:w-auto min-w-[200px] text-center space-y-2">
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-blue-100">
              {t('overall_mastery', 'Subject Mastery Level')}
            </span>
            <div className="text-3xl sm:text-4xl font-black text-amber-300">
              {mastery}%
            </div>
            <div className="w-full h-2 rounded-full bg-white/30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                style={{ width: `${mastery}%` }}
              />
            </div>
            <p className="text-[10px] text-blue-100 font-bold">
              {subjectChapters.length} {t('chapters', 'Chapters')} {t('in_curriculum', 'in this curriculum')}
            </p>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border-3 border-[#FBBF24] shadow-md">
        <div className="flex items-center space-x-2 text-xs text-[#78350F] font-black">
          <Layers className="w-4 h-4 text-[#D97706]" />
          <span>{t('curriculum_chapters', 'Curriculum Chapters')} ({subjectChapters.length})</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() =>
              openAITutorWithContext({
                subject: currentSubj?.name,
                chapter: 'Full Subject Overview',
                topic: 'General Questions',
              })
            }
            className="px-3.5 py-2 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1E40AF] rounded-xl text-xs font-black transition border-2 border-[#DBEAFE] flex items-center space-x-1.5 flex-1 sm:flex-none justify-center"
          >
            <Bot className="w-4 h-4 text-[#2563EB]" />
            <span>{t('ask_ai_tutor', 'Ask Subject AI Tutor')}</span>
          </button>
          <button
            onClick={() => setActiveView('exam_prep')}
            className="px-3.5 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl text-xs font-black transition shadow-sm flex-1 sm:flex-none justify-center"
          >
            {t('mock_tests', 'Mock Test')}
          </button>
        </div>
      </div>

      {/* Chapters Listing */}
      <div className="space-y-3.5">
        {subjectChapters.length > 0 ? (
          subjectChapters.map((chap) => {
            const chapMastery = currentStudent.chapterMastery[chap.id] || 70;
            return (
              <div
                key={chap.id}
                className="bg-white rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-[#6EE7B7] p-4 sm:p-5 shadow-md hover:shadow-lg transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                  <div className="w-10 h-10 rounded-2xl bg-[#D1FAE5] text-[#065F46] border-2 border-[#A7F3D0] font-black text-sm flex items-center justify-center shrink-0">
                    {chap.number}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm sm:text-base font-black text-[#1F2937]">
                        {chap.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium max-w-2xl">
                      {chap.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#065F46] font-bold">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-[#059669]" />
                        <span>~{chap.estMinutes} {t('min', 'mins')}</span>
                      </span>
                      <span>•</span>
                      <span>{chap.learningObjectives.length} {t('learning_objectives', 'Learning Objectives')}</span>
                      <span>•</span>
                      <span className="text-[#059669] font-black">{t('mastery', 'Mastery')}: {chapMastery}%</span>
                    </div>
                  </div>
                </div>

                {/* Chapter Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto pt-3 md:pt-0 border-t-2 md:border-t-0 border-[#A7F3D0]">
                  <button
                    onClick={() => handleOpenChapter(chap.id)}
                    className="flex-1 md:flex-none px-3.5 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl text-xs font-black transition flex items-center justify-center space-x-1 shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{t('study_now', 'Study [Learn]')}</span>
                  </button>

                  <button
                    onClick={() => handleOpenChapter(chap.id)}
                    className="flex-1 md:flex-none px-3.5 py-2 bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] border-2 border-[#FDE68A] rounded-xl text-xs font-black transition flex items-center justify-center space-x-1"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>{t('practice', 'Practice')}</span>
                  </button>

                  <button
                    onClick={() =>
                      openAITutorWithContext({
                        subject: currentSubj?.name,
                        chapter: chap.title,
                        topic: chap.title,
                      })
                    }
                    className="flex-1 md:flex-none px-3.5 py-2 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1E40AF] border-2 border-[#DBEAFE] rounded-xl text-xs font-black transition flex items-center justify-center space-x-1"
                  >
                    <Bot className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>{t('ask_ai_tutor', 'Ask AI')}</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white p-8 rounded-3xl border-4 border-[#FBBF24] text-center space-y-2">
            <BookOpen className="w-8 h-8 text-[#D97706] mx-auto" />
            <p className="text-sm font-black text-[#78350F]">No chapters mapped yet.</p>
            <p className="text-xs text-[#92400E] font-bold">Add chapters in the Admin CMS.</p>
          </div>
        )}
      </div>
    </div>
  );
};
