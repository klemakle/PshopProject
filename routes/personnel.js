const router  = require('express').Router();
const Personnel = require('../models/personnelModel');


router.get('/', (req, res) => {
    res.send('Tout le personnel');
    
    //afficher une liste de tout le personnel
    
    //prevoir le personnel autorié à valider des commandes
})

router.get('/add', (req,res) => {
    res.send('ajouter un personnel');

    //formulaire d'ajout d'un persoonel
})



module.exports = router;