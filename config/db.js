
const mongoose = require('mongoose');
const uri ='mongodb+srv://khamdaeng2022:bR4oGRLZAi65lQ8p@root.d67jrtp.mongodb.net/?retryWrites=true&w=majority'
const connectDB = async() => {
    try {
        await mongoose.connect(uri)
        console.log('mongodb Connected')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB