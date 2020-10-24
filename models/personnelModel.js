const mongoose = require('mongoose');


const personnelSchema = new mongoose.Schema({
    prenom : {
        type : String, 
        required: true
    },
    
    nom: {
        type : String, 
        required:  true
    }, 

    identifiant : {
        type : Number, 
        unique : true
    }

});

module.exports = mongoose.model('personnel', personnelSchema);