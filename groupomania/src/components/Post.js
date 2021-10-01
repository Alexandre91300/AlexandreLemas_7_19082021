import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import Axios from 'axios';
import { useHistory } from 'react-router';
import Modal from './Modal';
import { useState } from 'react';

const Post = ({post, type}) => {
    const history = useHistory();

    const [displayModal, setDisplayModal] = useState(false)


    let date = new Date(post.date * 1000);

    date = date.toISOString().split('T')[0].split('-').reverse().join('/')

    const deletePost = () => {
        console.log('Delete post');

        let token = localStorage.getItem('token');
        let uid = localStorage.getItem('id');
        let postId = post.id;
        let imageUrl = post.image;

        if (token && uid && postId && imageUrl){

            // Send request
            Axios.post('http://localhost:3000/api/posts/delete', {postId : postId, imageUrl : imageUrl}, {
                headers: {
                  authorization: uid + ' ' + token
                }
              }).then(res => {
                window.location.reload()
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
        }
    }

    const modifyPost = () => {
        history.push({
            pathname : '/modifyPost',
            state: {
                title : post.title,
                description : post.description,
                image : post.image,
                postId : post.id
            }
        })
    }

    switch (type) {
        case 'profil':
            return(
                <div className='post'>
                    <h2 className='post__title'>{post.title}</h2>
                    <p className='post__description'>{post.description}</p>
                    <div>
                        <button className='post__deleteBtn' onClick={() => deletePost()} >Supprimer</button>
                        <button className='post__modifyBtn' onClick={() => modifyPost()} >Modifier</button>
                    </div>
                    <img className='post__image' src={post.image} alt='Comment'/>
                    <p className='post__txt'>{post.username} <span className='post__txt--grey'>le {date}</span></p>
                    <div className='post__ctn'>
                        <img className='post__ctn__icon' src={like} alt='Like'/>
                        <p className='post__ctn__txtLike'>{post.likes} Like</p>
                    </div>
                    <div className='post__ctn'>
                        <img className='post__ctn__icon' src={comment} alt='Comment'/>
                        <p className='post__ctn__txtComment'>{post.commentaires} Commentaires</p>
                    </div>
                </div>
            )
    
        default:
            return(
                <div className='post'>
                    <h2 className='post__title'>{post.title}</h2>
                    <p className='post__description'>{post.description}</p>
                    <img className='post__image' src={post.image} alt='Comment'/>
                    <p className='post__txt'>{post.username} <span className='post__txt--grey'>le {date}</span></p>
                    <div className='post__ctn'>
                        <img className='post__ctn__icon' src={like} alt='Like'/>
                        <p className='post__ctn__txtLike'>{post.likes} Like</p>
                    </div>
                    <div className='post__ctn' onClick={() => setDisplayModal(true)}>
                        <img className='post__ctn__icon' src={comment} alt='Comment'/>
                        <p className='post__ctn__txtComment'>{post.commentaires} Commentaires</p>
                    </div>
                    {displayModal ? 
                    <Modal callBack={() => {setDisplayModal(false)}} />
                    :
                    null
                    }
                </div>
            )
    }

}

export default Post;