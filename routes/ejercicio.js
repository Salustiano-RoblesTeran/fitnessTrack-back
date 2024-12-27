const { Router } = require('express');
const express = require('express');
const { CrearEjercicio, agregarPeso, actualizar, obtenerEjercicio, obtenerEjerciciosPorDia, eliminarEjercicio } = require('../controllers/ejercicioCtrl')
const { validarJWT } = require("../middlewares/validar_jwt");

const router = Router();

// Crear un nuevo ejercicio
router.post('/crear',
    validarJWT,
    CrearEjercicio);

// Ruta para agregar peso al historial de un ejercicio
router.post('/:id/agregar-peso',
    validarJWT,
    agregarPeso);

router.post('/:id/actualizar',
    validarJWT,
    actualizar);

router.get('/:id',
    validarJWT,
    obtenerEjercicio);

router.get('/',
    validarJWT, 
    obtenerEjerciciosPorDia);

router.post('/:id/eliminar',
    validarJWT,
    eliminarEjercicio
)

module.exports = router;