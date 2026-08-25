/**
 * DESHNA AI LEARNING HUB - Core TypeScript Definitions
 * "Learn Smarter. Practice Better. Grow Every Day."
 */

export type UserRole = 'student' | 'parent' | 'teacher' | 'admin';

export type StageType = 'primary' | 'middle' | 'secondary' | 'senior_secondary';

export type StreamType = 'science' | 'commerce' | 'humanities' | 'arts' | 'vocational' | 'general';

export type SubjectCategoryType =
  | 'LANGUAGES'
  | 'MATHEMATICS'
  | 'SCIENCE'
  | 'SOCIAL_SCIENCE'
  | 'COMMERCE'
  | 'COMPUTER_TECH'
  | 'GK_SKILLS'
  | 'ARTS_CREATIVE'
  | 'PHYSICAL_EDUCATION'
  | 'VOCATIONAL_OPTIONAL'
  | 'COMPETITIVE_ADVANCED';

export type SubjectKind = 'CORE' | 'OPTIONAL' | 'ENRICHMENT' | 'COMPETITIVE' | 'VOCATIONAL';

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'advanced';

export type QuestionType =
  | 'mcq'
  | 'multiple_select'
  | 'true_false'
  | 'fill_blank'
  | 'short_answer'
  | 'numerical'
  | 'reasoning'
  | 'case_study'
  | 'diagram';

export type ContentStatus = 'draft' | 'under_review' | 'approved' | 'published';

export type VocabularyStatus = 'new' | 'learning' | 'review' | 'mastered';

export type ActivityType = 'learn' | 'practice' | 'revise' | 'reading' | 'test' | 'ask_ai';

export interface Board {
  id: string;
  code: string;
  name: string;
  description: string;
  isPopular?: boolean;
  isActive?: boolean;
  country?: string;
}

