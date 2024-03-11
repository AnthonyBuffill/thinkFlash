export default function AddDeck(props){
  return (
    <section className="form-group">
        <div className="form-label-group">
            <label htmlFor="">What is the subect?</label>
            <input type="text" />
        </div>
        <div className="form-label-group">
            <label htmlFor="">Description:</label>
            <textarea name="" id="" cols="30" rows="7"></textarea>
        </div>
        <section className="btn-container">
            <button onClick={props.handleFormGroup}>next</button>
        </section>
    </section>
  );
}