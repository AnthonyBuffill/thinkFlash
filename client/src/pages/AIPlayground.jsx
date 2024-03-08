import { useState } from "react";
import { QUERY_CREATECARDS } from "../utils/queries";
import { useLazyQuery } from "@apollo/client";

export default function AIPlayground(){
  const [formData, setFormData] = useState({
    title:'',
    front:'',
    back:'',
    cardCount:0
  });
  const [getCards, { loading, error, data }] = useLazyQuery(QUERY_CREATECARDS,{
    fetchPolicy: 'network-only'
  });
  if(error)
    console.log(error);
  const flashCards = data?JSON.parse(data.createCards)['flashcards'] : null;
  
  const handleChange = (event) =>{
    let { name, value} = event.target;
    if(name === "cardCount"){
      value = parseInt(value, 10);
      if(isNaN(value))
        value = 10;
    }

    setFormData({ ...formData, [name]:value});
  };
  const handleSubmit = async (event)=>{
    event.preventDefault();
    getCards({variables: { 
      title: formData.title, 
      front:formData.front, 
      back: formData.back,
      cardCount: formData.cardCount
    }});
    // try{
    //   const response = await fetch('/api/openai/createFlashCards', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formData)
    //   });

    //   const responseData = await response.json();
    //   setFlashCards({ title:formData.title, cards:responseData.flashcards});
    //   console.log(flashCards);
    //   console.log('Response: ', responseData.flashcards);
    // }catch(error){
    //   console.log('error', error);
    // }
  }
  // const [flashCards, setFlashCards] = useState({
  //   title:'',
  //   cards:[{}]
  // });

  return (
    <div>
      { loading && (
        <h1>loading</h1>
      )}
      {flashCards && flashCards.length > 0 && (
        <div>
          <h4>{flashCards.title} Deck</h4>
          <div style={styles.cardContainer}>
          {flashCards.map((jsonData, index) => (
          <div style={styles.card} key={index}>
            <p>{jsonData.front}</p>
            <hr></hr>
            <p>{jsonData.back}</p>
          </div>))
          }
          </div>
        </div>
      )}
        
      <h2>AI Deck Builder Playground</h2>
        <form onSubmit={handleSubmit}>
        <label style={styles.label}>Title:  
          <input type="text" name="title" value={formData.title} onChange={handleChange}/>
        </label> 
        <label style={styles.label}>Front:
          <input type="text" name="front" value={formData.front} onChange={handleChange}/>
        </label> 
        <label style={styles.label}>Back:  
          <input type="text" name="back" value={formData.back} onChange={handleChange}/>
        </label> 
        <label style={styles.label}>Count: 
          <input type="number" name="cardCount" value={formData.cardCount} onChange={handleChange} step="1"/>
        </label> 
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
const styles = {
  label:{
    display:'block',
    padding:'10px'
  },
  cardContainer:{
    display:'flex',
    flexWrap: 'wrap',
    gap: '5px'
  },
  card:{
    padding: '10px',
    border: 'solid black 2px',
    width: '150px',
    height: '250px'
  }
}