import React, { useState } from 'react';
import { BookOpen, User, Mail, Lock, UserPlus, GraduationCap, ArrowRight, CornerDownLeft, Shield, AlertCircle } from 'lucide-react';
import { UserProfile, Category } from '../types';

interface AuthViewProps {
  onLoginSuccess: (profile: UserProfile) => void;
}

export default function AuthView({ onLoginSuccess }: AuthViewProps) {
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Simulated password
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
        name: 'Динара ',
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
        setError('Пожалуйста, введите ваш Email');
        return;
      }
      
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
      if (foundUser) {
        onLoginSuccess(foundUser);
      } else {
        setError('Пользователь с таким Email не найден. Зарегистрируйтесь, чтобы создать новый аккаунт!');
      }
    } else {
      
      if (!name.trim()) {
        setError('Пожалуйста, введите ваше имя');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setError('Пожалуйста, введите корректный адрес электронной почты');
        return;
      }

      
      const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase().trim());
      if (emailExists) {
        setError('Пользователь с таким Email уже существует. Пожалуйста, войдите в систему.');
        return;
      }

      
      const newProfile: UserProfile = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        grade,
        interests: selectedInterests,
        goals: [
          'Раскрытие потенциала через академические возможности',
          'Развитие навыков и создание конкурентного портфолио'
        ],
        hasOnboarded: true, 
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {}
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
          
          {}
          <div className="flex border-b border-slate-100 pb-4 mb-6">
            <button
              onClick={() => {
                setIsLoginMode(true);
                setError('');
              }}
              className={`flex-1 pb-3 text-center text-sm font-extrabold uppercase tracking-wide cursor-pointer transition-all border-b-2 ${
                isLoginMode
                  ? 'border-blue-650 text-blue-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Вход
            </button>
            <button
              onClick={() => {
                setIsLoginMode(false);
                setError('');
              }}
              className={`flex-1 pb-3 text-center text-sm font-extrabold uppercase tracking-wide cursor-pointer transition-all border-b-2 ${
                !isLoginMode
                  ? 'border-blue-650 text-blue-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Регистрация
            </button>
          </div>

          <h3 className="text-lg font-extrabold text-slate-800 tracking-tight text-left mb-6 uppercase">
            {isLoginMode ? 'Авторизация в аккаунте' : 'Создание нового аккаунта'}
          </h3>

          {error && (
            <div className="mb-5 p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl flex items-start gap-2.5 text-xs text-left animate-in fade-in zoom-in-95">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
              <div>
                <span className="font-bold">Ошибка: </span>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {!isLoginMode && (
              <>
                {}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Ваше ФИО</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-slate-400 w-4.5 h-4.5" />
                    <input
                      type="text"
                      required
                      placeholder="Иван Иванов"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-55 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                    />
                  </div>
                </div>

                {}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Академический класс</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-3 text-slate-400 w-4.5 h-4.5" />
                      <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full bg-slate-55 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm cursor-pointer appearance-none"
                      >
                        <option value="9">9 класс</option>
                        <option value="10">10 класс</option>
                        <option value="11">11 класс</option>
                        <option value="12">12 класс</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Желаемая Роль</label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-3 text-slate-400 w-4.5 h-4.5" />
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as 'student' | 'admin')}
                        className="w-full bg-slate-55 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm cursor-pointer appearance-none"
                      >
                        <option value="student"> Ученик</option>
                        <option value="admin">⚙️ Администратор</option>
                      </select>
                    </div>
                  </div>
                </div>

                {}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Сферы интересов</label>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((category) => {
                      const isSelected = selectedInterests.includes(category);
                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => handleToggleInterest(category)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${
                            isSelected
                              ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Адрес электронной почты (Email)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400 w-4.5 h-4.5" />
                <input
                  type="email"
                  required
                  placeholder="ivan@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-55 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                />
              </div>
            </div>

            {}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Пароль</label>
                {isLoginMode && (
                  <span className="text-[10px] text-slate-400">Свободный ввод для MVP</span>
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
                  Вход в Систему
                  <CornerDownLeft className="w-4 h-4" />
                </>
              ) : (
                <>
                  Создать Аккаунт и Продолжить
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {}
          <div className="mt-8 pt-6 border-t border-slate-100 text-left">
            <h4 className="text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-2.5">Заготовленные аккаунты для тестирования:</h4>
            <div className="space-y-2">
              <button
                onClick={() => setDemoCredentials('adil@example.com')}
                className="w-full group text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all border border-slate-200/60 flex items-center justify-between cursor-pointer"
              >
                <div className="text-xs">
                  <p className="font-bold text-slate-700">Адиль Каримов (Роль: Ученик)</p>
                  <p className="text-slate-400 font-mono text-[10px]">adil@example.com</p>
                </div>
                <span className="text-[10px] uppercase font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  Выбрать →
                </span>
              </button>
              
              <button
                onClick={() => setDemoCredentials('admin@example.com')}
                className="w-full group text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all border border-slate-200/60 flex items-center justify-between cursor-pointer"
              >
                <div className="text-xs">
                  <p className="font-bold text-slate-700">Динара Абдырасулова (Роль: Админ)</p>
                  <p className="text-slate-400 font-mono text-[10px]">admin@example.com</p>
                </div>
                <span className="text-[10px] uppercase font-bold text-purple-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  Выбрать →
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
