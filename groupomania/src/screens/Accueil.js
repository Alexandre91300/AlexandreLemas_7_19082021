import Header from "../components/Header"
import Post from "../components/Post"
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";
import Axios from 'axios';


const Accueil = () => {
    let history = useHistory();
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem('token');
        const uid = localStorage.getItem('id');

        // Get posts
        if (token && uid) {

            console.log('send request');
            // Send request
            Axios.get('http://localhost:3000/api/posts/get', {
              headers: {
                authorization: uid + ' ' + token
              }
            }).then(res => {
    
            console.log(res.data.posts);
            setAllPosts(res.data.posts)
            })
            .catch(err => {
                console.log(err);
            })
        }

    },[])

    return(
        <>
        <Header/>
        <button className='accueil__btn' onClick={() => {
            history.push('/newPost')
        }}>Nouveau Post</button>
        <section className='accueil__allPost'>
            {
                allPosts.map(e => {
                    return <Post post={e} key={e.user} />
                })
            }
        </section>
        </>
    )
}

export default Accueil