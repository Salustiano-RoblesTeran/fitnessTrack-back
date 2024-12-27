const { response, request } = require("express");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

//Controlador POST
const register = async (req = request, res = response) => {
    const datos = req.body;
    const { nombre, correo, password } = datos;
  
    // Generar URL del avatar
    const backgroundColors = [
      "ff9800",
      "e96418",
      "d32f2f",
      "ee5397",
      "388e3c",
      "8e24aa",
    ];
    const avatarUrl = `https://ui-avatars.com/api/?name=${nombre.replace(
      /[^a-zA-Z0-9]+/g,
      "+"
    )}&background=${
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
    }&color=ffffff&size=50&font-size=0.5&bold=true`;
  
    // Crear usuario
    const usuario = new Usuario({ nombre, correo, password, avatarUrl });
  
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);
  
    // Guardar en DB
    await usuario.save();
  
    res.json({
      usuario,
      mensaje: "Usuario registrado!",
    });
  };

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;
  
    try {
      //Validar correo
      const usuario = await Usuario.findOne({ correo });
  
      if (!usuario) {
        return res.status(400).json({
          msg: "Correo o contraseña incorrectos!",
        });
      }
  
  
      //Validacion de password
      //ENCRIPTACION
      const validPassword = bcrypt.compareSync(password, usuario.password);
      //VALIDACION
      if (!validPassword) {
        return res.status(400).json({
          msg: "Correo o contraseña incorrectos!",
        });
      }
  
      //GENERAR TOKEN
      const token = await generarJWT(usuario.id);
  
      //Respuesta del backEnd
      res.json({
        msg: "Login Ok!",
        usuario,
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Problemas internos del servidor!",
      });
    }
  };
  

  const obtenerUsuario = async (req, res) => {
    try {
        const uid = req.usuario;  // El uid viene del middleware validarJWT

        // Buscar al usuario y seleccionar solo nombre y avatarUrl
        const usuario = await Usuario.findById(uid).select('nombre avatarUrl');

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(usuario);  // Devolver solo nombre y avatarUrl
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = {
    login,
    register,
    obtenerUsuario
  };
  