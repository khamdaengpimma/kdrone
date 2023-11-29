const Users = require('../models/Users');
const Product = require('../models/product');

exports.index = async(req, res)=>{
    const product = await Product.find({}).limit(6).exec();
    res.render('index',{data:product})
}
exports.add = (req,res)=>{
    res.render('addproduct')
}
exports.register = (req,res)=>{
    res.render('register')
}
exports.login = (req,res)=>{
    res.render('login')
}
exports.profile = async(req,res)=>{
    const id = req.cookies.id
    const user = await Users.findOne({ _id:id }).exec();
    res.render('profile',{data:user})
}
exports.checkout = async(req,res)=>{
    const id = req.cookies.id
    if(id===undefined){
        return res.redirect('/login');
    }
    const pid = req.params.id
    // console.log(pid)
    const user =  await Users.findOne({ _id:id }).exec();
    const product = await Product.findOne({ _id:pid }).exec();
    // console.log(user,product)
    res.render("checkout",{user:user,product:product})
}
exports.contact = async(req,res)=>{
    const id = req.cookies.id
    const user = await Users.findOne({ _id:id }).exec();
    res.render('contact',{user:user})
}
exports.search = async(req,res)=>{
    const id = req.body.keyword
    // console.log(id)
    const product = await Product.find({catagory:id }).exec();
    // console.log(product)
    if(product=== null || product.length=== 0){
        return res.render("404")
    }
    res.render('search',{data:product})
}
exports.tag = async(req,res)=>{
    const id = req.params.id
    // console.log(id)
    const product = await Product.find({category:id}).exec();
    const producted = await Product.find({}).exec();
    const Categories = [...new Set(producted.map(product => product.category))];
        // console.log(Categories);
    // console.log(product)
    if(product=== null || product.length=== 0){
        return res.render("404")
    }
    res.render('search',{data:product,tag:Categories})
}
