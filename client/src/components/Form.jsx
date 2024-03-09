import React, { useState }from "react";
import '../assets/css/form.css'
export default function Form() {
    // vars for different form states
    const start = 'START'; 
    const front = 'FRONT'
    const back = 'BACK'
    const generate = 'GENERATE'
    const loading = 'Loading'
   
    // renders the correct form groups
    const [formGroup, setFormGroup] = useState(start)
    // renders the correct form header
    const [formHeader, setFormHeader] = useState('Create New Deck')
    // changes form state on click
    const handleFormGroup = () => {
        switch(formGroup){
            case start:
                setFormGroup(front)
                break;
            case front:
                setFormGroup(back)
                break;
            case back:
                setFormGroup(generate)
                setFormHeader('Generate Deck')
                break;
            case generate:
                setFormGroup(loading)
                break;
            case start:
                setFormGroup(front)
                break;
            default:
                console.log('invalid value')
            
        }
        return formGroup
    }

    return(
        <>
        <section className="form-container">

            <form action="">
            <header>
                <h2>{formHeader}</h2>
            </header>
            {/* Create subject and Description */}
            {formGroup === start && 
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
                <button onClick={handleFormGroup}>next</button>
                </section>
            </section>
            }
            {/*  ENTER FIRST QUESTION*/}
            {formGroup === front &&
            <section className="form-group">
                 <div className="form-label-group">
                 <label htmlFor="">Enter question </label>
                
                <input className="" type="text" name="" id="" />
                <small>(front of card)</small>
                 </div>
                <button onClick={handleFormGroup}>next</button>
            </section>
            }
            {/* ENTER ANSWER */}
            {formGroup === back &&
            <section className="form-group">
                <label htmlFor="">Enter answer </label>
                <textarea name="" id="" cols="30" rows="7"></textarea>
                <small>(back of card)</small>
                <button onClick={handleFormGroup}>next</button>
            </section>      
            }
            {/* GENERATE NEW DECK FORM OR CREATE OWN */}
            {formGroup === generate &&
                <section className="form-group">
                    <div className="select-group">
                        <label htmlFor="">How many cards would you like to generate?</label>
                        <select  >
                            <option value="" selected>select</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                        </select>
                    </div>
                    <section className="form-submit">
                    <button>generate deck</button>

                    </section>
                    <a href="">No thank's I'll create my own</a>
                </section>
            }
            </form>
        </section>
        </>
    )
}