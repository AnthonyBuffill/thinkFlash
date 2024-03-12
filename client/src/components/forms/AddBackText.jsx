import { useRef } from "react";

export default function AddBackText({onClick, setBackText}){
  const backTextRef = useRef(null);
  const submitClick = () => {
    setBackText(backTextRef.current.value);
    onClick();
  }
  return (
    <section className="form-group">
        <label htmlFor="">Enter answer </label>
        <textarea ref={backTextRef} name="" id="" cols="30" rows="7"></textarea>
        <small>(back of card)</small>
        <button onClick={submitClick}>next</button>
    </section>   
  );
}