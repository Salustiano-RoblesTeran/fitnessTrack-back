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

        // Obtener registros de ciclismo para el usuario autenticado
        const registrosCiclismo = await Ciclismo.find({ usuario: usuarioId }).sort({ fecha: -1 });

        // Formatear las fechas al enviar la respuesta
        const registrosCiclismoFormateados = registrosCiclismo.map(registro => ({
            ...registro.toObject(),
            fecha: dayjs(registro.fecha).format('YYYY-MM-DD')
        }));

        res.status(200).json({
            ok: true,
            registros: registrosCiclismoFormateados
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener registros de ciclismo'
        });
    }
};

// Controlador para obtener registros de "Correr"
const obtenerCorrer = async (req, res) => {
    try {
        const usuarioId = req.usuario.id; // ID del usuario autenticado

        // Obtener registros de correr para el usuario autenticado
        const registrosCorrer = await Correr.find({ usuario: usuarioId }).sort({ fecha: -1 });

        // Formatear las fechas al enviar la respuesta
        const registrosCorrerFormateados = registrosCorrer.map(registro => ({
            ...registro.toObject(),
            fecha: dayjs(registro.fecha).format('YYYY-MM-DD')
        }));

        res.status(200).json({
            ok: true,
            registros: registrosCorrerFormateados
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener registros de correr'
        });
    }
};

module.exports = {
    agregarCiclismo,
    agregarCorrer,
    obtenerCiclismo,
    obtenerCorrer
};
