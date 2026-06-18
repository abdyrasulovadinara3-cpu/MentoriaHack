import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Compass, Target, ArrowRight, Check } from 'lucide-react';
import { Category, UserProfile } from '../types';
import { Language, translate, translateCategory } from '../localization';

interface OnboardingProps {
  onComplete: (preferences: Omit<UserProfile, 'name' | 'email' | 'role' | 'hasOnboarded'>) => void;
  language: Language;
}

const CATEGORIES: { value: Category; icon: string; bg: string; text: string }[] = [
  { value: 'STEM', icon: '', bg: 'bg-slate-50', text: 'text-slate-850' },
  { value: 'Programming', icon: '', bg: 'bg-slate-50', text: 'text-slate-850' },
  { value: 'Business', icon: '', bg: 'bg-slate-50', text: 'text-slate-850' },
  { value: 'Social Impact', icon: '', bg: 'bg-slate-50', text: 'text-slate-850' },
  { value: 'Finance', icon: '', bg: 'bg-slate-50', text: 'text-slate-850' },
  { value: 'Science', icon: '', bg: 'bg-slate-50', text: 'text-slate-850' },
  { value: 'Arts & Humanities', icon: '', bg: 'bg-slate-50', text: 'text-slate-850' },
];

export default function Onboarding({ onComplete, language }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedInterests, setSelectedInterests] = useState<Category[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const localizedGoalsByLang = {
    ru: [
      'Поступление в топовый зарубежный вуз (США, Европа, Азия)',
      'Создание собственного стартап-проекта',
      'Изучение программирования с нуля и участие в хакатонах',
      'Подготовка к международным экзаменам (SAT, IELTS, TOEFL)',
      'Проведение научного исследования под руководством профессора',
      'Участие в профессиональных олимпиадах и конкурсах'
    ],
    en: [
      'Admission to a top foreign university (USA, Europe, Asia)',
      'Creating my own startup project / venture',
      'Learning programming from scratch and winning hackathons',
      'Preparing for international tests (SAT, IELTS, TOEFL)',
      'Conducting scientific research mentored by a professor',
      'Entering competitive international olympiads and academic contests'
    ],
    kk: [
      'Шетелдік үздік ЖОО-ға оқуға түсу (АҚШ, Еуропа, Азия)',
      'Жеке стартап жобамды / бизнесімді бастау',
      'Бағдарлаулауды нөлден үйрену және хакатондарға қатысу',
      'Халықаралық емтихандарға дайындалу (SAT, IELTS, TOEFL)',
      'Профессордың жетекшілігімен ғылыми зерттеу жүргізу',
      'Кәсіби олимпиадалар мен халықаралық жарыстарға қатысу'
    ]
  };
  const GOALS_LIST = localizedGoalsByLang[language] || localizedGoalsByLang.ru;

  const toggleInterest = (category: Category) => {
    if (selectedInterests.includes(category)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== category));
    } else {
      setSelectedInterests([...selectedInterests, category]);
    }
  };

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((item) => item !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({
        grade: selectedGrade || '10',
        interests: selectedInterests.length > 0 ? selectedInterests : ['STEM', 'Programming'],
        goals: selectedGoals.length > 0 ? selectedGoals : [GOALS_LIST[1]],
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div id="onboarding-overlay" className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200"
      >
        
        <div className="bg-slate-900 px-8 py-8 text-white relative text-left">
          <div className="absolute right-6 top-6 bg-white/10 border border-white/20 rounded px-3 py-1 text-xs font-bold font-mono uppercase tracking-wider">
            {language === 'en' ? `Step ${step} of 3` : language === 'kk' ? `${step}-қадам (барлығы 3)` : `Шаг ${step} из 3`}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight uppercase">{translate('onboardWelcome', language)}</h2>
          <p className="text-slate-300 mt-2 text-xs sm:text-sm font-light">
            {translate('onboardDesc', language)}
          </p>
        </div>

        
        <div className="h-1 bg-slate-100 w-full flex">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="p-8">
          
          {step === 1 && (
            <div className="text-left animate-in fade-in duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div id="step-icon-grade" className="p-2 bg-slate-100 text-slate-800 rounded border border-slate-200">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-800 uppercase tracking-tight">
                  {translate('onboardGradeLabel', language)}
                </h3>
              </div>
              <p className="text-slate-500 mb-6 text-xs font-light leading-relaxed">
                {language === 'en'
                  ? 'This helps us filter programs matching your academic level and preparation.'
                  : language === 'kk'
                  ? 'Бұл сіздің жасыңызға және академиялық деңгейіңізге сәйкес келетін іс-шараларды таңдауға көмектеседі.'
                  : 'Это поможет нам отбирать возможности, подходящие именно вашему возрасту и академической подготовке.'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {['8', '9', '10', '11', '12'].map((grade) => (
                  <button
                    key={grade}
                    id={`grade-btn-${grade}`}
                    onClick={() => setSelectedGrade(grade)}
                    type="button"
                    className={`py-4 rounded border-2 text-center text-lg font-bold transition-all relative cursor-pointer ${
                      selectedGrade === grade
                        ? 'border-blue-600 bg-blue-50/20 text-blue-700'
                        : 'border-slate-200 hover:border-slate-350 bg-white text-slate-600'
                    }`}
                  >
                    {grade}
                    {selectedGrade === grade && (
                      <span className="absolute top-2 right-2 bg-blue-650 text-white rounded p-0.5">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                    <span className="block text-[10px] font-bold uppercase text-slate-400 mt-1">
                      {language === 'en' ? 'Grade' : language === 'kk' ? 'Сынып' : 'Класс'}
                    </span>
                  </button>
                ))}

                <button
                  onClick={() => setSelectedGrade('Другой')}
                  id="grade-btn-other"
                  type="button"
                  className={`py-4 rounded border-2 text-center text-lg font-bold transition-all relative cursor-pointer ${
                    selectedGrade === 'Другой'
                      ? 'border-blue-600 bg-blue-50/20 text-blue-700'
                      : 'border-slate-200 hover:border-slate-350 bg-white text-slate-600'
                  }`}
                >
                  {language === 'en' ? 'Other' : language === 'kk' ? 'Басқа' : 'Другой'}
                  {selectedGrade === 'Другой' && (
                    <span className="absolute top-2 right-2 bg-blue-650 text-white rounded p-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                  <span className="block text-[10px] font-bold uppercase text-slate-400 mt-1">
                    {language === 'en' ? 'Level' : language === 'kk' ? 'Деңгей' : 'Уровень'}
                  </span>
                </button>
              </div>
            </div>
          )}

          
          {step === 2 && (
            <div className="text-left animate-in fade-in duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div id="step-icon-interests" className="p-2 bg-slate-100 text-slate-800 rounded border border-slate-200">
                  <Compass className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-800 uppercase tracking-tight">
                  {language === 'en' ? 'Which fields interest you?' : language === 'kk' ? 'Қандай бағыттар сізді қызықтырады?' : 'Какие сферы вас интересуют?'}
                </h3>
              </div>
              <p className="text-slate-500 mb-6 text-xs font-light leading-relaxed">
                {language === 'en'
                  ? 'Select one or more directions. We will personalize your opportunity feed on the home page.'
                  : language === 'kk'
                  ? 'Бір немесе бірнеше бағытты таңдаңыз. Басты бетті сіздің қызығушылықтарыңызға қарай реттейміз.'
                  : 'Выберите одно или несколько направлений. Мы персонализируем ленту возможностей на главной странице.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedInterests.includes(cat.value);
                  return (
                    <button
                      key={cat.value}
                      id={`interest-btn-${cat.value}`}
                      onClick={() => toggleInterest(cat.value)}
                      type="button"
                      className={`flex items-center justify-between p-4 rounded border-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{cat.icon}</span>
                        <div>
                          <p className="font-bold text-slate-855 text-sm">
                            {translateCategory(cat.value, language)}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">
                            {language === 'en' ? 'Extracurricular Trajectory' : language === 'kk' ? 'Сыныптан тыс траектория' : 'Внеклассная траектория'}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${
                          isSelected ? 'bg-blue-600 border-blue-650 text-white' : 'border-slate-350 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          
          {step === 3 && (
            <div className="text-left animate-in fade-in duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div id="step-icon-goals" className="p-2 bg-slate-150 text-slate-800 rounded border border-slate-200">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-850 uppercase tracking-tight">
                  {language === 'en' ? 'What is your main goal?' : language === 'kk' ? 'Сіздің басты мақсатыңыз қандай?' : 'Какова ваша главная цель?'}
                </h3>
              </div>
              <p className="text-slate-500 mb-6 text-xs font-light leading-relaxed">
                {language === 'en'
                  ? 'We will select extracurricular activities that will boost your profile in this direction.'
                  : language === 'kk'
                  ? 'Осы бағытындағы портфолиоңызды күшейтетін сыныптан тыс бағдарламаларды таңдаймыз.'
                  : 'Подберем программы внеклассной деятельности, которые усилят портфолио в этом направлении.'}
              </p>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {GOALS_LIST.map((goal, index) => {
                  const isSelected = selectedGoals.includes(goal);
                  return (
                    <button
                      key={index}
                      id={`goal-btn-${index}`}
                      onClick={() => toggleGoal(goal)}
                      type="button"
                      className={`w-full flex items-center justify-between p-3.5 rounded border-2 text-left transition-all text-xs cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/20 text-blue-900 font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-650 bg-white'
                      }`}
                    >
                      <span className="flex-1 pr-3 font-medium text-slate-850">{goal}</span>
                      <div
                        className={`w-5 h-5 rounded border shrink-0 flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-blue-600 border-blue-650 text-white' : 'border-slate-350 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
            <button
              onClick={handleBack}
              id="onboarding-back-btn"
              type="button"
              className={`px-5 py-2.5 text-slate-450 font-bold uppercase text-xs hover:text-slate-800 transition-colors cursor-pointer ${
                step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              {language === 'en' ? 'Back' : language === 'kk' ? 'Артқа' : 'Назад'}
            </button>
            <button
              onClick={handleNext}
              id="onboarding-next-btn"
              type="button"
              disabled={step === 1 && !selectedGrade}
              className={`flex items-center gap-2 bg-blue-600 text-white font-extrabold shadow-md uppercase tracking-wider text-xs px-6 py-3 rounded hover:bg-blue-700 transition-colors cursor-pointer ${
                step === 1 && !selectedGrade ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {step === 3
                ? (language === 'en' ? 'Complete' : language === 'kk' ? 'Аяқтау' : 'Завершить настройку')
                : (language === 'en' ? 'Continue' : language === 'kk' ? 'Жалғастыру' : 'Продолжить')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
