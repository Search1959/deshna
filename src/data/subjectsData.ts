import { Board, Grade, StreamMaster, SubjectCategory, Subject, SubjectMapping } from '../types';

export const MASTER_CATEGORIES: SubjectCategory[] = [
  {
    id: 'cat-languages',
    code: 'LANGUAGES',
    name: 'Languages & Literature',
    description: 'First, second, third, and foreign language communications and grammar.',
    icon: 'BookOpen',
    color: 'from-blue-500 to-indigo-600',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'cat-math',
    code: 'MATHEMATICS',
    name: 'Mathematics',
    description: 'Foundational arithmetic, algebra, geometry, statistics, and applied mathematics.',
    icon: 'Calculator',
    color: 'from-amber-500 to-orange-600',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'cat-science',
    code: 'SCIENCE',
    name: 'Science & Environment',
    description: 'EVS, General Science, Physics, Chemistry, Biology, and Biotechnology.',
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
    description: 'Basics, Coding, AI, Robotics, Cyber Safety, Computer Science, and Data Science.',
    icon: 'Monitor',
    color: 'from-purple-500 to-indigo-600',
    displayOrder: 6,
    isActive: true,
  },
  {
    id: 'cat-gk',
    code: 'GK_SKILLS',
    name: 'General Knowledge & Skills',
    description: 'GK, Logical Reasoning, Critical Thinking, Life Skills, and Financial Literacy.',
    icon: 'Globe',
    color: 'from-yellow-500 to-amber-600',
    displayOrder: 7,
    isActive: true,
  },
  {
    id: 'cat-arts',
    code: 'ARTS_CREATIVE',
    name: 'Arts & Creative Expression',
    description: 'Art & Craft, Fine Arts, Visual Arts, Music, Dance, and Drama.',
    icon: 'Sparkles',
    color: 'from-pink-500 to-rose-600',
    displayOrder: 8,
    isActive: true,
  },
  {
    id: 'cat-pe',
    code: 'PHYSICAL_EDUCATION',
    name: 'Physical Education & Yoga',
    description: 'Physical Fitness, Sports, Health Education, and Daily Yoga.',
    icon: 'Zap',
    color: 'from-cyan-500 to-blue-600',
    displayOrder: 9,
    isActive: true,
  },
  {
    id: 'cat-vocational',
    code: 'VOCATIONAL_OPTIONAL',
    name: 'Vocational & Applied',
    description: 'Industry-relevant skills: Retail, Tourism, Healthcare, Banking, and Electronics.',
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
    description: 'Physics, Chemistry, Mathematics, Biology, Computer Science, and Biotechnology.',
    gradeFrom: 11,
    gradeTo: 12,
    isActive: true,
  },
  {
    id: 'stream-com',
    code: 'commerce',
    name: 'Commerce Stream',
    description: 'Accountancy, Business Studies, Economics, Entrepreneurship, and Mathematics.',
    gradeFrom: 11,
    gradeTo: 12,
    isActive: true,
  },
  {
    id: 'stream-hum',
    code: 'humanities',
    name: 'Humanities / Arts Stream',
    description: 'History, Political Science, Geography, Economics, Sociology, and Psychology.',
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
  { id: 'icse', code: 'ICSE / ISC', name: 'Council for the Indian School Certificate Examinations', description: 'Comprehensive, application-heavy curriculum with deep conceptual depth.', isPopular: true, isActive: true, country: 'India' },
  { id: 'wbbse', code: 'WB Board', name: 'West Bengal Board of Secondary Education', description: 'State-aligned syllabus with strong foundation in regional languages, science, and math.', isPopular: true, isActive: true, country: 'India (West Bengal)' },
  { id: 'state', code: 'State Boards', name: 'State Education Boards (Universal)', description: 'Universal state board syllabus covering foundational regional and core national standards.', isPopular: false, isActive: true, country: 'India' },
  { id: 'international', code: 'Cambridge / IB', name: 'International Curriculum (IB / IGCSE)', description: 'Inquiry-based international standards with holistic skill development.', isPopular: false, isActive: true, country: 'International' },
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
 * COMPLETE MASTER SUBJECT CATALOGUE
 * Supporting all categories (Languages, Math, Science, Social Science, Commerce,
 * Computer & Tech, GK & Skills, Arts, PE, Vocational, Competitive) across Grades 1 to 11
 */
export const ALL_SUBJECTS: Subject[] = [
  // ==========================================
  // --- GRADE 1 ---
  // ==========================================
  { id: 'g1-math', code: 'MATH', name: 'Mathematics', categoryId: 'MATHEMATICS', subjectType: 'CORE', iconName: 'Calculator', gradeId: 1, boardId: 'cbse', color: 'from-amber-500 to-orange-500', description: 'Counting, shapes, addition, subtraction, and playful patterns.', chaptersCount: 4, totalQuestionsCount: 40, isCore: true, isActive: true },
  { id: 'g1-eng', code: 'ENG', name: 'English & Phonics', categoryId: 'LANGUAGES', subjectType: 'CORE', iconName: 'BookOpen', gradeId: 1, boardId: 'cbse', color: 'from-blue-500 to-indigo-500', description: 'Sight words, alphabet sounds, rhyming, and picture stories.', chaptersCount: 4, totalQuestionsCount: 35, isCore: true, isActive: true },
  { id: 'g1-evs', code: 'EVS', name: 'Environmental Studies', categoryId: 'SCIENCE', subjectType: 'CORE', iconName: 'Leaf', gradeId: 1, boardId: 'cbse', color: 'from-emerald-500 to-teal-500', description: 'My family, plants, animals, seasons, and healthy habits.', chaptersCount: 4, totalQuestionsCount: 35, isCore: true, isActive: true },
  { id: 'g1-hin', code: 'HIN', name: 'Hindi (हिंदी)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 1, boardId: 'cbse', color: 'from-rose-500 to-orange-500', description: 'वर्णमाला, स्वर, व्यंजन, मात्राएं और सरल बाल कहानियां।', chaptersCount: 4, totalQuestionsCount: 30, isOptional: true, isActive: true },
  { id: 'g1-ben', code: 'BEN', name: 'Bengali (বাংলা)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 1, boardId: 'cbse', color: 'from-purple-500 to-pink-500', description: 'বর্ণ পরিচয়, স্বরবর্ণ, ব্যঞ্জনবর্ণ ও সহজ শিশু পাঠ।', chaptersCount: 4, totalQuestionsCount: 30, isOptional: true, isActive: true },
  { id: 'g1-comp', code: 'COMP', name: 'Computer Basics', categoryId: 'COMPUTER_TECH', subjectType: 'ENRICHMENT', iconName: 'Monitor', gradeId: 1, boardId: 'cbse', color: 'from-purple-500 to-pink-500', description: 'Meet the computer: Mouse, keyboard, screen, and safe use.', chaptersCount: 4, totalQuestionsCount: 36, isEnrichment: true, isActive: true },
  { id: 'g1-gk', code: 'GK', name: 'General Knowledge', categoryId: 'GK_SKILLS', subjectType: 'ENRICHMENT', iconName: 'Globe', gradeId: 1, boardId: 'cbse', color: 'from-yellow-500 to-amber-600', description: 'Fun animals, national symbols, wonder colors, and daily manners.', chaptersCount: 4, totalQuestionsCount: 30, isEnrichment: true, isActive: true },
  { id: 'g1-art', code: 'ART', name: 'Art & Craft', categoryId: 'ARTS_CREATIVE', subjectType: 'ENRICHMENT', iconName: 'Sparkles', gradeId: 1, boardId: 'cbse', color: 'from-pink-500 to-rose-500', description: 'Color mixing, finger painting, paper folding, and doodling.', chaptersCount: 4, totalQuestionsCount: 25, isEnrichment: true, isActive: true },
  { id: 'g1-mus', code: 'MUS', name: 'Music & Rhymes', categoryId: 'ARTS_CREATIVE', subjectType: 'ENRICHMENT', iconName: 'Sparkles', gradeId: 1, boardId: 'cbse', color: 'from-indigo-500 to-purple-500', description: 'Rhythm clapping, nursery melodies, musical notes, and song games.', chaptersCount: 4, totalQuestionsCount: 25, isEnrichment: true, isActive: true },
  { id: 'g1-pe', code: 'PE', name: 'Physical Education & Yoga', categoryId: 'PHYSICAL_EDUCATION', subjectType: 'ENRICHMENT', iconName: 'Zap', gradeId: 1, boardId: 'cbse', color: 'from-cyan-500 to-blue-500', description: 'Simple stretching, breathing exercises, balance posture, and outdoor play.', chaptersCount: 4, totalQuestionsCount: 25, isEnrichment: true, isActive: true },
  { id: 'g1-dig', code: 'DIG', name: 'Digital Literacy', categoryId: 'COMPUTER_TECH', subjectType: 'ENRICHMENT', iconName: 'Monitor', gradeId: 1, boardId: 'cbse', color: 'from-teal-500 to-emerald-600', description: 'Screen time balance, smart devices, clicking, and digital safety.', chaptersCount: 4, totalQuestionsCount: 25, isEnrichment: true, isActive: true },
  { id: 'g1-olympiad', code: 'OLY1', name: 'Junior Math Olympiad', categoryId: 'COMPETITIVE_ADVANCED', subjectType: 'COMPETITIVE', iconName: 'Award', gradeId: 1, boardId: 'cbse', color: 'from-amber-600 to-red-500', description: 'Visual puzzles, number logic, spatial reasoning, and pattern discovery.', chaptersCount: 4, totalQuestionsCount: 35, isActive: true },

  // ==========================================
  // --- GRADE 2 ---
  // ==========================================
  { id: 'g2-math', code: 'MATH', name: 'Mathematics', categoryId: 'MATHEMATICS', subjectType: 'CORE', iconName: 'Calculator', gradeId: 2, boardId: 'cbse', color: 'from-amber-500 to-orange-500', description: '2-digit addition, subtraction, skip counting, time, and money.', chaptersCount: 4, totalQuestionsCount: 45, isCore: true, isActive: true },
  { id: 'g2-eng', code: 'ENG', name: 'English & Reading', categoryId: 'LANGUAGES', subjectType: 'CORE', iconName: 'BookOpen', gradeId: 2, boardId: 'cbse', color: 'from-blue-500 to-indigo-500', description: 'Sentence building, nouns, verbs, story comprehension, and spelling.', chaptersCount: 4, totalQuestionsCount: 40, isCore: true, isActive: true },
  { id: 'g2-evs', code: 'EVS', name: 'Environmental Studies', categoryId: 'SCIENCE', subjectType: 'CORE', iconName: 'Leaf', gradeId: 2, boardId: 'cbse', color: 'from-emerald-500 to-teal-500', description: 'Our body parts, water sources, shelter, and festivals of India.', chaptersCount: 4, totalQuestionsCount: 40, isCore: true, isActive: true },
  { id: 'g2-hin', code: 'HIN', name: 'Hindi (हिंदी)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 2, boardId: 'cbse', color: 'from-rose-500 to-orange-500', description: 'शब्द रचना, सरल वाक्य, बाल कविताएं और भाषा अभ्यास।', chaptersCount: 4, totalQuestionsCount: 35, isOptional: true, isActive: true },
  { id: 'g2-ben', code: 'BEN', name: 'Bengali (বাংলা)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 2, boardId: 'cbse', color: 'from-purple-500 to-pink-500', description: 'যুক্তাক্ষর, সহজ শব্দ গঠন ও ছড়ার আনন্দের মাধ্যমে ভাষা শিক্ষা।', chaptersCount: 4, totalQuestionsCount: 35, isOptional: true, isActive: true },
  { id: 'g2-comp', code: 'COMP', name: 'Computer Basics', categoryId: 'COMPUTER_TECH', subjectType: 'ENRICHMENT', iconName: 'Monitor', gradeId: 2, boardId: 'cbse', color: 'from-purple-500 to-pink-500', description: 'Parts of computer, paint tools, typing keys, and caring for computers.', chaptersCount: 4, totalQuestionsCount: 35, isEnrichment: true, isActive: true },
  { id: 'g2-gk', code: 'GK', name: 'General Knowledge', categoryId: 'GK_SKILLS', subjectType: 'ENRICHMENT', iconName: 'Globe', gradeId: 2, boardId: 'cbse', color: 'from-rose-500 to-red-500', description: 'Amazing animal kingdom, national symbols, world wonders, and sports.', chaptersCount: 4, totalQuestionsCount: 36, isEnrichment: true, isActive: true },
  { id: 'g2-art', code: 'ART', name: 'Art & Craft', categoryId: 'ARTS_CREATIVE', subjectType: 'ENRICHMENT', iconName: 'Sparkles', gradeId: 2, boardId: 'cbse', color: 'from-pink-500 to-rose-500', description: 'Patterns, clay modeling, origami animals, and creative crafts.', chaptersCount: 4, totalQuestionsCount: 25, isEnrichment: true, isActive: true },
  { id: 'g2-pe', code: 'PE', name: 'Physical Education & Health', categoryId: 'PHYSICAL_EDUCATION', subjectType: 'ENRICHMENT', iconName: 'Zap', gradeId: 2, boardId: 'cbse', color: 'from-cyan-500 to-blue-500', description: 'Nutrition habits, posture, yoga asanas, and playground games.', chaptersCount: 4, totalQuestionsCount: 25, isEnrichment: true, isActive: true },
  { id: 'g2-olympiad', code: 'OLY2', name: 'Junior Science & Math Olympiad', categoryId: 'COMPETITIVE_ADVANCED', subjectType: 'COMPETITIVE', iconName: 'Award', gradeId: 2, boardId: 'cbse', color: 'from-amber-600 to-red-500', description: 'Curious logic problems, science riddles, and analytical puzzles.', chaptersCount: 4, totalQuestionsCount: 40, isActive: true },

  // ==========================================
  // --- GRADE 3 ---
  // ==========================================
  { id: 'g3-math', code: 'MATH', name: 'Mathematics', categoryId: 'MATHEMATICS', subjectType: 'CORE', iconName: 'Calculator', gradeId: 3, boardId: 'cbse', color: 'from-amber-500 to-orange-500', description: 'Multiplication, division, fractions, geometry, and measurement.', chaptersCount: 5, totalQuestionsCount: 65, isCore: true, isActive: true },
  { id: 'g3-eng', code: 'ENG', name: 'English Language & Reading', categoryId: 'LANGUAGES', subjectType: 'CORE', iconName: 'BookOpen', gradeId: 3, boardId: 'cbse', color: 'from-blue-500 to-indigo-500', description: 'Reading fluency, parts of speech, vocabulary, and creative comprehension.', chaptersCount: 4, totalQuestionsCount: 55, isCore: true, isActive: true },
  { id: 'g3-evs', code: 'EVS', name: 'Environmental Studies', categoryId: 'SCIENCE', subjectType: 'CORE', iconName: 'Leaf', gradeId: 3, boardId: 'cbse', color: 'from-emerald-500 to-teal-500', description: 'Water cycle, plant roots, shelter, community helpers, and food chains.', chaptersCount: 4, totalQuestionsCount: 50, isCore: true, isActive: true },
  { id: 'g3-hin', code: 'HIN', name: 'Hindi Grammar & Stories', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 3, boardId: 'cbse', color: 'from-rose-500 to-orange-500', description: 'संज्ञा, सर्वनाम, विलोम शब्द, मुहावरे और कहानी पठन।', chaptersCount: 4, totalQuestionsCount: 40, isOptional: true, isActive: true },
  { id: 'g3-ben', code: 'BEN', name: 'Bengali Language (বাংলা)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 3, boardId: 'cbse', color: 'from-purple-500 to-pink-500', description: 'বাংলা ব্যাকরণ, বাক্য গঠন, সাধু ও চলিত ভাষা এবং ছোটদের গল্প।', chaptersCount: 4, totalQuestionsCount: 40, isOptional: true, isActive: true },
  { id: 'g3-comp', code: 'COMP', name: 'Computer Basics', categoryId: 'COMPUTER_TECH', subjectType: 'ENRICHMENT', iconName: 'Monitor', gradeId: 3, boardId: 'cbse', color: 'from-purple-500 to-pink-500', description: 'Word pad typing, file saving, internet awareness, and keyboard shortcuts.', chaptersCount: 4, totalQuestionsCount: 35, isEnrichment: true, isActive: true },
  { id: 'g3-gk', code: 'GK', name: 'General Knowledge', categoryId: 'GK_SKILLS', subjectType: 'ENRICHMENT', iconName: 'Globe', gradeId: 3, boardId: 'cbse', color: 'from-rose-500 to-red-500', description: 'Inventions, our country India, solar system, and world geography.', chaptersCount: 4, totalQuestionsCount: 36, isEnrichment: true, isActive: true },
  { id: 'g3-art', code: 'ART', name: 'Art & Craft', categoryId: 'ARTS_CREATIVE', subjectType: 'ENRICHMENT', iconName: 'Sparkles', gradeId: 3, boardId: 'cbse', color: 'from-pink-500 to-rose-500', description: 'Symmetry drawings, color shades, paper crafts, and card making.', chaptersCount: 4, totalQuestionsCount: 25, isEnrichment: true, isActive: true },
  { id: 'g3-pe', code: 'PE', name: 'Physical Education & Yoga', categoryId: 'PHYSICAL_EDUCATION', subjectType: 'ENRICHMENT', iconName: 'Zap', gradeId: 3, boardId: 'cbse', color: 'from-cyan-500 to-blue-500', description: 'Surya Namaskar, running drills, sportsmanship, and personal hygiene.', chaptersCount: 4, totalQuestionsCount: 25, isEnrichment: true, isActive: true },
  { id: 'g3-olympiad', code: 'OLY3', name: 'Olympiad Foundation', categoryId: 'COMPETITIVE_ADVANCED', subjectType: 'COMPETITIVE', iconName: 'Award', gradeId: 3, boardId: 'cbse', color: 'from-amber-600 to-red-500', description: 'Math & Science Olympiad questions, logical sequences, and data puzzles.', chaptersCount: 4, totalQuestionsCount: 50, isActive: true },

  // ==========================================
  // --- GRADE 4 ---
  // ==========================================
  { id: 'g4-math', code: 'MATH', name: 'Mathematics', categoryId: 'MATHEMATICS', subjectType: 'CORE', iconName: 'Calculator', gradeId: 4, boardId: 'cbse', color: 'from-amber-500 to-orange-500', description: 'Large numbers, factors, multiples, fractions, decimals, and perimeter.', chaptersCount: 4, totalQuestionsCount: 60, isCore: true, isActive: true },
  { id: 'g4-sci', code: 'SCI', name: 'General Science', categoryId: 'SCIENCE', subjectType: 'CORE', iconName: 'FlaskConical', gradeId: 4, boardId: 'cbse', color: 'from-emerald-500 to-teal-500', description: 'Plant adaptation, digestive system, matter, forces, and simple energy.', chaptersCount: 4, totalQuestionsCount: 55, isCore: true, isActive: true },
  { id: 'g4-soc', code: 'SST', name: 'Social Studies', categoryId: 'SOCIAL_SCIENCE', subjectType: 'CORE', iconName: 'Map', gradeId: 4, boardId: 'cbse', color: 'from-violet-500 to-purple-500', description: 'Northern mountains, coastal plains, natural resources, and local governance.', chaptersCount: 4, totalQuestionsCount: 50, isCore: true, isActive: true },
  { id: 'g4-eng', code: 'ENG', name: 'English Grammar & Writing', categoryId: 'LANGUAGES', subjectType: 'CORE', iconName: 'BookOpen', gradeId: 4, boardId: 'cbse', color: 'from-blue-500 to-indigo-500', description: 'Adjectives, adverbs, prepositions, paragraph writing, and reading comprehension.', chaptersCount: 4, totalQuestionsCount: 50, isCore: true, isActive: true },
  { id: 'g4-hin', code: 'HIN', name: 'Hindi (हिंदी)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 4, boardId: 'cbse', color: 'from-rose-500 to-orange-500', description: 'व्याकरण, पत्र लेखन, निबंध और रोचक गद्य-पद्य पठन।', chaptersCount: 4, totalQuestionsCount: 45, isOptional: true, isActive: true },
  { id: 'g4-ben', code: 'BEN', name: 'Bengali (বাংলা)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 4, boardId: 'cbse', color: 'from-purple-500 to-pink-500', description: 'বাংলা সাহিত্যের ছোট গল্প, কবিতা এবং প্রায়োগিক ব্যাকরণ।', chaptersCount: 4, totalQuestionsCount: 45, isOptional: true, isActive: true },
  { id: 'g4-comp', code: 'COMP', name: 'Computer Applications', categoryId: 'COMPUTER_TECH', subjectType: 'ENRICHMENT', iconName: 'Monitor', gradeId: 4, boardId: 'cbse', color: 'from-purple-500 to-pink-500', description: 'Word processing, presentations, introduction to block coding and algorithms.', chaptersCount: 4, totalQuestionsCount: 40, isEnrichment: true, isActive: true },
  { id: 'g4-gk', code: 'GK', name: 'General Knowledge & Reasoning', categoryId: 'GK_SKILLS', subjectType: 'ENRICHMENT', iconName: 'Globe', gradeId: 4, boardId: 'cbse', color: 'from-rose-500 to-red-500', description: 'World geography, famous personalities, logical patterns, and current affairs.', chaptersCount: 4, totalQuestionsCount: 40, isEnrichment: true, isActive: true },
  { id: 'g4-pe', code: 'PE', name: 'Physical Education & Sports', categoryId: 'PHYSICAL_EDUCATION', subjectType: 'ENRICHMENT', iconName: 'Zap', gradeId: 4, boardId: 'cbse', color: 'from-cyan-500 to-blue-500', description: 'Athletic basics, teamwork, stretching, and physical endurance drills.', chaptersCount: 4, totalQuestionsCount: 25, isEnrichment: true, isActive: true },
  { id: 'g4-olympiad', code: 'OLY4', name: 'Olympiad Master (Math & Sci)', categoryId: 'COMPETITIVE_ADVANCED', subjectType: 'COMPETITIVE', iconName: 'Award', gradeId: 4, boardId: 'cbse', color: 'from-amber-600 to-red-500', description: 'Competitive math logic, speed calculations, and scientific deduction.', chaptersCount: 4, totalQuestionsCount: 50, isActive: true },

  // ==========================================
  // --- GRADE 5 ---
  // ==========================================
  { id: 'g5-math', code: 'MATH', name: 'Mathematics', categoryId: 'MATHEMATICS', subjectType: 'CORE', iconName: 'Calculator', gradeId: 5, boardId: 'cbse', color: 'from-amber-500 to-orange-500', description: 'Fractions, decimals, percentages, area, perimeter, and volume.', chaptersCount: 4, totalQuestionsCount: 70, isCore: true, isActive: true },
  { id: 'g5-sci', code: 'SCI', name: 'General Science', categoryId: 'SCIENCE', subjectType: 'CORE', iconName: 'FlaskConical', gradeId: 5, boardId: 'cbse', color: 'from-emerald-500 to-teal-500', description: 'Super senses, simple machines, states of matter, and ecosystems.', chaptersCount: 4, totalQuestionsCount: 65, isCore: true, isActive: true },
  { id: 'g5-eng', code: 'ENG', name: 'English & Grammar', categoryId: 'LANGUAGES', subjectType: 'CORE', iconName: 'BookOpen', gradeId: 5, boardId: 'cbse', color: 'from-blue-500 to-indigo-500', description: 'Tenses, active voice, essay structuring, and critical reading.', chaptersCount: 4, totalQuestionsCount: 60, isCore: true, isActive: true },
  { id: 'g5-soc', code: 'SST', name: 'Social Studies', categoryId: 'SOCIAL_SCIENCE', subjectType: 'CORE', iconName: 'Map', gradeId: 5, boardId: 'cbse', color: 'from-violet-500 to-purple-500', description: 'Continents, oceans, democratic governance, and freedom movement.', chaptersCount: 4, totalQuestionsCount: 55, isCore: true, isActive: true },
  { id: 'g5-hin', code: 'HIN', name: 'Hindi (हिंदी)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 5, boardId: 'cbse', color: 'from-rose-500 to-orange-500', description: 'काल, वाच्य, मुहावरे, अपठित गद्यांश और रचनात्मक लेखन।', chaptersCount: 4, totalQuestionsCount: 45, isOptional: true, isActive: true },
  { id: 'g5-ben', code: 'BEN', name: 'Bengali (বাংলা)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 5, boardId: 'cbse', color: 'from-purple-500 to-pink-500', description: 'গদ্য, পদ্য, ব্যাকরণ ও অনুচ্ছেদ রচনার বিশদ পাঠ।', chaptersCount: 4, totalQuestionsCount: 45, isOptional: true, isActive: true },
  { id: 'g5-comp', code: 'COMP', name: 'Computer Applications & Coding', categoryId: 'COMPUTER_TECH', subjectType: 'ENRICHMENT', iconName: 'Monitor', gradeId: 5, boardId: 'cbse', color: 'from-purple-500 to-pink-500', description: 'Scratch block coding, internet safety, spreadsheets, and presentations.', chaptersCount: 4, totalQuestionsCount: 40, isEnrichment: true, isActive: true },
  { id: 'g5-gk', code: 'GK', name: 'General Knowledge & Aptitude', categoryId: 'GK_SKILLS', subjectType: 'ENRICHMENT', iconName: 'Globe', gradeId: 5, boardId: 'cbse', color: 'from-yellow-500 to-amber-600', description: 'Science discoveries, world capitals, reasoning puzzles, and environment.', chaptersCount: 4, totalQuestionsCount: 40, isEnrichment: true, isActive: true },
  { id: 'g5-pe', code: 'PE', name: 'Physical Education & Yoga', categoryId: 'PHYSICAL_EDUCATION', subjectType: 'ENRICHMENT', iconName: 'Zap', gradeId: 5, boardId: 'cbse', color: 'from-cyan-500 to-blue-500', description: 'Cardio endurance, yoga flows, mental wellness, and sports rules.', chaptersCount: 4, totalQuestionsCount: 25, isEnrichment: true, isActive: true },
  { id: 'g5-olympiad', code: 'OLY5', name: 'Olympiad & Scholarship Prep', categoryId: 'COMPETITIVE_ADVANCED', subjectType: 'COMPETITIVE', iconName: 'Award', gradeId: 5, boardId: 'cbse', color: 'from-amber-600 to-red-500', description: 'Advanced problem solving, quantitative reasoning, and National talent exams.', chaptersCount: 4, totalQuestionsCount: 60, isActive: true },

  // ==========================================
  // --- GRADE 6 ---
  // ==========================================
  { id: 'g6-math', code: 'MATH', name: 'Mathematics', categoryId: 'MATHEMATICS', subjectType: 'CORE', iconName: 'Calculator', gradeId: 6, boardId: 'cbse', color: 'from-amber-500 to-orange-500', description: 'Integers, algebra introduction, ratio & proportion, basic geometry, and mensuration.', chaptersCount: 4, totalQuestionsCount: 75, isCore: true, isActive: true },
  { id: 'g6-sci', code: 'SCI', name: 'Science', categoryId: 'SCIENCE', subjectType: 'CORE', iconName: 'Atom', gradeId: 6, boardId: 'cbse', color: 'from-cyan-500 to-blue-500', description: 'Components of food, sorting materials, motion and measurement, living organisms.', chaptersCount: 4, totalQuestionsCount: 70, isCore: true, isActive: true },
  { id: 'g6-soc', code: 'SST', name: 'Social Science', categoryId: 'SOCIAL_SCIENCE', subjectType: 'CORE', iconName: 'Landmark', gradeId: 6, boardId: 'cbse', color: 'from-rose-500 to-pink-500', description: 'Earliest cities (History), our solar system (Geography), diversity and equality (Civics).', chaptersCount: 4, totalQuestionsCount: 65, isCore: true, isActive: true },
  { id: 'g6-eng', code: 'ENG', name: 'English Literature & Grammar', categoryId: 'LANGUAGES', subjectType: 'CORE', iconName: 'BookOpen', gradeId: 6, boardId: 'cbse', color: 'from-indigo-500 to-violet-500', description: 'Honeysuckle, A Pact with the Sun, active-passive voice, and essays.', chaptersCount: 4, totalQuestionsCount: 60, isCore: true, isActive: true },
  { id: 'g6-hin', code: 'HIN', name: 'Hindi (वसंत व बाल रामकथा)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 6, boardId: 'cbse', color: 'from-rose-500 to-orange-500', description: 'वसंत भाग-1, बाल रामकथा, संधि, समास, और औपचारिक पत्र।', chaptersCount: 4, totalQuestionsCount: 50, isOptional: true, isActive: true },
  { id: 'g6-ben', code: 'BEN', name: 'Bengali (বাংলা সাহিত্য)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 6, boardId: 'cbse', color: 'from-purple-500 to-pink-500', description: 'সাহিত্য মেলা, ব্যাকরণ, বাক্য রূপান্তর ও ভাবসম্প্রসারণ।', chaptersCount: 4, totalQuestionsCount: 50, isOptional: true, isActive: true },
  { id: 'g6-san', code: 'SAN', name: 'Sanskrit (रुचिरा)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 6, boardId: 'cbse', color: 'from-amber-600 to-yellow-600', description: 'शब्दरूपाणि, धातुरूपाणि, सरल संस्कृत संभाषणम् एवं श्लोकाः।', chaptersCount: 4, totalQuestionsCount: 40, isOptional: true, isActive: true },
  { id: 'g6-comp', code: 'COMP', name: 'Computer & Artificial Intelligence', categoryId: 'COMPUTER_TECH', subjectType: 'ENRICHMENT', iconName: 'Monitor', gradeId: 6, boardId: 'cbse', color: 'from-purple-500 to-pink-500', description: 'Algorithms, Python block basics, AI applications, and cyber safety rules.', chaptersCount: 4, totalQuestionsCount: 50, isEnrichment: true, isActive: true },
  { id: 'g6-gk', code: 'GK', name: 'General Knowledge & Aptitude', categoryId: 'GK_SKILLS', subjectType: 'ENRICHMENT', iconName: 'Globe', gradeId: 6, boardId: 'cbse', color: 'from-yellow-500 to-amber-600', description: 'Current developments, national heritage, critical reasoning, and quiz mastery.', chaptersCount: 4, totalQuestionsCount: 45, isEnrichment: true, isActive: true },
  { id: 'g6-pe', code: 'PE', name: 'Physical Education & Yoga', categoryId: 'PHYSICAL_EDUCATION', subjectType: 'ENRICHMENT', iconName: 'Zap', gradeId: 6, boardId: 'cbse', color: 'from-cyan-500 to-blue-500', description: 'Asanas, physical fitness metrics, athletics, and healthy lifestyles.', chaptersCount: 4, totalQuestionsCount: 30, isEnrichment: true, isActive: true },
  { id: 'g6-olympiad', code: 'OLY6', name: 'Olympiad & Reasoning', categoryId: 'COMPETITIVE_ADVANCED', subjectType: 'COMPETITIVE', iconName: 'Award', gradeId: 6, boardId: 'cbse', color: 'from-amber-600 to-red-500', description: 'IMO & NSO preparation, mental math shortcuts, and analytical thinking.', chaptersCount: 4, totalQuestionsCount: 65, isActive: true },

  // ==========================================
  // --- GRADE 7 ---
  // ==========================================
  { id: 'g7-math', code: 'MATH', name: 'Mathematics', categoryId: 'MATHEMATICS', subjectType: 'CORE', iconName: 'Calculator', gradeId: 7, boardId: 'cbse', color: 'from-amber-500 to-orange-500', description: 'Integers, rational numbers, algebraic expressions, lines & angles, and data handling.', chaptersCount: 4, totalQuestionsCount: 85, isCore: true, isActive: true },
  { id: 'g7-sci', code: 'SCI', name: 'Science', categoryId: 'SCIENCE', subjectType: 'CORE', iconName: 'Atom', gradeId: 7, boardId: 'cbse', color: 'from-cyan-500 to-blue-500', description: 'Nutrition in plants, heat transfer, acids & bases, physical/chemical changes, motion.', chaptersCount: 4, totalQuestionsCount: 80, isCore: true, isActive: true },
  { id: 'g7-soc', code: 'SST', name: 'Social Science', categoryId: 'SOCIAL_SCIENCE', subjectType: 'CORE', iconName: 'Landmark', gradeId: 7, boardId: 'cbse', color: 'from-rose-500 to-pink-500', description: 'Medieval India, our environment, state government, and market dynamics.', chaptersCount: 4, totalQuestionsCount: 70, isCore: true, isActive: true },
  { id: 'g7-eng', code: 'ENG', name: 'English Literature & Grammar', categoryId: 'LANGUAGES', subjectType: 'CORE', iconName: 'BookOpen', gradeId: 7, boardId: 'cbse', color: 'from-indigo-500 to-violet-500', description: 'Honeycomb, An Alien Hand, poetic devices, analytical comprehension.', chaptersCount: 4, totalQuestionsCount: 65, isCore: true, isActive: true },
  { id: 'g7-hin', code: 'HIN', name: 'Hindi (वसंत व महाभारत कथा)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 7, boardId: 'cbse', color: 'from-rose-500 to-orange-500', description: 'वसंत भाग-2, बाल महाभारत कथा, व्याकरण और रचनात्मक लेखन।', chaptersCount: 4, totalQuestionsCount: 50, isOptional: true, isActive: true },
  { id: 'g7-ben', code: 'BEN', name: 'Bengali (বাংলা)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 7, boardId: 'cbse', color: 'from-purple-500 to-pink-500', description: 'সাহিত্য মেলা, ব্যাকরণ, বোধ পরীক্ষণ ও চিঠি লেখা।', chaptersCount: 4, totalQuestionsCount: 50, isOptional: true, isActive: true },
  { id: 'g7-san', code: 'SAN', name: 'Sanskrit (रुचिरा)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 7, boardId: 'cbse', color: 'from-amber-600 to-yellow-600', description: 'कारक, विभक्ति, प्रत्ययाः, श्लोकार्थः एवं व्याकरणम्।', chaptersCount: 4, totalQuestionsCount: 40, isOptional: true, isActive: true },
  { id: 'g7-comp', code: 'COMP', name: 'Coding & Artificial Intelligence', categoryId: 'COMPUTER_TECH', subjectType: 'ENRICHMENT', iconName: 'Monitor', gradeId: 7, boardId: 'cbse', color: 'from-purple-500 to-pink-500', description: 'Python programming syntax, loops, AI ethics, and web page building.', chaptersCount: 4, totalQuestionsCount: 50, isEnrichment: true, isActive: true },
  { id: 'g7-gk', code: 'GK', name: 'General Knowledge & Logic', categoryId: 'GK_SKILLS', subjectType: 'ENRICHMENT', iconName: 'Globe', gradeId: 7, boardId: 'cbse', color: 'from-yellow-500 to-amber-600', description: 'Global developments, constitutional structure, and critical thinking.', chaptersCount: 4, totalQuestionsCount: 45, isEnrichment: true, isActive: true },
  { id: 'g7-pe', code: 'PE', name: 'Physical Education & Yoga', categoryId: 'PHYSICAL_EDUCATION', subjectType: 'ENRICHMENT', iconName: 'Zap', gradeId: 7, boardId: 'cbse', color: 'from-cyan-500 to-blue-500', description: 'First aid basics, physical agility, sports rules, and pranayama.', chaptersCount: 4, totalQuestionsCount: 30, isEnrichment: true, isActive: true },
  { id: 'g7-olympiad', code: 'OLY7', name: 'Olympiad Foundation Series', categoryId: 'COMPETITIVE_ADVANCED', subjectType: 'COMPETITIVE', iconName: 'Award', gradeId: 7, boardId: 'cbse', color: 'from-amber-600 to-red-500', description: 'National level Olympiad mock questions, numerical reasoning, and speed tricks.', chaptersCount: 4, totalQuestionsCount: 70, isActive: true },

  // ==========================================
  // --- GRADE 8 ---
  // ==========================================
  { id: 'g8-math', code: 'MATH', name: 'Mathematics', categoryId: 'MATHEMATICS', subjectType: 'CORE', iconName: 'Calculator', gradeId: 8, boardId: 'cbse', color: 'from-amber-500 to-orange-500', description: 'Rational numbers, linear equations, quadrilaterals, squares, cubes, and factorization.', chaptersCount: 4, totalQuestionsCount: 90, isCore: true, isActive: true },
  { id: 'g8-sci', code: 'SCI', name: 'Science', categoryId: 'SCIENCE', subjectType: 'CORE', iconName: 'Atom', gradeId: 8, boardId: 'cbse', color: 'from-cyan-500 to-blue-500', description: 'Crop production, microorganisms, synthetic fibres, metals/non-metals, cell structure.', chaptersCount: 4, totalQuestionsCount: 85, isCore: true, isActive: true },
  { id: 'g8-soc', code: 'SST', name: 'Social Science', categoryId: 'SOCIAL_SCIENCE', subjectType: 'CORE', iconName: 'Landmark', gradeId: 8, boardId: 'cbse', color: 'from-rose-500 to-pink-500', description: 'Trade to territory (History), Indian constitution & judiciary (Civics), resources (Geography).', chaptersCount: 4, totalQuestionsCount: 75, isCore: true, isActive: true },
  { id: 'g8-eng', code: 'ENG', name: 'English Literature', categoryId: 'LANGUAGES', subjectType: 'CORE', iconName: 'BookOpen', gradeId: 8, boardId: 'cbse', color: 'from-indigo-500 to-violet-500', description: 'Honeydew, It So Happened, direct/indirect speech, formal letter writing.', chaptersCount: 4, totalQuestionsCount: 70, isCore: true, isActive: true },
  { id: 'g8-hin', code: 'HIN', name: 'Hindi (वसंत व भारत की खोज)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 8, boardId: 'cbse', color: 'from-rose-500 to-orange-500', description: 'वसंत भाग-3, भारत की खोज, अलंकार, छंद और निबंध लेखन।', chaptersCount: 4, totalQuestionsCount: 55, isOptional: true, isActive: true },
  { id: 'g8-ben', code: 'BEN', name: 'Bengali (বাংলা সাহিত্য)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 8, boardId: 'cbse', color: 'from-purple-500 to-pink-500', description: 'সাহিত্য মেলা, ব্যাকরণ, বাগধারা ও প্রবন্ধ রচনা।', chaptersCount: 4, totalQuestionsCount: 55, isOptional: true, isActive: true },
  { id: 'g8-san', code: 'SAN', name: 'Sanskrit (रुचिरा)', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 8, boardId: 'cbse', color: 'from-amber-600 to-yellow-600', description: 'समासः, अव्ययाः, सूक्तयः एवं संस्कृत अनुवादः।', chaptersCount: 4, totalQuestionsCount: 45, isOptional: true, isActive: true },
  { id: 'g8-comp', code: 'COMP', name: 'Computer Science & AI', categoryId: 'COMPUTER_TECH', subjectType: 'ENRICHMENT', iconName: 'Monitor', gradeId: 8, boardId: 'cbse', color: 'from-purple-500 to-pink-500', description: 'Python data structures, computer networks, AI computer vision, and app design.', chaptersCount: 4, totalQuestionsCount: 55, isEnrichment: true, isActive: true },
  { id: 'g8-gk', code: 'GK', name: 'General Knowledge & Aptitude', categoryId: 'GK_SKILLS', subjectType: 'ENRICHMENT', iconName: 'Globe', gradeId: 8, boardId: 'cbse', color: 'from-yellow-500 to-amber-600', description: 'Economy basics, world history, scientific breakthroughs, and NTSE prep.', chaptersCount: 4, totalQuestionsCount: 50, isEnrichment: true, isActive: true },
  { id: 'g8-pe', code: 'PE', name: 'Physical Education & Health', categoryId: 'PHYSICAL_EDUCATION', subjectType: 'ENRICHMENT', iconName: 'Zap', gradeId: 8, boardId: 'cbse', color: 'from-cyan-500 to-blue-500', description: 'Sports biomechanics, wellness routines, team tactics, and fitness stamina.', chaptersCount: 4, totalQuestionsCount: 30, isEnrichment: true, isActive: true },
  { id: 'g8-olympiad', code: 'OLY8', name: 'NTSE & Olympiad Foundation', categoryId: 'COMPETITIVE_ADVANCED', subjectType: 'COMPETITIVE', iconName: 'Award', gradeId: 8, boardId: 'cbse', color: 'from-amber-600 to-red-500', description: 'Logical reasoning, MAT/SAT foundation, IMO, NSO, and scholarship drills.', chaptersCount: 4, totalQuestionsCount: 80, isActive: true },

  // ==========================================
  // --- GRADE 9 ---
  // ==========================================
  { id: 'g9-math', code: 'MATH', name: 'Mathematics', categoryId: 'MATHEMATICS', subjectType: 'CORE', iconName: 'Calculator', gradeId: 9, boardId: 'cbse', color: 'from-amber-500 to-orange-500', description: 'Number systems, polynomials, coordinate geometry, linear equations, and triangles.', chaptersCount: 4, totalQuestionsCount: 110, isCore: true, isActive: true },
  { id: 'g9-phy', code: 'PHY', name: 'Physics', categoryId: 'SCIENCE', subjectType: 'CORE', iconName: 'Zap', gradeId: 9, boardId: 'cbse', color: 'from-blue-600 to-indigo-600', description: 'Motion, force & Newton’s laws, gravitation, work, power & energy, sound.', chaptersCount: 4, totalQuestionsCount: 90, isCore: true, isActive: true },
  { id: 'g9-chem', code: 'CHEM', name: 'Chemistry', categoryId: 'SCIENCE', subjectType: 'CORE', iconName: 'TestTube', gradeId: 9, boardId: 'cbse', color: 'from-emerald-600 to-teal-600', description: 'Matter in our surroundings, is matter around us pure, atoms and molecules, structure of atom.', chaptersCount: 4, totalQuestionsCount: 85, isCore: true, isActive: true },
  { id: 'g9-bio', code: 'BIO', name: 'Biology', categoryId: 'SCIENCE', subjectType: 'CORE', iconName: 'Dna', gradeId: 9, boardId: 'cbse', color: 'from-lime-600 to-emerald-600', description: 'The fundamental unit of life (Cell), tissues, diversity, natural resources.', chaptersCount: 4, totalQuestionsCount: 80, isCore: true, isActive: true },
  { id: 'g9-soc', code: 'SST', name: 'Social Science', categoryId: 'SOCIAL_SCIENCE', subjectType: 'CORE', iconName: 'Landmark', gradeId: 9, boardId: 'cbse', color: 'from-rose-600 to-amber-600', description: 'French revolution (History), India size & location (Geo), democratic design (Civics), poverty (Eco).', chaptersCount: 4, totalQuestionsCount: 75, isCore: true, isActive: true },
  { id: 'g9-eng', code: 'ENG', name: 'English Language & Literature', categoryId: 'LANGUAGES', subjectType: 'CORE', iconName: 'BookOpen', gradeId: 9, boardId: 'cbse', color: 'from-purple-600 to-indigo-600', description: 'Beehive, Moments, descriptive paragraphs, integrated grammar.', chaptersCount: 4, totalQuestionsCount: 70, isCore: true, isActive: true },
  { id: 'g9-hin', code: 'HIN', name: 'Hindi Course A / B', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 9, boardId: 'cbse', color: 'from-rose-500 to-orange-500', description: 'क्षितिज, कृतिका, स्पर्श, संचयन, समास, वाक्य भेद और रचनात्मक लेखन।', chaptersCount: 4, totalQuestionsCount: 60, isOptional: true, isActive: true },
  { id: 'g9-it', code: 'IT402', name: 'Information Technology (IT 402)', categoryId: 'COMPUTER_TECH', subjectType: 'VOCATIONAL', iconName: 'Monitor', gradeId: 9, boardId: 'cbse', color: 'from-indigo-600 to-purple-600', description: 'Digital documentation, electronic spreadsheet, digital presentations, and employability skills.', chaptersCount: 4, totalQuestionsCount: 60, isActive: true },
  { id: 'g9-ai', code: 'AI417', name: 'Artificial Intelligence (AI 417)', categoryId: 'COMPUTER_TECH', subjectType: 'VOCATIONAL', iconName: 'Monitor', gradeId: 9, boardId: 'cbse', color: 'from-cyan-600 to-blue-600', description: 'Introduction to AI project cycle, computer vision, NLP, and Python programming.', chaptersCount: 4, totalQuestionsCount: 60, isActive: true },
  { id: 'g9-pe', code: 'PE', name: 'Physical Education & Health', categoryId: 'PHYSICAL_EDUCATION', subjectType: 'ENRICHMENT', iconName: 'Zap', gradeId: 9, boardId: 'cbse', color: 'from-emerald-600 to-teal-600', description: 'Sports physiology, fitness training, rules of track and field, and sports psychology.', chaptersCount: 4, totalQuestionsCount: 35, isEnrichment: true, isActive: true },
  { id: 'g9-competitive', code: 'JEE9', name: 'JEE / NEET Foundation (Grade 9)', categoryId: 'COMPETITIVE_ADVANCED', subjectType: 'COMPETITIVE', iconName: 'Award', gradeId: 9, boardId: 'cbse', color: 'from-amber-600 to-red-600', description: 'Advanced problem sets in kinematics, atomic models, polynomials, and cellular biology.', chaptersCount: 4, totalQuestionsCount: 90, isActive: true },

  // ==========================================
  // --- GRADE 10 ---
  // ==========================================
  { id: 'g10-math', code: 'MATH', name: 'Mathematics (Standard/Basic)', categoryId: 'MATHEMATICS', subjectType: 'CORE', iconName: 'Calculator', gradeId: 10, boardId: 'cbse', color: 'from-amber-500 to-orange-600', description: 'Real numbers, quadratic equations, arithmetic progressions, trigonometry, statistics.', chaptersCount: 4, totalQuestionsCount: 150, isCore: true, isActive: true },
  { id: 'g10-sci', code: 'SCI', name: 'Science (Comprehensive)', categoryId: 'SCIENCE', subjectType: 'CORE', iconName: 'Atom', gradeId: 10, boardId: 'cbse', color: 'from-blue-600 to-cyan-600', description: 'Chemical reactions, metals & non-metals, life processes, light reflection, electricity & magnetism.', chaptersCount: 4, totalQuestionsCount: 160, isCore: true, isActive: true },
  { id: 'g10-soc', code: 'SST', name: 'Social Science', categoryId: 'SOCIAL_SCIENCE', subjectType: 'CORE', iconName: 'Landmark', gradeId: 10, boardId: 'cbse', color: 'from-rose-600 to-amber-600', description: 'Nationalism in India (History), resources (Geo), power sharing (Civics), globalization (Eco).', chaptersCount: 4, totalQuestionsCount: 110, isCore: true, isActive: true },
  { id: 'g10-eng', code: 'ENG', name: 'English Language & Literature', categoryId: 'LANGUAGES', subjectType: 'CORE', iconName: 'BookOpen', gradeId: 10, boardId: 'cbse', color: 'from-purple-600 to-indigo-600', description: 'First Flight, Footprints Without Feet, analytical essays, and reading comprehension.', chaptersCount: 4, totalQuestionsCount: 95, isCore: true, isActive: true },
  { id: 'g10-hin', code: 'HIN', name: 'Hindi Course A / B', categoryId: 'LANGUAGES', subjectType: 'OPTIONAL', iconName: 'BookOpen', gradeId: 10, boardId: 'cbse', color: 'from-rose-500 to-orange-500', description: 'क्षितिज-2, स्पर्श-2, पदबंध, वाच्य, रस, सूचना लेखन और विज्ञापन।', chaptersCount: 4, totalQuestionsCount: 75, isOptional: true, isActive: true },
  { id: 'g10-it', code: 'IT402', name: 'Information Technology (IT 402)', categoryId: 'COMPUTER_TECH', subjectType: 'VOCATIONAL', iconName: 'Monitor', gradeId: 10, boardId: 'cbse', color: 'from-indigo-600 to-purple-600', description: 'Advanced styles, mail merge, relational databases (RDBMS), and web applications.', chaptersCount: 4, totalQuestionsCount: 80, isActive: true },
  { id: 'g10-ai', code: 'AI417', name: 'Artificial Intelligence (AI 417)', categoryId: 'COMPUTER_TECH', subjectType: 'VOCATIONAL', iconName: 'Monitor', gradeId: 10, boardId: 'cbse', color: 'from-cyan-600 to-blue-600', description: 'AI readiness, computer vision models, natural language processing, and evaluation metrics.', chaptersCount: 4, totalQuestionsCount: 80, isActive: true },
  { id: 'g10-pe', code: 'PE', name: 'Physical & Health Education', categoryId: 'PHYSICAL_EDUCATION', subjectType: 'ENRICHMENT', iconName: 'Zap', gradeId: 10, boardId: 'cbse', color: 'from-emerald-600 to-teal-600', description: 'Cardiovascular endurance, posture correction, yoga therapies, and community health.', chaptersCount: 4, totalQuestionsCount: 40, isEnrichment: true, isActive: true },
  { id: 'g10-competitive', code: 'JEE10', name: 'JEE / NEET Foundation (Grade 10)', categoryId: 'COMPETITIVE_ADVANCED', subjectType: 'COMPETITIVE', iconName: 'Award', gradeId: 10, boardId: 'cbse', color: 'from-amber-600 to-red-600', description: 'Class 10 board + competitive bridge: Optics, circuits, stoichiometry, and genetics.', chaptersCount: 4, totalQuestionsCount: 120, isActive: true },

  // ==========================================
  // --- GRADE 11: SCIENCE STREAM ---
  // ==========================================
  { id: 'g11-sci-phy', code: 'PHY11', name: 'Physics', categoryId: 'SCIENCE', subjectType: 'CORE', iconName: 'Zap', gradeId: 11, boardId: 'cbse', streamId: 'science', color: 'from-blue-600 to-cyan-500', description: 'Units & dimensions, kinematics, laws of motion, work energy power, rotational dynamics.', chaptersCount: 4, totalQuestionsCount: 180, isCore: true, isActive: true },
  { id: 'g11-sci-chem', code: 'CHEM11', name: 'Chemistry', categoryId: 'SCIENCE', subjectType: 'CORE', iconName: 'TestTube', gradeId: 11, boardId: 'cbse', streamId: 'science', color: 'from-emerald-600 to-teal-500', description: 'Structure of atom, chemical bonding, thermodynamics, equilibrium, organic chemistry basics.', chaptersCount: 4, totalQuestionsCount: 170, isCore: true, isActive: true },
  { id: 'g11-sci-math', code: 'MATH11', name: 'Mathematics', categoryId: 'MATHEMATICS', subjectType: 'CORE', iconName: 'Calculator', gradeId: 11, boardId: 'cbse', streamId: 'science', color: 'from-amber-600 to-orange-500', description: 'Sets and functions, trigonometric functions, complex numbers, permutations, calculus limits.', chaptersCount: 4, totalQuestionsCount: 190, isCore: true, isActive: true },
  { id: 'g11-sci-appmath', code: 'APPMATH11', name: 'Applied Mathematics', categoryId: 'MATHEMATICS', subjectType: 'OPTIONAL', iconName: 'Calculator', gradeId: 11, boardId: 'cbse', streamId: 'science', color: 'from-amber-500 to-yellow-600', description: 'Numbers, quantification, mathematical reasoning, financial mathematics, coordinate geometry.', chaptersCount: 4, totalQuestionsCount: 140, isOptional: true, isActive: true },
  { id: 'g11-sci-bio', code: 'BIO11', name: 'Biology', categoryId: 'SCIENCE', subjectType: 'OPTIONAL', iconName: 'Dna', gradeId: 11, boardId: 'cbse', streamId: 'science', color: 'from-green-600 to-emerald-500', description: 'The living world, biological classification, plant physiology, animal kingdom, cell cycle.', chaptersCount: 4, totalQuestionsCount: 160, isOptional: true, isActive: true },
  { id: 'g11-sci-biotech', code: 'BIOTECH11', name: 'Biotechnology', categoryId: 'SCIENCE', subjectType: 'OPTIONAL', iconName: 'FlaskConical', gradeId: 11, boardId: 'cbse', streamId: 'science', color: 'from-teal-600 to-cyan-600', description: 'Biotechnology fundamentals, cell culture, biomolecules, and recombinant DNA technology.', chaptersCount: 4, totalQuestionsCount: 120, isOptional: true, isActive: true },
  { id: 'g11-sci-cs', code: 'CS11', name: 'Computer Science (Python)', categoryId: 'COMPUTER_TECH', subjectType: 'OPTIONAL', iconName: 'Monitor', gradeId: 11, boardId: 'cbse', streamId: 'science', color: 'from-indigo-600 to-purple-600', description: 'Computer systems, Python strings/lists/tuples/dictionaries, and cyber safety laws.', chaptersCount: 4, totalQuestionsCount: 150, isOptional: true, isActive: true },
  { id: 'g11-sci-ip', code: 'IP11', name: 'Informatics Practices', categoryId: 'COMPUTER_TECH', subjectType: 'OPTIONAL', iconName: 'Monitor', gradeId: 11, boardId: 'cbse', streamId: 'science', color: 'from-sky-600 to-blue-600', description: 'Database management (SQL), data handling with Python Pandas, and digital footprints.', chaptersCount: 4, totalQuestionsCount: 130, isOptional: true, isActive: true },
  { id: 'g11-sci-eng', code: 'ENG11', name: 'English Core', categoryId: 'LANGUAGES', subjectType: 'CORE', iconName: 'BookOpen', gradeId: 11, boardId: 'cbse', streamId: 'science', color: 'from-blue-600 to-indigo-600', description: 'Hornbill, Snapshots, note making, speech writing, and formal communications.', chaptersCount: 4, totalQuestionsCount: 100, isCore: true, isActive: true },
  { id: 'g11-sci-pe', code: 'PE11', name: 'Physical Education', categoryId: 'PHYSICAL_EDUCATION', subjectType: 'ENRICHMENT', iconName: 'Zap', gradeId: 11, boardId: 'cbse', streamId: 'science', color: 'from-emerald-600 to-teal-600', description: 'Changing trends in sports, Olympic movement, yoga lifestyle, and sports physiology.', chaptersCount: 4, totalQuestionsCount: 90, isEnrichment: true, isActive: true },
  { id: 'g11-sci-competitive', code: 'JEE_NEET11', name: 'JEE Main & Advanced / NEET Prep', categoryId: 'COMPETITIVE_ADVANCED', subjectType: 'COMPETITIVE', iconName: 'Award', gradeId: 11, boardId: 'cbse', streamId: 'science', color: 'from-amber-600 to-red-600', description: 'High-yield numericals, multi-concept problems, previous year questions (PYQs).', chaptersCount: 4, totalQuestionsCount: 220, isActive: true },

  // ==========================================
  // --- GRADE 11: COMMERCE STREAM ---
  // ==========================================
  { id: 'g11-com-acc', code: 'ACC11', name: 'Accountancy', categoryId: 'COMMERCE', subjectType: 'CORE', iconName: 'FileSpreadsheet', gradeId: 11, boardId: 'cbse', streamId: 'commerce', color: 'from-teal-600 to-emerald-600', description: 'Accounting equation, journal entries, ledger, trial balance, depreciation, financial statements.', chaptersCount: 4, totalQuestionsCount: 140, isCore: true, isActive: true },
  { id: 'g11-com-bst', code: 'BST11', name: 'Business Studies', categoryId: 'COMMERCE', subjectType: 'CORE', iconName: 'Briefcase', gradeId: 11, boardId: 'cbse', streamId: 'commerce', color: 'from-sky-600 to-blue-600', description: 'Nature and purpose of business, forms of business organization, private/public enterprises.', chaptersCount: 4, totalQuestionsCount: 120, isCore: true, isActive: true },
  { id: 'g11-com-eco', code: 'ECO11', name: 'Economics (Micro & Stats)', categoryId: 'COMMERCE', subjectType: 'CORE', iconName: 'TrendingUp', gradeId: 11, boardId: 'cbse', streamId: 'commerce', color: 'from-amber-600 to-yellow-600', description: 'Consumer behavior, demand and supply, elasticities, measures of central tendency.', chaptersCount: 4, totalQuestionsCount: 130, isCore: true, isActive: true },
  { id: 'g11-com-math', code: 'MATH11C', name: 'Mathematics / Applied Math', categoryId: 'MATHEMATICS', subjectType: 'OPTIONAL', iconName: 'Calculator', gradeId: 11, boardId: 'cbse', streamId: 'commerce', color: 'from-orange-600 to-amber-500', description: 'Financial mathematics, calculus, probability, linear programming, and matrices.', chaptersCount: 4, totalQuestionsCount: 150, isOptional: true, isActive: true },
  { id: 'g11-com-ent', code: 'ENT11', name: 'Entrepreneurship', categoryId: 'COMMERCE', subjectType: 'OPTIONAL', iconName: 'Sparkles', gradeId: 11, boardId: 'cbse', streamId: 'commerce', color: 'from-purple-600 to-indigo-600', description: 'Entrepreneurial opportunity, business planning, market feasibility, and enterprise growth.', chaptersCount: 4, totalQuestionsCount: 100, isOptional: true, isActive: true },
  { id: 'g11-com-ip', code: 'IP11C', name: 'Informatics Practices', categoryId: 'COMPUTER_TECH', subjectType: 'OPTIONAL', iconName: 'Monitor', gradeId: 11, boardId: 'cbse', streamId: 'commerce', color: 'from-indigo-600 to-blue-600', description: 'Data handling, SQL queries, digital transactions, and commercial IT systems.', chaptersCount: 4, totalQuestionsCount: 110, isOptional: true, isActive: true },
  { id: 'g11-com-eng', code: 'ENG11C', name: 'English Core', categoryId: 'LANGUAGES', subjectType: 'CORE', iconName: 'BookOpen', gradeId: 11, boardId: 'cbse', streamId: 'commerce', color: 'from-blue-600 to-indigo-600', description: 'Hornbill, Snapshots, business correspondence, reports, and analytical essays.', chaptersCount: 4, totalQuestionsCount: 100, isCore: true, isActive: true },
  { id: 'g11-com-finlit', code: 'FINLIT11', name: 'Financial Literacy & Markets', categoryId: 'GK_SKILLS', subjectType: 'ENRICHMENT', iconName: 'TrendingUp', gradeId: 11, boardId: 'cbse', streamId: 'commerce', color: 'from-emerald-600 to-teal-600', description: 'Banking systems, stock markets, mutual funds, personal budgeting, and investments.', chaptersCount: 4, totalQuestionsCount: 80, isEnrichment: true, isActive: true },
  { id: 'g11-com-competitive', code: 'CA_FOUND11', name: 'CA Foundation & CUET Prep', categoryId: 'COMPETITIVE_ADVANCED', subjectType: 'COMPETITIVE', iconName: 'Award', gradeId: 11, boardId: 'cbse', streamId: 'commerce', color: 'from-amber-600 to-red-600', description: 'Accounting standards, mercantile law foundation, microeconomics, and quant reasoning.', chaptersCount: 4, totalQuestionsCount: 130, isActive: true },

  // ==========================================
  // --- GRADE 11: HUMANITIES / ARTS STREAM ---
  // ==========================================
  { id: 'g11-hum-hist', code: 'HIST11', name: 'History (Themes in World History)', categoryId: 'SOCIAL_SCIENCE', subjectType: 'CORE', iconName: 'Hourglass', gradeId: 11, boardId: 'cbse', streamId: 'humanities', color: 'from-amber-700 to-orange-700', description: 'Early societies, empires across three continents, changing cultural traditions, modernization.', chaptersCount: 4, totalQuestionsCount: 110, isCore: true, isActive: true },
  { id: 'g11-hum-pol', code: 'POL11', name: 'Political Science', categoryId: 'SOCIAL_SCIENCE', subjectType: 'CORE', iconName: 'ShieldAlert', gradeId: 11, boardId: 'cbse', streamId: 'humanities', color: 'from-indigo-600 to-purple-600', description: 'Indian Constitution at work, political theory, freedom, equality, social justice, rights.', chaptersCount: 4, totalQuestionsCount: 115, isCore: true, isActive: true },
  { id: 'g11-hum-geo', code: 'GEO11', name: 'Geography (Physical & Human)', categoryId: 'SOCIAL_SCIENCE', subjectType: 'CORE', iconName: 'Globe', gradeId: 11, boardId: 'cbse', streamId: 'humanities', color: 'from-emerald-600 to-teal-600', description: 'Fundamentals of physical geography, landforms, climate, India physical environment.', chaptersCount: 4, totalQuestionsCount: 110, isCore: true, isActive: true },
  { id: 'g11-hum-eco', code: 'ECO11H', name: 'Economics', categoryId: 'SOCIAL_SCIENCE', subjectType: 'OPTIONAL', iconName: 'TrendingUp', gradeId: 11, boardId: 'cbse', streamId: 'humanities', color: 'from-yellow-600 to-amber-600', description: 'Statistics for economics, introductory microeconomics, Indian economic development.', chaptersCount: 4, totalQuestionsCount: 120, isOptional: true, isActive: true },
  { id: 'g11-hum-soc', code: 'SOC11', name: 'Sociology', categoryId: 'SOCIAL_SCIENCE', subjectType: 'OPTIONAL', iconName: 'Landmark', gradeId: 11, boardId: 'cbse', streamId: 'humanities', color: 'from-rose-600 to-pink-600', description: 'Introducing sociology, understanding society, social institutions, and culture.', chaptersCount: 4, totalQuestionsCount: 100, isOptional: true, isActive: true },
  { id: 'g11-hum-psych', code: 'PSYCH11', name: 'Psychology', categoryId: 'SOCIAL_SCIENCE', subjectType: 'OPTIONAL', iconName: 'Brain', gradeId: 11, boardId: 'cbse', streamId: 'humanities', color: 'from-purple-600 to-indigo-600', description: 'What is psychology, biological bases of behavior, human development, sensory processes.', chaptersCount: 4, totalQuestionsCount: 100, isOptional: true, isActive: true },
  { id: 'g11-hum-eng', code: 'ENG11H', name: 'English Core', categoryId: 'LANGUAGES', subjectType: 'CORE', iconName: 'BookOpen', gradeId: 11, boardId: 'cbse', streamId: 'humanities', color: 'from-blue-600 to-indigo-600', description: 'Hornbill, Snapshots, creative essay writing, critical literary analysis.', chaptersCount: 4, totalQuestionsCount: 100, isCore: true, isActive: true },
  { id: 'g11-hum-fineart', code: 'ART11', name: 'Fine Arts & Painting', categoryId: 'ARTS_CREATIVE', subjectType: 'ENRICHMENT', iconName: 'Sparkles', gradeId: 11, boardId: 'cbse', streamId: 'humanities', color: 'from-pink-600 to-rose-600', description: 'History of Indian art, prehistoric rock paintings, Indus Valley sculptures, and temple art.', chaptersCount: 4, totalQuestionsCount: 80, isEnrichment: true, isActive: true },
  { id: 'g11-hum-competitive', code: 'CUET_HUM11', name: 'CUET & Civil Services Foundation', categoryId: 'COMPETITIVE_ADVANCED', subjectType: 'COMPETITIVE', iconName: 'Award', gradeId: 11, boardId: 'cbse', streamId: 'humanities', color: 'from-amber-600 to-red-600', description: 'General test reasoning, world affairs, constitutional principles, and analytical writing.', chaptersCount: 4, totalQuestionsCount: 140, isActive: true },
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
