import React from 'react';
import {useHistory } from 'react-router-dom';
import Axios from 'axios';

const PrivateRoute = ({children}) => {

    const history = useHistory();

    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('id');

    if (token && uid) {
        Axios.post('http://localhost:3000/api/auth/isUserAuth', {token: token, uid: uid})
        .then(res => {
        console.log(res.isAuth);
        
        if (res.isAuth === true) {
            console.log('Utilisateru authentifié');
            return (
                <p>Accueil</p>
            )

        } else {
            history.push('/login')
            return (
                <p>Chargement...</p>
            )
        }
    
    
        })
        .catch(() => {
            history.push('/login')
            return (
                <p>Chargement...</p>
            )

        })

    } else {
        history.push('/login')
        return (
            <p>Chargement...</p>
        )
    }


}

export default PrivateRoute;