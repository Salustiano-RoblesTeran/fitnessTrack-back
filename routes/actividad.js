const { Router } = require('express');
const { agregarCiclismo, agregarCorrer } = require('../controllers/actividadCtrl')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');

const router = Router();

// Rutas para ciclismo
router.post(
    '/ciclismo',
    [
        validarJWT, // Middleware para verificar el token del usuario
        check('distancia', 'La distancia es obligatoria y debe ser un número').isFloat({ min: 0 }),
        check('minutos', 'Las horas son obligatorias y deben ser un número').isFloat({ min: 0 }),
        check('fecha', 'La fecha es obligatoria y debe ser válida').isISO8601(),
        validarCampos // Middleware para validar los campos
    ],
    agregarCiclismo
);

// Rutas para correr
router.post(
    '/correr',
    [
        validarJWT, // Middleware para verificar el token del usuario
        check('distancia', 'La distancia es obligatoria y debe ser un número').isFloat({ min: 0 }),
        check('minutos', 'Las horas son obligatorias y deben ser un número').isFloat({ min: 0 }),
        check('fecha', 'La fecha es obligatoria y debe ser válida').isISO8601(),
        validarCampos // Middleware para validar los campos
    ],
    agregarCorrer
);

module.exports = router;
