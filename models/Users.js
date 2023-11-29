const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email:{
        type:String
    },
    password: {
        type: String
    },
    adress:{
        type:String
    },
    phone:{
        type:String
    }
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema)