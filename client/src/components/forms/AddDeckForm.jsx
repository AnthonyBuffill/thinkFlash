import AddDeck from "./AddDeck";
import AddFrontText from "./AddFrontText";
import AddBackText from "./AddBackText";
import AddDeckGenerate from "./AddDeckGenerate";

export default function AddDeckForm({state, onClick, actions, newDeck}){
  return (
    <div>
      {state === actions.start && 
        <AddDeck onClick={onClick} setInfo={newDeck.setInfo} />
      }
      {/*  ENTER FIRST QUESTION*/}
      {state === actions.front &&
        <AddFrontText onClick={onClick} setFrontText={newDeck.setFrontText} />
      }
      {/* ENTER ANSWER */}
      {state === actions.back &&
        <AddBackText onClick={onClick} setBackText={newDeck.setBackText}/>
      }
      {/* GENERATE NEW DECK FORM OR CREATE OWN */}
      {state === actions.generate &&
        <AddDeckGenerate onClick={onClick} generateCards={newDeck.generateCards} addCard={newDeck.addCard}/>
      }
    </div>
  );
}