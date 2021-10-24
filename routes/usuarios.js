//Rutas para crear usuarios
//Importamos express, express tiene el routing
const express = require('express');
const router = express.Router();
const usuarioController = require("./../controllers/usuarioController");
const { check } = require("express-validator");

//Crear un usuario
//Middleware, recibe un request de tipo post a esta url  => /api/usuarios
// api/usuario

router.post('/',
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("email", "Agregar un email válido").isEmail(),
        check("password", "El password debe ser mínimo de 6 caracteres").isLength({min: 6})
    ], 
    usuarioController.crearUsuario
);

module.exports = router;