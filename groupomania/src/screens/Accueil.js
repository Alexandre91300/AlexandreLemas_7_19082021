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

            // Send request
            Axios.get('http://localhost:3000/api/posts/get', {
              headers: {
                authorization: uid + ' ' + token
              }
            }).then(res => {
    
            if(res.data.posts !== undefined){

                setAllPosts(res.data.posts)
            }
            })
            .catch(err => {
                console.log(err);
            })
        }

    },[])

    return(
        <>
        <Header/>
        <button 
        data-testid='accueil-btn-newPost'
        className='accueil__btn' 
        onClick={() => {
            history.push('/newPost')
        }}>Nouveau Post</button>
        <section className='accueil__allPost'>
            {
                allPosts.map(e => {
                    return <Post post={e} key={e.id} />
                })
            }
        </section>
        </>
    )
}

export default Accueil