const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator")
exports.crearProyecto = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    try {
        //Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        //Guardar el creador via JWT
        //req.usuario se define en el middleware tras la validación del token
        //usuario se define en el payload en el controller (usuarioController)
        proyecto.creador = req.usuario.id
        proyecto.save();
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Hubo un error" });
    }
}

//Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
    try {
        //Usamos un metodo de mongoose que busca todos los resultados
        //que cumplan determinado criterio, en este caso en el campo creador debe
        //ser igual a el id de la "sesion" actual 
        const proyectos = await Proyecto.find({ creador: req.usuario.id});
        res.json(proyectos);
    } catch (error) {
        console.log(error);

    }
}

//Actualiza un proyecto
exports.actualizarProyecto = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer la información del proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};
    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try {
        //Revisar el id
        //req.params.id hace referencia a /:id 
        let proyecto = await Proyecto.findById(req.params.id);

        //Si el proyecto existe o no
        //Si se le pasa un argumento id de mas de 24 caracteres hex
        //o un string de > 12bytes cae en el catch 
        if(!proyecto) {
            //404 not found
            return res.status(404).json({msg: "Proyecto no encontrado"});
        }

        //Verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            //401 forbidden
            return res.status(401).json({msg: "No autorizado"});
        }

        //actualizar
        //Primer parametro seria el where el segundo el update y el tercero 🤷‍♂️
        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id}, { $set: nuevoProyecto}, { new: true});
        res.json({ proyecto });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en el servidor");
    }
}

//Elimina un proyecto por su id
exports.eliminarProyecto = async (req, res) => {
    try {
        //Revisar el id
        //req.params.id hace referencia a /:id 
        let proyecto = await Proyecto.findById(req.params.id);

        //Si el proyecto existe o no
        //Si se le pasa un argumento id de mas de 24 caracteres hex
        //o un string de > 12bytes cae en el catch 
        if(!proyecto) {
            //404 not found
            return res.status(404).json({msg: "Proyecto no encontrado"});
        }

        //Verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            //401 forbidden
            return res.status(401).json({msg: "No autorizado"});
        }

        //Eliminar el proyecto
        await Proyecto.findOneAndRemove({ _id: req.params.id});
        res.json({ msg: "Proyecto Eliminado"});
  
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en el servidor");
    }
}
