import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  StudentProfile,
  ParentAccount,
  FinancialTransaction,
  Board,
  Grade,
  Subject,
  Chapter,
  Topic,
  Lesson,
  Question,
  DailyPlan,
  RevisionItem,
  VocabularyWord,
  ReadingStory,
  Badge,
  TeacherClass,
  PlatformAnalytics,
  StreamType,
  SubjectCategory,
  StreamMaster,
  SubjectMapping,
} from '../types';
import {
  BOARDS,
  GRADES,
  MASTER_CATEGORIES,
  MASTER_STREAMS,
  DEFAULT_SUBJECT_MAPPINGS,
  INITIAL_SUBJECTS,
  INITIAL_CHAPTERS,
  INITIAL_TOPICS,
  INITIAL_LESSONS,
  INITIAL_QUESTIONS,
  INITIAL_STORIES,
  INITIAL_VOCABULARY,
} from '../data/curriculumData';
import { generateDefaultChaptersForSubject } from '../data/chaptersData';
import {
  DEMO_STUDENTS,
  DEMO_PARENTS,
  INITIAL_FINANCIAL_TRANSACTIONS,
  INITIAL_DAILY_PLANS,
  INITIAL_REVISION_ITEMS,
  BADGES,
  TEACHER_CLASSES,
  INITIAL_ANALYTICS,
} from '../data/mockData';
import {
  INDIAN_LANGUAGES,
  UI_TRANSLATIONS,
  IndianLanguage,
} from '../data/indianLanguages';
import {
  getTranslation,
  localizeSubject as localizeSubjectFn,
  localizeChapter as localizeChapterFn,
  localizeTopic as localizeTopicFn,
  localizeQuestion as localizeQuestionFn,
} from '../utils/localization';

export type ActiveView =
  | 'landing'
  | 'classes_catalog'
  | 'student_dashboard'
  | 'subject_detail'
  | 'chapter_detail'
  | 'reading_coach'
  | 'vocabulary_vault'
  | 'spaced_revision'
  | 'doubt_solver'
  | 'exam_prep'
  | 'parent_dashboard'
  | 'teacher_dashboard'
  | 'admin_dashboard';

interface AppContextType {
  // Navigation & Role
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;

  // Selected Academic Hierarchy
  selectedBoardId: string;
  setSelectedBoardId: (boardId: string) => void;
  selectedGradeId: number;
  setSelectedGradeId: (gradeId: number) => void;
  selectedStreamId?: StreamType;
  setSelectedStreamId: (stream?: StreamType) => void;
  selectedSubjectId: string | null;
  setSelectedSubjectId: (subjectId: string | null) => void;
  selectedChapterId: string | null;
  setSelectedChapterId: (chapterId: string | null) => void;

  // Student & Parent Database
  currentStudent: StudentProfile;
  setCurrentStudent: (student: StudentProfile) => void;
  allStudents: StudentProfile[];
  parents: ParentAccount[];
  financialTransactions: FinancialTransaction[];
  switchStudent: (studentId: string) => void;
  updateStudentMastery: (subjectId: string, chapterId: string, topicId: string, isCorrect: boolean) => void;
  awardPoints: (points: number, reason?: string) => void;

  // User Management CRUD
  addStudent: (student: Partial<StudentProfile>) => StudentProfile;
  updateStudent: (studentId: string, updates: Partial<StudentProfile>) => void;
  deleteStudent: (studentId: string) => void;
  addParent: (parent: Partial<ParentAccount>) => ParentAccount;
  updateParent: (parentId: string, updates: Partial<ParentAccount>) => void;
  deleteParent: (parentId: string) => void;

  // Financial & Subscription Fee Actions (50 INR)
  addSubscriptionFee: (studentId: string, amount?: number, description?: string) => void;
  bulkAddSubscriptionFee: (amount?: number) => number;
  markSubscriptionPaid: (transactionId: string, paymentMethod?: string, reference?: string) => void;
  sendWhatsAppReminder: (targetId: string, customMessage?: string) => { whatsappUrl: string; message: string; phone: string };

  // Live Auto-Refresh
  isAutoRefreshEnabled: boolean;
  setIsAutoRefreshEnabled: (enabled: boolean) => void;
  lastAutoRefreshedAt: string;
  refreshStudentParentDatabase: () => void;

  // Login & Registration Modal
  isLoginModalOpen: boolean;
  loginModalDefaultTab: 'student' | 'parent' | 'admin';
  openLoginModal: (tab?: 'student' | 'parent' | 'admin') => void;
  closeLoginModal: () => void;

  // Daily Learning Plan
  dailyPlan: DailyPlan;
  setDailyPlanMinutes: (minutes: number) => Promise<void>;
  toggleDailyPlanItem: (itemId: string) => void;

  // Curriculum Data (Relational & Dynamic)
  boards: Board[];
  grades: Grade[];
  categories: SubjectCategory[];
  streams: StreamMaster[];
  subjectMappings: SubjectMapping[];
  subjects: Subject[];
  chapters: Chapter[];
  topics: Topic[];
  lessons: Lesson[];
  questions: Question[];
  stories: ReadingStory[];
  vocabulary: VocabularyWord[];
  revisionItems: RevisionItem[];
  badges: Badge[];
  teacherClasses: TeacherClass[];
  analytics: PlatformAnalytics;

  // Relational Filtering Helpers
  getFilteredSubjects: (boardId?: string, gradeId?: number, streamId?: string) => Subject[];
  getChaptersForSubject: (subjectId: string) => Chapter[];

  // CMS Operations (Admin)
  addSubject: (subj: Subject) => void;
  updateSubject: (subj: Subject) => void;
  deleteSubject: (subjId: string) => void;
  toggleSubjectStatus: (subjId: string) => void;

  addCategory: (cat: SubjectCategory) => void;
  updateCategory: (cat: SubjectCategory) => void;
  deleteCategory: (catId: string) => void;

  addStreamMaster: (stream: StreamMaster) => void;
  updateStreamMaster: (stream: StreamMaster) => void;
  deleteStreamMaster: (streamId: string) => void;

