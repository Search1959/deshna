import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  StudentProfile,
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
  INITIAL_DAILY_PLANS,
  INITIAL_REVISION_ITEMS,
  BADGES,
  TEACHER_CLASSES,
  INITIAL_ANALYTICS,
} from '../data/mockData';

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

  // Current Student & Profiles
  currentStudent: StudentProfile;
  setCurrentStudent: (student: StudentProfile) => void;
  allStudents: StudentProfile[];
  switchStudent: (studentId: string) => void;
  updateStudentMastery: (subjectId: string, chapterId: string, topicId: string, isCorrect: boolean) => void;
  awardPoints: (points: number, reason?: string) => void;

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

  // Speech Helper
  speakText: (text: string) => void;
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

  // Student State
  const [allStudents, setAllStudents] = useState<StudentProfile[]>(DEMO_STUDENTS);
  const [currentStudent, setCurrentStudent] = useState<StudentProfile>(DEMO_STUDENTS[0]);

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

  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = currentStudent.gradeId <= 3 ? 0.85 : 0.95;
    utterance.pitch = currentStudent.gradeId <= 3 ? 1.1 : 1.0;
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
        switchStudent,
        updateStudentMastery,
        awardPoints,
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

