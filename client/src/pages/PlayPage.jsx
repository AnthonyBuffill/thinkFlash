import React, {useState, useEffect} from "react";
import '../assets/css/play.css'
import { useQuery } from '@apollo/client';
import {QUERY_SINGLE_USER} from '../utils/queries'

export default function PlayPage() {
    const [isFlipped, setIsFlipped] = useState(false);

    // gets card data from server
    const { loading, data } = useQuery(QUERY_SINGLE_USER, {
        variables: { userId:  "65efc7c9acf7312c2ae24ce5" },  //userId
      });
    const deck =  data?.user?.decks|| [];
    const findDecK = deck?.find((arr)=> arr._id ==='65efc7c9acf7312c2ae24cb6');

    const cardsFromData = findDecK?.cards || []
    console.log(cardsFromData) 
    

    let [cards, setCards]= useState([])
    let [wrongDeck, setWrongDeck] = useState([])
    let [index, setIndex]= useState(0)
    
    useEffect(() => {
        setCards(cardsFromData);
    }, [cardsFromData]);
    // resets deck and replays wrongDeck answers
    function resetDeck (){
        setCards(wrongDeck)
        setWrongDeck([])
        setIndex(0)
    }
    // handle correct answer and renders next card
    const handleCorrectAnswer = () => {
        if(index < cards.length-1){
           setIndex(++index)
        }else{
          resetDeck()
        }
        setIsFlipped(false)
    }
    //handles wrongDeck answers pushes it to a new deck to go over again
    const handlewrongDeckAnswer = (card) => {
        wrongDeck.push(card)
        setWrongDeck(wrongDeck)
        if(index < cards.length-1){
            setIndex(++index)
        }else{            
            resetDeck()
        }
        setIsFlipped(false)
    }
    // flip card functionality
    const handleFlipCard = () => {
        setIsFlipped(!isFlipped);
    }

    return (
        <>
        {/* render flash cards */}
       {cards && index <= cards.length-1 ?(
        <section className="play-flip-card-container">
            <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`} onClick={handleFlipCard}>
                <figure className="flip-card-front">
                    <h2>{cards[index].frontText}</h2>
                </figure>
                <figure className="flip-card-back">
                    <h2>{cards[index].frontText}</h2>
                    <p>{cards[index].backText}</p>
                </figure>
            </div>
            {isFlipped &&
            <section className="play-buttons">
                <button className="wrong"onClick={() =>handlewrongDeckAnswer(cards[index])}>wrong</button>
                <button className="right" onClick={handleCorrectAnswer}>right</button>
            </section>                 
           }
        </section>
       ):(
        // End of Cards Visual
        <section className="play-flip-card-container">
        <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`} onClick={handleFlipCard}>
            <figure className="flip-card-front">
                <h2>END</h2>
            </figure>
            <figure className="flip-card-back">
                <h2>END</h2>
            </figure>
        </div>
    </section>
       ) }
        </>
    )
}