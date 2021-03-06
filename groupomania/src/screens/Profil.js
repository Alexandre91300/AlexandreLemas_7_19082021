import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import Header from "../components/Header";
import user_black from '../assets/user_black.svg';
import Post from "../components/Post";
import { getPostsByUid } from "../api/Post";

const Profil = () => {
    const history = useHistory();

    const [allPosts, setAllPosts] = useState([]);

    const username = localStorage.getItem('username')

    useEffect(() => {
        getPostsByUid()
            .then(posts => setAllPosts(posts.reverse()))
            .catch(err => alert(err))
    }, [])

    return (
        <>
            <Header />
            <section className="profil__header">
                <img src={user_black} className="profil__header__img" alt='Icon utilisateur, bonhomme blanc vous représentant' />
                {username ? <h1 className="profil__header__title">{username}</h1> : <h1 className="profil__header__title">Username introuvable :/</h1>}
                <button
                    className='home__btn'
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