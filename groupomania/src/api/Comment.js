import Axios from 'axios';

export const getCommentsByPostId = async (postId) => {
    let token = localStorage.getItem('token');
    let uid = localStorage.getItem('id');

    let comments = [];

    if (token && uid) {
        await Axios.post('http://localhost:3000/api/comments/get', {
            postId: postId
        }, {
            headers: {
                authorization: uid + ' ' + token
            }
        }).then(res => {
            comments = res.data.comments
        }).catch(err => {
            throw TypeError(err);
        })
    } else {
        throw TypeError("Il manque le TOKEN et l'ID utilisateur");
    }

    return comments;
}

export const createComment = async (comment, postId) => {
    let token = localStorage.getItem('token');
    let uid = localStorage.getItem('id');
    let username = localStorage.getItem('username');

    const commentDatas = {
        comment: comment,
        timestamp: Math.floor(Date.now() / 1000),
        username: username,
        postId: postId,
        uid: uid
    }

    if (token && uid && username) {
        await Axios.post('http://localhost:3000/api/comments/new', commentDatas, {
            headers: {
                authorization: uid + ' ' + token
            }
        }).then(() => {
            return;
        }).catch(err => {
            throw err.response.data.message;
        })
    } else {
        throw 'Nom utilisateur introuvable, impossible de créer le commentaire :/'
    }

}

export const deleteComment = async (commentId, postId) => {
    let token = localStorage.getItem('token');
    let uid = localStorage.getItem('id');

    await Axios.post('http://localhost:3000/api/comments/deleteOne', { commentId: commentId, postId: postId }, {
        headers: {
            authorization: uid + ' ' + token
        }
    }).then(() => {
        return;
    }).catch(err => {
        throw err.response.data.message
    })

}