const mongoose = require('mongoose')
const { Schema } = mongoose;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
    },
    phone_number: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
});

const Contact = mongoose.model('contact', ContactSchema);
module.exports = Contact;