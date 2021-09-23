const sql = require('../sql');

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

exports.get = (req,res,next) => {
    console.log('Requête reçu');
    
    sql.getPosts().then(posts => {
        res.status(200).json({posts})
    }).catch(err => {
        res.status(201).json({message: err})
    })
};