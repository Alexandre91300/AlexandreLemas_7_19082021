import React from 'react';
import logo_white from '../assets/logo_white.svg';
import user_white from '../assets/user_white.svg';
import { Link, useHistory } from 'react-router-dom';


const Header = ({type}) => {

    let history = useHistory();

        switch (type) {
            case 'login':
               return(
                <header className='header'>
                    <img src={logo_white} className="header__img" alt='Logo Groupomania'/>
                    <button onClick={() => {
                        history.push('/signup')
                    }} className='header__btn'>Inscription</button>
                 </header>
               )
            case 'signup':
                return(
                 <header className='header'>
                     <img src={logo_white} className="header__img" alt='Logo Groupomania'/>
                     <button onClick={() => {
                         history.push('/login')
                     }} className='header__btn'>Connexion</button>
                  </header>
                )
                
            default:
                return(
                    <header className='header'>
                     <img src={logo_white} className="header__img" alt='Logo Groupomania'/>
                     <div className='header__imgCtn'>
                     <button onClick={() => {
                         localStorage.clear();
                         document.location.reload();
                     }} className='header__btn header__btn--logout'>Déconnexion</button>
                     <img onClick={() => {
                         history.push('/login')
                     }} src={user_white} className="header__img" alt='Logo Groupomania'/>
                     </div>
                    </header>
                )
        }

}

export default Header;