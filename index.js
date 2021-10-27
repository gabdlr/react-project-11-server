const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

// Crear el servidor 😮
const app = express();

//Conectar a la base de datos
conectarDB();

//Habilitar Cors
app.use(cors());

//Habilitar express.json
//Si usamos header Content-Type: application/json nos va a permetir leerlo
app.use(express.json({ extended: true }));

//Esto es asi porque si (estamos adaptando a HEROKU)
//puerto del app
const port = process.env.port || 4000 //Asigna un puerto, lo busca en el env, si no lo encuentra le asigna el 4000

//Importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth") );
app.use("/api/proyectos", require("./routes/proyectos") );
app.use("/api/tareas", require("./routes/tareas") );

//arrancar la app
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})