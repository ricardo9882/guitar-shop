//  1. importaciones
const mongoose = require('mongoose')

//  2. schema
const brandSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
    
})

// 3. creacion de usuario
const Brand = mongoose.model('Brand', brandSchema)

// 4. exportacion
module.exports = { Brand }
