import React, {useState} from "react";
import '../assets/css/play.css'

export default function PlayPage() {
    // tracks card's flip state
    const [isFlipped, setIsFlipped] = useState(false);

    // flip card functionality
    const handleFlipCard = () => {
        setIsFlipped(!isFlipped);
    }

    return (
        <>
        <section className="play-flip-card-container">
            <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`} onClick={handleFlipCard}>
                <figure className="flip-card-front">
                    <h2>Front Card Question</h2>
                </figure>
                <figure className="flip-card-back">
                    <h2>Front Card's Question</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet accusantium cupiditate voluptatibus laborum unde dolorem, alias, fugiat sint minima praesentium odit delectus doloremque earum, recusandae commodi excepturi? Voluptatem, commodi obcaecati!
                    Quos, est necessitatibus praesentium quis obcaecati labore exercitationem doloremque ad officia iusto beatae possimus sequi excepturi fugit minus aliquam dolorem nulla. Officia, velit obcaecati eligendi earum laudantium assumenda ex quis!
                    Nesciunt magnam eos totam, quis, illum ab aperiam facere fugiat ex quia corporis debitis saepe ipsa dignissimos, voluptas recusandae nisi cupiditate. Quam iure voluptatum magnam, quisquam adipisci illum cum atque?</p>
                </figure>
            </div>
            {isFlipped &&
            <section>
                <button>wrong</button>
                <button>right</button>
            </section>                 
            }
        </section>
        </>
    )
}