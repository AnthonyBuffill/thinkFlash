import { useState } from "react";
import Form from "../components/Form";
import { QUERY_CREATECARDS } from "../utils/queries";
import { useLazyQuery } from "@apollo/client";
export default function NewDeckPage() {
    
    const [deckInfo, setInfo] = useState({
        title:'',
        description: '',
      });
    const [frontText, setFrontText] = useState('');
    const [backText, setBackText] = useState('');
    
    const [getCards, { loading, error, data }] = useLazyQuery(QUERY_CREATECARDS,{
        fetchPolicy: 'network-only'
    });
    const generateCards = (cardCount)=>{
        console.log(deckInfo, frontText, backText, cardCount);
        cardCount = parseInt(cardCount, 10);
        if(isNaN(cardCount))
            cardCount = 10;

        getCards({variables: { 
        title: deckInfo.title, 
        frontText:frontText, 
        backText: backText,
        cardCount: cardCount
        }});
    }
    if(data)
        console.log(data);
  
    if(error)
        console.log(error);
    const addCard = () =>{
        if(flashCards){
            setFlashCards([
                ...flashCards, {frontText: frontText, backText: backText}
            ]);
        }else{
            setFlashCards([{frontText: frontText, backText: backText}]);
        }
    }
    const [flashCards, setFlashCards] = useState(null);
    if(data){
        if(!flashCards)
            setFlashCards(JSON.parse(data.createCards)['flashcards']);
        else if(JSON.parse(data.createCards)['flashcards'].length > flashCards.length)
            setFlashCards(JSON.parse(data.createCards)['flashcards']);
    }
    // const flashCards = data?JSON.parse(data.createCards)['flashcards'] : null;
    const value = (!flashCards)?(loading?'LOADING':'START'):'ADDCARD_FRONT';
    return (
    <>
    {!flashCards && (
        <Form formState={value} newDeck={{setInfo, setFrontText, setBackText, generateCards, addCard}}></Form>
    )}
    {flashCards && (
        <Form formState={value} addCard={{setFrontText, setBackText, addCard}}></Form>
    )}
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