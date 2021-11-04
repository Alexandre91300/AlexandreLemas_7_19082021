// LOGIQUE DE GESTION DES REQUETES COMMENTAIRE 

const sqlComment = require('../sql/comment');

exports.new = (req, res, next) => {
    sqlComment.createComment(
        req.body.comment,
        req.body.timestamp,
        req.body.username,
        req.body.postId,
        req.body.uid
    ).then(() => {
        res.status(201).json({ message: 'Commentaire créé avec succès !' })
    }).catch(err => {
        res.status(400).json({ message: 'Commentaire non créé :/' })
    })
};

exports.get = (req, res, next) => {
    sqlComment.getComments(req.body.postId)
        .then(comments => {
            res.status(200).json({ comments: comments })
        })
        .catch(() => {
            res.status(204).json({ message: 'Aucun commentaire' })
        })
};

exports.deleteOne = (req, res, next) => {
    sqlComment.deleteComment(req.body.commentId, req.body.postId)
        .then(response => {
            res.status(200).json({ message: "Commentaire supprimé avec succès !" })
        })
        .catch(() => {
            res.status(200).json({ message: 'Aucun commentaire trouvé :/' })
        })
};