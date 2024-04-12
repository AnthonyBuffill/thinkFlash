import { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER } from '../utils/mutations';
import '../assets/css/form.css';
import AuthService from '../utils/auth';
import AddDeckForm from "./forms/AddDeckForm";
import Loading from "./forms/Loading";
import AddCardForm from "./forms/AddCardForm";
import Saveing from "./forms/Saveing";
import PropTypes from 'prop-types';

Form.propTypes = {
  props: PropTypes.object,
  formState:PropTypes.string,
  saving:PropTypes.object,
  newDeck:PropTypes.object,
  addCard:PropTypes.object
}
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
        addCardFront: 'ADDCARD_FRONT',
        addCardBack: 'ADDCARD_BACK',
        login: 'LOGIN',
        signup: 'SIGNUP',
        saving: 'SAVING',
        finished: 'FINISHED'
    };

   
    // renders the correct form groups
    const [formGroup, setFormGroup] = useState(props.formState);
    // renders the correct form header
    const [formHeader, setFormHeader] = useState('');

    const [email, setEmail] = useState('');
    const [username, setUsername]= useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(AuthService.loggedIn()); //new state var

    const [loginMutation, { loading: loginLoading, error: loginError }] = useMutation(LOGIN_USER);
    const [signupMutation, { loading: signupLoading, error: signupError }] = useMutation(ADD_USER);

    // sets form headers for each form type
    useEffect(() => {
        switch(formGroup){
            case actions.addCardFront:
                setFormHeader('Create New Card');
                break;
            case actions.generateDeck.start:
                setFormHeader('Create New Deck');
                break;
            case actions.generateDeck.generate:
              setFormHeader('Generate Cards');
              break;
            case actions.generateDeck.loading:
              setFormHeader('Loading');
              break;
            case actions.login:
                setFormHeader('Login Form');
                break;
            case actions.signup:
                setFormHeader('Sign Up Form');
                break;
            case actions.saving:
              setFormHeader(props.saving.title);
              break;
            case actions.finished:
              setFormHeader('Complete');
              break;
            default:
                return                
        }
      }, [formGroup])

      const handleLoginSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const { data } = await loginMutation({ variables: { email, password } });
    
          if (data && data.login && data.login.token) {
            const token = data.login.token;
            AuthService.login(token);
            setIsLoggedIn(true);
            window.location.assign(`/dashboard/${data.login.user._id}`);
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
          const { data } = await signupMutation({ variables: { email, username, password } });
          console.log(data.addUser);
    
          // If signup is successful, set isLoggedIn to true
          if (data && data.addUser.token) {
            const token = data.addUser.token;
            AuthService.login(token);
            setIsLoggedIn(true);
            window.location.assign(`/dashboard/${data.addUser._id}`);
          }
        } catch (error) {
          console.error(error);
        }
      };

      const handleLogout = () => {
        AuthService.logout(); // Use the AuthService for logout
        setIsLoggedIn(false);
      };

    // changes form state for --Generate New Deck-- Form on click
    const handleFormGroup = (e) => {
      // e.preventDefault();
        switch(formGroup){
            case actions.generateDeck.start:
                setFormGroup(actions.generateDeck.front)
                break;
            case actions.generateDeck.front:
                setFormGroup(actions.generateDeck.back)
                break;
            case actions.generateDeck.back:
                setFormGroup(actions.generateDeck.generate)
                break;
            case actions.generateDeck.generate:
                setFormGroup(actions.generateDeck.loading)
                setFormHeader('Generating Cards...');
                break;
            case actions.addCardFront:
              setFormGroup(actions.addCardBack)
              break;
            case actions.addCardBack:
              setFormGroup(actions.addCardFront)
              break;
            default:
                console.log('invalid value')
            
        }
        return formGroup
    }

    return(
        <>
        <section className="form-container">
            <form onSubmit={(e)=>{e.preventDefault()}}>
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
                {loginError && <p>Error: {loginError.message}</p>}
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
                  value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                     {(formGroup === actions.generateDeck.start || formGroup === actions.generateDeck.front||formGroup === actions.generateDeck.back || formGroup === actions.generateDeck.generate) && (
                      <AddDeckForm onClick={handleFormGroup} state={formGroup} actions={actions} newDeck={props.newDeck}/>
                      
                    )}
                    {formGroup === actions.generateDeck.loading && (
                    
                      <Loading />
                    )}
                    {formGroup === actions.saving && (
                    
                      <Saveing text={props.saving.text} />
                    )}
                    {/* ADD A NEW CARD FORM */}
                    {(formGroup === actions.addCardFront || formGroup === actions.addCardBack) &&(
                      <AddCardForm onClick={handleFormGroup} state={formGroup} actions={actions} addCardProps={props.addCard} />             
                    )}
                </div>
              
            </form>
        </section>
        </>
    )
}

