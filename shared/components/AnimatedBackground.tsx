import React, { useEffect, useState, memo } from "react";

interface Star {
    id: number;
    top: string;
    left: string;
    size: number;
    duration: number;
    delay: number;
    drift: number;
    layer: number;
}

interface Particle {
    id: number;
    top: string;
    left: string;
    size: number;
    duration: number;
    delay: number;
    xStart: string;
    xEnd: string;
}

const TOTAL_STARS = 350;
const STAR_LAYERS = [0.4, 0.7, 1.0];

const AnimatedBackground: React.FC = () => {
    const [stars, setStars] = useState<Star[]>([]);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const allStars: Star[] = [];

        for (let i = 0; i < TOTAL_STARS; i++) {
            const layerIndex = i % 3;
            const depth = STAR_LAYERS[layerIndex];

            allStars.push({
                id: i,
                layer: layerIndex + 1,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                size: (Math.random() * 1.4 + 0.5) * depth * 1.6,
                duration: (Math.random() * 3 + 2) * depth,
                delay: Math.random() * 4,
                drift: Math.random() * 8 * depth
            });
        }

        setStars(allStars);

        const p: Particle[] = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 20 + 15,
            delay: Math.random() * 6,
            xStart: `${Math.random() * 20 - 10}vw`,
            xEnd: `${Math.random() * 20 - 10}vw`
        }));

        setParticles(p);
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="stars absolute inset-0"></div>
            <div className="galaxy absolute inset-0 opacity-50"></div>

            {stars.map((s) => (
                <div
                    key={s.id}
                    className={`star absolute rounded-full opacity-80`}
                    style={{
                        top: s.top,
                        left: s.left,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        animation: `
              twinkle ${s.duration}s ease-in-out ${s.delay}s infinite,
              starDrift ${20 + s.drift}s linear ${s.delay}s infinite
            `,
                        filter:
                            s.layer === 3
                                ? "drop-shadow(0 0 6px rgba(255,255,255,0.7))"
                                : s.layer === 2
                                    ? "drop-shadow(0 0 3px rgba(255,255,255,0.5))"
                                    : "none",
                    }}
                />
            ))}

            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle absolute bg-white/40 rounded-full"
                    style={{
                        top: p.top,
                        left: p.left,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        animationName: "floatParticle",
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                        animationIterationCount: "infinite",
                        animationTimingFunction: "linear",
                        "--x-start": p.xStart,
                        "--x-end": p.xEnd,
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
};

export default memo(AnimatedBackground);
