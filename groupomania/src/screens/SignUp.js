import React, {useState} from 'react'
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import PasswordValidator from 'password-validator';
import Axios from 'axios';



const SignUp = () => {
    var schema = new PasswordValidator();

    schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

    const [pseudo, setPseudo] = useState ('');
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');

    const [inputFocus, setInputFocus] = useState(false)

    const [button, setButton] = useState(false);

    if (!button && pseudo.length > 0  && email.length > 0 && schema.validate(password)) {
        setButton(true)
    } else if (button  && pseudo.length > 0  && email.length === 0 && password.length === 0) {
        setButton(false)
    }

    const submit = () => {
        console.log('Submit');
        // ACTION
        Axios.post('http://localhost:3000/api/auth/signup', {username: pseudo, email: email, password: password})
        .then(res => {
        console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const displayVerif = (e) => {
        switch (e) {
            case 'focus':
                if (!inputFocus) {
                    setInputFocus(true)
                }
                break;
        
            case 'unFocus':
                if (inputFocus) {
                    setInputFocus(false)
                }
                break;
        
            default:
                break;
        }
    }

    return(
        <>
        <Header type='signup' />
        <section className="signup">
            <h1 className="signup__title">INSCRIPTION</h1>

            <form className='signup__form' onSubmit={ (e) => {
                e.preventDefault();
                submit()
            }}>
                <input placeholder="Pseudo" className='signup__form__inp' type='text' onChange={e => setPseudo(e.target.value)}/>
                <input placeholder="E-mail" className='signup__form__inp' type='email' onChange={e => setEmail(e.target.value)}/>
                <input placeholder="Mot de passe" className='signup__form__inp' type='password' onFocus={() => {displayVerif('focus')}} onBlur={() => {displayVerif('unFocus')}} onChange={e => setPassword(e.target.value)}/>

                { inputFocus ?
                    <div className="signup__form__verif">
                        {password.length >= 8 && password.length <= 100 ? <p style={{backgroundColor : 'black',color: 'white' }}>8 - 100</p> : <p>8 - 100</p>}
                        {/[a-z]/.test(password) ? <p style={{backgroundColor : 'black',color: 'white' }}>minuscule</p> : <p>minuscule</p>}
                        {/[A-Z]/.test(password) ? <p style={{backgroundColor : 'black',color: 'white' }}>MAJUSCULE</p> : <p>MAJUSCULE</p>}
                        {/[0-9]/.test(password) ? <p style={{backgroundColor : 'black',color: 'white' }}>Chiffre</p> : <p>Chiffre</p>}
                    </div>
                    :
                    null
                }
                

                <Link to="/login" className="signup__form__link">
                    <p>Déjà inscrit ? Connectez-vous ICI !</p>
                </Link>

                { button ?
                    <button className='signup__form__btn' type='submit'>S'inscrire</button>
                :
                    <button className='signup__form__btn--disabled' disabled={true} type='submit'>S'inscrire</button>
                }
            </form>
        </section>
        </>

    )
}

export default SignUp;