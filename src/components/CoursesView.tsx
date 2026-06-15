import React, { useState } from 'react';
import { Play, CheckCircle, ArrowLeft, ArrowRight, Clipboard, Award, FileText, Check, AlertCircle } from 'lucide-react';
import { Course, EnrollmentState } from '../types';

interface CoursesViewProps {
  courses: Course[];
  enrollments: EnrollmentState[];
  onEnroll: (courseId: string) => void;
  onCompleteLesson: (courseId: string, lessonId: string) => void;
  onSaveQuizAnswer: (courseId: string, lessonId: string, answerIndex: number) => void;
  savedOpportunitiesCount: number;
}

export default function CoursesView({
  courses,
  enrollments,
  onEnroll,
  onCompleteLesson,
  onSaveQuizAnswer,
  savedOpportunitiesCount
}: CoursesViewProps) {
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const activeCourse = courses.find((c) => c.id === activeCourseId);
  const activeEnrollment = enrollments.find((e) => e.courseId === activeCourseId);
  const activeLesson = activeCourse?.lessons.find((l) => l.id === activeLessonId);

  const getCourseProgress = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    const enrollment = enrollments.find((e) => e.courseId === courseId);
    if (!course || !enrollment) return 0;
    if (course.lessons.length === 0) return 0;
    return Math.round((enrollment.completedLessons.length / course.lessons.length) * 100);
  };

  const handleStartCourse = (course: Course) => {
    if (!enrollments.some((e) => e.courseId === course.id)) {
      onEnroll(course.id);
    }
    setActiveCourseId(course.id);
    setActiveLessonId(course.lessons[0]?.id || null);
    setSelectedQuizIndex(null);
    setQuizSubmitted(false);
    setIsVideoPlaying(false);
  };

  const handleLessonClick = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setSelectedQuizIndex(null);
    setQuizSubmitted(false);
    setIsVideoPlaying(false);
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedQuizIndex !== null && activeCourseId && activeLessonId && activeLesson?.quiz) {
      onSaveQuizAnswer(activeCourseId, activeLessonId, selectedQuizIndex);
      setQuizSubmitted(true);

      if (selectedQuizIndex === activeLesson.quiz.correctAnswerIndex) {
        onCompleteLesson(activeCourseId, activeLessonId);
      }
    }
  };

  const currentLessonIndex = activeCourse?.lessons.findIndex((l) => l.id === activeLessonId) ?? -1;

  const navigateLesson = (direction: 'prev' | 'next') => {
    if (!activeCourse || currentLessonIndex === -1) return;
    const nextIndex = direction === 'next' ? currentLessonIndex + 1 : currentLessonIndex - 1;
    if (nextIndex >= 0 && nextIndex < activeCourse.lessons.length) {
      const nextLesson = activeCourse.lessons[nextIndex];
      handleLessonClick(nextLesson.id);
    }
  };

  if (!activeCourse || !activeLesson) {
    return (
      <div id="courses-catalog-container" className="space-y-8 font-sans">
        <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-8 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4 text-left">
            <span className="bg-blue-550/20 text-blue-300 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded border border-blue-500/20">
              Электронное обучение
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-sans tracking-tight uppercase">Асинхронные курсы Mentoria</h2>
            <p className="text-slate-300 text-sm max-w-xl font-light">
              Изучайте ключевые академические дисциплины в своем темпе. Закрепляйте знания с помощью тестов и получайте приглашения на гранты!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {courses.map((course) => {
            const isEnrolled = enrollments.some((e) => e.courseId === course.id);
            const progress = getCourseProgress(course.id);
            const difficultyBadge = 
              course.difficulty === 'Легкий' ? 'bg-green-50 text-green-700 border-green-150' :
              course.difficulty === 'Средний' ? 'bg-amber-50 text-amber-750 border-amber-150' :
              'bg-rose-50 text-rose-700 border-rose-150';

            return (
              <div
                key={course.id}
                id={`course-card-${course.id}`}
                className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl rounded-xl overflow-hidden transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-40 bg-slate-900 relative flex items-center justify-center p-4">
                    {course.imageUrl ? (
                      <img 
                        src={course.imageUrl} 
                        alt={course.title} 
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover opacity-45" 
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-blue-900 opacity-60" />
                    )}
                    <span className="relative text-white font-extrabold text-xs tracking-wider uppercase font-sans z-10 bg-slate-950/70 p-2 rounded">
                      {course.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <div className="flex gap-2 items-center mb-2.5 flex-wrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border inline-block ${difficultyBadge}`}>
                          {course.difficulty}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono font-medium">
                           {course.duration}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-slate-800 text-lg leading-snug line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-slate-500 text-xs mt-2 line-clamp-3 leading-relaxed font-light">
                        {course.description}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Программа содержит:</p>
                      <div className="space-y-1">
                        {course.lessons.slice(0, 3).map((les, index) => (
                          <div key={les.id} className="text-slate-650 text-xs truncate flex items-center gap-1.5 font-light">
                            <span className="text-slate-400 font-mono text-[10px]">0{index + 1}.</span>
                            {les.title}
                          </div>
                        ))}
                        {course.lessons.length > 3 && (
                          <p className="text-[10px] text-blue-600 font-bold italic">и еще {course.lessons.length - 3} уроков...</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-4 border-t border-slate-100 space-y-4">
                  {isEnrolled && (
                    <div className="space-y-1.5">
                      <div className="flex text-[10px] font-bold text-slate-500 justify-between">
                        <span>Прогресс обучения</span>
                        <span className="text-blue-700 font-mono">{progress}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded w-full overflow-hidden">
                        <div className="bg-blue-600 h-full transition-all" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => handleStartCourse(course)}
                    className={`w-full py-3.5 rounded-lg text-xs font-bold transition-all inline-flex items-center justify-center gap-2 cursor-pointer ${
                      isEnrolled
                        ? 'bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 shadow-sm'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10'
                    }`}
                  >
                    <Play className="w-4 h-4 fill-current shrink-0" />
                    {isEnrolled ? 'Продолжить обучение' : 'Начать обучение бесплатно'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const isLessonCompleted = activeEnrollment?.completedLessons.includes(activeLesson.id) ?? false;
  const currentScore = activeEnrollment?.completedLessons.length ?? 0;
  const totalLessons = activeCourse.lessons.length;

  return (
    <div id="active-courses-classroom" className="space-y-6 font-sans">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between text-left">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              setActiveCourseId(null);
              setActiveLessonId(null);
            }}
            id="classroom-exit-btn"
            className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-lg transition-colors shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Асинхронный кабинет Mentoria</span>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-800 truncate max-w-sm sm:max-w-md leading-tight uppercase tracking-tight">
              {activeCourse.title}
            </h2>
          </div>
        </div>

        <div className="w-full sm:w-64 space-y-1.5 shrink-0">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500">
            <span>Пройдено уроков: {currentScore} / {totalLessons}</span>
            <span className="text-blue-700 font-mono">{getCourseProgress(activeCourse.id)}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded w-full overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${getCourseProgress(activeCourse.id)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
        <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-200 bg-slate-50">
            <h3 className="font-extrabold text-slate-800 text-xs flex items-center gap-2 uppercase tracking-wide">
              <Clipboard className="w-4 h-4 text-blue-600" />
              План обучения
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 font-light">Выполняйте задания для перехода к следующим темам</p>
          </div>

          <div className="divide-y divide-slate-150">
            {activeCourse.lessons.map((les, index) => {
              const matchesActive = les.id === activeLesson.id;
              const completed = activeEnrollment?.completedLessons.includes(les.id);
              return (
                <button
                  key={les.id}
                  id={`les-sub-nav-${les.id}`}
                  onClick={() => handleLessonClick(les.id)}
                  type="button"
                  className={`w-full text-left p-4 transition-all flex items-start gap-3.5 hover:bg-slate-50 cursor-pointer ${
                    matchesActive ? 'bg-blue-50/40 text-blue-950 font-bold border-l-4 border-blue-650' : 'text-slate-600'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded shrink-0 flex items-center justify-center font-bold text-xs ${
                      completed
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : matchesActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {completed ? <Check className="w-3.5 h-3.5" /> : index + 1}
                  </div>
                  <div className="flex-1 space-y-0.5 whitespace-normal">
                    <p className={`text-xs ${matchesActive ? 'font-bold' : 'font-medium'} line-clamp-2 leading-snug`}>
                      {les.title}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono font-medium">{les.duration}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight uppercase tracking-tight">
              {activeLesson.title}
            </h1>

            <div
              className="rounded-lg h-64 relative flex flex-col items-center justify-center text-center p-6 text-white overflow-hidden group shadow-inner border border-slate-900/10"
              style={{ background: activeLesson.videoPlaceholder }}
            >
              <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] transition-all" />
              
              {isVideoPlaying ? (
                <div className="relative z-10 text-center space-y-4 max-w-sm">
                  <div id="rec-recording-icon" className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <span className="w-3.5 h-3.5 bg-red-500 rounded-full" />
                  </div>
                  <p className="text-sm font-bold tracking-tight">Academic Lecture playing...</p>
                  <p className="text-xs text-blue-100 font-light leading-relaxed">
                    «Добро пожаловать на лекцию Mentoria. В этом видео мы разберем ключевые аспекты темы и перейдем к решению кейса...»
                  </p>
                  <button
                    onClick={() => setIsVideoPlaying(false)}
                    className="px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded text-xs font-semibold backdrop-blur-sm cursor-pointer"
                  >
                    Поставить на паузу
                  </button>
                </div>
              ) : (
                <div className="relative z-10 space-y-3">
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    id="video-play-btn"
                    className="w-16 h-16 bg-white/95 rounded flex items-center justify-center text-slate-950 shadow-xl hover:scale-105 active:scale-95 transition-transform mx-auto cursor-pointer"
                  >
                    <Play className="w-6 h-6 fill-current pl-1 text-slate-800" />
                  </button>
                  <p className="font-extrabold text-sm font-sans tracking-wide uppercase">Смотреть видео-презентацию уроков</p>
                  <p className="text-[10px] text-blue-150 font-bold font-mono tracking-wider bg-black/35 px-2.5 py-1 rounded inline-block uppercase">
                    Асинхронный лекторий Mentoria • {activeLesson.duration}
                  </p>
                </div>
              )}
            </div>

            <div className="prose max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-200 pt-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-blue-650" />
                <span className="font-extrabold text-slate-800 uppercase tracking-wider text-[10px] font-mono">Конспект по теме урока:</span>
              </div>
              <div 
                className="p-5 bg-slate-50 border border-slate-200 rounded-lg font-sans"
                style={{ whiteSpace: 'pre-line' }}
              >
                {activeLesson.content}
              </div>
            </div>

            {activeLesson.quiz && (
              <div className="border-t border-slate-200 pt-8 mt-8 space-y-4 text-left">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                  <Award className="w-4.5 h-4.5" />
                  <span>Мини-тест урока для автопроверки</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    {activeLesson.quiz.question}
                  </h4>

                  <form onSubmit={handleQuizSubmit} className="space-y-2 pt-2 text-xs font-sans">
                    {activeLesson.quiz.options.map((opt, oIdx) => {
                      const isCorrectAnswer = oIdx === activeLesson.quiz?.correctAnswerIndex;
                      const hasSelectedThis = activeEnrollment?.quizAnswers[activeLesson.id] === oIdx || selectedQuizIndex === oIdx;
                      
                      let optionBg = 'bg-white border-slate-200 hover:border-slate-355';
                      
                      if (quizSubmitted) {
                        if (isCorrectAnswer) {
                          optionBg = 'bg-green-50 border-green-300 text-green-950 font-medium';
                        } else if (hasSelectedThis) {
                          optionBg = 'bg-red-50 border-red-200 text-red-950';
                        } else {
                          optionBg = 'bg-white border-slate-100 opacity-60';
                        }
                      } else if (selectedQuizIndex === oIdx) {
                        optionBg = 'bg-blue-50 border-blue-400 text-blue-950 font-semibold';
                      }

                      return (
                        <label
                          key={oIdx}
                          className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer ${optionBg}`}
                        >
                          <span className="pr-3 leading-relaxed">{opt}</span>
                          <input
                            type="radio"
                            name="quiz-answer"
                            value={oIdx}
                            disabled={quizSubmitted}
                            checked={selectedQuizIndex === oIdx || activeEnrollment?.quizAnswers[activeLesson.id] === oIdx}
                            onChange={() => setSelectedQuizIndex(oIdx)}
                            className="text-blue-650 outline-none w-4 h-4 shrink-0 focus:ring-none accent-blue-600 cursor-pointer"
                          />
                        </label>
                      );
                    })}

                    {!quizSubmitted ? (
                      <div className="pt-3 flex justify-end">
                        <button
                          type="submit"
                          disabled={selectedQuizIndex === null}
                          className={`px-6 py-3 font-bold text-xs uppercase rounded-lg transition-all cursor-pointer ${
                            selectedQuizIndex === null
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md active:scale-95'
                          }`}
                        >
                          Проверить ответ и завершить урок
                        </button>
                      </div>
                    ) : (
                      <div className="pt-3 font-sans text-xs">
                        {selectedQuizIndex === activeLesson.quiz.correctAnswerIndex ? (
                          <div id="quiz-feedback-success" className="flex items-start gap-2 bg-green-50 text-green-800 p-4 rounded-lg border border-green-200">
                            <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-bold text-sm">Правильно! Поздравляем!</p>
                                <p className="text-[11px] leading-normal pt-1 text-green-700 font-light">
                                  Вы верно усвоили учебный материал. Урок завершен и добавлен в ваш личный профиль ученика.
                                </p>
                            </div>
                          </div>
                        ) : (
                          <div id="quiz-feedback-error" className="space-y-2">
                            <div className="flex items-start gap-2 bg-red-50 text-red-800 p-4 rounded-lg border border-red-200">
                              <AlertCircle className="w-5 h-5 text-red-655 shrink-0 mt-0.5" />
                              <div>
                                <p className="font-bold text-sm">Ответ неверный</p>
                                <p className="text-[11px] leading-normal pt-1 text-red-700 font-light">
                                  Вы можете перерешать задание, выбрав другой вариант, чтобы правильно завершить тему.
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => {
                                  setQuizSubmitted(false);
                                  setSelectedQuizIndex(null);
                                }}
                                className="px-5 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-105 rounded-lg text-[11px] font-bold cursor-pointer"
                              >
                                Попробовать еще раз
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-8 text-xs font-bold">
              <button
                onClick={() => {
                  setActiveCourseId(null);
                  setActiveLessonId(null);
                }}
                className="px-4 py-2 border border-slate-200 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Вернуться к курсам
              </button>

              <div id="classroom-next-prev-ctrls" className="flex items-center gap-2">
                <button
                  onClick={() => navigateLesson('prev')}
                  disabled={currentLessonIndex === 0}
                  className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateLesson('next')}
                  disabled={currentLessonIndex === activeCourse.lessons.length - 1}
                  className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}