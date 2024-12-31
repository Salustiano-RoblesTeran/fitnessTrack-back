const { response, request } = require("express");
const { Ciclismo, Correr } =  require("../models/actividad");
const dayjs = require('dayjs');

// Controlador para agregar un registro de "Ciclismo"
const agregarCiclismo = async (req = request, res = response) => {
    const { distancia, minutos, fecha } = req.body;

    try {
        const registroCiclismo = new Ciclismo({
            distancia,
            minutos,
            fecha: dayjs(fecha).format('YYYY-MM-DD'), // Formatear la fecha antes de guardar
            usuario: req.usuario.id // ID del usuario autenticado
        });

        await registroCiclismo.save();

        res.status(201).json({
            ok: true,
            msg: 'Registro de ciclismo agregado correctamente',
            registroCiclismo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al guardar el registro de ciclismo'
        });
    }
};

// Controlador para agregar un registro de "Correr"
const agregarCorrer = async (req = request, res = response) => {
    const { distancia, minutos, fecha } = req.body;

    try {
        const registroCorrer = new Correr({
            distancia,
            minutos,
            fecha: dayjs(fecha).format('YYYY-MM-DD'), // Formatear la fecha antes de guardar
            usuario: req.usuario.id // ID del usuario autenticado
        });

        await registroCorrer.save();

        res.status(201).json({
            ok: true,
            msg: 'Registro de correr agregado correctamente',
            registroCorrer
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al guardar el registro de correr'
        });
    }
};

// Controlador para obtener registros de "Ciclismo"
const obtenerCiclismo = async (req, res) => {
    try {
        const usuarioId = req.usuario.id; // ID del usuario autenticado
        const { filtro, fechaInicio, fechaFin } = req.query; // Capturar el filtro de los query params

        let rangoFechas = {};

        // Definir el rango de fechas según el filtro
        if (filtro === 'ultimaSemana') {
            rangoFechas = {
                $gte: dayjs().subtract(7, 'day').startOf('day').toDate(), // Hace 7 días
                $lte: dayjs().endOf('day').toDate(), // Hoy
            };
        } else if (filtro === 'ultimoMes') {
            rangoFechas = {
                $gte: dayjs().subtract(1, 'month').startOf('day').toDate(), // Hace 1 mes
                $lte: dayjs().endOf('day').toDate(), // Hoy
            };
        } else if (filtro === 'personalizado' && fechaInicio && fechaFin) {
            rangoFechas = {
                $gte: dayjs(fechaInicio).startOf('day').toDate(),
                $lte: dayjs(fechaFin).endOf('day').toDate(),
            };
        }

        // Crear el filtro de búsqueda
        const filtroBusqueda = { usuario: usuarioId };
        if (Object.keys(rangoFechas).length > 0) {
            filtroBusqueda.fecha = rangoFechas; // Agregar rango de fechas al filtro
        }

        // Obtener registros de ciclismo para el usuario autenticado
        const registrosCiclismo = await Ciclismo.find(filtroBusqueda).sort({ fecha: -1 });

        // Formatear las fechas al enviar la respuesta
        const registrosCiclismoFormateados = registrosCiclismo.map((registro) => ({
            ...registro.toObject(),
            fecha: dayjs(registro.fecha).format('DD/MM/YY'), // Formato 'DD/MM/YY'
        }));

        res.status(200).json({
            ok: true,
            registros: registrosCiclismoFormateados,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener registros de ciclismo',
        });
    }
};


// Controlador para obtener registros de "Correr"
const obtenerCorrer = async (req, res) => {
    try {
        const usuarioId = req.usuario.id; // ID del usuario autenticado
        const { filtro, fechaInicio, fechaFin } = req.query; // Capturar el filtro de los query params

        let rangoFechas = {};

        // Definir el rango de fechas según el filtro
        if (filtro === 'ultimaSemana') {
            rangoFechas = {
                $gte: dayjs().subtract(7, 'day').startOf('day').toDate(),
                $lte: dayjs().endOf('day').toDate(),
            };
        } else if (filtro === 'ultimoMes') {
            rangoFechas = {
                $gte: dayjs().subtract(1, 'month').startOf('day').toDate(),
                $lte: dayjs().endOf('day').toDate(),
            };
        } else if (filtro === 'personalizado' && fechaInicio && fechaFin) {
            rangoFechas = {
                $gte: dayjs(fechaInicio).startOf('day').toDate(),
                $lte: dayjs(fechaFin).endOf('day').toDate(),
            };
        }

        // Crear el filtro de búsqueda
        const filtroBusqueda = { usuario: usuarioId };
        if (Object.keys(rangoFechas).length > 0) {
            filtroBusqueda.fecha = rangoFechas;
        }

        // Obtener registros de correr para el usuario autenticado
        const registrosCorrer = await Correr.find(filtroBusqueda).sort({ fecha: -1 });

        // Formatear las fechas al enviar la respuesta
        const registrosCorrerFormateados = registrosCorrer.map((registro) => ({
            ...registro.toObject(),
            fecha: dayjs(registro.fecha).format('DD/MM/YY'),
        }));

        res.status(200).json({
            ok: true,
            registros: registrosCorrerFormateados,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener registros de correr',
        });
    }
};


module.exports = {
    agregarCiclismo,
    agregarCorrer,
    obtenerCiclismo,
    obtenerCorrer
};
