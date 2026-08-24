import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  RefreshCw,
  Sparkles,
  Users,
  GraduationCap,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageSquare,
  ShieldCheck,
  Zap,
  Activity,
  Calendar,
  CreditCard,
  Search,
  Eye,
  Edit3,
  Trash2,
  Radio,
} from 'lucide-react';
import { ViewAccountModal, EditAccountModal, WhatsAppPreviewModal } from './AccountModals';

export const AutoRefreshRosterTab: React.FC = () => {
  const {
    allStudents,
    parents,
    isAutoRefreshEnabled,
    setIsAutoRefreshEnabled,
    lastAutoRefreshedAt,
    refreshStudentParentDatabase,
    deleteStudent,
    deleteParent,
    addSubscriptionFee,
    openLoginModal,
  } = useApp();

  const [activeSegment, setActiveSegment] = useState<'all' | 'new' | 'old' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshingManual, setIsRefreshingManual] = useState(false);

  // Modals
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

  const handleManualRefresh = () => {
    setIsRefreshingManual(true);
    refreshStudentParentDatabase();
    setTimeout(() => setIsRefreshingManual(false), 500);
  };

  // Combine Students & Parents into unified roster items
  type UnifiedAccount = {
    id: string;
    type: 'student' | 'parent';
    name: string;
    codeOrId: string;
    phone: string;
    email?: string;
    gradeOrRole: string;
    boardOrPlan: string;
    isNew: boolean;
    registeredDate: string;
    subscriptionStatus: string;
    balanceDue: number;
    totalPaid: number;
    avatar?: string;
    linkedInfo: string;
  };

  const studentAccounts: UnifiedAccount[] = allStudents.map((s) => ({
    id: s.id,
    type: 'student',
    name: s.name,
    codeOrId: s.studentCode || 'DESH-2026-000',
    phone: s.parentPhone || 'N/A',
    email: s.email,
    gradeOrRole: `Grade ${s.gradeId}`,
    boardOrPlan: s.boardId.toUpperCase(),
    isNew: !!s.isNew,
    registeredDate: s.registeredDate || '2026-08-01',
    subscriptionStatus: s.subscriptionStatus || 'pending',
    balanceDue: s.balanceDue || 0,
    totalPaid: s.totalPaid || 0,
    avatar: s.avatar,
    linkedInfo: s.parentName ? `Parent: ${s.parentName}` : 'Self-Registered',
  }));

  const parentAccounts: UnifiedAccount[] = parents.map((p) => ({
    id: p.id,
    type: 'parent',
    name: p.name,
    codeOrId: p.id,
    phone: p.phone,
    email: p.email,
    gradeOrRole: `Parent (${p.relationship})`,
    boardOrPlan: p.subscriptionPlan || '₹50 Monthly Plan',
    isNew: !!p.isNew,
    registeredDate: p.registrationDate || '2026-08-01',
    subscriptionStatus: p.subscriptionStatus || 'pending',
    balanceDue: p.balanceDue || 0,
    totalPaid: p.totalPaid || 0,
    linkedInfo: `${p.linkedStudentIds.length} Child Profile(s)`,
  }));

  const unifiedRoster = [...studentAccounts, ...parentAccounts];

  // Filtering
  const filteredRoster = unifiedRoster.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.codeOrId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.gradeOrRole.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSegment =
      activeSegment === 'all'
        ? true
        : activeSegment === 'new'
        ? item.isNew
        : activeSegment === 'old'
        ? !item.isNew
        : item.balanceDue > 0;

    return matchesSearch && matchesSegment;
  });

  const newCount = unifiedRoster.filter((i) => i.isNew).length;
  const oldCount = unifiedRoster.filter((i) => !i.isNew).length;
  const pendingCount = unifiedRoster.filter((i) => i.balanceDue > 0).length;

  return (
    <div className="space-y-6">
      {/* Live Auto-Refresh Master Control Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 p-6 rounded-3xl text-white border-4 border-emerald-400 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
              <h2 className="text-xl font-black">Live Auto-Refreshing Student & Parent Roster</h2>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-950">
                Real-Time Sync
              </span>
            </div>
            <p className="text-xs text-emerald-200">
              Live database stream auto-polling and categorizing newly registered students & parents alongside existing long-term members.
            </p>
          </div>

          {/* Auto Refresh Toggle & Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Toggle Switch */}
            <div className="flex items-center bg-white/10 px-3.5 py-2 rounded-2xl border border-white/20 gap-2.5">
              <span className="text-xs font-bold text-white">Auto-Refresh:</span>
              <button
                id="toggle-auto-refresh-btn"
                onClick={() => setIsAutoRefreshEnabled(!isAutoRefreshEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  isAutoRefreshEnabled ? 'bg-emerald-500' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    isAutoRefreshEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[10px] font-black text-emerald-300">
                {isAutoRefreshEnabled ? 'ON (8s)' : 'OFF'}
              </span>
            </div>

            {/* Manual Refresh Button */}
            <button
              id="manual-refresh-now-btn"
              onClick={handleManualRefresh}
              className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-1.5"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshingManual ? 'animate-spin' : ''}`} />
              <span>Refresh Now</span>
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isAutoRefreshEnabled ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
            <span className="font-bold text-emerald-200">
              {isAutoRefreshEnabled ? 'Live Sync Polling (Every 8 Seconds)' : 'Auto-Sync Paused'}
            </span>
          </div>
          <div className="text-indigo-200 text-xs font-mono">
            Last Updated at: <span className="font-black text-white">{lastAutoRefreshedAt}</span>
          </div>
        </div>
      </div>

      {/* Segment Selector & Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveSegment('all')}
          className={`p-4 rounded-3xl border-4 text-left transition ${
            activeSegment === 'all'
              ? 'bg-amber-400 border-amber-500 text-slate-950 shadow-md scale-[1.02]'
              : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300'
          }`}
        >
          <p className="text-[10px] font-black uppercase tracking-wider opacity-80">All Enrolled Accounts</p>
          <p className="text-2xl font-black mt-1">{unifiedRoster.length}</p>
          <p className="text-[11px] font-bold mt-0.5 opacity-90">{allStudents.length} Students • {parents.length} Parents</p>
        </button>

        <button
          onClick={() => setActiveSegment('new')}
          className={`p-4 rounded-3xl border-4 text-left transition ${
            activeSegment === 'new'
              ? 'bg-rose-500 border-rose-600 text-white shadow-md scale-[1.02]'
              : 'bg-white border-slate-200 text-slate-700 hover:border-rose-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-wider opacity-90">Newly Registered</p>
            <span className="text-[9px] font-black bg-white/20 px-1.5 py-0.2 rounded-full">NEW</span>
          </div>
          <p className="text-2xl font-black mt-1">{newCount}</p>
          <p className="text-[11px] font-bold mt-0.5 opacity-90">Recent Onboardings</p>
        </button>

        <button
          onClick={() => setActiveSegment('old')}
          className={`p-4 rounded-3xl border-4 text-left transition ${
            activeSegment === 'old'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md scale-[1.02]'
              : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'
          }`}
        >
          <p className="text-[10px] font-black uppercase tracking-wider opacity-90">Old / Existing Members</p>
          <p className="text-2xl font-black mt-1">{oldCount}</p>
          <p className="text-[11px] font-bold mt-0.5 opacity-90">Active Regular Learners</p>
        </button>

        <button
          onClick={() => setActiveSegment('pending')}
          className={`p-4 rounded-3xl border-4 text-left transition ${
            activeSegment === 'pending'
              ? 'bg-amber-600 border-amber-700 text-white shadow-md scale-[1.02]'
              : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
          }`}
        >
          <p className="text-[10px] font-black uppercase tracking-wider opacity-90">Pending ₹50 INR Due</p>
          <p className="text-2xl font-black mt-1">{pendingCount}</p>
          <p className="text-[11px] font-bold mt-0.5 opacity-90">WhatsApp Reminder Ready</p>
        </button>
      </div>

      {/* Roster Search Bar */}
      <div className="bg-white p-4 rounded-3xl border-4 border-amber-300 shadow-md flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search live roster by Name, Roll Code, Phone, Grade or Role..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 font-bold focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <button
          onClick={() => openLoginModal('student')}
          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition shadow-xs shrink-0 flex items-center gap-1"
        >
          <span>+ Add User to Roster</span>
        </button>
      </div>

      {/* Live Table */}
      <div className="bg-white rounded-3xl border-4 border-slate-200 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider text-[11px] border-b border-slate-200">
                <th className="py-3.5 px-4">Account Type & Name</th>
                <th className="py-3.5 px-3">Role / Class</th>
                <th className="py-3.5 px-3">Registration Status</th>
                <th className="py-3.5 px-3">WhatsApp Phone</th>
                <th className="py-3.5 px-3">Subscription Due</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRoster.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-bold">
                    No accounts found in current roster segment.
                  </td>
                </tr>
              ) : (
                filteredRoster.map((item) => (
                  <tr key={`${item.type}-${item.id}`} className="hover:bg-amber-50/40 transition">
                    {/* Account Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 ${
                            item.type === 'student'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                          }`}
                        >
                          {item.type === 'student' ? <GraduationCap className="w-5 h-5 text-amber-800" /> : <Users className="w-5 h-5 text-indigo-800" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-black text-slate-900 text-sm">{item.name}</span>
                            <span
                              className={`text-[9px] font-black uppercase px-2 py-0.2 rounded-full ${
                                item.type === 'student' ? 'bg-amber-200 text-amber-950' : 'bg-indigo-200 text-indigo-950'
                              }`}
                            >
                              {item.type}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-mono font-bold mt-0.5">
                            {item.codeOrId} • {item.linkedInfo}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role / Grade */}
                    <td className="py-3 px-3">
                      <span className="font-black text-slate-800">{item.gradeOrRole}</span>
                      <p className="text-[10px] text-slate-400 font-medium">{item.boardOrPlan}</p>
                    </td>

                    {/* Registration Status (Old vs New) */}
                    <td className="py-3 px-3">
                      {item.isNew ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
                          <Sparkles className="w-3 h-3 text-rose-600" /> NEW REGISTERED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-300">
                          <CheckCircle2 className="w-3 h-3 text-slate-500" /> EXISTING MEMBER
                        </span>
                      )}
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">Reg: {item.registeredDate}</p>
                    </td>

                    {/* Phone */}
                    <td className="py-3 px-3">
                      <p className="font-bold text-emerald-800 font-mono flex items-center gap-1">
                        <Phone className="w-3 h-3 text-emerald-600" />
                        {item.phone}
                      </p>
                    </td>

                    {/* Subscription Balance */}
                    <td className="py-3 px-3">
                      <span className={`font-black text-sm ${item.balanceDue > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        ₹{item.balanceDue}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-medium">Paid: ₹{item.totalPaid}</span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => setViewModalState({ isOpen: true, type: item.type, id: item.id })}
                          className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition"
                          title="View Full Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setEditModalState({ isOpen: true, type: item.type, id: item.id })}
                          className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 transition"
                          title="Edit Account"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            addSubscriptionFee(item.id, 50);
                            alert(`Added ₹50 monthly fee for ${item.name}!`);
                          }}
                          className="px-2 py-1 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[11px] transition shadow-xs"
                          title="Add ₹50 INR Monthly Fee"
                        >
                          +₹50
                        </button>

                        <button
                          onClick={() => setWhatsappModalState({ isOpen: true, id: item.id })}
                          className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                          title="Send WhatsApp Subscription Reminder"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${item.name}?`)) {
                              if (item.type === 'student') deleteStudent(item.id);
                              else deleteParent(item.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                          title="Delete Account"
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
