import React from "react";
import '../assets/css/dashboard.css'
export default function DashboardPage() {
    return (
        <>
        <main>
            <section className="dash-nav-container">
                <button>
                    <a href="/addCard">+ add card</a>
                </button>
            </section>
            ------------------------
            <section>Decks</section>
            
        </main>
        </>
    )
}