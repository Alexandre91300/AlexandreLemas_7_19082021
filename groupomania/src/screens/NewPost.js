import { useState, useEffect } from 'react';

import Header from '../components/Header'

const NewPost = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(undefined);

    const [preview, setPreview] = useState('')

    console.log(preview);

    console.log(image);

    const submit = () => {
        console.log('Submit');

        // Requête POST
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
        <h1>Nouveau POST</h1>
        <form className='newPost__form' onSubmit={e => {
            e.preventDefault()
            submit()
        }}>
            <input className='newPost__form__inp' type='text' placeholder='Titre (obligatoire)' value={title} onChange={e => setTitle(e.target.value)} required/>
            <textarea className='newPost__form__inp' type='text' placeholder='Description (facultative)' value={description} onChange={e => setDescription(e.target.value)}/>
            <input 
            accept='image/*' 
            className='newPost__form__inp' 
            type='file' 
            onChange={e => {
                let file = e.target.files[0];

                if(file && file.type.substr(0, 5) === 'image'){
                    setImage(file)
                } else {
                    setImage(null)
                }
            }}/>
            {preview !== "" ? 
            <img style={{width: 400, height: 400, objectFit: 'cover'}} src={preview} />
            :
            null
            }
            <button className='newPost__form__inp' type='submit' >Valider</button>
        </form>
        </>

    )
}

export default NewPost