// SQL > POST

const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createPool({
    host: `${process.env.SqlHOST}`,
    user: `${process.env.SqlUSER}`,
    password: `${process.env.SqlPASSWORD}`,
    database: `${process.env.SqlDATABASE}`
});

const createPost = async (post) => {
    let myPromise = () => {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO posts (username,title,description,image,date,uid,likes,commentaires) VALUES (?,?,?,?,?,?,?,?);", [post.username, post.title, post.description, post.image, post.date, post.uid, post.likes, post.commentaires], (err, result) => {
                if (err === null) {
                    resolve()
                } else {
                    reject()
                }
            })

        })
    }

    let result = await (myPromise());
    return result
}
exports.createPost = createPost;

const getPosts = async () => {
    let myPromise = () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM posts", (err, result) => {
                if (result.length !== 0) {
                    resolve(result)
                } else {
                    reject()
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

const updatePostById = async (id, title, description) => {
    let myPromise = () => {
        return new Promise((resolve, reject) => {
            db.query("UPDATE posts SET title=?, description=? WHERE id=?", [title, description, id], (err, result) => {
                if (result.changedRows !== 0) {
                    resolve()
                } else {
                    reject()
                }
            })
        })
    }

    let result = await (myPromise());
    return result
}
exports.updatePostById = updatePostById;

const deletePostById = async (id) => {
    let myPromise = () => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM posts WHERE id = ?", [id], (err, result) => {
                if (result.length !== 0) {
                    db.query("DELETE FROM comments WHERE postId = ?", [id], (err, result) => {
                        resolve()
                    })
                } else {
                    reject()
                }
            })
        })
    }

    let result = await (myPromise());
    return result
}
exports.deletePostById = deletePostById;

const like = async (postId, uid) => {
    let myPromise = () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM posts WHERE id = ?", [postId], (err, result) => {
                if (result.length !== 0) {
                    let likeHere = result[0].likes.split(' ')
                    if (!likeHere.find(e => e == uid)) {
                        let newArr = likeHere;
                        newArr.push(uid.toString());
                        newArr = newArr.join(' ')

                        db.query("UPDATE posts SET likes = ? WHERE id = ?", [newArr, postId], (err, result) => {
                            if (result.changedRows === 1) {
                                resolve('Post liké !')
                            } else {
                                reject("Erreur, like non modifié :/")
                            }
                        })
                    } else {
                        let uidLiked = likeHere.find(e => e == uid);
                        let newArr = likeHere.filter(e => e !== uidLiked);
                        newArr = newArr.join(' ')
                        db.query("UPDATE posts SET likes = ? WHERE id = ?", [newArr, postId], (err, result) => {
                            if (result.changedRows === 1) {
                                resolve('Post disliké !')
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