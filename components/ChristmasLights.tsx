
import React from 'react';

const ChristmasLights: React.FC = () => {
    const colors = ['#dc2626', '#16a34a', '#fbbf24', '#3b82f6', '#a855f7'];
    const lightCount = 50;
    
    const lights = Array.from({ length: lightCount }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      delay: `${Math.random() * 2}s`,
    }));

    const css = `
        .light-bulb {
            animation-name: blink;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            animation-duration: 2s;
        }

        @keyframes blink {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
        }
    `;

    return (
        <>
            <style>{css}</style>
            <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-10" aria-hidden="true">
            <svg width="100%" height="40">
                <path
                d="M 0,20 Q 50,10 100,20 T 200,20 T 300,20 T 400,20 T 500,20 T 600,20 T 700,20 T 800,20 T 900,20 T 1000,20 T 1100,20 T 1200,20 T 1300,20 T 1400,20 T 1500,20 T 1600,20 T 1700,20 T 1800,20 T 1900,20 T 2000,20"
                stroke="#0F172A"
                strokeWidth="2"
                fill="none"
                />
                
                {lights.map((light) => {
                const x = `${(light.id / lightCount) * 100}%`;
                const y = 20 + Math.sin(light.id * 0.5) * 5;
                
                return (
                    <g key={light.id}>
                    <circle
                        className="light-bulb"
                        cx={x}
                        cy={y}
                        r="8"
                        fill={light.color}
                        style={{ animationDelay: light.delay }}
                    />
                     <line
                        x1={x}
                        y1="20"
                        x2={x}
                        y2={y - 8}
                        stroke="#0F172A"
                        strokeWidth="1"
                    />
                    </g>
                );
                })}
            </svg>
            </div>
        </>
    );
};

export default ChristmasLights;
