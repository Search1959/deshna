import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  BookOpen,
  Plus,
  Sparkles,
  Upload,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Database,
  Trash2,
  Edit3,
  RotateCcw,
  Download,
  Filter,
  Check,
  X,
  PlusCircle,
  ListOrdered,
  Eye,
  EyeOff,
  Cpu,
  GraduationCap,
  FolderTree,
  Sliders,
  Users,
  CreditCard,
  Radio,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  Board,
  Grade,
  Subject,
  Chapter,
  Question,
  SubjectCategory,
  StreamMaster,
  SubjectMapping,
} from '../types';
import { AccountManagerTab } from '../components/admin/AccountManagerTab';
import { AutoRefreshRosterTab } from '../components/admin/AutoRefreshRosterTab';
import { FinancialReportsTab } from '../components/admin/FinancialReportsTab';

export const AdminDashboard: React.FC = () => {
  const {
    boards,
    grades,
    categories,
    streams,
    subjects,
    subjectMappings,
    chapters,
    questions,
    allStudents,
    parents,
    financialTransactions,
    addBoard,
    updateBoard,
    deleteBoard,
    addCategory,
    updateCategory,
    deleteCategory,
    addStreamMaster,
    updateStreamMaster,
    deleteStreamMaster,
    addSubject,
    updateSubject,
    deleteSubject,
    addSubjectMapping,
    deleteSubjectMapping,
    addQuestion,
    importQuestionsCSV,
    exportQuestionsCSV,
    resetAcademicToDefaults,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    | 'accounts'
    | 'live_roster'
    | 'financial_reports'
    | 'subjects'
    | 'categories'
    | 'mappings'
    | 'boards_streams'
    | 'questions'
    | 'ai_gen'
    | 'csv_tools'
  >('accounts');

  // Filter states for management tables
  const [filterGrade, setFilterGrade] = useState<number | 'all'>('all');
  const [filterBoard, setFilterBoard] = useState<string | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<string | 'all'>('all');

  // Modal / Form states
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddMappingModal, setShowAddMappingModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  // New Subject Form
  const [newSubjName, setNewSubjName] = useState('');
  const [newSubjCode, setNewSubjCode] = useState('');
  const [newSubjCategory, setNewSubjCategory] = useState(categories[0]?.id || 'languages');
  const [newSubjGrade, setNewSubjGrade] = useState(3);
  const [newSubjBoard, setNewSubjBoard] = useState('cbse');
  const [newSubjStream, setNewSubjStream] = useState<string | undefined>(undefined);
  const [newSubjDesc, setNewSubjDesc] = useState('');
  const [newSubjIsMandatory, setNewSubjIsMandatory] = useState(true);

  // New Category Form
  const [newCatName, setNewCatName] = useState('');
  const [newCatCode, setNewCatCode] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // New Mapping Form
  const [mapBoardId, setMapBoardId] = useState('cbse');
  const [mapGradeId, setMapGradeId] = useState(3);
  const [mapStreamId, setMapStreamId] = useState<string | undefined>(undefined);
  const [mapSubjectId, setMapSubjectId] = useState(subjects[0]?.id || '');
  const [mapIsMandatory, setMapIsMandatory] = useState(true);

  // AI Question Generator Form
  const [genGrade, setGenGrade] = useState(3);
  const [genSubject, setGenSubject] = useState('Mathematics');
  const [genChapter, setGenChapter] = useState('Fractions');
  const [genDifficulty, setGenDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBatch, setGeneratedBatch] = useState<any[]>([]);

  // CSV Import State
  const [csvText, setCsvText] = useState(
    `text,correctAnswer,difficulty,questionType,options,explanation\n"What is 3/4 + 1/4?","1","easy","mcq","1/2|1|3/4|2","3/4 + 1/4 = 4/4 which simplifies to 1."\n"Which planet is known as the Red Planet?","Mars","easy","mcq","Earth|Mars|Venus|Jupiter","Mars appears reddish due to iron oxide on its surface."`
  );
  const [importFeedback, setImportFeedback] = useState<string | null>(null);

  const handleSaveSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjName || !newSubjCode) return;

    if (editingSubject) {
      updateSubject({
        ...editingSubject,
        name: newSubjName,
        code: newSubjCode,
        categoryId: newSubjCategory,
        gradeId: newSubjGrade,
        boardId: newSubjBoard,
        streamId: newSubjStream as any,
        description: newSubjDesc,
        isCore: newSubjIsMandatory,
        isOptional: !newSubjIsMandatory,
      });
      setEditingSubject(null);
    } else {
      const newId = `subj-${newSubjCode.toLowerCase().replace(/[^a-z0-9]/g, '-')}-g${newSubjGrade}`;
      addSubject({
        id: newId,
        boardId: newSubjBoard,
        gradeId: newSubjGrade,
        streamId: newSubjStream as any,
        categoryId: newSubjCategory,
        name: newSubjName,
        code: newSubjCode,
        color: '#4F46E5',
        description: newSubjDesc || `${newSubjName} for Grade ${newSubjGrade}`,
        iconName: 'BookOpen',
        chaptersCount: 4,
        totalQuestionsCount: 20,
        isCore: newSubjIsMandatory,
        isOptional: !newSubjIsMandatory,
        isActive: true,
      });
    }

    setShowAddSubjectModal(false);
    setNewSubjName('');
    setNewSubjCode('');
    setNewSubjDesc('');
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    } catch {}
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName || !newCatCode) return;

    const catId = newCatCode.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    addCategory({
      id: catId,
      name: newCatName,
      code: (newCatCode.toUpperCase() as any),
      description: newCatDesc,
      icon: 'Layers',
      color: '#4F46E5',
      displayOrder: categories.length + 1,
      isActive: true,
    });

    setShowAddCategoryModal(false);
    setNewCatName('');
    setNewCatCode('');
    setNewCatDesc('');
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    } catch {}
  };

  const handleSaveMapping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapSubjectId) return;

    const targetSubj = subjects.find((s) => s.id === mapSubjectId);
    const newMapping: SubjectMapping = {
      id: `map-${mapBoardId}-g${mapGradeId}-${mapSubjectId}-${Date.now().toString(36)}`,
      boardId: mapBoardId,
      gradeId: mapGradeId,
      streamId: mapGradeId === 11 ? (mapStreamId as any || 'science') : undefined,
      categoryId: targetSubj?.categoryId || 'languages',
      subjectId: mapSubjectId,
      isCore: mapIsMandatory,
      isOptional: !mapIsMandatory,
      isEnrichment: false,
      isActive: true,
      displayOrder: subjectMappings.length + 1,
    };

    addSubjectMapping(newMapping);
    setShowAddMappingModal(false);
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    } catch {}
  };

  const handleGenerateQuestionsAI = async () => {
    setIsGenerating(true);
    setGeneratedBatch([]);

    try {
      const res = await fetch('/api/ai/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: genGrade,
          subject: genSubject,
          chapter: genChapter,
          difficulty: genDifficulty,
          count: 3,
        }),
      });

      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setGeneratedBatch(data.questions);
      }
    } catch (err) {
      console.error('Question generation failed', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublishGeneratedQuestion = (q: any) => {
    const newQ: Question = {
      id: `q-gen-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      chapterId: 'ch-g3-m5',
      gradeId: genGrade,
      subjectId: 'g3-math',
      boardId: 'cbse',
      topicId: 'top-g3-m5-t2',
      questionType: 'mcq',
      difficulty: genDifficulty,
      text: q.prompt || q.text,
      options: q.options || ['A', 'B', 'C', 'D'],
      correctAnswer: q.correctOptionIndex ?? 0,
      explanation: q.explanation || 'Correct conceptual derivation.',
      hints: [q.hint || 'Recall the governing rule.'],
      status: 'approved',
    };

    addQuestion(newQ);
    setGeneratedBatch((prev) => prev.filter((item) => item !== q));

    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    } catch {}
  };

  const handleImportCSV = () => {
    const count = importQuestionsCSV(csvText);
    if (count > 0) {
      setImportFeedback(`Successfully imported ${count} validated question items!`);
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } catch {}
    } else {
      setImportFeedback('Error parsing CSV format. Please verify columns.');
    }
  };

  const handleExportCSV = () => {
    const csvData = exportQuestionsCSV();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `eduvate_questions_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Subjects for Subject Tab
  const filteredSubjectsList = subjects.filter((s) => {
    if (filterGrade !== 'all' && s.gradeId !== filterGrade) return false;
    if (filterBoard !== 'all' && s.boardId !== filterBoard) return false;
    if (filterCategory !== 'all' && s.categoryId !== filterCategory) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#4F46E5] via-[#4338CA] to-[#3730A3] rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl border-b-6 sm:border-b-8 border-[#312E81] relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-yellow-300 border border-white/30">
              Relational Academic CMS & Governance Engine
            </span>
            <h1 className="text-xl sm:text-4xl font-black tracking-tight">
              Academic Structure & Content Management
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 font-bold">
              Dynamic multi-board curriculum administration for Grades 1 to 11. Add, edit, activate, or reorder
              Boards, Grades, Streams, Categories, Subjects, and Question Banks.
            </p>
          </div>

          {/* Reset to Master Catalog Button */}
          <button
            onClick={() => {
              if (window.confirm('Reset all academic boards, subjects, and categories to the master defaults?')) {
                resetAcademicToDefaults();
                try {
                  confetti({ particleCount: 30, spread: 50 });
                } catch {}
              }
            }}
            className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-2xl text-xs font-black border-2 border-white/40 transition flex items-center space-x-2 shrink-0 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Master Catalog</span>
          </button>
        </div>
      </div>

      {/* Metric Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
        <div className="bg-white p-3.5 rounded-2xl border-3 border-amber-300 shadow-xs space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Students</span>
          <p className="text-xl sm:text-2xl font-black text-amber-900">{allStudents.length}</p>
          <span className="text-[10px] text-amber-600 font-bold block">Enrolled</span>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border-3 border-indigo-200 shadow-xs space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Parents</span>
          <p className="text-xl sm:text-2xl font-black text-indigo-900">{parents.length}</p>
          <span className="text-[10px] text-indigo-600 font-bold block">Guardians</span>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border-3 border-rose-200 shadow-xs space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">₹50 Invoices</span>
          <p className="text-xl sm:text-2xl font-black text-rose-600">
            {financialTransactions.filter((t) => t.status === 'pending').length}
          </p>
          <span className="text-[10px] text-rose-500 font-bold block">Pending Due</span>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border-3 border-emerald-200 shadow-xs space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Boards</span>
          <p className="text-xl sm:text-2xl font-black text-slate-800">{boards.length}</p>
          <span className="text-[10px] text-slate-500 font-bold block">Curriculums</span>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border-3 border-indigo-200 shadow-xs space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Grades</span>
          <p className="text-xl sm:text-2xl font-black text-indigo-900">{grades.length}</p>
          <span className="text-[10px] text-indigo-600 font-bold block">Grades 1-11</span>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border-3 border-indigo-200 shadow-xs space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Categories</span>
          <p className="text-xl sm:text-2xl font-black text-indigo-900">{categories.length}</p>
          <span className="text-[10px] text-indigo-600 font-bold block">Disciplines</span>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border-3 border-indigo-200 shadow-xs space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Subjects</span>
          <p className="text-xl sm:text-2xl font-black text-indigo-900">{subjects.length}</p>
          <span className="text-[10px] text-indigo-600 font-bold block">Published</span>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border-3 border-emerald-200 shadow-xs space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Q-Bank</span>
          <p className="text-xl sm:text-2xl font-black text-emerald-700">{questions.length}</p>
          <span className="text-[10px] text-emerald-600 font-bold block">Questions</span>
        </div>
      </div>

      {/* Main CMS Card & Navigation Tabs */}
      <div className="bg-white rounded-3xl border-4 border-[#A5B4FC] shadow-lg overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b-2 border-[#C7D2FE] bg-[#EEF2FF] overflow-x-auto p-1.5 gap-1.5 scrollbar-none">
          {[
            { id: 'accounts', label: 'Manage Accounts (Student/Parent)', icon: Users },
            { id: 'live_roster', label: 'Auto-Refresh Live Roster', icon: Radio },
            { id: 'financial_reports', label: 'Financial Reports & ₹50 WhatsApp', icon: CreditCard },
            { id: 'subjects', label: 'Subjects Catalogue', icon: BookOpen },
            { id: 'categories', label: 'Master Categories', icon: Layers },
            { id: 'mappings', label: 'Subject Mappings', icon: FolderTree },
            { id: 'boards_streams', label: 'Boards & Streams', icon: GraduationCap },
            { id: 'questions', label: 'Question Bank', icon: Database },
            { id: 'ai_gen', label: 'AI Generator', icon: Sparkles },
            { id: 'csv_tools', label: 'CSV Tools', icon: FileSpreadsheet },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                id={`admin-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl text-xs font-black transition whitespace-nowrap border-2 ${
                  activeTab === tab.id
                    ? 'bg-[#4F46E5] text-white border-[#3730A3] shadow-sm'
                    : 'bg-transparent border-transparent text-[#4338CA] hover:bg-white/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 0A: Manage Accounts */}
        {activeTab === 'accounts' && (
          <div className="p-4 sm:p-8">
            <AccountManagerTab />
          </div>
        )}

        {/* Tab 0B: Auto-Refresh Live Roster */}
        {activeTab === 'live_roster' && (
          <div className="p-4 sm:p-8">
            <AutoRefreshRosterTab />
          </div>
        )}

        {/* Tab 0C: Financial Reports & ₹50 WhatsApp Reminders */}
        {activeTab === 'financial_reports' && (
          <div className="p-4 sm:p-8">
            <FinancialReportsTab />
          </div>
        )}

        {/* Tab 1: Subjects Catalogue */}
        {activeTab === 'subjects' && (
          <div className="p-4 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b-2 border-indigo-100">
              <div>
                <h3 className="text-lg font-black text-[#1F2937]">Subjects Master Catalogue</h3>
                <p className="text-xs text-slate-500 font-bold">
                  Showing {filteredSubjectsList.length} of {subjects.length} subjects
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingSubject(null);
                  setNewSubjName('');
                  setNewSubjCode('');
                  setNewSubjDesc('');
                  setShowAddSubjectModal(true);
                }}
                className="px-4 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-2xl text-xs font-black transition flex items-center space-x-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Subject</span>
              </button>
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#F8FAFC] rounded-2xl border-2 border-slate-200">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">
                  Filter by Grade:
                </label>
                <select
                  value={filterGrade}
                  onChange={(e) => setFilterGrade(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                >
                  <option value="all">All Grades (1 to 11)</option>
                  {grades.map((g) => (
                    <option key={g.id} value={g.id}>
                      Grade {g.id}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">
                  Filter by Category:
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">
                  Filter by Board:
                </label>
                <select
                  value={filterBoard}
                  onChange={(e) => setFilterBoard(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                >
                  <option value="all">All Boards</option>
                  {boards.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.code} ({b.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subjects Table */}
            <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EEF2FF] text-[#312E81] uppercase font-black text-[10px] border-b-2 border-indigo-100">
                  <tr>
                    <th className="p-3.5">Code</th>
                    <th className="p-3.5">Subject Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Grade</th>
                    <th className="p-3.5">Board</th>
                    <th className="p-3.5">Stream</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white font-medium">
                  {filteredSubjectsList.map((s) => {
                    const cat = categories.find((c) => c.id === s.categoryId);
                    return (
                      <tr key={s.id} className="hover:bg-slate-50 transition">
                        <td className="p-3.5 font-mono font-black text-indigo-900">{s.code}</td>
                        <td className="p-3.5 font-bold text-slate-900">
                          <div>{s.name}</div>
                          <div className="text-[10px] text-slate-400 font-normal line-clamp-1">{s.description}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                            {cat?.name || s.categoryId}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold">Grade {s.gradeId}</td>
                        <td className="p-3.5 uppercase font-bold text-slate-600">{s.boardId}</td>
                        <td className="p-3.5 capitalize font-bold text-slate-600">
                          {s.streamId || '—'}
                        </td>
                        <td className="p-3.5">
                          <button
                            onClick={() => updateSubject({ ...s, isActive: !s.isActive })}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              s.isActive !== false
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-slate-100 text-slate-600 border border-slate-300'
                            }`}
                          >
                            {s.isActive !== false ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          <button
                            onClick={() => {
                              setEditingSubject(s);
                              setNewSubjName(s.name);
                              setNewSubjCode(s.code);
                              setNewSubjCategory(s.categoryId || 'languages');
                              setNewSubjGrade(s.gradeId);
                              setNewSubjBoard(s.boardId);
                              setNewSubjStream(s.streamId);
                              setNewSubjDesc(s.description);
                              setNewSubjIsMandatory(s.isCore !== false);
                              setShowAddSubjectModal(true);
                            }}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-indigo-600 font-bold transition"
                            title="Edit Subject"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete subject ${s.name}?`)) {
                                deleteSubject(s.id);
                              }
                            }}
                            className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 font-bold transition"
                            title="Delete Subject"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Master Categories */}
        {activeTab === 'categories' && (
          <div className="p-4 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b-2 border-indigo-100">
              <div>
                <h3 className="text-lg font-black text-[#1F2937]">Master Subject Categories</h3>
                <p className="text-xs text-slate-500 font-bold">
                  Standardized categories across all curricula (Languages, Sciences, Commerce, Tech, Arts, etc.)
                </p>
              </div>

              <button
                onClick={() => setShowAddCategoryModal(true)}
                className="px-4 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-2xl text-xs font-black transition flex items-center space-x-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat, idx) => {
                const subCount = subjects.filter((s) => s.categoryId === cat.id).length;
                return (
                  <div
                    key={cat.id}
                    className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {cat.code}
                        </span>
                        <span className="text-xs text-slate-400 font-bold">Order #{idx + 1}</span>
                      </div>
                      <h4 className="text-sm font-black text-slate-900">{cat.name}</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{cat.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-indigo-600 font-black">{subCount} Subjects Mapped</span>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete category ${cat.name}?`)) {
                            deleteCategory(cat.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 text-xs font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Subject Mappings */}
        {activeTab === 'mappings' && (
          <div className="p-4 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b-2 border-indigo-100">
              <div>
                <h3 className="text-lg font-black text-[#1F2937]">Relational Subject Mappings</h3>
                <p className="text-xs text-slate-500 font-bold">
                  Join table linking Board + Grade + Stream → Subjects with Mandatory/Elective flags
                </p>
              </div>

              <button
                onClick={() => setShowAddMappingModal(true)}
                className="px-4 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-2xl text-xs font-black transition flex items-center space-x-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Subject Mapping</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EEF2FF] text-[#312E81] uppercase font-black text-[10px] border-b-2 border-indigo-100">
                  <tr>
                    <th className="p-3.5">Board</th>
                    <th className="p-3.5">Grade</th>
                    <th className="p-3.5">Stream</th>
                    <th className="p-3.5">Subject</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white font-medium">
                  {subjectMappings.map((map) => {
                    const subj = subjects.find((s) => s.id === map.subjectId);
                    const cat = categories.find((c) => c.id === map.categoryId);
                    return (
                      <tr key={map.id} className="hover:bg-slate-50 transition">
                        <td className="p-3.5 uppercase font-black text-indigo-900">{map.boardId}</td>
                        <td className="p-3.5 font-bold">Grade {map.gradeId}</td>
                        <td className="p-3.5 capitalize font-bold text-slate-600">{map.streamId || '—'}</td>
                        <td className="p-3.5 font-bold text-slate-900">{subj?.name || map.subjectId}</td>
                        <td className="p-3.5 text-slate-600">{cat?.name || map.categoryId}</td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              map.isCore
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : 'bg-purple-100 text-purple-800 border border-purple-200'
                            }`}
                          >
                            {map.isCore ? 'Mandatory' : 'Elective'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => {
                              if (window.confirm('Remove this subject mapping?')) {
                                deleteSubjectMapping(map.id);
                              }
                            }}
                            className="text-red-500 hover:text-red-700 text-xs font-bold"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Boards & Streams */}
        {activeTab === 'boards_streams' && (
          <div className="p-4 sm:p-8 space-y-8">
            {/* Boards Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b-2 border-indigo-100">
                <h3 className="text-lg font-black text-[#1F2937]">Curriculum Boards</h3>
                <span className="text-xs text-slate-500 font-bold">{boards.length} Boards Registered</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {boards.map((b) => (
                  <div key={b.id} className="p-5 rounded-2xl bg-[#EEF2FF] border-2 border-[#C7D2FE] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-[#1F2937]">{b.name}</span>
                      <span className="text-[10px] px-2.5 py-1 rounded-xl bg-white text-[#4338CA] font-black border border-[#C7D2FE]">
                        {b.code}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{b.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Streams Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b-2 border-indigo-100">
                <h3 className="text-lg font-black text-[#1F2937]">Senior Secondary Streams (Grades 11-12)</h3>
                <span className="text-xs text-slate-500 font-bold">{streams.length} Streams Active</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {streams.map((st) => (
                  <div key={st.id} className="p-5 rounded-2xl bg-pink-50 border-2 border-pink-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-pink-950">{st.name}</span>
                      <span className="text-[10px] px-2.5 py-1 rounded-xl bg-white text-pink-700 font-black border border-pink-200 uppercase">
                        {st.code}
                      </span>
                    </div>
                    <p className="text-xs text-pink-800 font-medium">{st.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Question Bank */}
        {activeTab === 'questions' && (
          <div className="p-4 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b-2 border-indigo-100">
              <div>
                <h3 className="text-lg font-black text-[#1F2937]">Question Bank Repository</h3>
                <p className="text-xs text-slate-500 font-bold">Currently hosting {questions.length} items</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black transition flex items-center space-x-1.5 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {questions.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">
                      {idx + 1}. {q.text}
                    </span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D1FAE5] text-[#065F46] border border-[#A7F3D0] font-black uppercase">
                      {q.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#92400E] font-bold">
                    Grade {q.gradeId} • {q.difficulty} • Correct: {String(q.correctAnswer)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: AI Question Generator */}
        {activeTab === 'ai_gen' && (
          <div className="p-4 sm:p-8 space-y-6">
            <div className="max-w-2xl space-y-4">
              <div>
                <h3 className="text-lg font-black text-[#1F2937]">Generate Questions with Gemini AI</h3>
                <p className="text-xs text-slate-600 font-bold">
                  Instantly author curriculum-aligned multiple choice questions with explanations and hints in very easy-to-understand English.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-black text-[#4338CA] uppercase mb-1">Grade</label>
                  <select
                    value={genGrade}
                    onChange={(e) => setGenGrade(Number(e.target.value))}
                    className="w-full p-3 rounded-2xl border-2 border-[#C7D2FE] bg-[#EEF2FF] font-black text-[#4338CA]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((g) => (
                      <option key={g} value={g}>
                        Grade {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-black text-[#4338CA] uppercase mb-1">Subject</label>
                  <input
                    type="text"
                    value={genSubject}
                    onChange={(e) => setGenSubject(e.target.value)}
                    className="w-full p-3 rounded-2xl border-2 border-[#C7D2FE] bg-[#EEF2FF] font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-black text-[#4338CA] uppercase mb-1">Chapter</label>
                  <input
                    type="text"
                    value={genChapter}
                    onChange={(e) => setGenChapter(e.target.value)}
                    className="w-full p-3 rounded-2xl border-2 border-[#C7D2FE] bg-[#EEF2FF] font-bold text-slate-800"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateQuestionsAI}
                disabled={isGenerating}
                className="px-7 py-3.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-black text-xs rounded-2xl shadow-md transition flex items-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-yellow-300" />
                    <span>Gemini AI is authoring questions...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>Generate 3 Easy-To-Understand Questions</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Batch Preview */}
            {generatedBatch.length > 0 && (
              <div className="pt-6 border-t-2 border-indigo-100 space-y-4 animate-in fade-in">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#4338CA]">
                  Generated Questions Preview (Ready to Review & Publish):
                </h4>
                <div className="space-y-3">
                  {generatedBatch.map((q, idx) => (
                    <div key={idx} className="p-6 rounded-3xl bg-[#EEF2FF] border-2 border-[#C7D2FE] space-y-3.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs sm:text-sm font-black text-slate-900">{q.prompt || q.text}</p>
                        <button
                          onClick={() => handlePublishGeneratedQuestion(q)}
                          className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl text-xs font-black transition shrink-0 shadow-xs"
                        >
                          Approve & Publish
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {q.options?.map((opt: string, optIdx: number) => (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-xl border-2 text-[11px] font-bold ${
                              optIdx === q.correctOptionIndex
                                ? 'bg-[#D1FAE5] border-[#10B981] text-[#065F46]'
                                : 'bg-white border-[#C7D2FE] text-slate-800'
                            }`}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] text-[#4338CA] font-bold">
                        <strong>Explanation:</strong> {q.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 7: CSV Tools */}
        {activeTab === 'csv_tools' && (
          <div className="p-4 sm:p-8 space-y-6 max-w-3xl">
            <div>
              <h3 className="text-lg font-black text-[#1F2937]">Bulk CSV Question Importer & Exporter</h3>
              <p className="text-xs text-slate-600 font-bold">
                Paste standard CSV formatted question records with options separated by pipes (|) to bulk upload or backup curriculum data.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleExportCSV}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black transition flex items-center space-x-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Export Current Database to CSV</span>
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-700 uppercase">
                CSV Input Text:
              </label>
              <textarea
                rows={7}
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                className="w-full p-4 font-mono text-xs rounded-2xl border-2 border-[#C7D2FE] bg-[#EEF2FF] text-slate-900 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleImportCSV}
                className="px-6 py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-black text-xs rounded-2xl shadow-md transition"
              >
                Validate & Bulk Import Questions
              </button>
              {importFeedback && (
                <span className="text-xs font-black text-[#059669] bg-[#D1FAE5] px-3 py-1.5 rounded-xl border border-[#A7F3D0]">
                  {importFeedback}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add/Edit Subject */}
      {showAddSubjectModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border-4 border-indigo-300 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-indigo-100">
              <h3 className="text-lg font-black text-slate-900">
                {editingSubject ? 'Edit Subject' : 'Add New Subject'}
              </h3>
              <button
                onClick={() => setShowAddSubjectModal(false)}
                className="p-1 rounded-xl hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubject} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-black text-slate-700 uppercase mb-1">Subject Name *</label>
                <input
                  type="text"
                  required
                  value={newSubjName}
                  onChange={(e) => setNewSubjName(e.target.value)}
                  placeholder="e.g. Accountancy, French, Physics"
                  className="w-full p-3 rounded-2xl border-2 border-slate-200 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-black text-slate-700 uppercase mb-1">Code *</label>
                  <input
                    type="text"
                    required
                    value={newSubjCode}
                    onChange={(e) => setNewSubjCode(e.target.value.toUpperCase())}
                    placeholder="e.g. ACC-11"
                    className="w-full p-3 rounded-2xl border-2 border-slate-200 font-bold uppercase"
                  />
                </div>

                <div>
                  <label className="block font-black text-slate-700 uppercase mb-1">Category *</label>
                  <select
                    value={newSubjCategory}
                    onChange={(e) => setNewSubjCategory(e.target.value)}
                    className="w-full p-3 rounded-2xl border-2 border-slate-200 font-bold bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-black text-slate-700 uppercase mb-1">Grade *</label>
                  <select
                    value={newSubjGrade}
                    onChange={(e) => setNewSubjGrade(Number(e.target.value))}
                    className="w-full p-3 rounded-2xl border-2 border-slate-200 font-bold bg-white"
                  >
                    {grades.map((g) => (
                      <option key={g.id} value={g.id}>
                        Grade {g.id}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-black text-slate-700 uppercase mb-1">Board *</label>
                  <select
                    value={newSubjBoard}
                    onChange={(e) => setNewSubjBoard(e.target.value)}
                    className="w-full p-3 rounded-2xl border-2 border-slate-200 font-bold bg-white"
                  >
                    {boards.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.code}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-black text-slate-700 uppercase mb-1">Stream (Optional)</label>
                  <select
                    value={newSubjStream || ''}
                    onChange={(e) => setNewSubjStream(e.target.value || undefined)}
                    className="w-full p-3 rounded-2xl border-2 border-slate-200 font-bold bg-white"
                  >
                    <option value="">None (General)</option>
                    {streams.map((s) => (
                      <option key={s.id} value={s.code}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-black text-slate-700 uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newSubjDesc}
                  onChange={(e) => setNewSubjDesc(e.target.value)}
                  placeholder="Short syllabus description..."
                  className="w-full p-3 rounded-2xl border-2 border-slate-200 font-medium"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="isMandatoryCheck"
                  checked={newSubjIsMandatory}
                  onChange={(e) => setNewSubjIsMandatory(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <label htmlFor="isMandatoryCheck" className="font-bold text-slate-700">
                  Mandatory core subject for this grade
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddSubjectModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-black shadow-sm"
                >
                  {editingSubject ? 'Update Subject' : 'Create Subject'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Category */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-4 border-indigo-300 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-indigo-100">
              <h3 className="text-lg font-black text-slate-900">Add Master Category</h3>
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="p-1 rounded-xl hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-black text-slate-700 uppercase mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Performing Arts, Robotics"
                  className="w-full p-3 rounded-2xl border-2 border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-black text-slate-700 uppercase mb-1">Code *</label>
                <input
                  type="text"
                  required
                  value={newCatCode}
                  onChange={(e) => setNewCatCode(e.target.value.toUpperCase())}
                  placeholder="e.g. ARTS_PERFORMING"
                  className="w-full p-3 rounded-2xl border-2 border-slate-200 font-bold uppercase"
                />
              </div>

              <div>
                <label className="block font-black text-slate-700 uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Category scope and coverage..."
                  className="w-full p-3 rounded-2xl border-2 border-slate-200 font-medium"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-black shadow-sm"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Mapping */}
      {showAddMappingModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-4 border-indigo-300 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-indigo-100">
              <h3 className="text-lg font-black text-slate-900">Map Subject to Grade & Board</h3>
              <button
                onClick={() => setShowAddMappingModal(false)}
                className="p-1 rounded-xl hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMapping} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-black text-slate-700 uppercase mb-1">Select Subject *</label>
                <select
                  value={mapSubjectId}
                  onChange={(e) => setMapSubjectId(e.target.value)}
                  className="w-full p-3 rounded-2xl border-2 border-slate-200 font-bold bg-white"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.code} • Grade {s.gradeId})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-black text-slate-700 uppercase mb-1">Board *</label>
                  <select
                    value={mapBoardId}
                    onChange={(e) => setMapBoardId(e.target.value)}
                    className="w-full p-3 rounded-2xl border-2 border-slate-200 font-bold bg-white"
                  >
                    {boards.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.code} ({b.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-black text-slate-700 uppercase mb-1">Grade *</label>
                  <select
                    value={mapGradeId}
                    onChange={(e) => setMapGradeId(Number(e.target.value))}
                    className="w-full p-3 rounded-2xl border-2 border-slate-200 font-bold bg-white"
                  >
                    {grades.map((g) => (
                      <option key={g.id} value={g.id}>
                        Grade {g.id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {mapGradeId === 11 && (
                <div>
                  <label className="block font-black text-slate-700 uppercase mb-1">Stream (Grade 11)</label>
                  <select
                    value={mapStreamId || 'science'}
                    onChange={(e) => setMapStreamId(e.target.value)}
                    className="w-full p-3 rounded-2xl border-2 border-slate-200 font-bold bg-white"
                  >
                    {streams.map((s) => (
                      <option key={s.id} value={s.code}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="mapMandatoryCheck"
                  checked={mapIsMandatory}
                  onChange={(e) => setMapIsMandatory(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <label htmlFor="mapMandatoryCheck" className="font-bold text-slate-700">
                  Mandatory Subject for this curriculum combination
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddMappingModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-black shadow-sm"
                >
                  Create Mapping
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
