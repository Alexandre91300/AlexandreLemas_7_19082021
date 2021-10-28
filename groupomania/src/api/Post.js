import Axios from 'axios';

export const getPosts = async () => {
    let token = localStorage.getItem('token');
    let uid = localStorage.getItem('id');

    let posts = [];

    // Get posts
    if (token && uid) {

        // Send request
        await Axios.get('http://localhost:3000/api/posts/get', {
            headers: {
                authorization: uid + ' ' + token
            }
        }).then(res => {
            if (res.data.posts !== undefined) {
                posts = res.data.posts
            }
        }).catch(err => {
            throw TypeError(err);
        })
    } else {
        throw TypeError("Il manque le TOKEN et l'ID utilisateur");
    }

    return posts.reverse()
}

export const getPostsByUid = async () => {
    let token = localStorage.getItem('token');
    let uid = localStorage.getItem('id');

    let posts = [];

    // Get posts
    if (token && uid) {

        // Send request
        await Axios.post('http://localhost:3000/api/posts/getByUid', { uid: uid }, {
            headers: {
                authorization: uid + ' ' + token
            }
        }).then(res => {
            if (res.data.posts !== undefined) {
                posts = res.data.posts.reverse()
            }
        }).catch(err => {
            throw TypeError(err);
        })
    } else {
        throw TypeError("Il manque le TOKEN et l'ID utilisateur");
    }

    return posts.reverse()
}

export const createPost = async (title, description, image) => {
    let token = localStorage.getItem('token');
    let uid = localStorage.getItem('id');
    let username = localStorage.getItem('username');


    let post = {
        title: title,
        description: description,
        date: Math.floor(Date.now() / 1000),
        uid: uid,
        username: username
    }

    const formData = new FormData()

    formData.append('post', JSON.stringify(post));
    formData.append('image', image);

    // Send request
    await Axios.post('http://localhost:3000/api/posts/new', formData, {
        headers: {
            authorization: uid + ' ' + token
        }
    })
        .then(() => {
            return;
        })
        .catch(err => {
            throw TypeError(err.response.data.message);
        })
}


export const deletePost = async (postId, imageUrl) => {
    let token = localStorage.getItem('token');
    let uid = localStorage.getItem('id');

    if (postId && imageUrl) {

        // Send request
        await Axios.post('http://localhost:3000/api/posts/delete', { postId: postId, imageUrl: imageUrl }, {
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
    let token = localStorage.getItem('token');
    let uid = localStorage.getItem('id');

    if (postId) {

        // Send request
        await Axios.post('http://localhost:3000/api/posts/like', { postId: postId, uid: uid }, {
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

export const modifyPost = async (title, description, postId) => {
    let token = localStorage.getItem('token');
    let uid = localStorage.getItem('id');


    let post = {
        title: title,
        description: description,
        postId: postId,
    }

    // Send request
    await Axios.post('http://localhost:3000/api/posts/update', post, {
        headers: {
            authorization: uid + ' ' + token
        }
    }).then(() => {
        return;
    }).catch(err => {
        throw TypeError(err.response.data.message)
    })

}
