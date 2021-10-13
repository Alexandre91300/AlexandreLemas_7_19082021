const sql = require('../sql');
const fs = require('fs');


exports.new = (req,res,next) => {
    let request = JSON.parse(req.body.post);
    
    console.log('Requête reçu !');

    let post = {
        username : request.username,
        title : request.title,
        description : request.description,
        image : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        date : request.date,
        uid : parseInt(request.uid),
        likes : 0,
        commentaires : 0
    }
    console.log(post);

    // SQL
    sql.createPost(post, res)
};

exports.like = (req,res,next) => {
    sql.like(req.body.postId, req.body.uid)
    .then((response) => {
        res.status(201).json({message: response})
    })
    .catch((err) => {
        res.status(201).json({message: err})
    })
};

exports.get = (req,res,next) => {
    console.log('Requête reçu');
    
    sql.getPosts().then(posts => {
        res.status(200).json({posts})
    }).catch(err => {
        res.status(201).json({message: err})
    })
};


exports.getByUid = (req,res,next) => {
    console.log('Requête reçu');

    console.log(req.body)
    
    sql.getPostsByUid(req.body.uid).then(posts => {
        res.status(200).json({posts})
    }).catch(err => {
        res.status(201).json({message: err})
    })

};

exports.update = (req,res,next) => {
    console.log('Request update');
    
    console.log(req.body);  
    
    sql.updatePostById(req.body.postId, req.body.title, req.body.description)
    .then(() => {
        res.status(200).json({message: 'Modifié avec succès !'})
    }).catch(() => {
        res.status(200).json({message: 'Erreur de modification :/'})  
    })

};

exports.delete = (req,res,next) => {
    const filename = req.body.imageUrl.split('/images/')[1];
    
    fs.unlink(`images/${filename}`, () => {

        sql.deletePostById(req.body.postId).then(response => {
            res.status(200).json({message: 'Supprimé avec succès !'})
        }).catch(err => {
            res.status(201).json({message: err})
        })

    })
};
