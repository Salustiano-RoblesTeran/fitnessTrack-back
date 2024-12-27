const { response, request } = require("express");
const { Ciclismo, Correr } =  require("../models/actividad");

// Controlador para agregar un registro de "Ciclismo"
const agregarCiclismo = async (req = request, res = response) => {
    const { distancia, minutos, fecha } = req.body;

    try {
        const registroCiclismo = new Ciclismo({
            distancia,
            minutos,
            fecha,
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

module.exports = {
    agregarCiclismo,
    agregarCorrer
  };
  