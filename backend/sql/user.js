// SQL > USER

const fs = require('fs');
const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createPool({
    host: `${process.env.SqlHOST}`,
    user: `${process.env.SqlUSER}`,
    password: `${process.env.SqlPASSWORD}`,
    database: `${process.env.SqlDATABASE}`
});

const createUser = async (email, username, password, res) => {
    await db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (result.length === 0) {
            db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
                if (result.length === 0) {
                    db.query("INSERT INTO users (email,username,password) VALUES (?,?,?);", [email, username, password], (err, result) => {
                        res.status(201).json({ message: "Utilisateur créé avec succès !" })
                    })

                } else {
                    res.status(409).json({ message: "Pseudonyme déjà utilisé" })
                }
            })

        } else {
            res.status(409).json({ message: "E-mail déjà utilisé" })
        }
    })
}
exports.createUser = createUser;

const getUserByEmail = async (email, res) => {
    let myPromise = () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
                if (result.length !== 0) {
                    resolve(result[0])
                } else {
                    res.status(404).json({ message: 'Utilisateur introuvable' })
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
                    reject()
                }
            })
        })
    }

    let result = await (myPromise());
    return result
}
exports.getUserById = getUserById;

const deleteDatas = async (uid) => {
    let myPromise = () => {
        return new Promise((resolve, reject) => {
            console.log('Delete datas')
            db.query("SELECT * FROM posts WHERE uid = ?", [uid], (err, result) => {
                if (result.length !== 0) {
                    result.map(item => {
                        let filename = item.image.split('/images/')[1]

                        console.log('filename =>');
                        console.log(filename);

                        try {
                            fs.unlink(`images/${filename}`, (e) => {
                                console.log('Image supprimé avec succès !');
                            })
                        } catch (error) {
                            console.log('ERROR => ' + error);
                        }
                    })

                    db.query("DELETE FROM posts WHERE uid = ?", [uid], (err, result) => {
                        db.query("DELETE FROM comments WHERE uid = ?", [uid], (err, result) => {
                            resolve()
                        })
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
exports.deleteDatas = deleteDatas;

const deleteAccount = async (uid) => {
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
