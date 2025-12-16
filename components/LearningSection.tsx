import React, { memo, useEffect, useState } from "react";
import Section from "./Section";
import CyclingText from "./CyclingText";
import { useAuth } from "../context/AuthContext";
import { getLearningCards } from "../services/contentService";
import { LearningCard as LearningCardData } from "../data/mockData"; // Type only

const cyclingMessages = [
  "In-depth tutorials, video lessons, and case studies for every role.",
  "Master role-specific skills with hands-on examples.",
  "Progress tracking and certification resources provided.",
];

const ExternalButton: React.FC<{ href?: string; children: React.ReactNode; ariaLabel?: string }> = ({ href, children, ariaLabel }) => {
  if (!href) {
    return (
      <button disabled className="block w-full text-center bg-gray-700/50 text-gray-500 font-semibold py-2 px-4 rounded-lg cursor-not-allowed border border-gray-700">
        Coming soon
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-purple-600/90 hover:bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-purple-500/25" aria-label={ariaLabel}>
      {children}
    </a>
  );
};

const LearningCard: React.FC<{ card: LearningCardData }> = memo(({ card }) => {
  const { isBookmarked, toggleBookmark } = useAuth();
  const bookmarked = isBookmarked(`learning-${card.id}`);
  const titleId = `${card.id}-title`;

  return (
    <article
      data-id={`learning-${card.id}`}
      data-role={`${card.id} all`}
      aria-labelledby={titleId}
      className="card group relative reveal-on-scroll flex flex-col bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 hover:border-purple-500/50 hover:shadow-purple-500/20 transform hover:-translate-y-1 transition-all duration-300 p-6 h-full"
    >
      <button
        onClick={(e) => { e.preventDefault(); toggleBookmark(`learning-${card.id}`); }}
        className="absolute top-4 right-4 text-gray-400 hover:text-purple-400 transition-colors focus:outline-none z-20 p-1"
      >
        <i className={`${bookmarked ? "fa-solid" : "fa-regular"} fa-bookmark text-xl`}></i>
      </button>

      <h3 id={titleId} className="text-xl font-bold text-purple-300 mb-3 pr-8">{card.title}</h3>
      <p className="text-gray-400 text-sm flex-grow mb-6 leading-relaxed">{card.description || "Role-specific courses and materials to kickstart your career."}</p>

      <div className="mt-auto space-y-3">
        <ExternalButton href={card.courseLink}><i className="fa-solid fa-list-ul mr-2"></i> Course Structure</ExternalButton>
        <ExternalButton href={card.materialsLink}><i className="fa-solid fa-folder-open mr-2"></i> Explore Materials</ExternalButton>
        <ExternalButton href={card.VideoTutorialLink ?? card.courseLink}><i className="fa-solid fa-play-circle mr-2"></i> Video Tutorial</ExternalButton>
      </div>
    </article>
  );
});

const LearningSection: React.FC = () => {
  const [cards, setCards] = useState<LearningCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getLearningCards();
        setCards(data);
      } catch (error) {
        console.error("Failed to fetch learning cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return (
    <Section id="learning" title="Learning by Role" description={<CyclingText messages={cyclingMessages} />} aria-label="Role-specific learning sections" isFilterable={true}>
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <LearningCard key={card.id} card={card} />
          ))}
        </div>
      )}
    </Section>
  );
};

export default LearningSection;