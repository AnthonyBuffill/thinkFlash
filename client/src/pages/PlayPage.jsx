import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import '../assets/css/play.css'
import { useQuery } from '@apollo/client';
import {QUERY_SINGLE_USER} from '../utils/queries'

export default function PlayPage() {
    const [isFlipped, setIsFlipped] = useState(false);

    const {deckId, userId} = useParams()
        // gets card data from server
        const { loading, data } = useQuery(QUERY_SINGLE_USER, {
            variables: { userId:  userId },  
        });
        
    

    let [cards, setCards]= useState([])
    let [wrongDeck, setWrongDeck] = useState([])
    let [index, setIndex]= useState(0)
    const delayedSetIndex = (value) => {
        setTimeout(() => {
            setIndex(value);
        }, 200);
    };
    const shuffleArray = (array) => {
        const newArray = [];
        let holdArray = [...array];
        while(holdArray.length > 0){
            const ran = Math.floor(Math.random() * holdArray.length);
            newArray.push(holdArray[ran]);
            holdArray.splice(ran, 1);
            
        }
        return newArray;
    };
    const [cardsFromData, setCardsFromData] = useState([]);
    useEffect(() => {
        if(data){
            const deck =  data?.user?.decks|| [];
            const findDecK = deck?.find((arr)=> arr._id === deckId);
            const dataCards = findDecK?.cards || [];
            setCardsFromData(dataCards);
            setCards(shuffleArray(dataCards));
        }
        
    }, [data, deckId]);

    // resets deck and replays wrongDeck answers
    function resetDeck (){
        setCards(wrongDeck)
        setWrongDeck([])
        delayedSetIndex(0)
    }
    // handles play again functionality
    function handlePlayAgain(){
        setCards(cardsFromData)
        setWrongDeck([])
        delayedSetIndex(0)
    }
    // handle correct answer and renders next card
    const handleCorrectAnswer = () => {
        if(index < cards.length-1){
            delayedSetIndex(++index)
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
            delayedSetIndex(++index)
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
        <section className="play-buttons">
            <Link to={`/dashboard/${userId}`}>
                <button className="">Go Back to Dashboard</button>
            </Link>
                    <button className="right" onClick={handlePlayAgain}>Play Again</button>
            </section>             
    </section>
       ) }
        </>
    )
}