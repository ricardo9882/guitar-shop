// 1. importaciones
const mongoose = require('mongoose')

// 2. schema
const woodSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        lenght: 100
    }
})

// 3. 
const Wood = mongoose.model('Wood', woodSchema, 'woods')

// 4. exportacion
module.exports = { Wood }

