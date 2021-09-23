import React, {useState, useEffect} from "react";
import Axios from 'axios';

import Header from "../components/Header";

const Profil = () => {

    const [allPosts, setAllPosts] = useState([]);


    useEffect(() => {

        const token = localStorage.getItem('token');
        const uid = localStorage.getItem('id');

        // Get posts
        if (token && uid) {

            console.log('send request');
            // Send request
            Axios.post('http://localhost:3000/api/posts/getByUid',{uid : uid}, {
              headers: {
                authorization: uid + ' ' + token
              }
            }).then(res => {
    
            console.log(res.data.posts);

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
        <h1>Profil</h1>
        </>
    )
}

export default Profil;