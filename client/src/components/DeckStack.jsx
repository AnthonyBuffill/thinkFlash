import React from "react";
import '../assets/css/deckStack.css'
export default function DeckStack(props) {
    return (
        <>
        <section>
            <figure className="outerDeckStack">
                <figure className="innerDeckStack">
                    <h2>{props.title}</h2>
                </figure>
            </figure>           
        </section>
        </>
    )
}