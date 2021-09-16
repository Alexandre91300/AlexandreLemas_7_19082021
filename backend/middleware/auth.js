/* VERIFICATION DU TOKEN */

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req,res,next) => {
    
    try {
        const uid = req.headers.authorization.split(' ')[0];
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);
        const userId = decodedToken.userId;
        if (uid && uid !== userId.toString() ) {
            throw 'Invalid user ID';
        } else {
            next()
        }
    } catch (error) {
        console.log('Accès interdit');
        res.status(401).json({error : error | 'Unauthenticated request'});
    }
};