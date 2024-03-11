import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER } from '../utils/mutations';
import '../assets/css/form.css';
import DashboardPage from '../pages/DashboardPage';
import Auth from '../utils/auth';
import AddDeck from "./forms/AddDeck";

export default function Form(props) {
    // vars for different form states

    const actions = {
      generateDeck:{
        start: 'START',
        front: 'FRONT',
        back: 'BACK',
        generate: 'GENERATE',
        loading: 'LOADING',
      },
        addCard: 'ADDCARD',
        login: 'LOGIN',
        signup: 'SIGNUP'
    };

   
    // renders the correct form groups
    const [formGroup, setFormGroup] = useState(props.formState)
    // renders the correct form header
    const [formHeader, setFormHeader] = useState('')

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); //new state var
    const navigate = useNavigate();
    const [loginMutation, { loading: loginLoading, error: loginError }] = useMutation(LOGIN_USER);
    const [signupMutation, { loading: signupLoading, error: signupError }] = useMutation(ADD_USER);

    // sets form headers for each form type
    useEffect(() => {
        switch(formGroup){
            case actions.addCard:
                setFormHeader('Add New Card')
                break;
            case actions.generateDeck.start:
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

      const handleLoginSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const { data } = await loginMutation({ variables: { email, password } });
    
          if (data && data.login && data.login.token) {
            const token = data.login.token;
            setIsLoggedIn(true);
            navigate.push('/DashboardPage');
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleSignupSubmit = async (e) => {
        e.preventDefault();
        
        // Check if passwords match
        if (password !== confirmPassword) {
          console.error('Passwords do not match');
          return;
        }
    
        try {
          const { data } = await signupMutation({ variables: { email, password } });
    
          // If signup is successful, set isLoggedIn to true
          if (data && data.signup && data.signup.token) {
            const token = data.signup.token;
            setIsLoggedIn(true);
            navigate.push('/dashboard');
          }
        } catch (error) {
          console.error(error);
        }
      };

    // changes form state for --Generate New Deck-- Form on click
    const handleFormGroup = (e) => {
      e.preventDefault();
        switch(formGroup){
            case actions.start:
                setFormGroup(actions.generateDeck.front)
                break;
            case actions:
                setFormGroup(actions.generateDeck.back)
                break;
            case actions.generateDeck.back:
                setFormGroup(actions.generateDeck.generate)
                setFormHeader('Generate Deck')
                break;
            case actions.generateDeck.generate:
                setFormGroup(actions.generateDeck.loading)
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
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-label-group">
                  <label htmlFor="">Enter Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <a href="signup">No Account? Sign up here!</a>
                <section className="btn-container">
                  <button type="submit" onClick={handleLoginSubmit} disabled={loginLoading}>
                    {loginLoading ? 'Logging in...' : 'Submit'}
                  </button>
                </section>
                {signupError && <p>Error: {signupError.message}</p>}
              </section>
            }
            {/* Signup Form */}
            {formGroup === actions.signup && (
              <section className="form-group">
                <div className="form-label-group">
                  <label htmlFor="">Enter Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-label-group">
                  <label htmlFor="">Enter Username</label>
                  <input
                  type="text"
                  />
                </div>
                <div className="form-label-group">
                  <label htmlFor="">Enter Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-label-group">
                  <label htmlFor="">Re-enter Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <a href="login">Already have an account? Log in here!</a>
                <section className="btn-container">
                  <button type="submit" onClick={handleSignupSubmit} disabled={signupLoading}>
                    {signupLoading ? 'Signing up...' : 'Submit'}
                  </button>
                </section>
                {signupError && <p>Error: {signupError.message}</p>}
              </section>
                   )}
                     {/* Create subject and Description */}

                    {formGroup === actions.generateDeck.start && 
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
                    {formGroup === actions.generateDeck.front &&
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
                    {formGroup === actions.generateDeck.back &&
                    <section className="form-group">
                        <label htmlFor="">Enter answer </label>
                        <textarea name="" id="" cols="30" rows="7"></textarea>
                        <small>(back of card)</small>
                        <button onClick={handleFormGroup}>next</button>
                    </section>      
                    }
                    {/* GENERATE NEW DECK FORM OR CREATE OWN */}
                    {formGroup === actions.generateDeck.generate &&
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