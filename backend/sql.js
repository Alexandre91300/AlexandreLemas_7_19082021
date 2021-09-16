const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'binksbinks91',
  database: 'groupomania'
});


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



const createPost = async (post, res) => {
    db.query("INSERT INTO posts (title,description,image,date,uid,likes,commentaires) VALUES (?,?,?,?,?,?,?);",[post.title, post.description, post.image ,post.date, post.uid, post.likes, post.commentaires], (err,result) => {
        res.status(201).json({message: "Post created !"})
    })
}

exports.createPost = createPost;