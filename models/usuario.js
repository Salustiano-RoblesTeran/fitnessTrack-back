const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema ({
    nombre: {
        type: String,
        required: [true, "Este dato es obligatorio."]
    },
    correo: {
        type: String,
        required: [true, "Este dato es obligatorio."],
        unique: true,
    }, 
    password: {
        type: String,
        required: [true, "Este dato es obligatorio."],
    },
    avatarUrl: { 
        type: String, 
        default: "" 
    },
})

//Quitar datos de la respuesta
UsuarioSchema.methods.toJSON = function () {
    const { password, __v, ...usuario } = this.toObject();
  
    return usuario;
  };

  module.exports = model("Usuario", UsuarioSchema);