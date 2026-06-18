
import { Category, OpportunityFormat } from './types';

export type Language = 'ru' | 'en' | 'kk';

export const translations: Record<string, Record<Language, string>> = {
  
  brandName: { ru: 'Mentoria Hub', en: 'Mentoria Hub', kk: 'Mentoria Hub' },
  brandSlogan: { ru: 'Future Academics', en: 'Future Academics', kk: 'Бүгінгі оқушы — ертеңгі маман' },
  
  
  navHome: { ru: 'Главная', en: 'Home', kk: 'Басты бет' },
  navCatalog: { ru: 'Каталог возможностей', en: 'Opportunity Catalog', kk: 'Мүмкіндіктер' },
  navCourses: { ru: 'Курсы Mentoria', en: 'Mentoria Courses', kk: 'Mentoria курстары' },
  navCabinet: { ru: 'Личный кабинет', en: 'My Cabinet', kk: 'Жеке кабинет' },
  navAdmin: { ru: 'Админ-панель', en: 'Admin Panel', kk: 'Админ панелі' },
  
  
  authTitle: { ru: 'Вход в аккаунт', en: 'Sign In', kk: 'Жүйеге кіру' },
  authToggleLogin: { ru: 'Вход', en: 'Sign In', kk: 'Кіру' },
  authToggleRegister: { ru: 'Регистрация', en: 'Sign Up', kk: 'Тіркелу' },
  authLoginHeader: { ru: 'Авторизация в аккаунте', en: 'Log in to your account', kk: 'Аккаунтқа кіру' },
  authRegisterHeader: { ru: 'Создание нового аккаунта', en: 'Create a new account', kk: 'Жаңа аккаунт ашу' },
  authFio: { ru: 'Ваше ФИО', en: 'Your Full Name', kk: 'Толық аты-жөніңіз' },
  authGrade: { ru: 'Академический класс', en: 'Academic Grade', kk: 'Сыныбыңыз' },
  authRole: { ru: 'Желаемая Роль', en: 'Desired Role', kk: 'Қалаған рөліңіз' },
  authInterests: { ru: 'Сферы интересов', en: 'Areas of Interest', kk: 'Қызығушылық салалары' },
  authEmail: { ru: 'Адрес электронной почты (Email)', en: 'Email Address', kk: 'Электрондық пошта (Email)' },
  authPassword: { ru: 'Пароль', en: 'Password', kk: 'Құпия сөз' },
  authFreeMvp: { ru: 'Свободный ввод для MVP', en: 'Any password for MVP', kk: 'MVP үшін кез келген құпия сөз' },
  authSubmitLogin: { ru: 'Вход в Систему', en: 'Log In', kk: 'Жүйеге кіру' },
  authSubmitRegister: { ru: 'Создать Аккаунт и Продолжить', en: 'Create Account & Continue', kk: 'Тіркелу және жалғастыру' },
  authTestAccounts: { ru: 'Заготовленные аккаунты для тестирования:', en: 'Predefined testing accounts:', kk: 'Тестілеуге арналған дайын аккаунттар:' },
  authChoose: { ru: 'Выбрать →', en: 'Choose →', kk: 'Таңдау →' },
  authErrEmail: { ru: 'Пожалуйста, введите ваш Email', en: 'Please enter your email', kk: 'Email поштаңызды енгізіңіз' },
  authErrUserNotFound: { ru: 'Пользователь не найден. Зарегистрируйтесь!', en: 'User not found. Try signing up!', kk: 'Пайдаланушы табылмады. Тіркеліңіз!' },
  authErrFioReq: { ru: 'Пожалуйста, введите ваше имя', en: 'Please enter your name', kk: 'Толық аты-жөніңізді енгізіңіз' },
  authErrEmailReq: { ru: 'Пожалуйста, введите корректный Email', en: 'Please enter a valid email', kk: 'Дұрыс Email енгізіңіз' },
  authErrExists: { ru: 'Пользователь с таким Email уже существует.', en: 'User with this email already exists.', kk: 'Бұл Email тіркелген.' },

  
  roleStudent: { ru: 'Ученик', en: 'Student', kk: 'Оқушы' },
  roleStudentMode: { ru: 'Режим ученика', en: 'Student Mode', kk: 'Оқушы режимі' },
  roleAdmin: { ru: 'Администратор', en: 'Administrator', kk: 'Әкімші' },
  roleSwitchBtn: { ru: 'Переключить роль для тестирования', en: 'Switch role for MVP testing', kk: 'MVP сынау үшін рөлді ауыстыру' },
  roleSwitchMenu: { ru: 'Переключить на', en: 'Switch to', kk: 'Ауысу рөлі:' },
  logout: { ru: 'Выйти из аккаунта', en: 'Sign Out', kk: 'Шығу' },

  
  heroPersonalization: { ru: 'Интеллектуальная персонализация на базе ваших целей', en: 'Smart personalization based on your goals', kk: 'Мақсаттарыңызға негізделген интеллектуалды даралау' },
  heroTitle: { ru: 'Твой хаб возможностей', en: 'Your Hub of Opportunities', kk: 'Мүмкіндіктер' },
  heroTitle2: { ru: 'и асинхронных курсов', en: 'and Async Courses', kk: 'және асинхронды курстар хабы' },
  heroDesc: { ru: 'Mentoria Hub объединяет лучшие стажировки, международные летние лагеря, олимпиады и буткемпы по всему миру с интерактивными учебными программами. Повышайте академический уровень и стройте портфолио в один клик.', en: 'Mentoria Hub brings together the best internships, summer camps, olympiads, and bootcamps globally with interactive programs. Boost your academic level and build a stellar portfolio.', kk: 'Mentoria Hub бүкіл әлем бойынша үздік тағылымдамаларды, халықаралық жазғы лагерьлерді, олимпиадалар мен буткемптерді интерактивті оқу бағдарламаларымен біріктіреді. Академилық деңгейіңізді көтеріп, портфолионы бір нұқумен жасаңыз.' },
  heroBtnOpps: { ru: 'Найти возможности', en: 'Find Opportunities', kk: 'Мүмкіндіктерді табу' },
  heroBtnCourses: { ru: 'Начать обучение', en: 'Start Learning', kk: 'Оқуды бастау' },
  heroBtnJoin: { ru: 'Присоединиться к Mentoria', en: 'Join Mentoria', kk: 'Mentoria-ға қосылу' },
  
  
  statOpps: { ru: 'Проверенных возможностей', en: 'Verified opportunities', kk: 'Тексерілген мүмкіндіктер' },
  statOppsSub: { ru: 'Олимпиады, хакатоны, гранты и лагеря', en: 'Olympiads, hackathons, grants & camps', kk: 'Олимпиадалар, хакатондар, гранттар мен лагерьлер' },
  statProfiles: { ru: 'Учебных профилей', en: 'Learning profiles', kk: 'Әр түрлі бағыттар' },
  statProfilesSub: { ru: 'От биологии до программирования', en: 'From biology to programming', kk: 'Биология мен бағдарламалау аралығында' },
  statInteractive: { ru: 'Интерактивный асинхрон', en: 'Interactive progress', kk: 'Интерактивті асинхрон' },
  statInteractiveSub: { ru: 'Проходите уроки в любое удобное время', en: 'Study at your own comfortable pace', kk: 'Сабақтарды өзіңізге ыңғайлы уақытта оқыңыз' },

  
  conceptOppsTitle: { ru: 'Каталог академических возможностей', en: 'Academic Opportunities Catalog', kk: 'Академиялық мүмкіндіктер каталогы' },
  conceptOppsDesc: { ru: 'Мы собираем актуальные стажировки, международные летние лагеря, олимпиады и эко-проекты, проверяем критерии отбора и помогаем следить за дедлайнами подачи документов.', en: 'We compile relevant internships, summer camps, olympiads, and eco-projects, check selection criteria, and help track application deadlines.', kk: 'Біз өзекті тағылымдамаларды, халықаралық жазғы лагерьлерді, олимпиадалар мен эко-жобаларды жинаймыз, іріктеу критерийлерін тексереміз және дедлайндарды бақылауға көмектесеміз.' },
  conceptOppsP1: { ru: 'Фильтрация по возрасту, формату и дедлайну', en: 'Filter by age, format, and deadline', kk: 'Жас, формат және соңғы мерзім бойы сүзу' },
  conceptOppsP2: { ru: 'Функция добавления в избранное для отслеживания', en: 'Favorite options to monitor deadlines', kk: 'Бақылау үшін таңдаулыға қосу мүмкіндігі' },
  conceptOppsP3: { ru: 'Прямые ссылки на официальные ресурсы подачи', en: 'Direct links to official application resources', kk: 'Ресми өтінім беру порталдарына тікелей сілтемелер' },
  conceptOppsBtn: { ru: 'Перейти в каталог возможностей', en: 'Go to opportunities catalog', kk: 'Мүмкіндіктер каталогына өту' },

  conceptCoursesTitle: { ru: 'Интерактивные микро-курсы', en: 'Interactive Micro-Courses', kk: 'Интерактивті микро-курстар' },
  conceptCoursesDesc: { ru: 'Вместо длинных и скучных лекций мы предлагаем асинхронные мини-курсы, разработанные финалистами международных олимпиад и менторами ведущих вузов.', en: 'Instead of long and boring lectures, we offer asynchronous mini-courses developed by international olympiad finalists and top mentors.', kk: 'Ұзақ әрі іш пыстырарлық лекциялардың орнына біз халықаралық олимпиада финалистері мен жетекші ЖОО менторлары әзірлеген шағын курстарды ұсынамыз.' },
  conceptCoursesP1: { ru: 'Ориентация на практику и подготовку к конкурсам', en: 'Focus on practice and contest preparation', kk: 'Тәжірибеге және конкурстарға дайындалуға бағытталу' },
  conceptCoursesP2: { ru: 'Интерактивные проверочные квизы после уроков', en: 'Interactive tests after each learning unit', kk: 'Әр сабақтан кейінгі интерактивті тексеру квиздері' },
  conceptCoursesP3: { ru: 'Сертификат об окончании курса для вашего CV', en: 'Shareable graduation certificates for your CV', kk: 'Портфолиоңызға арналған бітіру сертификаты' },
  conceptCoursesBtn: { ru: 'Посмотреть каталог курсов', en: 'View course catalog', kk: 'Курстар каталогын көру' },

  
  recsTitle: { ru: 'Персональные рекомендации для вас', en: 'Personal Recommendations for You', kk: 'Сізге арналған жеке ұсынымдар' },
  recsSub: { ru: 'Подобрано на основе вашего профиля класса и интересов', en: 'Tailored using your academic grade and select interests', kk: 'Сыныбыңыз бен қызығушылықтарыңыз негізінде таңдалды' },
  popularCourses: { ru: 'Популярные курсы для старта', en: 'Popular Courses to Get Started', kk: 'Бастауға арналған танымал курстар' },
  
  
  metricOpps: { ru: 'Доступно Программ', en: 'Programs Available', kk: 'Қолжетімді бағдарламалар' },
  metricSaved: { ru: 'Сохранено', en: 'Saved Programs', kk: 'Сақталғандар' },
  metricClass: { ru: 'Класс Профиля', en: 'Current Grade', kk: 'Ағымдағы сынып' },
  metricEnrolled: { ru: 'Активные Курсы', en: 'Active Courses', kk: 'Белсенді курстар' },

  
  cardFormat: { ru: 'Формат:', en: 'Format:', kk: 'Форматы:' },
  cardDeadline: { ru: 'Дедлайн:', en: 'Deadline:', kk: 'Соңғы мерзімі:' },
  cardOrg: { ru: 'Организатор:', en: 'Organizer:', kk: 'Ұйымдастырушы:' },
  cardGrade: { ru: 'Классы:', en: 'Grades:', kk: 'Сыныптар:' },
  cardReqs: { ru: 'Требования:', en: 'Requirements:', kk: 'Талаптар:' },
  cardInSaved: { ru: 'В избранном', en: 'Saved', kk: 'Сақталған' },
  cardSave: { ru: 'В избранное', en: 'Save', kk: 'Сақтау' },
  cardVisit: { ru: 'Перейти на сайт', en: 'Visit website', kk: 'Ресми сайтқа өту' },
  
  
  filterAll: { ru: 'Все направления', en: 'All Categories', kk: 'Барлық бағыттар' },
  filterFormat: { ru: 'Формат', en: 'Format', kk: 'Формат' },
  filterDeadline: { ru: 'Сортировка дедлайна', en: 'Sort by deadline', kk: 'Дедлайн бойынша сұрыптау' },
  sortSoonest: { ru: 'Сначала ближайшие', en: 'Closest deadline first', kk: 'Ең жақын дедлайн бірінші' },
  sortLatest: { ru: 'Сначала поздние', en: 'Furthest deadline first', kk: 'Дедлайн уақыты кейінірек' },
  noOppsFound: { ru: 'К сожалению, возможностей по выбранным фильтрам не найдено.', en: 'No opportunities found matching these filters.', kk: 'Өкінішке орай, таңдалған фильтрлер бойынша ештеңе табылмады.' },
  btnResetFilter: { ru: 'Сбросить фильтры', en: 'Reset filters', kk: 'Сүзгілерді тазарту' },
  searchPlaceholder: { ru: 'Поиск по названию или описанию...', en: 'Search title or description...', kk: 'Тақырыбы немесе сипаттамасы бойынша іздеу...' },
  gradeLabel: { ru: 'Фильтр классов', en: 'Grade Filter', kk: 'Сыныптар сүзгісі' },

  
  cabProfileTitle: { ru: 'Академический Профиль', en: 'Academic Profile', kk: 'Академиялық профиль' },
  cabProfileDesc: { ru: 'Управляйте своими предпочтениями, чтобы алгоритмы точнее подбирали олимпиады, конкурсы и программы обучения.', en: 'Manage your settings to allow algorithms to suggest better matches for contests and research programs.', kk: 'Олимпиадалар мен оқу бағдарламаларын дәлірек сәйкестендіру үшін параметрлерді басқарыңыз.' },
  cabEditProfile: { ru: 'Редактировать Профиль', en: 'Edit Profile', kk: 'Профильді өңдеу' },
  cabSaveProfile: { ru: 'Сохранить Изменения', en: 'Save Changes', kk: 'Өзгерістерді сақтау' },
  cabFullFio: { ru: 'Полное Имя', en: 'Full Name', kk: 'Толық аты-жөніңіз' },
  cabSettings: { ru: 'Настройки Системы', en: 'System Settings', kk: 'Жүйелік параметрлер' },
  cabResetPref: { ru: 'Сбросить все данные', en: 'Full Reset (Data & enrollments)', kk: 'Барлық деректерді өшіру' },
  cabResetWarning: { ru: 'Внимание: это вернет вас на начальный экран приветствия.', en: 'Warning: this will return you to the onboarding wizard.', kk: 'Ескерту: бұл барлық прогрессті өшіріп, сізді бастапқы онбордингке қайтарады.' },
  cabSavedOpportunities: { ru: 'Мои Сохраненные Возможности', en: 'My Saved Opportunities', kk: 'Сақталған іс-шараларым' },
  cabSavedOppsDesc: { ru: 'Возможности, за которыми вы следите. Следите за приближающимися дедлайнами!', en: 'Programs you are actively watching. Keep an eye on deadlines!', kk: 'Сіз бақылап отырған мүмкіндіктер. Дедлайндарды бақылауда ұстаңыз!' },
  cabNoSaved: { ru: 'Вы еще не сохранили ни одной возможности. Перейдите в каталог возможностей и нажмите на иконку закладки!', en: 'You have not saved any programs yet. Visit the catalog and tap the bookmark icon!', kk: 'Сіз әлі ешқандай мүмкіндікті сақтамадыңыз. Каталогқа өтіп, бетбелгі белгісін басыңыз!' },
  cabGoToCatalog: { ru: 'Перейти в каталог', en: 'Explore opportunities', kk: 'Каталогқа өту' },
  cabMyCourses: { ru: 'Мое Обучение', en: 'My Course Progress', kk: 'Оқу прогресім' },
  cabNoCourses: { ru: 'Вы еще не записаны ни на один курс. Самое время начать обучение в разделе "Курсы Mentoria"!', en: 'You are not enrolled in any courses yet. Start your learning journey in the Courses tab!', kk: 'Сіз әлі ешбір курсқа жазылмадыңыз. Курстар бөліміне өтіп, білім алуды бастаңыз!' },
  cabProgress: { ru: 'Прогресс:', en: 'Progress:', kk: 'Прогресс:' },
  cabContinueCourse: { ru: 'Продолжить Обучение', en: 'Continue Learning', kk: 'Оқуды жалғастыру' },

  
  courseHeaderTitle: { ru: 'Интерактивные микро-курсы', en: 'Interactive Micro-Courses', kk: 'Интерактивті микро-курстар' },
  courseHeaderDesc: { ru: 'Осваивайте передовые темы микро-порциями. Каждый курс содержит структурированные уроки, видеоматериалы и практические квизы для проверки понимания.', en: 'Master advanced topics step-by-step. Each curriculum features modular lessons, video snippets, and auto-graded quizzes.', kk: 'Білімді шағын сабақтармен меңгеріңіз. Әр курс құрылымдалған сабақтарды, видеоларды және тәжірибелік квиздерді қамтиды.' },
  courseDifficulty: { ru: 'Сложность:', en: 'Difficulty:', kk: 'Күрделілігі:' },
  courseDiffEasy: { ru: 'Легкий', en: 'Beginner', kk: 'Жеңіл' },
  courseDiffMedium: { ru: 'Средний', en: 'Intermediate', kk: 'Орташа' },
  courseDiffHard: { ru: 'Продвинутый', en: 'Advanced', kk: 'Жоғары' },
  courseLessonsIn: { ru: 'уроков в курсе', en: 'lessons in course', kk: 'сабақ бар' },
  courseBackList: { ru: 'Вернуться к списку курсов', en: 'Return to course list', kk: 'Курстар тізіміне оралу' },
  courseLessonsHeader: { ru: 'Программа Обучения', en: 'Curriculum Roadmap', kk: 'Курс жоспары' },
  courseCompletedBadge: { ru: 'Завершено!', en: 'Completed!', kk: 'Аяқталды!' },
  courseLockedBadge: { ru: 'Урок заблокирован', en: 'Lesson locked', kk: 'Жабық сабақ' },
  courseNextLessonBtn: { ru: 'Начать следующий урок', en: 'Start next lesson', kk: 'Келесі сабаққа өту' },
  courseQuizHeader: { ru: 'Проверочный Квиз к уроку', en: 'Unit Practice Quiz', kk: 'Сабақ бойынша тексеру квизі' },
  courseQuizDesc: { ru: 'Правильный ответ разблокирует следующий урок и дополнит вашу шкалу прогресса!', en: 'Correct answer unlocks the next lesson and advances your course tracker!', kk: 'Дұрыс жауап келесі сабақты ашады және прогресіңізді арттырады!' },
  courseQuizIncorrect: { ru: 'Неправильно. Пожалуйста, перечитайте лекционный материал выше и попробуйте еще раз!', en: 'Incorrect. Please review the lecture material above and choose another answer!', kk: 'Қате. Жоғарыдағы дәріс материалын қайта оқып, тағы көріңіз!' },
  courseQuizSuccessAll: { ru: 'Поздравляем! Весь курс полностью пройден!', en: 'Congratulations! You have successfully completed this entire course!', kk: 'Құттықтаймыз! Сіз бүкіл курсты толық бітірдіңіз!' },
  courseCertificateTitle: { ru: 'Почетный Сертификат', en: 'Certificate of Excellence', kk: 'Құрметті Сертификат' },
  courseCertificateDesc: { ru: 'Настоящим подтверждается, что ученик успешно завершил весь учебный объем курса по направлению', en: 'This certifies that the student has completed the academic framework of the course in the field of', kk: 'Осы сертификат иесі аталған бағыттағы курстың оқу көлемін сәтті аяқтағанын растайды:' },
  courseQuizPlaceholder: { ru: 'Ответ:', en: 'Answer:', kk: 'Жауабыңыз:' },
  courseQuizCheckBtn: { ru: 'Проверить ответ', en: 'Check Answer', kk: 'Жауапты тексеру' },

  
  adminHeaderTitle: { ru: 'Панель Управления Проектом', en: 'Project Design Center', kk: 'Басқару панелі' },
  adminHeaderDesc: { ru: 'Добавляйте новые программы в каталог дедлайнов в реальном времени. Все изменения мгновенно синхронизируются у всех пользователей MVP.', en: 'Publish new programs to the listing in real-time. Changes sync instantly across the active user database.', kk: 'Жаңа іс-шараларды нақты уақыт режимінде қосыңыз. Өзгерістер MVP пайдаланушыларында жүйеде бірден синхрондалады.' },
  adminCreateTab: { ru: 'Создать Муршрут', en: 'Create Route', kk: 'Бағыт қосу' },
  adminUsersTab: { ru: 'Пользователи MVP', en: 'MVP User Directory', kk: 'Пайдаланушылар' },
  adminAddSuccess: { ru: 'Возможность успешно создана и добавлена в каталог!', en: 'Opportunity successfully submitted to the global catalog!', kk: 'Мүмкіндік сәтті құрылып, каталогқа қосылды!' },
  adminFormTitle: { ru: 'Название Программы', en: 'Program Title', kk: 'Бағдарлама атауы' },
  adminFormCategory: { ru: 'Сфера', en: 'Category', kk: 'Саласы' },
  adminFormFormat: { ru: 'Формат Участия', en: 'Event Format', kk: 'Қатысу форматы' },
  adminFormDeadline: { ru: 'Срок подачи документов (Дедлайн)', en: 'Application Deadline', kk: 'Дедлайн мерзімі' },
  adminFormGrades: { ru: 'Целевые Классы учеников (через запятую)', en: 'Target Grades (comma separated)', kk: 'Мақсатты сыныптар (үтір арқылы)' },
  adminFormOrg: { ru: 'Организация-спонсор', en: 'Sponsor Organization', kk: 'Ұйымдастырушы серіктес' },
  adminFormDesc: { ru: 'Полное описание условий', en: 'Complete Program Description', kk: 'Шолу сипаттамасы' },
  adminFormReqs: { ru: 'Основные Критерии Отбора', en: 'Core Eligibility Criteria', kk: 'Іріктеу критерийлері' },
  adminFormSubmit: { ru: 'Опубликовать Возможность', en: 'Publish to Catalog', kk: 'Каталогта жариялау' },

  
  onboardWelcome: { ru: 'Добро пожаловать в Mentoria Hub!', en: 'Welcome to Mentoria Hub!', kk: 'Mentoria Hub-қа қош келдіңіз!' },
  onboardDesc: { ru: 'Укажите свои интересы и класс обучения, чтобы мы составили для вас персональную ленту олимпиад, летних школ и учебных курсов.', en: 'Specify your academic grade and core interests so we can design a personalized feed of contests and micro-courses.', kk: 'Олимпиадалар мен лагерьлер лентасын жеке баптау ұсынылу үшін сыныбыңызды және қызығушылығыңызды таңдаңыз.' },
  onboardGradeLabel: { ru: 'В каком классе вы учитесь?', en: 'What grade are you currently in?', kk: 'Қай сыныпта оқисыз?' },
  onboardInterestsLabel: { ru: 'Выберите ваши академические интересы:', en: 'Choose your academic areas of interest:', kk: 'Академиялық қызығушылықтарыңызды таңдаңыз:' },
  onboardGoalsLabel: { ru: 'Что является вашей главной целью?', en: 'What is your primary academic goal?', kk: 'Сіздің басты мақсатыңыз қандай?' },
  onboardFinishBtn: { ru: 'Завершить настройку и войти', en: 'Save & Join Dashboard', kk: 'Баптауды аяқтау және кіру' },

  
  notif1: { ru: ' Появилось новое STEM соревнование по вашему интересу!', en: ' New STEM event was matched to your academic portfolio!', kk: ' Сізді қызықтыратын жаңа STEM олимпиадасы қосылды!' },
  notif2: { ru: ' Вы записались на курс "Введение в Экономику"', en: ' You successfully enrolled in "Into to Economics" Micro-Course', kk: ' Сіз "Экономикаға кіріспе" курсына жазылдыңыз' },
  notifEmpty: { ru: 'Нет новых уведомлений', en: 'No new alerts', kk: 'Жаңа хабарландырулар жоқ' },
};

