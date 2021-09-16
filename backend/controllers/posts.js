exports.new = (req,res,next) => {
    let request = JSON.parse(req.body.post);
    console.log('Requête reçu !');
    console.log(request);

    console.log(`${req.protocol}://${req.get('host')}/images/${req.file.filename}`);
    res.status(201).json({message : 'Requête reçu !'})
};
