import { useState } from "react";
import AddDeck from "./AddDeck";
import AddDeckFrontText from "./AddDeckFrontText";
import AddDeckBackText from "./AddDeckBackText";
import AddDeckGenerate from "./AddDeckGenerate";

export default function AddDeckForm({state, onClick, actions, newDeck}){
  // const [deckInfo, setInfo] = useState({
  //   title:'',
  //   description: '',
  // });
  // const [frontText, setFrontText] = useState('');
  // const [backText, setBackText] = useState('');
  // const generateValues = (cardCount)=>{
    // console.log(deckInfo, frontText, backText, cardCount);
    // cardCount = parseInt(cardCount, 10);
    // if(isNaN(cardCount))
    //   cardCount = 10;

    // getCards({variables: { 
    //   title: deckInfo.title, 
    //   frontText:frontText, 
    //   backText: backText,
    //   cardCount: cardCount
    // }});
  // }

  return (
    <div>
      {state === actions.start && 
        <AddDeck onClick={onClick} setInfo={newDeck.setInfo} />
        // <AddDeckForm onClick={onClick}/>
      }
      {/*  ENTER FIRST QUESTION*/}
      {state === actions.front &&
        <AddDeckFrontText onClick={onClick} setFrontText={newDeck.setFrontText} />
      }
      {/* ENTER ANSWER */}
      {state === actions.back &&
        <AddDeckBackText onClick={onClick} setBackText={newDeck.setBackText}/>
      }
      {/* GENERATE NEW DECK FORM OR CREATE OWN */}
      {state === actions.generate &&
        <AddDeckGenerate finished={newDeck.finished}/>
      }
    </div>
  );
}