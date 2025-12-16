import React from 'react';
import Section from './Section';
import ProjectGrid from './projects/ProjectGrid';
import { Project } from './projects/ProjectCard'; // Import the interface we defined earlier

// Strictly typed array
const projectCards: Project[] = [
    { id: 'ba-proj', role: 'ba', title: 'Business Analyst (BA)', description: 'Focus on business analysis, process modeling, and data-driven decision making.' },
    { id: 'da-proj', role: 'da', title: 'Data Analyst (DA)', description: 'Showcasing data analysis and visualization expertise using tools like Python, SQL, and Tableau.' },
    { id: 'ds-proj', role: 'ds', title: 'Data Scientist (DS)', description: 'Focus on machine learning algorithms, data processing, and statistical analysis.' },
    { id: 'fa-proj', role: 'fa', title: 'Financial Analyst (FA)', description: 'Focus on financial modeling, forecasting, and investment analysis techniques.' },
    { id: 'bi-proj', role: 'bi', title: 'Business Intelligence (BI) Analyst', description: 'Showcasing data visualization, dashboard creation, and reporting skills.' },
    { id: 'de-proj', role: 'de', title: 'Data Engineer (DE)', description: 'Focus on designing and optimizing data pipelines and architecture using tools like SQL and Spark.' },
    { id: 'sc-proj', role: 'sc', title: 'Supply Chain Analyst (SC)', description: 'Emphasizing supply chain optimization, logistics analysis, and inventory management.' },
    { id: 'jf-proj', role: 'jf', title: 'Java Full Stack Developer (JF)', description: 'Highlighting full stack development skills using Java, Spring Boot, and React.' },
    { id: 'fd-proj', role: 'fd', title: 'Frontend Developer (FD)', description: 'Showcasing frontend development expertise with HTML, CSS, JavaScript, and popular frameworks.' }
];

const ProjectsSection: React.FC = () => (
    <Section
        id="projects"
        title="Real-World Projects" // Slightly more engaging title
        description="Explore tailored projects for different analytics and data roles. Click on any card to view detailed case studies and solutions."
        aria-label="Projects for Various Roles"
        isFilterable={true} // This triggers the filter logic in the Section wrapper
    >
        <ProjectGrid projects={projectCards} />
    </Section>
);

export default ProjectsSection;