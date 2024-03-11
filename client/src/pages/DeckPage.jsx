import React, {useState} from "react";
import '../assets/css/deck.css'


function Card() {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlipCard = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <section className="deck-flip-card-container" onClick={handleFlipCard}>
            <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`} >
                <figure className="flip-card-front">
                    <h3>Front Card Question</h3>
                </figure>
                <figure className="flip-card-back">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet accusantium cupiditate voluptatibus laborum unde dolorem, alias, fugiat sint minima praesentium odit delectus doloremque earum, recusandae commodi excepturi? Voluptatem, commodi obcaecati!</p>
                </figure>
            </div>
        </section>
    );
}

export default function DeckPage() {

    return (
        <>
        <main>
            <section className="dash-nav-container">
                <button>
                    <a href="/addCard">+ add card</a>
                </button>
                <button>
                    <a href="/play"> play</a>
                </button>
            </section>

            <section  className="cards-container">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
            </section>
            
        </main>
        </>
    )
}