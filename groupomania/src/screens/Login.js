import React, {useState} from 'react';
import Header from '../components/Header';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';


const Login = () => {

    const history = useHistory()

    const [email, setEmail] = useState ('sandy91300@gmail.com');
    const [password, setPassword] = useState ('Binksbinks91');

    const [button, setButton] = useState(false);

    if (!button && email.length > 0 && password.length > 0) {
        setButton(true)
    } else if (button  && email.length === 0 && password.length === 0) {
        setButton(false)
    }

    const submit = () => {
        // Send request
        Axios.post('http://localhost:3000/api/auth/login', {email: email, password: password})
        .then(res => {
        console.log(res.data.id);
        console.log(res.data.token);

        // Enregistrer TOKEN dans localstorage
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('token', res.data.token);
        history.push('/')
 

        })
        .catch(err => {
            console.error(err.response.data.message);
            // setErrorMessage(err.response.data.message)

        })
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
                <input placeholder="E-mail" value={email} className='login__form__inp' type='email' onChange={e => setEmail(e.target.value)}/>
                <input placeholder="Mot de passe" value={password} className='login__form__inp' type='password' onChange={e => setPassword(e.target.value)}/>

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