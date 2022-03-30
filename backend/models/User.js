const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const { Schema } = mongoose; 

const UserSchema = new Schema({
    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
});

UserSchema.methods.generateAuthToken = () => {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
      expiresIn: "7d",
    });
    return token;
  };

const User = mongoose.model('user', UserSchema);
module.exports = User;