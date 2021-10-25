import Axios from 'axios';

const token = localStorage.getItem('token');
const uid = localStorage.getItem('id');


export const deletePost = async (postId, imageUrl) => {
    if (token && uid && postId && imageUrl) {

        // Send request
        Axios.post('http://localhost:3000/api/posts/delete', { postId: postId, imageUrl: imageUrl }, {
            headers: {
                authorization: uid + ' ' + token
            }
        }).then(res => {
            window.location.reload()
            return;
        }).catch(err => {
            throw TypeError(err.response.data.message);
        })
    } else {
        throw TypeError("Il manque le post ID, ou l'URL de l'image en argument");
    }
}

export const toggleLikePost = async (postId) => {

    if (token && uid && postId) {

        // Send request
        Axios.post('http://localhost:3000/api/posts/like', { postId: postId, uid: uid }, {
            headers: {
                authorization: uid + ' ' + token
            }
        }).then(res => {
            return;
        })
            .catch(err => {
                throw TypeError(err.response.data.message);
            })
    } else {
        throw TypeError("Il manque le post ID en argument");
    }
}
