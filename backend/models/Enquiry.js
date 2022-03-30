const mongoose = require('mongoose')
const { Schema } = mongoose;

const EnquirySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    enquiry: {
        type: String,
        required: true
    },
});

const Enquiry = mongoose.model('enquiry', EnquirySchema);
module.exports = Enquiry;