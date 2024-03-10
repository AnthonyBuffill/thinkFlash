import React from "react";
import DeckStack from "../components/DeckStack";
import '../assets/css/dashboard.css'
export default function DashboardPage() {

    const title = 'TITLE EXAMPLE'
    return (
        <>
        <main>
            <section className="dash-nav-container">
                <button>
                    <a href="/newDeck">+ create new</a>
                </button>
            </section>
            <section className="decks-container">

           <DeckStack title ={title}/>
            </section>
            <section>

            </section>
            
        </main>
        </>
    )
}