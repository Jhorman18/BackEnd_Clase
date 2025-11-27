const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const authMiddleware = require("../middleware/authMiddleware")

router.post("/", async (req, res) => {
    try {
        const nuevoUsuario = await usuarioController.crearUsuario(req.body);

        const { usuPassword, ...usuarioSafe } = nuevoUsuario;

        return res.status(201).json(usuarioSafe);
    } catch (error) {
        console.error("Error al crear el usuario:", error);

        return res.status(500).json({
            error: true,
            message: "Error al crear el usuario",
            details: error.message
        });
    }
});


router.get("/", authMiddleware.verifyToken, async (req, res) => {
  try {
    const usuarios = await usuarioController.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener todos los usuarios ", error);
    if (error.message.includes("No hay Usuarios Registrados")) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).send("Error en el servidor");
  }
});

module.exports = router;
