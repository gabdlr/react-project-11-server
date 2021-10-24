const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }
    //extraer email y password
    const { email, password } = req.body;

    try {

        //Revisar que el usuario registrado sea único
        //findOne es un metodo de mongoose que busca algun registro que haga match con lo que se le esta pasando
        //(el email en este caso)
        let usuario = await Usuario.findOne({ email })
        if (usuario) return res.status(400).json({ msg: "El usuario ya existe"})
        //crea el nuevo usuario
        usuario = new Usuario(req.body);

        //Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //guardar el nuevo usuario
        await usuario.save();

        //Crear y firmar el JWT
        const payload = {
            usuario:{
                id: usuario.id
            }
        };

        //Firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //tiempo en segundos
        }, (error, token) => {
            if (error) throw error;

            //Mensaje de confirmación
            //Retornamos el token (cuando llave y valor se llaman igual puedes retornar unicamente uno de ellos 😮)
                res.json({ token });
        });


    } catch (error) {
        console.log(error);
        res.status(400).send("Hubo un error");
    }
} 