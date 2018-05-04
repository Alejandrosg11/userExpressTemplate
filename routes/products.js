const router = require("express").Router();
const Product = require('../models/Product');
const User = require('../models/User');
const updload = require('multer')({dest: './public/pics'});

router.get('/', (req,res,next)=>{
    Product.find()
    .populate('user')
    .then(products=>res.render('products/list', {products}))
    .catch(e=>next(e));
});

router.post('/new', updload.array('photos',6),(req,res, next)=>{
    req.body.photos = [];
    for(let pic of req.files){
        req.body.photos.push('/pics/' + pic.filename);
    }
    req.body.user = req.user._id;
    Product.create(req.body)
    .then(product=>{
        console.log(product);
        req.user.products.push(product._id);
        return User.findByIdAndUpdate(req.user._id, req.user)
    })
    .then(user=>{
        console.log(user)
        res.redirect('/profile')
    })
    .catch(e=>next(e))

});

module.exports = router;
//