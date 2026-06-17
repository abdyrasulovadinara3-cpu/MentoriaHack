import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Shield, Users, BookOpen, Star, BarChart3, Save } from 'lucide-react';
import { Opportunity, Course, Category, OpportunityFormat, Lesson } from '../types';
import { MOCK_STUDENTS_LIST } from '../mockData';

interface AdminViewProps {
  opportunities: Opportunity[];
  courses: Course[];
  onSaveOpportunities: (newOps: Opportunity[]) => void;
  onSaveCourses: (newCourses: Course[]) => void;
}

export default function AdminView({
  opportunities,
  courses,
  onSaveOpportunities,
  onSaveCourses
}: AdminViewProps) {
  const [activePane, setActivePane] = useState<'opportunities' | 'courses' | 'users'>('opportunities');

  
  const [editingOppId, setEditingOppId] = useState<string | null>(null);
  const [oppTitle, setOppTitle] = useState('');
  const [oppCategory, setOppCategory] = useState<Category>('STEM');
  const [oppFormat, setOppFormat] = useState<OpportunityFormat>('Online');
  const [oppDeadline, setOppDeadline] = useState('');
  const [oppDescription, setOppDescription] = useState('');
  const [oppRequirements, setOppRequirements] = useState('');
  const [oppGrades, setOppGrades] = useState<string[]>(['10', '11']);
  const [oppOrg, setOppOrg] = useState('');

  
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseDifficulty, setCourseDifficulty] = useState<'Легкий' | 'Средний' | 'Продвинутый'>('Легкий');
  const [courseCategory, setCourseCategory] = useState<Category>('STEM');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseImageUrl, setCourseImageUrl] = useState('');

  
  const [showOppForm, setShowOppForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);

  
  const categoriesList: Category[] = ['STEM', 'Programming', 'Business', 'Social Impact', 'Finance', 'Science', 'Arts & Humanities'];
  const formatsList: OpportunityFormat[] = ['Online', 'Offline', 'Hybrid'];
  const gradesList = ['8', '9', '10', '11', '12'];

  
  const handleEditOpp = (opp: Opportunity) => {
    setEditingOppId(opp.id);
    setOppTitle(opp.title);
    setOppCategory(opp.category);
    setOppFormat(opp.format);
    setOppDeadline(opp.deadline);
    setOppDescription(opp.description);
    setOppRequirements(opp.requirements);
    setOppGrades(opp.targetGrades);
    setOppOrg(opp.organization);
    setShowOppForm(true);
  };

  const handleDeleteOpp = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту возможность?')) {
      const updated = opportunities.filter((o) => o.id !== id);
      onSaveOpportunities(updated);
    }
  };

  const handleOppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: Opportunity[];

    if (editingOppId) {
      
      updated = opportunities.map((o) =>
        o.id === editingOppId
          ? {
              ...o,
              title: oppTitle,
              category: oppCategory,
              format: oppFormat,
              deadline: oppDeadline,
              description: oppDescription,
              requirements: oppRequirements,
              targetGrades: oppGrades,
              organization: oppOrg
            }
          : o
      );
    } else {
      
      const newOpp: Opportunity = {
        id: `opp-${Date.now()}`,
        title: oppTitle,
        category: oppCategory,
        format: oppFormat,
        deadline: oppDeadline,
        description: oppDescription,
        requirements: oppRequirements,
        targetGrades: oppGrades,
        organization: oppOrg
      };
      updated = [newOpp, ...opportunities];
    }

    onSaveOpportunities(updated);
    resetOppForm();
  };

  const resetOppForm = () => {
    setEditingOppId(null);
    setOppTitle('');
    setOppCategory('STEM');
    setOppFormat('Online');
    setOppDeadline('');
    setOppDescription('');
    setOppRequirements('');
    setOppGrades(['10', '11']);
    setOppOrg('');
    setShowOppForm(false);
  };

  const toggleGradeSelection = (grade: string) => {
    if (oppGrades.includes(grade)) {
      setOppGrades(oppGrades.filter((g) => g !== grade));
    } else {
      setOppGrades([...oppGrades, grade]);
    }
  };

  
  const handleEditCourse = (course: Course) => {
    setEditingCourseId(course.id);
    setCourseTitle(course.title);
    setCourseDescription(course.description);
    setCourseDifficulty(course.difficulty);
    setCourseCategory(course.category);
    setCourseDuration(course.duration);
    setCourseImageUrl(course.imageUrl || '');
    setShowCourseForm(true);
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот курс?')) {
      const updated = courses.filter((c) => c.id !== id);
      onSaveCourses(updated);
    }
  };

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: Course[];

    if (editingCourseId) {
      updated = courses.map((c) =>
        c.id === editingCourseId
          ? {
              ...c,
              title: courseTitle,
              description: courseDescription,
              difficulty: courseDifficulty,
              category: courseCategory,
              duration: courseDuration,
              imageUrl: courseImageUrl || undefined
            }
          : c
      );
    } else {
      
      const newLessons: Lesson[] = [
        {
          id: `new-l1-${Date.now()}`,
          title: 'Урок 1: Введение и основы концепта',
          duration: '8 мин',
          videoPlaceholder: 'linear-gradient(135deg, #1fa2ff 0%, #12d8fa 50%, #a6ffcb 100%)',
          content: '### Конспект Урока 1\nПриветствуем на курсе! В рамках этого урока мы знакомимся с ключевой терминологией и методологией исследования.\n\n* Термин А: Основное понятие.\n* Термин Б: Второстепенное понятие.\n\nПройдите форму теста ниже, чтобы зафиксировать баллы.',
          quiz: {
            id: `q1-${Date.now()}`,
            question: 'Какой основной метод исследования рекомендуется использовать на первом этапе?',
            options: [
              'Глубокий теоретический анализ',
              'Случайный запуск гипотез без анализа требований',
              'Постоянное копирование чужих образовательных концепций',
              'Абсолютный пассивный мониторинг'
            ],
            correctAnswerIndex: 0
          }
        },
        {
          id: `new-l2-${Date.now()}`,
          title: 'Урок 2: Инструменты анализа и практический кейс',
          duration: '10 мин',
          videoPlaceholder: 'linear-gradient(135deg, #fc00ff 0%, #00dbde 100%)',
          content: '### Конспект Урока 2\n\nПрактическое применение знаний: разбираем пошаговое применение инструментов в реальных проектах нашей команды.\n\nПоздравляем с переходом к практической фазе обучения!',
          quiz: {
            id: `q2-${Date.now()}`,
            question: 'Зачем проводить валидацию данных перед запуском?',
            options: [
              'Чтобы снизить риски и убедиться в надежности гипотезы',
              'Для формального заполнения отчета перед инвестором',
              'Это не играет значимой роли',
              'Чтобы затянуть сроки разработки'
            ],
            correctAnswerIndex: 0
          }
        }
      ];

      const newCourse: Course = {
        id: `course-${Date.now()}`,
        title: courseTitle,
        description: courseDescription,
        difficulty: courseDifficulty,
        category: courseCategory,
        duration: courseDuration || '3 недели, 2 урока',
        imageUrl: courseImageUrl || undefined,
        lessons: newLessons
      };
      
      updated = [...courses, newCourse];
    }

    onSaveCourses(updated);
    resetCourseForm();
  };

  const resetCourseForm = () => {
    setEditingCourseId(null);
    setCourseTitle('');
    setCourseDescription('');
    setCourseDifficulty('Легкий');
    setCourseCategory('STEM');
    setCourseDuration('');
    setCourseImageUrl('');
    setShowCourseForm(false);
  };

  return (
    <div id="admin-hub" className="space-y-8 font-sans">
      
      <div className="bg-slate-900 border border-slate-800 text-white rounded-xl p-6 sm:p-8 flex items-center justify-between shadow-xl text-left">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 font-extrabold text-[10px] px-3 py-1 rounded border border-blue-500/20 uppercase tracking-widest leading-none">
            <Shield className="w-3.5 h-3.5" />
            Административная Консоль Mentoria Hub
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight uppercase">Панель управления EdTech контентом</h2>
          <p className="text-slate-350 text-xs sm:text-sm font-light">
            Создание, редактирование и удаление курсов или программ, а также отслеживание успеваемости пилотной группы учеников.
          </p>
        </div>
      </div>

      
      <section id="admin-stats-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
        <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <span className="p-3 bg-slate-100 text-slate-800 rounded border border-slate-200">
            <Star className="w-6 h-6" />
          </span>
          <div>
            <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Всего программ</p>
            <p className="text-xl font-extrabold text-slate-800 mt-0.5">{opportunities.length}</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <span className="p-3 bg-slate-100 text-slate-800 rounded border border-slate-200">
            <BookOpen className="w-6 h-6" />
          </span>
          <div>
            <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Курсов онлайн</p>
            <p className="text-xl font-extrabold text-slate-800 mt-0.5">{courses.length}</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <span className="p-3 bg-slate-100 text-slate-800 rounded border border-slate-200">
            <Users className="w-6 h-6" />
          </span>
          <div>
            <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Учеников в базе</p>
            <p className="text-xl font-extrabold text-slate-800 mt-0.5">{MOCK_STUDENTS_LIST.length}</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <span className="p-3 bg-slate-100 text-slate-800 rounded border border-slate-200">
            <BarChart3 className="w-6 h-6" />
          </span>
          <div>
            <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Успешность тестов</p>
            <p className="text-xl font-extrabold text-slate-800 mt-0.5">89 %</p>
          </div>
        </div>
      </section>

      
      <div className="flex border-b border-slate-200 text-xs gap-1.5 overflow-x-auto pb-0">
        <button
          onClick={() => setActivePane('opportunities')}
          className={`px-5 py-3 rounded-t-lg font-extrabold transition-all relative border-t border-x uppercase cursor-pointer ${
            activePane === 'opportunities'
              ? 'text-blue-600 bg-white border-slate-200'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-transparent'
          }`}
        >
           Возможности ({opportunities.length})
        </button>
        <button
          onClick={() => setActivePane('courses')}
          className={`px-5 py-3 rounded-t-lg font-extrabold transition-all relative border-t border-x uppercase cursor-pointer ${
            activePane === 'courses'
              ? 'text-blue-600 bg-white border-slate-200'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-transparent'
          }`}
        >
          📖 Академические курсы ({courses.length})
        </button>
        <button
          onClick={() => setActivePane('users')}
          className={`px-5 py-3 rounded-t-lg font-extrabold transition-all relative border-t border-x uppercase cursor-pointer ${
            activePane === 'users'
              ? 'text-blue-600 bg-white border-slate-200'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-transparent'
          }`}
        >
           Каталог пользователей
        </button>
      </div>

      
      <div className="space-y-6">
        
        {activePane === 'opportunities' && (
          <div className="space-y-6 text-left">
            <div className="flex justify-between items-center bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
              <span className="text-xs text-slate-550 font-medium">Создание и редактирование внеклассной траектории</span>
              {!showOppForm && (
                <button
                  onClick={() => {
                    resetOppForm();
                    setShowOppForm(true);
                  }}
                  id="admin-create-opp-btn"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Plus className="w-4.5 h-4.5" />
                  Добавить возможности
                </button>
              )}
            </div>

            
            {showOppForm && (
              <form onSubmit={handleOppSubmit} className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5 shadow-lg">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-tight">
                    {editingOppId ? '✏ Редактировать карточку' : '➕ Добавить новую возможность в каталог'}
                  </h4>
                  <button
                    type="button"
                    onClick={resetOppForm}
                    className="text-slate-400 hover:text-slate-850 text-xs font-bold cursor-pointer uppercase"
                  >
                    Отменить
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Название программы / конкурса</label>
                    <input
                      type="text"
                      required
                      value={oppTitle}
                      onChange={(e) => setOppTitle(e.target.value)}
                      placeholder="Например: Летняя школа стартапов"
                      className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 outline-none focus:border-blue-500"
                    />
                  </div>

                  
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Организатор</label>
                    <input
                      type="text"
                      required
                      value={oppOrg}
                      onChange={(e) => setOppOrg(e.target.value)}
                      placeholder="Например: Ассоциация Наук Mentoria"
                      className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 outline-none focus:border-blue-500"
                    />
                  </div>

                  
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Направление образования</label>
                    <select
                      value={oppCategory}
                      onChange={(e) => setOppCategory(e.target.value as Category)}
                      className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 font-bold text-slate-800 cursor-pointer"
                    >
                      {categoriesList.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Формат проведения</label>
                    <select
                      value={oppFormat}
                      onChange={(e) => setOppFormat(e.target.value as OpportunityFormat)}
                      className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 font-bold text-slate-800 cursor-pointer"
                    >
                      {formatsList.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>

                  
                  <div className="space-y-1 text-left">
                    <label className="font-bold text-slate-700">Крайний срок подачи заявок (Deadline)</label>
                    <input
                      type="date"
                      required
                      value={oppDeadline}
                      onChange={(e) => setOppDeadline(e.target.value)}
                      className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 font-mono text-slate-800"
                    />
                  </div>

                  
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block text-left">Целевые классы учеников</label>
                    <div className="flex gap-1.5 flex-wrap pt-1">
                      {gradesList.map((g) => {
                        const active = oppGrades.includes(g);
                        return (
                          <button
                            key={g}
                            type="button"
                            onClick={() => toggleGradeSelection(g)}
                            className={`px-3 py-1.5 rounded border text-xs font-bold select-none transition-all cursor-pointer ${
                              active
                                ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-350'
                            }`}
                          >
                            {g} класс
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-slate-700">Развернутое описание возможностей</label>
                  <textarea
                    rows={3}
                    required
                    value={oppDescription}
                    onChange={(e) => setOppDescription(e.target.value)}
                    placeholder="Напишите ключевые цели, расписание проведения, пользу и то, что получит участник..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-xs leading-relaxed bg-slate-50 outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>

                
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-slate-700">Условия приема документов, Ограничения и Требования</label>
                  <textarea
                    rows={2}
                    required
                    value={oppRequirements}
                    onChange={(e) => setOppRequirements(e.target.value)}
                    placeholder="Пример: Ученики 10 класса с оценкой 5 по математике. Обязательно резюме..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-xs leading-relaxed bg-slate-50 outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={resetOppForm}
                    className="px-5 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 rounded-lg cursor-pointer"
                  >
                    Отменить
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1 transition-all cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    Сохранить изменения
                  </button>
                </div>
              </form>
            )}

            
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 border-collapse table-auto min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                    <th className="p-4 uppercase tracking-wider text-[10px]">Название и Организатор</th>
                    <th className="p-4 uppercase tracking-wider text-[10px]">Сфера</th>
                    <th className="p-4 uppercase tracking-wider text-[10px]">Дедлайн</th>
                    <th className="p-4 uppercase tracking-wider text-[10px]">Формат</th>
                    <th className="p-4 text-right uppercase tracking-wider text-[10px]">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {opportunities.map((opp) => (
                    <tr key={opp.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <p className="font-extrabold text-slate-850 text-xs">{opp.title}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{opp.organization}</p>
                      </td>
                      <td className="p-4 font-mono font-bold text-blue-700">{opp.category}</td>
                      <td className="p-4 text-rose-600 font-mono font-bold">{opp.deadline}</td>
                      <td className="p-4">
                        <span className="bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded text-[10px] font-bold text-slate-700">{opp.format}</span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex gap-1 justify-end">
                          <button
                            onClick={() => handleEditOpp(opp)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteOpp(opp.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        
        {activePane === 'courses' && (
          <div className="space-y-6 text-left">
            <div className="flex justify-between items-center bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
              <span className="text-xs text-slate-550 font-medium">Создание и редактирование асинхронных учебных курсов</span>
              {!showCourseForm && (
                <button
                  onClick={() => {
                    resetCourseForm();
                    setShowCourseForm(true);
                  }}
                  id="admin-create-course-btn"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Plus className="w-4.5 h-4.5" />
                  Создать новый курс
                </button>
              )}
            </div>

            
            {showCourseForm && (
              <form onSubmit={handleCourseSubmit} className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5 shadow-lg">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-tight">
                    {editingCourseId ? '✏ Редактировать курс' : '➕ Создать новый асинхронный курс'}
                  </h4>
                  <button
                    type="button"
                    onClick={resetCourseForm}
                    className="text-slate-400 hover:text-slate-850 text-xs font-bold cursor-pointer uppercase"
                  >
                    Отменить
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  
                  <div className="space-y-1 text-left">
                    <label className="font-bold text-slate-700">Название учебного курса</label>
                    <input
                      type="text"
                      required
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      placeholder="Например: Продвинутый SAT Math"
                      className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 outline-none focus:border-blue-500"
                    />
                  </div>

                  
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Академическая сфера</label>
                    <select
                      value={courseCategory}
                      onChange={(e) => setCourseCategory(e.target.value as Category)}
                      className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 font-bold text-slate-800 cursor-pointer"
                    >
                      {categoriesList.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  
                  <div className="space-y-1 text-left">
                    <label className="font-bold text-slate-700">Уровень сложности</label>
                    <select
                      value={courseDifficulty}
                      onChange={(e) => setCourseDifficulty(e.target.value as any)}
                      className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 font-bold text-slate-800 cursor-pointer"
                    >
                      <option value="Легкий">Легкий</option>
                      <option value="Средний">Средний</option>
                      <option value="Продвинутый">Продвинутый</option>
                    </select>
                  </div>

                  
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Продолжительность курса (Duration)</label>
                    <input
                      type="text"
                      required
                      value={courseDuration}
                      onChange={(e) => setCourseDuration(e.target.value)}
                      placeholder="Например: 4 недели, 8 уроков"
                      className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 outline-none focus:border-blue-500"
                    />
                  </div>

                  
                  <div className="space-y-1 sm:col-span-2 text-left">
                    <label className="font-bold text-slate-700">Ссылка на обложку курса (Unsplash URL или др)</label>
                    <input
                      type="url"
                      value={courseImageUrl}
                      onChange={(e) => setCourseImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 font-mono text-slate-800"
                    />
                  </div>
                </div>

                
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-slate-700">Сжатая аннотация и цели изучения курса</label>
                  <textarea
                    rows={3}
                    required
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    placeholder="Напишите ключевые навыки пользователей..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-xs leading-relaxed bg-slate-50 outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-500 leading-relaxed font-light">
                  💡 <strong>Важное примечание:</strong> при создании абсолютно нового курса, наша платформа автоматически генерирует в нем <strong>два полноценных интерактивных урока</strong> с симулированными лекциями, подробными текстовыми материалами и интерактивными формами вопросов на автопроверку. Это помогает тестировать MVP-путь учеников мгновенно.
                </div>

                <div className="flex justify-end gap-3 pt-2 text-xs font-bold font-sans">
                  <button
                    type="button"
                    onClick={resetCourseForm}
                    className="px-5 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 rounded-lg cursor-pointer"
                  >
                    Отменить
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1 transition-all cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    Сохранить изменения
                  </button>
                </div>
              </form>
            )}

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex items-start gap-4 justify-between"
                >
                  <div className="space-y-1.5 flex-1 text-left">
                    <div className="flex gap-1.5 items-center">
                      <span className="text-[9px] bg-slate-100 border border-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold uppercase">{course.category}</span>
                      <span className="text-[10px] text-blue-600 font-bold uppercase">{course.difficulty}</span>
                    </div>
                    <h5 className="font-extrabold text-slate-850 text-sm leading-snug line-clamp-1">{course.title}</h5>
                    <p className="text-slate-400 text-[11px] font-mono font-medium">{course.lessons.length} уроков • {course.duration}</p>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mt-1 font-light">{course.description}</p>
                  </div>

                  <div className="flex flex-col gap-1.5 justify-start shrink-0">
                    <button
                      onClick={() => handleEditCourse(course)}
                      className="p-1.5 text-slate-450 hover:text-blue-600 hover:bg-slate-50 rounded border border-slate-200 cursor-pointer"
                      title="Редактировать курс"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="p-1.5 text-slate-455 hover:text-red-650 hover:bg-rose-50 rounded border border-slate-200 cursor-pointer"
                      title="Удалить курс"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        
        {activePane === 'users' && (
          <div className="space-y-6 text-left">
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <h4 className="font-extrabold text-slate-850 text-sm flex items-center gap-1.5 mb-1 uppercase tracking-tight">
                <Users className="w-4.5 h-4.5 text-blue-600" />
                Архив Логов и Пользователей Mentoria Hub
              </h4>
              <p className="text-slate-500 text-xs font-light">
                Список студентов, зарегистрированных на пилотный запуск и проходящих асинхронные курсы в личном кабинете.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 border-collapse table-auto min-w-[650px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                    <th className="p-4 uppercase tracking-wider text-[10px]">ФИО ученика</th>
                    <th className="p-4 uppercase tracking-wider text-[10px]">Класс</th>
                    <th className="p-4 uppercase tracking-wider text-[10px]">Электронная почта</th>
                    <th className="p-4 uppercase tracking-wider text-[10px]">Интересы</th>
                    <th className="p-4 uppercase tracking-wider text-[10px]">Завершено уроков</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {MOCK_STUDENTS_LIST.map((student, sIdx) => {
                    const gradeBg = 
                      student.grade === '11' ? 'bg-blue-50 border-blue-150 text-blue-700' :
                      student.grade === '10' ? 'bg-teal-50 border-teal-150 text-teal-700' :
                      'bg-slate-100 border-slate-200 text-slate-700';

                    return (
                      <tr key={sIdx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-bold text-slate-800 flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-slate-200 border border-slate-300 text-slate-600 flex items-center justify-center text-[10px] font-bold font-mono">
                            {student.name.charAt(0)}
                          </span>
                          {student.name}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded border text-[10px] font-bold uppercase ${gradeBg}`}>
                            {student.grade} класс
                          </span>
                        </td>
                        <td className="p-4 font-mono text-slate-400 select-all">{student.email}</td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {student.interests.map((int) => (
                              <span key={int} className="bg-slate-50 border border-slate-150 text-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                                {int}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-green-650 font-bold font-mono bg-green-50 border border-green-150 px-2 py-0.5 rounded text-[10px] uppercase">
                            {student.completedLessonsCount} уроков
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

}
