import React, { useState, useEffect } from 'react';

const MouseGlow = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            className="mouse-glow"
            style={{
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`
            }}
        />
    );
};

export default MouseGlow;
