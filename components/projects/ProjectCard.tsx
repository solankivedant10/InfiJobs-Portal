import React, { memo } from 'react';
import { useAuth } from '../../context/AuthContext';

// 1. Export the interface so the parent component can use it for type checking
export interface Project {
    id: string;
    role: string;
    title: string;
    description: string;
}

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const { isBookmarked, toggleBookmark } = useAuth();
    const bookmarked = isBookmarked(project.id);

    const handleBookmarkClick = (e: React.MouseEvent) => {
        // Stop propagation so we don't trigger other card clicks (if any exist in future)
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(project.id);
    };

    // Helper to format role for filtering (e.g., "Business Analyst" -> "ba")
    // Assuming your project.role comes in as "ba", "fa" etc. based on your mock data
    const roleClass = project.role.toLowerCase();

    return (
        <article
            // ⚠️ CRITICAL FOR FILTERING: These data attributes are read by Home.tsx
            data-id={project.id}
            data-role={`${roleClass} all`}

            className="
                card group relative reveal-on-scroll
                bg-gray-800/50 backdrop-blur-lg 
                rounded-xl shadow-lg 
                border border-gray-700 
                hover:border-green-400/50 hover:shadow-green-500/20 
                hover:-translate-y-1
                transition-all duration-300 ease-out
                p-6 flex flex-col
                h-full w-full
            "
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header: Title + Bookmark */}
                <div className="flex justify-between items-start mb-3">
                    <h3
                        id={`${project.id}-title`}
                        className="text-xl font-bold text-green-300 pr-8 leading-tight"
                    >
                        {project.title}
                    </h3>

                    <button
                        onClick={handleBookmarkClick}
                        className="text-gray-400 hover:text-green-400 transition-colors p-1"
                        aria-label={bookmarked ? "Remove bookmark" : "Save for later"}
                    >
                        {/* Switched to FontAwesome classes compatible with your setup */}
                        <i className={`${bookmarked ? "fa-solid" : "fa-regular"} fa-bookmark text-xl`}></i>
                    </button>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm flex-grow mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                </p>

                {/* Footer: Action Button */}
                {/* ⚠️ CRITICAL FOR MODALS: data-modal-target is read by Home.tsx event delegation */}
                <button
                    data-modal-target={`${roleClass}-project-modal`}
                    className="
                        w-full mt-auto
                        bg-green-600/90 hover:bg-green-500 
                        text-white font-semibold py-2.5 px-4 
                        rounded-lg shadow-md hover:shadow-green-500/30
                        transition-all duration-300 transform active:scale-95
                        flex items-center justify-center space-x-2
                    "
                >
                    <span>View Project</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                </button>
            </div>
        </article>
    );
};

// Memoize to prevent re-renders of list items when unrelated state changes
export default memo(ProjectCard);