export const formatTranslations: Record<OpportunityFormat, Record<Language, string>> = {
  'Online': {
    ru: 'Онлайн',
    en: 'Online',
    kk: 'Онлайн'
  },
  'Offline': {
    ru: 'Офлайн (Очно)',
    en: 'Offline (In-person)',
    kk: 'Офлайн (Бетпе-бет)'
  },
  'Hybrid': {
    ru: 'Гибридный',
    en: 'Hybrid',
    kk: 'Гибридті'
  }
};

export const categoryTranslations: Record<Category, Record<Language, string>> = {
  'STEM': {
    ru: 'STEM (Инженерия и Мат)',
    en: 'STEM',
    kk: 'STEM (Инженерия мен Мат)'
  },
  'Programming': {
    ru: 'Программирование',
    en: 'Programming',
    kk: 'Бағдарламалау'
  },
  'Business': {
    ru: 'Предпринимательство',
    en: 'Business & Management',
    kk: 'Бизнес және Стартап'
  },
  'Social Impact': {
    ru: 'Социальные проекты',
    en: 'Social Impact',
    kk: 'Әлеуметтік бастамалар'
  },
  'Finance': {
    ru: 'Экономика и Финансы',
    en: 'Finance & Economics',
    kk: 'Қаржы және Экономика'
  },
  'Science': {
    ru: 'Естественные науки',
    en: 'Natural Sciences',
    kk: 'Жаратылыстану ғылымдары'
  },
  'Arts & Humanities': {
    ru: 'Искусство и Гуманитарные',
    en: 'Arts & Humanities',
    kk: 'Өнер және Гуманитарлық'
  }
};

export function translate(key: keyof typeof translations, lang: Language): string {
  if (translations[key]) {
    return translations[key][lang];
  }
  return key;
}

export function translateCategory(cat: Category, lang: Language): string {
  if (categoryTranslations[cat]) {
    return categoryTranslations[cat][lang];
  }
  return cat;
}

export function translateFormat(fmt: OpportunityFormat, lang: Language): string {
  if (formatTranslations[fmt]) {
    return formatTranslations[fmt][lang];
  }
  return fmt;
}

export function translateGrade(grade: string, lang: Language): string {
  if (lang === 'en') {
    return `${grade}th Grade`;
  }
  if (lang === 'kk') {
    return `${grade}-сынып`;
  }
  return `${grade} класс`;
}

export function translateDifficulty(diff: 'Легкий' | 'Средний' | 'Продвинутый', lang: Language): string {
  const map = {
    'Легкий': { ru: 'Легкий', en: 'Beginner', kk: 'Жеңіл' },
    'Средний': { ru: 'Средний', en: 'Intermediate', kk: 'Орташа' },
    'Продвинутый': { ru: 'Продвинутый', en: 'Advanced', kk: 'Продвинутый' }
  };
  return map[diff] ? map[diff][lang] : diff;
}
