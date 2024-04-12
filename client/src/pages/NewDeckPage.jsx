import { useEffect, useState } from "react";
import Form from "../components/Form";
import { QUERY_CREATECARDS } from "../utils/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ADD_DECK } from "../utils/mutations";
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card'
import Auth from '../utils/auth';

export default function NewDeckPage() {
    const navigate = useNavigate();
    const [addDeckMutation, addDeckObj] = useMutation(ADD_DECK);
    const saveDeck = () =>{
        if(!flashCards)
            return;
        
        addDeckMutation({
            variables : {
                title:deckInfo.title,
                description: deckInfo.description,
                cardData: JSON.stringify(flashCards)
            },
        });

        setFlashCards([]);
        setState('saving');
    }
    const [deckInfo, setInfo] = useState({
        title:'',
        description: '',
      });
    const [frontText, setFrontText] = useState('');
    const [backText, setBackText] = useState('');
    
    const generateCards = (cardCount)=>{
        cardCount = parseInt(cardCount, 10);
        if(isNaN(cardCount))
            cardCount = 10;
        const variables = { 
            title: deckInfo.title, 
            frontText:frontText, 
            backText: backText,
            cardCount: cardCount
        };
        
        getCards({variables});
    }
    const addCard = () =>{
        if(flashCards){
            setFlashCards([
                ...flashCards, {frontText: frontText, backText: backText}
            ]);
        }else{
            setFlashCards([{frontText: frontText, backText: backText}]);
        }
        setState('addCard');
    }
    const [getCards, { loading, error, data }] = useLazyQuery(QUERY_CREATECARDS,{
        fetchPolicy: 'network-only'
    });
    const [flashCards, setFlashCards] = useState(null);
    const [state, setState] = useState('generate');
    const setBackToGenerate = () =>{
        setState('generate');
    };
    useEffect(() => {
        if(!loading && data){
            
            const createCards = JSON.parse(data.createCards);
            
            if(createCards.message !== undefined)
            {
                console.log(createCards.message);
                navigate(`/login`);
                return;
            }
            let cards = createCards.flashCards;
            if(cards === undefined)
                cards = createCards.flashcards;
            if(!flashCards){
                setFlashCards(cards);
                setState('addCard');
            }
            else{
                setFlashCards([
                    ...flashCards, ...cards
                ]);
                setState('addCard');
            }
        }
    }, [loading, data]);
    useEffect(()=>{
        if(!addDeckObj.loading){
            if(addDeckObj.data){
                
                if(addDeckObj.data.addDeck._id === null){
                    navigate(`/login`);
                    return;
                }
                const id = addDeckObj.data.addDeck._id;
                setState('saving');
                window.location.assign(`/deck/${id}/${Auth.getUser()?.data._id}`);
                return;
            }
            if(addDeckObj.error){
                console.log("Error Saving deck");
            }
        }
    }, [addDeckObj]);

    let value = 'START';
    if(state === 'addCard')
        value = 'ADDCARD_FRONT';
    else if(flashCards)
        value = 'GENERATE';
    return (
    <>
    {state === 'generate' && (
        <Form formState={value} newDeck={{setInfo, setFrontText, setBackText, generateCards, addCard}}></Form>
    )}
    {state === 'addCard' && (
        <Form formState={value} addCard={{setFrontText, setBackText, addCard, setBackToGenerate}}></Form>
    )}
    {state === 'saving' && (
        <Form formState='SAVING' saving={{title:"Saving", text:`Saving ${deckInfo.title}`}}></Form>
    )}
        
        {error &&
        <h2>Issue with createing Flash Cards.</h2>
        }
        {flashCards && flashCards.length > 0 && (
            <>
                <h3 style={styles.title}>{deckInfo.title}</h3>
            
                <div style={styles.container}>
                    <div style={styles.cardContainer}>
                    {flashCards.map((jsonData, index) => (
                        <Card key={index} frontText={jsonData.frontText} backText={jsonData.backText}/>
                    
                    ))
                    }
                    </div>
                </div>
                {(!loading || !addDeckObj.loading) && (
                    <div className="form-container">
                    <button onClick={saveDeck}>Save Deck</button>
                    </div>
                )}
            </>
        )}
    </>
    )
}
const styles = {
    title:{
        textAlign: 'center',
        fontSize: '32px',
        padding: '10px'
    },
    container:{
        margin: '32px auto',
        maxWidth: '1200px',
        textAlign: 'center'
    },
    label:{
      display:'block',
      padding:'10px'
    },
    cardContainer:{
      display:'flex',
      flexWrap: 'wrap',
      gap: '5px',
      justifyContent: 'center'
    },
    card:{
      padding: '10px',
      border: 'solid black 2px',
      width: '150px',
      height: '250px'
    },
  }