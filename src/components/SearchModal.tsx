import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  X,
  BookOpen,
  FileText,
  Calculator,
  Compass,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    subjects,
    chapters,
    topics,
    vocabulary,
    stories,
    setSelectedSubjectId,
    setSelectedChapterId,
    setActiveView,
    openAITutorWithContext,
  } = useApp();

  const [query, setQuery] = useState('');

  // Keyboard shortcut listener Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const normalized = query.toLowerCase().trim();

  const filteredChapters = query
    ? chapters.filter(
        (c) =>
          c.title.toLowerCase().includes(normalized) ||
          c.description.toLowerCase().includes(normalized)
      )
    : [];

  const filteredTopics = query
    ? topics.filter(
        (t) =>
          t.title.toLowerCase().includes(normalized) ||
          t.summary.toLowerCase().includes(normalized) ||
          (t.formulas && t.formulas.some((f) => f.toLowerCase().includes(normalized)))
      )
    : [];

  const filteredVocab = query
    ? vocabulary.filter(
        (v) =>
          v.word.toLowerCase().includes(normalized) ||
          v.meaning.toLowerCase().includes(normalized)
      )
    : [];

  const filteredStories = query
    ? stories.filter(
        (s) =>
          s.title.toLowerCase().includes(normalized) ||
          s.passage.toLowerCase().includes(normalized)
      )
    : [];

  const handleSelectChapter = (chap: any) => {
    setSelectedSubjectId(chap.subjectId);
    setSelectedChapterId(chap.id);
    setActiveView('chapter_detail');
    setIsSearchOpen(false);
  };

  const handleSelectTopic = (top: any) => {
    const chap = chapters.find((c) => c.id === top.chapterId);
    if (chap) {
      setSelectedSubjectId(chap.subjectId);
      setSelectedChapterId(chap.id);
    }
    setActiveView('chapter_detail');
    setIsSearchOpen(false);
  };

  const handleSelectVocab = (v: any) => {
    setActiveView('vocabulary_vault');
    setIsSearchOpen(false);
  };

  const handleAskAIAboutSearch = () => {
    openAITutorWithContext({
      subject: 'Global Search',
      chapter: query,
      topic: query,
    });
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 bottom-16 sm:bottom-[68px] xl:bottom-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 pb-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 mb-6">
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center space-x-3 bg-slate-50/70">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fractions, electricity, photosynthesis, vocabulary, stories..."
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md font-medium"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query ? (
            <div className="text-center py-8">
              <Compass className="w-10 h-10 text-indigo-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">Type to search the entire curriculum</p>
              <p className="text-xs text-slate-400 mt-1">
                Explore Chapters, Topics, Formulas, Vocabulary words, and Reading stories
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {['Fractions', 'Photosynthesis', 'Electricity', 'Super Senses', 'Tessellation'].map(
                  (sugg) => (
                    <button
                      key={sugg}
                      onClick={() => setQuery(sugg)}
                      className="text-xs px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition"
                    >
                      {sugg}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Ask AI CTA */}
              <button
                onClick={handleAskAIAboutSearch}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-200/80 hover:border-indigo-400 flex items-center justify-between text-left transition group"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-indigo-900">
                      Ask AI Tutor about "{query}"
                    </p>
                    <p className="text-[11px] text-indigo-700">
                      Get a personalized step-by-step conceptual explanation
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Topics Matches */}
              {filteredTopics.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Topics & Concepts ({filteredTopics.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredTopics.map((top) => (
                      <button
                        key={top.id}
                        onClick={() => handleSelectTopic(top)}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between text-left transition"
                      >
                        <div className="flex items-center space-x-2.5">
                          <Calculator className="w-4 h-4 text-amber-600" />
                          <div>
                            <p className="text-xs font-semibold text-slate-800">{top.title}</p>
                            <p className="text-[11px] text-slate-500 line-clamp-1">{top.summary}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chapters Matches */}
              {filteredChapters.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Curriculum Chapters ({filteredChapters.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredChapters.map((chap) => (
                      <button
                        key={chap.id}
                        onClick={() => handleSelectChapter(chap)}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between text-left transition"
                      >
                        <div className="flex items-center space-x-2.5">
                          <BookOpen className="w-4 h-4 text-indigo-600" />
                          <div>
                            <p className="text-xs font-semibold text-slate-800">
                              Ch {chap.number}: {chap.title}
                            </p>
                            <p className="text-[11px] text-slate-500 line-clamp-1">{chap.description}</p>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 font-medium">
                          Grade {chap.gradeId}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Vocabulary Matches */}
              {filteredVocab.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Vocabulary Vault ({filteredVocab.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredVocab.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => handleSelectVocab(v)}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between text-left transition"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-slate-900">{v.word}</span>
                            <span className="text-[10px] text-indigo-600 font-mono">{v.phonetic}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{v.meaning}</p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold uppercase">
                          {v.status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Reading Stories Matches */}
              {filteredStories.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Reading Stories ({filteredStories.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredStories.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => {
                          setActiveView('reading_coach');
                          setIsSearchOpen(false);
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between text-left transition"
                      >
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-emerald-600" />
                          <div>
                            <p className="text-xs font-semibold text-slate-800">{st.title}</p>
                            <p className="text-[11px] text-slate-500">{st.genre} • {st.wordCount} words</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400">Target {st.targetWpm} WPM</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredChapters.length === 0 &&
                filteredTopics.length === 0 &&
                filteredVocab.length === 0 &&
                filteredStories.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-xs text-slate-500">No exact matches found for "{query}".</p>
                    <button
                      onClick={handleAskAIAboutSearch}
                      className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      Ask AI Tutor to explain "{query}" →
                    </button>
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
