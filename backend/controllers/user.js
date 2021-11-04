// LOGIQUE DE GESTION DES REQUETES USER 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const passwordValidator = require('password-validator');
const CryptoJS = require("crypto-js");
const sqlUser = require('../sql/user');

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

exports.signUp = (req, res, next) => {
    if (schema.validate(req.body.password)) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                sqlUser.createUser(encrypt(req.body.email), req.body.username, hash, res)
            })
            .catch(error => res.status(500).json({ error }))
    } else {
        res.status(409).json({ message: "Mot de passe invalide: longueur min = 6 /longueur max = 100 / MAJUSCULE / minuscule / min 2 caractères digitale" })
    }
};

exports.login = (req, res, next) => {
    sqlUser.getUserByEmail(encrypt(req.body.email), res)
        .then(user => {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        res.status(403).json({ message: 'Mot de passe invalide' })
                    } else {
                        res.status(200).json({
                            id: user.id,
                            username: user.username,
                            token: jwt.sign({ userId: user.id },
                                `${process.env.TOKEN}`,
                                { expiresIn: 86400 }
                            )
                        });
                    }
                })
                .catch(error => res.status(500).json({ message: error }));
        })
};

exports.isUserAuth = (req, res, next) => {
    sqlUser.getUserById(req.headers.authorization.split(' ')[0])
        .then(user => {
            res.status(200).json({ isAuth: true, username: user.username })
        })
        .catch(() => {
            res.status(401).json({ isAuth: false })
        })

};

exports.deleteDatas = (req, res, next) => {
    sqlUser.deleteDatas(req.body.uid).then(() => {
        res.status(200).json({ message: 'Données utilisateur supprimé avec succès !' })
    }).catch(() => {
        res.status(500).json({ message: 'Problème de suppression :/' })
    })
};

exports.deleteAccount = (req, res, next) => {
    sqlUser.deleteAccount(req.body.uid).then(() => {
        res.status(200).json({ message: 'Compte et données utilisateur supprimé avec succès !' })
    }).catch(() => {
        res.status(500).json({ message: 'Problème de suppression :/' })
    })
};

