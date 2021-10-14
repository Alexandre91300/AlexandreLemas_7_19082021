const sql = require('../sql');

exports.new = (req, res, next) => {
    console.log('CREATE COMMENT');


    sql.createComment(
        req.body.comment,
        req.body.timestamp,
        req.body.username,
        req.body.postId,
        req.body.uid
    )
        .then(() => {
            res.status(200).json({ message: 'Commentaire créé avec succès !' })
        })
        .catch(err => {
            res.status(200).json({ message: 'Erreur' })
        })
};

exports.get = (req, res, next) => {
    console.log('GET COMMENTS');

    sql.getComments(req.body.postId)
        .then(comments => {
            res.status(200).json({ comments: comments })
        })
        .catch(err => {
            res.status(200).json({ message: 'Aucun commentaire trouvé :/' })
        })

};


exports.deleteOne = (req, res, next) => {
    console.log('DELETE COMMENT');
    sql.deleteSingleComment(req.body.commentId, req.body.postId)
        .then(response => {
            res.status(200).json({ message: response })
        })
        .catch(err => {
            res.status(200).json({ message: 'Aucun commentaire trouvé :/' })
        })
};