const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            //Son de mongoose 
            //useFindAndModify esta deprecated
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conectado");
    } catch(error) {
        console.log(error);
        process.exit(1); //Detiene la app en caso de error en la conexion
    }
}

module.exports = conectarDB;