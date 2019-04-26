// 1. importaciones
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_I = 10
const jwt =require('jsonwebtoken')

require('dotenv').config()

// 2. schema
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 100
    },
    cart: {
        type: Array,
        default: []
    },
    history:{
        type: Array,
        default:[]
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
})

// 3. cadeneros - middleware
userSchema.pre('save', async function (next){
    if(this.isModified('password')){
        try {
            const salt = await bcrypt.genSalt(SALT_I)
            const hash = await bcrypt.hash(this.password, salt)
            this.password = hash;
            next();
        } 
        catch(err){
            return next(err);
        }
    }
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = async function(cb) {
    const token = await jwt.sign(this._id.toHexString(),process.env.SECRET)

    this.token = token
    this.save((err, user) => {
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token,cb){
    var user = this

    jwt.verify(token, process.env.SECRET, function(err, decode) {
        user.findOne({"_id": decode, "token": token}, function(err, user) {
            if (err) cb(error)
            cb(null, user)
        })
    })
}

// 4. modelos
const User = mongoose.model('User', userSchema, "users")

// 5. exportarcion
module.exports = { User }