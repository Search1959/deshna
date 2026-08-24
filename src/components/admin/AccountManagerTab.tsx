import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudentProfile, ParentAccount } from '../../types';
import {
  Users,
  GraduationCap,
  Search,
  Filter,
  Plus,
  Eye,
  Edit3,
  Trash2,
  Phone,
  MessageSquare,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ViewAccountModal, EditAccountModal, WhatsAppPreviewModal } from './AccountModals';

export const AccountManagerTab: React.FC = () => {
  const {
    allStudents,
    parents,
    deleteStudent,
    deleteParent,
    addSubscriptionFee,
    openLoginModal,
    grades,
    boards,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'students' | 'parents'>('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [gradeFilter, setGradeFilter] = useState<number | 'all'>('all');
  const [boardFilter, setBoardFilter] = useState<string | 'all'>('all');

  // Modal Triggers
  const [viewModalState, setViewModalState] = useState<{ isOpen: boolean; type: 'student' | 'parent'; id: string | null }>({
    isOpen: false,
    type: 'student',
    id: null,
  });

  const [editModalState, setEditModalState] = useState<{ isOpen: boolean; type: 'student' | 'parent'; id: string | null }>({
    isOpen: false,
    type: 'student',
    id: null,
  });

  const [whatsappModalState, setWhatsappModalState] = useState<{ isOpen: boolean; id: string | null }>({
    isOpen: false,
    id: null,
  });

  // Filtered Students
  const filteredStudents = allStudents.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.parentPhone?.includes(searchQuery) ||
      s.parentName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'new'
        ? s.isNew
        : s.subscriptionStatus === statusFilter;

    const matchesGrade = gradeFilter === 'all' || s.gradeId === gradeFilter;
    const matchesBoard = boardFilter === 'all' || s.boardId === boardFilter;

    return matchesSearch && matchesStatus && matchesGrade && matchesBoard;
  });

  // Filtered Parents
  const filteredParents = parents.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery) ||
      p.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'new'
        ? p.isNew
        : p.subscriptionStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Delete Handlers with Confirmation
  const handleDeleteStudent = (student: StudentProfile) => {
    if (window.confirm(`Are you sure you want to delete student profile "${student.name}" (Roll Code: ${student.studentCode})?`)) {
      deleteStudent(student.id);
    }
  };

  const handleDeleteParent = (parent: ParentAccount) => {
    if (window.confirm(`Are you sure you want to delete parent account "${parent.name}" (${parent.phone})?`)) {
      deleteParent(parent.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Metrics */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white border-4 border-indigo-400 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-black">Student & Parent Account Administration</h2>
            </div>
            <p className="text-xs text-indigo-200">
              Master control panel to manage, edit, view, delete, and invoice all student learners and parents.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openLoginModal('student')}
              className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Student</span>
            </button>
            <button
              onClick={() => openLoginModal('parent')}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md transition flex items-center gap-1.5 border border-indigo-400"
            >
              <Users className="w-4 h-4" />
              <span>+ Add Parent</span>
            </button>
          </div>
        </div>

        {/* Quick Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-wider">Total Students</p>
            <p className="text-2xl font-black text-amber-300">{allStudents.length}</p>
          </div>
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-wider">Total Parents</p>
            <p className="text-2xl font-black text-white">{parents.length}</p>
          </div>
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-wider">New Registrations</p>
            <p className="text-2xl font-black text-emerald-400">
              {allStudents.filter((s) => s.isNew).length + parents.filter((p) => p.isNew).length}
            </p>
          </div>
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-wider">Pending ₹50 Due</p>
            <p className="text-2xl font-black text-rose-400">
              {allStudents.filter((s) => (s.balanceDue || 0) > 0).length}
            </p>
          </div>
        </div>
      </div>

      {/* Main Switcher & Filters */}
      <div className="bg-white p-5 rounded-3xl border-4 border-amber-300 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          {/* Sub-tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
            <button
              onClick={() => setActiveSubTab('students')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black transition ${
                activeSubTab === 'students'
                  ? 'bg-amber-400 text-slate-900 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-slate-900" />
              <span>Student Accounts ({allStudents.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab('parents')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black transition ${
                activeSubTab === 'parents'
                  ? 'bg-amber-400 text-slate-900 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4 text-slate-900" />
              <span>Parent Accounts ({parents.length})</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeSubTab === 'students'
                  ? 'Search by Name, Roll Code, WhatsApp Phone...'
                  : 'Search by Parent Name, WhatsApp Number...'
              }
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 font-bold focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filters:
          </span>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-700"
          >
            <option value="all">All Subscription Statuses</option>
            <option value="active">Active (Paid)</option>
            <option value="pending">Pending (₹50 Due)</option>
            <option value="overdue">Overdue</option>
            <option value="new">Newly Registered</option>
          </select>

          {activeSubTab === 'students' && (
            <>
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-700"
              >
                <option value="all">All Grades (1 to 11)</option>
                {grades.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>

              <select
                value={boardFilter}
                onChange={(e) => setBoardFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-700"
              >
                <option value="all">All Boards</option>
                {boards.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </>
          )}

          {(searchQuery || statusFilter !== 'all' || gradeFilter !== 'all' || boardFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setGradeFilter('all');
                setBoardFilter('all');
              }}
              className="text-xs font-bold text-rose-600 hover:underline px-2"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Account Tables */}
      {activeSubTab === 'students' ? (
        <div className="bg-white rounded-3xl border-4 border-slate-200 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider text-[11px] border-b border-slate-200">
                  <th className="py-3.5 px-4">Student Profile</th>
                  <th className="py-3.5 px-3">Grade & Board</th>
                  <th className="py-3.5 px-3">Guardian / WhatsApp</th>
                  <th className="py-3.5 px-3">Subscription</th>
                  <th className="py-3.5 px-3">Due / Paid</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 font-bold">
                      No student accounts found matching your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-amber-50/40 transition">
                      {/* Name & Avatar */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={st.avatar}
                            alt={st.name}
                            className="w-10 h-10 rounded-2xl object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-black text-slate-900 text-sm">{st.name}</span>
                              {st.isNew && (
                                <span className="px-1.5 py-0.2 bg-rose-500 text-white font-black text-[9px] rounded-full animate-pulse">
                                  NEW
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] font-mono text-indigo-700 font-bold">
                              {st.studentCode || 'DESH-2026-000'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Class */}
                      <td className="py-3 px-3">
                        <span className="font-black text-slate-800">Grade {st.gradeId}</span>
                        <p className="text-[10px] text-slate-500 font-bold uppercase">
                          {st.boardId} {st.streamId ? `• ${st.streamId}` : ''}
                        </p>
                      </td>

                      {/* Parent Phone */}
                      <td className="py-3 px-3">
                        <p className="font-bold text-slate-800">{st.parentName || 'Parent'}</p>
                        <p className="text-[11px] text-emerald-700 font-mono flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" />
                          {st.parentPhone || 'N/A'}
                        </p>
                      </td>

                      {/* Subscription Status */}
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            st.subscriptionStatus === 'active'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : st.subscriptionStatus === 'overdue'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {st.subscriptionStatus || 'Pending'}
                        </span>
                      </td>

                      {/* Balance / Paid */}
                      <td className="py-3 px-3">
                        <span className="font-black text-rose-600">₹{st.balanceDue || 0}</span>
                        <p className="text-[10px] text-slate-400 font-medium">Paid: ₹{st.totalPaid || 0}</p>
                      </td>

                      {/* Action Buttons: View, Edit, Delete, Fee, WhatsApp */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          {/* VIEW BUTTON */}
                          <button
                            id={`btn-view-student-${st.id}`}
                            onClick={() => setViewModalState({ isOpen: true, type: 'student', id: st.id })}
                            className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition"
                            title="View Complete Student Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* EDIT BUTTON */}
                          <button
                            id={`btn-edit-student-${st.id}`}
                            onClick={() => setEditModalState({ isOpen: true, type: 'student', id: st.id })}
                            className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 transition"
                            title="Edit Student Account"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* ADD 50 INR FEE */}
                          <button
                            id={`btn-addfee-student-${st.id}`}
                            onClick={() => {
                              addSubscriptionFee(st.id, 50);
                              alert(`Added ₹50 INR monthly subscription invoice for ${st.name}!`);
                            }}
                            className="px-2 py-1 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[11px] transition shadow-xs flex items-center gap-1"
                            title="Add ₹50 INR Subscription Fee"
                          >
                            <span>+₹50</span>
                          </button>

                          {/* WHATSAPP REMINDER */}
                          <button
                            id={`btn-whatsapp-student-${st.id}`}
                            onClick={() => setWhatsappModalState({ isOpen: true, id: st.id })}
                            className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                            title="Send WhatsApp Subscription Reminder"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>

                          {/* DELETE BUTTON */}
                          <button
                            id={`btn-delete-student-${st.id}`}
                            onClick={() => handleDeleteStudent(st)}
                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                            title="Delete Student Account"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border-4 border-slate-200 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider text-[11px] border-b border-slate-200">
                  <th className="py-3.5 px-4">Parent Name</th>
                  <th className="py-3.5 px-3">WhatsApp Number</th>
                  <th className="py-3.5 px-3">Linked Children</th>
                  <th className="py-3.5 px-3">Plan Status</th>
                  <th className="py-3.5 px-3">Balance Due</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredParents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 font-bold">
                      No parent accounts found matching your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredParents.map((pt) => (
                    <tr key={pt.id} className="hover:bg-amber-50/40 transition">
                      {/* Parent Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-800 font-black flex items-center justify-center text-sm">
                            {pt.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-black text-slate-900 text-sm">{pt.name}</span>
                              {pt.isNew && (
                                <span className="px-1.5 py-0.2 bg-rose-500 text-white font-black text-[9px] rounded-full animate-pulse">
                                  NEW
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium capitalize">{pt.relationship}</p>
                          </div>
                        </div>
                      </td>

                      {/* WhatsApp Phone */}
                      <td className="py-3 px-3">
                        <p className="font-bold text-emerald-800 font-mono flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          {pt.phone}
                        </p>
                      </td>

                      {/* Linked Children */}
                      <td className="py-3 px-3">
                        <span className="font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full text-xs">
                          {pt.linkedStudentIds.length} Child(ren)
                        </span>
                      </td>

                      {/* Subscription Status */}
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            pt.subscriptionStatus === 'active'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {pt.subscriptionStatus}
                        </span>
                      </td>

                      {/* Balance Due */}
                      <td className="py-3 px-3">
                        <span className="font-black text-rose-600 text-sm">₹{pt.balanceDue || 0}</span>
                      </td>

                      {/* Action Buttons: View, Edit, Delete, WhatsApp */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            id={`btn-view-parent-${pt.id}`}
                            onClick={() => setViewModalState({ isOpen: true, type: 'parent', id: pt.id })}
                            className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition"
                            title="View Parent Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            id={`btn-edit-parent-${pt.id}`}
                            onClick={() => setEditModalState({ isOpen: true, type: 'parent', id: pt.id })}
                            className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 transition"
                            title="Edit Parent Account"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            id={`btn-whatsapp-parent-${pt.id}`}
                            onClick={() => setWhatsappModalState({ isOpen: true, id: pt.id })}
                            className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                            title="Send WhatsApp Subscription Reminder"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>

                          <button
                            id={`btn-delete-parent-${pt.id}`}
                            onClick={() => handleDeleteParent(pt)}
                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                            title="Delete Parent Account"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Account Modals */}
      <ViewAccountModal
        isOpen={viewModalState.isOpen}
        onClose={() => setViewModalState({ isOpen: false, type: 'student', id: null })}
        accountType={viewModalState.type}
        accountId={viewModalState.id}
      />

      <EditAccountModal
        isOpen={editModalState.isOpen}
        onClose={() => setEditModalState({ isOpen: false, type: 'student', id: null })}
        accountType={editModalState.type}
        accountId={editModalState.id}
      />

      <WhatsAppPreviewModal
        isOpen={whatsappModalState.isOpen}
        onClose={() => setWhatsappModalState({ isOpen: false, id: null })}
        targetId={whatsappModalState.id}
      />
    </div>
  );
};
