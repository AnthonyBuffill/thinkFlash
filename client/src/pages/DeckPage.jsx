import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import '../assets/css/deck.css'
import { useQuery } from '@apollo/client';
import {QUERY_SINGLE_USER} from '../utils/queries'

function Card({frontText, backText}) {
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

export default function DeckPage({}) {
    const {deckId, userId} = useParams()
        // gets card data from server
        const { loading, data } = useQuery(QUERY_SINGLE_USER, {
            variables: { userId:  userId },  
        });
        const deck =  data?.user?.decks|| [];
        const findDecK = deck?.find((arr)=> arr._id === deckId);
        const cardsFromData = findDecK?.cards || []
        
        let [cards, setCards]= useState([])
        
    useEffect(() => {
        if (JSON.stringify(cardsFromData) !== JSON.stringify(cards)) {
            setCards(cardsFromData);
        }
    }, [cardsFromData, cards]);

    return (
        <>
        <main>
            <section className="dash-nav-container">
                <button>
                    <a href="/addCard">+ add card</a>
                </button>
                <button>
                    <a href={`/play/${deckId}/${userId}`}> play</a>
                </button>
            </section>

            <section  className="cards-container">
        {cards && cards.map(card => (
            <Card key={card.frontText} frontText={card.frontText} backText={card.backText}/>

          ))}
   
            </section>
            
        </main>
        </>
    )
}