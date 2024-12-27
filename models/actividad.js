const { Schema, model } = require('mongoose');

// Modelo base para actividades
const actividadSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now
    },
    distancia: {
        type: Number,
        required: true,
        min: 0
    },
    minutos: {
        type: Number,
        required: true,
        min: 0
    }
});

// Modelo para ciclismo
const Ciclismo = model('Ciclismo', actividadSchema);

// Modelo para correr
const Correr = model('Correr', actividadSchema);

module.exports = { Ciclismo, Correr };
