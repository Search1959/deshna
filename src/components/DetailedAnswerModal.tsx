import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Question } from '../types';
import {
  X,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Volume2,
  VolumeX,
  BookOpen,
  HelpCircle,
  Share2,
  Check,
  ArrowRight,
  GraduationCap,
  MessageSquare,
  Copy,
  Zap,
  Target,
  FileText,
} from 'lucide-react';

interface DetailedAnswerModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question | null;
  selectedOptionIndex: number | null;
  subjectName?: string;
  chapterTitle?: string;
  onNextQuestion?: () => void;
  hasNextQuestion?: boolean;
}

export const DetailedAnswerModal: React.FC<DetailedAnswerModalProps> = ({
  isOpen,
  onClose,
  question,
  selectedOptionIndex,
  subjectName,
  chapterTitle,
  onNextQuestion,
  hasNextQuestion,
}) => {
  const {
    speakText,
    stopSpeaking,
    isSpeaking,
    openAITutorWithContext,
    selectedLanguage,
    t,
  } = useApp();

  const [activeDetailTab, setActiveDetailTab] = useState<'concept' | 'options' | 'exam_tips'>('concept');
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !question) return null;

  // Determine correct option index
  const getCorrectOptionIndex = (q: Question): number => {
    if (typeof q?.correctAnswer === 'number') return q.correctAnswer;
    if (typeof q?.correctAnswer === 'string') {
      const idx = q.options?.findIndex(
        (opt: string) => opt.toLowerCase() === (q.correctAnswer as string).toLowerCase()
      );
      if (idx !== -1 && idx !== undefined) return idx;
      const letterIdx = (q.correctAnswer as string).charCodeAt(0) - 65;
      if (letterIdx >= 0 && letterIdx < (q.options?.length || 4)) return letterIdx;
    }
    return 0;
  };

  const correctIdx = getCorrectOptionIndex(question);
  const hasSelected = selectedOptionIndex !== null && selectedOptionIndex !== undefined;
  const isCorrect = hasSelected && selectedOptionIndex === correctIdx;
  const correctOptionText = question.options?.[correctIdx] || String(question.correctAnswer);
  const selectedOptionText = hasSelected && question.options?.[selectedOptionIndex] ? question.options[selectedOptionIndex] : null;

  // Build audio narration text
  const fullNarrationText = `${t('question', 'Question')}: ${question.text}. ${
    isCorrect
      ? t('your_answer_correct', 'Your answer is correct!')
      : `${t('correct_answer_is', 'The correct answer is')}: ${correctOptionText}.`
  } ${t('explanation', 'Explanation')}: ${question.explanation || 'Review the core concept.'}`;

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(fullNarrationText, selectedLanguage);
    }
  };

  const handleCopyExplanation = () => {
    const copyText = `📝 Q: ${question.text}\n\n✅ Correct Answer: Option ${String.fromCharCode(65 + correctIdx)} - ${correctOptionText}\n\n💡 Explanation: ${question.explanation || 'Core pedagogical principle.'}\n\n📌 Hint/Takeaway: ${question.hints?.[0] || 'Key topic concept.'}`;
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleAskAITutor = () => {
    onClose();
    openAITutorWithContext({
      subject: subjectName,
      chapter: chapterTitle,
      topic: `${question.text} (Correct answer: ${correctOptionText}. Explanation: ${question.explanation})`,
    });
  };

  return (
    <div
      id="detailed-answer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-slate-50/90 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  {t('detailed_answer_explanation', 'Detailed Answer Breakdown & Concepts')}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {question.difficulty || 'Standard'}
                </span>
              </div>
              {(chapterTitle || subjectName) && (
                <p className="text-xs text-slate-500 font-medium truncate max-w-xs sm:max-w-md">
                  {subjectName ? `${subjectName} • ` : ''}{chapterTitle || ''}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={handleToggleSpeak}
              title={isSpeaking ? t('stop_audio', 'Stop Audio') : t('read_aloud', 'Read Aloud')}
              className={`p-2 rounded-xl border text-xs font-bold transition flex items-center space-x-1 ${
                isSpeaking
                  ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-700" /> : <Volume2 className="w-4 h-4 text-blue-600" />}
              <span className="hidden sm:inline">{isSpeaking ? t('listening', 'Speaking...') : t('listen', 'Listen')}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Status Verdict Card */}
          {hasSelected ? (
            <div
              className={`p-4 rounded-2xl border flex items-start space-x-3.5 ${
                isCorrect
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50/80 border-rose-300 text-rose-950'
              }`}
            >
              {isCorrect ? (
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <XCircle className="w-5 h-5" />
                </div>
              )}
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black">
                    {isCorrect
                      ? t('great_job_correct', '🎉 Excellent! Your answer is Correct (+20 Points)')
                      : t('good_effort_incorrect', '💡 Good Effort! Let’s understand the right concept')}
                  </h4>
                </div>
                <p className="text-xs font-medium opacity-90">
                  {isCorrect
                    ? t('correct_explanation_intro', 'You identified the right scientific/mathematical principle accurately.')
                    : `${t('you_selected', 'You selected')}: Option ${String.fromCharCode(65 + (selectedOptionIndex ?? 0))} • ${t('correct_is', 'Correct Answer is')}: Option ${String.fromCharCode(65 + correctIdx)}.`}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-950 flex items-center space-x-3">
              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
              <p className="text-xs font-semibold">
                {t('reviewing_answer_key', 'Reviewing comprehensive concept notes and answer key.')}
              </p>
            </div>
          )}

          {/* Question Statement */}
          <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
              {t('question', 'Question')}
            </span>
            <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
              {question.text}
            </p>
            {question.diagramUrl && (
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-center">
                <img
                  src={question.diagramUrl}
                  alt="Question Diagram"
                  className="max-h-40 object-contain rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Option Choices Breakdown */}
          {question.options && (
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                {t('options_breakdown', 'Options & Answer Key')}
              </span>
              <div className="grid grid-cols-1 gap-2">
                {question.options.map((opt, idx) => {
                  const isThisCorrect = idx === correctIdx;
                  const isThisSelected = hasSelected && selectedOptionIndex === idx;

                  let cardStyle = 'bg-slate-50 border-slate-200 text-slate-700';
                  if (isThisCorrect) {
                    cardStyle = 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-400';
                  } else if (isThisSelected && !isThisCorrect) {
                    cardStyle = 'bg-rose-50/90 border-rose-400 text-rose-950 ring-1 ring-rose-300';
                  }

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition ${cardStyle}`}
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0 pr-2">
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                            isThisCorrect
                              ? 'bg-emerald-600 text-white'
                              : isThisSelected
                              ? 'bg-rose-600 text-white'
                              : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-snug break-words">{opt}</span>
                      </div>

                      <div className="flex items-center space-x-1.5 shrink-0">
                        {isThisCorrect && (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold">
                            <Check className="w-3 h-3" />
                            <span>{t('correct_answer', 'Correct')}</span>
                          </span>
                        )}
                        {isThisSelected && !isThisCorrect && (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-bold">
                            <X className="w-3 h-3" />
                            <span>{t('your_choice', 'Your Choice')}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Tabs for Deep Breakdown */}
          <div className="flex border-b border-slate-200 text-xs font-bold gap-2">
            <button
              onClick={() => setActiveDetailTab('concept')}
              className={`pb-2.5 px-2 border-b-2 transition flex items-center space-x-1.5 ${
                activeDetailTab === 'concept'
                  ? 'border-blue-600 text-blue-700 font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('step_by_step_explanation', 'Core Concept & Explanation')}</span>
            </button>

            <button
              onClick={() => setActiveDetailTab('options')}
              className={`pb-2.5 px-2 border-b-2 transition flex items-center space-x-1.5 ${
                activeDetailTab === 'options'
                  ? 'border-blue-600 text-blue-700 font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t('concept_tips', 'Key Takeaway & Hints')}</span>
            </button>

            <button
              onClick={() => setActiveDetailTab('exam_tips')}
              className={`pb-2.5 px-2 border-b-2 transition flex items-center space-x-1.5 ${
                activeDetailTab === 'exam_tips'
                  ? 'border-blue-600 text-blue-700 font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-rose-500" />
              <span>{t('exam_tip', 'Exam Strategy')}</span>
            </button>
          </div>

          {/* Tab 1: Pedagogical Deep Explanation */}
          {activeDetailTab === 'concept' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/90 to-indigo-50/60 border border-blue-200/80 space-y-2.5">
                <div className="flex items-center space-x-2 text-blue-900 font-black text-xs sm:text-sm">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>{t('why_this_is_correct', 'Why is this the Correct Answer?')}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                  {question.explanation ||
                    t(
                      'standard_explanation_text',
                      'This question evaluates fundamental understanding of this chapter. The correct option directly aligns with standard textbook definitions and natural principles.'
                    )}
                </p>

                {question.stepByStepSolution && question.stepByStepSolution.length > 0 && (
                  <div className="pt-2 space-y-1.5 border-t border-blue-200/60">
                    <span className="text-[11px] font-bold text-blue-900 block">
                      {t('step_by_step_breakdown', 'Step-by-Step Derivation')}:
                    </span>
                    <ol className="list-decimal list-inside space-y-1 text-xs text-slate-700 pl-1">
                      {question.stepByStepSolution.map((step, sIdx) => (
                        <li key={sIdx} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Key Takeaways & Hints */}
          {activeDetailTab === 'options' && (
            <div className="space-y-3 animate-in fade-in">
              {question.hints && question.hints.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 space-y-2">
                  <div className="flex items-center space-x-2 text-amber-900 font-black text-xs sm:text-sm">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>{t('memory_hook_title', 'Memory Tip / Concept Hook')}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-amber-950">
                    {question.hints.map((hint, hIdx) => (
                      <li key={hIdx} className="flex items-start space-x-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block">{t('learning_objective_goal', 'Core Learning Goal')}:</span>
                <p className="leading-relaxed">
                  {t(
                    'objective_summary_text',
                    'Mastering this concept ensures accurate problem solving and confidence during unit assessments and competitive tests.'
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Exam Tips & Scoring Strategy */}
          {activeDetailTab === 'exam_tips' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 space-y-2">
                <div className="flex items-center space-x-2 text-purple-900 font-black text-xs sm:text-sm">
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                  <span>{t('board_exam_relevance', 'Board Exam Relevance & Marking Pattern')}</span>
                </div>
                <p className="text-xs sm:text-sm text-purple-950 leading-relaxed">
                  {question.examRelevance ||
                    t(
                      'standard_exam_tip',
                      'This style of question frequently appears in 1-mark objective questions (MCQs / Fill-in-the-blanks) and section A of annual school assessments. Remember to read all four options before selecting.'
                    )}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleAskAITutor}
              className="px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-black shadow-xs transition flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('ask_ai_tutor_about_this', 'Ask AI Tutor to Clarify')}</span>
            </button>

            <button
              onClick={handleCopyExplanation}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 rounded-xl text-xs font-bold border border-slate-200 transition flex items-center space-x-1"
              title="Copy notes"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? t('copied', 'Copied!') : t('copy_notes', 'Copy Note')}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {hasNextQuestion && onNextQuestion && (
              <button
                onClick={() => {
                  onClose();
                  onNextQuestion();
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5"
              >
                <span>{t('next_question', 'Next Question')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition"
            >
              {t('got_it_close', 'Got it!')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
