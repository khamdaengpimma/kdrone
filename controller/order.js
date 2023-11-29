const Order = require('../models/Order')


exports.read = async (req, res) => {
    // console.log("read")
    try {
        // code
        const id = req.params.id
        // console.log(id)
        const order = await Order.findOne({ _id:id }).exec();
        res.render('order',{data1:order})
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.list = async (req, res) => {
    try {
        // code
        const uid=req.cookies.id
        const order = await Order.find({uid:uid}).exec();
        // console.log(order)
        res.render('order',{data:order})
        // res.send(order)
    } catch (err) {
//         // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.create = async (req, res) => {
    try {
       const pid = req.body.id
       const uid =req.cookies.id
       const name = req.cookies.name
        // console.log(req.body)
        const data={
            uid:uid,
            name:name,
            item:req.body.name,
            idit:pid,
            total:req.body.total,
            status:"pending"
        }
         await Order(data).save()
        // res.send(order)
        res.redirect("/order")
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
        const updated = await Order
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
        const removed = await Order.findOneAndDelete({_id:id}).exec()
        res.send(removed)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}