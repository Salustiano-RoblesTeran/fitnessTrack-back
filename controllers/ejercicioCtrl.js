const Ejercicio = require('../models/ejercicio');
const Usuario = require('../models/usuario');

// Crear nuevo ejercicio
const CrearEjercicio = async (req, res) => {
    try {
        const { nombreEjercicio, grupoMusculares, dia, series, repeticiones, peso, usuarioId } = req.body;

        // Verificar si el usuario existe
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Crear un nuevo ejercicio con el peso inicial en el historial
        const nuevoEjercicio = new Ejercicio({
            nombreEjercicio,
            grupoMusculares,
            dia,
            series,
            repeticiones,
            historialPesos: [{ peso, fecha: new Date() }],  // Se agrega el primer peso al historial
            usuarioId
        });

        // Guardar el ejercicio en la base de datos
        await nuevoEjercicio.save();
        res.status(201).json(nuevoEjercicio);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el ejercicio", error });
    }
};

module.exports = {
    CrearEjercicio
};
