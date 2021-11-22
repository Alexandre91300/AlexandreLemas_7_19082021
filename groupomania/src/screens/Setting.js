import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import { deleteUserAccount, deleteUserDatas } from '../api/User';
import { generateCode } from '../utils/GenerateCode';

const Setting = () => {
    const history = useHistory();
    const [code, setCode] = useState(generateCode(10));
    const [input, setInput] = useState('');

    const handleDeleteUserDatas = () => {
        deleteUserDatas()
            .then(() => {
                history.push('/profil')
            }).catch(err => {
                alert(err);
            })
    }

    const handleDeleteAccount = () => {
        deleteUserAccount()
            .then(() => {
                localStorage.clear();
                document.location.reload();
            }).catch(err => {
                alert(err);
            })
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

                    <button onClick={() => handleDeleteUserDatas()} className='setting__ctn__box__btn'>Supprimer</button>

                </section>

                <section className='setting__ctn__box'>
                    <h2>Supprimer mon compte</h2>

                    <p>Attention, cette action est irréversible !</p>

                    <p>En effectuant cette action, vous allez supprimer votre compte et vos données.</p>

                    <p>Merci de saisir le code indiqué en bleu ci-dessous, afin de déverrouiller le bouton de suppression.</p>

                    <p className='setting__ctn__box__code'>{code}</p>

                    <input
                        onChange={e => setInput(e.target.value)}
                        value={input}
                        type='text'
                        placeholder='Saisissez le texte ci-dessus'
                    />

                    {input === code ?
                        <button onClick={() => handleDeleteAccount()} className='setting__ctn__box__btn  setting__ctn__box__btn--deleteAccount'>Supprimer</button>
                        :
                        <button
                            className='setting__ctn__box__btn setting__ctn__box__btn--grey  setting__ctn__box__btn--deleteAccount'
                            onClick={() => alert('Merci de saisir le code indiqué en bleu')}
                        >Supprimer</button>
                    }

                </section>
            </div>
        </>
    )
}

export default Setting