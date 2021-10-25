const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");

//Crea proyectos => /api/proyectos
router.post("/",
    auth,
    [
        check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()
    ], 
    proyectoController.crearProyecto
);

//Obtener todos los proyectos
router.get("/",
    auth, 
    proyectoController.obtenerProyectos
);

//Actualizar proyectos los : le dice a express que es un comodin ya que no sabemos que id
//se le va a estar pasando
router.put("/:id",
    auth,
    [
        check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()
    ], 
    proyectoController.actualizarProyecto
);

//Eliminar un proyecto
router.delete("/:id",
    auth,
    proyectoController.eliminarProyecto
);

module.exports = router;