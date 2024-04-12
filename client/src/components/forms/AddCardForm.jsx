import AddBackText from "./AddBackText";
import AddFrontText from "./AddFrontText";
import PropTypes from 'prop-types';

AddCardForm.propTypes = {
  state: PropTypes.string.isRequired,
  onClick:PropTypes.func.isRequired,
  actions:PropTypes.object.isRequired,
  addCardProps: PropTypes.object.isRequired
}
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
      <button style={styles.genButton} onClick={submitClick}>Auto Generate</button>
    </div>
  );
}
const styles = {
  genButton:{
    display:'inline',
    margin: '10px'
  }
}