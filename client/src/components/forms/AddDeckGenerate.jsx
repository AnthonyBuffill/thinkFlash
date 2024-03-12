import { useRef, useState } from "react";

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
      <section className="form-submit">
          <button onClick={submitClick}>generate {countValue} cards</button>
      </section>
      <a onClick={addCard}>No thank's I'll create my own</a>
    </section>
  );
}