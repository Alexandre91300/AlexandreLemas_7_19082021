import React, { useEffect, useState } from 'react';
import Header from "../components/Header";

const Setting = () => {

    const [code, setCode] = useState(null);
    const [input, setInput] = useState('');

    const generateCode = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    useEffect(() => {
        setCode(generateCode(1))
    }, [])

    const deleteAllPosts = () => {
        alert('DELETE')
    }


    return (
        <>
            <Header />
            <h1 className='setting__title'>Paramètres</h1>

            <div className='setting__ctn'>
                <section className='setting__ctn__box'>
                    <h2>Supprimer mes données</h2>

                    <p>Attention, cette action est irréversible !</p>

                    <p>En effectuant cette action, vous allez supprimer tous vos posts ainsi que tous vos commentaires.</p>

                    <p>Merci de saisir le code indiqué en bleu ci-dessous, afin de déverrouiller le bouton de suppression.</p>

                    <p className='setting__ctn__box__code'>{code}</p>



                    <input
                        onChange={e => setInput(e.target.value)}
                        value={input}
                        type='text'
                        placeholder='Saisissez le texte ci-dessus'
                    />

                    {input === code ?
                        <button onClick={() => deleteAllPosts()} className='setting__ctn__box__btn'>Supprimer</button>
                        :
                        <button
                            className='setting__ctn__box__btn setting__ctn__box__btn--grey'
                            onClick={() => alert('Merci de saisir le code indiqué en bleu')}
                        >Supprimer</button>
                    }

                </section>
            </div>
        </>
    )
}

export default Setting