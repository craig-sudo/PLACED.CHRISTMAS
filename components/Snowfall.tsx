
import React from 'react';

const Snowfall: React.FC = () => {
    const snowflakeCount = 50;
    const snowflakes = Array.from({ length: snowflakeCount }).map((_, i) => {
        const style = {
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 10 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.5 + 0.3,
            transform: `scale(${Math.random() * 0.5 + 0.5})`,
        };
        return <div key={i} className="snowflake" style={style}>❄</div>;
    });

    const css = `
        .snowflake {
            color: #fff;
            font-size: 1.5em;
            position: fixed;
            top: -10%;
            z-index: 10;
            pointer-events: none;
            animation-name: snowfall;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }

        @keyframes snowfall {
            0% {
                transform: translate3d(0, 0, 0);
            }
            100% {
                transform: translate3d(${Math.random() > 0.5 ? '' : '-'}15px, 105vh, 0);
            }
        }
    `;

    return (
        <>
            <style>{css}</style>
            <div className="fixed inset-0 pointer-events-none z-10" aria-hidden="true">
                {snowflakes}
            </div>
        </>
    );
};

export default Snowfall;
