import React, { useState, useEffect, useCallback } from 'react';

// Components
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero'; // ✅ Corrected path
import FilterBar from '../components/FilterBar';
import BackToTop from '../components/BackToTop';
import SupportWidget from '../components/SupportWidget';

// Sections
import LearningSection from '../components/LearningSection';
import LearningPathSection from '../components/LearningPathSection';
import ScreeningQuestionsSection from '../components/ScreeningQuestionsSection';
import CertificationsSection from '../components/CertificationsSection';
import ProjectsSection from '../components/ProjectsSection';
import PlatformsSection from '../components/PlatformsSection';
import InteractiveTools from '../components/InteractiveTools';
import BlogSection from '../components/BlogSection';
import CommunitySection from '../components/CommunitySection';
import ContactSection from '../components/ContactSection';

// Modals
import ProjectModals from '../components/ProjectModals';
import QuizModal from '../components/quiz/QuizModal';
import ProfileModal from '../components/ProfileModal';

export const Home: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeProjectModal, setActiveProjectModal] = useState<string | null>(null);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // --- Filtering Logic ---
  // We use direct DOM manipulation for filtering to ensure high performance 
  // without forcing React to re-render the entire tree of complex sections.
  useEffect(() => {
    const requestID = requestAnimationFrame(() => {
      const allCards = document.querySelectorAll('[data-role]');

      allCards.forEach(card => {
        const cardElement = card as HTMLElement;
        // Check if the card belongs to a filterable section
        const section = cardElement.closest('[data-filter-section="true"]');
        if (!section) return;

        const cardRoles = cardElement.dataset.role?.split(' ') || [];

        if (activeFilter === 'all' || cardRoles.includes(activeFilter)) {
          cardElement.classList.remove('filter-hidden');
          // Small delay to allow layout to reflow before fading in
          setTimeout(() => cardElement.classList.add('is-visible'), 50);
        } else {
          cardElement.classList.add('filter-hidden');
          cardElement.classList.remove('is-visible');
        }
      });
    });

    return () => cancelAnimationFrame(requestID);
  }, [activeFilter]);

  // --- Animate on Scroll Logic ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optional: Stop observing once visible to save resources
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '50px' });

    // Observe all reveal elements. Use a helper so newly-inserted nodes (dynamic content)
    // are observed as well (fixes cases where sections render after mount).
    const observeTargets = () => {
      const targets = document.querySelectorAll('.reveal-on-scroll:not(.filter-hidden)');
      targets.forEach(target => observer.observe(target));
    };

    // Initial pass shortly after mount to allow initial DOM to settle
    const timer = setTimeout(observeTargets, 120);

    // Watch for dynamic additions (e.g. learning cards fetched after mount)
    const mutObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.addedNodes && m.addedNodes.length > 0) {
          // Re-run observation for any matching new nodes
          observeTargets();
        }
      }
    });

    // Observe changes inside the main content where sections appear
    const mainEl = document.querySelector('main');
    if (mainEl) mutObserver.observe(mainEl, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutObserver.disconnect();
      clearTimeout(timer);
    };
  }, [activeFilter]); // Re-run when filter changes to catch newly visible items

  // --- Event Delegation Handler ---
  // Captures clicks from "View Project" or "Start Quiz" buttons deep in the component tree
  const handleGlobalClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    // 1. Quiz Buttons
    const quizBtn = target.closest('[data-quiz-target]') as HTMLElement;
    if (quizBtn) {
      e.preventDefault();
      const quizId = quizBtn.dataset.quizTarget;
      if (quizId) setActiveQuizId(quizId);
      return;
    }

    // 2. Project Modal Buttons
    const modalBtn = target.closest('[data-modal-target]') as HTMLElement;
    if (modalBtn) {
      e.preventDefault();
      const targetId = modalBtn.dataset.modalTarget;
      if (targetId === 'profile-modal') {
        setIsProfileOpen(true);
      } else if (targetId) {
        setActiveProjectModal(targetId);
      }
    }
  }, []);

  return (
    <div
      className="relative overflow-x-hidden antialiased min-h-screen bg-transparent text-gray-100"
      onClick={handleGlobalClick} // React Event Delegation
    >
      <Navbar onOpenProfile={() => setIsProfileOpen(true)} />

      <main className="relative z-10">
        <Hero />

        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <div className="space-y-20 md:space-y-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <LearningSection />
          <LearningPathSection />
          <ScreeningQuestionsSection />
          <CertificationsSection />
          <ProjectsSection />
          <PlatformsSection />
          <InteractiveTools />
          <BlogSection />
          <CommunitySection />
          <ContactSection />

        </div>
      </main>

      <Footer />
      <BackToTop />
      <SupportWidget />

      {/* --- Global Modals --- */}
      <ProjectModals
        activeModalId={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />

      <QuizModal
        isOpen={!!activeQuizId}
        quizId={activeQuizId || ''}
        onClose={() => setActiveQuizId(null)}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
};