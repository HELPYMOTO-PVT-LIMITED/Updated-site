require("dotenv").config();

const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000 || process.env.PORT

app.use(express.json())
app.use(cors())

app.use('/auth' , require('./routes/auth'))
app.use('/contact' , require('./routes/contact'))
app.use('/hire_mechanic' , require('./routes/hire_mechanic'))
app.use('/enquiry' , require('./routes/enquiry'))

app.get('/' , (req , res)=>{
    res.send("Helping is our moto")
})

app.listen(port, () => {
    console.log(`Helpy_moto Backend started at http://localhost:${port}`)
  })