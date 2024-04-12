
import { Link, useParams } from 'react-router-dom';
import DeckStack from "../components/DeckStack";
import { useQuery } from '@apollo/client';
import '../assets/css/dashboard.css'
import {QUERY_SINGLE_USER} from '../utils/queries'

export default  function DashboardPage() {
    let {userId} = useParams() 
    const { loading, data } = useQuery(QUERY_SINGLE_USER, {
        variables: { userId: userId  }, 
      });
  const decks =  data?.user?.decks || [];
      const newDeckURL = `/newDeck`;
    return (
        <>
        <main>
            <section className="dash-nav-container">
                <button>
                    
                    <Link to={newDeckURL}>+ create new</Link>
                </button>
            </section>
            <section className="decks-container">
                    { decks.map(deck => (                    
                <Link key={deck._id} to={`/deck/${deck._id}/${userId}`}>
                    <DeckStack title={deck.title} deckId={deck._id}/>
                </Link>
                        ))}
            </section>
            <section>

            </section>
            
        </main>
        </>
    )
}