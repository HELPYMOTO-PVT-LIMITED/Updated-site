const mongoose = require('mongoose')
const { Schema } = mongoose;

const HireMechanicSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    vehicle_modal: {
        type: String,
        required: true,
    },
    vehicle_number: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true
    },
});

const response = mongoose.model('mechanic_hire', HireMechanicSchema);
module.exports = response;