import like from '../assets/like.svg';
import comment from '../assets/comment.svg';

const Post = ({post}) => {

    return(
        <div className='post'>
            <h2 className='post__title'>{post.title}</h2>
            <p className='post__description'>{post.description}</p>
            <img className='post__image' src={post.image} alt='Comment'/>
            <p className='post__txt'>{post.uid} <span className='post__txt--grey'>le {post.date}</span></p>
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
}

export default Post;