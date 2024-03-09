import React from "react";

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

            <section>CARDS</section>
            
        </main>
        </>
    )
}