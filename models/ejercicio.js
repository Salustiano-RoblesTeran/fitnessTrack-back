const { Schema, model } = require('mongoose');

const EjercicioSchema = Schema({
    nombreEjercicio: {
        type: String,
        required: [true, "Este dato es obligatorio."]
    },
    grupoMusculares: {
        type: String,
        enum: ["Pecho (Pectorales)", "Espalda", "Piernas", "Hombros", "Biceps", "Triceps", "Core", "Pantorrilla (Gemelos)"],
        required: [true, "Este dato es obligatorio."]
    },
    dia: {
        type: String,
        enum: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
        required: [true, "Este dato es obligatorio."]
    }, 
    series: {
        type: Number,
        max: 10,
        min: 1,
        required: [true, "Este dato es obligatorio."]
    },
    repeticiones: {
        type: Number,
        min: 1,
        max: 30,
        required: [true, "Este dato es obligatorio."]
    },
    historialPesos: [{
        peso: { 
            type: Number, 
            default: 0,
            required: true,
            min: 1, 
            max: 500 
        },
        fecha: { 
            type: Date, 
            default: Date.now 
        }
    }],
    usuarioId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    }
});

module.exports = model("Ejercicio", EjercicioSchema);
