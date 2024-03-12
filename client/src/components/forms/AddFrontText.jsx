import { useRef } from "react";

export default function AddFrontText({onClick, setFrontText}){
  const frontTextRef = useRef(null);
  const submitClick = () => {
    setFrontText(frontTextRef.current.value);
    onClick();
  }
  return (
    <section className="form-group">
        <div className="form-label-group">
            <label htmlFor="">Enter question </label>
            <input ref={frontTextRef} className="" type="text" name="" id="" />
            <small>(front of card)</small>
        </div>
        <button onClick={submitClick}>next</button>
    </section>
  );
}