// SQL > COMMENT


const fs = require('fs');
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'binksbinks91',
    database: 'groupomania'
});

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


