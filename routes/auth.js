const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { login, register, obtenerUsuario } = require('../controllers/authCtrl');
const { esMailValido } = require('../helpers/db_validators');
const { validarJWT } = require('../middlewares/validar_jwt');

const router = Router();

// Ruta POST - register
router.post(
    "/register",
    [
      check("nombre", "El nombre es obligatorio").notEmpty(),
      check("correo", "El correo no es valido!").isEmail(),
      check("correo", "El campo es obligatorio!").notEmpty(),
      check("correo").custom(esMailValido),
      check("password", "La contraseña debe tener como mínimo 6 caracteres").isLength({ min: 6 }),
      validarCampos,
    ],
    register
  );

router.post("/login",
    [
        check("correo", "El correo no es valido!").isEmail(),
        check("correo", "El campo es obligatorio!").notEmpty(),
        check("password", "El campo es obligatorio!").notEmpty(),
        validarCampos
    ],
    login
);

router.get("/",
  validarJWT,
  obtenerUsuario
)

module.exports = router;