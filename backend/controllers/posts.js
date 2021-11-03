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

// Valid
exports.get = (req, res, next) => {
    sqlPost.getPosts().then(posts => {
        res.status(200).json({ posts })
    }).catch(err => {
        res.status(204).json({ message: 'Aucun post trouvé' })
    })
};

// Valid
exports.getByUid = (req, res, next) => {
    sqlPost.getPostsByUid(req.body.uid).then(posts => {
        res.status(200).json({ posts })
    }).catch(err => {
        res.status(204).json({ message: 'Aucun post trouvé' })
    })

};

// Valid
exports.update = (req, res, next) => {
    sqlPost.updatePostById(req.body.postId, req.body.title, req.body.description)
        .then(() => {
            res.status(200).json({ message: 'Modifié avec succès !' })
        }).catch(() => {
            res.status(200).json({ message: 'Erreur de modification :/' })
        })

};

// Valid
exports.delete = (req, res, next) => {
    const filename = req.body.imageUrl.split('/images/')[1];

    fs.unlink(`images/${filename}`, () => {
        sqlPost.deletePostById(req.body.postId).then(() => {
            res.status(200).json({ message: 'Supprimé avec succès !' })
        }).catch(() => {
            res.status(404).json({ message: "Post non trouvé" })
        })

    })
};

// Valid
exports.like = (req, res, next) => {
    sqlPost.like(req.body.postId, req.body.uid)
        .then((response) => {
            res.status(200).json({ message: response })
        })
        .catch((err) => {
            res.status(201).json({ message: err })
        })
};

