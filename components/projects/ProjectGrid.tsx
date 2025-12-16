import React from 'react';
import ProjectCard, { Project } from './ProjectCard';

interface ProjectGridProps {
    projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
    return (
        <section
            aria-label="Project List"
            className="w-full min-h-[300px]" // Min-height prevents layout jump when filtering
        >
            {projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400 animate-in fade-in">
                    <i className="fa-regular fa-folder-open text-4xl mb-4 opacity-50"></i>
                    <p>No projects available for this category yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProjectGrid;