// Modal d'affichages des commentaires

import React, { useEffect, useState } from "react";
import { timeConvertor } from "../utils/timeConvertor";
import { createComment, getCommentsByPostId, deleteComment } from "../api/Comment";

const Modal = ({ callBack, post }) => {
    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState([])
    const [sortedComments, setSortedComments] = useState([]);
    const [reload, setReload] = useState(0)

    const uid = localStorage.getItem('id');
    const adminId = 31;

    useEffect(() => {
        if (post.comments !== 0) {
            getCommentsByPostId(post.id)
                .then(comments => {
                    setAllComments(comments)
                })
                .catch(err => {
                    alert(err)
                })
        }
    }, [post.comments, post.id, reload])

    const handleCreateComment = () => {
        if (comment.length !== 0) {
            createComment(comment, post.id)
                .then(() => {
                    callBack('incrementComment')
                    setReload(reload + 1)
                    setComment('')
                })
                .catch(err => {
                    alert(err.response.data.message)
                })
        }
    }

    const handleDeleteComment = (commentId, postId) => {
        if (commentId && postId) {
            deleteComment(commentId, postId)
                .then(() => {
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

                <div className='modal__ctn__commentCtn'>
                    {allComments ?
                        sortedComments.map((item, index) => {
                            return (
                                <div key={index} className='modal__ctn__commentCtn__comment'>
                                    <p>Par <strong>{item.username}</strong> il y a {timeConvertor(item.date)}</p>
                                    <p className='modal__ctn__commentCtn__comment__text'>{item.comment}</p>
                                    {item.uid == uid || uid == adminId ?
                                        <button
                                            onClick={() => { handleDeleteComment(item.id, post.id) }}
                                            className='modal__ctn__commentCtn__comment__btn'
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
                    handleCreateComment()
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