  addSubjectMapping: (mapping: SubjectMapping) => void;
  updateSubjectMapping: (mapping: SubjectMapping) => void;
  deleteSubjectMapping: (mappingId: string) => void;
  toggleSubjectMappingStatus: (mappingId: string) => void;

  addBoard: (board: Board) => void;
  updateBoard: (board: Board) => void;
  deleteBoard: (boardId: string) => void;

  addGrade: (grade: Grade) => void;
  updateGrade: (grade: Grade) => void;
  deleteGrade: (gradeId: number) => void;

  addChapter: (chap: Chapter) => void;
  updateChapter: (chap: Chapter) => void;
  deleteChapter: (chapId: string) => void;

  addQuestion: (q: Question) => void;
  updateQuestion: (q: Question) => void;
  deleteQuestion: (qId: string) => void;
  importQuestionsCSV: (csvText: string) => number;
  exportQuestionsCSV: () => string;

  resetAcademicToDefaults: () => void;

  // Vocabulary Operations
  updateVocabStatus: (wordId: string, newStatus: VocabularyWord['status']) => void;
  addVocabularyWord: (word: Partial<VocabularyWord>) => void;

  // Revision Operations
  markRevisionDone: (revId: string, rating: 'easy' | 'good' | 'hard') => void;
  addTopicToRevision: (topicId: string, topicTitle: string, subjectId: string, subjectName: string) => void;

  // AI Tutor Drawer State
  isAITutorOpen: boolean;
  setIsAITutorOpen: (open: boolean) => void;
  aiTutorContext: { subject?: string; chapter?: string; topic?: string } | null;
  openAITutorWithContext: (ctx?: { subject?: string; chapter?: string; topic?: string }) => void;

  // Search Modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Language State
  selectedLanguage: string;
  setSelectedLanguage: (langCode: string) => void;
  availableLanguages: IndianLanguage[];
  t: (key: string, defaultText?: string) => string;
  localizeSubject: (subject: Subject) => Subject;
  localizeChapter: (chapter: Chapter) => Chapter;
  localizeTopic: (topic: Topic) => Topic;
  localizeQuestion: (question: Question) => Question;

