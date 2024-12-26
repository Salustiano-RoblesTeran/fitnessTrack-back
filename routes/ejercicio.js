const { Router } = require('express');
const express = require('express');
const { CrearEjercicio, agregarPeso, actualizar, obtenerEjercicio, obtenerEjerciciosPorDia } = require('../controllers/ejercicioCtrl')
const { validarJWT } = require("../middlewares/validar_jwt");

const router = Router();

// Crear un nuevo ejercicio
router.post('/crear', CrearEjercicio);

// Ruta para agregar peso al historial de un ejercicio
router.post('/:id/agregar-peso', agregarPeso);

router.post('/:id/actualizar', actualizar);

router.get('/:id', obtenerEjercicio);

router.get('/',
    validarJWT, 
    obtenerEjerciciosPorDia);

module.exports = router;