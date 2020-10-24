const mongoose = require('mongoose');
const { boolean } = require('joi');

const pharmacieSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 10,
        max : 256
    }, 

    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true,
        max : 1024,
        min : 10
    },

    gerant : {
        type : String,
        required : true,
    },

    address : {
        type : String,
        required : true,
        min : 10,
        max : 511
    },

    telephone : {
        type : String,
        required : true,
        min : 9,
        max : 31

    }, 
    authorized : {
        type: Boolean,
        default : false,
        required : false

    }
});

module.exports = mongoose.model('Pharmacie', pharmacieSchema);