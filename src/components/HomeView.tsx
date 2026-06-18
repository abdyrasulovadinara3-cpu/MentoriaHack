import React, { useState } from 'react';
import { Sparkles, ArrowRight, Bookmark, Compass, Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { Opportunity, Course, UserProfile } from '../types';
import { translate, translateCategory, translateFormat, translateDifficulty, translateGrade, Language } from '../localization';

interface HomeViewProps {
  userProfile: UserProfile;
  opportunities: Opportunity[];
  courses: Course[];
  savedOpportunities: string[];
  toggleSaveOpportunity: (id: string) => void;
  setCurrentTab: (tab: string) => void;
  enrollInCourse: (id: string) => void;
  enrolledCourseIds: string[];
  language: Language;
}

export default function HomeView({
  userProfile,
  opportunities,
  courses,
  savedOpportunities,
  toggleSaveOpportunity,
  setCurrentTab,
  enrollInCourse,
  enrolledCourseIds,
  language
}: HomeViewProps) {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinEmail, setJoinEmail] = useState('');
  const [joinSuccess, setJoinSuccess] = useState(false);

  
  const recommendedOpportunities = opportunities
    .filter((opp) => {
      
      const categoryMatch = userProfile.interests.includes(opp.category);
      
      const gradeMatch = opp.targetGrades.includes(userProfile.grade);
      return categoryMatch || gradeMatch;
    })
    .slice(0, 3); 

  const recommendedCourses = courses
    .filter((course) => userProfile.interests.includes(course.category))
    .slice(0, 2);

  
  const displayedCourses = recommendedCourses.length > 0 ? recommendedCourses : courses.slice(0, 2);
  const displayedOpportunities = recommendedOpportunities.length > 0 ? recommendedOpportunities : opportunities.slice(0, 3);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinEmail) {
      setJoinSuccess(true);
      setTimeout(() => {
        setJoinSuccess(false);
        setShowJoinModal(false);
        setJoinEmail('');
      }, 3000);
    }
  };

  return (
    <div id="home-view" className="space-y-12">
      
      <section id="hero-banner" className="relative rounded-2xl overflow-hidden bg-slate-900 text-white py-12 px-6 sm:px-12 lg:px-16 shadow-2xl border border-slate-850">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-blue-500/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-650/10 blur-[130px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl tracking-tight relative z-10 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 bg-blue-550/20 text-blue-300 font-bold text-[10px] px-3.5 py-1.5 rounded-md uppercase tracking-wider border border-blue-500/20 select-none">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            {translate('heroPersonalization', language)}
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-white font-sans uppercase">
            {translate('heroTitle', language)} <span className="text-blue-550 block mt-2">{translate('heroTitle2', language)}</span>
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            {translate('heroDesc', language)}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => setCurrentTab('catalog')}
              id="hero-cta-catalog"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 leading-none cursor-pointer"
            >
              {translate('heroBtnOpps', language)}
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => setCurrentTab('courses')}
              id="hero-cta-courses"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-750 hover:text-white text-slate-300 rounded-lg font-bold transition-all inline-flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
            >
              {translate('heroBtnCourses', language)}
            </button>
            <button
              onClick={() => setShowJoinModal(true)}
              id="hero-cta-join"
              className="px-8 py-4 bg-transparent hover:bg-white/5 text-blue-400 hover:text-blue-300 rounded-lg font-bold transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {translate('heroBtnJoin', language)}
            </button>
          </div>
        </div>

        
        <div className="hidden lg:grid grid-cols-3 gap-4 mt-12 pt-10 border-t border-slate-800 text-slate-300 font-sans text-left">
          <div className="flex gap-4">
            <span className="text-3.5xl font-extrabold text-blue-400 font-mono">100+</span>
            <div>
              <p className="text-white font-bold text-sm">{translate('statOpps', language)}</p>
              <p className="text-xs text-slate-400 mt-1">{translate('statOppsSub', language)}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-3.5xl font-extrabold text-teal-400 font-mono">8</span>
            <div>
              <p className="text-white font-bold text-sm">{translate('statProfiles', language)}</p>
              <p className="text-xs text-slate-400 mt-1">{translate('statProfilesSub', language)}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-3.5xl font-extrabold text-pink-400 font-mono">100%</span>
            <div>
              <p className="text-white font-bold text-sm">{translate('statInteractive', language)}</p>
              <p className="text-xs text-slate-400 mt-1">{translate('statInteractiveSub', language)}</p>
            </div>
          </div>
        </div>
      </section>

      
      <section id="features-explanation" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between text-left">
          <div className="space-y-4">
            <span className="p-3 bg-blue-50 text-blue-600 rounded-lg inline-block border border-blue-100">
              <Compass className="w-6 h-6" />
            </span>
            <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">{translate('conceptOppsTitle', language)}</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              {translate('conceptOppsDesc', language)}
            </p>
            <ul className="space-y-2 text-slate-600 text-sm py-2">
              <li className="flex items-center gap-2 font-medium">
                <span className="text-blue-600 font-bold">✔</span> {translate('conceptOppsP1', language)}
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="text-blue-600 font-bold">✔</span> {translate('conceptOppsP2', language)}
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="text-blue-600 font-bold">✔</span> {translate('conceptOppsP3', language)}
              </li>
            </ul>
          </div>
          <button 
            onClick={() => setCurrentTab('catalog')} 
            className="text-blue-600 font-bold hover:text-blue-800 transition-colors inline-flex items-center gap-1.5 mt-6 self-start text-xs uppercase tracking-wide cursor-pointer"
          >
            {translate('conceptOppsBtn', language)}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between text-left">
          <div className="space-y-4">
            <span className="p-3 bg-teal-50 text-teal-700 rounded-lg inline-block border border-teal-100">
              <Award className="w-6 h-6" />
            </span>
            <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">{translate('conceptCoursesTitle', language)}</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              {translate('conceptCoursesDesc', language)}
            </p>
            <ul className="space-y-2 text-slate-600 text-sm py-2">
              <li className="flex items-center gap-2 font-medium">
                <span className="text-teal-600 font-bold">✔</span> {translate('conceptCoursesP1', language)}
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="text-teal-600 font-bold">✔</span> {translate('conceptCoursesP2', language)}
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="text-teal-600 font-bold">✔</span> {translate('conceptCoursesP3', language)}
              </li>
            </ul>
          </div>
          <button 
            onClick={() => setCurrentTab('courses')} 
            className="text-teal-755 font-bold hover:text-teal-900 transition-colors inline-flex items-center gap-1.5 mt-6 self-start text-xs uppercase tracking-wide cursor-pointer"
          >
            {translate('conceptCoursesBtn', language)}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      
      <section id="recommendations-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="text-left">
            <div className="flex items-center gap-2 text-blue-650 font-bold text-[10px] tracking-wider uppercase font-mono mb-1">
               {language === 'en' ? 'Personal Match' : language === 'kk' ? 'Жеке таңдау' : 'Персональный подбор'}
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 font-sans tracking-tight uppercase">{translate('recsTitle', language)}</h3>
            <p className="text-slate-500 text-sm font-light">
              {language === 'en' ? 'Based on your interests: ' : language === 'kk' ? 'Сіздің қызығушылықтарыңыз негізінде: ' : 'На основе ваших интересов: '}
              <span className="font-bold text-slate-700">
                {userProfile.interests.map(cat => translateCategory(cat, language)).join(', ')}
              </span>
              {language === 'en' ? ` and level (${translateGrade(userProfile.grade, language)})` : language === 'kk' ? ` және деңгейіңіз (${translateGrade(userProfile.grade, language)})` : ` и уровня (${translateGrade(userProfile.grade, language)})`}
            </p>
          </div>
          <button 
            onClick={() => setCurrentTab('cabinet')}
            className="text-slate-700 hover:text-blue-600 transition-colors font-bold text-xs inline-flex items-center gap-1 border border-slate-300 hover:border-blue-400 rounded-lg py-2 px-4 cursor-pointer uppercase font-sans font-semibold"
          >
            {language === 'en' ? 'Configure in Cabinet' : language === 'kk' ? 'Кабинетте баптау' : 'Настроить в кабинете'}
          </button>
        </div>

        
        <div className="space-y-4">
          <h4 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 uppercase tracking-wider text-left">
            {language === 'en' ? ' Recommended Programs & Opportunities' : language === 'kk' ? ' Ұсынылған бағдарламалар мен мүмкіндіктер' : ' Рекомендованные программы и возможности'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedOpportunities.map((opp) => {
              const isSaved = savedOpportunities.includes(opp.id);
              return (
                <div
                  key={opp.id}
                  id={`rec-opp-${opp.id}`}
                  className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl rounded-xl p-6 transition-all flex flex-col justify-between text-left"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-slate-100 text-slate-800">
                        {translateCategory(opp.category, language)}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {language === 'en' ? 'Until' : language === 'kk' ? 'дейін' : 'До'} {opp.deadline}
                      </span>
                    </div>

                    <h5 className="font-bold text-slate-800 hover:text-blue-600 transition-colors line-clamp-2 text-base leading-snug">
                      {opp.title}
                    </h5>
                    
                    <p className="text-xs text-slate-400 mt-2 font-semibold">{translate('cardOrg', language)} {opp.organization}</p>
                    <p className="text-slate-500 text-xs mt-3 line-clamp-3 leading-relaxed font-light">
                      {opp.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-200 font-bold">
                      {translateFormat(opp.format, language)}
                    </span>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleSaveOpportunity(opp.id)}
                        className={`p-2 rounded-lg transition-all border ${
                          isSaved
                            ? 'bg-blue-50 border-blue-200 text-blue-600'
                            : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                        }`}
                        title="Добавить в избранное"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                      <button
                        onClick={() => {
                          setCurrentTab('catalog');
                        }}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer shadow-sm"
                      >
                        {language === 'en' ? 'Details' : language === 'kk' ? 'Толығырақ' : 'Детали'}
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        
        <div className="space-y-4 pt-4">
          <h4 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 uppercase tracking-wider text-left">
            {language === 'en' ? ' Academic Courses' : language === 'kk' ? ' Академиялық курстар' : ' Академические курсы'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedCourses.map((course) => {
              const isEnrolled = enrolledCourseIds.includes(course.id);
              return (
                <div
                  key={course.id}
                  id={`rec-course-${course.id}`}
                  className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl rounded-xl p-6 transition-all flex flex-col sm:flex-row gap-5 text-left"
                >
                  <div className="w-full sm:w-1/3 h-32 rounded-lg overflow-hidden shrink-0 bg-slate-900 text-white relative flex items-center justify-center p-3 text-center">
                    {course.imageUrl ? (
                      <img 
                        src={course.imageUrl} 
                        alt={course.title} 
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover opacity-65 hover:scale-105 transition-transform" 
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-blue-900 opacity-60" />
                    )}
                    <span className="relative font-extrabold text-[10px] tracking-wider uppercase font-sans z-10 text-white bg-slate-950/70 p-1.5 rounded">
                      {translateCategory(course.category, language)}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex gap-2 mb-1.5 items-center">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                          {translateDifficulty(course.difficulty, language)}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {course.duration}
                        </span>
                      </div>
                      <h5 className="font-extrabold text-slate-800 text-base leading-tight hover:text-blue-600 transition-colors">
                        {course.title}
                      </h5>
                      <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed font-light">
                        {course.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-mono font-medium">
                        {course.lessons.length} {language === 'en' ? 'lessons' : language === 'kk' ? 'сабақ' : 'уроков'}
                      </span>
                      {isEnrolled ? (
                        <button
                          onClick={() => setCurrentTab('courses')}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        >
                          {language === 'en' ? 'Go to lessons' : language === 'kk' ? 'Сабақтарға өту' : 'Перейти к урокам'}
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            enrollInCourse(course.id);
                            setCurrentTab('courses');
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-transform active:scale-95 cursor-pointer shadow-sm"
                        >
                          {language === 'en' ? 'Enroll' : language === 'kk' ? 'Жазылу' : 'Записаться'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      
      {showJoinModal && (
        <div id="join-modal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setShowJoinModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full p-2 transition-all text-sm font-bold cursor-pointer"
            >
              ✕
            </button>

            {joinSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div id="check-icon-container" className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 border border-green-100">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  {language === 'en' ? 'Registration Successful!' : language === 'kk' ? 'Тіркелу сәтті аяқталды!' : 'Регистрация успешна!'}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-light">
                  {language === 'en' ? 'Your application to join the Mentoria community has been received! Our coordinator will email you shortly.' : language === 'kk' ? 'Mentoria қауымдастығына қосылуға өтініміңіз қабылданды! Біздің үйлестіруші жақын арада сізге хат жазады.' : 'Ваша заявка на участие в сообществе Mentoria принята! Наш академический координатор вышлет вам приглашение на почту в ближайшее время.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="space-y-4 font-sans text-left">
                <h3 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight">{translate('heroBtnJoin', language)}</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-light">
                  {language === 'en' ? 'Enter your email address to get access to the private students chat, individual consultations, and premium opportunities.' : language === 'kk' ? 'Жабық чатқа, жеке кеңестерге және премиум мүмкіндіктерге қол жеткізу үшін электрондық поштаңызды енгізіңіз.' : 'Введите адрес электронной почты, чтобы получить доступ к закрытому чату учеников, индивидуальным консультациям и премиальным возможностям.'}
                </p>

                <div className="space-y-1.5 text-xs text-left text-left">
                  <label htmlFor="join-email" className="font-bold text-slate-700 font-semibold font-sans">
                    {language === 'en' ? 'Student Email Address' : language === 'kk' ? 'Оқушының электрондық поштасы' : 'Электронная почта ученика'}
                  </label>
                  <input
                    id="join-email"
                    type="email"
                    required
                    value={joinEmail}
                    onChange={(e) => setJoinEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-blue-600 text-xs transition-all bg-slate-50"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    {language === 'en' ? 'Submit Application' : language === 'kk' ? 'Қосылуға өтінім беру' : 'Подать заявку на вступление'}
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
