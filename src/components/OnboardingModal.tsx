import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  X,
  GraduationCap,
  BookOpen,
  Clock,
  CheckCircle2,
  ArrowRight,
  User,
  Brain,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const {
    boards,
    grades,
    setSelectedBoardId,
    setSelectedGradeId,
    setSelectedStreamId,
    setCurrentStudent,
    setActiveView,
    awardPoints,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [gradeId, setGradeId] = useState<number>(3);
  const [boardId, setBoardId] = useState('cbse');
  const [streamId, setStreamId] = useState<'science' | 'commerce' | 'humanities'>('science');
  const [dailyMinutes, setDailyMinutes] = useState<number>(30);
  const [interests, setInterests] = useState<string[]>(['Science Experiments', 'Math Puzzles']);

  // Diagnostic questions for step 3
  const [diagAnswers, setDiagAnswers] = useState<Record<number, string>>({});
  const [diagFinished, setDiagFinished] = useState(false);

  if (!isOpen) return null;

  const handleFinishOnboarding = () => {
    const newStudent = {
      id: `student-custom-${Date.now()}`,
      name: name.trim() || 'New Learner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      age: gradeId + 5,
      gradeId,
      boardId,
      streamId: gradeId === 11 ? streamId : undefined,
      schoolType: 'Day School',
      preferredLanguage: 'English',
      interests: interests,
      dailyGoalMinutes: dailyMinutes,
      streakDays: 1,
      totalPoints: 200,
      masteryBySubject: {
        'g3-math': 70,
        'g3-eng': 75,
        'g3-evs': 70,
      },
      chapterMastery: {},
      weakTopicIds: [],
      strongTopicIds: [],
      learningStyleSignals: ['Visual representations', 'Step-by-step guidance'],
      wpmReadingSpeed: gradeId * 20 + 20,
      masteredVocabularyCount: 20,
      recentActivityIds: [],
      lastActive: 'Just now',
    };

    setSelectedGradeId(gradeId);
    setSelectedBoardId(boardId);
    if (gradeId === 11) setSelectedStreamId(streamId);
    setCurrentStudent(newStudent);
    awardPoints(200, 'Onboarding Welcome Bonus');

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch {}

    onClose();
    setActiveView('student_dashboard');
  };

  return (
    <div className="fixed inset-0 bottom-16 sm:bottom-[68px] xl:bottom-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-indigo-900 to-blue-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Join DESHNA AI Learning Hub</h3>
              <p className="text-[11px] text-indigo-200">Personalized for Grades 1 to 11</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-indigo-200 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper indicator */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500">
          <span className={step >= 1 ? 'text-indigo-600 font-bold' : ''}>1. Student Profile</span>
          <span>→</span>
          <span className={step >= 2 ? 'text-indigo-600 font-bold' : ''}>2. Academic Board & Goal</span>
          <span>→</span>
          <span className={step >= 3 ? 'text-indigo-600 font-bold' : ''}>3. Diagnostic Calibration</span>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Student Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Diya Sen"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Select Grade / Class
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {grades.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGradeId(g.id)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        gradeId === g.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Gr {g.id}
                    </button>
                  ))}
                </div>
              </div>

              {gradeId === 11 && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Select Stream (Grade 11)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['science', 'commerce', 'humanities'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStreamId(st)}
                        className={`py-2 text-xs font-bold rounded-xl capitalize border transition ${
                          streamId === st
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition flex items-center justify-center space-x-2"
              >
                <span>Continue to Curriculum Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Select Curriculum / Board
                </label>
                <div className="space-y-2">
                  {boards.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBoardId(b.id)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition ${
                        boardId === b.id
                          ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900">{b.name} ({b.code})</p>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{b.description}</p>
                      </div>
                      {boardId === b.id && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target Daily Study Plan Duration
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[15, 30, 45].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDailyMinutes(m)}
                      className={`py-2 text-xs font-bold rounded-xl border transition flex items-center justify-center space-x-1.5 ${
                        dailyMinutes === m
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{m} Minutes</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-2.5 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-2/3 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-1.5"
                >
                  <span>Calibrate Learning Level</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-900 flex items-start space-x-2">
                <Brain className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Mini Diagnostic Calibration</p>
                  <p className="text-[11px] text-indigo-700 mt-0.5">
                    Answer these 2 quick concept checks so your AI Tutor starts at your exact comfort zone!
                  </p>
                </div>
              </div>

              {/* Sample diagnostic questions */}
              <div className="space-y-3">
                <div className="p-3 rounded-xl border border-slate-200 bg-white">
                  <p className="text-xs font-semibold text-slate-900 mb-2">
                    1. When you divide a whole shape into 4 equal slices and take 2, what fraction is that?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {['1/4', '2/4 (which is 1/2)', '3/4', '4/4'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setDiagAnswers({ ...diagAnswers, 1: opt })}
                        className={`py-1.5 px-2.5 text-xs rounded-lg border text-left ${
                          diagAnswers[1] === opt
                            ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-white">
                  <p className="text-xs font-semibold text-slate-900 mb-2">
                    2. Which gas do green plants absorb from the air during photosynthesis?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Oxygen', 'Carbon Dioxide (CO2)', 'Nitrogen', 'Helium'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setDiagAnswers({ ...diagAnswers, 2: opt })}
                        className={`py-1.5 px-2.5 text-xs rounded-lg border text-left ${
                          diagAnswers[2] === opt
                            ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 py-2.5 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleFinishOnboarding}
                  className="w-2/3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Launch My Personalized Hub</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
