import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Axios from 'axios';

import Header from '../components/Header'

const ModifyPost = () => {
    const history = useHistory();
    const location = useLocation();
    
    const [title, setTitle] = useState(location.state.title);
    const [description, setDescription] = useState(location.state.description);

    if(!location.state){
        history.push('/profil')
    }

    console.log(location.state.postId);

    const submit = () => {

        let token = localStorage.getItem('token');
        let uid = localStorage.getItem('id');
        let username = localStorage.getItem('username');
        console.log('Submit');

        if (token && uid){

            let post =  {
                title: title, 
                description: description,
                postId: location.state.postId,
            }

            // Send request
            Axios.post('http://localhost:3000/api/posts/update', post, {
                headers: {
                  authorization: uid + ' ' + token
                }
              }) .then(res => {
            console.log(res.data);
            history.push('/profil')
            })
            .catch(err => {
                alert(err.response.data.message)
            })
        }
    }

    return(
        <>
        <Header/>
        <section className='newPost'>
            <h1 className='newPost__title'>Modifier le POST</h1>
            <form className='newPost__form' onSubmit={e => {
                e.preventDefault()
                submit()
            }}>
                <input 
                className='newPost__form__title'
                type='text' placeholder='Titre (obligatoire)' 
                value={title} onChange={e => setTitle(e.target.value)} 
                required/>

                <textarea 
                maxLength={280}
                className='newPost__form__description' 
                type='text' 
                placeholder='Description (facultative)' 
                value={description} 
                onChange={e => setDescription(e.target.value)}/>

                <img style={{width: 400, height: 400, objectFit: 'cover'}} src={location.state.image} />

                <button className='newPost__form__submit' type='submit'>Enregistrer les modifications</button>

            </form>

        </section>
        </>
    )
}

export default ModifyPost;