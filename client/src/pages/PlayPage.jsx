import React, {useState} from "react";
import '../assets/css/play.css'

export default function PlayPage() {
    const [isFlipped, setIsFlipped] = useState(false);
    
    let [cards, setCards]= useState(dummyCards)
    let [wrong, setWrong] = useState([])
    let [index, setIndex]= useState(0)
    
    const dummyCards =   [
        {
            front: "What is the capital of France?",
            back: "Paris"
        },
        {
            front: "What is the tallest mountain in the world?",
            back: "Mount Everest"
        },
        {
            front: "Who wrote 'To Kill a Mockingbird'?",
            back: "Harper Lee"        
        }
       
    ];

    function restDeck (){
        setCards(wrong)
        setWrong([])
        setIndex(0)
    }
    // handle correct answer and renders next card
    const handleCorrectAnswer = () => {
        if(index < cards.length-1){
           setIndex(++index)
        }else{
          restDeck()
        }
        setIsFlipped(false)
    }
    //handles wrong answers pushes it to a new deck to go over again
    const handleWrongAnswer = (card) => {
        wrong.push(card)
        setWrong(wrong)
        if(index < cards.length-1){
            setIndex(++index)
        }else{            
            restDeck()
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
       {index <= cards.length-1 ?(
        <section className="play-flip-card-container">
            <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`} onClick={handleFlipCard}>
                <figure className="flip-card-front">
                    <h2>{cards[index].front}</h2>
                </figure>
                <figure className="flip-card-back">
                    <h2>{cards[index].front}</h2>
                    <p>{cards[index].back}</p>
                </figure>
            </div>
            {isFlipped &&
            <section className="play-buttons">
                <button className="wrong"onClick={() =>handleWrongAnswer(cards[index])}>wrong</button>
                <button className="right" onClick={handleCorrectAnswer}>right</button>
            </section>                 
           }
        </section>
       ):(
        /// End of Cards Visual
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