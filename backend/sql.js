const fs = require('fs');
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'binksbinks91',
    database: 'groupomania'
});

// USER

const createUser = async (email, username, password, res) => {
    await db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (result.length === 0) {
            console.log("Email valide");

            db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
                if (result.length === 0) {
                    console.log("Pseudo valide");

                    db.query("INSERT INTO users (email,username,password) VALUES (?,?,?);", [email, username, password], (err, result) => {
                        res.status(201).json({ message: "The user has been successfully created !" })
                    })

                } else {
                    console.log("Pseudonyme déjà utilisé");
                    res.status(400).json({ message: "Pseudonyme déjà utilisé" })
                }
            })

        } else {
            console.log("E-mail déjà utilisé");
            res.status(400).json({ message: "E-mail déjà utilisé" })
        }
    })
}

exports.createUser = createUser;


const getUserByEmail = async (email) => {
    let myPromise = () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
                if (result.length !== 0) {
                    resolve(result[0])
                } else {
                    reject("E-mail invalide")
                }
            })
        })
    }

    let result = await (myPromise());

    return result
}

exports.getUserByEmail = getUserByEmail;

const getUserById = async (id) => {
    let myPromise = () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {

                if (result.length !== 0) {
                    resolve(result[0])
                } else {
                    reject("Utilisateur introuvable")
                }
            })
        })
    }

    let result = await (myPromise());

    return result
}

exports.getUserById = getUserById;

const deleteDatas = async (uid) => {

    // Supprimer les posts et commentaires

    let myPromise = () => {
        return new Promise((resolve, reject) => {
            getPostsByUid(uid).then(posts => {

                // Delete images
                posts.map(item => {
                    console.log(item.image);
                    let filename = item.image.split('/images/')[1];

                    fs.unlink(`images/${filename}`, () => {
                        console.log('Image supprimé avec succès !');
                    })
                })

                db.query("DELETE FROM posts WHERE uid = ?", [uid], (err, result) => {
                    db.query("DELETE FROM comments WHERE uid = ?", [uid], (err, result) => {
                        resolve()
                    })
                })
            })
        })
    }

    let result = await (myPromise());

    return result
}

exports.deleteDatas = deleteDatas;

const deleteAccount = async (uid) => {

    // Supprimer les posts et commentaires

    let myPromise = () => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM users WHERE id = ?", [uid], (err, result) => {
                deleteDatas(uid).then(() => {
                    resolve()
                }).catch(() => {
                    reject()
                })
            })
        })
    }

    let result = await (myPromise());

    return result
}

exports.deleteAccount = deleteAccount;

// POSTS

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

                console.log(result);

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


// COMMENTS

const createComment = async (comment, timestamp, username, postId, uid) => {
    let myPromise = () => {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO comments (comment,username,date,postId,uid) VALUES (?,?,?,?,?);", [comment, username, timestamp, postId, uid], (err, result) => {

                if (result.affectedRows !== 0) {
                    db.query("UPDATE posts SET commentaires = commentaires + 1 WHERE id=?", [postId], (err, result) => {
                        console.log(result);
                        resolve(result)
                    })
                } else {
                    reject("Commentaire non créé")
                }
            })
        })
    }

    let result = await (myPromise());

    return result
}

exports.createComment = createComment;

const getComments = async (postId) => {
    let myPromise = () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM comments WHERE postId = ?", [postId], (err, result) => {

                if (result.length !== 0) {
                    resolve(result)
                } else {
                    reject("Aucun commentaires")
                }
            })
        })
    }

    let result = await (myPromise());

    return result
}

exports.getComments = getComments;

const deleteSingleComment = async (commentId, postId) => {
    let myPromise = () => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM comments WHERE id = ?", [commentId], (err, result) => {

                if (result.length !== 0) {
                    db.query("UPDATE posts SET commentaires = commentaires - 1 WHERE id=?", [postId], (err, result) => {
                        resolve("Commentaire supprimé")
                    })
                } else {
                    reject("Commentaire non trouvé")
                }
            })
        })
    }

    let result = await (myPromise());

    return result
}

exports.deleteSingleComment = deleteSingleComment;


