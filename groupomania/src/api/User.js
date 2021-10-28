import Axios from 'axios';

export const createAccount = async (username, email, password) => {
    await Axios.post('http://localhost:3000/api/auth/signup',
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
    await Axios.post("http://localhost:3000/api/auth/login", {
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

        await Axios.post('http://localhost:3000/api/auth/isUserAuth', { token: token, uid: uid }, {
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
    }
}