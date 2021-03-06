// Les différents headers de l'app

import React, { useState } from 'react';
import logo_white from '../assets/logo_white.svg';
import user_white from '../assets/user_white.svg';
import setting from '../assets/setting.png';
import { useHistory } from 'react-router-dom';
import closeWhite from '../assets/close-white.png'
import burgerButton from '../assets/burgerButton.png'



const Header = ({ type }) => {
    let history = useHistory();

    const [displayBurgerHeader, setDisplayBurgerHeader] = useState(false);

    switch (type) {
        case 'login':
            return (
                <header className='header'>
                    <img src={logo_white} className="header__img" alt='Logo de Groupomania' />
                    <button onClick={() => {
                        history.push('/signup')
                    }} className='header__btn header__btn--login'>Inscription</button>
                </header>
            )
        case 'signup':
            return (
                <header className='header'>
                    <img src={logo_white} className="header__img" alt='Logo de Groupomania' />
                    <button onClick={() => {
                        history.push('/login')
                    }} className='header__btn header__btn--signup'>Connexion</button>
                </header>
            )

        default:
            return (
                <header className='header'>
                    <a href='/'>
                        <img src={logo_white} className="header__img" alt='Logo de Groupomania' />
                    </a>
                    <button className='header__burgerBtn' onClick={() => setDisplayBurgerHeader(!displayBurgerHeader)}>
                        {!displayBurgerHeader ?
                            <img src={burgerButton} alt='Icon de navigation dépliante' />
                            :
                            <img src={closeWhite} alt='Icon en forme de croix' />
                        }
                    </button>
                    <div className={"header__imgCtn " + (!displayBurgerHeader ? 'header__imgCtn--displayNone' : '')}>

                        <button onClick={() => {
                            localStorage.clear();
                            document.location.reload();
                        }}
                            className='header__btn header__btn--logout'
                        >Déconnexion</button>
                        <button
                            className='header__btn header__btn--logout'
                            onClick={() => {
                                history.push('/profil')
                            }} >
                            <img src={user_white} className="header__imgCtn__img" alt='Icon utilisateur, bonhomme en blanc' />
                        </button>

                        <button
                            className='header__btn header__btn--logout'
                            onClick={() => {
                                history.push('/setting')
                            }}>
                            <img src={setting} className="header__imgCtn__img" alt='Icon paramètres, roue crantée' />
                        </button>


                    </div>
                </header>
            )
    }

}

export default Header;