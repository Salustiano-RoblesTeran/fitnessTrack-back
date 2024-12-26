const { Router } = require('express');
const express = require('express');
const { CrearEjercicio, agregarPeso, actualizar, obtenerEjercicio } = require('../controllers/ejercicioCtrl')

const router = Router();

// Crear un nuevo ejercicio
router.post('/crear', CrearEjercicio);

// Ruta para agregar peso al historial de un ejercicio
router.post('/:id/agregar-peso', agregarPeso);

router.post('/:id/actualizar', actualizar);

router.get('/:id', obtenerEjercicio);

module.exports = router;