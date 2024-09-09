import React from 'react';

const F1Lights = ({ litLights }) => (
    <div className="f1-lights">
        <div className="back-board"></div>
        {[...Array(5)].map((_, i) => (
            <div key={i} className={`light-strip ${i < litLights ? 'on' : ''}`}>
                {[...Array(4)].map((_, j) => (
                    <div key={j} className="light"></div>
                ))}
            </div>
        ))}
    </div>
);

export default F1Lights;