import React, { memo } from 'react';
import Section from './Section';
import CyclingText from './CyclingText';
import { useAuth } from '../context/AuthContext';

const screeningCards = [
  { id: "ba-questions", role: "ba", title: "Business Analyst", link: "https://www.notion.so/Business-Analyst-questions-2ae1f764279c80e2962bf7eb5db7df54?source=copy_link" },
  { id: "fa-questions", role: "fa", title: "Financial Analyst", link: "https://www.notion.so/Financial-Analyst-questions-2ae1f764279c800a90dbf855f865e839?source=copy_link" },
  { id: "da-questions", role: "da", title: "Data Analyst", link: "https://www.notion.so/Data-Analyst-questions-2ae1f764279c8006be14c960f982ba95?source=copy_link" },
  { id: "ds-questions", role: "ds", title: "Data Scientist", link: "https://www.notion.so/Data-Scientist-questions-2ae1f764279c80f1b965d24a3cb7a061?source=copy_link" },
  { id: "de-questions", role: "de", title: "Data Engineer", link: "https://www.notion.so/Data-Engineer-questions-2ae1f764279c80fab8c1e5f62cfd03b7?source=copy_link" },
  { id: "bi-questions", role: "bi", title: "Business Intelligence Analyst", link: "https://www.notion.so/Business-Intelligence-Analyst-questions-2ae1f764279c8087ade7fa7a6b4c0fe7?source=copy_link" },
  { id: "sc-questions", role: "sc", title: "Supply Chain Analyst", link: "https://www.notion.so/Supply-Chain-Analyst-questions-2ae1f764279c8069802df0831d671c7a?source=copy_link" },
  { id: "jf-questions", role: "jf", title: "Java Full Stack Developer", link: "https://www.notion.so/Java-Full-Stack-Developer-questions-2ae1f764279c80bbad4cda729107a385?source=copy_link" },
  { id: "fd-questions", role: "fd", title: "Frontend Developer", link: "https://www.notion.so/Frontend-Developer-questions-2ae1f764279c8032b134ccdeec3446b9?source=copy_link" }
];

const cyclingMessages = [
  "Get prepared with frequently asked questions for roles in Business Analysis, Financial Analysis, Data Science, and more.",
  "Check out role-specific questions for interviews and excel in your career transition.",
  "Gain insights into what recruiters are looking for and how to answer interview questions."
];

// Inner Card Component for independent state
const ScreeningCard = memo(({ card }: { card: typeof screeningCards[0] }) => {
  const { isBookmarked, toggleBookmark } = useAuth();
  const bookmarked = isBookmarked(card.id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleBookmark(card.id);
  };

  return (
    <article
      data-id={card.id}
      data-role={`${card.role} all`}
      className="card relative reveal-on-scroll
        bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg flex flex-col border border-gray-700 
        hover:border-cyan-500 hover:shadow-cyan-500/20 transform hover:-translate-y-1 
        transition-all duration-300 ease-in-out
        flex-grow-0 flex-shrink-0 basis-full md:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]
        p-6
      "
    >
      <button
        onClick={handleBookmark}
        className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition-colors focus:outline-none z-20 p-1"
        aria-label={bookmarked ? "Remove bookmark" : "Save for later"}
      >
        <i className={`${bookmarked ? "fa-solid" : "fa-regular"} fa-bookmark text-xl`}></i>
      </button>

      <h3 id={`${card.id}-title`} className="text-xl font-bold text-cyan-300 mb-2 pr-8">{card.title}</h3>
      <p className="text-gray-400 flex-grow mb-6">Frequently asked questions to prepare you for technical screenings.</p>

      <div className="mt-auto grid grid-cols-2 gap-3">
        <a href={card.link} target="_blank" rel="noopener noreferrer" className="text-center bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-300 text-sm flex items-center justify-center">
          View Questions
        </a>
        <button data-quiz-target={`${card.role}-quiz`} className="text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-300 text-sm">
          Take Quiz
        </button>
      </div>
    </article>
  );
});

const ScreeningQuestionsSection: React.FC = () => (
  <Section
    id="screening-questions"
    title="Basic Screening Questions"
    description={<CyclingText messages={cyclingMessages} interval={6000} />}
    aria-label="Basic Screening Questions for Various Roles"
    isFilterable={true}
  >
    <div className="flex flex-wrap justify-center gap-6">
      {screeningCards.map(card => <ScreeningCard key={card.id} card={card} />)}
    </div>
  </Section>
);

export default ScreeningQuestionsSection;