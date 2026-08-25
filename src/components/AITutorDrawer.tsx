import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Lightbulb,
  HelpCircle,
  Volume2,
  BookOpen,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export const AITutorDrawer: React.FC = () => {
  const {
    isAITutorOpen,
    setIsAITutorOpen,
    aiTutorContext,
    currentStudent,
    selectedBoardId,
    speakText,
    selectedLanguage,
  } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting whenever context changes
  useEffect(() => {
    if (isAITutorOpen && messages.length === 0) {
      const isPrimary = currentStudent.gradeId <= 5;
      const initialGreeting = isPrimary
        ? `Hi ${currentStudent.name.split(' ')[0]}! 🌟 I'm your friendly AI Learning Companion! We are exploring **${
            aiTutorContext?.topic || aiTutorContext?.chapter || 'your lessons'
          }** in **${aiTutorContext?.subject || 'Mathematics'}**. What would you like to discover or ask?`
        : `Greetings ${currentStudent.name.split(' ')[0]}. I'm your AI Academic Mentor for Grade ${
            currentStudent.gradeId
          }. We are analyzing **${aiTutorContext?.topic || aiTutorContext?.chapter || 'this module'}** in **${
            aiTutorContext?.subject || 'Science'
          }**. Ask me any conceptual question, derivation, or problem!`;

      setMessages([
        {
          id: 'msg-init',
          role: 'model',
          text: initialGreeting,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [isAITutorOpen, aiTutorContext, currentStudent]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText.trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          studentName: currentStudent.name,
          grade: currentStudent.gradeId,
          board: selectedBoardId,
          subject: aiTutorContext?.subject || 'Mathematics',
          chapter: aiTutorContext?.chapter || 'General Concepts',
          topic: aiTutorContext?.topic || 'Core Understanding',
          message: query,
          chatHistory: messages.map((m) => ({ role: m.role, text: m.text })),
          masteryLevel: currentStudent.masteryBySubject['g3-math'] || 65,
          language: selectedLanguage,
        }),
      });

      clearTimeout(timeoutId);
      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply || data.message || 'Let us explore this concept step by step! What part feels most interesting to you?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.warn('AI Tutor request handled via smart fallback:', err);
      const isAbort = err?.name === 'AbortError';
      
      const isPrimary = currentStudent.gradeId <= 5;
      const fallbackReply = query.toLowerCase().includes('story') || query.toLowerCase().includes('everyday')
        ? `🌟 **Everyday Story for ${aiTutorContext?.topic || aiTutorContext?.subject || 'this concept'}**\n\nImagine sharing a box of delicious treats equally among your classmates! When you look at how each piece connects to the whole box, that is the exact principle behind ${aiTutorContext?.topic || 'this topic'}.\n\nWould you like to try an easy question with this story?`
        : `Let's break down **${aiTutorContext?.topic || aiTutorContext?.subject || 'this concept'}** together!\n\n- **Step 1**: Identify what you are given and what you need to find.\n- **Step 2**: Apply the core rule for ${aiTutorContext?.subject || 'this lesson'}.\n- **Step 3**: Double-check your final answer step-by-step.\n\nWhat is the first clue or number in your question?`;

      const errorMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestionChips =
    currentStudent.gradeId <= 5
      ? [
          'Can you explain this with an everyday story?',
          'Give me an easy practice puzzle!',
          "Why is this important in real life?",
          'Help me understand step 1.',
        ]
      : [
          'What is the core conceptual principle here?',
          'Walk me through a step-by-step example.',
          'What are common mistakes students make in exams?',
          'Can you test my understanding with a challenging question?',
        ];

  if (!isAITutorOpen) return null;

  return (
    <div className="fixed inset-0 bottom-16 sm:bottom-[68px] xl:bottom-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      {/* Backdrop tap to close */}
      <div
        className="absolute inset-0 bg-transparent"
        onClick={() => setIsAITutorOpen(false)}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-200 bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-bold text-xs sm:text-sm">DESHNA AI Tutor</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-semibold border border-emerald-400/30">
                  Online
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-indigo-200 truncate max-w-[200px] sm:max-w-[260px]">
                {aiTutorContext?.subject} • {aiTutorContext?.topic || aiTutorContext?.chapter || 'Active Guidance'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setMessages([])}
              className="p-1.5 rounded-lg text-indigo-200 hover:text-white hover:bg-white/10 transition"
              title="Restart Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsAITutorOpen(false)}
              className="p-1.5 rounded-lg text-indigo-200 hover:text-white hover:bg-white/10 transition"
              title="Close Tutor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pedagogical Safety Banner */}
        <div className="px-3.5 sm:px-4 py-2 bg-indigo-50 border-b border-indigo-100 flex items-center space-x-2 text-[11px] text-indigo-900 shrink-0">
          <Lightbulb className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span className="truncate sm:overflow-visible">I guide you through methods and reasoning, so you truly master the concept!</span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-3 sm:p-3.5 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-xs'
                }`}
              >
                {msg.role === 'model' && (
                  <div className="flex items-center justify-between mb-1 pb-1 border-b border-slate-100 text-[11px] text-slate-400">
                    <span className="font-semibold text-indigo-600 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" /> AI Tutor
                    </span>
                    <button
                      onClick={() => speakText(msg.text.replace(/[*#_]/g, ''))}
                      className="text-slate-400 hover:text-indigo-600 p-0.5"
                      title="Listen to this explanation"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <div className="prose prose-xs max-w-none prose-slate">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
                <div
                  className={`text-[10px] mt-1.5 text-right ${
                    msg.role === 'user' ? 'text-indigo-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-slate-600 border border-slate-200 rounded-2xl rounded-bl-xs p-3 shadow-xs flex items-center space-x-2 text-xs">
                <Bot className="w-4 h-4 text-indigo-600 animate-spin" />
                <span>AI Tutor is thinking and tailoring the explanation...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-white border-t border-slate-100 overflow-x-auto flex space-x-1.5 scrollbar-none shrink-0">
          {suggestionChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 border border-slate-200/80 whitespace-nowrap transition"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-2.5 sm:p-3 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Ask a question in Grade ${currentStudent.gradeId} ${aiTutorContext?.subject || 'study'}...`}
              className="flex-1 px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl shadow-xs transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
