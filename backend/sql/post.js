// SQL > POST

const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'binksbinks91',
    database: 'groupomania'
});

const createPost = async (post, res) => {
    db.query("INSERT INTO posts (username,title,description,image,date,uid,likes,commentaires) VALUES (?,?,?,?,?,?,?,?);", [post.username, post.title, post.description, post.image, post.date, post.uid, post.likes, post.commentaires], (err, result) => {
        res.status(201).json({ message: "Post created !" })
    })
}

exports.createPost = createPost;

const getPosts = async () => {
    let myPromise = () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM posts", (err, result) => {

                if (result.length !== 0) {
                    resolve(result)
                } else {
                    reject("Aucun post")
                }
            })
        })
    }

    let result = await (myPromise());

    return result
}

exports.getPosts = getPosts;

const getPostsByUid = async (uid) => {

    let myPromise = () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM posts WHERE uid = ?", [uid], (err, result) => {
                if (result.length !== 0) {
                    resolve(result)
                } else {
                    reject("Aucun post")
                }
            })
        })
    }

    let result = await (myPromise());

    return result
}

exports.getPostsByUid = getPostsByUid;

const deletePostById = async (id) => {

    let myPromise = () => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM posts WHERE id = ?", [id], (err, result) => {

                if (result.length !== 0) {

                    db.query("DELETE FROM comments WHERE postId = ?", [id], (err, result) => {
                        resolve(result)
                    })

                } else {
                    reject("Post non trouvé")
                }
            })
        })
    }

    let result = await (myPromise());

    return result
}

exports.deletePostById = deletePostById;

const updatePostById = async (id, title, description) => {

    let myPromise = () => {
        return new Promise((resolve, reject) => {
            db.query("UPDATE posts SET title=?, description=? WHERE id=?", [title, description, id], (err, result) => {

                console.log(result.changedRows);
                if (result.changedRows !== 0) {
                    resolve(result)
                } else {
                    reject("Post non trouvé")
                }
            })
        })
    }

    let result = await (myPromise());

    return result
}

exports.updatePostById = updatePostById;

const like = async (postId, uid) => {

    let myPromise = () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM posts WHERE id = ?", [postId], (err, result) => {

                if (result.length !== 0) {

                    let likeHere = result[0].likes.split(' ')

                    if (!likeHere.find(e => e == uid)) {

                        console.log('Like');
                        // Liké
                        let newArr = likeHere;
                        newArr.push(uid.toString());
                        newArr = newArr.join(' ')

                        db.query("UPDATE posts SET likes = ? WHERE id = ?", [newArr, postId], (err, result) => {
                            console.log(result.changedRows);

                            if (result.changedRows === 1) {
                                resolve('Liked')
                            } else {
                                reject("Erreur, like non modifié :/")
                            }
                        })
                    } else {
                        // Disliké

                        console.log('Dislike');

                        let uidLiked = likeHere.find(e => e == uid);

                        let newArr = likeHere.filter(e => e !== uidLiked);
                        newArr = newArr.join(' ')

                        db.query("UPDATE posts SET likes = ? WHERE id = ?", [newArr, postId], (err, result) => {
                            console.log(result.changedRows);

                            if (result.changedRows === 1) {
                                resolve('Disliked')
                            } else {
                                reject("Erreur, like non modifié :/")
                            }

                        })

                    }


                } else {
                    reject("Post non trouvé")
                }
            })
        })
    }

    let result = await (myPromise());

    return result
}

exports.like = like;