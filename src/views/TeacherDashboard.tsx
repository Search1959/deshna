import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Users,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  Search,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TeacherDashboard: React.FC = () => {
  const { allStudents, switchStudent, setActiveView } = useApp();

  const [selectedClassGrade, setSelectedClassGrade] = useState(3);
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentSubject, setAssignmentSubject] = useState('Mathematics');
  const [assignmentTopic, setAssignmentTopic] = useState('Fractions & Equivalents');
  const [assignmentDueDate, setAssignmentDueDate] = useState('Friday, 5:00 PM');
  const [createdAssignments, setCreatedAssignments] = useState<any[]>([
    {
      id: 'asg-1',
      title: 'Practice Equivalent Fraction Shapes',
      subject: 'Mathematics',
      topic: 'Fractions',
      grade: 3,
      dueDate: 'Tomorrow',
      completedCount: 18,
      totalCount: 24,
    },
    {
      id: 'asg-2',
      title: 'Photosynthesis Leaf Experiment Reading',
      subject: 'Science',
      topic: 'Plant Nutrition',
      grade: 5,
      dueDate: 'Friday',
      completedCount: 22,
      totalCount: 25,
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentTitle) return;

    const newAsg = {
      id: `asg-${Date.now()}`,
      title: assignmentTitle,
      subject: assignmentSubject,
      topic: assignmentTopic,
      grade: selectedClassGrade,
      dueDate: assignmentDueDate,
      completedCount: 0,
      totalCount: allStudents.length,
    };

    setCreatedAssignments([newAsg, ...createdAssignments]);
    setAssignmentTitle('');
    setShowCreateModal(false);

    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#D97706] via-[#B45309] to-[#78350F] rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl border-b-6 sm:border-b-8 border-[#92400E] relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-yellow-300 border border-white/30">
              Educator & Mentor Console
            </span>
            <h1 className="text-xl sm:text-4xl font-black tracking-tight">
              Teacher Class Management
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 font-bold">
              Track student mastery rosters across Grade 1 to 11, assign adaptive homework modules, and diagnose
              concept gaps before exams.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3.5 bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-black text-xs rounded-xl sm:rounded-2xl shadow-lg border-2 border-[#D97706] transition flex items-center justify-center space-x-2 shrink-0 min-h-[42px]"
          >
            <Plus className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>
        </div>
      </div>

      {/* Class Rosters & Student Mastery Cards */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#FBBF24] shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b-2 border-amber-100 gap-3">
          <div>
            <h2 className="text-xl font-black text-[#1F2937]">Student Progress Roster</h2>
            <p className="text-xs text-slate-600 font-bold">Live mastery telemetry and homework completion status</p>
          </div>

          {/* Grade Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black text-[#92400E]">Class:</span>
            <select
              value={selectedClassGrade}
              onChange={(e) => setSelectedClassGrade(Number(e.target.value))}
              className="px-3.5 py-1.5 text-xs font-black rounded-xl border-2 border-[#FDE68A] bg-[#FFFBEB] text-[#92400E]"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((g) => (
                <option key={g} value={g}>
                  Grade {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allStudents.map((st) => (
            <div
              key={st.id}
              className="p-5 rounded-3xl border-4 border-[#FDE68A] bg-[#FFFBEB] hover:shadow-md transition space-y-3.5"
            >
              <div className="flex items-center space-x-3">
                <img src={st.avatar} alt={st.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-[#F59E0B]" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-black text-slate-900 truncate">{st.name}</h3>
                  <p className="text-xs text-[#92400E] font-bold">
                    Grade {st.gradeId} • {st.boardId.toUpperCase()}
                  </p>
                </div>
                <span className="text-xs font-black text-[#B45309] bg-white px-2 py-1 rounded-xl border border-[#FDE68A]">🔥 {st.streakDays}d</span>
              </div>

              {/* Subject Mastery Progress */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Overall Mastery</span>
                  <span className="text-[#059669] font-black">78%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FEF3C7] border border-[#FDE68A] overflow-hidden">
                  <div className="h-full bg-[#10B981] rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t-2 border-amber-100 text-xs">
                <span className="text-[11px] text-slate-500 font-medium">Active {st.lastActive}</span>
                <button
                  onClick={() => {
                    switchStudent(st.id);
                    setActiveView('student_dashboard');
                  }}
                  className="font-black text-[#D97706] hover:text-[#B45309] flex items-center space-x-1"
                >
                  <span>View Student Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Assignments Listing */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-[#FBBF24] shadow-lg space-y-6">
        <div className="flex items-center justify-between pb-4 border-b-2 border-amber-100">
          <div>
            <h2 className="text-xl font-black text-[#1F2937]">Active Classroom Assignments</h2>
            <p className="text-xs text-slate-600 font-bold">Scheduled homework and practice tasks</p>
          </div>
        </div>

        <div className="space-y-3">
          {createdAssignments.map((asg) => (
            <div
              key={asg.id}
              className="p-5 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-xl bg-white text-[#92400E] border border-[#FDE68A]">
                    Grade {asg.grade} • {asg.subject}
                  </span>
                  <span className="text-[10px] text-slate-600 font-bold">Due: {asg.dueDate}</span>
                </div>
                <h3 className="text-sm font-black text-slate-900">{asg.title}</h3>
                <p className="text-xs text-slate-600 font-medium">Topic: {asg.topic}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <span className="text-xs font-black text-slate-900">
                    {asg.completedCount} / {asg.totalCount} Done
                  </span>
                  <div className="w-28 h-2 rounded-full bg-[#FEF3C7] border border-[#FDE68A] overflow-hidden mt-1">
                    <div
                      className="h-full bg-[#10B981] rounded-full"
                      style={{ width: `${(asg.completedCount / asg.totalCount) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assignment Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Create New Student Assignment</h3>
            <form onSubmit={handleCreateAssignment} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Assignment Title</label>
                <input
                  type="text"
                  required
                  value={assignmentTitle}
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                  placeholder="e.g. Chapter 4 Practice Exercises"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Subject</label>
                  <select
                    value={assignmentSubject}
                    onChange={(e) => setAssignmentSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="Social Studies">Social Studies</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Due Date</label>
                  <input
                    type="text"
                    value={assignmentDueDate}
                    onChange={(e) => setAssignmentDueDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold shadow-xs"
                >
                  Assign to Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
