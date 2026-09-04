import { Board, Grade, StreamMaster, SubjectCategory, Subject, SubjectMapping } from '../types';
import { CBSE_SUBJECTS } from './boards/cbseSubjects';
import { ICSE_SUBJECTS } from './boards/icseSubjects';
import { WBBSE_SUBJECTS } from './boards/wbbseSubjects';
import { STATE_SUBJECTS } from './boards/stateSubjects';
import { CAMBRIDGE_SUBJECTS } from './boards/cambridgeSubjects';

export const MASTER_CATEGORIES: SubjectCategory[] = [
  {
    id: 'cat-languages',
    code: 'LANGUAGES',
    name: 'Languages & Literature',
    description: 'First, second, third, and foreign language communications, reading, and grammar.',
    icon: 'BookOpen',
    color: 'from-blue-500 to-indigo-600',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'cat-math',
    code: 'MATHEMATICS',
    name: 'Mathematics',
    description: 'Foundational arithmetic, algebra, geometry, trigonometry, and calculus.',
    icon: 'Calculator',
    color: 'from-amber-500 to-orange-600',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'cat-science',
    code: 'SCIENCE',
    name: 'Science & Environment',
    description: 'EVS, General Science, Physics, Chemistry, Biology, and Life Sciences.',
    icon: 'FlaskConical',
    color: 'from-emerald-500 to-teal-600',
    displayOrder: 3,
    isActive: true,
  },
  {
    id: 'cat-social',
    code: 'SOCIAL_SCIENCE',
    name: 'Social Science & Humanities',
    description: 'History, Geography, Civics, Political Science, Economics, and Sociology.',
    icon: 'Landmark',
    color: 'from-rose-500 to-pink-600',
    displayOrder: 4,
    isActive: true,
  },
  {
    id: 'cat-commerce',
    code: 'COMMERCE',
    name: 'Commerce & Business',
    description: 'Accountancy, Business Studies, Economics, Entrepreneurship, and Marketing.',
    icon: 'FileSpreadsheet',
    color: 'from-teal-600 to-emerald-700',
    displayOrder: 5,
    isActive: true,
  },
  {
    id: 'cat-computer',
    code: 'COMPUTER_TECH',
    name: 'Computer & Technology',
    description: 'Coding, BlueJ/Java, Python, AI, Cyber Safety, Computer Applications, and ICT.',
    icon: 'Monitor',
    color: 'from-purple-500 to-indigo-600',
    displayOrder: 6,
    isActive: true,
  },
  {
    id: 'cat-gk',
    code: 'GK_SKILLS',
    name: 'General Knowledge & Skills',
    description: 'GK, Logical Reasoning, Global Perspectives, Critical Thinking, and TOK.',
    icon: 'Globe',
    color: 'from-yellow-500 to-amber-600',
    displayOrder: 7,
    isActive: true,
  },
  {
    id: 'cat-arts',
    code: 'ARTS_CREATIVE',
    name: 'Arts & Creative Expression',
    description: 'Art & Craft, Fine Arts, Visual Arts, and Design Thinking.',
    icon: 'Sparkles',
    color: 'from-pink-500 to-rose-600',
    displayOrder: 8,
    isActive: true,
  },
  {
    id: 'cat-pe',
    code: 'PHYSICAL_EDUCATION',
    name: 'Physical Education & Yoga',
    description: 'Physical Fitness, Health Education, and Daily Yoga.',
    icon: 'Zap',
    color: 'from-cyan-500 to-blue-600',
    displayOrder: 9,
    isActive: true,
  },
  {
    id: 'cat-vocational',
    code: 'VOCATIONAL_OPTIONAL',
    name: 'Vocational & Applied',
    description: 'Information Technology, Applied Mathematics, and Commercial Applications.',
    icon: 'Briefcase',
    color: 'from-violet-500 to-purple-600',
    displayOrder: 10,
    isActive: true,
  },
  {
    id: 'cat-competitive',
    code: 'COMPETITIVE_ADVANCED',
    name: 'Competitive & Olympiads',
    description: 'Olympiad Math, Science, Reasoning, JEE/NEET Foundations, and Scholarships.',
    icon: 'Award',
    color: 'from-amber-600 to-red-600',
    displayOrder: 11,
    isActive: true,
  },
];

export const MASTER_STREAMS: StreamMaster[] = [
  {
    id: 'stream-sci',
    code: 'science',
    name: 'Science Stream',
    description: 'Physics, Chemistry, Mathematics, Biology, Computer Science / IP.',
    gradeFrom: 11,
    gradeTo: 12,
    isActive: true,
  },
  {
    id: 'stream-com',
    code: 'commerce',
    name: 'Commerce Stream',
    description: 'Accountancy, Business Studies, Economics, Entrepreneurship, Mathematics.',
    gradeFrom: 11,
    gradeTo: 12,
    isActive: true,
  },
  {
    id: 'stream-hum',
    code: 'humanities',
    name: 'Humanities / Arts Stream',
    description: 'History, Political Science, Geography, Economics, Sociology, Psychology.',
    gradeFrom: 11,
    gradeTo: 12,
    isActive: true,
  },
  {
    id: 'stream-voc',
    code: 'vocational',
    name: 'Vocational Stream',
    description: 'Applied technical, commercial, health, and design pathways.',
    gradeFrom: 9,
    gradeTo: 12,
    isActive: true,
  },
  {
    id: 'stream-gen',
    code: 'general',
    name: 'General Foundation',
    description: 'Integrated multi-disciplinary curriculum for Grades 1 to 10.',
    gradeFrom: 1,
    gradeTo: 10,
    isActive: true,
  },
];

