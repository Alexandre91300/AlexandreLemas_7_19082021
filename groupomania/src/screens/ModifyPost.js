import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Header from '../components/Header'
import { modifyPost } from '../api/Post';

const ModifyPost = () => {
    const history = useHistory();
    const location = useLocation();

    const [title, setTitle] = useState(location.state.title);
    const [description, setDescription] = useState(location.state.description);

    if (!location.state) {
        history.push('/profil')
    }

    const submit = () => {
        if (location.state.title !== title || location.state.description !== description) {

            modifyPost(title, description, location.state.postId)
                .then(() => {
                    history.goBack()
                })
                .catch(err => {
                    alert(err.response.data.message)
                })

        } else {
            history.goBack()
        }
    }

    return (
        <>
            <Header />
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
                        required />

                    <textarea
                        maxLength={280}
                        className='newPost__form__description'
                        type='text'
                        placeholder='Description (facultative)'
                        value={description}
                        onChange={e => setDescription(e.target.value)} />

                    <img alt='Post' style={{ width: 400, height: 400, objectFit: 'cover' }} src={location.state.image} />

                    <button className='newPost__form__submit' type='submit'>Enregistrer les modifications</button>

                </form>

            </section>
        </>
    )
}

export default ModifyPost;