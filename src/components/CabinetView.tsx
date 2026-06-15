import React, { useState } from 'react';
import { Calendar, Award, BookOpen, Star, Sparkles, Clock, ArrowRight, Compass, RefreshCw, Milestone, Edit3 } from 'lucide-react';
import { Opportunity, Course, EnrollmentState, UserProfile } from '../types';

interface CabinetViewProps {
  userProfile: UserProfile;
  opportunities: Opportunity[];
  courses: Course[];
  savedOpportunities: string[];
  enrollments: EnrollmentState[];
  toggleSaveOpportunity: (id: string) => void;
  setCurrentTab: (tab: string) => void;
  onResetPreferences: () => void;
  onOpenCourse: (courseId: string) => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export default function CabinetView({
  userProfile,
  opportunities,
  courses,
  savedOpportunities,
  enrollments,
  toggleSaveOpportunity,
  setCurrentTab,
  onResetPreferences,
  onOpenCourse,
  onUpdateProfile
}: CabinetViewProps) {
  
  const savedOpsList = opportunities.filter((o) => savedOpportunities.includes(o.id));

  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editEmail, setEditEmail] = useState(userProfile.email);
  const [editGrade, setEditGrade] = useState(userProfile.grade);

  
  const enrolledCoursesList = courses.filter((c) =>
    enrollments.some((e) => e.courseId === c.id)
  );

