import { useRef, useState } from "react";
import PropTypes from 'prop-types';

AddDeckGenerate.propTypes = {
  onClick:PropTypes.func.isRequired,
  generateCards:PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired
}
export default function AddDeckGenerate({onClick, generateCards, addCard}){
  const countRef = useRef(null)
  const submitClick = (e) =>{
    e.preventDefault();
    generateCards(countValue);
    onClick();
  };

  const [countValue, setCountValue] = useState(10);
  
  return (
    <section className="form-group">
      <div className="select-group">
          <label htmlFor="">How many cards would you like to generate?</label>
          <select ref={countRef} defaultValue="10" onChange={()=>{setCountValue(countRef.current.value)}}>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
          </select>
      </div>
      <section style={styles.section} className="form-submit">
          <button style={styles.margin} onClick={submitClick}>generate {countValue} cards</button>

          <button style={styles.button}>
            <a onClick={addCard}>I will create my own</a>
          </button>
      </section>
      
    </section>
  );
}

const styles = {
  section:{
    display:'flex',
    justifyContent:'space-around',
    margin:'10px'
  },
  margin:{
    margin:'15px',
    flexGrow:'5'
  },
  button:{
    fontSize:'14px',
    margin:'15px',
    flexGrow:'0'
  }
}