const Product = require('../models/product')


exports.read = async (req, res) => {
    // console.log("read")
    try {
        // code
        const id = req.params.id
        // console.log(id)
        const product = await Product.findOne({ _id:id }).exec();
        res.render('productdetails',{data1:product})
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.list = async (req, res) => {
    try {
        // code
        const producted = await Product.find({}).exec();
        const Categories = [...new Set(producted.map(product => product.category))];
        // console.log(Categories);

        res.render('product',{data:producted,tag:Categories})
        // res.send(producted)
    } catch (err) {
//         // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.create = async (req, res) => {
    try {
//         // code
        // console.log(req.body)
        const producted = await Product(req.body).save()
        res.send(producted)
    } catch (err) {
//         // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.update = async (req, res) => {
    try {
//         // code
        const id = req.params.id
        const updated = await Product
            .findOneAndUpdate({_id:id }, req.body, { new: true })
            .exec()
        res.send(updated)

    } catch (err) {
//         // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.remove = async (req, res) => {
    try {
//         // code
        const id = req.params.id
        const removed = await Product.findOneAndDelete({_id:id}).exec()
        res.send(removed)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}