export interface Grade {
  id: number;
  name: string;
  stage: StageType;
  supportsStreams?: boolean;
  description: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface StreamMaster {
  id: string;
  code: StreamType;
  name: string;
  description: string;
  gradeFrom: number;
  gradeTo: number;
  isActive: boolean;
}

export interface SubjectCategory {
  id: string;
  code: SubjectCategoryType;
  name: string;
  description: string;
  icon: string;
  displayOrder: number;
  color: string;
  isActive: boolean;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  slug?: string;
  categoryId?: SubjectCategoryType | string;
  subjectType?: SubjectKind;
  iconName: string;
  gradeId: number;
  boardId: string;
  streamId?: StreamType;
  color: string;
  description: string;
  chaptersCount: number;
  totalQuestionsCount: number;
  ageGroup?: string;
  isCore?: boolean;
  isOptional?: boolean;
  isEnrichment?: boolean;
  isActive?: boolean;
}

export interface SubjectMapping {
  id: string;
  boardId: string;
  gradeId: number;
  streamId?: StreamType | string;
  subjectId: string;
  categoryId: SubjectCategoryType | string;
  isCore: boolean;
  isOptional: boolean;
  isEnrichment: boolean;
  displayOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Chapter {
  id: string;
  subjectId: string;
  gradeId: number;
  boardId: string;
  number: number;
  title: string;
  description: string;
  estMinutes: number;
  learningObjectives: string[];
  status: ContentStatus;
}

export interface Topic {
  id: string;
  chapterId: string;
  order: number;
  title: string;
  difficulty: DifficultyLevel;
  summary: string;
  keyConcepts: string[];
  formulas?: string[];
}

export interface LearningObjective {
  id: string;
  topicId: string;
  description: string;
  difficulty: DifficultyLevel;
  prerequisites: string[];
  skills: string[];
}

export interface LessonSection {
  title: string;
  content: string;
  analogy?: string;
  example?: string;
  checkQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface Lesson {
  id: string;
  chapterId: string;
  topicId: string;
  title: string;
  readingTimeMin: number;
  sections: LessonSection[];
  keyTakeaways: string[];
  status: ContentStatus;
}

export interface Question {
  id: string;
  topicId: string;
  chapterId: string;
  subjectId: string;
  gradeId: number;
  boardId: string;
  difficulty: DifficultyLevel;
  questionType: QuestionType;
  text: string;
  options?: string[];
  correctAnswer: string | string[] | number;
  explanation: string;
  hints: string[];
  stepByStepSolution?: string[];
  examRelevance?: string;
  diagramUrl?: string;
  status: ContentStatus;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'streak' | 'subject' | 'reading' | 'vocabulary' | 'mastery';
  unlockedAt?: string;
}

export type SubscriptionStatus = 'active' | 'pending' | 'overdue' | 'trial' | 'free' | 'expired';

export interface ParentAccount {
  id: string;
  name: string;
  email: string;
  phone: string; // WhatsApp Number e.g. +91 9876543210
  whatsappNumber?: string;
  relationship: 'father' | 'mother' | 'guardian';
  linkedStudentIds: string[]; // Child Student IDs
  subscriptionStatus: SubscriptionStatus;
  subscriptionPlan: string;
  balanceDue: number; // in INR e.g. 50
  totalPaid: number; // in INR
  lastReminderSentAt?: string;
  reminderCount: number;
  isNew?: boolean;
  registrationDate: string;
  notes?: string;
  status: 'active' | 'suspended' | 'new';
}

export interface FinancialTransaction {
  id: string;
  transactionType: 'subscription_fee' | 'payment_received' | 'adjustment' | 'manual_add';
  studentId: string;
  studentName: string;
  parentId?: string;
  parentName?: string;
  parentPhone: string;
  grade: number;
  board: string;
  amount: number; // INR
  currency: 'INR';
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  description: string;
  dueDate: string;
  createdAt: string;
  paidAt?: string;
  paymentMethod?: 'UPI' | 'Card' | 'NetBanking' | 'Cash' | 'WhatsApp Pay';
  paymentReference?: string;
  reminderCount: number;
  lastReminderSentAt?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  studentCode?: string; // e.g. DESH-2026-001
  avatar: string;
  age: number;
  gradeId: number;
  boardId: string;
  streamId?: StreamType;
  schoolType?: string;
  preferredLanguage: string;
  interests: string[];
  dailyGoalMinutes: number; // 15, 30, 45
  streakDays: number;
  totalPoints: number;
  masteryBySubject: Record<string, number>; // subjectId -> percentage
  chapterMastery: Record<string, number>; // chapterId -> percentage
  weakTopicIds: string[];
  strongTopicIds: string[];
  learningStyleSignals: string[];
  wpmReadingSpeed: number;
  masteredVocabularyCount: number;
  recentActivityIds: string[];
  examTarget?: string;
  lastActive: string;
  // Account & Parent Link
  parentId?: string;
  parentName?: string;
  parentPhone?: string; // WhatsApp Number
  email?: string;
  password?: string;
  subscriptionStatus?: SubscriptionStatus;
  subscriptionFee?: number; // default 50
  balanceDue?: number; // in INR e.g. 50
  totalPaid?: number;
  isNew?: boolean;
  registeredDate?: string;
  status?: 'active' | 'suspended' | 'new';
  notes?: string;
}

export interface DailyLearningItem {
  id: string;
  subjectId: string;
  subjectName: string;
  chapterId: string;
  topicId: string;
  topicTitle: string;
  activityType: ActivityType;
  durationMinutes: number;
  reason: string;
  completed: boolean;
}

export interface DailyPlan {
  id: string;
  studentId: string;
  date: string;
  totalMinutes: number;
  summary: string;
  items: DailyLearningItem[];
}

export interface RevisionItem {
  id: string;
  studentId: string;
  topicId: string;
  topicTitle: string;
  subjectId: string;
  subjectName: string;
  chapterNumber: number;
  lastStudied: string;
  nextRevisionDate: string;
  intervalDays: number;
  repetitionCount: number;
  status: 'due' | 'upcoming' | 'mastered';
  keyPoints: string[];
}

export interface VocabularyWord {
  id: string;
  word: string;
  meaning: string;
  phonetic: string;
  partOfSpeech: string;
  exampleSentence: string;
  subjectId: string;
  gradeId: number;
  status: VocabularyStatus;
  timesPracticed: number;
  timesCorrect: number;
  lastReviewed?: string;
}

export interface ReadingStory {
  id: string;
  gradeId: number;
  title: string;
  genre: string;
  language?: string; // e.g. 'English', 'Hindi', 'Marathi', etc.
  languageCode?: string; // e.g. 'en', 'hi', 'mr', 'gu', 'ta', 'bn', 'sa'
  passage: string;
  wordCount: number;
  targetWpm: number;
  difficultWords: string[];
  comprehensionQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface ReadingSessionRecord {
  id: string;
  studentId: string;
  storyId: string;
  storyTitle: string;
  language?: string;
  languageCode?: string;
  wpm: number;
  accuracy: number;
  durationSeconds: number;
  wordsSpoken?: number;
  wordsMatched?: number;
  totalWords?: number;
  status?: 'fluent' | 'developing' | 'needs_practice' | 'no_speech' | 'language_mismatch';
  transcriptSnippet?: string;
  struggledWords: string[];
  date: string;
}

export interface AssessmentResult {
  id: string;
  studentId: string;
  type: 'diagnostic' | 'chapter_test' | 'mock_exam';
  title: string;
  subjectId: string;
  subjectName: string;
  score: number;
  totalQuestions: number;
  accuracy: number;
  timeSpentSeconds: number;
  strongAreas: string[];
  weakAreas: string[];
  timeManagementAnalysis: string;
  recommendedNextSteps: string[];
  timestamp: string;
}

export interface DoubtSolution {
  originalQuestion: string;
  extractedQuestion?: string;
  understand: string;
  plan: string;
  solveSteps: string[];
  finalAnswer: string;
  check: string;
  keyTakeaway: string;
}

export interface ParentReport {
  studentId: string;
  studentName: string;
  title: string;
  period: string;
  weeklyStudyTimeMinutes: number;
  completedActivitiesCount: number;
  accuracyImprovementPct: number;
  whatImproved: string[];
  strongSubjects: string[];
  needsAttentionSubjects: string[];
  recommendedFocus: string;
  suggestedParentConversation: string;
  actionableParentTip: string;
  generatedAt: string;
}

export interface TeacherAssignment {
  id: string;
  classId: string;
  title: string;
  subjectId: string;
  chapterId: string;
  dueDate: string;
  type: 'chapter_study' | 'practice_set' | 'test';
  assignedStudentIds: string[];
  completedStudentIds: string[];
}

export interface TeacherClass {
  id: string;
  name: string;
  gradeId: number;
  boardId: string;
  subjectId: string;
  studentIds: string[];
  assignments: TeacherAssignment[];
}

export interface PlatformAnalytics {
  totalStudents: number;
  activeToday: number;
  totalParents: number;
  totalTeachers: number;
  totalLearningSessions: number;
  averageMasteryRate: number;
  aiDoubtsResolvedCount: number;
  readingPassagesCompleted: number;
  gradeDistribution: Record<number, number>;
  popularSubjects: { subject: string; learners: number; avgMastery: number }[];
}
