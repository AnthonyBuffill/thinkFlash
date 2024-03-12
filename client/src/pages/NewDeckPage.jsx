import { useEffect, useState } from "react";
import Form from "../components/Form";
import { QUERY_CREATECARDS } from "../utils/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ADD_DECK } from "../utils/mutations";
export default function NewDeckPage() {
    
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
        console.log(variables)
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
            if(!flashCards){
                setFlashCards(JSON.parse(data.createCards)['flashcards']);
                setState('addCard');
            }
            else{
                setFlashCards([
                    ...flashCards, ...JSON.parse(data.createCards)['flashcards']
                ]);
                setState('addCard');
            }
        }
    }, [loading, data]);
    useEffect(()=>{
        console.log(addDeckObj);
        if(!addDeckObj.loading){
            if(addDeckObj.data){
                const id = addDeckObj.data.addDeck._id;
                console.log("DECK ID: " + id);
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
        <button onClick={saveDeck}>Save Deck</button>
        <h3 style={styles.title}>{deckInfo.title}</h3>
        {error &&
        <h2>Issue with createing Flash Cards.</h2>
        }
        {flashCards && flashCards.length > 0 && (
            
            <div style={styles.container}>
                <div style={styles.cardContainer}>
                {flashCards.map((jsonData, index) => (
                <div style={styles.card} key={index}>
                    <p>{jsonData.frontText}</p>
                    <hr></hr>
                    <p>{jsonData.backText}</p>
                </div>))
                }
                </div>
            </div>
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
    }
  }