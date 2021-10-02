const sql = require('../sql');

exports.new = (req,res,next) => {
    console.log(req.body);
    
    sql.createComment(
        req.body.comment,
        req.body.timestamp,
        req.body.username,
        req.body.postId)
        .then(() => {
            res.status(200).json({message : 'Commentaire créé avec succès !'})
        })
        .catch(err => {
            res.status(200).json({message : 'Erreur'})
        })
};

exports.get = (req,res,next) => {
    sql.getComments(req.body.postId)
    .then(comments => {
    res.status(200).json({comments : comments})
    })
    .catch(err => {
        res.status(200).json({message : 'Aucun commentaire trouvé :/'})
    })
    
};