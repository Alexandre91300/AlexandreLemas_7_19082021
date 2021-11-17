// LOGIQUE DE GESTION DES REQUETES POST 

const sqlPost = require('../sql/post');
const sqlInjection = require('../utils/sqlInjectionFilter')
const fs = require('fs');

exports.new = (req, res, next) => {
    let request = JSON.parse(req.body.post);

    sqlInjection.sqlInjectionFilter(request.username, res)
    sqlInjection.sqlInjectionFilter(request.title, res)
    sqlInjection.sqlInjectionFilter(request.description, res)

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

exports.get = (req, res, next) => {
    sqlPost.getPosts().then(posts => {
        res.status(200).json({ posts })
    }).catch(() => {
        res.status(204).json({ message: 'Aucun post trouvé' })
    })
};

exports.getByUid = (req, res, next) => {

    sqlInjection.sqlInjectionFilter(req.body.uid, res)

    sqlPost.getPostsByUid(req.body.uid).then(posts => {
        res.status(200).json({ posts })
    }).catch(() => {
        res.status(204).json({ message: 'Aucun post trouvé' })
    })

};

exports.update = (req, res, next) => {

    sqlInjection.sqlInjectionFilter(req.body.title, res)
    sqlInjection.sqlInjectionFilter(req.body.description, res)

    sqlPost.updatePostById(req.body.postId, req.body.title, req.body.description)
        .then(() => {
            res.status(200).json({ message: 'Modifié avec succès !' })
        }).catch(() => {
            res.status(200).json({ message: 'Erreur de modification :/' })
        })

};

exports.delete = (req, res, next) => {
    const filename = req.body.imageUrl.split('/images/')[1];

    sqlInjection.sqlInjectionFilter(req.body.postId, res)


    fs.unlink(`images/${filename}`, () => {
        sqlPost.deletePostById(req.body.postId).then(() => {
            res.status(200).json({ message: 'Supprimé avec succès !' })
        }).catch(() => {
            res.status(404).json({ message: "Post non trouvé" })
        })

    })
};

exports.like = (req, res, next) => {

    sqlInjection.sqlInjectionFilter(req.body.postId, res)
    sqlInjection.sqlInjectionFilter(req.body.uid, res)

    sqlPost.like(req.body.postId, req.body.uid)
        .then((response) => {
            res.status(200).json({ message: response })
        })
        .catch((err) => {
            res.status(201).json({ message: err })
        })
};

