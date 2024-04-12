import { useRef } from "react";

import PropTypes from 'prop-types';

AddDeck.propTypes = {
  setInfo: PropTypes.func.isRequired,
  onClick:PropTypes.func.isRequired,
}
export default function AddDeck({setInfo, onClick}){
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const submitClick = () => {
    setInfo({
      title:titleRef.current.value,
      description: descriptionRef.current.value,
    });
    onClick();
  }
  return (
    <section className="form-group">
        <div className="form-label-group">
            <label htmlFor="">What is the subject?</label>
            <input ref={titleRef} type="text" />
        </div>
        <div className="form-label-group">
            <label htmlFor="">Description:</label>
            <textarea ref={descriptionRef} name="" id="" cols="30" rows="7"></textarea>
        </div>
        <section className="btn-container">
            <button onClick={submitClick}>next</button>
        </section>
    </section>
  );
}