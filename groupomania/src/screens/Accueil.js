import Header from "../components/Header"
import Post from "../components/Post"
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getPosts } from "../api/Post";


const Accueil = () => {
    let history = useHistory();
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        getPosts()
            .then(posts => setAllPosts(posts))
            .catch(err => alert(err))
    }, [])

    return (
        <>
            <Header />
            <button
                className='accueil__btn'
                onClick={() => {
                    history.push('/newPost')
                }}>Nouveau Post</button>
            <section className='accueil__allPost'>
                {allPosts.length !== 0 ?
                    allPosts.map(e => {
                        return <Post post={e} key={e.id} />
                    })
                    :
                    <h2>Aucun post</h2>
                }
            </section>
        </>
    )
}

export default Accueil