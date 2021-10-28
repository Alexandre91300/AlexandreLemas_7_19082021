import Axios from 'axios';
import { ENDPOINT } from './ApiConst';

export const createAccount = async (username, email, password) => {
    await Axios.post(`${ENDPOINT}/api/user/signup`,
        {
            username: username,
            email: email,
            password: password
        })
        .then(() => {
            return;
        })
        .catch(err => {
            throw err.response.data.message;
        })
}

export const login = async (email, password) => {
    await Axios.post(`${ENDPOINT}/api/user/login`, {
        email: email,
        password: password,
    })
        .then((res) => {
            // Enregistrer TOKEN dans localstorage
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);
            return;
        })
        .catch((err) => {
            throw err.response.data.message;
        });
}

export const userIsAuth = async () => {
    let token = localStorage.getItem('token');
    let uid = localStorage.getItem('id');

    if (token && uid) {

        await Axios.post(`${ENDPOINT}/api/user/isUserAuth`, { token: token, uid: uid }, {
            headers: {
                authorization: uid + ' ' + token
            }
        }).then(res => {
            console.log(res.data.isAuth);
            if (res.data.isAuth === true) {
                return;
            } else {
                throw false;
            }
        }).catch(() => {
            throw false;
        })
    } else {
        throw TypeError("Il manque le TOKEN et l'ID utilisateur");
    }
}

export const deleteUserDatas = async () => {
    let token = localStorage.getItem('token');
    let uid = localStorage.getItem('id');

    if (token && uid) {
        await Axios.post(`${ENDPOINT}/api/user/deleteDatas`, { uid: uid }, {
            headers: {
                authorization: uid + ' ' + token
            }
        }).then(() => {
            return;
        }).catch(err => {
            throw err;
        })
    } else {
        throw TypeError("Il manque le TOKEN et l'ID utilisateur");
    }
}

export const deleteUserAccount = async () => {
    let token = localStorage.getItem('token');
    let uid = localStorage.getItem('id');

    if (token && uid) {
        // Send request
        await Axios.post(`${ENDPOINT}/api/user/deleteAccount`, { uid: uid }, {
            headers: {
                authorization: uid + ' ' + token
            }
        }).then(() => {
            return;
        }).catch(err => {
            throw err;
        })
    } else {
        throw TypeError("Il manque le TOKEN et l'ID utilisateur");
    }
}