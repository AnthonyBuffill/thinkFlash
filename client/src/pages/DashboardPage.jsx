import React ,{useParams}from "react";
import DeckStack from "../components/DeckStack";
import { useQuery } from '@apollo/client';
import '../assets/css/dashboard.css'
import {QUERY_SINGLE_USER} from '../utils/queries'

export default  function DashboardPage() {

   
    const { loading, data } = useQuery(QUERY_SINGLE_USER, {
        variables: { userId:  "65efc7c9acf7312c2ae24ce5" }, 
      });
  const decks =  data?.user?.decks || [];

    return (
        <>
        <main>
            <section className="dash-nav-container">
                <button>
                    <a href="/newDeck">+ create new</a>
                </button>
            </section>
            <section className="decks-container">
            { decks.map(deck => (
            <DeckStack key={deck._id} title={deck.title} />
          ))}
            </section>
            <section>

            </section>
            
        </main>
        </>
    )
}