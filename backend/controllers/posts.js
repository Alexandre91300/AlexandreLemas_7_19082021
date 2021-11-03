/* LOGIQUE DE GESTION DES REQUETES POST */

const sqlPost = require('../sql/post');
const fs = require('fs');

// Valid
exports.new = (req, res, next) => {
    let request = JSON.parse(req.body.post);

    let post = {
        username: request.username,
        title: request.title,
        description: request.description,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        date: request.date,
        uid: parseInt(request.uid),
        likes: 0,
        commentaires: 0
    }

    sqlPost.createPost(post).then(() => {
        res.status(201).json({ message: "Post publié avec succès !" })
    }).catch(() => {
        res.status(400).json({ message: "Impossible de publier le post :/" })
    })
};

// Invalid
exports.like = (req, res, next) => {
    sqlPost.like(req.body.postId, req.body.uid)
        .then((response) => {
            res.status(201).json({ message: response })
        })
        .catch((err) => {
            res.status(201).json({ message: err })
        })
};

// Invalid
exports.get = (req, res, next) => {
    console.log('Requête reçu');

    sqlPost.getPosts().then(posts => {
        res.status(200).json({ posts })
    }).catch(err => {
        res.status(201).json({ message: err })
    })
};

// Invalid
exports.getByUid = (req, res, next) => {
    console.log('Requête reçu');

    console.log(req.body)

    sqlPost.getPostsByUid(req.body.uid).then(posts => {
        res.status(200).json({ posts })
    }).catch(err => {
        res.status(201).json({ message: err })
    })

};

// Invalid
exports.update = (req, res, next) => {
    console.log('Request update');

    console.log(req.body);

    sqlPost.updatePostById(req.body.postId, req.body.title, req.body.description)
        .then(() => {
            res.status(200).json({ message: 'Modifié avec succès !' })
        }).catch(() => {
            res.status(200).json({ message: 'Erreur de modification :/' })
        })

};

// Invalid

exports.delete = (req, res, next) => {
    console.log(req.body.imageUrl);
    const filename = req.body.imageUrl.split('/images/')[1];

    fs.unlink(`images/${filename}`, () => {

        sqlPost.deletePostById(req.body.postId).then(response => {
            res.status(200).json({ message: 'Supprimé avec succès !' })
        }).catch(err => {
            res.status(201).json({ message: err })
        })

    })
};
