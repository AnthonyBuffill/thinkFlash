import React ,{useParams}from "react";
import DeckStack from "../components/DeckStack";
import { useQuery } from '@apollo/client';
import '../assets/css/dashboard.css'
import {QUERY_SINGLE_USER} from '../utils/queries'

export default function DashboardPage() {

   
//     const { loading, data } = useQuery(QUERY_SINGLE_USER, {
//         variables: { userId: userId || "65ef5f7f0e86df84e6e43006" }, // Assuming a default userId if not provided
//       });
//   const user = data?.user || {};


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