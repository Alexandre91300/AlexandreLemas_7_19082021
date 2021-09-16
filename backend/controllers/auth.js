/* LOGIQUE DES REQUETES D'AUTHENTIFICATION */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const passwordValidator = require('password-validator');
const CryptoJS = require("crypto-js");
const sql = require('../sql');

// Password Validator
var schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

// Crypto JS
const key = `${process.env.KEY}`;
const keyutf = CryptoJS.enc.Utf8.parse(key);
const iv = CryptoJS.enc.Base64.parse(key);

const encrypt = (string) => {
    const enc = CryptoJS.AES.encrypt(string, keyutf, { iv: iv });
    return enc.toString();
}

// POST
/******/

exports.signUp = (req,res,next) => {

    if (schema.validate(req.body.password)) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                sql.createUser(encrypt(req.body.email), req.body.username, hash, res)
            })
            .catch(error => res.status(500).json({error}))
    } else {
        res.status(400).json({message: "Invalid password: Min length = 6 / Max length = 100 / Uppercase letters / Lowercase letters / have at least 2 digits"})
    }

};

exports.login = (req,res,next) => {
    sql.getUserByEmail(encrypt(req.body.email),res)
    .then(user => {
        console.log(user.id);
        bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid){
                        res.status(500).json({message : 'Mot de passe invalide'})
                    } else {

                        res.status(200).json({
                            id: user.id,
                            token: jwt.sign({ userId: user.id },
                                `${process.env.TOKEN}`,
                            {expiresIn: 86400}
                            )
                        });
                    }
                })
                .catch(error => res.status(500).json({message : error}));


        
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({message: err})
    })

};

exports.isUserAuth = (req,res,next) => {
    console.log('isAuth');
    res.status(201).json({isAuth : true})

};
