import React, { useState } from "react";


export default function Card({frontText, backText}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const handleFlipCard = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <section className="deck-flip-card-container" onClick={handleFlipCard}>
            <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`} >
                <figure className="flip-card-front">
                    <h3>{frontText}</h3>
                </figure>
                <figure className="flip-card-back">
                    <p>{backText}</p>
                </figure>
            </div>
        </section>
    );
}



