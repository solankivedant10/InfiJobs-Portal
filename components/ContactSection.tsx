import React from 'react';
import Section from './Section';
import CyclingText from './CyclingText';
import { useTheme } from '../shared/hooks';

const cyclingMessages = [
    "We value your feedback and support.",
    "Reach out with questions or suggestions.",
    "Our team is here to assist you."
];

const ContactSection: React.FC = () => {
    const [theme] = useTheme();
    const iconColor = theme === 'light' ? '000000' : 'ffffff';

    const contactDetails = [
        { href: "https://infijobs.pro/", icon: `https://img.icons8.com/ios-filled/50/${iconColor}/domain.png`, label: "Visit Our Portal" },
        { href: "https://www.linkedin.com/company/infijobs", icon: `https://img.icons8.com/ios-filled/50/${iconColor}/linkedin.png`, label: "Follow us on LinkedIn" },
        { href: "mailto:wecare@infijobs.pro", icon: `https://img.icons8.com/ios-filled/50/${iconColor}/new-post.png`, label: "wecare@infijobs.pro" },
        { href: "tel:+17188146110", icon: `https://img.icons8.com/ios-filled/50/${iconColor}/phone.png`, label: "+1-718-814-6110" },
    ];

    return (
        <Section id="contact" title="Contact Us" description={<CyclingText messages={cyclingMessages} />} aria-label="Contact Us section">
            <div className="max-w-lg mx-auto bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-700">
                <ul className="space-y-6">
                    {contactDetails.map(item => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-5 group p-3 rounded-lg hover:bg-white/5 transition-all duration-300"
                            >
                                <div className="w-10 h-10 flex items-center justify-center bg-gray-700/50 rounded-full group-hover:bg-purple-500/20 transition-colors">
                                    <img src={item.icon} alt="" className="w-6 h-6 transition-transform transform group-hover:scale-110" />
                                </div>
                                <span className="text-gray-300 group-hover:text-purple-300 font-medium text-lg transition-colors">
                                    {item.label}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
};

export default ContactSection;