import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Globe, Check, Search, Sparkles, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'header' | 'mobile' | 'compact' | 'modal-header';
  className?: string;
  buttonClassName?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'header',
  className = '',
  buttonClassName = '',
}) => {
  const { selectedLanguage, setSelectedLanguage, availableLanguages, speakText, isSpeaking } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = availableLanguages.find((l) => l.code === selectedLanguage) || availableLanguages[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLanguages = availableLanguages.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularLanguages = filteredLanguages.filter((l) => l.isPopular);
  const otherLanguages = filteredLanguages.filter((l) => !l.isPopular);

  const handleSelectLanguage = (code: string) => {
    setSelectedLanguage(code);
    setIsOpen(false);
    setSearchQuery('');
    
    // Play subtle pronunciation welcome sample in selected language
    const langObj = availableLanguages.find((l) => l.code === code);
    if (langObj) {
      speakText(langObj.welcomeGreeting, langObj.code);
    }
  };

  if (variant === 'mobile') {
    return (
      <div className="w-full">
        {/* Collapsible Header Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-amber-100/60 border border-amber-200 text-left transition"
        >
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <span>Language (भाषा)</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                  {currentLang.nativeName}
                </span>
              </div>
              <div className="text-[10px] font-semibold text-slate-500">
                {currentLang.name} ({currentLang.region.split(',')[0]})
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-700">
            <span className="text-[11px]">{isOpen ? 'Hide' : 'Change'}</span>
            <ChevronDown className={`w-4 h-4 text-amber-700 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {/* Collapsible Language Grid when open */}
        {isOpen && (
          <div className="mt-2.5 p-2.5 bg-white rounded-2xl border-2 border-amber-200 shadow-sm space-y-2 animate-in fade-in zoom-in-95 duration-150">
            {/* Search within mobile drawer */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Bengali, Hindi, Tamil, etc..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-1.5 max-h-52 overflow-y-auto pr-1">
              {filteredLanguages.map((lang) => {
                const isSelected = lang.code === selectedLanguage;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`p-2 rounded-xl text-left transition flex items-center justify-between text-xs font-bold ${
                      isSelected
                        ? 'bg-amber-500 text-white shadow-xs font-black'
                        : 'bg-amber-50/60 text-slate-700 hover:bg-amber-100/80 border border-amber-200/60'
                    }`}
                  >
                    <div className="truncate min-w-0 pr-1">
                      <div className="truncate text-xs">{lang.nativeName}</div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-amber-100' : 'text-slate-500 font-normal'}`}>
                        {lang.name}
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  const isModalHeader = variant === 'modal-header';

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Toggle Button in Header / Modal */}
      <button
        id={isModalHeader ? 'modal-language-selector-dropdown-btn' : 'language-selector-dropdown-btn'}
        onClick={() => setIsOpen(!isOpen)}
        className={
          buttonClassName ||
          (isModalHeader
            ? 'flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-white/40 bg-white/20 hover:bg-white/30 text-white text-xs font-black shadow-xs transition cursor-pointer min-h-[36px]'
            : 'flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border-2 border-amber-200 bg-amber-50 hover:bg-amber-100/90 text-amber-950 text-xs font-black shadow-xs transition cursor-pointer min-h-[38px]')
        }
        title="Change Indian Language (বাংলা, हिन्दी, etc.)"
      >
        <Globe className={`w-4 h-4 shrink-0 ${isModalHeader ? 'text-amber-100' : 'text-amber-600'}`} />
        <span className="font-extrabold tracking-tight">
          {currentLang.nativeName.split(' ')[0]}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isModalHeader ? 'text-amber-100' : 'text-amber-700'} ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Floating Menu Popover */}
      {isOpen && (
        <>
          {/* Mobile backdrop to easily dismiss on outside tap */}
          <div
            className="fixed inset-0 bg-black/25 sm:hidden z-[65]"
            onClick={() => setIsOpen(false)}
          />
          <div
            id="language-dropdown-menu"
            className={`fixed inset-x-3 top-16 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-80 max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl border-4 border-amber-300 p-3 z-[70] animate-in fade-in zoom-in-95 duration-100`}
          >
            {/* Header & Search */}
            <div className="flex items-center justify-between pb-2 border-b border-amber-100">
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-black text-slate-900">Indian Languages</span>
              </div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                22 Official + EN
              </span>
            </div>

          {/* Fast Search Input */}
          <div className="relative my-2">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Bengali, Hindi, etc..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 font-bold"
              autoFocus
            />
          </div>

          {/* Language Options List */}
          <div className="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-slate-100">
            {/* Popular Languages Group */}
            {popularLanguages.length > 0 && (
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider text-amber-800 mb-1.5 px-1">
                  Popular Languages
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {popularLanguages.map((lang) => {
                    const isSelected = lang.code === selectedLanguage;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleSelectLanguage(lang.code)}
                        className={`p-2 rounded-xl text-left transition flex items-center justify-between text-xs cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-white font-black shadow-xs'
                            : 'bg-amber-50/60 hover:bg-amber-100 text-slate-800 border border-amber-100'
                        }`}
                      >
                        <div className="truncate min-w-0 pr-1">
                          <div className="font-extrabold text-xs truncate">{lang.nativeName}</div>
                          <div className={`text-[10px] truncate ${isSelected ? 'text-amber-100 font-semibold' : 'text-slate-500 font-medium'}`}>
                            {lang.name}
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 shrink-0 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Other Indian Languages Group */}
            {otherLanguages.length > 0 && (
              <div className="pt-2">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5 px-1">
                  Regional & Classical Languages
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {otherLanguages.map((lang) => {
                    const isSelected = lang.code === selectedLanguage;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleSelectLanguage(lang.code)}
                        className={`p-2 rounded-xl text-left transition flex items-center justify-between text-xs cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-white font-black shadow-xs'
                            : 'bg-slate-50 hover:bg-amber-50 text-slate-800 border border-slate-100'
                        }`}
                      >
                        <div className="truncate min-w-0 pr-1">
                          <div className="font-extrabold text-xs truncate">{lang.nativeName}</div>
                          <div className={`text-[10px] truncate ${isSelected ? 'text-amber-100' : 'text-slate-500'}`}>
                            {lang.name}
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 shrink-0 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {filteredLanguages.length === 0 && (
              <div className="py-6 text-center text-xs text-slate-400">
                No Indian language found matching "{searchQuery}"
              </div>
            )}
          </div>

          {/* Footer Active Banner */}
          <div className="mt-2.5 pt-2 border-t border-amber-100 flex items-center justify-between text-[11px] text-amber-900 bg-amber-50/80 p-2 rounded-xl">
            <span className="font-bold truncate">
              Selected: <span className="font-black text-amber-950">{currentLang.nativeName} ({currentLang.name})</span>
            </span>
            <span className="text-[10px] bg-white px-2 py-0.5 rounded-md font-bold text-amber-800 border border-amber-200 shrink-0 ml-1">
              {currentLang.region.split(',')[0]}
            </span>
          </div>
        </div>
        </>
      )}
    </div>
  );
};
