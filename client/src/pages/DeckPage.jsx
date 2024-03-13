import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import '../assets/css/deck.css'
import { useQuery } from '@apollo/client';
import {QUERY_SINGLE_USER} from '../utils/queries'
import Card from "../components/Card";

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
                    <a href={`/newDeck`}>+ new deck</a>
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