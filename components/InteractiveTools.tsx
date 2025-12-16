import React from 'react';
import Section from './Section';
import CyclingText from './CyclingText';

const tools = [
  { name: 'AWS', link: 'https://aws.amazon.com/training/', imgSrc: 'https://img.icons8.com/color/96/amazon-web-services.png' },
  { name: 'GCP', link: 'https://cloud.google.com/training', imgSrc: 'https://www.gstatic.com/cgc/google-cloud-logo.svg' },
  { name: 'Python', link: 'https://www.python.org/about/gettingstarted/', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
  { name: 'SQL', link: 'https://www.w3schools.com/sql/', imgSrc: 'https://img.icons8.com/fluency/96/sql.png' },
  { name: 'Excel', link: 'https://support.microsoft.com/en-us/excel', imgSrc: 'https://img.icons8.com/color/96/microsoft-excel-2019.png' },
  { name: 'Power BI', link: 'https://learn.microsoft.com/en-us/power-bi/fundamentals/power-bi-overview', imgSrc: 'https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png' },
  { name: 'Tableau', link: 'https://www.tableau.com/learn/training', imgSrc: 'https://img.icons8.com/color/96/tableau-software.png' },
  { name: 'Frontend Dev', link: 'https://www.freecodecamp.org/learn/front-end-development-libraries/', imgSrc: 'https://img.icons8.com/color/96/html-5--v1.png' },
  { name: 'Java Full Stack', link: 'https://www.geeksforgeeks.org/advance-java/java-full-stack/', imgSrc: 'https://media.geeksforgeeks.org/gfg-gg-logo.svg' },
];

const cyclingMessages = [
  "Test your knowledge with dynamic quizzes.",
  "Practice coding challenges designed for data roles.",
  "Start real-world projects to build your portfolio."
];

const InteractiveTools: React.FC = () => (
  <Section
    id="interactive-tools"
    title="Interactive Tools"
    description={<CyclingText messages={cyclingMessages} />}
    aria-label="Interactive Tools"
  >
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {tools.map((tool) => (
        <a
          key={tool.name}
          href={tool.link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group flex flex-col items-center justify-center p-6
            bg-gray-800/40 backdrop-blur-md rounded-xl border border-gray-700
            hover:bg-gray-700/60 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20
            transition-all duration-300 transform hover:-translate-y-1
          "
        >
          <div className="w-16 h-16 mb-4 flex items-center justify-center bg-white/5 rounded-full p-2 group-hover:scale-110 transition-transform duration-300">
            <img
              src={tool.imgSrc}
              alt={`${tool.name} logo`}
              className="max-w-full max-h-full object-contain filter drop-shadow-md"
              loading="lazy"
            />
          </div>
          <span className="font-semibold text-gray-200 group-hover:text-white text-center text-sm">
            {tool.name}
          </span>
        </a>
      ))}
    </div>
  </Section>
);

export default InteractiveTools;