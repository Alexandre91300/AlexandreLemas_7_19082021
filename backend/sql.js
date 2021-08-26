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
                    res.status(400).json({message: "Pseudonyme déjà utilisé"})
                }
            })

        } else {
            res.status(400).json({message: "E-mail déjà utilisé"})
        }
    })
}

exports.createUser = createUser;