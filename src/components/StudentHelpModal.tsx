import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LanguageSelector } from './LanguageSelector';
import {
  X,
  BookOpen,
  GraduationCap,
  Sparkles,
  Mic,
  Brain,
  HelpCircle,
  Clock,
  RotateCcw,
  Bot,
  Globe,
  Search,
  CheckCircle2,
  ChevronRight,
  Volume2,
  VolumeX,
  FileText,
  Award,
  Layers,
  ArrowRight,
  Lightbulb,
  Zap,
  Compass,
  MessageSquare,
  Flame,
  Check,
} from 'lucide-react';

interface GuideSection {
  id: string;
  title: string;
  shortTitle: string;
  icon: React.ElementType;
  color: string;
  badge: string;
  summary: string;
  steps: {
    title: string;
    description: string;
    tip?: string;
    actionLabel?: string;
    actionView?: string;
  }[];
  faq: { q: string; a: string }[];
}

export const StudentHelpModal: React.FC = () => {
  const {
    isHelpModalOpen,
    closeHelpModal,
    setActiveView,
    openAITutorWithContext,
    speakText,
    stopSpeaking,
    isSpeaking,
    selectedBoardId,
    selectedGradeId,
    selectedLanguage,
    setSelectedLanguage,
    availableLanguages,
    boards,
    grades,
    openExamPrep,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>('getting-started');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isHelpModalOpen) return null;

  const activeBoard = boards.find((b) => b.id === selectedBoardId);
  const activeGrade = grades.find((g) => g.id === selectedGradeId);
  const currentLang =
    availableLanguages.find((l) => l.code === selectedLanguage) ||
    availableLanguages[0];

  const popularLanguages = availableLanguages.filter((l) => l.isPopular);

  const guideSections: GuideSection[] = [
    {
      id: 'getting-started',
      title: '🚀 Getting Started & Board Selection',
      shortTitle: 'Getting Started',
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Step 1',
      summary: 'Learn how to configure your School Board, Grade, and Stream for personalized curriculum learning.',
      steps: [
        {
          title: 'Select your School Board & Grade',
          description:
            'Use the Board & Grade badge in the top header or visit the Classes page to pick your board (CBSE, ICSE, West Bengal State Board, Cambridge / IB, etc.) and your grade level (Grade 1 to 11).',
          tip: 'Curriculum topics, subject names, and regional languages automatically tailor to your exact board selection.',
          actionLabel: 'Browse Classes Catalog',
          actionView: 'classes_catalog',
        },
        {
          title: 'Choose your Academic Stream (Grades 11+)',
          description:
            'For senior grades, filter subjects by Science (PCM/PCB), Commerce (with Maths/Informatics), or Humanities / Arts.',
          tip: 'You can change streams anytime without losing your past practice points.',
        },
        {
          title: 'Explore your Daily Study Plan & Streak',
          description:
            'Your Study Mode dashboard presents a personalized 15-to-45 minute daily checklist with chapter reviews, quick quizzes, and spaced repetitions.',
          tip: 'Completing daily tasks boosts your Study Streak and earns you XP!',
          actionLabel: 'Go to Study Mode',
          actionView: 'student_dashboard',
        },
      ],
      faq: [
        {
          q: 'Can I switch my board or grade later?',
          a: 'Yes! Click the Grade | Board pill in the top header or in the Classes Catalog to switch anytime.',
        },
        {
          q: 'Does DESHNA support state languages?',
          a: 'Yes! State boards (like WB Board) include regional subjects (Bengali, Physical Science, Life Science), and the entire UI supports 22 Indian languages via the Language Selector.',
        },
      ],
    },
    {
      id: 'indian-languages',
      title: '🌐 22+ Indian Languages & Regional Medium',
      shortTitle: 'Indian Languages',
      icon: Globe,
      color: 'from-teal-500 to-emerald-600',
      badge: 'Multilingual',
      summary: 'Study in your mother tongue! Seamlessly toggle between English, Hindi, Bengali, Tamil, Telugu, Marathi, and 22 official Indian languages.',
      steps: [
        {
          title: 'Choose Your Preferred Indian Language',
          description:
            'Click the Language button in the modal header or top navigation bar. Select from 22 official scheduled languages including Hindi (हिन्दी), Bengali (বাংলা), Tamil (தமிழ்), Telugu (తెలుగు), Marathi (मराठी), Gujarati (ગુજરાતી), and more.',
          tip: 'All navigation menus, buttons, chapter concepts, and voice narration immediately translate into your selected regional tongue.',
        },
        {
          title: 'Listen to Voice Pronunciations & Audio Summaries',
          description:
            'Click the speaker icon next to any chapter, vocabulary card, or question to hear authentic speech in your regional language.',
        },
        {
          title: 'Ask AI Tutor in Your Native Language',
          description:
            'You can type your doubts in Hinglish, Bengali, Tamil script, or romanized regional phrases. The AI Tutor responds fluently in your language!',
          actionLabel: 'Ask AI Tutor',
          actionView: 'open_tutor',
        },
      ],
      faq: [
        {
          q: 'Which languages are supported?',
          a: 'All 22 Eighth Schedule languages of India (Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santali, Sindhi, Tamil, Telugu, Urdu) + English.',
        },
        {
          q: 'Can I study Science and Math in regional mediums?',
          a: 'Yes! Scientific terms, formula sheets, and chapter explanations are customized for bilingual learning.',
        },
      ],
    },
    {
      id: 'classes-practice',
      title: '📚 Classes, Chapters & Interactive Quizzes',
      shortTitle: 'Classes & Practice',
      icon: BookOpen,
      color: 'from-amber-500 to-orange-600',
      badge: 'Step 2',
      summary: 'Master concepts with structured chapter outlines, interactive question practice, and detailed answer breakdowns.',
      steps: [
        {
          title: 'Browse Subjects & Chapter Milestones',
          description:
            'Click on any subject in your catalog to view its structured curriculum chapters, topic breakdowns, and formula sheets.',
          actionLabel: 'Open Classes',
          actionView: 'classes_catalog',
        },
        {
          title: 'Practice Questions with Instant Feedback',
          description:
            'Solve multiple-choice questions, fill-in-the-blanks, and concept checks. Get immediate visual feedback on correct answers.',
        },
        {
          title: '✨ Deep-Dive Detailed Answer Breakdown',
          description:
            'After answering, click the "View Detailed Answer Breakdown" button on any question. It reveals step-by-step solutions, pedagogical takeaways, exam marking strategies, and audio narration.',
          tip: 'Stuck on a concept? Click "Discuss with AI Tutor" inside the breakdown modal for conversational Socratic help!',
        },
      ],
      faq: [
        {
          q: 'How do I earn XP and Badges?',
          a: 'You earn 10 to 50 XP for every question solved correctly, passing chapter quizzes, and maintaining daily streaks.',
        },
        {
          q: 'Can I listen to chapter summaries aloud?',
          a: 'Yes! Click the speaker icon on any topic summary or question to listen to speech synthesis.',
        },
      ],
    },
    {
      id: 'reading-vocab',
      title: '🎙️ Reading Coach & Vocabulary Vault',
      shortTitle: 'Reading & Vocab',
      icon: Mic,
      color: 'from-pink-500 to-rose-600',
      badge: 'Step 3',
      summary: 'Boost English and regional language fluency with interactive speech recognition and flashcards.',
      steps: [
        {
          title: 'Practice Aloud with Speech AI',
          description:
            'Open the Reading Coach, choose an engaging passage, click the microphone button, and read aloud. The AI listens and highlights your speech in real-time.',
          actionLabel: 'Launch Reading Coach',
          actionView: 'reading_coach',
          tip: 'Ensure your browser microphone permission is enabled when prompted.',
        },
        {
          title: 'Receive Instant Fluency & Pronunciation Scores',
          description:
            'Get immediate feedback on your reading speed (Words Per Minute), accuracy percentage, and tricky words that need practice.',
        },
        {
          title: 'Expand your Vocabulary Vault',
          description:
            'Learn new academic terms with contextual meanings, phonetic pronunciations, synonyms, and example usage in the Vocabulary Vault.',
          actionLabel: 'Open Vocabulary Vault',
          actionView: 'vocabulary_vault',
        },
      ],
      faq: [
        {
          q: 'What if my microphone does not work in preview?',
          a: 'Click "Open in New Tab" or check browser settings to allow microphone permissions for real-time speech.',
        },
        {
          q: 'Are there stories for younger and older grades?',
          a: 'Yes, passages range from foundational phonics and folk tales to advanced scientific comprehension.',
        },
      ],
    },
    {
      id: 'ai-tutor-doubts',
      title: '🤖 24/7 AI Tutor & Snap Doubt Solver',
      shortTitle: 'AI Tutor & Doubts',
      icon: Bot,
      color: 'from-violet-500 to-purple-600',
      badge: 'Step 4',
      summary: 'Get instant, step-by-step doubt resolution and Socratic conceptual tutoring anytime.',
      steps: [
        {
          title: 'Ask AI Tutor Anytime',
          description:
            'Click the pink "Ask AI Tutor" button in the header or inside any chapter. The AI Tutor understands your current grade, board, and topic context.',
          actionLabel: 'Chat with AI Tutor',
          actionView: 'open_tutor',
        },
        {
          title: 'Snap Photo or Type Doubts in Doubt Solver',
          description:
            'Upload or snap a photo of any textbook question, type a math equation, or speak your doubt. Receive instant step-by-step breakdown.',
          actionLabel: 'Open Doubt Solver',
          actionView: 'doubt_solver',
        },
        {
          title: 'Socratic Step-by-Step Learning',
          description:
            'The AI provides hints, conceptual analogies, and formula explanations rather than just spoon-feeding direct answers.',
        },
      ],
      faq: [
        {
          q: 'Can the AI Tutor explain in Hindi, Bengali, or Tamil?',
          a: 'Yes! Ask the AI in your preferred language or use the Language Selector in the top header.',
        },
        {
          q: 'Does it solve complex math and physics numericals?',
          a: 'Yes, it provides LaTeX equations, unit conversions, and formula derivations.',
        },
      ],
    },
    {
      id: 'exams-revision',
      title: '📝 Exam Prep, Time Trials & Spaced Revision',
      shortTitle: 'Exams & Revision',
      icon: Clock,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Step 5',
      summary: 'Prepare for school unit tests and board exams with timed mock papers and scientifically scheduled flashcards.',
      steps: [
        {
          title: 'Practice Timed Board Mock Exams',
          description:
            'Select full-syllabus or chapter-specific mock tests with countdown timers, Section A/B/C/D layouts, and instant scorecards.',
          actionLabel: 'Explore Exam Prep',
          actionView: 'exam_prep',
        },
        {
          title: 'Boost Memory with Spaced Repetition',
          description:
            'Review flashcards due for revision. Rate your recall as "Easy", "Good", or "Hard" to automatically schedule your next review interval.',
          actionLabel: 'Start Spaced Revision',
          actionView: 'spaced_revision',
        },
        {
          title: 'Analyze Weak Areas & Revision Readiness',
          description:
            'Track your accuracy meters, time-per-question, and difficulty breakdowns to focus your study time on chapters that need improvement.',
        },
      ],
      faq: [
        {
          q: 'Are mock test patterns aligned with official boards?',
          a: 'Yes! Question distributions follow standard CBSE, ICSE, State Board, and Cambridge assessment frameworks.',
        },
        {
          q: 'How does Spaced Repetition help?',
          a: 'By reviewing topics right before you are about to forget them, neural retention increases by over 300%.',
        },
      ],
    },
    {
      id: 'mobile-mock-search',
      title: '📱 Mobile Version & Grade-Wise Mocks / Search',
      shortTitle: 'Mobile & Mocks',
      icon: Zap,
      color: 'from-rose-500 to-amber-600',
      badge: 'Mobile & Easy',
      summary: 'Designed specifically for students on mobile phones! Simple card-based layout, 1-tap grade mock tests, and instant question search.',
      steps: [
        {
          title: 'Clean Card-Based Mobile Navigation',
          description:
            'On mobile phones, unnecessary clutter is removed. You get direct card-based shortcuts: Study Hub, Mock Tests & Quizzes, AI Tutor, and Question Search right on your screen and bottom navigation bar.',
          tip: 'No complex menus or nested tabs! Tap any card to immediately begin practicing.',
        },
        {
          title: 'Grade 1–5 Quizzes vs. Grade 5–11 30-Question Mocks',
          description:
            'Lower grades (Grades 1 to 5) have 4 core foundational subjects with fun, interactive quizzes, audio narration, and instant confetti rewards. Higher grades (Grades 5 to 11) have 7+ subjects with full 30-question timed mock exams, countdown clocks, and retake question shuffling.',
          actionLabel: 'Launch Grade Mock Tests',
          actionView: 'open_mocks',
        },
        {
          title: 'Grade-Wise Question Search Bank',
          description:
            'Looking for specific questions or chapter practice? Use the Question Search Bank to filter questions by your grade, subject, difficulty, and keywords with instant step-by-step solutions.',
          actionLabel: 'Search Question Bank',
          actionView: 'open_search_questions',
        },
      ],
      faq: [
        {
          q: 'Where do I find Mock Tests on mobile?',
          a: 'Tap the "Mock Tests" icon on the bottom navigation bar or the pink "Grade Mock Exams / Quizzes" card on your dashboard.',
        },
        {
          q: 'How many questions are in a mock exam?',
          a: 'For higher grade students, mock exams feature 30 questions covering all chapters of the subject with an official timer countdown and detailed scorecard.',
        },
        {
          q: 'Can I search questions across all subjects?',
          a: 'Yes! The Question Search Bank automatically selects your current grade and displays questions across all your enrolled subjects with filter and search capabilities.',
        },
      ],
    },
    {
      id: 'roles-parents',
      title: '👨‍👩‍👦 Parent Insights & Multi-Student Profiles',
      shortTitle: 'Parent & Teacher',
      icon: Layers,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Step 6',
      summary: 'Empower parents and mentors with transparent weekly progress, streak insights, and WhatsApp summaries.',
      steps: [
        {
          title: 'Switch to Parent or Teacher View',
          description:
            'Use the Role Switcher in the top header to access the Parent Dashboard with detailed analytics on study time, accuracy, and topic mastery.',
        },
        {
          title: 'Manage Multiple Student Profiles',
          description:
            'Parents with multiple children can seamlessly switch between student accounts and configure independent boards and grades.',
        },
        {
          title: 'Export & Share Progress Reports',
          description:
            'Generate WhatsApp-friendly progress updates or download performance summaries for parent-teacher reviews.',
        },
      ],
      faq: [
        {
          q: 'Is student data saved securely?',
          a: 'Yes! Profiles, mastery scores, revision intervals, and practice history are preserved across sessions.',
        },
      ],
    },
  ];

  const handleAction = (view?: string) => {
    if (!view) return;
    if (view === 'open_tutor') {
      openAITutorWithContext();
    } else if (view === 'open_mocks') {
      openExamPrep('mock_tests', selectedGradeId);
    } else if (view === 'open_search_questions') {
      openExamPrep('search_questions', selectedGradeId);
    } else {
      setActiveView(view as any);
    }
    closeHelpModal();
  };

  const filteredSections = searchQuery.trim()
    ? guideSections.filter(
        (sec) =>
          sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sec.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sec.steps.some(
            (st) =>
              st.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              st.description.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          sec.faq.some(
            (f) =>
              f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
              f.a.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : guideSections;

  const currentSection =
    guideSections.find((s) => s.id === activeTab) || guideSections[0];

  return (
    <div
      id="student-help-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
    >
      {/* Modal Dialog Container */}
      <div
        id="student-help-modal-content"
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden flex flex-col max-h-[90vh] my-auto"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-4 sm:px-6 py-4 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 border border-white/30 shadow-inner">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-xl font-black tracking-tight leading-tight truncate">
                  Student & Parent User Guide
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black border border-white/30 uppercase">
                  DESHNA AI HUB
                </span>
              </div>
              <p className="text-xs text-amber-100 font-bold truncate">
                Everything you need to master your syllabus, exams, and AI tools
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Language Selector Dropdown in Modal Header */}
            <LanguageSelector variant="modal-header" />

            {/* Audio Voice Narration */}
            <button
              onClick={() =>
                isSpeaking
                  ? stopSpeaking()
                  : speakText(
                      `Welcome to the DESHNA AI Learning Hub Guide for ${activeGrade?.name || 'your grade'} and ${activeBoard?.name || 'your board'}. Selected language is ${currentLang.name}. Explore classes, practice with detailed answers, read with the AI speech coach, and prep for exams.`
                    )
              }
              className={`p-2 rounded-xl border text-xs font-black transition flex items-center space-x-1 cursor-pointer ${
                isSpeaking
                  ? 'bg-rose-500 text-white border-rose-300 animate-pulse'
                  : 'bg-white/20 hover:bg-white/30 text-white border-white/40'
              }`}
              title={isSpeaking ? 'Stop Audio Guide' : 'Listen to Overview'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden md:inline text-xs font-black">
                {isSpeaking ? 'Stop' : 'Listen'}
              </span>
            </button>

            {/* Close Modal */}
            <button
              id="close-student-help-modal-btn"
              onClick={closeHelpModal}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition border border-white/30 cursor-pointer"
              aria-label="Close Guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Search & Active Context Bar */}
        <div className="bg-amber-50/80 px-4 sm:px-6 py-2.5 border-b-2 border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-amber-700 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="guide-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guide (e.g. language, detailed answers, exams)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs font-bold rounded-xl border-2 border-amber-300 bg-white text-slate-800 focus:outline-none focus:border-amber-500 placeholder:text-slate-400 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center flex-wrap gap-2 text-xs font-bold self-end sm:self-auto">
            {/* Active Language Badge */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-white border border-amber-300 shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[10px] font-bold text-slate-500">Language:</span>
              <span className="text-[11px] font-black text-amber-900">
                {currentLang.nativeName} ({currentLang.name})
              </span>
            </div>

            {/* Active Curriculum Badge */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-white border border-amber-300 shadow-2xs">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[10px] font-bold text-slate-500">Curriculum:</span>
              <span className="text-[11px] font-black text-emerald-950">
                {activeGrade?.name || `Grade ${selectedGradeId}`} • {activeBoard?.code || 'CBSE'}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Main Content Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
          {/* Left Sidebar Navigation Tabs */}
          <nav className="w-full md:w-64 bg-slate-50 border-r-2 border-slate-200 p-2 sm:p-3 overflow-y-auto space-y-1.5 shrink-0 flex md:flex-col overflow-x-auto md:overflow-x-visible">
            {filteredSections.map((sec) => {
              const IconComp = sec.icon;
              const isActive = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  id={`guide-tab-${sec.id}`}
                  onClick={() => {
                    setActiveTab(sec.id);
                  }}
                  className={`w-full text-left p-2.5 rounded-2xl font-black text-xs transition flex items-center space-x-2.5 shrink-0 md:shrink border-2 ${
                    isActive
                      ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-xs scale-[1.01]'
                      : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-200 hover:border-amber-200'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-black">{sec.shortTitle}</p>
                    <p
                      className={`text-[10px] truncate ${
                        isActive ? 'text-slate-900/80 font-bold' : 'text-slate-400 font-medium'
                      }`}
                    >
                      {sec.badge}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Right Main Content Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-white min-w-0">
            {/* Active Section Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-900 text-[10px] font-black uppercase">
                  {currentSection.badge}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {currentSection.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {currentSection.summary}
              </p>
            </div>

            {/* Step-by-Step Practical Guides */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-xs font-black text-slate-900 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Step-by-Step Instructions</span>
              </div>

              {/* Special Interactive Language Switcher Card for Indian Languages Section */}
              {currentSection.id === 'indian-languages' && (
                <div className="p-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-5 h-5 text-emerald-700" />
                      <h4 className="text-xs sm:text-sm font-black text-emerald-950">
                        Choose Your Language Right Here
                      </h4>
                    </div>
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded-md">
                      22 Official + English
                    </span>
                  </div>

                  <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                    Click on any language card below to switch the entire application, AI Tutor, speech narration, and vocabulary instantly:
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1">
                    {popularLanguages.map((lang) => {
                      const isSelected = lang.code === selectedLanguage;
                      return (
                        <button
                          key={lang.code}
                          id={`modal-lang-pick-${lang.code}`}
                          onClick={() => {
                            setSelectedLanguage(lang.code);
                            speakText(lang.welcomeGreeting, lang.code);
                          }}
                          className={`p-2.5 rounded-xl text-left transition flex items-center justify-between border-2 cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs font-black'
                              : 'bg-white hover:bg-emerald-100/70 text-slate-800 border-emerald-200 hover:border-emerald-300'
                          }`}
                        >
                          <div className="truncate min-w-0 pr-1">
                            <div className="text-xs font-black truncate">{lang.nativeName}</div>
                            <div className={`text-[10px] truncate ${isSelected ? 'text-emerald-100 font-bold' : 'text-slate-500 font-medium'}`}>
                              {lang.name}
                            </div>
                          </div>
                          {isSelected ? (
                            <Check className="w-4 h-4 shrink-0 text-white" />
                          ) : (
                            <span className="text-[9px] px-1 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold shrink-0">
                              {lang.code.toUpperCase()}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {currentSection.steps.map((st, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-2xl border-2 border-slate-200 hover:border-amber-300 bg-slate-50/50 hover:bg-amber-50/20 transition space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start space-x-2.5">
                        <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-900 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-slate-900">
                            {st.title}
                          </h4>
                          <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                            {st.description}
                          </p>
                        </div>
                      </div>

                      {st.actionLabel && (
                        <button
                          onClick={() => handleAction(st.actionView)}
                          className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-[11px] rounded-xl border border-amber-500 transition shadow-2xs shrink-0 flex items-center space-x-1 cursor-pointer"
                        >
                          <span>{st.actionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {st.tip && (
                      <div className="ml-8.5 p-2 rounded-xl bg-amber-100/60 border border-amber-200/80 text-[11px] font-bold text-amber-900 flex items-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Pro Tip: {st.tip}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs for this Section */}
            {currentSection.faq.length > 0 && (
              <div className="space-y-3 pt-2 border-t-2 border-slate-100">
                <div className="flex items-center space-x-2 text-xs font-black text-slate-900 uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  <span>Frequently Asked Questions</span>
                </div>

                <div className="space-y-2">
                  {currentSection.faq.map((f, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                    >
                      <p className="font-black text-slate-800 flex items-center space-x-1.5">
                        <span className="text-amber-600 font-black">Q:</span>
                        <span>{f.q}</span>
                      </p>
                      <p className="text-slate-600 font-medium pl-4 leading-relaxed">
                        <span className="text-emerald-700 font-black mr-1">A:</span>
                        {f.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer with Quick Action Launchers */}
        <div className="bg-slate-50 px-4 sm:px-6 py-3.5 border-t-2 border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-bold">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Ready to learn? Jump into any module directly:</span>
          </div>

          <div className="flex items-center space-x-2 flex-wrap gap-y-1.5">
            <button
              onClick={() => handleAction('classes_catalog')}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-black rounded-xl border border-amber-500 transition shadow-2xs"
            >
              Classes Catalog
            </button>
            <button
              onClick={() => handleAction('exam_prep')}
              className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-black rounded-xl border border-blue-600 transition shadow-2xs"
            >
              Mock Exam Prep
            </button>
            <button
              onClick={() => handleAction('open_tutor')}
              className="px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-white text-xs font-black rounded-xl border border-pink-600 transition shadow-2xs"
            >
              Ask AI Tutor
            </button>
            <button
              onClick={closeHelpModal}
              className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-black rounded-xl transition"
            >
              Got it, Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
