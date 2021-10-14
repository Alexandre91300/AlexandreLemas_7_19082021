import React, { useState, useEffect } from "react";
import Axios from 'axios';

import Header from "../components/Header";
import user_black from '../assets/user_black.svg';
import Post from "../components/Post";
import { useHistory } from "react-router";


const Profil = () => {
    const history = useHistory();

    const [allPosts, setAllPosts] = useState([]);

    const username = localStorage.getItem('username')

    useEffect(() => {

        const token = localStorage.getItem('token');
        const uid = localStorage.getItem('id');

        // Get posts
        if (token && uid) {

            // Send request
            Axios.post('http://localhost:3000/api/posts/getByUid', { uid: uid }, {
                headers: {
                    authorization: uid + ' ' + token
                }
            }).then(res => {

                if (res.data.posts !== undefined) {
                    setAllPosts(res.data.posts)
                }
            })
                .catch(err => {
                    console.log(err);
                })
        }

    }, [])
    return (
        <>
            <Header />
            <section className="profil__header">
                <img src={user_black} className="profil__header__img" alt='Icon utilisateur' />
                {username ? <h1 className="profil__header__title">{username}</h1> : <h1 className="profil__header__title">Username introuvable</h1>}
                <button
                    data-testid='accueil-btn-newPost'
                    className='accueil__btn'
                    onClick={() => {
                        history.push('/newPost')
                    }}>Nouveau Post</button>
                <span className="profil__header__line" />
            </section>

            {allPosts.length > 0 ?
                <section className='profil__allPost'>
                    {
                        allPosts.map(e => {
                            return <Post post={e} key={e.id} />
                        })
                    }
                </section>
                :
                <h2 style={{ width: '100%', textAlign: "center" }}>Aucun post</h2>

            }

        </>
    )
}

export default Profil;