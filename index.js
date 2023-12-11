const express = require('express');
const flash = require("connect-flash");
const index = require('./controller/index');
const about = require('./controller/about');
const product = require('./controller/product');
const order = require('./controller/order')
const connectDB = require('./config/db');
const auth = require("./controller/auth");
const cookieParser = require("cookie-parser")
const app = express();
connectDB()
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'))
app.use(express.json())
app.use(flash())
app.use(cookieParser())
app.set('view engine',"ejs")
app.get('/',index.index);
app.get('/checklog',auth.checklog);
app.get('/register',index.register)
app.get('/profile',index.profile)
app.post('/profile/:id',auth.update)
app.post('/order',order.create)
app.get('/order',order.list)
app.post('/register/form',auth.register)
app.get('/login',index.login)
app.get('/logout',auth.logout)
app.post('/login/form',auth.login)
app.get('/admin/apd',index.add);
app.get('/about',about); 
app.get('/product',product.list);
app.get('/product/:id',product.read);
app.post('/product',product.create);  
app.get('/checkout/:id',index.checkout);
app.get('/contact',index.contact)
app.post('/search',index.search)
app.get('/tag/:id',index.tag)
app.get('/forget-password',index.contact)
/forget-password
app.listen(8080, () => console.log("http://localhost:8080"));
