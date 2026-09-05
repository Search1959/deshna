import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Volume2,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Search,
  Layers,
  ArrowRight,
  HelpCircle,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const VocabularyView: React.FC = () => {
  const {
    vocabulary,
    updateVocabStatus,
    speakText,
    awardPoints,
    subjects,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'learning' | 'review' | 'mastered'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWords = vocabulary.filter((v) => {
    if (activeTab !== 'all' && v.status !== activeTab) return false;
    if (selectedSubject !== 'all' && v.subjectId !== selectedSubject) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        v.word.toLowerCase().includes(q) ||
        v.meaning.toLowerCase().includes(q) ||
        v.subjectId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const counts = {
    all: vocabulary.length,
    new: vocabulary.filter((v) => v.status === 'new').length,
    learning: vocabulary.filter((v) => v.status === 'learning').length,
    review: vocabulary.filter((v) => v.status === 'review').length,
    mastered: vocabulary.filter((v) => v.status === 'mastered').length,
  };

  const handleMarkStatus = (wordId: string, status: 'new' | 'learning' | 'review' | 'mastered') => {
    updateVocabStatus(wordId, status);
    if (status === 'mastered') {
      awardPoints(15, 'Mastered vocabulary term');
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      } catch {}
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl border-b-6 sm:border-b-8 border-[#5B21B6] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-yellow-300 border border-white/30">
            Cross-Subject Academic Lexicon
          </span>
          <h1 className="text-xl sm:text-4xl font-black tracking-tight">
            Vocabulary Vault & Flashcards
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 font-bold">
            Master specialized academic terminology across Science, Math, Social Studies, and English using spaced
            repetition memory cards with pronunciation and context.
          </p>
        </div>
      </div>

      {/* Control Bar: Status Tabs, Subject Filter, Search */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-[#C4B5FD] shadow-lg space-y-3 sm:space-y-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b-2 border-purple-100 w-full max-w-full scrollbar-none">
          {[
            { id: 'all', label: 'All Terms', count: counts.all, color: 'bg-slate-200 text-slate-800' },
            { id: 'new', label: 'New', count: counts.new, color: 'bg-blue-200 text-blue-900' },
            { id: 'learning', label: 'Learning', count: counts.learning, color: 'bg-amber-200 text-amber-900' },
            { id: 'review', label: 'Review Due', count: counts.review, color: 'bg-purple-200 text-purple-900' },
            { id: 'mastered', label: 'Mastered', count: counts.mastered, color: 'bg-emerald-200 text-emerald-900' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs font-black transition flex items-center space-x-1.5 border-2 whitespace-nowrap shrink-0 min-h-[38px] ${
                activeTab === tab.id
                  ? 'bg-[#8B5CF6] text-white border-[#7C3AED] shadow-sm'
                  : 'bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#5B21B6] border-[#DDD6FE]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${activeTab === tab.id ? 'bg-white/30 text-white' : tab.color}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Subject Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <span className="text-xs font-black text-[#5B21B6] uppercase">Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3.5 py-2 text-xs font-bold rounded-2xl border-2 border-[#DDD6FE] bg-[#F5F3FF] text-[#5B21B6] focus:bg-white"
            >
              <option value="all">All Subjects</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} (Gr {sub.gradeId})
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vocabulary..."
              className="w-full pl-10 pr-3.5 py-2 text-xs font-bold rounded-2xl border-2 border-[#DDD6FE] bg-[#F5F3FF] text-slate-800 focus:bg-white focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>
        </div>
      </div>

      {/* Flashcards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredWords.map((v) => {
          return (
            <div
              key={v.id}
              className={`rounded-3xl border-4 transition p-6 flex flex-col justify-between shadow-md hover:shadow-xl min-h-[260px] ${
                v.status === 'mastered'
                  ? 'bg-white border-[#6EE7B7]'
                  : v.status === 'review'
                  ? 'bg-white border-[#C4B5FD]'
                  : 'bg-white border-[#FBBF24]'
              }`}
            >
              <div>
                {/* Top Strip */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl bg-[#EFF6FF] text-[#1E40AF] border border-[#DBEAFE]">
                    Grade {v.gradeId} • {v.partOfSpeech}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => speakText(v.word)}
                      className="p-2 rounded-xl text-purple-600 hover:bg-purple-100 transition border border-purple-200"
                      title="Pronounce word"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-xl border ${
                        v.status === 'mastered'
                          ? 'bg-[#D1FAE5] text-[#065F46] border-[#A7F3D0]'
                          : v.status === 'learning'
                          ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                          : 'bg-[#EFF6FF] text-[#1E40AF] border-[#DBEAFE]'
                      }`}
                    >
                      {v.status}
                    </span>
                  </div>
                </div>

                {/* Word & Phonetic */}
                <div>
                  <h3 className="text-2xl font-black text-[#1F2937]">{v.word}</h3>
                  <p className="text-xs text-[#7C3AED] font-black font-mono mt-0.5">{v.phonetic}</p>
                </div>

                {/* Meaning & Example */}
                <div className="mt-3.5 space-y-2 text-xs">
                  <p className="text-slate-700 leading-relaxed font-bold">
                    <span className="text-slate-900 font-black">Meaning:</span> {v.meaning}
                  </p>
                  {v.exampleSentence && (
                    <p className="text-slate-600 italic font-medium bg-[#FFFBEB] p-2.5 rounded-xl border border-[#FEF3C7]">
                      "{v.exampleSentence}"
                    </p>
                  )}
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-between mt-4">
                <span className="text-[10px] font-bold text-slate-500">Practiced {v.timesPracticed} times</span>
                <div className="flex items-center space-x-2">
                  {v.status !== 'mastered' ? (
                    <button
                      onClick={() => handleMarkStatus(v.id, 'mastered')}
                      className="px-3.5 py-1.5 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl text-xs font-black transition flex items-center space-x-1 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mastered</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMarkStatus(v.id, 'review')}
                      className="px-3.5 py-1.5 bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#5B21B6] border border-[#DDD6FE] rounded-xl text-xs font-black transition"
                    >
                      Move to Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
