const Usuario = require('../models/usuario');

const esMailValido = async (correo) => {
    const exiteCorreo = await Usuario.findOne({ correo });
  
    if (exiteCorreo) {
      throw new Error(`El correo ${correo} ya existe en la base de datos!`);
    }
};

module.exports = {
    esMailValido
}