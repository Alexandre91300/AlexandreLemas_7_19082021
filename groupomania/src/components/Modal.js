// Modal d'affichages des commentaires

import React, { useEffect, useState } from "react";
import Axios from "axios";
import { timeConvertor } from "../utils/timeConvertor";

const Modal = ({ callBack, post }) => {
    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState([])
    const [sortedComments, setSortedComments] = useState([]);
    const [reload, setReload] = useState(0)

    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    const adminId = 31;

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
    }, [post.comments, post.id, reload])


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

                callBack('incrementComment')
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
                callBack('decrementComment')

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
                                    {item.uid == uid || uid == adminId ?
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