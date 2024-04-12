import AddDeck from "./AddDeck";
import AddFrontText from "./AddFrontText";
import AddBackText from "./AddBackText";
import AddDeckGenerate from "./AddDeckGenerate";
import PropTypes from 'prop-types';

AddDeckForm.propTypes = {
  state: PropTypes.string.isRequired,
  onClick:PropTypes.func.isRequired,
  actions:PropTypes.object,
  newDeck:PropTypes.object
}
export default function AddDeckForm({state, onClick, actions, newDeck}){
  return (
    <div>
      {state === actions.generateDeck.start && 
        <AddDeck onClick={onClick} setInfo={newDeck.setInfo} />
      }
      {/*  ENTER FIRST QUESTION*/}
      {state === actions.generateDeck.front &&
        <AddFrontText onClick={onClick} setFrontText={newDeck.setFrontText} />
      }
      {/* ENTER ANSWER */}
      {state === actions.generateDeck.back &&
        <AddBackText onClick={onClick} setBackText={newDeck.setBackText}/>
      }
      {/* GENERATE NEW DECK FORM OR CREATE OWN */}
      {state === actions.generateDeck.generate &&
        <AddDeckGenerate onClick={onClick} generateCards={newDeck.generateCards} addCard={newDeck.addCard}/>
      }
    </div>
  );
}