  // Speech Helper
  speakText: (text: string, langCode?: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [activeView, setActiveView] = useState<ActiveView>('landing');

  // Academic selection
  const [selectedBoardId, setSelectedBoardId] = useState<string>('cbse');
  const [selectedGradeId, setSelectedGradeId] = useState<number>(3);
  const [selectedStreamId, setSelectedStreamId] = useState<StreamType | undefined>(undefined);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>('g3-math');
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>('ch-g3-m5');

  // Indian Languages Selection
  const [selectedLanguage, setSelectedLanguageState] = useState<string>(() => {
    try {
      return localStorage.getItem('deshna_app_language') || 'en';
    } catch {
      return 'en';
    }
  });

  const setSelectedLanguage = (langCode: string) => {
    setSelectedLanguageState(langCode);
    try {
      localStorage.setItem('deshna_app_language', langCode);
    } catch (e) {
      console.warn('Could not save language preference', e);
    }
  };

  const t = (key: string, defaultText?: string): string => {
    return getTranslation(key, selectedLanguage, defaultText);
  };

  const localizeSubject = (subject: Subject): Subject => {
    return localizeSubjectFn(subject, selectedLanguage);
  };

  const localizeChapter = (chapter: Chapter): Chapter => {
    return localizeChapterFn(chapter, selectedLanguage);
  };

  const localizeTopic = (topic: Topic): Topic => {
    return localizeTopicFn(topic, selectedLanguage);
  };

  const localizeQuestion = (question: Question): Question => {
    return localizeQuestionFn(question, selectedLanguage);
  };

  // Student & Parent & Financial State
  const [allStudents, setAllStudents] = useState<StudentProfile[]>(() => {
    try {
      const saved = localStorage.getItem('eduvate_students');
      return saved ? JSON.parse(saved) : DEMO_STUDENTS;
    } catch {
      return DEMO_STUDENTS;
    }
  });

  const [parents, setParents] = useState<ParentAccount[]>(() => {
    try {
      const saved = localStorage.getItem('eduvate_parents');
      return saved ? JSON.parse(saved) : DEMO_PARENTS;
    } catch {
      return DEMO_PARENTS;
    }
  });

  const [financialTransactions, setFinancialTransactions] = useState<FinancialTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('eduvate_financials');
      return saved ? JSON.parse(saved) : INITIAL_FINANCIAL_TRANSACTIONS;
    } catch {
      return INITIAL_FINANCIAL_TRANSACTIONS;
    }
  });

  const [currentStudent, setCurrentStudent] = useState<StudentProfile>(() => allStudents[0] || DEMO_STUDENTS[0]);

  // Live Auto-Refresh State
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState<boolean>(true);
  const [lastAutoRefreshedAt, setLastAutoRefreshedAt] = useState<string>(new Date().toLocaleTimeString());

  // Login & Registration Modal State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loginModalDefaultTab, setLoginModalDefaultTab] = useState<'student' | 'parent' | 'admin'>('student');

  const openLoginModal = (tab: 'student' | 'parent' | 'admin' = 'student') => {
    setLoginModalDefaultTab(tab);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // Sync Students, Parents & Financials to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('eduvate_students', JSON.stringify(allStudents));
    } catch (e) {
      console.warn('Student storage sync error', e);
    }
  }, [allStudents]);

  useEffect(() => {
    try {
      localStorage.setItem('eduvate_parents', JSON.stringify(parents));
    } catch (e) {
      console.warn('Parents storage sync error', e);
    }
  }, [parents]);

  useEffect(() => {
    try {
      localStorage.setItem('eduvate_financials', JSON.stringify(financialTransactions));
    } catch (e) {
      console.warn('Financials storage sync error', e);
    }
  }, [financialTransactions]);

  // Live Auto-refresh timer every 8 seconds when enabled
  useEffect(() => {
    if (!isAutoRefreshEnabled) return;
    const interval = setInterval(() => {
      setLastAutoRefreshedAt(new Date().toLocaleTimeString());
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoRefreshEnabled]);

  const refreshStudentParentDatabase = () => {
    setLastAutoRefreshedAt(new Date().toLocaleTimeString());
  };

  // Student CRUD Operations
  const addStudent = (studentData: Partial<StudentProfile>): StudentProfile => {
    const studentId = studentData.id || `student-${Date.now()}`;
    const codeNum = allStudents.length + 1;
    const studentCode = studentData.studentCode || `DESH-2026-${String(codeNum).padStart(3, '0')}`;
    
    let parentId = studentData.parentId;
    // If parent phone/name provided but no parentId, create or find parent
    if (!parentId && (studentData.parentPhone || studentData.parentName)) {
      const existingParent = parents.find((p) => p.phone === studentData.parentPhone);
      if (existingParent) {
        parentId = existingParent.id;
        if (!existingParent.linkedStudentIds.includes(studentId)) {
          setParents((prev) =>
            prev.map((p) => (p.id === existingParent.id ? { ...p, linkedStudentIds: [...p.linkedStudentIds, studentId] } : p))
          );
        }
      } else {
        const newParentId = `parent-${Date.now()}`;
        const newParent: ParentAccount = {
          id: newParentId,
          name: studentData.parentName || `Parent of ${studentData.name || 'Student'}`,
          email: `${studentData.name?.toLowerCase().replace(/\s+/g, '.') || 'parent'}@example.com`,
          phone: studentData.parentPhone || '+91 98000 00000',
          whatsappNumber: studentData.parentPhone || '+91 98000 00000',
          relationship: 'guardian',
          linkedStudentIds: [studentId],
          subscriptionStatus: 'pending',
          subscriptionPlan: 'Monthly Academic Plan (₹50)',
          balanceDue: 50,
          totalPaid: 0,
          reminderCount: 0,
          isNew: true,
          registrationDate: new Date().toISOString().split('T')[0],
          status: 'new',
          notes: 'Auto-registered via Student Sign-up.',
        };
        setParents((prev) => [newParent, ...prev]);
        parentId = newParentId;
      }
    }

    const newStudent: StudentProfile = {
      id: studentId,
      name: studentData.name || 'New Learner',
      studentCode,
      avatar: studentData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      age: studentData.age || (studentData.gradeId ? studentData.gradeId + 5 : 9),
      gradeId: studentData.gradeId || selectedGradeId || 3,
      boardId: studentData.boardId || selectedBoardId || 'cbse',
      streamId: studentData.streamId,
      schoolType: studentData.schoolType || 'Day School',
      preferredLanguage: studentData.preferredLanguage || 'English',
      interests: studentData.interests || ['General Science', 'Math Puzzles'],
      dailyGoalMinutes: studentData.dailyGoalMinutes || 30,
      streakDays: 1,
      totalPoints: 100,
      masteryBySubject: studentData.masteryBySubject || { 'g3-math': 65, 'g3-eng': 70 },
      chapterMastery: {},
      weakTopicIds: [],
      strongTopicIds: [],
      learningStyleSignals: ['Visual diagrams', 'Guided practice'],
      wpmReadingSpeed: (studentData.gradeId || 3) * 20 + 20,
      masteredVocabularyCount: 15,
      recentActivityIds: [],
      lastActive: 'Just registered',
      parentId,
      parentName: studentData.parentName,
      parentPhone: studentData.parentPhone,
      email: studentData.email || `${studentData.name?.toLowerCase().replace(/\s+/g, '.') || 'student'}@deshna.hub`,
      subscriptionStatus: 'pending',
      subscriptionFee: 50,
      balanceDue: 50,
      totalPaid: 0,
      isNew: true,
      registeredDate: new Date().toISOString().split('T')[0],
      status: 'new',
      notes: studentData.notes,
    };

    // Auto-create initial 50 INR transaction
    const newTx: FinancialTransaction = {
      id: `tx-${Date.now()}`,
      transactionType: 'subscription_fee',
      studentId: newStudent.id,
      studentName: newStudent.name,
      parentId,
      parentName: newStudent.parentName,
      parentPhone: newStudent.parentPhone || '+91 98000 00000',
      grade: newStudent.gradeId,
      board: (newStudent.boardId || 'CBSE').toUpperCase(),
      amount: 50,
      currency: 'INR',
      status: 'pending',
      description: 'First Month AI Learning Hub Subscription (₹50 INR)',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      reminderCount: 0,
    };

    setAllStudents((prev) => [newStudent, ...prev]);
    setFinancialTransactions((prev) => [newTx, ...prev]);
    setCurrentStudent(newStudent);
    return newStudent;
  };

  const updateStudent = (studentId: string, updates: Partial<StudentProfile>) => {
    setAllStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, ...updates, isNew: false } : s))
    );
    if (currentStudent.id === studentId) {
      setCurrentStudent((prev) => ({ ...prev, ...updates }));
    }
  };

  const deleteStudent = (studentId: string) => {
    setAllStudents((prev) => prev.filter((s) => s.id !== studentId));
    setParents((prev) =>
      prev.map((p) => ({
        ...p,
        linkedStudentIds: p.linkedStudentIds.filter((id) => id !== studentId),
      }))
    );
  };

  // Parent CRUD Operations
  const addParent = (parentData: Partial<ParentAccount>): ParentAccount => {
    const parentId = parentData.id || `parent-${Date.now()}`;
    const newParent: ParentAccount = {
      id: parentId,
      name: parentData.name || 'Parent User',
      email: parentData.email || `parent.${Date.now()}@example.com`,
      phone: parentData.phone || '+91 98000 00000',
      whatsappNumber: parentData.whatsappNumber || parentData.phone || '+91 98000 00000',
      relationship: parentData.relationship || 'mother',
      linkedStudentIds: parentData.linkedStudentIds || [],
      subscriptionStatus: parentData.subscriptionStatus || 'pending',
      subscriptionPlan: parentData.subscriptionPlan || 'Monthly Academic Plan (₹50)',
      balanceDue: parentData.balanceDue !== undefined ? parentData.balanceDue : 50,
      totalPaid: parentData.totalPaid || 0,
      reminderCount: 0,
      isNew: true,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'new',
      notes: parentData.notes,
    };

    setParents((prev) => [newParent, ...prev]);
    return newParent;
  };

  const updateParent = (parentId: string, updates: Partial<ParentAccount>) => {
    setParents((prev) =>
      prev.map((p) => (p.id === parentId ? { ...p, ...updates, isNew: false } : p))
    );
  };

  const deleteParent = (parentId: string) => {
    setParents((prev) => prev.filter((p) => p.id !== parentId));
  };

  // Financial Actions: Add 50 INR Subscription Fee
  const addSubscriptionFee = (studentId: string, amount: number = 50, description?: string) => {
    const student = allStudents.find((s) => s.id === studentId);
    if (!student) return;

    const parent = parents.find((p) => p.id === student.parentId || p.linkedStudentIds.includes(studentId));

    const newTx: FinancialTransaction = {
      id: `tx-${Date.now()}`,
      transactionType: 'manual_add',
      studentId: student.id,
      studentName: student.name,
      parentId: parent?.id,
      parentName: parent?.name || student.parentName,
      parentPhone: parent?.phone || student.parentPhone || '+91 98000 00000',
      grade: student.gradeId,
      board: student.boardId.toUpperCase(),
      amount,
      currency: 'INR',
      status: 'pending',
      description: description || `Monthly AI Learning Hub Subscription Fee (₹${amount} INR)`,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      reminderCount: 0,
    };

    setFinancialTransactions((prev) => [newTx, ...prev]);

    // Update Student Balance
    setAllStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              balanceDue: (s.balanceDue || 0) + amount,
              subscriptionStatus: 'pending',
            }
          : s
      )
    );

    // Update Parent Balance
    if (parent) {
      setParents((prev) =>
        prev.map((p) =>
          p.id === parent.id
            ? {
                ...p,
                balanceDue: (p.balanceDue || 0) + amount,
                subscriptionStatus: 'pending',
              }
            : p
        )
      );
    }
  };

  // Bulk Add 50 INR to all active students
  const bulkAddSubscriptionFee = (amount: number = 50): number => {
    let billedCount = 0;
    const newTransactions: FinancialTransaction[] = [];

    allStudents.forEach((student) => {
      if (student.status !== 'suspended') {
        billedCount++;
        const parent = parents.find((p) => p.id === student.parentId || p.linkedStudentIds.includes(student.id));
        newTransactions.push({
          id: `tx-bulk-${Date.now()}-${student.id}`,
          transactionType: 'subscription_fee',
          studentId: student.id,
          studentName: student.name,
          parentId: parent?.id,
          parentName: parent?.name || student.parentName,
          parentPhone: parent?.phone || student.parentPhone || '+91 98000 00000',
          grade: student.gradeId,
          board: student.boardId.toUpperCase(),
          amount,
          currency: 'INR',
          status: 'pending',
          description: `Monthly AI Learning Hub Renewal (₹${amount} INR)`,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          createdAt: new Date().toISOString(),
          reminderCount: 0,
        });
      }
    });

    if (newTransactions.length > 0) {
      setFinancialTransactions((prev) => [...newTransactions, ...prev]);
      setAllStudents((prev) =>
        prev.map((s) => ({
          ...s,
          balanceDue: (s.balanceDue || 0) + amount,
          subscriptionStatus: 'pending',
        }))
      );
      setParents((prev) =>
        prev.map((p) => ({
          ...p,
          balanceDue: (p.balanceDue || 0) + amount * (p.linkedStudentIds.length || 1),
          subscriptionStatus: 'pending',
        }))
      );
    }

    return billedCount;
  };

  const markSubscriptionPaid = (transactionId: string, paymentMethod: string = 'UPI', reference?: string) => {
    const tx = financialTransactions.find((t) => t.id === transactionId);
    if (!tx || tx.status === 'paid') return;

    setFinancialTransactions((prev) =>
      prev.map((t) =>
        t.id === transactionId
          ? {
              ...t,
              status: 'paid',
              paidAt: new Date().toISOString(),
              paymentMethod: paymentMethod as any,
              paymentReference: reference || `UPI/REF/${Date.now().toString().slice(-8)}`,
            }
          : t
      )
    );

    // Reduce student balance
    setAllStudents((prev) =>
      prev.map((s) => {
        if (s.id === tx.studentId) {
          const newBal = Math.max(0, (s.balanceDue || 0) - tx.amount);
          return {
            ...s,
            balanceDue: newBal,
            totalPaid: (s.totalPaid || 0) + tx.amount,
            subscriptionStatus: newBal === 0 ? 'active' : 'pending',
          };
        }
        return s;
      })
    );

    // Reduce parent balance
    if (tx.parentId) {
      setParents((prev) =>
        prev.map((p) => {
          if (p.id === tx.parentId) {
            const newBal = Math.max(0, (p.balanceDue || 0) - tx.amount);
            return {
              ...p,
              balanceDue: newBal,
              totalPaid: (p.totalPaid || 0) + tx.amount,
              subscriptionStatus: newBal === 0 ? 'active' : 'pending',
            };
          }
          return p;
        })
      );
    }
  };

  // Send WhatsApp Reminder Link Generator
  const sendWhatsAppReminder = (
    targetId: string,
    customMessage?: string
  ): { whatsappUrl: string; message: string; phone: string } => {
    // Target can be studentId or parentId or transactionId
    const student = allStudents.find((s) => s.id === targetId);
    const parent = parents.find((p) => p.id === targetId || (student && p.linkedStudentIds.includes(student.id)));
    const tx = financialTransactions.find((t) => t.id === targetId || (student && t.studentId === student.id && t.status !== 'paid'));

    const studentName = student?.name || tx?.studentName || 'Student';
    const parentName = parent?.name || student?.parentName || 'Respected Parent';
    const rawPhone = parent?.phone || student?.parentPhone || tx?.parentPhone || '919876543210';
    const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
    const amount = tx?.amount || student?.balanceDue || 50;
    const grade = student?.gradeId || tx?.grade || 3;
    const board = (student?.boardId || tx?.board || 'CBSE').toUpperCase();

    const timestamp = new Date().toISOString();

    // Increment reminder counter on student & parent & tx
    if (student) {
      setAllStudents((prev) =>
        prev.map((s) =>
          s.id === student.id
            ? { ...s, lastActive: 'Reminder sent', isNew: false }
            : s
        )
      );
    }

    if (parent) {
      setParents((prev) =>
        prev.map((p) =>
          p.id === parent.id
            ? {
                ...p,
                reminderCount: (p.reminderCount || 0) + 1,
                lastReminderSentAt: timestamp,
                isNew: false,
              }
            : p
        )
      );
    }

    if (tx) {
      setFinancialTransactions((prev) =>
        prev.map((t) =>
          t.id === tx.id
            ? {
                ...t,
                reminderCount: (t.reminderCount || 0) + 1,
                lastReminderSentAt: timestamp,
              }
            : t
        )
      );
    }

    const defaultMsg = `🌟 *DESHNA AI LEARNING HUB* 📚\n\n` +
      `Namaste ${parentName} ji!\n\n` +
      `This is a friendly reminder regarding the monthly academic subscription for *${studentName}* (Grade ${grade}, ${board}).\n\n` +
      `💳 *Pending Subscription Amount*: *₹${amount} INR*\n` +
      `📅 *Due Date*: ${tx?.dueDate || 'Immediate'}\n` +
      `✨ *Services Included*: 24/7 AI Tutor, Step-by-Step Doubt Solver, AI Reading Coach, Daily Mastery Quizzes & Parent Progress Reports.\n\n` +
      `📲 *Quick Payment via UPI*:\n` +
      `• UPI ID: \`deshna.edu@upi\`\n` +
      `• GooglePay / PhonePe / Paytm / WhatsApp Pay\n\n` +
      `Kindly complete the payment of *₹${amount} INR* to keep ${studentName}'s learning streak uninterrupted.\n\n` +
      `_Deshna AI Learning Hub Support: +91-9876543210_`;

    const message = customMessage || defaultMsg;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    return { whatsappUrl, message, phone: cleanPhone };
  };

  // Curriculum State (Saved to localStorage for complete CMS persistence)
  const [boards, setBoards] = useState<Board[]>(() => {
    try {
      const saved = localStorage.getItem('eduvate_boards');
      return saved ? JSON.parse(saved) : BOARDS;
    } catch {
      return BOARDS;
    }
  });

  const [grades, setGrades] = useState<Grade[]>(() => {
    try {
      const saved = localStorage.getItem('eduvate_grades');
      return saved ? JSON.parse(saved) : GRADES;
    } catch {
      return GRADES;
    }
  });

  const [categories, setCategories] = useState<SubjectCategory[]>(() => {
    try {
      const saved = localStorage.getItem('eduvate_categories');
      return saved ? JSON.parse(saved) : MASTER_CATEGORIES;
    } catch {
      return MASTER_CATEGORIES;
    }
  });

  const [streams, setStreams] = useState<StreamMaster[]>(() => {
    try {
      const saved = localStorage.getItem('eduvate_streams');
      return saved ? JSON.parse(saved) : MASTER_STREAMS;
    } catch {
      return MASTER_STREAMS;
    }
  });

  const [subjectMappings, setSubjectMappings] = useState<SubjectMapping[]>(() => {
    try {
      const saved = localStorage.getItem('eduvate_mappings');
      return saved ? JSON.parse(saved) : DEFAULT_SUBJECT_MAPPINGS;
    } catch {
      return DEFAULT_SUBJECT_MAPPINGS;
    }
  });

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    try {
      const saved = localStorage.getItem('eduvate_subjects');
      return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
    } catch {
      return INITIAL_SUBJECTS;
    }
  });

  const [chapters, setChapters] = useState<Chapter[]>(() => {
    try {
      const saved = localStorage.getItem('eduvate_chapters');
      return saved ? JSON.parse(saved) : INITIAL_CHAPTERS;
    } catch {
      return INITIAL_CHAPTERS;
    }
  });

  const [topics, setTopics] = useState<Topic[]>(INITIAL_TOPICS);
  const [lessons, setLessons] = useState<Lesson[]>(INITIAL_LESSONS);
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [stories] = useState<ReadingStory[]>(INITIAL_STORIES);
  const [vocabulary, setVocabulary] = useState<VocabularyWord[]>(INITIAL_VOCABULARY);
  const [revisionItems, setRevisionItems] = useState<RevisionItem[]>(INITIAL_REVISION_ITEMS);
  const [badges, setBadges] = useState<Badge[]>(BADGES);
  const [teacherClasses, setTeacherClasses] = useState<TeacherClass[]>(TEACHER_CLASSES);
  const [analytics] = useState<PlatformAnalytics>(INITIAL_ANALYTICS);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('eduvate_boards', JSON.stringify(boards));
      localStorage.setItem('eduvate_grades', JSON.stringify(grades));
      localStorage.setItem('eduvate_categories', JSON.stringify(categories));
      localStorage.setItem('eduvate_streams', JSON.stringify(streams));
      localStorage.setItem('eduvate_mappings', JSON.stringify(subjectMappings));
      localStorage.setItem('eduvate_subjects', JSON.stringify(subjects));
      localStorage.setItem('eduvate_chapters', JSON.stringify(chapters));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [boards, grades, categories, streams, subjectMappings, subjects, chapters]);

  // Relational Filtering Method: Get subjects for given board, grade, and optional stream
  const getFilteredSubjects = (boardId?: string, gradeId?: number, streamId?: string): Subject[] => {
    const bId = boardId || selectedBoardId;
    const gId = gradeId !== undefined ? gradeId : selectedGradeId;
    const sId = streamId || selectedStreamId;

    // First check relational mappings
    const activeMappings = subjectMappings.filter((m) => {
      if (!m.isActive) return false;
      const boardMatch = m.boardId === 'all' || m.boardId === bId;
      const gradeMatch = m.gradeId === gId;
      const streamMatch = !m.streamId || m.streamId === 'general' || m.streamId === sId;
      return boardMatch && gradeMatch && streamMatch;
    });

    if (activeMappings.length > 0) {
      const mappedSubjectIds = new Set(activeMappings.map((m) => m.subjectId));
      return subjects.filter((s) => mappedSubjectIds.has(s.id) && s.isActive !== false);
    }

    // Fallback if no specific mapping exists: filter subjects by grade and stream
    return subjects.filter((s) => {
      if (s.isActive === false) return false;
      const gradeMatch = s.gradeId === gId;
      if (gId >= 11) {
        return gradeMatch && (!s.streamId || s.streamId === 'general' || s.streamId === sId);
      }
      return gradeMatch;
    });
  };

  // Get chapters for subject (auto-provisioning if subject is newly created or in catalogue)
  const getChaptersForSubject = (subjectId: string): Chapter[] => {
    const existing = chapters.filter((c) => c.subjectId === subjectId);
    if (existing.length > 0) return existing;

    const sub = subjects.find((s) => s.id === subjectId);
    if (sub) {
      const generated = generateDefaultChaptersForSubject(
        sub.id,
        sub.name,
        sub.gradeId,
        sub.boardId || selectedBoardId
      );
      // store in chapters state
      setChapters((prev) => [...prev, ...generated]);
      return generated;
    }
    return [];
  };

  // Daily Plan State
  const [dailyPlan, setDailyPlan] = useState<DailyPlan>(
    INITIAL_DAILY_PLANS['student-alex'] || {
      id: 'plan-default',
      studentId: currentStudent.id,
      date: new Date().toISOString().split('T')[0],
      totalMinutes: 30,
      summary: 'Personalized Daily Mastery Plan',
      items: [],
    }
  );

  // AI Tutor Drawer State
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [aiTutorContext, setAiTutorContext] = useState<{ subject?: string; chapter?: string; topic?: string } | null>(null);

  // Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Speech synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = (text: string, langCode?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = currentStudent.gradeId <= 3 ? 0.85 : 0.95;
    utterance.pitch = currentStudent.gradeId <= 3 ? 1.1 : 1.0;
    
    // Set speech synthesis language
    const currentLangObj = INDIAN_LANGUAGES.find((l) => l.code === (langCode || selectedLanguage));
    if (currentLangObj?.speechCode) {
      utterance.lang = currentLangObj.speechCode;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Switch student
  const switchStudent = (studentId: string) => {
    const student = allStudents.find((s) => s.id === studentId);
    if (student) {
      setCurrentStudent(student);
      setSelectedGradeId(student.gradeId);
      setSelectedBoardId(student.boardId);
      setSelectedStreamId(student.streamId);
      const subList = getFilteredSubjects(student.boardId, student.gradeId, student.streamId);
      if (subList.length > 0) {
        setSelectedSubjectId(subList[0].id);
        const chapList = getChaptersForSubject(subList[0].id);
        setSelectedChapterId(chapList.length > 0 ? chapList[0].id : null);
      }
    }
  };

  // Sync role changes
  useEffect(() => {
    if (currentRole === 'parent') {
      setActiveView('parent_dashboard');
    } else if (currentRole === 'teacher') {
      setActiveView('teacher_dashboard');
    } else if (currentRole === 'admin') {
      setActiveView('admin_dashboard');
    }
  }, [currentRole]);

  // Award points & check streak
  const awardPoints = (points: number, reason?: string) => {
    setCurrentStudent((prev) => {
      const updated = {
        ...prev,
        totalPoints: prev.totalPoints + points,
      };
      setAllStudents((list) => list.map((s) => (s.id === prev.id ? updated : s)));
      return updated;
    });
  };

  // Update Mastery
  const updateStudentMastery = (subjectId: string, chapterId: string, topicId: string, isCorrect: boolean) => {
    setCurrentStudent((prev) => {
      const curSubjectMastery = prev.masteryBySubject[subjectId] || 60;
      const curChapterMastery = prev.chapterMastery[chapterId] || 60;
      const delta = isCorrect ? 3 : -2;

      const newSubjMastery = Math.min(100, Math.max(10, curSubjectMastery + delta));
      const newChapMastery = Math.min(100, Math.max(10, curChapterMastery + delta));

      let newWeak = [...prev.weakTopicIds];
      let newStrong = [...prev.strongTopicIds];

      if (!isCorrect) {
        if (!newWeak.includes(topicId)) newWeak.push(topicId);
        newStrong = newStrong.filter((id) => id !== topicId);
      } else {
        newWeak = newWeak.filter((id) => id !== topicId);
        if (!newStrong.includes(topicId)) newStrong.push(topicId);
      }

      const updated: StudentProfile = {
        ...prev,
        masteryBySubject: { ...prev.masteryBySubject, [subjectId]: newSubjMastery },
        chapterMastery: { ...prev.chapterMastery, [chapterId]: newChapMastery },
        weakTopicIds: newWeak,
        strongTopicIds: newStrong,
      };

      setAllStudents((list) => list.map((s) => (s.id === prev.id ? updated : s)));
      return updated;
    });
  };

  // Daily plan duration update
  const setDailyPlanMinutes = async (minutes: number) => {
    try {
      const currentSubjects = getFilteredSubjects();
      const res = await fetch('/api/ai/adaptive-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: currentStudent.name,
          grade: currentStudent.gradeId,
          board: currentStudent.boardId,
          targetMinutes: minutes,
          subjects: currentSubjects,
          weakTopics: currentStudent.weakTopicIds,
          strongTopics: currentStudent.strongTopicIds,
        }),
      });
      const resJson = await res.json();
      if (resJson.data && resJson.data.items) {
        setDailyPlan({
          id: `plan-${Date.now()}`,
          studentId: currentStudent.id,
          date: new Date().toISOString().split('T')[0],
          totalMinutes: minutes,
          summary: resJson.data.summary || `${currentStudent.name}'s ${minutes}-minute Focused Plan`,
          items: resJson.data.items.map((it: any) => ({
            ...it,
            completed: false,
            subjectId: it.subjectId || selectedSubjectId || 'g3-math',
            chapterId: selectedChapterId || 'ch-g3-m5',
            topicId: it.topicId || 'top-1',
          })),
        });
      }
    } catch (e) {
      console.warn('Adaptive plan request fallback', e);
    }
  };

  const toggleDailyPlanItem = (itemId: string) => {
    setDailyPlan((prev) => {
      const updatedItems = prev.items.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      const completedNow = updatedItems.find((it) => it.id === itemId)?.completed;
      if (completedNow) {
        awardPoints(30, 'Completed Daily Learning Plan Goal');
      }
      return { ...prev, items: updatedItems };
    });
  };

  // Open AI tutor with context
  const openAITutorWithContext = (ctx?: { subject?: string; chapter?: string; topic?: string }) => {
    if (ctx) {
      setAiTutorContext(ctx);
    } else {
      const curSub = subjects.find((s) => s.id === selectedSubjectId);
      const curChap = chapters.find((c) => c.id === selectedChapterId);
      setAiTutorContext({
        subject: curSub?.name || 'Mathematics',
        chapter: curChap?.title || 'Fractions',
        topic: 'General Topic Inquiry',
      });
    }
    setIsAITutorOpen(true);
  };

  // Vocabulary operations
  const updateVocabStatus = (wordId: string, newStatus: VocabularyWord['status']) => {
    setVocabulary((list) =>
      list.map((v) =>
        v.id === wordId
          ? {
              ...v,
              status: newStatus,
              timesPracticed: v.timesPracticed + 1,
              timesCorrect: newStatus === 'mastered' ? v.timesCorrect + 1 : v.timesCorrect,
              lastReviewed: new Date().toISOString().split('T')[0],
            }
          : v
      )
    );
    awardPoints(15, 'Vocabulary Practice');
  };

  const addVocabularyWord = (word: Partial<VocabularyWord>) => {
    const newWord: VocabularyWord = {
      id: `voc-${Date.now()}`,
      word: word.word || 'New Term',
      meaning: word.meaning || 'Definition',
      phonetic: word.phonetic || '/-/',
      partOfSpeech: word.partOfSpeech || 'noun',
      exampleSentence: word.exampleSentence || 'Example sentence.',
      subjectId: word.subjectId || selectedSubjectId || 'g3-math',
      gradeId: word.gradeId || selectedGradeId || 3,
      status: 'new',
      timesPracticed: 0,
      timesCorrect: 0,
    };
    setVocabulary((list) => [newWord, ...list]);
  };

  // Spaced revision
  const markRevisionDone = (revId: string, rating: 'easy' | 'good' | 'hard') => {
    setRevisionItems((list) =>
      list.map((item) => {
        if (item.id !== revId) return item;
        let nextDays = item.intervalDays * (rating === 'easy' ? 2.5 : rating === 'good' ? 1.8 : 1.2);
        nextDays = Math.max(1, Math.round(nextDays));
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + nextDays);

        return {
          ...item,
          status: rating === 'easy' && item.repetitionCount >= 3 ? 'mastered' : 'upcoming',
          lastStudied: new Date().toISOString().split('T')[0],
          nextRevisionDate: nextDate.toISOString().split('T')[0],
          intervalDays: nextDays,
          repetitionCount: item.repetitionCount + 1,
        };
      })
    );
    awardPoints(25, 'Spaced Revision Card Review');
  };

  const addTopicToRevision = (topicId: string, topicTitle: string, subjectId: string, subjectName: string) => {
    const existing = revisionItems.find((r) => r.topicId === topicId && r.studentId === currentStudent.id);
    if (!existing) {
      const newItem: RevisionItem = {
        id: `rev-${Date.now()}`,
        studentId: currentStudent.id,
        topicId,
        topicTitle,
        subjectId,
        subjectName,
        chapterNumber: 1,
        lastStudied: new Date().toISOString().split('T')[0],
        nextRevisionDate: new Date().toISOString().split('T')[0],
        intervalDays: 1,
        repetitionCount: 1,
        status: 'due',
        keyPoints: [`Core concept reinforcement for ${topicTitle}`],
      };
      setRevisionItems((list) => [newItem, ...list]);
    }
  };

  // CMS functions: Subjects
  const addSubject = (subj: Subject) => setSubjects((list) => [...list, subj]);
  const updateSubject = (subj: Subject) => setSubjects((list) => list.map((s) => (s.id === subj.id ? subj : s)));
  const deleteSubject = (subjId: string) => setSubjects((list) => list.filter((s) => s.id !== subjId));
  const toggleSubjectStatus = (subjId: string) =>
    setSubjects((list) =>
      list.map((s) => (s.id === subjId ? { ...s, isActive: s.isActive === false ? true : false } : s))
    );

  // CMS functions: Categories
  const addCategory = (cat: SubjectCategory) => setCategories((list) => [...list, cat]);
  const updateCategory = (cat: SubjectCategory) => setCategories((list) => list.map((c) => (c.id === cat.id ? cat : c)));
  const deleteCategory = (catId: string) => setCategories((list) => list.filter((c) => c.id !== catId));

  // CMS functions: Streams
  const addStreamMaster = (str: StreamMaster) => setStreams((list) => [...list, str]);
  const updateStreamMaster = (str: StreamMaster) => setStreams((list) => list.map((s) => (s.id === str.id ? str : s)));
  const deleteStreamMaster = (strId: string) => setStreams((list) => list.filter((s) => s.id !== strId));

  // CMS functions: Subject Mappings
  const addSubjectMapping = (map: SubjectMapping) => setSubjectMappings((list) => [...list, map]);
  const updateSubjectMapping = (map: SubjectMapping) =>
    setSubjectMappings((list) => list.map((m) => (m.id === map.id ? map : m)));
  const deleteSubjectMapping = (mapId: string) => setSubjectMappings((list) => list.filter((m) => m.id !== mapId));
  const toggleSubjectMappingStatus = (mapId: string) =>
    setSubjectMappings((list) =>
      list.map((m) => (m.id === mapId ? { ...m, isActive: !m.isActive } : m))
    );

  // CMS functions: Boards
  const addBoard = (board: Board) => setBoards((list) => [...list, board]);
  const updateBoard = (board: Board) => setBoards((list) => list.map((b) => (b.id === board.id ? board : b)));
  const deleteBoard = (boardId: string) => setBoards((list) => list.filter((b) => b.id !== boardId));

  // CMS functions: Grades
  const addGrade = (grade: Grade) => setGrades((list) => [...list, grade]);
  const updateGrade = (grade: Grade) => setGrades((list) => list.map((g) => (g.id === grade.id ? grade : g)));
  const deleteGrade = (gradeId: number) => setGrades((list) => list.filter((g) => g.id !== gradeId));

  // CMS functions: Chapters
  const addChapter = (chap: Chapter) => setChapters((list) => [...list, chap]);
  const updateChapter = (chap: Chapter) => setChapters((list) => list.map((c) => (c.id === chap.id ? chap : c)));
  const deleteChapter = (chapId: string) => setChapters((list) => list.filter((c) => c.id !== chapId));

  // CMS functions: Questions
  const addQuestion = (q: Question) => setQuestions((list) => [q, ...list]);
  const updateQuestion = (q: Question) => setQuestions((list) => list.map((item) => (item.id === q.id ? q : item)));
  const deleteQuestion = (qId: string) => setQuestions((list) => list.filter((item) => item.id !== qId));

  // Reset CMS to default seed
  const resetAcademicToDefaults = () => {
    localStorage.removeItem('eduvate_boards');
    localStorage.removeItem('eduvate_grades');
    localStorage.removeItem('eduvate_categories');
    localStorage.removeItem('eduvate_streams');
    localStorage.removeItem('eduvate_mappings');
    localStorage.removeItem('eduvate_subjects');
    localStorage.removeItem('eduvate_chapters');
    setBoards(BOARDS);
    setGrades(GRADES);
    setCategories(MASTER_CATEGORIES);
    setStreams(MASTER_STREAMS);
    setSubjectMappings(DEFAULT_SUBJECT_MAPPINGS);
    setSubjects(INITIAL_SUBJECTS);
    setChapters(INITIAL_CHAPTERS);
  };

  const importQuestionsCSV = (csvText: string): number => {
    try {
      const lines = csvText.split('\n').filter((l) => l.trim().length > 0);
      if (lines.length <= 1) return 0;
      let count = 0;
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',').map((p) => p.trim());
        if (parts.length >= 4) {
          const newQ: Question = {
            id: `q-csv-${Date.now()}-${i}`,
            topicId: 'top-general',
            chapterId: selectedChapterId || 'ch-g3-m5',
            subjectId: selectedSubjectId || 'g3-math',
            gradeId: selectedGradeId,
            boardId: selectedBoardId,
            difficulty: (parts[2] as any) || 'medium',
            questionType: (parts[3] as any) || 'mcq',
            text: parts[0] || 'Imported Question',
            options: parts[4] ? parts[4].split('|') : ['A', 'B', 'C', 'D'],
            correctAnswer: parts[1] || 'A',
            explanation: parts[5] || 'Concept explanation from imported curriculum question bank.',
            hints: ['Review chapter rules carefully.'],
            status: 'draft',
          };
          addQuestion(newQ);
          count++;
        }
      }
      return count;
    } catch {
      return 0;
    }
  };

  const exportQuestionsCSV = (): string => {
    const header = 'Text,CorrectAnswer,Difficulty,QuestionType,Options,Explanation\n';
    const rows = questions.map((q) => {
      const opts = q.options ? q.options.join('|') : '';
      return `"${q.text.replace(/"/g, '""')}","${q.correctAnswer}","${q.difficulty}","${q.questionType}","${opts}","${q.explanation.replace(/"/g, '""')}"`;
    });
    return header + rows.join('\n');
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeView,
        setActiveView,
        selectedBoardId,
        setSelectedBoardId,
        selectedGradeId,
        setSelectedGradeId,
        selectedStreamId,
        setSelectedStreamId,
        selectedSubjectId,
        setSelectedSubjectId,
        selectedChapterId,
        setSelectedChapterId,
        currentStudent,
        setCurrentStudent,
        allStudents,
        parents,
        financialTransactions,
        switchStudent,
        updateStudentMastery,
        awardPoints,
        addStudent,
        updateStudent,
        deleteStudent,
        addParent,
        updateParent,
        deleteParent,
        addSubscriptionFee,
        bulkAddSubscriptionFee,
        markSubscriptionPaid,
        sendWhatsAppReminder,
        isAutoRefreshEnabled,
        setIsAutoRefreshEnabled,
        lastAutoRefreshedAt,
        refreshStudentParentDatabase,
        isLoginModalOpen,
        loginModalDefaultTab,
        openLoginModal,
        closeLoginModal,
        dailyPlan,
        setDailyPlanMinutes,
        toggleDailyPlanItem,
        boards,
        grades,
        categories,
        streams,
        subjectMappings,
        subjects,
        chapters,
        topics,
        lessons,
        questions,
        stories,
        vocabulary,
        revisionItems,
        badges,
        teacherClasses,
        analytics,
        getFilteredSubjects,
        getChaptersForSubject,
        addSubject,
        updateSubject,
        deleteSubject,
        toggleSubjectStatus,
        addCategory,
        updateCategory,
        deleteCategory,
        addStreamMaster,
        updateStreamMaster,
        deleteStreamMaster,
        addSubjectMapping,
        updateSubjectMapping,
        deleteSubjectMapping,
        toggleSubjectMappingStatus,
        addBoard,
        updateBoard,
        deleteBoard,
        addGrade,
        updateGrade,
        deleteGrade,
        addChapter,
        updateChapter,
        deleteChapter,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        importQuestionsCSV,
        exportQuestionsCSV,
        resetAcademicToDefaults,
        updateVocabStatus,
        addVocabularyWord,
        markRevisionDone,
        addTopicToRevision,
        isAITutorOpen,
        setIsAITutorOpen,
        aiTutorContext,
        openAITutorWithContext,
        isSearchOpen,
        setIsSearchOpen,
        selectedLanguage,
        setSelectedLanguage,
        availableLanguages: INDIAN_LANGUAGES,
        t,
        localizeSubject,
        localizeChapter,
        localizeTopic,
        localizeQuestion,
        speakText,
        stopSpeaking,
        isSpeaking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

