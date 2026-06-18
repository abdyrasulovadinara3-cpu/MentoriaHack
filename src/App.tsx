import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, Opportunity, Course, EnrollmentState } from './types';
import { INITIAL_COURSES, INITIAL_OPPORTUNITIES } from './mockData';
import { Language } from './localization';


import Onboarding from './components/Onboarding';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import CatalogView from './components/CatalogView';
import CoursesView from './components/CoursesView';
import CabinetView from './components/CabinetView';
import AdminView from './components/AdminView';
import AuthView from './components/AuthView';

export default function App() {
  
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('mentoria_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {
      name: 'Адиль Каримов',
      email: 'adil@example.com',
      grade: '10',
      interests: ['STEM', 'Programming', 'Business'],
      goals: [
        'Поступление в зарубежный вуз (США, Европа, Азия)',
        'Изучение программирования с нуля и участие в хакатонах'
      ],
      hasOnboarded: true,
      role: 'student'
    };
  });

  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const saved = localStorage.getItem('mentoria_opportunities');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_OPPORTUNITIES.length) {
          return parsed;
        }
      } catch (e) 
    } 
    return INITIAL_OPPORTUNITIES;
  }); 
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('mentoria_courses');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) 
    }
    return INITIAL_COURSES;
  });

  const [savedOpportunities, setSavedOpportunities] = useState<string[]>(() => {
    const saved = localStorage.getItem('mentoria_saved_opportunities');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) 
    }
    return ['opp-1']; // bookmark first opportunity as preview
  });

  const [enrollments, setEnrollments] = useState<EnrollmentState[]>(() => {
    const saved = localStorage.getItem('mentoria_enrollments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) 
    }
    
    return [
      {
        courseId: 'course-1',
        completedLessons: ['c1-l1'],
        quizAnswers: { 'c1-l1': 1 }
      }
    ];
  });

  const [currentTab, setCurrentTab] = useState<string>('home');
  
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const savedStatus = localStorage.getItem('mentoria_is_logged_in');
    return savedStatus === 'true';
  });

  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('mentoria_language');
    return (saved as Language) || 'ru';
  });

  
  useEffect(() => {
    localStorage.setItem('mentoria_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('mentoria_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('mentoria_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem('mentoria_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('mentoria_saved_opportunities', JSON.stringify(savedOpportunities));
  }, [savedOpportunities]);

  useEffect(() => {
    localStorage.setItem('mentoria_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  
  const handleOnboardingComplete = (preferences: Omit<UserProfile, 'name' | 'email' | 'role' | 'hasOnboarded'>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...preferences,
      hasOnboarded: true
    }));
    setCurrentTab('home');
  };

  const toggleSaveOpportunity = (id: string) => {
    if (savedOpportunities.includes(id)) {
      setSavedOpportunities(savedOpportunities.filter((item) => item !== id));
    } else {
      setSavedOpportunities([...savedOpportunities, id]);
    }
  };

  const handleEnrollInCourse = (courseId: string) => {
    if (!enrollments.some((e) => e.courseId === courseId)) {
      const newEnrollment: EnrollmentState = {
        courseId,
        completedLessons: [],
        quizAnswers: {}
      };
      setEnrollments([...enrollments, newEnrollment]);
    }
  };

  const handleCompleteLesson = (courseId: string, lessonId: string) => {
    setEnrollments((prev) =>
      prev.map((e) => {
        if (e.courseId === courseId) {
          const completedList = e.completedLessons.includes(lessonId)
            ? e.completedLessons
            : [...e.completedLessons, lessonId];
          return {
            ...e,
            completedLessons: completedList
          };
        }
        return e;
      })
    );
  };

  const handleSaveQuizAnswer = (courseId: string, lessonId: string, answerIndex: number) => {
    setEnrollments((prev) =>
      prev.map((e) => {
        if (e.courseId === courseId) {
          return {
            ...e,
            quizAnswers: {
              ...e.quizAnswers,
              [lessonId]: answerIndex
            }
          };
        }
        return e;
      })
    );
  };

  
  const toggleRole = () => {
    setUserProfile((prev) => {
      const newRole = prev.role === 'student' ? 'admin' : 'student';
      
      if (newRole === 'admin') {
        setCurrentTab('admin');
      } else {
        setCurrentTab('home');
      }
      return {
        ...prev,
        role: newRole
      };
    });
  };

  
  const handleResetPreferences = () => {
    setUserProfile((prev) => ({
      ...prev,
      hasOnboarded: false
    }));
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updated
    }));
  };

  const handleOpenCourse = (courseId: string) => {
    setCurrentTab('courses');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('mentoria_is_logged_in', 'false');
    setCurrentTab('home');
  };

  if (!isLoggedIn) {
    return (
      <AuthView
        onLoginSuccess={(profile) => {
          setUserProfile(profile);
          setIsLoggedIn(true);
          localStorage.setItem('mentoria_is_logged_in', 'true');
        }}
        language={language}
        onLanguageChange={setLanguage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased pb-20 md:pb-0">
      
      
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userProfile={userProfile}
        toggleRole={toggleRole}
        onResetPreferences={handleResetPreferences}
        onLogout={handleLogout}
        language={language}
        onLanguageChange={setLanguage}
      />

      
      <AnimatePresence>
        {!userProfile.hasOnboarded && (
          <Onboarding
            onComplete={handleOnboardingComplete}
            language={language}
          />
        )}
      </AnimatePresence>

      
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            id={`tab-container-${currentTab}`}
          >
            {currentTab === 'home' && (
              <HomeView
                userProfile={userProfile}
                opportunities={opportunities}
                courses={courses}
                savedOpportunities={savedOpportunities}
                toggleSaveOpportunity={toggleSaveOpportunity}
                setCurrentTab={setCurrentTab}
                enrollInCourse={handleEnrollInCourse}
                enrolledCourseIds={enrollments.map((e) => e.courseId)}
                language={language}
              />
            )}

            {currentTab === 'catalog' && (
              <CatalogView
                opportunities={opportunities}
                savedOpportunities={savedOpportunities}
                toggleSaveOpportunity={toggleSaveOpportunity}
                userGrade={userProfile.grade}
                language={language}
              />
            )}

            {currentTab === 'courses' && (
              <CoursesView
                courses={courses}
                enrollments={enrollments}
                onEnroll={handleEnrollInCourse}
                onCompleteLesson={handleCompleteLesson}
                onSaveQuizAnswer={handleSaveQuizAnswer}
                savedOpportunitiesCount={savedOpportunities.length}
                language={language}
              />
            )}

            {currentTab === 'cabinet' && (
              <CabinetView
                userProfile={userProfile}
                opportunities={opportunities}
                courses={courses}
                savedOpportunities={savedOpportunities}
                enrollments={enrollments}
                toggleSaveOpportunity={toggleSaveOpportunity}
                setCurrentTab={setCurrentTab}
                onResetPreferences={handleResetPreferences}
                onOpenCourse={handleOpenCourse}
                onUpdateProfile={handleUpdateProfile}
                language={language}
              />
            )}

            {currentTab === 'admin' && userProfile.role === 'admin' && (
              <AdminView
                opportunities={opportunities}
                courses={courses}
                onSaveOpportunities={setOpportunities}
                onSaveCourses={setCourses}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      
      <footer className="hidden md:block py-8 border-t border-slate-100 bg-white select-none">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-sans">
          <p>
            {language === 'en' 
              ? ' 2026 Mentoria Hub. ' 
              : language === 'kk' 
              ? ' 2026 Mentoria Hub.' 
              : ' 2026 Mentoria Hub. '}
          </p>
          <div className="flex gap-4 mt-2 sm:mt-0 font-medium text-slate-500">
            
            <span>•</span>
            <span className="text-indigo-600">Школа Mentoria MVP</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
