import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';

import Modal from './Modal';
import { deletePost, toggleLikePost } from '../api/Post';
import { timeConvertor } from '../utils/timeConvertor';

import like from '../assets/like.png';
import likeBlack from '../assets/like-black.png';
import comment from '../assets/comment.svg';

const Post = ({ post }) => {
    const history = useHistory();

    const [displayModal, setDisplayModal] = useState(false)
    const [postLiked, setPostLiked] = useState(false);
    const [likeNumber, setlikeNumber] = useState(post.likes.split(' ').length);
    const [commentNumber, setCommentNumber] = useState(post.commentaires)

    const uid = localStorage.getItem('id');
    const postId = post.id;
    const adminId = 31;

    useEffect(() => {
        if (post.likes.split(' ').find(e => e === uid)) {
            setPostLiked(true)
        }

        if (post.likes.split(' ')[0] === '0') {
            setlikeNumber(likeNumber - 1)
        }

    }, [])

    const handleDeletePost = () => {
        deletePost(postId, post.image)
            .then(res => {
                window.location.reload()
            }).catch(err => {
                alert(err)
            })

    }

    const handleToggleLikePost = () => {
        toggleLikePost(postId).then(() => {
            setPostLiked(!postLiked)

            if (!postLiked) {
                setlikeNumber(likeNumber + 1)
            } else {
                setlikeNumber(likeNumber - 1)
            }

        }).catch(err => {
            alert(err)
        })
    }

    const modifyPost = () => {
        history.push({
            pathname: '/modifyPost',
            state: {
                title: post.title,
                description: post.description,
                image: post.image,
                postId: post.id
            }
        })
    }

    const modalCallback = (e) => {
        switch (e) {
            case 'incrementComment':
                setCommentNumber(commentNumber + 1)
                break;

            case 'decrementComment':
                setCommentNumber(commentNumber - 1)
                break;

            default:
                setDisplayModal(false)
                break;
        }
    }

    return (
        <div className='post'>
            <h2 className='post__title'>{post.title}</h2>
            <p className='post__description'>{post.description}</p>
            {uid == post.uid || uid == adminId ?
                <div>
                    <button className='post__deleteBtn' onClick={() => handleDeletePost()} >Supprimer</button>
                    <button className='post__modifyBtn' onClick={() => modifyPost()} >Modifier</button>
                </div>
                :
                null
            }
            <img className='post__image' src={post.image} alt='Comment' />
            <p className='post__txt'>{post.username} <span className='post__txt--grey'>il y a {timeConvertor(post.date)}</span></p>
            <div className='post__ctn'>
                <div onClick={() => handleToggleLikePost()}>
                    {postLiked ?
                        <img className='post__ctn__icon' src={likeBlack} alt='Like' />
                        :
                        <img className='post__ctn__icon' src={like} alt='Like' />
                    }
                </div>
                <p className='post__ctn__txtLike'>{likeNumber} Like</p>
            </div>
            <div className='post__ctn' onClick={() => setDisplayModal(true)}>
                <img className='post__ctn__icon' src={comment} alt='Comment' />
                <p className='post__ctn__txtComment'>{commentNumber} Commentaires</p>
            </div>
            {displayModal && post.comments !== 0 ?
                <Modal post={post} callBack={(e) => { modalCallback(e) }} />
                :
                null
            }
        </div>
    )

}

export default Post;