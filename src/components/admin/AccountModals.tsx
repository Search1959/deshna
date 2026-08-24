import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { StudentProfile, ParentAccount, FinancialTransaction, SubscriptionStatus } from '../../types';
import {
  X,
  User,
  Users,
  GraduationCap,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';

interface ViewAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountType: 'student' | 'parent';
  accountId: string | null;
}

export const ViewAccountModal: React.FC<ViewAccountModalProps> = ({
  isOpen,
  onClose,
  accountType,
  accountId,
}) => {
  const { allStudents, parents, financialTransactions, sendWhatsAppReminder, addSubscriptionFee, boards, grades } = useApp();

  if (!isOpen || !accountId) return null;

  const student = accountType === 'student' ? allStudents.find((s) => s.id === accountId) : null;
  const parent = accountType === 'parent' ? parents.find((p) => p.id === accountId) : null;

  const linkedParent = student
    ? parents.find((p) => p.id === student.parentId || p.linkedStudentIds.includes(student.id))
    : null;

  const linkedStudents = parent
    ? allStudents.filter((s) => parent.linkedStudentIds.includes(s.id) || s.parentId === parent.id)
    : [];

  const userTransactions = financialTransactions.filter(
    (t) => (student && t.studentId === student.id) || (parent && t.parentId === parent.id)
  );

  const studentBoard = student ? boards.find((b) => b.id === student.boardId) : null;
  const studentGrade = student ? grades.find((g) => g.id === student.gradeId) : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border-4 border-indigo-400 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-950 to-slate-900 text-white flex items-center justify-between border-b-2 border-indigo-400">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xl shadow-md">
              {accountType === 'student' ? <GraduationCap className="w-6 h-6 text-slate-950" /> : <Users className="w-6 h-6 text-slate-950" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg">{student ? student.name : parent?.name}</h3>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  (student?.subscriptionStatus === 'active' || parent?.subscriptionStatus === 'active')
                    ? 'bg-emerald-400 text-emerald-950'
                    : 'bg-amber-400 text-amber-950'
                }`}>
                  {student?.subscriptionStatus || parent?.subscriptionStatus || 'Pending'}
                </span>
                {(student?.isNew || parent?.isNew) && (
                  <span className="text-[10px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                    NEW
                  </span>
                )}
              </div>
              <p className="text-xs text-indigo-200 font-medium">
                {accountType === 'student' ? `Roll Code: ${student?.studentCode || 'N/A'}` : `Parent A/C ID: ${parent?.id}`}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-indigo-200 hover:text-white hover:bg-white/10 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Balance Due</p>
              <p className="text-xl font-black text-rose-600">₹{student ? student.balanceDue || 0 : parent?.balanceDue || 0}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total Paid</p>
              <p className="text-xl font-black text-emerald-600">₹{student ? student.totalPaid || 0 : parent?.totalPaid || 0}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                {accountType === 'student' ? 'Learning Points' : 'Linked Children'}
              </p>
              <p className="text-xl font-black text-amber-600">
                {accountType === 'student' ? `${student?.totalPoints || 0} pts` : `${linkedStudents.length}`}
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Reminders Sent</p>
              <p className="text-xl font-black text-indigo-600">
                {student ? (student.lastActive?.includes('Reminder') ? '1+' : '0') : parent?.reminderCount || 0}
              </p>
            </div>
          </div>

          {/* Core Account Details */}
          <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 space-y-2.5">
            <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-4 h-4 text-indigo-700" /> Account Profile Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 font-semibold">Registered Contact:</span>
                <p className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  {student ? student.parentPhone || 'Not specified' : parent?.phone}
                </p>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">Email:</span>
                <p className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  {student ? student.email || 'None' : parent?.email || 'None'}
                </p>
              </div>

              {student && (
                <>
                  <div>
                    <span className="text-slate-500 font-semibold">Academic Class & Board:</span>
                    <p className="font-bold text-slate-800 mt-0.5">
                      {studentGrade?.name || `Grade ${student.gradeId}`} • {studentBoard?.name || student.boardId.toUpperCase()}
                      {student.streamId && ` (${student.streamId.toUpperCase()})`}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold">Linked Guardian / Parent:</span>
                    <p className="font-bold text-indigo-900 mt-0.5">
                      {linkedParent ? `${linkedParent.name} (${linkedParent.relationship})` : student.parentName || 'Self-registered'}
                    </p>
                  </div>
                </>
              )}

              {parent && (
                <>
                  <div>
                    <span className="text-slate-500 font-semibold">Relationship:</span>
                    <p className="font-bold text-slate-800 mt-0.5 capitalize">{parent.relationship}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold">Subscription Plan:</span>
                    <p className="font-bold text-emerald-700 mt-0.5">{parent.subscriptionPlan}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Linked Children for Parent */}
          {parent && linkedStudents.length > 0 && (
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-2">
              <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-700" /> Linked Children ({linkedStudents.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {linkedStudents.map((cs) => (
                  <div key={cs.id} className="bg-white p-2.5 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-black text-slate-900">{cs.name}</p>
                      <p className="text-[11px] text-slate-500 font-medium">Grade {cs.gradeId} • {cs.boardId.toUpperCase()}</p>
                    </div>
                    <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                      Roll: {cs.studentCode}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Financial Ledger */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-slate-700" /> Financial Activity & Invoices
              </h4>
              <button
                onClick={() => addSubscriptionFee(student ? student.id : linkedStudents[0]?.id || '', 50)}
                className="px-2.5 py-1 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition shadow-xs flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Add ₹50 Fee</span>
              </button>
            </div>

            {userTransactions.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl">No financial records on file.</p>
            ) : (
              <div className="space-y-1.5">
                {userTransactions.map((tx) => (
                  <div key={tx.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900">{tx.description}</span>
                        <span className={`text-[10px] font-black uppercase px-1.5 py-0.2 rounded-sm ${
                          tx.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium">Due: {tx.dueDate} • Reminders: {tx.reminderCount || 0}</p>
                    </div>
                    <span className="font-black text-sm text-slate-900">₹{tx.amount}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              const res = sendWhatsAppReminder(student ? student.id : parent?.id || '');
              window.open(res.whatsappUrl, '_blank');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Send ₹50 WhatsApp Reminder</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-xs transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface EditAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountType: 'student' | 'parent';
  accountId: string | null;
}

export const EditAccountModal: React.FC<EditAccountModalProps> = ({
  isOpen,
  onClose,
  accountType,
  accountId,
}) => {
  const { allStudents, parents, updateStudent, updateParent, boards, grades } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gradeId, setGradeId] = useState(3);
  const [boardId, setBoardId] = useState('cbse');
  const [streamId, setStreamId] = useState<'science' | 'commerce' | 'humanities' | undefined>(undefined);
  const [status, setStatus] = useState<SubscriptionStatus>('active');
  const [balanceDue, setBalanceDue] = useState(0);
  const [parentName, setParentName] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!accountId) return;
    if (accountType === 'student') {
      const s = allStudents.find((st) => st.id === accountId);
      if (s) {
        setName(s.name);
        setPhone(s.parentPhone || '');
        setEmail(s.email || '');
        setGradeId(s.gradeId);
        setBoardId(s.boardId);
        setStreamId(s.streamId as any);
        setStatus(s.subscriptionStatus || 'pending');
        setBalanceDue(s.balanceDue || 0);
        setParentName(s.parentName || '');
        setNotes(s.notes || '');
      }
    } else {
      const p = parents.find((pt) => pt.id === accountId);
      if (p) {
        setName(p.name);
        setPhone(p.phone);
        setEmail(p.email || '');
        setStatus(p.subscriptionStatus || 'pending');
        setBalanceDue(p.balanceDue || 0);
        setNotes(p.notes || '');
      }
    }
  }, [accountId, accountType, allStudents, parents]);

  if (!isOpen || !accountId) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountType === 'student') {
      updateStudent(accountId, {
        name,
        parentPhone: phone,
        email,
        gradeId,
        boardId,
        streamId: gradeId === 11 ? streamId : undefined,
        subscriptionStatus: status,
        balanceDue: Number(balanceDue),
        parentName,
        notes,
      });
    } else {
      updateParent(accountId, {
        name,
        phone,
        whatsappNumber: phone,
        email,
        subscriptionStatus: status,
        balanceDue: Number(balanceDue),
        notes,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b-2 border-amber-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-black text-base">Edit {accountType === 'student' ? 'Student' : 'Parent'} Account</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-bold focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">WhatsApp Contact</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-bold focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {accountType === 'student' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">Grade</label>
                <select
                  value={gradeId}
                  onChange={(e) => setGradeId(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-bold bg-white focus:ring-2 focus:ring-amber-500"
                >
                  {grades.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">Board</label>
                <select
                  value={boardId}
                  onChange={(e) => setBoardId(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-bold bg-white focus:ring-2 focus:ring-amber-500"
                >
                  {boards.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.code}
                    </option>
                  ))}
                </select>
              </div>
              {gradeId === 11 && (
                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">Stream</label>
                  <select
                    value={streamId || 'science'}
                    onChange={(e) => setStreamId(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-bold bg-white focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="science">Science</option>
                    <option value="commerce">Commerce</option>
                    <option value="humanities">Humanities</option>
                  </select>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">Subscription Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as SubscriptionStatus)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-bold bg-white focus:ring-2 focus:ring-amber-500"
              >
                <option value="active">Active (Paid)</option>
                <option value="pending">Pending (₹50 Due)</option>
                <option value="overdue">Overdue</option>
                <option value="trial">Trial Access</option>
                <option value="free">Free Tier</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">Balance Due (₹ INR)</label>
              <input
                type="number"
                value={balanceDue}
                onChange={(e) => setBalanceDue(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-bold focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">Administrative Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Parent requested WhatsApp reminder after 6 PM."
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="pt-3 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface WhatsAppPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string | null;
}

export const WhatsAppPreviewModal: React.FC<WhatsAppPreviewModalProps> = ({
  isOpen,
  onClose,
  targetId,
}) => {
  const { sendWhatsAppReminder, allStudents, parents } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !targetId) return null;

  const res = sendWhatsAppReminder(targetId);
  const student = allStudents.find((s) => s.id === targetId);
  const parent = parents.find((p) => p.id === targetId || (student && p.linkedStudentIds.includes(student.id)));

  const handleCopy = () => {
    navigator.clipboard.writeText(res.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border-4 border-emerald-500 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 bg-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-emerald-300" />
            <h3 className="font-black text-base">WhatsApp Reminder Dispatcher</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-emerald-200 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
            <div>
              <p className="font-black text-emerald-950">Recipient: {parent?.name || student?.parentName || 'Parent'}</p>
              <p className="text-emerald-700 font-bold">Number: {res.phone}</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-black text-[11px]">
              ₹50 INR Subscription
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
              Formatted WhatsApp Message
            </label>
            <div className="p-3.5 bg-slate-900 text-emerald-300 rounded-2xl text-xs font-mono whitespace-pre-wrap leading-relaxed border border-slate-700">
              {res.message}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-slate-300"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
            </button>

            <a
              href={res.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Launch in WhatsApp Web</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
