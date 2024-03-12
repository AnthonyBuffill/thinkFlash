import { useRef } from "react";

export default function AddDeckGenerate({onClick, generateCards, addCard}){
  const countRef = useRef(null)
  const submitClick = (e) =>{
    e.preventDefault();
    generateCards(countRef.current.value);
    onClick();
  };
  
  return (
    <section className="form-group">
      <div className="select-group">
          <label htmlFor="">How many cards would you like to generate?</label>
          <select ref={countRef} defaultValue="5">
              <option value="5" disabled>5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
          </select>
      </div>
      <section className="form-submit">
          <button onClick={submitClick}>generate deck</button>
      </section>
      <a onClick={addCard}>No thank's I'll create my own</a>
    </section>
  );
}