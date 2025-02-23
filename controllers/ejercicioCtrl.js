const Ejercicio = require('../models/ejercicio');
const Usuario = require('../models/usuario');
const dayjs = require('dayjs');

// Crear nuevo ejercicio
const CrearEjercicio = async (req, res) => {
    try {
        const { id:usuarioId } = req.usuario; 
        const { nombreEjercicio, grupoMusculares, dia, series, repeticiones, peso } = req.body;


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
            historialPesos: [{ peso, fecha: dayjs().format('YYYY-MM-DD')}],  // Se agrega el primer peso al historial
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
        const fechaActual = fecha ? dayjs(fecha).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');


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


const obtenerEjerciciosPorDia = async (req, res) => {
    const { dia } = req.query; 
    const { id } = req.usuario; 

    if (!dia) {
        return res.status(400).json({ message: 'Día no especificado' });
    }

    try {
        // Obtener los ejercicios filtrados por usuarioId y dia
        const ejercicios = await Ejercicio.find({ usuarioId: id, dia });

        if (ejercicios.length === 0) {
            return res.status(404).json({ message: `No se encontraron ejercicios para el día ${dia} para el usuario con ID ${id}` });
        }

        // Enviar los ejercicios encontrados
        res.json(ejercicios);
        
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los ejercicios', error });
    }
};

const eliminarEjercicio = async (req, res) => {
    try {

        const { id } = req.params;

        const ejercicio = await Ejercicio.findById(id);

        if (!ejercicio) {
            return res.status(404).json({message: 'Ejercicio no encontrado'})
        }

        await ejercicio.deleteOne();
        res.status(200).json({message: 'Ejercicio eliminado correctamente.' })
    } catch (error) {
        res.status(500).json({message: 'Error al eliminar el ejercicio', error: error.message})
    }

}




module.exports = {
    CrearEjercicio,
    agregarPeso,
    actualizar,
    obtenerEjercicio,
    obtenerEjerciciosPorDia,
    eliminarEjercicio
};
