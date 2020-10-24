const express = require('express');
const router = express.Router();
const check = require('./check_token');


router.get('/', check, (req, res) => {
    res.send('Page d\'accueil');

});




module.exports = router;