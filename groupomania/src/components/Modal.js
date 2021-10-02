import React, { useState } from "react";
import Axios from "axios";

const Modal = ({callBack, postId}) => {
    const [comment, setComment] = useState('')

    let hour = 3600

    const fakeDatas = [
        {
            username : 'Ilan',
            comment : 'Ceci est un test',
            date : Math.floor(Date.now() / 1000) - (hour * 3),
        },
        {
            username : 'Axel',
            comment : 'Ceci est un test 2',
            date : Math.floor(Date.now() / 1000) - (hour * 8),
        },
        {
            username : 'Batou',
            comment : 'Ceci est un test 3',
            date : Math.floor(Date.now() / 1000) - (hour * 1),
        },
        {
            username : 'Ilan',
            comment : 'Ceci est un test',
            date : Math.floor(Date.now() / 1000) - (hour * 3),
        },
        {
            username : 'Axel',
            comment : 'Ceci est un test 2',
            date : Math.floor(Date.now() / 1000) - (hour * 8),
        },
        {
            username : 'Batou',
            comment : 'Ceci est un test 3',
            date : Math.floor(Date.now() / 1000) - (hour * 1),
        },
        {
            username : 'Ilan',
            comment : 'Ceci est un test',
            date : Math.floor(Date.now() / 1000) - (hour * 3),
        },
        {
            username : 'Axel',
            comment : 'Ceci est un test 2',
            date : Math.floor(Date.now() / 1000) - (hour * 8),
        },
        {
            username : 'Batou',
            comment : 'Ceci est un test 3',
            date : Math.floor(Date.now() / 1000) - (hour * 1),
        },
    ]
    
    // Combien de secondes se sont écoulé depuis la création du commentaire
    const timeConvertor = (timestamp) => {
        
        const differenceSecond = Math.floor(Date.now() / 1000) - timestamp;
        const differenceDay = Math.floor(differenceSecond / 86400);

        // Affichage du temps écoulé depuis la publication du commentaire
        if (differenceDay === 0 && differenceSecond < 60) {
            
            return (`${differenceSecond} ${differenceSecond > 1 ? 'secondes' : 'seconde'}`)

        } else if (differenceDay === 0 && differenceSecond < 3600) {

            let time = Math.floor(differenceSecond / 60);

            return (`${time} ${time > 1 ? 'minutes' : 'minute'}`)

        } else if (differenceDay === 0 && differenceSecond >= 3600) {
            
            let time = Math.floor(differenceSecond / 3600);

            return (`${time} ${time > 1 ? 'heures' : 'heure'}`)

        } else if (differenceDay <= 7) {

            return (`${differenceDay} ${differenceDay > 1 ? 'jours' : 'jour'}`)

        } else if (differenceDay <= 30) {

            let time = Math.floor(differenceDay / 7);

            return (`${time} ${time > 1 ? 'semaines' : 'semaine'}`)

        } else if (differenceDay <= 365) {

            return (`${Math.floor(differenceDay / 30,417)} mois`)
            
        } else {
            let time = Math.floor(differenceDay / 365)
            return (`${time} ${time > 1 ? 'ans' : 'an'}`)
        }

    };

    const submit = () => {

        let token = localStorage.getItem('token');
        let uid = localStorage.getItem('id');
        let username = localStorage.getItem('username');
        console.log('Submit');

        if (token && uid && username && comment.length !== 0){

            // Send request
            Axios.post('http://localhost:3000/api/comments/new', {
                comment : comment,
                timestamp :  Math.floor(Date.now() / 1000),
                username : username,
                postId : postId
            
            }, {
                headers: {
                  authorization: uid + ' ' + token
                }
              }) .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                alert(err.response.data.message)
            })
        }
    }

    return(

        <div className='modal'>
            <div className='modal__ctn'>
                <p 
                style={{margin : 10, cursor: "pointer"}}
                onClick={() => callBack()}
                >X</p>

                <div style={{height: '80%',overflow: "auto"}}>
                    {
                        fakeDatas.map((item,index) => {
                            return(
                                <div key={index} className='modal__ctn__comment'>
                                    <p>Par <strong>{item.username}</strong> il y a {timeConvertor(item.date)}</p>
                                    <p className='modal__ctn__comment__text'>{item.comment}</p>
                                </div>
                            )
                        })
                    }
                </div>

                <form className='modal__ctn__form' onSubmit={ (e) => {
                e.preventDefault();
                submit()
                }}>
                    <input 
                    placeholder ='Laisser un commentaire...'
                    maxLength={280} 
                    type='text'
                    value={comment}
                    onChange={e => setComment(e.target.value)} 
                    />
                    <button>Publier</button>
                </form>

            </div>
        </div>
    )
}

export default Modal