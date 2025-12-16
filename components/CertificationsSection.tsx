import React, { memo } from 'react';
import Section from './Section';
import { useAuth } from '../context/AuthContext';

const certificationData = [
    {
        id: 'ba-cert', role: 'ba', title: 'Business Analyst (BA)',
        description: 'Enhance your skills in data analysis, business modeling, and process management.',
        links: [
            { label: 'Microsoft Business Analyst Professional Certificate', href: 'https://www.coursera.org/professional-certificates/microsoft-business-analyst/paidmedia?utm_medium=sem&utm_source=gg&utm_campaign=b2c_india_microsoft-business-analyst_microsoft_ftcof_professional-certificates_cx_dr_bau_gg_pmax_pr_in_all_m_hyb_25-04_x&campaignid=22473121629&adgroupid=&device=c&keyword=&matchtype=&network=x&devicemodel=&creativeid=&assetgroupid=6570667489&targetid=&extensionid=&placement=&gad_source=1&gad_campaignid=22479628793&gbraid=0AAAAADdKX6bRpQ9ZJv_zZzO28oe1NB3LP&gclid=Cj0KCQjwgIXCBhDBARIsAELC9ZiRIRzpnl3iqPwramLQdMFD7WIWR9eNQlIDbIgFe5yS1QRiHJzzuLcaAlOwEALw_wcB' },
            { label: 'IIBA Endorsed Advanced Business Analyst Certification', href: 'https://www.simplilearn.com/business-analyst-certification-training-course?utm_source=google&utm_medium=cpc&utm_term=best%20business%20analyst%20course&utm_content=9814119589-150115778138-683555551646&utm_device=c&utm_campaign=Search-DigitalBusinessCluster-BusinessLeadership-BusinessAnalyst-MST-CBA-IN-Main-AllDevice+VBB_Experiment-adgroup-BA-Google-Suggested&gad_source=1&gad_campaignid=9814119589&gbraid=0AAAAADt9AXPA0lQQkiDka-5e9kHbk83Xd&gclid=Cj0KCQjwgIXCBhDBARIsAELC9Zjiep0opQ4aeahPHw6z3vhjxGkNW37-1f6sjrFkQtAPRNNq09RhwLAaAuHZEALw_wcB' },
            { label: 'Upgrade Certification in Business Analysis', href: 'https://www.upgrad.com/business-analytics-certification-pwc-india-lpv1/?utm_source=google&utm_medium=search&utm_campaign=Google_Search_LeadGen_BAC_PanIndia_18_24_New_UG_LP&utm_content=Business_Analytics_New&utm_term=business%20analyst%20certificate%20course&gad_source=1&gad_campaignid=21566027995&gbraid=0AAAAABOif7n2o7nhQtxkq-Rh9RpaxJJf_&gclid=Cj0KCQjwgIXCBhDBARIsAELC9ZhFjaiYI4VgKTdw6S19lKoHV0SAe30bdotqrfqP-nCRZUl0EpcwqJAaAsuzEALw_wcB' },
        ]
    },
    {
        id: 'da-cert', role: 'da', title: 'Data Analyst (DA)',
        description: 'Sharpen your skills in data visualization, SQL, and data wrangling techniques.',
        links: [
            { label: 'Professional Microsoft Excel Certification Course', href: 'https://www.microsoft.com/en-us/learning/exam-70-778.aspx' },
            { label: 'Google Data Analytics Professional Certification', href: 'https://www.coursera.org/professional-certificates/google-data-analytics' },
            { label: 'Professional Tableau Certified Data Analyst Course', href: 'https://www.tableau.com/learn/certification' },
        ]
    },
    {
        id: 'ds-cert', role: 'ds', title: 'Data Scientist (DS)',
        description: 'Become proficient with certifications on machine learning, deep learning, and statistics.',
        links: [
            { label: 'Coursera Data Science Certification Course', href: 'https://www.coursera.org/learn/python-for-applied-data-science-ai' },
            { label: 'ExcelR Data Scientist Certification Course', href: 'https://excelr.in/data-science-course/?utm_source=GoogleAds&utm_medium=Search&utm_term=best%20data%20science%20certification&utm_content=643442556170&utm_device=c&utm_campaign=Search-DataScience-ROI-New&utm_adgroup=Search-DataScience-Certification-Exact&utm_location=ROI&utm_channel=CPC&utm_variety=Text&gad_source=1&gad_campaignid=19433247303&gbraid=0AAAAACwq9hQOkPU_aCi5O__uKY9xxbr_n&gclid=Cj0KCQjwgIXCBhDBARIsAELC9Zi0K_AavnIWHwwOhS-06-c_J8YssgjjSt3yJ67zYNFiJeCXtL0RxnwaAh0MEALw_wcB' },
            { label: 'Microsoft Azure Data Scientist Certification', href: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-data-scientist/?practice-assessment-type=certification' },
        ]
    },
    {
        id: 'de-cert', role: 'de', title: 'Data Engineer (DE)',
        description: 'Focus on skills required for managing and optimizing large data pipelines and architecture.',
        links: [
            { label: 'Certification In Microsoft Azure Data Engineering', href: 'https://learn.microsoft.com/en-us/training/courses/dp-203t00' },
            { label: 'Professional AWS Certified Data Engineer Course', href: 'https://aws.amazon.com/certification/certified-data-engineer-associate/' },
            { label: 'Google Cloud Certification In Data Engineering', href: 'https://cloud.google.com/learn/certification/data-engineer' },
        ]
    },
    {
        id: 'fa-cert', role: 'fa', title: 'Financial Analyst (FA)',
        description: 'Enhance your expertise in financial modeling, portfolio management, and investment analysis.',
        links: [
            { label: 'Certification For Financial Management Analysis (FMA)', href: 'https://www.fma.org/finance-certifications' },
            { label: 'Certified Financial Modeling Analyst (CFMA)', href: 'https://corporatefinanceinstitute.com/certifications/financial-modeling-valuation-analyst-fmva-program/' },
            { label: 'Certification For Chartered in Financial Planning (CFP)', href: 'https://india.fpsb.org/membership-account/membership-checkout/?level=1&dellevels=' },
        ]
    },
    {
        id: 'bi-cert', role: 'bi', title: 'Business Intelligence (BI)',
        description: 'Focus on transforming data into actionable insights for better decision-making.',
        links: [
            { label: 'Professional Tableau Certification for Business Intelligence', href: 'https://www.tableau.com/learn/certification' },
            { label: 'Professional Microsoft Power BI Certification Course', href: 'https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/?practice-assessment-type=certification' },
            { label: 'Google Certified Course for Business Intelligence', href: 'https://grow.google/certificates/business-intelligence/' },
        ]
    },
    {
        id: 'JF-cert', role: 'JF', title: 'Java Fullstack Developer (JF)',
        description: 'Focus on Building scalable Full-Stack Application.',
        links: [
            { label: 'Professional Tableau Certification for Business Intelligence', href: 'https://www.tableau.com/learn/certification' },
            { label: 'Professional Microsoft Power BI Certification Course', href: 'https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/?practice-assessment-type=certification' },
            { label: 'Google Certified Course for Business Intelligence', href: 'https://grow.google/certificates/business-intelligence/' },
        ]
    },
    {
        id: 'FD-cert', role: 'FD', title: 'Frontend Developer (FE)',
        description: 'Focus on Building Frontend Applications.',
        links: [
            { label: 'Professional Tableau Certification for Business Intelligence', href: 'https://www.tableau.com/learn/certification' },
            { label: 'Professional Microsoft Power BI Certification Course', href: 'https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/?practice-assessment-type=certification' },
            { label: 'Google Certified Course for Business Intelligence', href: 'https://grow.google/certificates/business-intelligence/' },
        ]
    },
    {
        id: 'SCA-cert', role: 'SCA', title: 'Supply Chain Analyst (SCA)',
        description: 'Focus on Supply Chain Analyst.',
        links: [
            { label: 'Professional Tableau Certification for Business Intelligence', href: 'https://www.tableau.com/learn/certification' },
            { label: 'Professional Microsoft Power BI Certification Course', href: 'https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/?practice-assessment-type=certification' },
            { label: 'Google Certified Course for Business Intelligence', href: 'https://grow.google/certificates/business-intelligence/' },
        ]
    }
];


const CertCard = memo(({ cert }: { cert: any }) => {
    const { isBookmarked, toggleBookmark } = useAuth();
    const bookmarked = isBookmarked(cert.id);

    return (
        <article
            data-id={cert.id}
            data-role={`${cert.role} all`}
            className="card relative reveal-on-scroll
                bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg flex flex-col border border-gray-700 
                hover:border-yellow-500 hover:shadow-yellow-500/20 transform hover:-translate-y-1 
                transition-all duration-300 ease-in-out
                flex-grow-0 flex-shrink-0 basis-full md:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]
                p-6"
        >
            <button
                onClick={(e) => { e.preventDefault(); toggleBookmark(cert.id); }}
                className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 transition-colors focus:outline-none z-20 p-1"
                aria-label={bookmarked ? "Remove bookmark" : "Save for later"}
            >
                <i className={`${bookmarked ? "fa-solid" : "fa-regular"} fa-bookmark text-xl`}></i>
            </button>

            <h3 id={`${cert.id}-title`} className="text-xl font-bold text-yellow-300 mb-2 pr-8">{cert.title}</h3>
            <p className="text-gray-400 flex-grow mb-6 text-sm">{cert.description}</p>

            <div className="mt-auto space-y-2">
                {cert.links.map((link: any) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="block text-sm text-center w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 truncate">
                        {link.label}
                    </a>
                ))}
            </div>
        </article>
    );
});

const CertificationsSection: React.FC = () => (
    <Section id="certifications" title="Certifications" description="Prepare for industry-recognized certifications to advance your career." aria-label="Certifications for Various Roles" isFilterable={true}>
        <div className="flex flex-wrap justify-center gap-6">
            {certificationData.map(cert => <CertCard key={cert.id} cert={cert} />)}
        </div>
    </Section>
);

export default CertificationsSection;