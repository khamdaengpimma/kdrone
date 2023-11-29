const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    
    uid:String,
    name: String,
    item:{
        type:String,
    },
    idit:{
        type:String
    },
    total: {
        type: Number,
    },
    status:{
        type:String
    }
    
}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema)