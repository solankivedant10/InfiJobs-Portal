import React, { useState, useEffect, useRef } from 'react';
import Section from './Section';
import { roadmapData } from '../data/mockData';
import { getRoadmapProgressSync, saveRoadmapStep } from '../services/roadmapService';

const roles = [
  { id: 'ba', label: 'Business Analyst' },
  { id: 'da', label: 'Data Analyst' },
  { id: 'ds', label: 'Data Scientist' },
  { id: 'de', label: 'Data Engineer' },
  { id: 'fa', label: 'Financial Analyst' },
  { id: 'bi', label: 'Business Intelligence' },
  { id: 'sc', label: 'Supply Chain Analyst' },
  { id: 'jf', label: 'Java Full Stack' },
  { id: 'fd', label: 'Frontend Developer' },
] as const;

type RoleId = (typeof roles)[number]['id'];

const roleAccent: Record<RoleId, { tab: string; dot: string; lineFrom: string; lineTo: string; }> = {
  ba: { tab: 'bg-purple-600 border-purple-400 shadow-purple-500/40', dot: 'bg-purple-400', lineFrom: '#a855f7', lineTo: '#22c55e' },
  da: { tab: 'bg-cyan-600 border-cyan-400 shadow-cyan-500/40', dot: 'bg-cyan-400', lineFrom: '#22d3ee', lineTo: '#3b82f6' },
  ds: { tab: 'bg-violet-600 border-violet-400 shadow-violet-500/40', dot: 'bg-violet-400', lineFrom: '#8b5cf6', lineTo: '#ec4899' },
  de: { tab: 'bg-blue-600 border-blue-400 shadow-blue-500/40', dot: 'bg-blue-400', lineFrom: '#3b82f6', lineTo: '#22d3ee' },
  fa: { tab: 'bg-emerald-600 border-emerald-400 shadow-emerald-500/40', dot: 'bg-emerald-400', lineFrom: '#22c55e', lineTo: '#facc15' },
  bi: { tab: 'bg-amber-600 border-amber-400 shadow-amber-500/40', dot: 'bg-amber-400', lineFrom: '#fbbf24', lineTo: '#22d3ee' },
  sc: { tab: 'bg-lime-600 border-lime-400 shadow-lime-500/40', dot: 'bg-lime-400', lineFrom: '#84cc16', lineTo: '#22d3ee' },
  jf: { tab: 'bg-orange-600 border-orange-400 shadow-orange-500/40', dot: 'bg-orange-400', lineFrom: '#fb923c', lineTo: '#f97316' },
  fd: { tab: 'bg-pink-600 border-pink-400 shadow-pink-500/40', dot: 'bg-pink-400', lineFrom: '#ec4899', lineTo: '#a855f7' }
};

const roleIcons: Record<RoleId, string> = {
  ba: 'fa-solid fa-clipboard', da: 'fa-solid fa-chart-line', ds: 'fa-solid fa-brain',
  de: 'fa-solid fa-database', fa: 'fa-solid fa-coins', bi: 'fa-solid fa-chart-pie',
  sc: 'fa-solid fa-truck', jf: 'fa-solid fa-code', fd: 'fa-solid fa-laptop-code'
};

const LearningPathSection: React.FC = () => {
  const [activeRole, setActiveRole] = useState<RoleId>('ba');
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Load roadmap progress using service (synchronous for now, will be async in backend migration)
    const savedProgress = getRoadmapProgressSync();
    setCheckedSteps(savedProgress);
  }, []);

  // Optimized Scroll Handler
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) {
          rafId = 0;
          return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const total = viewportHeight + rect.height;
        const progressed = Math.min(Math.max(viewportHeight - rect.top, 0), total);
        const progress = total > 0 ? progressed / total : 0;

        setScrollProgress(progress);

        const centerOffset = rect.top + rect.height / 2 - viewportHeight / 2;
        setParallaxY(centerOffset * -0.05);

        rafId = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleCheck = async (id: string, isChecked: boolean) => {
    setCheckedSteps(prev => ({ ...prev, [id]: isChecked }));
    // Use roadmapService (will be replaced with API call in backend migration)
    await saveRoadmapStep(id, isChecked);
  };

  const currentSteps = roadmapData[activeRole] || [];
  const activeTheme = roleAccent[activeRole];
  const gradientAngle = 140 + scrollProgress * 180;

  return (
    <Section
      id="learning-paths"
      title="Your Learning Roadmap"
      description="Follow a step-by-step guide to master your chosen career path. Track your progress through essential skills and milestones."
      aria-label="Learning Roadmap"
      className="reveal-on-scroll py-12 bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg rounded-xl my-16"
    >
      <div
        ref={containerRef}
        className="relative transform-gpu transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10" role="tablist">
          {roles.map((role) => {
            const isActive = activeRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                role="tab"
                aria-selected={isActive}
                className={`
                  px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2 flex items-center gap-2
                  ${isActive
                    ? `${activeTheme.tab} text-white shadow-lg scale-105`
                    : 'bg-gray-800/80 border-gray-600 text-gray-300 hover:border-blue-400 hover:text-white hover:shadow-md'
                  }
                `}
              >
                <i className={`${roleIcons[role.id]} text-xs`} aria-hidden="true" />
                <span>{role.label}</span>
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto mt-8 relative px-4">

          {/* Animated Vertical Line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-1 rounded-full opacity-80 transition-all duration-700"
            style={{
              background: `linear-gradient(${gradientAngle}deg, ${activeTheme.lineFrom}, ${activeTheme.lineTo})`,
              boxShadow: '0 0 20px rgba(129, 140, 248, 0.35)'
            }}
          />

          <div className="space-y-8">
            {currentSteps.map((step) => {
              const isChecked = !!checkedSteps[step.id];
              return (
                <div key={step.id} className="relative flex items-start pl-12 group">
                  {/* Timeline Dot */}
                  <div
                    className={`
                        absolute left-[1.65rem] top-1 w-5 h-5 rounded-full border-4 border-gray-900 z-10 transition-colors duration-300
                        ${isChecked ? 'bg-emerald-500 border-emerald-900' : activeTheme.dot}
                    `}
                    style={{ transform: 'translateX(-50%)' }}
                  />

                  {/* Step Card */}
                  <div className={`
                        w-full p-5 rounded-xl border transition-all duration-300
                        ${isChecked
                      ? 'bg-emerald-900/20 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:shadow-lg'
                    }
                  `}>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className={`text-lg font-bold mb-1 transition-colors ${isChecked ? 'text-emerald-400 line-through decoration-emerald-500/50' : 'text-white'}`}>
                          {step.step}
                        </h4>
                        <p className={`text-sm ${isChecked ? 'text-emerald-200/70' : 'text-gray-400'}`}>
                          {step.desc}
                        </p>
                      </div>
                      <label className="relative flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={isChecked}
                          onChange={(e) => handleCheck(step.id, e.target.checked)}
                        />
                        <div className="w-6 h-6 bg-gray-800 border-2 border-gray-500 rounded peer-checked:bg-emerald-500 peer-checked:border-emerald-400 transition-all flex items-center justify-center">
                          <i className="fa-solid fa-check text-white text-xs opacity-0 peer-checked:opacity-100"></i>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default LearningPathSection;