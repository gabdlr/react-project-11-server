const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuarios = async (req, res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    //extraer el email y el password
    const { email, password } = req.body;

    try {
        //Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if(!usuario) {
            return res.status(400).json({ msg: "El usuario no existe"});
        }

        //Revisar password
        //Compara el password que trae usuario desde la base de datos con el password
        //ingresado por el usuario despues de aplicarle el hash
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({ msg: "Datos incorrectos"});
        }

        //Si todo es correcto devolvemos el JWT
        //Crear y firmar el JWT
        const payload = {
            usuario:{
                id: usuario.id
            }
        };

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 7200 //tiempo en segundos
        }, (error, token) => {
            if (error) throw error;

            //Mensaje de confirmación
            //Retornamos el token (cuando llave y valor se llaman igual puedes retornar unicamente uno de ellos 😮)
                res.json({ token });
        });

    } catch (error) {
        console.log(error);
    }
}