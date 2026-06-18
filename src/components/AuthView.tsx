import React, { useState } from 'react';
import { BookOpen, User, Mail, Lock, GraduationCap, ArrowRight, CornerDownLeft, Shield, AlertCircle, Globe } from 'lucide-react';
import { UserProfile, Category } from '../types';
import { translate, translateCategory, Language } from '../localization';

interface AuthViewProps {
  onLoginSuccess: (profile: UserProfile) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function AuthView({ onLoginSuccess, language, onLanguageChange }: AuthViewProps) {
  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [grade, setGrade] = useState('10');
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [selectedInterests, setSelectedInterests] = useState<Category[]>(['STEM', 'Programming']);

  const categories: Category[] = [
    'STEM',
    'Programming',
    'Business',
    'Social Impact',
    'Finance',
    'Science',
    'Arts & Humanities'
  ];

  
  const getRegisteredUsers = (): UserProfile[] => {
    const raw = localStorage.getItem('mentoria_all_registered_users');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        return [];
      }
    }
    
    const defaultUsers: UserProfile[] = [
      {
        name: 'Адиль Каримов',
        email: 'adil@example.com',
        grade: '10',
        interests: ['STEM', 'Programming', 'Business'],
        goals: ['Поступление в зарубежный вуз (США, Европа, Азия)', 'Изучение программирования с нуля'],
        hasOnboarded: true,
        role: 'student'
      },
      {
        name: 'Динара Абдырасулова',
        email: 'admin@example.com',
        grade: '11',
        interests: ['STEM', 'Science'],
        goals: ['Управление образовательными программами', 'Менторство'],
        hasOnboarded: true,
        role: 'admin'
      }
    ];
    localStorage.setItem('mentoria_all_registered_users', JSON.stringify(defaultUsers));
    return defaultUsers;
  };

  const handleToggleInterest = (interest: Category) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users = getRegisteredUsers();

    if (isLoginMode) {
      if (!email) {
        setError(translate('authErrEmail', language));
        return;
      }
      
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
      if (foundUser) {
        onLoginSuccess(foundUser);
      } else {
        setError(translate('authErrUserNotFound', language));
      }
    } else {
      
      if (!name.trim()) {
        setError(translate('authErrFioReq', language));
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setError(translate('authErrEmailReq', language));
        return;
      }

      
      const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase().trim());
      if (emailExists) {
        setError(translate('authErrExists', language));
        return;
      }

      
      const newProfile: UserProfile = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        grade: '10',
        interests: [],
        goals: [],
        hasOnboarded: false, // Wizard starts immediately to configure their full experience!
        role
      };

      
      const updatedUsers = [...users, newProfile];
      localStorage.setItem('mentoria_all_registered_users', JSON.stringify(updatedUsers));

      
      onLoginSuccess(newProfile);
    }
  };

  const setDemoCredentials = (demoEmail: string) => {
    setEmail(demoEmail);
    setIsLoginMode(true);
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
      
      
      <div className="absolute top-4 right-4 z-50 flex items-center gap-1 bg-white shadow-sm border border-slate-200/60 rounded-xl px-2.5 py-1.5">
        <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as Language)}
          className="bg-transparent text-xs font-bold text-slate-700 pl-1 pr-6 py-0.5 outline-none cursor-pointer appearance-none"
        >
          <option value="ru">RU 🇷🇺</option>
          <option value="en">EN 🇬🇧</option>
          <option value="kk">KK 🇰🇿</option>
        </select>
        <span className="absolute right-3.5 pointer-events-none text-[8px] text-slate-400">▼</span>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
            <BookOpen className="w-6.5 h-6.5" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 uppercase">
              Mentoria <span className="text-blue-600">Hub</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono tracking-widest uppercase mt-0.5">Future Academics</p>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 rounded-2xl sm:px-10 border border-slate-100">
          
          
          <div className="flex border-b border-slate-100 pb-4 mb-6">
            <button
              onClick={() => {
                setIsLoginMode(true);
                setError('');
              }}
              className={`flex-1 pb-3 text-center text-sm font-extrabold uppercase tracking-wide cursor-pointer transition-all border-b-2 ${
                isLoginMode
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {translate('authToggleLogin', language)}
            </button>
            <button
              onClick={() => {
                setIsLoginMode(false);
                setError('');
              }}
              className={`flex-1 pb-3 text-center text-sm font-extrabold uppercase tracking-wide cursor-pointer transition-all border-b-2 ${
                !isLoginMode
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {translate('authToggleRegister', language)}
            </button>
          </div>

          <h3 className="text-sm font-extrabold text-slate-800 tracking-tight text-left mb-6 uppercase">
            {isLoginMode ? translate('authLoginHeader', language) : translate('authRegisterHeader', language)}
          </h3>

          {error && (
            <div className="mb-5 p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl flex items-start gap-2.5 text-xs text-left animate-in fade-in zoom-in-95">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
              <div>
                <span className="font-bold">{language === 'en' ? 'Error: ' : language === 'kk' ? 'Қате: ' : 'Ошибка: '}</span>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {!isLoginMode && (
              <>
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">{translate('authFio', language)}</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-slate-400 w-4.5 h-4.5" />
                    <input
                      type="text"
                      required
                      placeholder={language === 'en' ? 'John Doe' : language === 'kk' ? 'Әлібек Қасымов' : 'Иван Иванов'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                    />
                  </div>
                </div>

                
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">{translate('authRole', language)}</label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-3 text-slate-400 w-4.5 h-4.5" />
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as 'student' | 'admin')}
                      className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-xs cursor-pointer appearance-none"
                    >
                      <option value="student">👨‍🎓 {language === 'en' ? 'Student' : language === 'kk' ? 'Оқушы' : 'Ученик'}</option>
                      <option value="admin">⚙️ {language === 'en' ? 'Admin' : language === 'kk' ? 'Әкімші' : 'Администратор'}</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">{translate('authEmail', language)}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400 w-4.5 h-4.5" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-55 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                />
              </div>
            </div>

            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">{translate('authPassword', language)}</label>
                {isLoginMode && (
                  <span className="text-[10px] text-slate-400">{translate('authFreeMvp', language)}</span>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400 w-4.5 h-4.5" />
                <input
                  type="password"
                  required={!isLoginMode}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-55 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoginMode ? (
                <>
                  {translate('authSubmitLogin', language)}
                  <CornerDownLeft className="w-4 h-4" />
                </>
              ) : (
                <>
                  {translate('authSubmitRegister', language)}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          
          <div className="mt-8 pt-6 border-t border-slate-100 text-left">
            <h4 className="text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-2.5">
              {translate('authTestAccounts', language)}
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => setDemoCredentials('adil@example.com')}
                className="w-full group text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all border border-slate-200/60 flex items-center justify-between cursor-pointer"
              >
                <div className="text-xs">
                  <p className="font-bold text-slate-700">Адиль Каримов ({language === 'en' ? 'Role: Student' : language === 'kk' ? 'Рөлі: Оқушы' : 'Роль: Ученик'})</p>
                  <p className="text-slate-400 font-mono text-[10px]">adil@example.com</p>
                </div>
                <span className="text-[10px] uppercase font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  {translate('authChoose', language)}
                </span>
              </button>
              
              <button
                onClick={() => setDemoCredentials('admin@example.com')}
                className="w-full group text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all border border-slate-200/60 flex items-center justify-between cursor-pointer"
              >
                <div className="text-xs">
                  <p className="font-bold text-slate-700">Динара Абдырасулова ({language === 'en' ? 'Role: Admin' : language === 'kk' ? 'Рөлі: Әкімші' : 'Роль: Админ'})</p>
                  <p className="text-slate-400 font-mono text-[10px]">admin@example.com</p>
                </div>
                <span className="text-[10px] uppercase font-bold text-purple-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  {translate('authChoose', language)}
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
