import React, { useState } from 'react';
import { Search, Filter, Calendar, MapPin, ClipboardList, CheckCircle2, Bookmark, ExternalLink } from 'lucide-react';
import { Opportunity, Category, OpportunityFormat } from '../types';
import { translate, translateCategory, translateFormat, translateGrade, Language } from '../localization';

interface CatalogViewProps {
  opportunities: Opportunity[];
  savedOpportunities: string[];
  toggleSaveOpportunity: (id: string) => void;
  userGrade: string;
  language: Language;
}

export default function CatalogView({
  opportunities,
  savedOpportunities,
  toggleSaveOpportunity,
  userGrade,
  language
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
    <div id="catalog-view" className="space-y-6">
      
      <div className="text-left space-y-1.5 py-1">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-sans tracking-tight uppercase text-slate-900">
          {translate('conceptOppsTitle', language)}
        </h2>
        <p className="text-slate-500 text-sm max-w-2xl font-light">
          {language === 'en' ? 'Internships, extracurricular plans, hackathons and camps. Use filters to match with your profile.' : language === 'kk' ? 'Тағылымдамалар, мектептен тыс бағдарламалар, хакатондар мен лагерьлер. Сүзгілерді пайдаланыңыз.' : 'Стажировки, программы внеклассной деятельности, хакатоны и лагеря. Используйте фильтры для быстрого подбора под свое портфолио.'}
        </p>
      </div>

      
      <div className="bg-slate-900 border border-slate-880 rounded-2xl p-6 shadow-xl space-y-5 font-sans">
        <div className="flex items-center justify-between border-b border-slate-805 pb-3">
          <span className="font-extrabold text-white text-sm flex items-center gap-2 uppercase tracking-wide">
            <Filter className="w-4.5 h-4.5 text-blue-400" />
            {language === 'en' ? 'Smart Search & Filters' : language === 'kk' ? 'Интеллектуалды іздеу мен сүзгілер' : 'Интеллектуальный поиск и фильтры'}
          </span>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedFormat('All');
              setSelectedGradeFilter('All');
              setSearchTerm('');
            }}
            className="text-xs text-blue-400 hover:underline hover:text-blue-300 transition-colors font-bold cursor-pointer uppercase font-semibold"
          >
            {translate('btnResetFilter', language)}
          </button>
        </div>

        
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 animate-pulse" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={translate('searchPlaceholder', language)}
            className="w-full bg-slate-800 text-white pl-12 pr-20 py-3.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm border border-slate-700 hover:border-slate-600 transition-colors placeholder:text-slate-400 shadow-inner"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-xs bg-slate-700 hover:bg-slate-650 text-slate-100 py-1.5 px-3 rounded transition-all font-mono font-semibold cursor-pointer"
            >
              {language === 'en' ? 'Reset' : language === 'kk' ? 'Тазарту' : 'Сбросить'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-left">
          
          <div className="space-y-2">
            <label className="font-bold text-slate-300 block uppercase tracking-wider text-[10px]">
              {language === 'en' ? 'Category / Sphere' : language === 'kk' ? 'Санат / Сала' : 'Категория / Сфера'}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category | 'All')}
              className="w-full p-3 rounded-lg border border-slate-700 focus:border-blue-500 hover:border-slate-600 outline-none font-medium bg-slate-800 cursor-pointer text-white"
            >
              {categoriesList.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900 text-white">
                  {cat === 'All' ? translate('filterAll', language) : translateCategory(cat, language)}
                </option>
              ))}
            </select>
          </div>

          
          <div className="space-y-2">
            <label className="font-bold text-slate-300 block uppercase tracking-wider text-[10px]">{translate('filterFormat', language)}</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as OpportunityFormat | 'All')}
              className="w-full p-3 rounded-lg border border-slate-700 focus:border-blue-500 hover:border-slate-600 outline-none font-medium bg-slate-800 cursor-pointer text-white"
            >
              {formatsList.map((fmt) => (
                <option key={fmt} value={fmt} className="bg-slate-900 text-white">
                  {fmt === 'All' 
                    ? (language === 'en' ? ' All Formats' : language === 'kk' ? ' Барлық форматтар' : ' Все форматы') 
                    : translateFormat(fmt, language)}
                </option>
              ))}
            </select>
          </div>

          
          <div className="space-y-2">
            <label className="font-bold text-slate-300 block uppercase tracking-wider text-[10px]">{translate('gradeLabel', language)}</label>
            <select
              value={selectedGradeFilter}
              onChange={(e) => setSelectedGradeFilter(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-700 focus:border-blue-500 hover:border-slate-600 outline-none font-medium bg-slate-800 cursor-pointer text-white"
            >
              {gradesList.map((gr) => (
                <option key={gr} value={gr} className="bg-slate-900 text-white">
                  {gr === 'All' 
                    ? (language === 'en' ? ' Any Grade' : language === 'kk' ? ' Кез келген сынып' : ' Любой класс') 
                    : translateGrade(gr, language)}
                </option>
              ))}
            </select>
          </div>
        </div>

        
        <div className="flex flex-wrap gap-2 pt-2 text-[11px] text-slate-400 font-medium">
          {selectedCategory !== 'All' && (
            <span className="bg-slate-800 text-slate-100 py-1 px-3 rounded border border-slate-700 flex items-center gap-1 font-bold">
              {language === 'en' ? 'Category:' : language === 'kk' ? 'Сала:' : 'Сфера:'} {translateCategory(selectedCategory, language)}
              <button onClick={() => setSelectedCategory('All')} className="hover:text-red-400 cursor-pointer font-bold ml-1">✕</button>
            </span>
          )}
          {selectedFormat !== 'All' && (
            <span className="bg-slate-800 text-slate-100 py-1 px-3 rounded border border-slate-700 flex items-center gap-1 font-bold">
              {language === 'en' ? 'Format:' : language === 'kk' ? 'Формат:' : 'Формат:'} {translateFormat(selectedFormat, language)}
              <button onClick={() => setSelectedFormat('All')} className="hover:text-red-400 cursor-pointer font-bold ml-1">✕</button>
            </span>
          )}
          {selectedGradeFilter !== 'All' && (
            <span className="bg-slate-800 text-slate-100 py-1 px-3 rounded border border-slate-700 flex items-center gap-1 font-bold">
              {language === 'en' ? 'Grade:' : language === 'kk' ? 'Сынып:' : 'Класс:'} {translateGrade(selectedGradeFilter, language)}
              <button onClick={() => setSelectedGradeFilter('All')} className="hover:text-red-400 cursor-pointer font-bold ml-1">✕</button>
            </span>
          )}
        </div>
      </div>

      
      <div>
        <p className="text-slate-400 text-xs font-mono mb-4 text-left">
          {language === 'en' ? 'Opportunities found: ' : language === 'kk' ? 'Табылған мүмкіндіктер саны: ' : 'Найдено возможностей: '}
          {filteredOpportunities.length}
        </p>

        {filteredOpportunities.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 shadow-sm">
            <div className="text-4xl">🔎</div>
            <h3 className="text-lg font-bold text-slate-850 uppercase tracking-tight">{translate('noOppsFound', language)}</h3>
            <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
              {language === 'en' ? 'Try resetting filters or changing search queries to discover more academic opportunities.' : language === 'kk' ? 'Көптеген академиялық мүмкіндіктерді табу үшін сүзгілерді алып тастаңыз немесе іздеуді өзгертіңіз.' : 'Попробуйте сбросить фильтры или изменить поисковый запрос, чтобы получить больше учебных возможностей.'}
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
              {translate('btnResetFilter', language)}
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
                    {/* Header line info */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-3 py-1 bg-slate-100 text-slate-800 rounded uppercase tracking-wider border border-slate-200">
                        {translateCategory(opp.category, language)}
                      </span>
                      <span className="text-xs text-rose-650 font-bold bg-rose-50 px-3 py-1 rounded border border-rose-150 flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        {language === 'en' ? 'Until' : language === 'kk' ? 'дейін' : 'До'} {opp.deadline}
                      </span>
                    </div>

                    
                    <div>
                      <h3 className="font-extrabold text-slate-850 text-lg leading-snug hover:text-blue-600 transition-colors">
                        {opp.title}
                      </h3>
                      <p className="text-xs text-blue-600 font-bold mt-1">{translate('cardOrg', language)} {opp.organization}</p>
                    </div>

                    
                    <div>
                      <p className="text-slate-700 text-xs leading-relaxed font-light line-clamp-3">
                        {opp.description}
                      </p>
                    </div>

                    
                    <div className="bg-slate-50 rounded-lg p-4 space-y-2 border border-slate-150">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5 leading-none">
                        <ClipboardList className="w-3.5 h-3.5 text-blue-650 shrink-0" />
                        {translate('cardReqs', language)}
                      </h4>
                      <p className="text-slate-655 text-xs leading-relaxed font-light">
                        {opp.requirements}
                      </p>
                    </div>
                  </div>

                  
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded font-bold border border-slate-200">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {translateFormat(opp.format, language)}
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-slate-400">
                        {opp.targetGrades.map(g => translateGrade(g, language)).join(', ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      
                      <button
                        onClick={() => toggleSaveOpportunity(opp.id)}
                        className={`p-2 rounded-lg border transition-all cursor-pointer ${
                          isSaved
                            ? 'bg-blue-50 border-blue-200 text-blue-600'
                            : 'border-slate-200 text-slate-400 hover:text-slate-655 hover:bg-slate-50'
                        }`}
                        title={isSaved 
                          ? (language === 'en' ? 'Remove from saved' : language === 'kk' ? 'Сақталғаннан өшіру' : 'Удалить из сохраненных') 
                          : translate('cardSave', language)}
                      >
                        <Bookmark className="w-4.5 h-4.5 fill-current" />
                      </button>

                      
                      {isApplied ? (
                        <span className="px-5 py-2.5 bg-green-50 text-green-700 rounded-lg text-xs font-bold flex items-center gap-1 border border-green-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {language === 'en' ? 'Submitted' : language === 'kk' ? 'Жіберілді' : 'Отправлено'}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApplyClick(opp)}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                        >
                          {language === 'en' ? 'Apply Now' : language === 'kk' ? 'Өтінім беру' : 'Подать заявку'}
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

      
      {applyingOpp && (
        <div id="apply-modal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setApplyingOpp(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full p-2 transition-all cursor-pointer text-sm font-bold"
            >
              ✕
            </button>

            {applicationCompleted ? (
              <div className="text-center py-8 space-y-4">
                <div id="suc-icon" className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-150">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-850 uppercase tracking-tight">
                  {language === 'en' ? 'Application Successfully Submitted!' : language === 'kk' ? 'Өтінім sәтті жіберілді!' : 'Заявка успешно отправлена!'}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto font-light">
                  {language === 'en' ? `We simulated your application submission for ` : language === 'kk' ? `Біз сіздің ` : `Мы симулировали подачу на `}
                  <strong>{applyingOpp.title}</strong>
                  {language === 'en' ? '. Status changed to "Applied". You can track it in your Personal Cabinet.' : language === 'kk' ? ' бағдарламасына өтінім беруді симуляцияладық. Күй "Жіберілді" болып өзгерді. Оны жеке кабинеттен бақылай аласыз.' : '. Статус отслеживания изменен на «Подано». Вы можете увидеть её в личном кабинете.'}
                </p>
              </div>
            ) : (
              <form onSubmit={submitApplication} className="space-y-4 text-xs text-left font-sans">
                <div>
                  <span className="text-[10px] font-bold text-blue-650 bg-blue-50 px-2.5 py-1 rounded uppercase border border-blue-150">
                    {language === 'en' ? 'Application Form' : language === 'kk' ? 'Өтінім пішіні' : 'Подача заявления'}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-3 line-clamp-1 uppercase">
                    {applyingOpp.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5 font-bold">{translate('cardOrg', language)} {applyingOpp.organization}</p>
                </div>

                <div className="space-y-1.5 font-sans">
                  <label htmlFor="student-motivation" className="font-bold text-slate-700">
                    {language === 'en' ? 'Motivation Letter (minimum 100 words)' : language === 'kk' ? 'Уәждемелік хат (кемінде 100 сөз)' : 'Мотивационное письмо (минимум 100 слов)'}
                  </label>
                  <textarea
                    id="student-motivation"
                    required
                    rows={4}
                    value={motivationText}
                    onChange={(e) => setMotivationText(e.target.value)}
                    placeholder={
                      language === 'en' ? 'Explain why you are interested in this program and what unique contribution you hope to bring...' : language === 'kk' ? 'Неліктен бұл бағдарламаға қатысқыңыз келетінін және қандай үлес қосатыныңызды жазыңыз...' : 'Напишите, почему вы хотите участвовать в этой программе и какой вклад надеетесь внести...'
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-blue-600 text-xs leading-relaxed bg-slate-50 text-slate-800"
                  />
                </div>

                
                <div className="space-y-1.5 font-sans text-left">
                  <label className="font-bold text-slate-700">
                    {language === 'en' ? 'Academic Resume or Transcript (PDF/DOCX)' : language === 'kk' ? 'Академиялық түйіндеме немесе табель (PDF/DOCX)' : 'Академическое резюме или табель (PDF/DOCX)'}
                  </label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-lg p-6 text-center transition-all relative cursor-pointer bg-slate-50">
                    <input
                      type="file"
                      id="simulated-resume-upload"
                      accept=".pdf,.docx,.doc"
                      onChange={triggerSimulatedUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-1">
                      <p className="text-blue-600 font-bold text-xs">
                        {language === 'en' ? 'Click to select file' : language === 'kk' ? 'Файлды таңдау үшін басыңыз' : 'Нажмите для выбора файла'}
                      </p>
                      <p className="text-slate-400 text-[10px]">
                        {language === 'en' ? 'or drag and drop it here (up to 10 MB)' : language === 'kk' ? 'немесе осы жерге сүйреп апарыңыз (10 МБ дейін)' : 'или перетащите его прямо сюда (до 10 МБ)'}
                      </p>
                      {simulatedFileName && (
                        <p className="text-green-650 font-bold text-[11px] pt-2">
                          {language === 'en' ? '✓ File selected: ' : language === 'kk' ? '✓ Файл таңдалды: ' : '✓ Выбран файл: '} {simulatedFileName}
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
                    {language === 'en' ? 'Submit Official Application' : language === 'kk' ? 'Ресми өтінімді жіберу' : 'Отправить официальную заявку'}
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
