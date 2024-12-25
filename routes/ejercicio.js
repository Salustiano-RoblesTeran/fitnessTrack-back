const { Router } = require('express');
const express = require('express');
const { CrearEjercicio, agregarPeso } = require('../controllers/ejercicioCtrl')

const router = Router();

// Crear un nuevo ejercicio
router.post('/crear', CrearEjercicio);

// Ruta para agregar peso al historial de un ejercicio
router.post('/:id/agregar-peso', agregarPeso);

module.exports = router;