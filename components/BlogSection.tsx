import React from 'react';
import Section from './Section';
import CyclingText from './CyclingText'; // Ensure this file exists!

const blogPosts = [
    {
        title: "5 Emerging Trends in Data Science for 2025",
        trends: [
            "AI and Machine Learning Integration", "Natural Language Processing (NLP)",
            "Real-time Data Processing", "Data Privacy & Security", "Automated Analytics Tools"
        ],
        link: "https://www.notion.so/Data-Science-2ae1f764279c80c98393fc2dcb95663d?source=copy_link"
    },
    {
        title: "5 Emerging Trends in Data Analytics for 2025",
        trends: [
            "Data Democratization", "Cloud Data Warehousing",
            "Advanced Visualization", "Predictive Analytics", "IoT Data Integration"
        ],
        link: "https://www.notion.so/Data-Analytics-2ae1f764279c803db091fb578fccc2b8?source=copy_link"
    },
    {
        title: "5 Emerging Trends in Data Engineering for 2025",
        trends: [
            "Data Quality & Governance", "Serverless Infrastructure", "Cloud-native Engineering",
            "AI Automation", "Pipeline Efficiency"
        ],
        link: "https://www.notion.so/Data-Engineering-2ae1f764279c80d98183caab6300ccbf?source=copy_link"
    },
    {
        title: "5 Emerging Trends in Business Analytics for 2025",
        trends: [
            "AI Reporting Automation", "Predictive Analytics", "Collaborative BI",
            "Real-time Analytics", "Mobile & Cloud Analytics"
        ],
        link: "https://www.notion.so/Business-Analytics-2ae1f764279c8051b465d5b988e43a04?source=copy_link"
    },
    {
        title: "5 Emerging Trends in Financial Analytics for 2025",
        trends: [
            "Credit Risk AI Modeling", "Blockchain Technologies", "Compliance Automation",
            "Real-time Financial Analysis", "Alternative Investment Data"
        ],
        link: "https://www.notion.so/Financial-Analytics-2ae1f764279c80c08b3ec381a84bfc50?source=copy_link"
    },
    {
        title: "5 Emerging Trends in Business Intelligence for 2025",
        trends: [
            "AI-Powered BI Tools", "Cloud-Based BI Platforms", "Data Storytelling", "Augmented Analytics",
            "Operational Intelligence"
        ],
        link: "https://www.notion.so/Business-Intelligence-2ae1f764279c8050861fce81661592c9?source=copy_link"
    },
    {
        title: "5 Emerging Trends in Supply Chain Analyst for 2025",
        trends: [
            "Predictive Supply Chain AI", "Digital Supply Chain", "Sustainable Logistics", "Blockchain for Transparency",
            "Resilient Network Design"
        ],
        link: "https://www.notion.so/Supply-Chain-Analyst-2ae1f764279c8064913eed0c0c54c764?source=copy_link"
    },
    {
        title: "5 Emerging Trends in Java Full Stack Developer for 2025",
        trends: [
            "Cloud-Native Microservices", "Serverless Java Computing", "Reactive Programming", "AI-Assisted Development",
            "GraalVM & Native Images"
        ],
        link: "https://www.notion.so/Java-Full-Stack-Developer-2ae1f764279c8094ace3cdc416f9ad45?source=copy_link"
    },
    {
        title: "5 Emerging Trends in Frontend Developer for 2025",
        trends: [
            "Micro-Frontend Architecture", "React Server Components (RSC)", "AI-Generated UI", "WebAssembly (Wasm) Integration",
            "Motion Design & 3D Web"
        ],
        link: "https://www.notion.so/Frontend-Developer-2ae1f764279c80c29bfed370ccecd78d?source=copy_link"
    },
];

const cyclingMessages = [
    "Discover latest Tech Industry news and trends.",
    "Boost your Software & Analytics career.",
    "Learn about new certifications and technologies."
];

const BlogSection: React.FC = () => (
    <Section
        id="blog-news"
        title="Latest Blog & News"
        description={<CyclingText messages={cyclingMessages} />}
        aria-label="Latest Blog and News"
    >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
                <article
                    key={index}
                    className="
                        group relative flex flex-col h-full
                        bg-gray-800/40 backdrop-blur-md 
                        rounded-xl overflow-hidden
                        border border-gray-700 hover:border-red-500/50
                        shadow-lg hover:shadow-red-500/10
                        transition-all duration-300 transform hover:-translate-y-1
                    "
                >
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="mb-4">
                            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                                Trend Report
                            </span>
                            <h3 className="text-xl font-bold text-gray-100 mt-2 group-hover:text-red-300 transition-colors">
                                {post.title}
                            </h3>
                        </div>

                        <ul className="space-y-2 mb-6 flex-grow">
                            {post.trends.slice(0, 5).map((trend, i) => (
                                <li key={i} className="flex items-start text-sm text-gray-400">
                                    <span className="mr-2 text-red-500 mt-1">•</span>
                                    {trend}
                                </li>
                            ))}
                        </ul>

                        <a
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                mt-auto w-full text-center
                                bg-red-600/90 hover:bg-red-500 
                                text-white font-semibold py-2.5 px-4 
                                rounded-lg shadow-md transition-all
                                flex items-center justify-center gap-2
                            "
                        >
                            Read Full Article
                            <i className="fa-solid fa-external-link-alt text-xs opacity-70"></i>
                        </a>
                    </div>
                </article>
            ))}
        </div>
    </Section>
);

export default BlogSection;