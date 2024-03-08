import React from "react";
import '../assets/css/deck.css'
export default function DeckPage() {
    return (
        <>
        <main>
            <section className="dash-nav-container">
                <button>
                    <a href="/addCard">+ add card</a>
                </button>
                <button>
                    <a href="/addCard"> play</a>
                </button>
            </section>

            <section>CARDS</section>
            
        </main>
        </>
    )
}