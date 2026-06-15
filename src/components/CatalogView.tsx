import React, { useState } from 'react';
import { Search, Filter, Calendar, MapPin, ClipboardList, CheckCircle2, Bookmark, ExternalLink } from 'lucide-react';
import { Opportunity, Category, OpportunityFormat } from '../types';

interface CatalogViewProps {
  opportunities: Opportunity[];
  savedOpportunities: string[];
  toggleSaveOpportunity: (id: string) => void;
  userGrade: string;
}

export default function CatalogView({
  opportunities,
  savedOpportunities,
  toggleSaveOpportunity,
  userGrade
}: CatalogViewProps) {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedFormat, setSelectedFormat] = useState<OpportunityFormat | 'All'>('All');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('All');

  
  const [applyingOpp, setApplyingOpp] = useState<Opportunity | null>(null);
  const [motivationText, setMotivationText] = useState('');
  const [simulatedFileName, setSimulatedFileName] = useState('');
  const [appliedStatuses, setAppliedStatuses] = useState<Record<string, boolean>>({});
  const [applicationCompleted, setApplicationCompleted] = useState(false);

  
  const categoriesList: (Category | 'All')[] = ['All', 'STEM', 'Programming', 'Business', 'Social Impact', 'Finance', 'Science', 'Arts & Humanities'];
  const formatsList: (OpportunityFormat | 'All')[] = ['All', 'Online', 'Offline', 'Hybrid'];
  const gradesList = ['All', '8', '9', '10', '11', '12'];

  
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || opp.category === selectedCategory;
    const matchesFormat = selectedFormat === 'All' || opp.format === selectedFormat;
    const matchesGrade = selectedGradeFilter === 'All' || opp.targetGrades.includes(selectedGradeFilter);

    return matchesSearch && matchesCategory && matchesFormat && matchesGrade;
  });

  const handleApplyClick = (opp: Opportunity) => {
    setApplyingOpp(opp);
    setMotivationText('');
    setSimulatedFileName('');
    setApplicationCompleted(false);
  };

  const submitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyingOpp) {
      setAppliedStatuses({
        ...appliedStatuses,
        [applyingOpp.id]: true
      });
      setApplicationCompleted(true);
      setTimeout(() => {
        setApplyingOpp(null);
        setApplicationCompleted(false);
      }, 2500);
    }
  };

  const triggerSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSimulatedFileName(e.target.files[0].name);
    }
  };

  return (
    <div id="catalog-view" className="space-y-8">
      

      {}
      <div className="bg-slate-900 border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 font-sans">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="font-extrabold text-white text-sm flex items-center gap-2 uppercase tracking-wide">
            <Filter className="w-4.5 h-4.5 text-blue-600" />
            Интеллектуальные фильтры
          </span>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedFormat('All');
              setSelectedGradeFilter('All');
              setSearchTerm('');
            }}
            className="text-xs text-white hover:underline hover:text-blue-800 transition-colors font-bold cursor-pointer uppercase"
          >
            Сбросить все фильтры
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-left">
          {}
          <div className="space-y-2">
            <label className="font-bold text-white block uppercase tracking-wider text-[10px]">Категория / Сфера</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category | 'All')}
              className="w-full p-3 rounded-lg border border-slate-200 focus:border-blue-500 hover:border-slate-300 outline-none font-medium bg-slate-50 cursor-pointer text-slate-800"
            >
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? '👨 Все категории' : cat}
                </option>
              ))}
            </select>
          </div>

          {}
          <div className="space-y-2">
            <label className="font-bold text-white block uppercase tracking-wider text-[10px]">Формат проведения</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as OpportunityFormat | 'All')}
              className="w-full p-3 rounded-lg border border-slate-200 focus:border-blue-500 hover:border-slate-300 outline-none font-medium bg-slate-50 cursor-pointer text-slate-800"
            >
              {formatsList.map((fmt) => (
                <option key={fmt} value={fmt}>
                  {fmt === 'All' ? ' Все форматы' : fmt === 'Online' ? ' Онлайн' : fmt === 'Offline' ? ' Офлайн' : ' Гибрид'}
                </option>
              ))}
            </select>
          </div>

          {}
          <div className="space-y-2">
            <label className="font-bold text-white block uppercase tracking-wider text-[10px]">Академический класс</label>
            <select
              value={selectedGradeFilter}
              onChange={(e) => setSelectedGradeFilter(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 focus:border-blue-500 hover:border-slate-300 outline-none font-medium bg-slate-50 cursor-pointer text-slate-800"
            >
              {gradesList.map((gr) => (
                <option key={gr} value={gr}>
                  {gr === 'All' ? ' Любой класс' : `${gr} класс`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {}
        <div className="flex flex-wrap gap-2 pt-2 text-[11px] text-slate-500 font-medium">
          {selectedCategory !== 'All' && (
            <span className="bg-slate-100 text-slate-800 py-1 px-3 rounded border border-slate-200 flex items-center gap-1 font-bold">
              Сфера: {selectedCategory}
              <button onClick={() => setSelectedCategory('All')} className="hover:text-red-500 cursor-pointer font-bold ml-1">✕</button>
            </span>
          )}
          {selectedFormat !== 'All' && (
            <span className="bg-slate-100 text-slate-850 py-1 px-3 rounded border border-slate-200 flex items-center gap-1 font-bold">
              Формат: {selectedFormat}
              <button onClick={() => setSelectedFormat('All')} className="hover:text-red-500 cursor-pointer font-bold ml-1">✕</button>
            </span>
          )}
          {selectedGradeFilter !== 'All' && (
            <span className="bg-slate-100 text-slate-850 py-1 px-3 rounded border border-slate-200 flex items-center gap-1 font-bold">
              Класс: {selectedGradeFilter}
              <button onClick={() => setSelectedGradeFilter('All')} className="hover:text-red-500 cursor-pointer font-bold ml-1">✕</button>
            </span>
          )}
        </div>
      </div>

      {}
      <div>
        <p className="text-slate-400 text-xs font-mono mb-4 text-left">Найдено возможностей: {filteredOpportunities.length}</p>

        {filteredOpportunities.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 shadow-sm">
            <div className="text-4xl">🔎</div>
            <h3 className="text-lg font-bold text-slate-850 uppercase tracking-tight">По вашему запросу ничего не найдено</h3>
            <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
              Попробуйте сбросить фильтры или изменить поисковый запрос, чтобы получить больше учебных возможностей.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedFormat('All');
                setSelectedGradeFilter('All');
                setSearchTerm('');
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all mt-2 cursor-pointer shadow-md"
            >
              Сбросить все фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {filteredOpportunities.map((opp) => {
              const isSaved = savedOpportunities.includes(opp.id);
              const isApplied = appliedStatuses[opp.id];
              return (
                <div
                  key={opp.id}
                  id={`opportunity-card-${opp.id}`}
                  className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl rounded-xl p-6 sm:p-8 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-3 py-1 bg-slate-100 text-slate-800 rounded uppercase tracking-wider border border-slate-200">
                        {opp.category}
                      </span>
                      <span className="text-xs text-rose-650 font-bold bg-rose-50 px-3 py-1 rounded border border-rose-150 flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        До {opp.deadline}
                      </span>
                    </div>

                    {}
                    <div>
                      <h3 className="font-extrabold text-slate-850 text-lg leading-snug hover:text-blue-600 transition-colors">
                        {opp.title}
                      </h3>
                      <p className="text-xs text-blue-600 font-bold mt-1">Организатор: {opp.organization}</p>
                    </div>

                    {}
                    <div>
                      <p className="text-slate-700 text-xs leading-relaxed font-light line-clamp-3">
                        {opp.description}
                      </p>
                    </div>

                    {}
                    <div className="bg-slate-50 rounded-lg p-4 space-y-2 border border-slate-150">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5 leading-none">
                        <ClipboardList className="w-3.5 h-3.5 text-blue-650 shrink-0" />
                        Условия и Требования
                      </h4>
                      <p className="text-slate-650 text-xs leading-relaxed font-light">
                        {opp.requirements}
                      </p>
                    </div>
                  </div>

                  {}
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded font-bold border border-slate-200">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {opp.format}
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-slate-400">
                        {opp.targetGrades.map(g => `${g} кл`).join(', ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {}
                      <button
                        onClick={() => toggleSaveOpportunity(opp.id)}
                        className={`p-2 rounded-lg border transition-all cursor-pointer ${
                          isSaved
                            ? 'bg-blue-50 border-blue-200 text-blue-600'
                            : 'border-slate-200 text-slate-400 hover:text-slate-655 hover:bg-slate-50'
                        }`}
                        title={isSaved ? 'Удалить из сохраненных' : 'Сохранить возможность'}
                      >
                        <Bookmark className="w-4.5 h-4.5 fill-current" />
                      </button>

                      {}
                      {isApplied ? (
                        <span className="px-5 py-2.5 bg-green-50 text-green-700 rounded-lg text-xs font-bold flex items-center gap-1 border border-green-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Отправлено
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApplyClick(opp)}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                        >
                          Подать заявку
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {}
      {applyingOpp && (
        <div id="apply-modal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setApplyingOpp(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full p-2 transition-all cursor-pointer"
            >
              ✕
            </button>

            {applicationCompleted ? (
              <div className="text-center py-8 space-y-4">
                <div id="suc-icon" className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-150">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">Заявка успешно отправлена!</h3>
                <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto font-light">
                  Мы симулировали подачу на <strong>{applyingOpp.title}</strong>. Статус отслеживания изменен на «Подано». Вы можете увидеть её в личном кабинете.
                </p>
              </div>
            ) : (
              <form onSubmit={submitApplication} className="space-y-4 text-xs text-left font-sans">
                <div>
                  <span className="text-[10px] font-bold text-blue-650 bg-blue-50 px-2.5 py-1 rounded uppercase border border-blue-150">
                    Подача заявления
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-3 line-clamp-1 uppercase">
                    {applyingOpp.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5 font-bold">Организация: {applyingOpp.organization}</p>
                </div>

                <div className="space-y-1.5 font-sans">
                  <label htmlFor="student-motivation" className="font-bold text-slate-700">Мотивационное письмо (минимум 100 слов)</label>
                  <textarea
                    id="student-motivation"
                    required
                    rows={4}
                    value={motivationText}
                    onChange={(e) => setMotivationText(e.target.value)}
                    placeholder="Напишите, почему вы хотите участвовать в этой программе и какой вклад надеетесь внести..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-blue-600 text-xs leading-relaxed bg-slate-50 text-slate-800"
                  />
                </div>

                {}
                <div className="space-y-1.5 font-sans">
                  <label className="font-bold text-slate-700">Академическое резюме или табель (PDF/DOCX)</label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-lg p-6 text-center transition-all relative cursor-pointer bg-slate-50">
                    <input
                      type="file"
                      id="simulated-resume-upload"
                      accept=".pdf,.docx,.doc"
                      onChange={triggerSimulatedUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-1">
                      <p className="text-blue-600 font-bold text-xs">Нажмите для выбора файла</p>
                      <p className="text-slate-400 text-[10px]">или перетащите его прямо сюда (до 10 МБ)</p>
                      {simulatedFileName && (
                        <p className="text-green-650 font-bold text-[11px] pt-2">
                          ✓ Выбран файл: {simulatedFileName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Отправить официальную заявку
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
