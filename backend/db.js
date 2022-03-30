const mongoose = require('mongoose');
const mongoURI = process.env.DB;

const connectToMongo = async () => {
     mongoose.connect(mongoURI,  () =>  {
        console.log("Connected to mongo")
    })
} 

module.exports = connectToMongo;