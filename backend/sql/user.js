// SQL > USER

const fs = require('fs');
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'binksbinks91',
    database: 'groupomania'
});

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
