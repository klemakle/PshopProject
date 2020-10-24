//Validation
const joi = require("joi");

//Validation de l'inscription
const registerValide = data => {
    const schema = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().required().email(),
        password: joi.string().min(6).required(),
        gerant: joi.string().required(),
        address: joi.string().required(),
        telephone: joi.string().required()
    });
    return schema.validate(data)
};


//Validation de la connexion
const loginValide = data => {
    const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required()
    });
    return schema.validate(data);
};



module.exports.registerValide = registerValide;
module.exports.loginValide = loginValide;