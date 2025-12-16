import React, { useState, useEffect, useRef } from 'react';
import Section from './Section';
import CyclingText from './CyclingText';

const cyclingMessages = [
    "Engage with peers and experts of Software & Data Domain.",
    "Share ideas and get help on Software & Data topics.",
    "Earn badges and progress in your learning journey."
];

// LinkedIn video embed URLs
const linkedInVideos = [
    "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7404152977575415809?compact=1&autoplay=1&muted=1",
    "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7401690904354271233?compact=1&autoplay=1&muted=1",
    "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7397349060447211520?compact=1&autoplay=1&muted=1",
    "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7394741427081039872?compact=1&autoplay=1&muted=1"
];

const AUTO_ROTATE_INTERVAL = 30000; // 30 seconds

const CommunitySection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // IntersectionObserver for visibility detection
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.3 } // Trigger when 30% of the section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Auto-rotation timer
    useEffect(() => {
        // Clear any existing timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        // Only start timer if section is visible
        if (isVisible) {
            timerRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % linkedInVideos.length);
                setIsLoading(true); // Show loading for next video
            }, AUTO_ROTATE_INTERVAL);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isVisible]);

    // Manual navigation handlers
    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? linkedInVideos.length - 1 : prevIndex - 1
        );
        setIsLoading(true);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % linkedInVideos.length);
        setIsLoading(true);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsLoading(true);
    };

    return (
        <Section
            id="community"
            title="Help & Tips"
            description={<CyclingText messages={cyclingMessages} />}
            aria-label="Community features"
            className="reveal-on-scroll"
        >
            <div ref={sectionRef} className="flex justify-center">
                <div className="w-full max-w-xl">
                    {/* Video Container */}
                    <div className="relative bg-gray-800/50 rounded-lg shadow-lg overflow-hidden pb-[75%] border border-gray-700">
                        {/* Loading Skeleton */}
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-20">
                                <i className="fa-solid fa-circle-notch fa-spin text-4xl text-blue-500"></i>
                            </div>
                        )}

                        {/* LinkedIn Iframe */}
                        <iframe
                            key={currentIndex} // Force re-render on index change
                            src={linkedInVideos[currentIndex]}
                            className="absolute top-0 left-0 w-full h-full z-10"
                            frameBorder="0"
                            allowFullScreen={true}
                            title={`LinkedIn post ${currentIndex + 1}`}
                            onLoad={() => setIsLoading(false)}
                        />

                        {/* Previous Button */}
                        <button
                            onClick={goToPrevious}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-gray-900/80 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                            aria-label="Previous video"
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={goToNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-gray-900/80 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                            aria-label="Next video"
                        >
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                        {linkedInVideos.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-blue-500 w-8'
                                    : 'bg-gray-600 hover:bg-gray-500'
                                    }`}
                                aria-label={`Go to video ${index + 1}`}
                                aria-current={index === currentIndex ? 'true' : 'false'}
                            />
                        ))}
                    </div>

                    {/* Video Counter */}
                    <div className="text-center mt-2 text-sm text-gray-400">
                        {currentIndex + 1} / {linkedInVideos.length}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default CommunitySection;