import React, { memo } from 'react';
import Section from './Section';
import { useAuth } from '../context/AuthContext';

const platformCards = [
    {
        id: 'py-plat',
        title: 'Python Practice',
        icon: 'https://img.icons8.com/color/48/python.png',
        alt: 'Python',
        description: 'LeetCode offers a comprehensive platform for Python coding practice with realistic algorithmic challenges.',
        link: 'https://leetcode.com/studyplan/top-interview-150/',
        linkLabel: 'Try Leetcode For Python'
    },
    // ... (Keep existing data)
    {
        id: 'sql-plat',
        title: 'SQL Coding',
        icon: 'https://img.icons8.com/fluency/48/sql.png',
        alt: 'Strata Scratch',
        description: 'Leverage Strata Scratch to master SQL by solving realistic, industry-driven challenges.',
        link: 'https://leetcode.com/studyplan/top-sql-50/',
        linkLabel: 'Try Leetcode for SQL'
    },
    {
        id: 'r-plat',
        title: 'R Language',
        icon: 'https://img.icons8.com/fluency/48/r-project.png',
        alt: 'R Language',
        description: 'Explore the next leap in R programming to enhance your coding skills.',
        link: 'https://nextleap.app/online-compiler/r-programming',
        linkLabel: 'Try this platform for R'
    },
    {
        id: 'data-coll',
        title: 'Data Collection',
        icon: 'https://i.pinimg.com/1200x/d4/5a/12/d45a12c3d57abff80ee414421d9c0322.jpg',
        alt: 'Kaggle',
        description: 'Explore Kaggle for hands-on data science practice, competitions, and datasets.',
        link: 'https://www.kaggle.com/datasets',
        linkLabel: 'Try Kaggle'
    },
    {
        id: 'db-plat',
        title: 'DataBricks Platform',
        icon: 'https://i.pinimg.com/736x/65/1d/d6/651dd6bdd503bd0aaba588b9e6439459.jpg',
        alt: 'Databricks',
        description: 'Explore Databricks for scalable data analytics and unified data engineering.',
        link: 'https://www.databricks.com/try-databricks',
        linkLabel: 'Try Databricks'
    },
    {
        id: 'github-plat',
        title: 'Github Repo',
        icon: 'https://img.icons8.com/sf-regular/48/github.png',
        alt: 'Github',
        description: 'Explore GitHub for seamless version control and collaborative coding.',
        link: 'https://github.com/',
        linkLabel: 'Try Git Repository'
    }
];

const PlatformCard = memo(({ card }: { card: typeof platformCards[0] }) => {
    const { isBookmarked, toggleBookmark } = useAuth();
    const bookmarked = isBookmarked(card.id);

    return (
        <article data-id={card.id} className="reveal-on-scroll relative bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 flex flex-col items-center text-center border border-gray-700 hover:border-blue-500 hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300">
            <button
                onClick={(e) => { e.preventDefault(); toggleBookmark(card.id); }}
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-500 transition-colors focus:outline-none z-20 p-1"
                aria-label={bookmarked ? "Remove bookmark" : "Save for later"}
            >
                <i className={`${bookmarked ? "fa-solid" : "fa-regular"} fa-bookmark text-xl`}></i>
            </button>

            <h3 id={`${card.id}-title`} className="text-xl font-bold text-blue-300 mb-4 pr-8">{card.title}</h3>
            <div className="h-20 w-20 flex items-center justify-center mb-4 bg-gray-700/50 rounded-full p-3 shadow-inner">
                <img src={card.icon} alt={card.alt} className="max-h-full max-w-full object-contain" />
            </div>
            <p className="text-gray-400 flex-grow mb-6 text-sm leading-relaxed">{card.description}</p>
            <div className="mt-auto w-full">
                <a href={card.link} target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-300 shadow-md">
                    {card.linkLabel}
                </a>
            </div>
        </article>
    );
});

const PlatformsSection: React.FC = () => (
    <Section id="platforms" title="Recommended Platforms" description="Explore platforms to enhance your learning experience." aria-label="Projects for Various Roles">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformCards.map(card => <PlatformCard key={card.id} card={card} />)}
        </div>
    </Section>
);

export default PlatformsSection;