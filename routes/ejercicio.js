const { Router } = require('express');
const express = require('express');
const { CrearEjercicio } = require('../controllers/ejercicioCtrl')

const router = Router();

// Crear un nuevo ejercicio
router.post('/crear', CrearEjercicio);

module.exports = router;