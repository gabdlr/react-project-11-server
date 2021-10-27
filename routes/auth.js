//Rutas para autenticar usuarios
//Express, router y check
const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");

//Autentica un usuario
//Middleware, recibe un request de tipo post a esta url  => /api/auth
// api/auth

router.post('/',
    // [
    //     check("email", "Agregar un email válido").isEmail(),
    //     check("password", "El password debe ser mínimo de 6 caracteres").isLength({min: 6})
    // ], 
    authController.autenticarUsuarios
);

router.get('/',
    auth,
    authController.usuarioAutenticado
    )
module.exports = router;