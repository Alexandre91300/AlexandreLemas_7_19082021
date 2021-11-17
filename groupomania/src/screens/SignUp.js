import React, { useState, useEffect } from 'react'
import Header from '../components/Header';
import { Link, useHistory } from 'react-router-dom';
import PasswordValidator from 'password-validator';
import { createAccount } from '../api/User';
import { sqlInjectionFilter } from '../utils/SqlInjectionFilter';



const SignUp = () => {

    const history = useHistory();

    var schema = new PasswordValidator();

    schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(1)                                // Must have at least 2 digits
        .has().not().spaces()                           // Should not have spaces
        .has().not().symbols()                          // Should not have symbols
        .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState("");

    const [inputFocus, setInputFocus] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem("token");
        let uid = localStorage.getItem("id");
        if (token && uid) {
            history.push("/");
        }
    }, [])

    const submit = () => {
        createAccount(pseudo, email, password)
            .then(() => history.push('/login'))
            .catch(err => setErrorMessage(err))
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

    return (
        <>
            <Header type='signup' />
            <section className="signup">
                <h1 className="signup__title">INSCRIPTION</h1>

                <form className='signup__form' onSubmit={(e) => {
                    e.preventDefault();
                    submit()
                }}>
                    {errorMessage.length !== 0 ?
                        <span className='signup__form__error'>{errorMessage}</span>
                        : null
                    }
                    <input tabIndex='1' placeholder="Pseudo" value={pseudo} className='signup__form__inp' type='text' onChange={e => setPseudo(e.target.value)} />
                    <input tabIndex='2' placeholder="E-mail" value={email} className='signup__form__inp' type='email' onChange={e => setEmail(e.target.value)} />
                    <input tabIndex='3' placeholder="Mot de passe" value={password} className='signup__form__inp' type='password' onFocus={() => { displayVerif('focus') }} onBlur={() => { displayVerif('unFocus') }} onChange={e => setPassword(e.target.value)} />

                    {inputFocus ?
                        <div className="signup__form__verif">
                            {password.length >= 8 && password.length <= 100 ? <p style={{ backgroundColor: 'black', color: 'white' }}>8 - 100</p> : <p>8 - 100</p>}
                            {/[a-z]/.test(password) ? <p style={{ backgroundColor: 'black', color: 'white' }}>minuscule</p> : <p>minuscule</p>}
                            {/[A-Z]/.test(password) ? <p style={{ backgroundColor: 'black', color: 'white' }}>MAJUSCULE</p> : <p>MAJUSCULE</p>}
                            {/[0-9]/.test(password) ? <p style={{ backgroundColor: 'black', color: 'white' }}>Chiffre</p> : <p>Chiffre</p>}
                        </div>
                        :
                        null
                    }


                    <Link tabIndex='4' to="/login" className="signup__form__link">
                        <p>Déjà inscrit ? Connectez-vous ICI !</p>
                    </Link>

                    {pseudo.length > 0 && email.length > 0 && schema.validate(password) && sqlInjectionFilter(pseudo) && sqlInjectionFilter(email) && sqlInjectionFilter(password) ?
                        <button tabIndex='5' className='signup__form__btn' type='submit'>S'inscrire</button>
                        :
                        <button className='signup__form__btn--disabled' disabled={true} type='submit'>S'inscrire</button>
                    }
                </form>
            </section>
        </>

    )
}

export default SignUp;