import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StreamType } from '../types';
import {
  GraduationCap,
  Layers,
  BookOpen,
  ArrowRight,
  Calculator,
  Atom,
  FlaskConical,
  Zap,
  Globe,
  Leaf,
  Landmark,
  Briefcase,
  TrendingUp,
  FileSpreadsheet,
  Monitor,
  Dna,
  Hourglass,
  Sparkles,
  Palette,
  HeartPulse,
  Award,
  Compass,
  Cpu,
  Trophy,
  Filter,
} from 'lucide-react';

export const ClassesCatalogView: React.FC = () => {
  const {
    grades,
    boards,
    categories,
    streams,
    selectedGradeId,
    setSelectedGradeId,
    selectedBoardId,
    setSelectedBoardId,
    selectedStreamId,
    setSelectedStreamId,
    setSelectedSubjectId,
    setSelectedChapterId,
    getFilteredSubjects,
    getChaptersForSubject,
    setActiveView,
    currentStudent,
  } = useApp();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');

  const activeGrade = grades.find((g) => g.id === selectedGradeId);

  // Filter subjects by board, grade, stream using relational mapping
  const availableSubjects = getFilteredSubjects(selectedBoardId, selectedGradeId, selectedStreamId);

  // Apply category filter if active
  const filteredSubjects = availableSubjects.filter((subj) => {
    if (selectedCategoryId === 'all') return true;
    return subj.categoryId === selectedCategoryId;
  });

  const getSubjectIcon = (iconName: string, categoryId?: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="w-5 h-5" />;
      case 'Atom':
        return <Atom className="w-5 h-5" />;
      case 'FlaskConical':
        return <FlaskConical className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      case 'Leaf':
        return <Leaf className="w-5 h-5" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5" />;
      case 'Monitor':
      case 'Cpu':
        return <Monitor className="w-5 h-5" />;
      case 'Dna':
        return <Dna className="w-5 h-5" />;
      case 'Palette':
        return <Palette className="w-5 h-5" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'Award':
      case 'Trophy':
        return <Trophy className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      default:
        if (categoryId === 'languages') return <BookOpen className="w-5 h-5" />;
        if (categoryId === 'computer_tech') return <Monitor className="w-5 h-5" />;
        if (categoryId === 'arts_expression') return <Palette className="w-5 h-5" />;
        if (categoryId === 'physical_edu') return <HeartPulse className="w-5 h-5" />;
        if (categoryId === 'competitive') return <Trophy className="w-5 h-5" />;
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const handleSelectSubject = (subjId: string) => {
    setSelectedSubjectId(subjId);
    const chapList = getChaptersForSubject(subjId);
    if (chapList.length > 0) {
      setSelectedChapterId(chapList[0].id);
    }
    setActiveView('subject_detail');
  };

  // Get active categories present in the current subject list
  const activeCategoryIds = new Set(availableSubjects.map((s) => s.categoryId));

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl border-b-6 sm:border-b-8 border-[#1E40AF] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-yellow-300 border border-white/30">
            Dynamic Academic Hierarchy • Classes 1 to 11
          </span>
          <h1 className="text-xl sm:text-4xl font-black tracking-tight">
            Complete Curriculum Catalogue
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 font-bold">
            Select your Board, Grade, Stream, and Category to explore clear, easy-to-understand chapters and lessons.
          </p>
        </div>
      </div>

      {/* Grade Selector Row */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-[#60A5FA] shadow-lg space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-xs font-black uppercase tracking-wider text-[#1E40AF]">
            1. Select Grade / Class (1 to 11):
          </label>
          <span className="text-xs font-black text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-xl border border-[#DBEAFE] self-start sm:self-auto">
            Viewing: {activeGrade?.name} ({activeGrade?.stage.replace('_', ' ')})
          </span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-2 sm:gap-2.5">
          {grades.map((gr) => (
            <button
              key={gr.id}
              onClick={() => setSelectedGradeId(gr.id)}
              className={`py-3 px-2 text-xs font-black rounded-2xl border-2 transition flex flex-col items-center justify-center space-y-0.5 ${
                selectedGradeId === gr.id
                  ? 'bg-[#3B82F6] text-white border-[#2563EB] shadow-md scale-105'
                  : 'bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1E40AF] border-[#DBEAFE]'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-blue-300">Grade</span>
              <span className="text-base font-black">{gr.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Board Selector & Stream Selector (if Grade 11) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Board Selection */}
        <div className={`bg-white p-5 sm:p-6 rounded-3xl border-4 border-[#FBBF24] shadow-lg space-y-3 ${selectedGradeId === 11 ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <label className="text-xs font-black uppercase tracking-wider text-[#92400E] block">
            2. Select Board / Curriculum:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {boards.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBoardId(b.id)}
                className={`p-3 sm:p-3.5 rounded-2xl border-2 text-left transition ${
                  selectedBoardId === b.id
                    ? 'bg-[#FEF3C7] border-[#F59E0B] ring-2 ring-[#FBBF24]'
                    : 'bg-[#FFFBEB] hover:bg-[#FEF3C7] border-[#FDE68A]'
                }`}
              >
                <span className="text-xs font-black text-[#78350F] block">{b.code}</span>
                <span className="text-[10px] font-bold text-[#92400E] line-clamp-1">{b.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grade 11 Stream Selector */}
        {selectedGradeId === 11 && (
          <div className="bg-white p-5 sm:p-6 rounded-3xl border-4 border-[#F472B6] shadow-lg space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-[#831843] block">
              3. Stream (Grade 11):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {streams.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedStreamId(st.code as StreamType)}
                  className={`p-2.5 sm:p-3 rounded-2xl border-2 text-center capitalize text-xs font-black transition ${
                    (selectedStreamId || 'science') === st.code
                      ? 'bg-[#F472B6] text-white border-[#DB2777] shadow-sm'
                      : 'bg-[#FDF2F8] hover:bg-[#FCE7F3] text-[#831843] border-[#FBCFE8]'
                  }`}
                >
                  {st.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Category Pills Filter */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border-3 border-amber-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-black text-slate-700 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-amber-600" />
            <span>Subject Category Filter</span>
          </div>
          <span className="text-[11px] font-bold text-slate-500">
            Showing {filteredSubjects.length} of {availableSubjects.length} subjects
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => setSelectedCategoryId('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition border-2 ${
              selectedCategoryId === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
          >
            All Categories ({availableSubjects.length})
          </button>
          {categories.map((cat) => {
            const count = availableSubjects.filter((s) => s.categoryId === cat.id).length;
            if (count === 0) return null; // Only show categories with available subjects
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition border-2 flex items-center space-x-1.5 ${
                  selectedCategoryId === cat.id
                    ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedCategoryId === cat.id ? 'bg-white/30 text-white' : 'bg-amber-200 text-amber-900'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-[#1F2937] flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-[#3B82F6]" />
            <span>
              Subjects for Grade {selectedGradeId} ({boards.find((b) => b.id === selectedBoardId)?.code || 'CBSE'})
              {selectedGradeId === 11 && ` • ${(selectedStreamId || 'science').toUpperCase()}`}
            </span>
          </h2>
          <span className="text-xs text-[#92400E] font-black bg-[#FEF3C7] px-3 py-1 rounded-xl border border-[#FDE68A]">
            {filteredSubjects.length} Subject{filteredSubjects.length === 1 ? '' : 's'} available
          </span>
        </div>

        {filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSubjects.map((subj) => {
              const mastery = currentStudent.masteryBySubject[subj.id] || 65;
              const cat = categories.find((c) => c.id === subj.categoryId);
              return (
                <div
                  key={subj.id}
                  className="bg-white rounded-3xl border-4 border-[#6EE7B7] shadow-md hover:shadow-xl transition flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6 space-y-3.5">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#D1FAE5] text-[#065F46] border-2 border-[#A7F3D0] flex items-center justify-center font-black">
                        {getSubjectIcon(subj.iconName, subj.categoryId)}
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className="text-[10px] font-black px-2.5 py-0.5 rounded-xl bg-[#EFF6FF] text-[#1E40AF] border border-[#DBEAFE]">
                          {subj.code}
                        </span>
                        {cat && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                            {cat.name}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-black text-base text-[#1F2937] group-hover:text-[#059669] transition">
                        {subj.name}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 font-medium leading-relaxed">
                        {subj.description}
                      </p>
                    </div>

                    {/* Mastery Bar */}
                    <div className="pt-2">
                      <div className="flex justify-between text-[11px] font-black text-slate-700 mb-1">
                        <span>Mastery Level</span>
                        <span className="text-[#059669]">{mastery}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full"
                          style={{ width: `${mastery}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-[#ECFDF5] border-t-2 border-[#A7F3D0] flex items-center justify-between text-xs">
                    <span className="text-[#065F46] font-bold">
                      {subj.chaptersCount || 4} Chapters • {subj.totalQuestionsCount || 20}+ Qs
                    </span>
                    <button
                      onClick={() => handleSelectSubject(subj.id)}
                      className="font-black text-[#059669] hover:text-[#047857] flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#A7F3D0] shadow-xs cursor-pointer"
                    >
                      <span>Study Now</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-3xl border-4 border-[#FBBF24] text-center space-y-3">
            <BookOpen className="w-10 h-10 text-[#D97706] mx-auto" />
            <p className="text-sm font-black text-[#78350F]">No subjects match this filter selection.</p>
            <p className="text-xs text-[#92400E] font-bold">
              Try choosing "All Categories" or switch class to explore more subjects.
            </p>
            <button
              onClick={() => setSelectedCategoryId('all')}
              className="mt-3 px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-2xl text-xs font-black shadow-md"
            >
              Show All Subjects for Grade {selectedGradeId}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

