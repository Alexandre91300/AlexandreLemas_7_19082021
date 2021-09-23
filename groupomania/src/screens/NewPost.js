import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Axios from 'axios';

import Header from '../components/Header'

const NewPost = () => {
    const history = useHistory()

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(undefined);

    const [preview, setPreview] = useState('')

    const submit = () => {

        let token = localStorage.getItem('token');
        let uid = localStorage.getItem('id');
        console.log('Submit');

        if (token && uid){

            let post =  {
                title: title, 
                description: description,
                date: Math.floor(Date.now() / 1000),
                uid: uid
            }

            const formData = new FormData()

            formData.append('post', JSON.stringify(post));
            formData.append('image', image);

            // Send request
            Axios.post('http://localhost:3000/api/posts/new', formData, {
                headers: {
                  authorization: uid + ' ' + token
                }
              }) .then(res => {
            console.log(res.data);
            history.push('/')
            })
            .catch(err => {
                alert(err.response.data.message)
            })
        }
    }

    useEffect(() => {
        if(image){
            let reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(image)
        }

    },[image])

    return(
        <>
        <Header/>
        <section className='newPost'>
            <h1 className='newPost__title'>Nouveau POST</h1>
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

                <div>

                <input 
                required
                style={{marginBottom: 20}}
                accept='image/*'
                multiple={false} 
                type='file' 
                onChange={e => {
                    let file = e.target.files[0];

                    if(file && file.type.substr(0, 5) === 'image'){
                        setImage(file)
                    } else {
                        setImage(null)
                    }
                }}/>
                </div>


                {preview !== "" ? 
                <img style={{width: 400, height: 400, objectFit: 'cover'}} src={preview} />
                :
                <div className='newPost__form__fakeImg'/>
                }

                <button className='newPost__form__submit' type='submit' >Poster</button>

            </form>

        </section>

        </>

    )
}

export default NewPost