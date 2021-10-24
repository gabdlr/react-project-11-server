const express = require("express");
const conectarDB = require("./config/db");

// Crear el servidor 😮
const app = express();

//Conectar a la base de datos
conectarDB();

//Habilitar express.json
//Si usamos header Content-Type: application/json nos va a permetir leerlo
app.use(express.json({ extended: true }));

//Esto es asi porque si (estamos adaptando a HEROKU)
//puerto del app
const PORT = process.env.PORT || 4000 //Asigna un puerto, lo busca en el env, si no lo encuentra le asigna el 4000

//Importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth") );

//arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})