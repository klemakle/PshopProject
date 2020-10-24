const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Pas d\'accès')

    try{
        const verifie = jwt.verify(token, process.env.TOKEN_SECRET);
        req.pharm = verifie;
        next();
    } catch(err){
        res.status(400).send('Invalid token');
    }
};