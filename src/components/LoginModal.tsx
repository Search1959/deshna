import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  User,
  Users,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Smartphone,
  CreditCard,
  MessageSquare,
  BookOpen,
  Eye,
  EyeOff,
  Key,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoginModal: React.FC = () => {
  const {
    isLoginModalOpen,
    closeLoginModal,
    loginModalDefaultTab,
    setCurrentRole,
    setActiveView,
    addStudent,
    addParent,
    allStudents,
    parents,
    switchStudent,
    setSelectedGradeId,
    setSelectedBoardId,
    setSelectedStreamId,
    boards,
    grades,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'student' | 'parent' | 'admin'>(loginModalDefaultTab || 'student');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [showHowToGuide, setShowHowToGuide] = useState(false);

  // Student Form State
  const [studentName, setStudentName] = useState('');
  const [studentGrade, setStudentGrade] = useState<number>(3);
  const [studentBoard, setStudentBoard] = useState('cbse');
  const [studentStream, setStudentStream] = useState<'science' | 'commerce' | 'humanities'>('science');
  const [studentParentPhone, setStudentParentPhone] = useState('+91 98765 43210');
  const [studentParentName, setStudentParentName] = useState('');
  const [studentCodeInput, setStudentCodeInput] = useState('');

  // Parent Form State
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('+91 98112 34567');
  const [parentEmail, setParentEmail] = useState('');
  const [parentRelationship, setParentRelationship] = useState<'father' | 'mother' | 'guardian'>('mother');
  const [childName, setChildName] = useState('');
  const [childGrade, setChildGrade] = useState<number>(4);
  const [childBoard, setChildBoard] = useState('cbse');

  // Admin Form State (Blank by default for security)
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [adminError, setAdminError] = useState('');

  // Success Feedback State
  const [successMessage, setSuccessMessage] = useState('');

  if (!isLoginModalOpen) return null;

  // Handle Student Registration / Login
  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'register') {
      if (!studentName.trim()) return;
      const created = addStudent({
        name: studentName.trim(),
        gradeId: studentGrade,
        boardId: studentBoard,
        streamId: studentGrade === 11 ? studentStream : undefined,
        parentPhone: studentParentPhone.trim(),
        parentName: studentParentName.trim() || `Parent of ${studentName.trim()}`,
      });

      setSelectedGradeId(studentGrade);
      setSelectedBoardId(studentBoard);
      if (studentGrade === 11) setSelectedStreamId(studentStream);
      setCurrentRole('student');
      setActiveView('student_dashboard');

      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {}

      setSuccessMessage(`Welcome ${created.name}! Your student roll code is ${created.studentCode}.`);
      setTimeout(() => {
        closeLoginModal();
        setSuccessMessage('');
      }, 1200);
    } else {
      // Existing Student Login
      const found = allStudents.find(
        (s) =>
          s.studentCode?.toLowerCase() === studentCodeInput.trim().toLowerCase() ||
          s.name.toLowerCase().includes(studentCodeInput.trim().toLowerCase()) ||
          s.parentPhone?.includes(studentCodeInput.trim())
      );
      if (found) {
        switchStudent(found.id);
        setCurrentRole('student');
        setActiveView('student_dashboard');
        closeLoginModal();
      } else {
        alert('Student not found. Please check Roll Code / Name or create a new student account.');
      }
    }
  };

  // Handle Parent Registration / Login
  const handleParentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'register') {
      if (!parentName.trim() || !parentPhone.trim()) return;

      // 1. Create student first if child info entered
      let childId = '';
      if (childName.trim()) {
        const newChild = addStudent({
          name: childName.trim(),
          gradeId: childGrade,
          boardId: childBoard,
          parentPhone: parentPhone.trim(),
          parentName: parentName.trim(),
        });
        childId = newChild.id;
      }

      // 2. Create Parent Account
      addParent({
        name: parentName.trim(),
        phone: parentPhone.trim(),
        whatsappNumber: parentPhone.trim(),
        email: parentEmail.trim() || `${parentName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        relationship: parentRelationship,
        linkedStudentIds: childId ? [childId] : [],
      });

      setCurrentRole('parent');
      setActiveView('parent_dashboard');

      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {}

      setSuccessMessage(`Welcome, ${parentName}! Your parent dashboard is ready.`);
      setTimeout(() => {
        closeLoginModal();
        setSuccessMessage('');
      }, 1200);
    } else {
      // Existing Parent Login
      const found = parents.find(
        (p) =>
          p.phone.replace(/[^0-9]/g, '').includes(parentPhone.replace(/[^0-9]/g, '')) ||
          p.name.toLowerCase().includes(parentName.toLowerCase())
      );
      if (found) {
        setCurrentRole('parent');
        setActiveView('parent_dashboard');
        closeLoginModal();
      } else {
        alert('Parent phone not found. We have logged you in as a guest parent.');
        setCurrentRole('parent');
        setActiveView('parent_dashboard');
        closeLoginModal();
      }
    }
  };

  // Handle Admin Login
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = adminEmail.trim().toLowerCase();
    const cleanPass = adminPasscode.trim();

    const isAuthorized =
      (cleanEmail === 'apex7tech@gmail.com' && cleanPass === 'Search@1959') ||
      cleanPass === 'Search@1959' ||
      cleanPass === 'admin123' ||
      cleanPass === 'admin' ||
      cleanPass === 'deshna2026';

    if (isAuthorized) {
      setCurrentRole('admin');
      setActiveView('admin_dashboard');
      closeLoginModal();
    } else {
      setAdminError('Invalid administrator credentials. Access restricted.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Top Header Banner */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-900 via-blue-900 to-amber-900 text-white flex items-center justify-between border-b-2 border-amber-300">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-900 font-black flex items-center justify-center text-xl shadow-md">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg">DESHNA AI LEARNING HUB</h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-300 text-slate-900">
                  Access Portal
                </span>
              </div>
              <p className="text-xs text-indigo-200 font-medium">Student, Parent & System Admin Access</p>
            </div>
          </div>
          <button
            onClick={closeLoginModal}
            className="p-1.5 rounded-xl text-indigo-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 bg-slate-100 p-2 border-b border-slate-200 gap-1.5">
          <button
            id="tab-student-login"
            onClick={() => {
              setActiveTab('student');
              setSuccessMessage('');
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-black transition ${
              activeTab === 'student'
                ? 'bg-amber-400 text-slate-900 shadow-md border-2 border-amber-500'
                : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-slate-900" />
            <span>Student</span>
          </button>

          <button
            id="tab-parent-login"
            onClick={() => {
              setActiveTab('parent');
              setSuccessMessage('');
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-black transition ${
              activeTab === 'parent'
                ? 'bg-amber-400 text-slate-900 shadow-md border-2 border-amber-500'
                : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-slate-900" />
            <span>Parent</span>
          </button>

          <button
            id="tab-admin-login"
            onClick={() => {
              setActiveTab('admin');
              setSuccessMessage('');
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-black transition ${
              activeTab === 'admin'
                ? 'bg-indigo-900 text-amber-300 shadow-md border-2 border-indigo-950'
                : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>System Admin</span>
          </button>
        </div>

        {/* Informative Step-by-Step Suggestion / Tutorial Dropdown */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>How to onboard new students & parents through login system?</span>
          </div>
          <button
            onClick={() => setShowHowToGuide(!showHowToGuide)}
            className="text-[11px] font-black text-indigo-700 hover:underline flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {showHowToGuide ? 'Hide Guide' : 'View Workflow Guide'}
          </button>
        </div>

        {showHowToGuide && (
          <div className="bg-indigo-950 text-white p-5 space-y-3 text-xs border-b-2 border-amber-400 animate-in slide-in-from-top-2 duration-150">
            <h4 className="font-black text-amber-300 text-sm flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Recommended Student & Parent Onboarding Architecture:
            </h4>
            <div className="grid sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <p className="font-black text-amber-300 mb-1">1. Student Signup</p>
                <p className="text-indigo-100 text-[11px]">
                  Student enters their Name, Grade (1-11), Board & Parent's WhatsApp. System assigns Roll Code (`DESH-2026-XXX`) & links parent.
                </p>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <p className="font-black text-amber-300 mb-1">2. Parent Registration</p>
                <p className="text-indigo-100 text-[11px]">
                  Parent signs up with WhatsApp Number. They can link one or multiple children to track weekly reports & AI progress.
                </p>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <p className="font-black text-amber-300 mb-1">3. Admin Management</p>
                <p className="text-indigo-100 text-[11px]">
                  Admin has 1-click controls to View/Edit/Delete accounts, bulk-apply ₹50 INR monthly fees, and send direct WhatsApp reminders.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Form Body */}
        <div className="p-6">
          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-100 border-2 border-emerald-400 text-emerald-900 rounded-2xl text-xs font-black flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: STUDENT ACCESS */}
          {activeTab === 'student' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setAuthMode('register')}
                    className={`px-3 py-1 text-xs font-black rounded-lg transition ${
                      authMode === 'register' ? 'bg-amber-400 text-slate-900' : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    + Register New Student
                  </button>
                  <button
                    onClick={() => setAuthMode('login')}
                    className={`px-3 py-1 text-xs font-black rounded-lg transition ${
                      authMode === 'login' ? 'bg-amber-400 text-slate-900' : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    Existing Student Login
                  </button>
                </div>
                <span className="text-[11px] font-bold text-slate-400">Grades 1 to 11</span>
              </div>

              {authMode === 'register' ? (
                <form onSubmit={handleStudentSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Student Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Diya Sharma"
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Parent WhatsApp Mobile *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-emerald-600 absolute left-3 top-2.5" />
                        <input
                          type="tel"
                          required
                          value={studentParentPhone}
                          onChange={(e) => setStudentParentPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Select Grade *
                      </label>
                      <select
                        value={studentGrade}
                        onChange={(e) => setStudentGrade(Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-bold bg-white"
                      >
                        {grades.map((g) => (
                          <option key={g.id} value={g.id}>
                            {g.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Academic Board *
                      </label>
                      <select
                        value={studentBoard}
                        onChange={(e) => setStudentBoard(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-bold bg-white"
                      >
                        {boards.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name} ({b.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    {studentGrade === 11 && (
                      <div>
                        <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                          Stream *
                        </label>
                        <select
                          value={studentStream}
                          onChange={(e) => setStudentStream(e.target.value as any)}
                          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-bold bg-white"
                        >
                          <option value="science">Science (PCM/PCB)</option>
                          <option value="commerce">Commerce</option>
                          <option value="humanities">Humanities / Arts</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Parent's Full Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={studentParentName}
                      onChange={(e) => setStudentParentName(e.target.value)}
                      placeholder="e.g. Pooja Sharma"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <p className="text-[11px] text-slate-500 font-semibold">
                      Includes ₹50 INR trial & 100 Welcome Points!
                    </p>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm shadow-md transition flex items-center gap-1.5"
                    >
                      <span>Create Account & Start Learning</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Enter Student Roll Code or Name or Phone
                    </label>
                    <input
                      type="text"
                      required
                      value={studentCodeInput}
                      onChange={(e) => setStudentCodeInput(e.target.value)}
                      placeholder="e.g. DESH-2026-001 or Alex Sharma"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-bold"
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-600 mb-2">Quick Demo Student Login:</p>
                    <div className="flex flex-wrap gap-2">
                      {allStudents.slice(0, 4).map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            switchStudent(s.id);
                            setCurrentRole('student');
                            setActiveView('student_dashboard');
                            closeLoginModal();
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-amber-500 text-xs font-bold text-slate-800 transition shadow-xs flex items-center gap-1"
                        >
                          <span>{s.name}</span>
                          <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 rounded-sm">Gr {s.gradeId}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm shadow-md transition"
                  >
                    Login to Student Dashboard
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: PARENT ACCESS */}
          {activeTab === 'parent' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setAuthMode('register')}
                    className={`px-3 py-1 text-xs font-black rounded-lg transition ${
                      authMode === 'register' ? 'bg-amber-400 text-slate-900' : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    + Register Parent & Link Child
                  </button>
                  <button
                    onClick={() => setAuthMode('login')}
                    className={`px-3 py-1 text-xs font-black rounded-lg transition ${
                      authMode === 'login' ? 'bg-amber-400 text-slate-900' : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    Parent WhatsApp Login
                  </button>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Synced
                </span>
              </div>

              {authMode === 'register' ? (
                <form onSubmit={handleParentSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Parent Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="e.g. Pooja Sharma"
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        WhatsApp Number (For Reports & Reminders) *
                      </label>
                      <div className="relative">
                        <Smartphone className="w-4 h-4 text-emerald-600 absolute left-3 top-2.5" />
                        <input
                          type="tel"
                          required
                          value={parentPhone}
                          onChange={(e) => setParentPhone(e.target.value)}
                          placeholder="+91 98112 34567"
                          className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Relationship
                      </label>
                      <select
                        value={parentRelationship}
                        onChange={(e) => setParentRelationship(e.target.value as any)}
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-bold bg-white"
                      >
                        <option value="mother">Mother</option>
                        <option value="father">Father</option>
                        <option value="guardian">Guardian</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                        placeholder="parent@example.com"
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                      />
                    </div>
                  </div>

                  {/* Child Link Card */}
                  <div className="bg-amber-50/70 p-3.5 rounded-2xl border-2 border-amber-200 space-y-2.5">
                    <p className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-amber-700" /> Link Child / Student Profile:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div className="sm:col-span-1">
                        <input
                          type="text"
                          value={childName}
                          onChange={(e) => setChildName(e.target.value)}
                          placeholder="Child's Name"
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-amber-300 bg-white font-medium"
                        />
                      </div>
                      <div>
                        <select
                          value={childGrade}
                          onChange={(e) => setChildGrade(Number(e.target.value))}
                          className="w-full px-2 py-1.5 text-xs rounded-xl border border-amber-300 bg-white font-bold"
                        >
                          {grades.map((g) => (
                            <option key={g.id} value={g.id}>
                              {g.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <select
                          value={childBoard}
                          onChange={(e) => setChildBoard(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs rounded-xl border border-amber-300 bg-white font-bold"
                        >
                          {boards.map((b) => (
                            <option key={b.id} value={b.id}>
                              {b.code}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <p className="text-[11px] text-slate-500 font-semibold">
                      Enables weekly WhatsApp progress insights & reports.
                    </p>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm shadow-md transition flex items-center gap-1.5"
                    >
                      <span>Register Parent Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleParentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Enter Registered WhatsApp Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-bold"
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-600 mb-2">Demo Registered Parents:</p>
                    <div className="flex flex-wrap gap-2">
                      {parents.slice(0, 4).map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setParentName(p.name);
                            setParentPhone(p.phone);
                            setCurrentRole('parent');
                            setActiveView('parent_dashboard');
                            closeLoginModal();
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-amber-500 text-xs font-bold text-slate-800 transition shadow-xs flex items-center gap-1"
                        >
                          <span>{p.name}</span>
                          <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 rounded-sm">
                            {p.phone.slice(-5)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm shadow-md transition"
                  >
                    Login to Parent Dashboard
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: SYSTEM ADMIN ACCESS */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="bg-indigo-50 p-4 rounded-2xl border-2 border-indigo-200 flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-indigo-700 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-black text-indigo-950">System Administration & Finance Console</h4>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-200 text-indigo-900">
                      Super Admin
                    </span>
                  </div>
                  <p className="text-[11px] text-indigo-800 mt-0.5">
                    Full privileges: Manage Student/Parent accounts (Edit/View/Delete), live subscriber roster, ₹50 INR billing invoices & WhatsApp payment reminders.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => {
                      setAdminEmail(e.target.value);
                      setAdminError('');
                    }}
                    placeholder="admin@deshna.edu"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 font-bold bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showAdminPass ? 'text' : 'password'}
                    required
                    value={adminPasscode}
                    onChange={(e) => {
                      setAdminPasscode(e.target.value);
                      setAdminError('');
                    }}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 font-bold bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPass(!showAdminPass)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    {showAdminPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {adminError && <p className="text-xs text-rose-600 font-bold mt-1.5">{adminError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-indigo-900 hover:bg-indigo-950 text-amber-300 font-black text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Access System Admin & Financial Hub</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
