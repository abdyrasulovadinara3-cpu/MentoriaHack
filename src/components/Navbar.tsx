import React, { useState } from 'react';
import { BookOpen, User, ShieldAlert, Sparkles, Bell, LogOut } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userProfile: UserProfile;
  toggleRole: () => void;
  onResetPreferences: () => void;
  onLogout: () => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  userProfile,
  toggleRole,
  onResetPreferences,
  onLogout
}: NavbarProps) {
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const notifications = [
    { id: 1, text: '🎉 Появилось новое STEM соревнование по вашему интересу!', time: '10 мин назад' },
    { id: 2, text: '🎓 Вы записались на курс "Введение в Экономику"', time: '2 часа назад' }
  ];

  return (
    <header id="app-header" className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-40 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {}
        <div 
          onClick={() => setCurrentTab('home')} 
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div id="school-logo-frame" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
            <BookOpen className="w-5.5 h-5.5" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold font-sans tracking-tight text-slate-900 leading-tight uppercase">
              Mentoria <span className="text-blue-600">Hub</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">Future Academics</p>
          </div>
        </div>

        {}
        <nav className="hidden md:flex items-center gap-1.5 font-sans">
          <button
            onClick={() => setCurrentTab('home')}
            id="nav-tab-home"
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              currentTab === 'home'
                ? 'bg-blue-50 text-blue-700 border border-blue-200/60 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
            }`}
          >
            Главная
          </button>
          <button
            onClick={() => setCurrentTab('catalog')}
            id="nav-tab-catalog"
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              currentTab === 'catalog'
                ? 'bg-blue-50 text-blue-700 border border-blue-200/60 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
            }`}
          >
            Каталог возможностей
          </button>
          <button
            onClick={() => setCurrentTab('courses')}
            id="nav-tab-courses"
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              currentTab === 'courses'
                ? 'bg-blue-50 text-blue-700 border border-blue-200/60 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
            }`}
          >
            Курсы Mentoria
          </button>
          <button
            onClick={() => setCurrentTab('cabinet')}
            id="nav-tab-cabinet"
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              currentTab === 'cabinet'
                ? 'bg-blue-50 text-blue-700 border border-blue-200/60 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
            }`}
          >
            Личный кабинет
          </button>
          {userProfile.role === 'admin' && (
            <button
              onClick={() => setCurrentTab('admin')}
              id="nav-tab-admin"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'admin'
                  ? 'bg-slate-100 text-slate-800 border border-slate-350 shadow-sm'
                  : 'text-purple-650 hover:text-purple-900 hover:bg-purple-50 border border-transparent'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              Админ-панель
            </button>
          )}
        </nav>

        {}
        <div className="flex items-center gap-3">
          {}
          <button
            onClick={toggleRole}
            id="role-switch-btn"
            title="Переключить роль для тестирования MVP"
            className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all border ${
              userProfile.role === 'admin'
                ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700 shadow-sm shadow-slate-900/10'
                : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
            }`}
          >
            {userProfile.role === 'admin' ? (
              <>
                <ShieldAlert className="w-3.5 h-3.5" />
                Администратор
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5" />
                Режим ученика
              </>
            )}
          </button>

          {}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotificationMenu(!showNotificationMenu);
                setShowUserDropdown(false);
              }}
              id="notifications-bell-btn"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors relative cursor-pointer"
            >
              <Bell className="w-5.5 h-5.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            </button>

            {showNotificationMenu && (
              <div className="absolute right-0 mt-2.5 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-sm">Уведомления</span>
                  <span className="text-xs text-blue-600 hover:underline cursor-pointer">Прочитать все</span>
                </div>
                <div className="divide-y divide-slate-100 font-sans text-xs">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-3 hover:bg-slate-50 transition-colors">
                      <p className="text-slate-700 text-[11px] leading-relaxed mb-1">{notif.text}</p>
                      <span className="text-slate-400 text-[10px] block">{notif.time}</span>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-slate-100 text-center">
                  <p className="text-[10px] text-slate-400">Система Mentoria Hub работает в реальном времени</p>
                </div>
              </div>
            )}
          </div>

          {}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserDropdown(!showUserDropdown);
                setShowNotificationMenu(false);
              }}
              id="user-profile-menu-btn"
              className="flex items-center gap-1.5 p-1 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center text-white text-xs font-bold font-mono">
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-4 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-4 pb-3 border-b border-slate-100">
                  <p className="font-bold text-slate-800 text-sm leading-tight">{userProfile.name}</p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{userProfile.email}</p>
                  <span className="inline-block bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1.5">
                    {userProfile.grade} класс
                  </span>
                </div>
                <div className="p-1 mt-1 font-sans text-sm">
                  <button
                    onClick={() => {
                      onResetPreferences();
                      setShowUserDropdown(false);
                    }}
                    id="profile-reset-onboarding"
                    className="w-full text-left px-3 py-2 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    Перезапустить онбординг
                  </button>
                  <button
                    onClick={() => {
                      toggleRole();
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-850 transition-colors flex items-center gap-2 sm:hidden cursor-pointer"
                  >
                    <ShieldAlert className="w-4 h-4 text-purple-500" />
                    Переключить на {userProfile.role === 'admin' ? 'Студента' : 'Админа'}
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2 cursor-pointer font-bold text-xs"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    Выйти из аккаунта
                  </button>
                  <div className="h-px bg-slate-100 my-1" />
                  
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {}
      <div className="md:hidden flex items-center justify-around py-2.5 border-t border-slate-100 text-xs text-slate-500 font-medium">
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center gap-1 cursor-pointer ${currentTab === 'home' ? 'text-blue-600 font-semibold' : ''}`}
        >
          <span className="text-lg">🏠</span>
          <span>Главная</span>
        </button>
        <button
          onClick={() => setCurrentTab('catalog')}
          className={`flex flex-col items-center gap-1 cursor-pointer ${currentTab === 'catalog' ? 'text-blue-600 font-semibold' : ''}`}
        >
          <span className="text-lg">🔎</span>
          <span>Каталог</span>
        </button>
        <button
          onClick={() => setCurrentTab('courses')}
          className={`flex flex-col items-center gap-1 cursor-pointer ${currentTab === 'courses' ? 'text-blue-600 font-semibold' : ''}`}
        >
          <span className="text-lg"></span>
          <span>Курсы</span>
        </button>
        <button
          onClick={() => setCurrentTab('cabinet')}
          className={`flex flex-col items-center gap-1 cursor-pointer ${currentTab === 'cabinet' ? 'text-blue-600 font-semibold' : ''}`}
        >
          <span className="text-lg">👤</span>
          <span>Кабинет</span>
        </button>
        {userProfile.role === 'admin' && (
          <button
            onClick={() => setCurrentTab('admin')}
            className={`flex flex-col items-center gap-1 cursor-pointer ${currentTab === 'admin' ? 'text-slate-800 font-semibold' : 'text-slate-400'}`}
          >
            <span className="text-lg">⚙️</span>
            <span>Админ</span>
          </button>
        )}
      </div>
    </header>
  );
}
