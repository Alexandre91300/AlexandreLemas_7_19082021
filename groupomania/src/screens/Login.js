import React, {useState} from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');

    const [button, setButton] = useState(false);

    console.log(email);
    console.log(password);

    if (!button && email.length > 0 && password.length > 0) {
        setButton(true)
    } else if (button  && email.length === 0 && password.length === 0) {
        setButton(false)
    }

    const submit = () => {
        console.log('Submit');
        // ACTION
    }

    return ( 
    <>
        <Header type='login' />
        <section className="login">
            <h1 className="login__title">CONNEXION</h1>

            <form className='login__form' onSubmit={ (e) => {
                e.preventDefault();
                submit()
            }}>
                <input placeholder="E-mail" className='login__form__inp' type='email' onChange={e => setEmail(e.target.value)}/>
                <input placeholder="Mot de passe" className='login__form__inp' type='password' onChange={e => setPassword(e.target.value)}/>

                <Link to="/signup" className="login__form__link">
                    <p>Pas encore inscrit ? Créez un compte ICI !</p>
                </Link>

                { button ?
                    <button className='login__form__btn' type='submit'>Connexion</button>
                :
                    <button className='login__form__btn--disabled' disabled={true} type='submit'>Connexion</button>
                }
            </form>
        </section>
    </>
    )
}

export default Login;