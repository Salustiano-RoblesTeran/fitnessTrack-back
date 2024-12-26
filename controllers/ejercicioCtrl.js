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


// Agregar peso
const agregarPeso = async (req, res) => {
    try {
        const ejercicio = await Ejercicio.findById(req.params.id);
        if (!ejercicio) {
            return res.status(404).json({ message: 'Ejercicio no encontrado' });
        }

        // Obtener el peso y la fecha desde el cuerpo de la solicitud
        const { peso, fecha } = req.body;

        // Si no se proporciona una fecha, usar la fecha actual
        const fechaActual = fecha || new Date();

        // Agregar el nuevo peso al historial
        ejercicio.historialPesos.push({ peso, fecha: fechaActual });

        await ejercicio.save();
        res.status(200).json(ejercicio);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el peso', error });
    }
};


const actualizar = async (req, res) => {
    try {
    const { id } = req.params;
    const { nombreEjercicio, grupoMusculares, dia, series, repeticiones, peso } = req.body;

    const ejercicio = await Ejercicio.findById(id);
    if (!ejercicio) {
        return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }

    // Actualizar los campos del ejercicio
    

    ejercicio.nombreEjercicio = nombreEjercicio;
    ejercicio.grupoMusculares = grupoMusculares;
    ejercicio.dia = dia;
    ejercicio.series = series;
    ejercicio.repeticiones = repeticiones;
    ejercicio.historialPesos[0].peso = peso;

    await ejercicio.save();

    // **IMPORTANTE: Enviar respuesta al cliente**
    res.json({
        message: 'Ejercicio actualizado correctamente',
        ejercicio
    });

} catch (error) {
    res.status(500).json({ message: 'Hubo un error al actualizar el ejercicio', error });
}
}


const obtenerEjercicio = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Buscar el ejercicio por ID
        const ejercicio = await Ejercicio.findById(id);
        
        if (!ejercicio) {
            return res.status(404).json({ message: 'Ejercicio no encontrado' });
        }

        // Enviar el ejercicio encontrado
        res.json(ejercicio);
        
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el ejercicio', error });
    }
};


module.exports = {
    CrearEjercicio,
    agregarPeso,
    actualizar,
    obtenerEjercicio
};
