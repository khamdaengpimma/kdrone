const e = require('connect-flash')
const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const { render } = require('ejs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

exports.register = async (req, res) => {
    try {
        //code
        // 1.CheckUser
        console.log(req.body)
        const { name,email, password } = req.body
        var user = await User.findOne({ email })
        if (user) {
            return res.send('User Already Exists!!!').status(400)
        }
        // 2.Encrypt
        const salt = await bcrypt.genSalt(10)
        user = new User({
            name,
            email,
            password
        })
        user.password = await bcrypt.hash(password, salt)
        // 3.Save
        await user.save()
        res.render("login").send('Register Success!!')
    } catch (err) {
        //code
        console.log(err)
        // res.status(500).render("register").send('Server Error')
        console.log(req.body)
        res.render("register")
    }
}

exports.login = async (req, res) => {
    try {
        //code
        const age = 8*60*60*1000;//1s
        // 1. Check User
        const { email, password } = req.body
        console.log(req.body)
        var user = await User.findOneAndUpdate({ email }, { new: true })
        console.log(user)
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).send('Password Invalid!!!')
            }
            // 2. Payload
            var payload = {
                user: {
                    id :user._id,
                    name: user.name,
                    email:user.email
                }
            }
            

            // 3. Generate
            // jwt.sign(payload, 'jwtsecret', { expiresIn: 30 }, (err, token) => {//3600s = 1h
            //     if (err) throw err;
            //     res.json({ token, payload })
            // })
            //2.1 cookie
            res.cookie('id',user._id,{maxAge:age})
            res.cookie('user',user.name,{maxAge:age})
            res.cookie('login',true,{maxAge:age})
            res.redirect("/")
        } else {
            return res.status(400).send('User not found!!!')
        }

    } catch (err) {
        //code
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.logout = (req,res)=>{
    res.clearCookie("id");
    res.clearCookie("user");
    res.clearCookie("login");
    res.redirect("/")
}
exports.checklog = (req, res) => {
    if (req.cookies && req.cookies.login !== undefined) {
        return res.redirect('/profile');
    } else {
        return res.redirect('/login');
    }
};
exports.update = async (req, res) => {
    try {
        
        const id = req.params.id
        // console.log(id)
        await User
            .findOneAndUpdate({ _id: id },req.body,{ new: true })
            .exec()
        // res.send(updated)
        res.redirect("/profile")
    } catch (err) {
//         // error
        console.log(err)
        res.status(500).send('Server Error')
        res.redirect("/profile")
    }
};
