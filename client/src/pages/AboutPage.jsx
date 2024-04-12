import Card from '../components/Card';
import '../assets/css/about.css'
import { Link } from 'react-router-dom';
export default function AboutPage() {
  const flipCardEx = {
    frontText: 'How does it Work?',
    backText: 'Experience a new way to learn with our flash cards generated with the power of AI, personalized to your desired content, the power to create the optimum enviroment to meet your needs in whatever landscape of your choosing, you can seemglessly create a deck of flash cards for all your studying preparation and entertainment needs'
  }
  return (
    <>
      <section className='hero-container'>
        <header>
          <h1>
          Where <span>Intelligence</span> meets  <span>intuition</span> in the world of <span>Digital learning</span>.
          </h1>
        </header>
        <figure>
          <img src="/assets/ThinkFlashTransparent.png" alt="transparent flash cards image" />
        </figure>
      </section>
      <section className='brain-power'>
        <header >
          <h1>
            Boost Your <span>Brain Power</span>
          </h1>
          <div>
          <Link style={{textDecoration:'none'}} to={'/newDeck'}><button>Try it out!</button></Link>
          </div>
        </header>
        <figure className='main-flip-card-container'>
          <Card frontText={flipCardEx.frontText} backText={flipCardEx.backText}/>
        </figure>
        
      </section>
    </>
  );
}
