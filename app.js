const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');

//import routes
const authRoute = require('./routes/authentification');
const accueil = require('./routes/accueil');
const personnel = require('./routes/personnel');
const adminPage = require('./routes/admin');


dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,{
     useNewUrlParser: true, 
     useUnifiedTopology: true ,
    useFindAndModify : false,
    })
.then(() => {
    app.listen(port, () => console.log(`le serveur a démarré sur le port : ${port}`))
    console.log('connexion à la base réussie ! ')
})
.catch( err => console.error(err));



//Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes middlewares
app.use('/auth', authRoute);
app.use('/accueil', accueil);
app.use('/personnel', personnel);
app.use('/admin1', adminPage);







