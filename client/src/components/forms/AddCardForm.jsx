import AddBackText from "./AddBackText";
import AddFrontText from "./AddFrontText";

export default function AddCardForm({state, onClick, actions, addCardProps}){
  return (
    <div>
      {state === actions.addCardFront &&
        <AddFrontText onClick={onClick} setFrontText={addCardProps.setFrontText} />
      }
      {/* ENTER ANSWER */}
      {state === actions.addCardBack &&
        <AddBackText onClick={() => { addCardProps.addCard(); onClick();}} setBackText={addCardProps.setBackText} />
      }
    </div>
  );
}