const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'binksbinks91',
  database: 'groupomania'
});

// AUTHENTIFICATION

const createUser = async (email, username, password, res) => {
    await db.query("SELECT * FROM users WHERE email = ?",[email], (err,result) => {
        if(result.length === 0) {
            console.log("Email valide");

            db.query("SELECT * FROM users WHERE username = ?",[username], (err,result) => {
                if(result.length === 0) {
                    console.log("Pseudo valide");
                    
                    db.query("INSERT INTO users (email,username,password) VALUES (?,?,?);",[email,username,password], (err,result) => {
                        res.status(201).json({message: "The user has been successfully created !"})
                    })
                    
                } else {
                    console.log("Pseudonyme déjà utilisé");
                    res.status(400).json({message: "Pseudonyme déjà utilisé"})
                }
            })

        } else {
            console.log("E-mail déjà utilisé");
            res.status(400).json({message: "E-mail déjà utilisé"})
        }
    })
}

exports.createUser = createUser;


const getUserByEmail = async (email) => {
    let myPromise = () => {
        return new Promise ((resolve, reject) => {
            db.query("SELECT * FROM users WHERE email = ?",[email], (err,result) => {
                if(result.length !== 0) {
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
        return new Promise ((resolve, reject) => {
            db.query("SELECT * FROM users WHERE id = ?",[id], (err,result) => {
                if(result.length !== 0) {
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

// POSTS

const createPost = async (post, res) => {
    db.query("INSERT INTO posts (username,title,description,image,date,uid,likes,commentaires) VALUES (?,?,?,?,?,?,?,?);",[post.username,post.title, post.description, post.image ,post.date, post.uid, post.likes, post.commentaires], (err,result) => {
        res.status(201).json({message: "Post created !"})
    })
}

exports.createPost = createPost;

const getPosts = async () => {
    let myPromise = () => {
        return new Promise ((resolve, reject) => {
            db.query("SELECT * FROM posts", (err,result) => {

                if(result.length !== 0) {
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
        return new Promise ((resolve, reject) => {
            db.query("SELECT * FROM posts WHERE uid = ?",[uid], (err,result) => {

                console.log(result);

                if(result.length !== 0) {
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
        return new Promise ((resolve, reject) => {
            db.query("DELETE FROM posts WHERE id = ?",[id], (err,result) => {

                if(result.length !== 0) {
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

exports.deletePostById = deletePostById;

const updatePostById = async (id, title, description) => {

    let myPromise = () => {
        return new Promise ((resolve, reject) => {
            db.query("UPDATE posts SET title=?, description=? WHERE id=?",[title, description, id], (err,result) => {

                console.log(result.changedRows);
                if(result.changedRows !== 0) {
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


// COMMENTS

const createComment = async (comment, timestamp, username, postId, uid) => {

    let myPromise = () => {
        return new Promise ((resolve, reject) => {
            db.query("INSERT INTO comments (comment,username,date,postId,uid) VALUES (?,?,?,?,?);",[comment,username,timestamp,postId,uid], (err,result) => {

                if(result.affectedRows !== 0) {
                    db.query("UPDATE posts SET commentaires = commentaires + 1 WHERE id=?",[postId], (err,result) => {
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
        return new Promise ((resolve, reject) => {
            db.query("SELECT * FROM comments WHERE postId = ?",[postId], (err,result) => {

                if(result.length !== 0) {
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


