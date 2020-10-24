const mongoose = require('mongoose');



const produitSchema = new mongoose.Schema({
    
    nom_produit :{
        type: String,
        required: true
    },

    type_produit : {
        type : String,
        required : true
    },

    image : {
        type : String,
        required : true
    }


})



module.exports = mongoose.model('Produit', produitSchema);