import React, { useEffect, useState } from "react";
import Axios from "axios";

const Modal = ({ callBack, post }) => {
    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState([])
    const [sortedComments, setSortedComments] = useState([]);
    const [reload, setReload] = useState(0)

    let token = localStorage.getItem('token');
    let uid = localStorage.getItem('id');
    let username = localStorage.getItem('username');

    useEffect(() => {
        let token = localStorage.getItem('token');
        let uid = localStorage.getItem('id');

        if (token && uid && post.comments !== 0) {

            // Send request
            Axios.post('http://localhost:3000/api/comments/get', {
                postId: post.id

            }, {
                headers: {
                    authorization: uid + ' ' + token
                }
            }).then(res => {
                setAllComments(res.data.comments)
            })
                .catch(err => {
                    alert(err)
                })
        }
    }, [reload])

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

            return (`${Math.floor(differenceDay / 30, 417)} mois`)

        } else {
            let time = Math.floor(differenceDay / 365)
            return (`${time} ${time > 1 ? 'ans' : 'an'}`)
        }

    };

    const submit = () => {

        const commentDatas = {
            comment: comment,
            timestamp: Math.floor(Date.now() / 1000),
            username: username,
            postId: post.id,
            uid: uid
        }

        if (token && uid && username && comment.length !== 0) {

            // Send request
            Axios.post('http://localhost:3000/api/comments/new', commentDatas, {
                headers: {
                    authorization: uid + ' ' + token
                }
            }).then(res => {

                setReload(reload + 1)

                setComment('')
            })
                .catch(err => {
                    alert(err.response.data.message)
                })
        }
    }

    const deleteComment = (commentId, postId) => {
        if (token && uid && commentId && postId) {
            // Send request
            Axios.post('http://localhost:3000/api/comments/deleteOne', { commentId: commentId, postId: postId }, {
                headers: {
                    authorization: uid + ' ' + token
                }
            }).then(res => {
                console.log(allComments.filter(item => item.id !== commentId));
                setAllComments(allComments.filter(item => item.id !== commentId))
            })
                .catch(err => {
                    alert(err.response.data.message)
                })
        }
    }


    useEffect(() => {

        if (allComments) {

            let sortedComments = allComments.sort(function (a, b) {
                var keyA = a.date,
                    keyB = b.date;
                // Compare the 2 dates
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });

            sortedComments.reverse()

            setSortedComments(sortedComments)
        }


    }, [allComments])

    return (

        <div className='modal'>
            <div className='modal__ctn'>
                <p
                    style={{ margin: 10, cursor: "pointer" }}
                    onClick={() => callBack()}
                >X</p>

                <div style={{ height: '80%', overflow: "auto" }}>
                    {allComments ?
                        sortedComments.map((item, index) => {
                            return (
                                <div key={index} className='modal__ctn__comment'>
                                    <p>Par <strong>{item.username}</strong> il y a {timeConvertor(item.date)}</p>
                                    <p className='modal__ctn__comment__text'>{item.comment}</p>
                                    {item.uid == uid ?
                                        <button
                                            onClick={() => { deleteComment(item.id, post.id) }}
                                            className='modal__ctn__comment__btn'
                                        >Supprimer</button>
                                        : null}
                                </div>
                            )
                        })
                        :
                        <p>Aucun commentaire</p>
                    }
                </div>

                <form className='modal__ctn__form' onSubmit={(e) => {
                    e.preventDefault();
                    submit()
                }}>
                    <input
                        placeholder='Laisser un commentaire...'
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