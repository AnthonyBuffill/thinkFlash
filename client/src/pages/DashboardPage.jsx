import React from "react";
import '../assets/css/dashboard.css'
export default function DashboardPage() {
    return (
        <>
        <main>
            <section className="dash-nav-container">
                <button>
                    <a href="/newDeck">+ create new</a>
                </button>
            </section>
            ------------------------
            <section>Decks</section>
            
        </main>
        </>
    )
}