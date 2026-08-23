import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OnboardingModal } from '../components/OnboardingModal';
import {
  Sparkles,
  Bot,
  BookOpen,
  Mic,
  Brain,
  Award,
  Layers,
  ArrowRight,
  GraduationCap,
  Users,
  CheckCircle2,
  Zap,
  TrendingUp,
  Clock,
  ShieldCheck,
  Star,
  Flame,
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const {
    grades,
    setSelectedGradeId,
    setActiveView,
    switchStudent,
    allStudents,
  } = useApp();

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const stageGroups = [
    {
      title: 'Grades 1 – 5',
      tag: 'Primary Foundations',
      description: 'Phonics, interactive story reading aloud, arithmetic, and exploratory environmental science.',
      grades: [1, 2, 3, 4, 5],
      color: 'from-amber-500 to-orange-500',
      bgLight: 'bg-amber-50/60 border-amber-200/80',
    },
    {
      title: 'Grades 6 – 8',
      tag: 'Middle School Concepts',
      description: 'Algebraic equations, heat & force physics, biology cells, medieval civilizations, and critical reasoning.',
      grades: [6, 7, 8],
      color: 'from-blue-600 to-cyan-600',
      bgLight: 'bg-blue-50/60 border-blue-200/80',
    },
    {
      title: 'Grades 9 – 10',
      tag: 'Board Exam Preparation',
      description: 'Rigorous physics, chemistry, biology, standard mathematics, and past board pattern question analysis.',
      grades: [9, 10],
      color: 'from-emerald-600 to-teal-600',
      bgLight: 'bg-emerald-50/60 border-emerald-200/80',
    },
    {
      title: 'Grade 11',
      tag: 'Specialized Streams',
      description: 'In-depth streams: Science (PCM/B), Commerce (Accounts/Eco/BST), and Humanities.',
      grades: [11],
      color: 'from-purple-600 to-indigo-600',
      bgLight: 'bg-purple-50/60 border-purple-200/80',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#1F2937] selection:bg-[#F59E0B] selection:text-white">
      {/* Top Banner Hero */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-r from-[#D97706] via-[#B45309] to-[#78350F] text-white border-b-8 border-[#92400E]">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FDE68A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-black text-yellow-200 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span>DESHNA AI LEARNING HUB • FOR GRADES 1 TO 11</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              One AI Learning Platform. <br />
              <span className="text-yellow-300 drop-shadow-sm">
                Every Grade. Every Subject.
              </span> <br />
              Personalized for Every Student.
            </h1>

            <p className="text-sm sm:text-lg text-amber-100 font-bold max-w-2xl mx-auto leading-relaxed">
              "Learn Smarter. Practice Better. Grow Every Day." From Grade 1 foundational phonics to Grade 11
              specialized streams across CBSE, ICSE, and State Boards—with adaptive practice, reading coach, and
              Socratic AI Tutor.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <button
                id="hero-start-btn"
                onClick={() => setIsOnboardingOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-black text-sm shadow-lg border-2 border-[#D97706] transition transform active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>Start Learning Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-explore-btn"
                onClick={() => setActiveView('classes_catalog')}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/15 hover:bg-white/25 border-2 border-white/30 text-white font-black text-sm transition flex items-center justify-center space-x-2"
              >
                <Layers className="w-4 h-4 text-yellow-300" />
                <span>Explore Classes & Curriculum</span>
              </button>

              <button
                id="hero-dashboard-btn"
                onClick={() => setActiveView('student_dashboard')}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] border-2 border-[#B45309] text-white font-black text-sm shadow-md transition flex items-center justify-center space-x-2"
              >
                <GraduationCap className="w-4 h-4 text-yellow-200" />
                <span>Open Student Workspace</span>
              </button>
            </div>

            {/* Quick Demo Student Switcher Strip */}
            <div className="pt-6 border-t border-white/20 mt-8">
              <p className="text-xs text-amber-200 font-black uppercase tracking-wider mb-3">
                Or jump straight into realistic sample student profiles:
              </p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {allStudents.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      switchStudent(st.id);
                      setActiveView('student_dashboard');
                    }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-xs font-black text-white transition shadow-xs"
                  >
                    <img src={st.avatar} alt={st.name} className="w-5 h-5 rounded-full object-cover border border-white" />
                    <span>{st.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-yellow-200">
                      Gr {st.gradeId}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Class Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border-4 border-[#FBBF24] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b-2 border-amber-100 gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1F2937]">Choose Your Class / Grade</h2>
              <p className="text-xs sm:text-sm text-slate-600 font-bold">
                Select your academic stage to explore subjects, chapters, and personalized diagnostic assessments
              </p>
            </div>
            <span className="text-xs font-black px-4 py-1.5 bg-[#FEF3C7] text-[#92400E] rounded-full border-2 border-[#FDE68A]">
              CBSE • ICSE • State Boards
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {stageGroups.map((group, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl border-4 border-[#FDE68A] bg-[#FFFBEB] flex flex-col justify-between space-y-4 hover:shadow-lg transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#92400E]">
                      {group.tag}
                    </span>
                    <span className="text-xs font-black text-[#78350F] bg-white px-2.5 py-1 rounded-xl border border-[#FDE68A]">
                      {group.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">{group.description}</p>
                </div>

                <div>
                  <p className="text-[11px] font-black text-[#92400E] uppercase tracking-wider mb-2">
                    Select Grade:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.grades.map((gr) => (
                      <button
                        key={gr}
                        onClick={() => {
                          setSelectedGradeId(gr);
                          setActiveView('classes_catalog');
                        }}
                        className="px-3.5 py-2 bg-white hover:bg-[#F59E0B] hover:text-white border-2 border-[#FDE68A] text-[#92400E] text-xs font-black rounded-xl shadow-2xs transition"
                      >
                        Grade {gr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Product Philosophy: ASSESS -> UNDERSTAND -> TEACH -> PRACTICE -> REVISE -> MASTER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1F2937] tracking-tight">
            The Continuous AI Mastery Loop
          </h2>
          <p className="text-sm text-slate-600 font-bold">
            DESHNA is not just a collection of tests. The AI dynamically adapts to what the student should learn next.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { step: '1', title: 'ASSESS', desc: 'Subject-wise diagnostic checks', icon: Brain, color: 'text-blue-700 bg-blue-100' },
            { step: '2', title: 'UNDERSTAND', desc: 'Real-world analogies & models', icon: LightbulbIcon, color: 'text-amber-800 bg-amber-200' },
            { step: '3', title: 'TEACH', desc: 'Interactive step-by-step lessons', icon: BookOpen, color: 'text-indigo-700 bg-indigo-100' },
            { step: '4', title: 'PRACTICE', desc: 'Adaptive difficulty scaling', icon: Zap, color: 'text-purple-700 bg-purple-100' },
            { step: '5', title: 'IDENTIFY', desc: 'Spotting weakness & gaps', icon: ShieldCheck, color: 'text-rose-700 bg-rose-100' },
            { step: '6', title: 'REINFORCE', desc: 'Spaced repetition memory cards', icon: Clock, color: 'text-cyan-700 bg-cyan-100' },
            { step: '7', title: 'REASSESS', desc: 'Timed chapter mini-tests', icon: Award, color: 'text-emerald-700 bg-emerald-100' },
            { step: '8', title: 'MASTER', desc: 'Lifelong concept retention', icon: Star, color: 'text-yellow-800 bg-yellow-200' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-3xl bg-white border-2 border-[#FDE68A] shadow-xs flex flex-col items-center text-center space-y-2 hover:-translate-y-1 transition-transform"
              >
                <div className={`w-9 h-9 rounded-2xl ${item.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-[#92400E]">STAGE {item.step}</span>
                  <h4 className="text-xs font-black text-slate-900">{item.title}</h4>
                  <p className="text-[10px] text-slate-600 font-medium mt-0.5 leading-tight">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-14 bg-[#FEF3C7]/60 border-y-4 border-[#FDE68A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#92400E] bg-white px-3 py-1 rounded-full border border-[#FDE68A]">
              Complete Learning Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1F2937]">
              One Profile Across All Modules
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-7 rounded-3xl border-4 border-[#FBBF24] shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] border-2 border-[#C7D2FE] flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#1F2937]">Socratic AI Tutor</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Adapts explanations to the student's age: playful stories for Grades 1–5, conceptual reasoning for
                Grades 6–8, and rigorous formulas and board patterns for Grades 9–11.
              </p>
              <button
                onClick={() => setActiveView('student_dashboard')}
                className="text-xs font-black text-[#4F46E5] hover:text-[#3730A3] flex items-center space-x-1"
              >
                <span>Ask AI Tutor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-7 rounded-3xl border-4 border-[#6EE7B7] shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#059669] border-2 border-[#A7F3D0] flex items-center justify-center">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#1F2937]">AI Reading Coach</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Children read passages aloud with real-time speech recognition. Measures words per minute (WPM),
                pinpoints mispronounced words, and encourages sentence rereading.
              </p>
              <button
                onClick={() => setActiveView('reading_coach')}
                className="text-xs font-black text-[#059669] hover:text-[#047857] flex items-center space-x-1"
              >
                <span>Try Reading Coach</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-7 rounded-3xl border-4 border-[#FDE68A] shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFFBEB] text-[#D97706] border-2 border-[#FDE68A] flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#1F2937]">Doubt & Diagram Scanner</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Students can type questions or upload photos of textbook diagrams. The AI provides step-by-step solutions
                structured into Understand → Plan → Solve → Check.
              </p>
              <button
                onClick={() => setActiveView('doubt_solver')}
                className="text-xs font-black text-[#D97706] hover:text-[#B45309] flex items-center space-x-1"
              >
                <span>Solve a Doubt</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-7 rounded-3xl border-4 border-[#E9D5FF] shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF5FF] text-[#9333EA] border-2 border-[#E9D5FF] flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#1F2937]">Cross-Subject Vocabulary Vault</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Academic terms across Science, Math, Social Studies, and English are tracked in four spaced repetition
                states: New, Learning, Review, and Mastered.
              </p>
              <button
                onClick={() => setActiveView('vocabulary_vault')}
                className="text-xs font-black text-[#9333EA] hover:text-[#7E22CE] flex items-center space-x-1"
              >
                <span>Explore Vocabulary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-7 rounded-3xl border-4 border-[#FECDD3] shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF1F2] text-[#E11D48] border-2 border-[#FECDD3] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#1F2937]">Parent Insights & Weekly AI Report</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Parents receive meaningful growth summaries with zero clinical jargon, plus suggested dinner
                conversation starters to reinforce child curiosity.
              </p>
              <button
                onClick={() => setActiveView('parent_dashboard')}
                className="text-xs font-black text-[#E11D48] hover:text-[#BE123C] flex items-center space-x-1"
              >
                <span>View Parent Insights</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-7 rounded-3xl border-4 border-[#BAE6FD] shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F0F9FF] text-[#0284C7] border-2 border-[#BAE6FD] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#1F2937]">Teacher & Admin CMS</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Curriculum managers can add boards, subjects, chapters, and question banks via CSV import with a
                four-stage quality workflow: Draft → Review → Approved → Published.
              </p>
              <button
                onClick={() => setActiveView('admin_dashboard')}
                className="text-xs font-black text-[#0284C7] hover:text-[#0369A1] flex items-center space-x-1"
              >
                <span>Open Admin CMS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F2937] text-amber-100 py-12 border-t-8 border-[#F59E0B] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-white font-black text-base">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span>DESHNA AI LEARNING HUB</span>
          </div>
          <p className="text-center sm:text-left text-xs text-amber-200/80 font-medium">
            © 2026 DESHNA AI Learning Hub. Child-safe, privacy-first personalized learning architecture.
          </p>
          <div className="flex space-x-4 text-xs font-black text-yellow-400">
            <button onClick={() => setActiveView('student_dashboard')} className="hover:underline">Student</button>
            <button onClick={() => setActiveView('parent_dashboard')} className="hover:underline">Parent</button>
            <button onClick={() => setActiveView('teacher_dashboard')} className="hover:underline">Teacher</button>
            <button onClick={() => setActiveView('admin_dashboard')} className="hover:underline">Admin</button>
          </div>
        </div>
      </footer>

      {/* Onboarding Modal */}
      <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />
    </div>
  );
};

function LightbulbIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}
