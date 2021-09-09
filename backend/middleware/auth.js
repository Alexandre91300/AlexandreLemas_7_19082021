/* VERIFICATION DU TOKEN */

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req,res,next) => {
    try {
        const token = req.body.token;
        const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);
        const userId = decodedToken.userId;
        console.log(req.body.uid);
        console.log(userId.toString());
        if (req.body.uid && req.body.uid !== userId.toString() ) {
            console.log('ii');
            throw 'Invalid user ID';
        } else {
            next()
        }
    } catch (error) {
        console.log('Invalid TOKEN');
        res.status(401).json({error : error | 'Unauthenticated request'});
    }
};