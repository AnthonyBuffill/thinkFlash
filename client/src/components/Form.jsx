import React, { useState, useEffect }from "react";
import '../assets/css/form.css'
export default function Form(props) {
    // vars for different form states

    const actions = {
        start: 'START',
        front: 'FRONT',
        back: 'BACK',
        generate: 'GENERATE',
        loading: 'LOADING',
        addCard: 'ADDCARD',
        login: 'LOGIN',
        signup: 'SIGNUP'
    };

   
    // renders the correct form groups
    const [formGroup, setFormGroup] = useState(props.formState)
    // renders the correct form header
    const [formHeader, setFormHeader] = useState('')

    // sets form headers for each form type
    useEffect(() => {
        switch(formGroup){
            case actions.addCard:
                setFormHeader('Add New Card')
                break;
            case actions.start:
                setFormHeader('Create New Deck')
                break;
            case actions.login:
                setFormHeader('Login Form')
                break;
            case actions.signup:
                setFormHeader('Sign Up Form')
                break;
            default:
                return                
        }
      }, [])


    // changes form state for --Generate New Deck-- Form on click
    const handleFormGroup = () => {
        switch(formGroup){
            case actions.start:
                setFormGroup(actions.front)
                break;
            case actions.front:
                setFormGroup(actions.back)
                break;
            case actions.back:
                setFormGroup(actions.generate)
                setFormHeader('Generate Deck')
                break;
            case actions.generate:
                setFormGroup(actions.loading)
                break;
            default:
                console.log('invalid value')
            
        }
        return formGroup
    }

    return(
        <>
        <section className="form-container">
            <form>
                <header>
                    <h2>{formHeader}</h2>
                </header>
                <div className="inputs-container">
                    {/* Login Form */}
                    {formGroup === actions.login &&
                    <section className="form-group">
                        <div className="form-label-group">
                            <label htmlFor="">Enter Email</label>
                            <input type="email" />
                        </div>
                        <div className="form-label-group">
                            <label htmlFor="">Enter Password</label>
                            <input type="password" />
                        </div>
                        <a href="signup">No Account? Sign up here!</a>
                        <section className="btn-container">
                            <button>Submit</button>
                        </section>
                    </section>
                    }
                    {/* Sign up Form */}
                    {formGroup === actions.signup &&
                    <section className="form-group">
                        <div className="form-label-group">
                            <label htmlFor="">Enter Email</label>
                            <input type="email" />
                        </div>
                        <div className="form-label-group">
                            <label htmlFor="">Enter Password</label>
                            <input type="password" />
                        </div>
                        <div className="form-label-group">
                            <label htmlFor="">Re-enter Password</label>
                            <input type="password" />
                        </div>
                        <a href="login">Already have an account? Log in here!</a>
                        <section className="btn-container">
                            <button>Submit</button>
                        </section>
                    </section>
                    }

                    {/* START OF CREATE DECK FORM */}
                     {/* Create subject and Description */}
                    {formGroup === actions.start && 
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
                    {formGroup === actions.front &&
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
                    {formGroup === actions.back &&
                    <section className="form-group">
                        <label htmlFor="">Enter answer </label>
                        <textarea name="" id="" cols="30" rows="7"></textarea>
                        <small>(back of card)</small>
                        <button onClick={handleFormGroup}>next</button>
                    </section>      
                    }
                    {/* GENERATE NEW DECK FORM OR CREATE OWN */}
                    {formGroup === actions.generate &&
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
                            <a href="addCard">No thank's I'll create my own</a>
                        </section>
                    }
                    {/* END OF CREATE DECK FORM */}
                    
                    {/* ADD A NEW CARD FORM */}
                    {formGroup === actions.addCard &&
                    <section className="form-group">
                        <div className="form-label-group">
                            <label htmlFor="">Front of Card</label>
                            <input type="text" />
                        </div>
                        <div className="form-label-group">
                            <label htmlFor="">Back of Card</label>
                            <textarea name="" id="" cols="30" rows="7"></textarea>
                        </div>
                        <section className="btn-container">
                            <button>Add Another Card</button>
                            <button className="addCardDoneBtn">
                            <a href="/dashboard">Done</a>  
                            </button>
                        </section>
                    </section>                
                    }
                </div>
              
            </form>
        </section>
        </>
    )
}