export const BOARDS: Board[] = [
  { id: 'cbse', code: 'CBSE', name: 'Central Board of Secondary Education', description: 'National standard curriculum with NCERT alignment across all subjects.', isPopular: true, isActive: true, country: 'India' },
  { id: 'icse', code: 'ICSE / ISC', name: 'Council for the Indian School Certificate Examinations', description: 'Comprehensive, application-heavy curriculum with separate sciences and BlueJ/Java.', isPopular: true, isActive: true, country: 'India' },
  { id: 'wbbse', code: 'WB Board', name: 'West Bengal Board (WBBSE & WBCHSE)', description: 'State-aligned Madhyamik and Higher Secondary curriculum with strong Bengali and science focus.', isPopular: true, isActive: true, country: 'India (West Bengal)' },
  { id: 'state', code: 'State Boards', name: 'State Education Boards (Universal / SSC / HSC)', description: 'Universal state board syllabus covering Algebra/Geometry, Science & Tech Part 1 & 2.', isPopular: false, isActive: true, country: 'India' },
  { id: 'international', code: 'Cambridge / IB', name: 'International Curriculum (Cambridge IGCSE & IB DP)', description: 'Inquiry-based international standards with Checkpoint, IGCSE, and IB Diploma.', isPopular: false, isActive: true, country: 'International' },
];

export const GRADES: Grade[] = [
  { id: 1, name: 'Grade 1', stage: 'primary', description: 'Early foundations in numbers, phonics, our environment, and digital exploration.', displayOrder: 1, isActive: true },
  { id: 2, name: 'Grade 2', stage: 'primary', description: 'Interactive storytelling, fundamental arithmetic, and everyday observations.', displayOrder: 2, isActive: true },
  { id: 3, name: 'Grade 3', stage: 'primary', description: 'Fractions exploration, structured grammar, nature cycles, and problem-solving.', displayOrder: 3, isActive: true },
  { id: 4, name: 'Grade 4', stage: 'primary', description: 'Science experiments, social communities, geometry, and expressive reading.', displayOrder: 4, isActive: true },
  { id: 5, name: 'Grade 5', stage: 'primary', description: 'Decimals, human anatomy, ecosystem balance, and creative writing.', displayOrder: 5, isActive: true },
  { id: 6, name: 'Grade 6', stage: 'middle', description: 'Algebraic thinking, living organisms, ancient civilizations, and coding foundations.', displayOrder: 6, isActive: true },
  { id: 7, name: 'Grade 7', stage: 'middle', description: 'Heat, motion, proportional reasoning, environmental geography, and logic.', displayOrder: 7, isActive: true },
  { id: 8, name: 'Grade 8', stage: 'middle', description: 'Force, pressure, linear equations, cellular biology, and modern history.', displayOrder: 8, isActive: true },
  { id: 9, name: 'Grade 9', stage: 'secondary', description: 'Laws of motion, matter in our surroundings, coordinate geometry, and economics.', displayOrder: 9, isActive: true },
  { id: 10, name: 'Grade 10', stage: 'secondary', description: 'Board exam mastery: Electricity, chemical reactions, trigonometry, and democratic politics.', displayOrder: 10, isActive: true },
  { id: 11, name: 'Grade 11', stage: 'senior_secondary', supportsStreams: true, description: 'Specialized deep streams: Science (PCM/B), Commerce (Accounts/Eco), and Humanities.', displayOrder: 11, isActive: true },
];

/**
 * MASTER COMBINED SUBJECTS LIST
 * Contains authentic, differentiated curriculum subjects for CBSE, ICSE/ISC, WBBSE/WBCHSE, State Boards, and Cambridge/IB
 */
export const ALL_SUBJECTS: Subject[] = [
  ...CBSE_SUBJECTS,
  ...ICSE_SUBJECTS,
  ...WBBSE_SUBJECTS,
  ...STATE_SUBJECTS,
  ...CAMBRIDGE_SUBJECTS,
];

/**
 * DEFAULT SUBJECT MAPPINGS
 * Linking Board + Grade + Stream -> Subject with flags for Core, Optional, Enrichment, and Display Order
 */
export const DEFAULT_SUBJECT_MAPPINGS: SubjectMapping[] = ALL_SUBJECTS.map((subj, idx) => ({
  id: `map-${subj.id}`,
  boardId: subj.boardId || 'cbse',
  gradeId: subj.gradeId,
  streamId: subj.streamId,
  subjectId: subj.id,
  categoryId: (subj.categoryId as any) || 'MATHEMATICS',
  isCore: !!subj.isCore,
  isOptional: !!subj.isOptional,
  isEnrichment: !!subj.isEnrichment,
  displayOrder: idx + 1,
  isActive: subj.isActive !== false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

export const INITIAL_SUBJECTS = ALL_SUBJECTS;
export const INITIAL_SUBJECT_MAPPINGS = DEFAULT_SUBJECT_MAPPINGS;
