import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CreditCard,
  PlusCircle,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Send,
  Users,
  GraduationCap,
  Calendar,
  Phone,
  FileSpreadsheet,
  Download,
  Filter,
  Search,
  ExternalLink,
  DollarSign,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WhatsAppPreviewModal } from './AccountModals';

export const FinancialReportsTab: React.FC = () => {
  const {
    financialTransactions,
    allStudents,
    parents,
    addSubscriptionFee,
    bulkAddSubscriptionFee,
    markSubscriptionPaid,
    sendWhatsAppReminder,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'paid'>('all');
  const [selectedStudentForFee, setSelectedStudentForFee] = useState<string>(allStudents[0]?.id || '');
  const [customAmount, setCustomAmount] = useState<number>(50);
  const [customDescription, setCustomDescription] = useState<string>('Monthly AI Learning Hub Academic Subscription');
  const [showAddFeeModal, setShowAddFeeModal] = useState(false);

  // WhatsApp Modal
  const [whatsappModalTarget, setWhatsappModalTarget] = useState<string | null>(null);

  // Summary Metrics
  const totalCollected = financialTransactions
    .filter((t) => t.status === 'paid')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const totalOutstanding = financialTransactions
    .filter((t) => t.status === 'pending')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const totalPendingInvoices = financialTransactions.filter((t) => t.status === 'pending').length;
  const totalPaidInvoices = financialTransactions.filter((t) => t.status === 'paid').length;

  // Filtered Transactions
  const filteredTransactions = financialTransactions.filter((t) => {
    const matchesSearch =
      t.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.parentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.parentPhone.includes(searchQuery) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pending accounts for WhatsApp reminders
  const pendingAccounts = financialTransactions.filter((t) => t.status === 'pending');

  // Handle Add 50 INR Fee for selected student
  const handleAddSingleFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForFee) return;

    addSubscriptionFee(selectedStudentForFee, Number(customAmount) || 50, customDescription);
    setShowAddFeeModal(false);

    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } catch {}

    const student = allStudents.find((s) => s.id === selectedStudentForFee);
    alert(`Successfully added ₹${customAmount} INR subscription fee invoice for ${student?.name}!`);
  };

  // Handle Bulk 50 INR Billing
  const handleBulk50Billing = () => {
    if (
      window.confirm(
        `Are you sure you want to add ₹50 INR monthly subscription fee to all ${allStudents.length} active students?`
      )
    ) {
      const count = bulkAddSubscriptionFee(50);
      try {
        confetti({ particleCount: 60, spread: 80, origin: { y: 0.5 } });
      } catch {}
      alert(`Applied ₹50 INR monthly subscription fee to ${count} students & parents!`);
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    const header = 'TransactionID,StudentName,ParentName,ParentPhone,Grade,Board,Amount,Currency,Status,Description,DueDate,PaidAt\n';
    const rows = financialTransactions.map((t) => {
      return `"${t.id}","${t.studentName}","${t.parentName || ''}","${t.parentPhone}","${t.grade}","${t.board}","${t.amount}","INR","${t.status}","${t.description}","${t.dueDate}","${t.paidAt || ''}"`;
    });
    const blob = new Blob([header + rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Deshna_Financial_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with 50 INR Quick Action */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 p-6 rounded-3xl text-white border-4 border-amber-400 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-black">Financial Reports & Subscription Reminder Hub</h2>
            </div>
            <p className="text-xs text-amber-200">
              Track subscriptions, add ₹50 INR academic fee invoices, and dispatch direct WhatsApp payment reminders with UPI billing links.
            </p>
          </div>

          {/* Primary 50 INR Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Direct 50 INR Button */}
            <button
              id="btn-add-50-inr-fee"
              onClick={() => setShowAddFeeModal(true)}
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-lg transition flex items-center gap-2 transform hover:scale-105"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>+ Add 50 INR Fee Invoice</span>
            </button>

            {/* Bulk 50 INR Cycle */}
            <button
              id="btn-bulk-50-inr"
              onClick={handleBulk50Billing}
              className="px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition flex items-center gap-1.5 border border-emerald-400"
            >
              <Users className="w-4 h-4" />
              <span>Apply ₹50 Fee to All Students</span>
            </button>

            {/* Export CSV */}
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition flex items-center gap-1 border border-white/20"
              title="Export Financial Ledger CSV"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Financial KPI Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
            <p className="text-[10px] font-black text-amber-300 uppercase tracking-wider">Total Collected</p>
            <p className="text-2xl font-black text-emerald-400">₹{totalCollected} INR</p>
            <p className="text-[10px] text-emerald-200 mt-0.5">{totalPaidInvoices} Paid Invoices</p>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
            <p className="text-[10px] font-black text-rose-300 uppercase tracking-wider">Total Outstanding Due</p>
            <p className="text-2xl font-black text-rose-400">₹{totalOutstanding} INR</p>
            <p className="text-[10px] text-rose-200 mt-0.5">{totalPendingInvoices} Pending Collections</p>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-wider">Active Subscribers</p>
            <p className="text-2xl font-black text-white">
              {allStudents.filter((s) => s.subscriptionStatus === 'active').length}
            </p>
            <p className="text-[10px] text-indigo-200 mt-0.5">Students with ₹0 Balance</p>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
            <p className="text-[10px] font-black text-amber-200 uppercase tracking-wider">Monthly Plan</p>
            <p className="text-2xl font-black text-amber-300">₹50 INR</p>
            <p className="text-[10px] text-amber-200 mt-0.5">Per Student / Month</p>
          </div>
        </div>
      </div>

      {/* WhatsApp Reminder Broadcast Section */}
      <div className="bg-emerald-950/90 rounded-3xl p-5 border-4 border-emerald-500 text-white shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-800 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h3 className="font-black text-base">WhatsApp ₹50 INR Subscription Reminders Queue</h3>
          </div>
          <span className="text-xs font-bold text-emerald-300 bg-emerald-900/80 px-3 py-1 rounded-full border border-emerald-700">
            {pendingAccounts.length} Pending Invoices Ready for Reminder
          </span>
        </div>

        {pendingAccounts.length === 0 ? (
          <div className="p-6 bg-emerald-900/30 rounded-2xl text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="font-bold text-sm text-emerald-200">All student subscriptions are fully paid!</p>
            <p className="text-xs text-emerald-300/80 mt-1">Use the "+ Add 50 INR Fee Invoice" button above to add new subscription dues.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {pendingAccounts.slice(0, 6).map((tx) => (
              <div
                key={tx.id}
                className="bg-white/10 hover:bg-white/15 p-3.5 rounded-2xl border border-emerald-400/30 flex flex-col justify-between space-y-3 transition"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-white text-sm">{tx.studentName}</span>
                    <span className="font-black text-amber-300 text-sm">₹{tx.amount} INR</span>
                  </div>
                  <p className="text-[11px] text-emerald-200 mt-0.5">
                    Parent: {tx.parentName || 'Guardian'} • Grade {tx.grade} ({tx.board})
                  </p>
                  <p className="text-[10px] text-slate-300 font-mono flex items-center gap-1 mt-1">
                    <Phone className="w-3 h-3 text-emerald-400" /> {tx.parentPhone}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-[10px] text-emerald-300">Reminders: {tx.reminderCount || 0}</span>
                  <div className="flex items-center gap-1.5">
                    {/* Mark as Paid */}
                    <button
                      onClick={() => {
                        markSubscriptionPaid(tx.id, 'UPI');
                        alert(`Marked invoice for ${tx.studentName} as PAID!`);
                      }}
                      className="px-2 py-1 rounded-xl bg-white/20 hover:bg-emerald-500 text-white font-black text-[10px] transition"
                      title="Mark as Paid"
                    >
                      ✓ Mark Paid
                    </button>

                    {/* Send WhatsApp */}
                    <button
                      onClick={() => setWhatsappModalTarget(tx.studentId)}
                      className="px-2.5 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[11px] shadow-sm transition flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Send WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Financial Transactions Ledger Table */}
      <div className="bg-white p-5 rounded-3xl border-4 border-amber-300 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-base text-slate-900">Subscription Invoices & Ledger</h3>
            <span className="text-xs font-bold text-slate-400">({filteredTransactions.length} records)</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-slate-50 text-slate-700"
            >
              <option value="all">All Invoices</option>
              <option value="pending">Pending Dues (₹50)</option>
              <option value="paid">Paid Transactions</option>
            </select>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ledger..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 font-bold focus:ring-2 focus:ring-amber-500 w-44"
              />
            </div>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider text-[10px] border-b border-slate-200">
                  <th className="py-3 px-4">Invoice / Student</th>
                  <th className="py-3 px-3">Parent & Phone</th>
                  <th className="py-3 px-3">Class & Board</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Due / Paid Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400 font-bold">
                      No invoices found in ledger.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-amber-50/40 transition">
                      {/* Invoice & Student */}
                      <td className="py-3 px-4">
                        <p className="font-black text-slate-900">{tx.studentName}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{tx.description}</p>
                      </td>

                      {/* Parent */}
                      <td className="py-3 px-3">
                        <p className="font-bold text-slate-800">{tx.parentName || 'Guardian'}</p>
                        <p className="text-[10px] text-emerald-700 font-mono flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {tx.parentPhone}
                        </p>
                      </td>

                      {/* Grade & Board */}
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-800">Grade {tx.grade}</span>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">{tx.board}</p>
                      </td>

                      {/* Amount */}
                      <td className="py-3 px-3">
                        <span className="font-black text-sm text-slate-900">₹{tx.amount} INR</span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            tx.status === 'paid'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>

                      {/* Due / Paid Date */}
                      <td className="py-3 px-3 text-[11px] text-slate-600 font-medium">
                        {tx.status === 'paid' ? (
                          <span className="text-emerald-700 font-bold">Paid on {tx.paidAt?.split('T')[0]}</span>
                        ) : (
                          <span className="text-rose-600 font-bold">Due by {tx.dueDate}</span>
                        )}
                        <p className="text-[10px] text-slate-400">Reminders: {tx.reminderCount || 0}</p>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {tx.status !== 'paid' ? (
                            <>
                              <button
                                onClick={() => setWhatsappModalTarget(tx.studentId)}
                                className="px-2 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] transition flex items-center gap-1 shadow-xs"
                                title="Send WhatsApp Payment Reminder"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </button>
                              <button
                                onClick={() => {
                                  markSubscriptionPaid(tx.id, 'UPI');
                                  alert(`Marked invoice for ${tx.studentName} as PAID!`);
                                }}
                                className="px-2 py-1 rounded-xl bg-slate-100 hover:bg-emerald-100 text-slate-800 hover:text-emerald-800 font-black text-[10px] border border-slate-300 transition"
                                title="Mark Invoice as Paid"
                              >
                                ✓ Paid
                              </button>
                            </>
                          ) : (
                            <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                              Completed ({tx.paymentMethod || 'UPI'})
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add 50 INR Fee Modal */}
      {showAddFeeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b-2 border-amber-400">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <h3 className="font-black text-base">Add Subscription Fee (₹50 INR)</h3>
              </div>
              <button
                onClick={() => setShowAddFeeModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSingleFee} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  Select Student Account *
                </label>
                <select
                  value={selectedStudentForFee}
                  onChange={(e) => setSelectedStudentForFee(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-bold bg-white focus:ring-2 focus:ring-amber-500"
                >
                  {allStudents.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} (Grade {st.gradeId} - {st.boardId.toUpperCase()}) • Parent: {st.parentPhone || 'No Phone'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  Subscription Amount (₹ INR) *
                </label>
                <input
                  type="number"
                  required
                  value={customAmount}
                  onChange={(e) => setCustomAmount(Number(e.target.value))}
                  placeholder="50"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-black text-lg text-amber-950 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                  Invoice / Fee Description
                </label>
                <input
                  type="text"
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  placeholder="Monthly Academic Subscription (₹50)"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddFeeModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <span>Attach ₹{customAmount} Fee & Invoice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WhatsApp Modal */}
      <WhatsAppPreviewModal
        isOpen={!!whatsappModalTarget}
        onClose={() => setWhatsappModalTarget(null)}
        targetId={whatsappModalTarget}
      />
    </div>
  );
};