  const getCourseProgress = (courseId: string) => {
    const enrollment = enrollments.find((e) => e.courseId === courseId);
    const course = courses.find((c) => c.id === courseId);
    if (!enrollment || !course || course.lessons.length === 0) return 0;
    return Math.round((enrollment.completedLessons.length / course.lessons.length) * 100);
  };

  
  const portfolioRecommendations = opportunities
    .filter((opp) => {
      const interestsMatch = userProfile.interests.includes(opp.category);
      const notSavedYet = !savedOpportunities.includes(opp.id);
      return interestsMatch && notSavedYet;
    })
    .slice(0, 2);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: editName,
      email: editEmail,
      grade: editGrade
    });
    setIsEditing(false);
  };

  return (
    <div id="student-cabinet" className="space-y-8 font-sans">
      {}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-left">
        <div className="flex items-start gap-4 w-full sm:w-auto">
          <div className="w-16 h-16 rounded bg-slate-900 text-white font-extrabold text-2xl font-mono flex items-center justify-center shadow-lg uppercase border border-slate-750 shrink-0">
            {editName ? editName.charAt(0) : userProfile.name.charAt(0)}
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-3 w-full max-w-sm font-sans">
              <div className="space-y-1">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">ФИО Ученика</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full text-slate-800 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded px-2.5 py-1.5 text-xs font-semibold outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Электронная почта</label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full text-slate-800 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded px-2.5 py-1.5 text-xs font-semibold outline-none"
                />
              </div>
              <div className="space-y-1 text-left">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Класс проведения обучения</label>
                <select
                  value={editGrade}
                  onChange={(e) => setEditGrade(e.target.value)}
                  className="w-full text-slate-850 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded px-2.5 py-1.5 text-xs font-bold outline-none cursor-pointer"
                >
                  {['8', '9', '10', '11', '12'].map((g) => (
                    <option key={g} value={g}>{g} класс</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 pt-1 font-sans text-xs">
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold shadow-sm cursor-pointer transition-all uppercase text-[10px] tracking-wide"
                >
                  Сохранить
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditName(userProfile.name);
                    setEditEmail(userProfile.email);
                    setEditGrade(userProfile.grade);
                  }}
                  className="px-3.5 py-1.5 border border-slate-250 hover:bg-slate-50 text-slate-650 hover:text-slate-800 rounded font-bold transition-colors cursor-pointer uppercase text-[10px] tracking-wide"
                >
                  Отмена
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-extrabold text-slate-800 uppercase tracking-tight">{userProfile.name}</h2>
                <span className="bg-blue-600 text-white font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded border border-blue-500 select-none">
                  {userProfile.grade} класс
                </span>
              </div>
              <p className="text-slate-550 text-xs font-light">{userProfile.email}</p>
              
              <div className="pt-1.5">
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-[11px] font-extrabold uppercase tracking-wide transition-all cursor-pointer bg-blue-50/50 hover:bg-blue-50 px-2.5 py-1 rounded"
                >
                  <Edit3 className="w-3 h-3" />
                  Редактировать ФИО и Email
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {userProfile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="bg-slate-50 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200 uppercase tracking-wider"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {}
        <button
          onClick={onResetPreferences}
          id="cabinet-reset-preferences-btn"
          className="flex items-center gap-2 border border-slate-350 hover:border-slate-800 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs uppercase tracking-wide px-4 py-2.5 rounded-lg transition-all shadow-sm cursor-pointer shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          Сбросить фильтры & цели
        </button>
      </div>

      {}
      <section id="cabinet-goals-checklist" className="bg-white border border-slate-200 p-6 rounded-xl space-y-4 shadow-sm text-left">
        <h3 className="font-extrabold text-slate-800 text-xs flex items-center gap-2 uppercase tracking-wide">
          <Milestone className="w-5 h-5 text-blue-600" />
          Ваши образовательные цели
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs text-slate-700 font-light">
          {userProfile.goals.map((g, index) => (
            <div key={index} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-blue-600 font-bold shrink-0">🎯</span>
              <p className="leading-relaxed text-slate-750 font-normal">{g}</p>
            </div>
          ))}
        </div>
      </section>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        {}
        <div className="lg:col-span-8 space-y-8">
          {}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Мои курсы ({enrolledCoursesList.length})
            </h3>

            {enrolledCoursesList.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-3.5">
                <span className="text-3xl block"></span>
                <p className="text-slate-550 text-xs">Вы еще не записались ни на один асинхронный курс.</p>
                <button
                  onClick={() => setCurrentTab('courses')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  Перейти к каталогу курсов
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {enrolledCoursesList.map((course) => {
                  const progress = getCourseProgress(course.id);
                  return (
                    <div
                      key={course.id}
                      id={`cabinet-course-card-${course.id}`}
                      className="bg-white border border-slate-200 hover:border-blue-350 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between transition-colors"
                    >
                      <div className="space-y-2">
                        <span className="text-[9px] uppercase font-bold text-slate-800 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono">
                          {course.category}
                        </span>
                        <h4 className="font-extrabold text-slate-850 text-sm leading-snug line-clamp-2">
                          {course.title}
                        </h4>
                      </div>

                      <div className="space-y-3">
                        {}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-450 font-bold font-mono">
                            <span>Пройдено уроков</span>
                            <span className="text-blue-700">{progress}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded w-full overflow-hidden">
                            <div
                              className="bg-blue-600 h-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        {}
                        <button
                          onClick={() => onOpenCourse(course.id)}
                          className="w-full py-2.5 text-center text-xs font-bold bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg transition-all cursor-pointer"
                        >
                          Открыть класс
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
              <Star className="w-5 h-5 text-blue-600" />
              Отслеживаемые возможности ({savedOpsList.length})
            </h3>

            {savedOpsList.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-3.5 shadow-sm">
                <span className="text-3xl block"></span>
                <p className="text-slate-550 text-xs">Добавьте важные отборы в избранное, чтобы не пропустить дедлайн.</p>
                <button
                  onClick={() => setCurrentTab('catalog')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  Найти возможности в каталоге
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {savedOpsList.map((opp) => (
                  <div
                    key={opp.id}
                    id={`cabinet-saved-opp-${opp.id}`}
                    className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 uppercase bg-slate-150 text-slate-800 border border-slate-250 rounded">
                          {opp.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono font-medium">
                          Формат: {opp.format}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-800 text-sm leading-snug">{opp.title}</h4>
                      <p className="text-[11px] text-slate-450">Организатор: {opp.organization}</p>
                    </div>

                    <div className="flex sm:flex-col items-end gap-2.5 justify-between select-none shrink-0">
                      <div className="text-right">
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Дедлайн подачи</p>
                        <p className="text-xs font-bold text-rose-600 font-mono mt-0.5">{opp.deadline}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleSaveOpportunity(opp.id)}
                          className="px-3 py-1.5 border border-slate-200 text-slate-500 hover:text-red-500 hover:bg-rose-50 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                          title="Убрать из избранного"
                        >
                          ✕ Убрать
                        </button>
                        <button
                          onClick={() => setCurrentTab('catalog')}
                          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm"
                        >
                          Детали
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {}
        <aside className="lg:col-span-4 space-y-6">
          {}
          <div className="bg-white border border-slate-200 p-6 rounded-xl space-y-4 shadow-sm font-sans">
            <h3 className="font-extrabold text-slate-850 text-xs flex items-center gap-2 uppercase tracking-wide">
              <Clock className="w-5 h-5 text-rose-600" />
              Радар дедлайнов (2026 год)
            </h3>
            
            {savedOpsList.length === 0 ? (
              <p className="text-slate-450 text-xs leading-relaxed font-light">
                Добавьте возможности, чтобы отслеживать поджимающие сроки на специальном радаре календаря.
              </p>
            ) : (
              <div className="space-y-3">
                {savedOpsList
                  .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                  .slice(0, 3)
                  .map((opp) => (
                    <div key={opp.id} className="p-3.5 bg-rose-50/50 rounded border border-rose-100 flex items-center justify-between gap-2.5">
                      <div className="space-y-0.5 max-w-[70%] text-left">
                        <p className="font-bold text-slate-800 truncate text-[11px] leading-tight">{opp.title}</p>
                        <p className="text-slate-400 text-[10px] truncate">{opp.organization}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded font-mono">
                          {opp.deadline.split('-')[2]} {['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'][parseInt(opp.deadline.split('-')[1]) - 1]}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {}
          <div className="bg-slate-900 border border-slate-850 text-white p-6 rounded-xl space-y-4 shadow-md relative overflow-hidden text-left">
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-2 text-blue-300 font-bold text-[10px] uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Рекомендация ИИ от Mentoria</span>
            </div>

            <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-tight">Как усилить резюме в этом месяце?</h3>
            
            {portfolioRecommendations.length > 0 ? (
              <div className="space-y-3 text-xs leading-relaxed text-slate-300 font-light pt-1">
                <p>
                  Поскольку вы интересуетесь направлением <strong>{userProfile.interests[0]}</strong>, мы рекомендуем вам обратить пристальное внимание на следующие неактивированные опции:
                </p>
                <div className="space-y-2">
                  {portfolioRecommendations.map((o) => (
                    <div
                      key={o.id}
                      onClick={() => setCurrentTab('catalog')}
                      className="bg-white/10 hover:bg-white/15 border border-white/10 p-3 rounded cursor-pointer transition-all space-y-1 block"
                    >
                      <p className="font-bold text-white text-[11px] leading-tight truncate">{o.title}</p>
                      <p className="text-[10px] text-blue-300 truncate font-mono">Дедлайн: {o.deadline}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-slate-300 text-xs font-light leading-relaxed">
                Пройдите по крайней мере 1 асинхронный тест на 100% сегодня, чтобы автоматически открыть доступ к скрытым исследовательским программам!
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
