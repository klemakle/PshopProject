const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Pharmacie = require('../models/Pharmacie');
const { registerValide, loginValide } = require('../models/valide');


const dotenv = require('dotenv');
dotenv.config();
const admin = process.env.ADMIN ; 







//validation d'inscription
router.post('/sign',  async (req, res) => {
    
    //Verifions les erreurs
    const { error } = registerValide(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Verifions si une pharmacie avec les mêmes props existe ?
    const emailExist = await Pharmacie.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Cet Email est déja utilisé');

    // Hashons les mots de passe avec bcrypt
    const hashPassword = await bcrypt.hash(req.body.password, 10)

    //Creons une pharmacie
    const pharma = new Pharmacie({
        name : req.body.name,
        email : req.body.email,
        password : hashPassword,
        gerant : req.body.gerant,
        address : req.body.address,
        telephone : req.body.telephone
});

    try {
        const pharmaCreee = await pharma.save();

        res.send(pharmaCreee);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }

});





//Validation de connexion
router.post('/login', async (req, res) => {

    if(req.body.email !== admin){
        
        const { error} = loginValide(req.body);
        if(error) return res.status(400).send(error.details[0].message);


        const pharm = await Pharmacie.findOne({ email: req.body.email});
        
        // Verification email
        if(!pharm) return res.status(400).send('Email ou Password incorrect')
        if(!pharm.authorized  ) return res.status(400).send('Vous n\'êtes pas encore autorisé à accéder à la plateforme')
        
        // Verification mot de passe
        const passwordValid = await bcrypt.compare(req.body.password, pharm.password)
        if(!passwordValid) return res.status(400).send('Password incorrect')
    

        // assignation de token
        const token = jwt.sign({_id: pharm._id}, process.env.TOKEN_SECRET);
        
        //rendu
        res.header('auth-token', token).send(`Vous êtes en ligne!\n Token : ${token}`);

    }
    
    //page admin
    else{
        try{
            if( req.body.password !== process.env.PASSWORD) return res.status(400).send('Attention')

            return res.status(200).send('page admin')
        }
        catch(e){
            console.log(e);
        }
       
    }
        
    
    
    
});



module.exports = router; 