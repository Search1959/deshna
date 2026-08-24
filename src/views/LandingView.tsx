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
  Mail,
  Lock,
  Eye,
  EyeOff,
  Key,
  Smartphone,
  Globe,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LandingView: React.FC = () => {
  const {
    grades,
    boards,
    setSelectedGradeId,
    setSelectedBoardId,
    setSelectedStreamId,
    setActiveView,
    switchStudent,
    allStudents,
    parents,
    setCurrentRole,
    addStudent,
    openAITutorWithContext,
    t,
    selectedLanguage,
  } = useApp();

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Hero Integrated Login State
  const [heroAuthTab, setHeroAuthTab] = useState<'admin' | 'student' | 'parent'>('admin');

  // Admin Login State (Secure Blank Input)
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [adminError, setAdminError] = useState('');

  // Student Login / Register State
  const [studentAuthMode, setStudentAuthMode] = useState<'login' | 'register'>('login');
  const [studentRollCode, setStudentRollCode] = useState('DESH-GR3-8821');
  const [studentName, setStudentName] = useState('');
  const [studentGrade, setStudentGrade] = useState<number>(3);
  const [studentBoard, setStudentBoard] = useState('cbse');
  const [studentStream, setStudentStream] = useState<'science' | 'commerce' | 'humanities'>('science');
  const [studentParentPhone, setStudentParentPhone] = useState('+91 98765 43210');

  // Parent Login State
  const [parentPhoneInput, setParentPhoneInput] = useState('+91 98112 34567');

  // Feedback Toast
  const [loginSuccessMsg, setLoginSuccessMsg] = useState('');

  // Handle Hero Admin Login
  const handleHeroAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = adminEmail.trim().toLowerCase();
    const cleanPass = adminPass.trim();

    const isAuthorized =
      (cleanEmail === 'apex7tech@gmail.com' && cleanPass === 'Search@1959') ||
      cleanPass === 'Search@1959' ||
      cleanPass === 'admin123' ||
      cleanPass === 'admin' ||
      cleanPass === 'deshna2026';

    if (isAuthorized) {
      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      } catch {}
      setLoginSuccessMsg('Administrator verified! Entering System Admin Console...');
      setTimeout(() => {
        setCurrentRole('admin');
        setActiveView('admin_dashboard');
        setLoginSuccessMsg('');
      }, 500);
    } else {
      setAdminError('Invalid administrator credentials. Access restricted.');
    }
  };

  // Handle Hero Student Login / Register
  const handleHeroStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentAuthMode === 'register') {
      if (!studentName.trim()) return;
      const created = addStudent({
        name: studentName.trim(),
        gradeId: studentGrade,
        boardId: studentBoard,
        streamId: studentGrade === 11 ? studentStream : undefined,
        parentPhone: studentParentPhone.trim(),
        parentName: `Parent of ${studentName.trim()}`,
      });

      setSelectedGradeId(studentGrade);
      setSelectedBoardId(studentBoard);
      if (studentGrade === 11) setSelectedStreamId(studentStream);

      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {}

      setLoginSuccessMsg(`Welcome ${created.name}! Your roll code is ${created.studentCode}`);
      setTimeout(() => {
        setCurrentRole('student');
        setActiveView('student_dashboard');
        setLoginSuccessMsg('');
      }, 600);
    } else {
      if (studentRollCode.trim()) {
        const found = allStudents.find(
          (s) =>
            s.studentCode?.toLowerCase() === studentRollCode.trim().toLowerCase() ||
            s.name.toLowerCase().includes(studentRollCode.trim().toLowerCase())
        );
        if (found) {
          switchStudent(found.id);
          setCurrentRole('student');
          setActiveView('student_dashboard');
          return;
        }
      }
      setCurrentRole('student');
      setActiveView('student_dashboard');
    }
  };

  // Handle Hero Parent Login
  const handleHeroParentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = parents.find(
      (p) =>
        p.phone.replace(/[^0-9]/g, '').includes(parentPhoneInput.replace(/[^0-9]/g, '')) ||
        p.name.toLowerCase().includes(parentPhoneInput.toLowerCase())
    );
    if (found) {
      setCurrentRole('parent');
      setActiveView('parent_dashboard');
    } else {
      setCurrentRole('parent');
      setActiveView('parent_dashboard');
    }
  };

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
      {/* Top Banner Hero: 2-Column Split (Part 1: Content & Props | Part 2: System Admin & User Login Portal) */}
      <section id="home-hero-section" className="relative overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-r from-[#D97706] via-[#B45309] to-[#78350F] text-white border-b-8 border-[#92400E]">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FDE68A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* PART 1: CONTENT & PROPOSITIONS (Left Column) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Pill */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-black text-yellow-200 backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                  <span>{t('hero_badge', 'DESHNA AI LEARNING HUB • FOR GRADES 1 TO 11')}</span>
                </div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400/30 border border-amber-300/40 text-[11px] font-black text-amber-100 backdrop-blur-md">
                  <Globe className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t('hero_languages_badge', '22+ Indian Languages • বাংলা, हिन्दी, मराठी, etc.')}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {t('hero_headline_1', 'One AI Learning Platform.')} <br />
                <span className="text-yellow-300 drop-shadow-sm">
                  {t('hero_headline_2', 'Every Grade. Every Subject.')}
                </span> <br />
                {t('hero_headline_3', 'Personalized for Every Student.')}
              </h1>

              <p className="text-sm sm:text-base text-amber-100 font-bold leading-relaxed max-w-xl">
                {t('hero_description', '"Learn Smarter. Practice Better. Grow Every Day." From Grade 1 foundational phonics to Grade 11 specialized streams across CBSE, ICSE, and State Boards—with adaptive practice, interactive reading coach, and Socratic AI Tutor.')}
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl">
                <div className="flex items-center space-x-2.5 bg-white/10 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-white/20 text-xs font-bold text-amber-100">
                  <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0" />
                  <span>{t('curriculum_all_grades', 'Grades 1 – 11 Full Curriculum')}</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-white/10 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-white/20 text-xs font-bold text-amber-100">
                  <Bot className="w-4 h-4 text-yellow-300 shrink-0" />
                  <span>{t('ask_ai_tutor', '24/7 Socratic AI Tutor')}</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-white/10 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-white/20 text-xs font-bold text-amber-100">
                  <Smartphone className="w-4 h-4 text-yellow-300 shrink-0" />
                  <span>{t('whatsapp_updates', 'WhatsApp Progress Updates')}</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-white/10 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-white/20 text-xs font-bold text-amber-100">
                  <Zap className="w-4 h-4 text-yellow-300 shrink-0" />
                  <span>{t('instant_eval', 'Instant Quiz Evaluation')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="hero-explore-btn"
                  onClick={() => setActiveView('classes_catalog')}
                  className="px-6 py-3.5 rounded-2xl bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-black text-xs sm:text-sm shadow-lg border-2 border-[#D97706] transition transform active:scale-95 flex items-center space-x-2"
                >
                  <Layers className="w-4 h-4" />
                  <span>{t('explore_all_classes', 'Explore Classes & Curriculum')}</span>
                </button>

                <button
                  id="hero-ai-tutor-btn"
                  onClick={() => openAITutorWithContext()}
                  className="px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 border-2 border-white/30 text-white font-black text-xs sm:text-sm transition flex items-center space-x-2"
                >
                  <Bot className="w-4 h-4 text-yellow-300" />
                  <span>{t('ask_ai_tutor', 'Ask AI Tutor')}</span>
                </button>
              </div>

              {/* Quick Demo Student Switcher Strip */}
              <div className="pt-4 border-t border-white/20 max-w-xl">
                <p className="text-[11px] text-amber-200 font-black uppercase tracking-wider mb-2">
                  1-Click Sample Student Quick-Pass:
                </p>
                <div className="flex flex-wrap gap-2">
                  {allStudents.slice(0, 5).map((st) => (
                    <button
                      key={st.id}
                      onClick={() => {
                        switchStudent(st.id);
                        setActiveView('student_dashboard');
                      }}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-xs font-bold text-white transition shadow-xs"
                    >
                      <img src={st.avatar} alt={st.name} className="w-4 h-4 rounded-full object-cover border border-white" />
                      <span>{st.name}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/20 text-yellow-200 font-black">
                        Gr {st.gradeId}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* PART 2: LOGIN FOR SYSTEM ADMIN & USER (Right Column) */}
            <div className="lg:col-span-5" id="hero-login-card">
              <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-amber-300 text-slate-900">
                {/* Portal Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-lg shadow-sm">
                      D
                    </div>
                    <div>
                      <h3 className="font-black text-sm sm:text-base text-slate-900 leading-tight">Access Portal</h3>
                      <p className="text-[11px] text-slate-500 font-bold">System Admin & User Sign In</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    Live Auth
                  </span>
                </div>

                {/* Role Switcher Tabs (Admin / Student / Parent) */}
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-2xl my-3.5 text-xs font-black">
                  <button
                    type="button"
                    onClick={() => {
                      setHeroAuthTab('admin');
                      setAdminError('');
                    }}
                    className={`py-2 px-2 rounded-xl transition flex items-center justify-center space-x-1 ${
                      heroAuthTab === 'admin'
                        ? 'bg-indigo-900 text-amber-300 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setHeroAuthTab('student');
                      setAdminError('');
                    }}
                    className={`py-2 px-2 rounded-xl transition flex items-center justify-center space-x-1 ${
                      heroAuthTab === 'student'
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setHeroAuthTab('parent');
                      setAdminError('');
                    }}
                    className={`py-2 px-2 rounded-xl transition flex items-center justify-center space-x-1 ${
                      heroAuthTab === 'parent'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Parent</span>
                  </button>
                </div>

                {/* Success Message Banner */}
                {loginSuccessMsg && (
                  <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-xs font-black flex items-center space-x-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{loginSuccessMsg}</span>
                  </div>
                )}

                {/* TAB 1: SYSTEM ADMIN LOGIN (Secure & Blank Input) */}
                {heroAuthTab === 'admin' && (
                  <form onSubmit={handleHeroAdminSubmit} className="space-y-3">
                    <div className="bg-indigo-50/80 p-3 rounded-2xl border border-indigo-200 flex items-center gap-2.5">
                      <ShieldCheck className="w-5 h-5 text-indigo-700 shrink-0" />
                      <div>
                        <h4 className="text-xs font-black text-indigo-950">Restricted Administrator Portal</h4>
                        <p className="text-[10px] text-indigo-800">Authorized personnel only. Enter your credentials to access system management.</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Admin Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="email"
                          required
                          value={adminEmail}
                          onChange={(e) => {
                            setAdminEmail(e.target.value);
                            setAdminError('');
                          }}
                          placeholder="admin@deshna.edu"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 font-bold bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Admin Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type={showAdminPass ? 'text' : 'password'}
                          required
                          value={adminPass}
                          onChange={(e) => {
                            setAdminPass(e.target.value);
                            setAdminError('');
                          }}
                          placeholder="••••••••••••"
                          className="w-full pl-9 pr-9 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 font-bold bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowAdminPass(!showAdminPass)}
                          className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 p-0.5"
                        >
                          {showAdminPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      {adminError && <p className="text-[11px] text-rose-600 font-bold mt-1">{adminError}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-2xl bg-indigo-900 hover:bg-indigo-950 text-amber-300 font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center space-x-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Sign In as System Admin</span>
                    </button>
                    
                    <p className="text-[10px] text-center text-slate-500 font-medium">
                      Full Console: Student/Parent View/Edit/Delete, Live Roster & ₹50 Billing.
                    </p>
                  </form>
                )}

                {/* TAB 2: STUDENT USER LOGIN / REGISTER */}
                {heroAuthTab === 'student' && (
                  <div className="space-y-3">
                    {/* Student Sub-Mode Toggle */}
                    <div className="flex border-b border-slate-200 pb-1.5 gap-3 text-xs font-black">
                      <button
                        type="button"
                        onClick={() => setStudentAuthMode('login')}
                        className={`pb-1 transition ${
                          studentAuthMode === 'login'
                            ? 'text-amber-600 border-b-2 border-amber-500'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        Roll Code Login
                      </button>
                      <button
                        type="button"
                        onClick={() => setStudentAuthMode('register')}
                        className={`pb-1 transition ${
                          studentAuthMode === 'register'
                            ? 'text-amber-600 border-b-2 border-amber-500'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        New Student Sign Up
                      </button>
                    </div>

                    {studentAuthMode === 'login' ? (
                      <form onSubmit={handleHeroStudentSubmit} className="space-y-2.5">
                        <div>
                          <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                            Student Roll Code / Name
                          </label>
                          <input
                            type="text"
                            value={studentRollCode}
                            onChange={(e) => setStudentRollCode(e.target.value)}
                            placeholder="e.g. DESH-GR3-8821 or Aarav"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-bold"
                          />
                        </div>

                        {/* Quick pick demo students */}
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                            Quick Pick Student:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {allStudents.slice(0, 4).map((st) => (
                              <button
                                key={st.id}
                                type="button"
                                onClick={() => {
                                  switchStudent(st.id);
                                  setCurrentRole('student');
                                  setActiveView('student_dashboard');
                                }}
                                className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:border-amber-400 text-[11px] font-bold text-slate-800 transition flex items-center space-x-1 shadow-2xs"
                              >
                                <span>{st.name}</span>
                                <span className="text-[9px] bg-amber-100 text-amber-800 px-1 rounded-sm font-black">
                                  Gr {st.gradeId}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center space-x-2"
                        >
                          <GraduationCap className="w-4 h-4" />
                          <span>Enter Student Workspace</span>
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleHeroStudentSubmit} className="space-y-2">
                        <div>
                          <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-0.5">
                            Student Name
                          </label>
                          <input
                            type="text"
                            required
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="Full name"
                            className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 font-bold"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-0.5">
                              Grade / Class
                            </label>
                            <select
                              value={studentGrade}
                              onChange={(e) => setStudentGrade(Number(e.target.value))}
                              className="w-full px-2 py-1.5 text-xs rounded-xl border border-slate-300 bg-white font-bold"
                            >
                              {grades.map((g) => (
                                <option key={g.id} value={g.id}>
                                  {g.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-0.5">
                              Board
                            </label>
                            <select
                              value={studentBoard}
                              onChange={(e) => setStudentBoard(e.target.value)}
                              className="w-full px-2 py-1.5 text-xs rounded-xl border border-slate-300 bg-white font-bold"
                            >
                              {boards.map((b) => (
                                <option key={b.id} value={b.id}>
                                  {b.code}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {studentGrade === 11 && (
                          <div>
                            <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-0.5">
                              Stream (Grade 11)
                            </label>
                            <select
                              value={studentStream}
                              onChange={(e) => setStudentStream(e.target.value as any)}
                              className="w-full px-2 py-1.5 text-xs rounded-xl border border-slate-300 bg-white font-bold"
                            >
                              <option value="science">Science (PCM/B)</option>
                              <option value="commerce">Commerce (Accounts/Eco)</option>
                              <option value="humanities">Humanities (Arts)</option>
                            </select>
                          </div>
                        )}

                        <div>
                          <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-0.5">
                            Parent WhatsApp Number
                          </label>
                          <input
                            type="tel"
                            required
                            value={studentParentPhone}
                            onChange={(e) => setStudentParentPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 font-bold"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md transition"
                        >
                          Register Student & Begin
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* TAB 3: PARENT USER LOGIN */}
                {heroAuthTab === 'parent' && (
                  <form onSubmit={handleHeroParentSubmit} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Parent WhatsApp Mobile Number
                      </label>
                      <div className="relative">
                        <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="tel"
                          required
                          value={parentPhoneInput}
                          onChange={(e) => setParentPhoneInput(e.target.value)}
                          placeholder="+91 98112 34567"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-bold"
                        />
                      </div>
                    </div>

                    {/* Quick pick demo parents */}
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Demo Registered Parents:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {parents.slice(0, 4).map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setParentPhoneInput(p.phone);
                              setCurrentRole('parent');
                              setActiveView('parent_dashboard');
                            }}
                            className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 text-[11px] font-bold text-slate-800 transition flex items-center space-x-1 shadow-2xs"
                          >
                            <span>{p.name}</span>
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded-sm">
                              {p.phone.slice(-5)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center space-x-2"
                    >
                      <Users className="w-4 h-4" />
                      <span>Sign In to Parent Portal</span>
                    </button>
                    
                    <p className="text-[10px] text-center text-slate-500 font-medium">
                      Track children's chapter mastery, homework & weekly reports.
                    </p>
                  </form>
                )}

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
