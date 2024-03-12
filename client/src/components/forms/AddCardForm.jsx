import AddBackText from "./AddBackText";
import AddFrontText from "./AddFrontText";

export default function AddCardForm({state, onClick, actions, addCardProps}){
  const submitClick = () => {
    addCardProps.setBackToGenerate();
  }
  return (
    <div>
      {state === actions.addCardFront &&
        <AddFrontText onClick={onClick} setFrontText={addCardProps.setFrontText} />
      }
      {/* ENTER ANSWER */}
      {state === actions.addCardBack &&
        <AddBackText onClick={() => { addCardProps.addCard(); onClick();}} setBackText={addCardProps.setBackText} />
      }
      <button style={styles.genButton} onClick={submitClick}>Auto Generate >_></button>
    </div>
  );
}
const styles = {
  genButton:{
    display:'inline',
    margin: '10px'
  }
}