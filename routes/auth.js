const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");

function isAuthenticated(req,res, next){
    if(req.isAuthenticated()){
        return res.redirect('/profile')
    }
    return next();
}

router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/login');
})

router.get('/login', isAuthenticated,(req,res)=>{
    res.render('auth/login', {error:req.body.error});
})

router.post('/login', 
    passport.authenticate('local'), 
    (req,res)=>{
        res.redirect('/profile');
    })

router.get('/signup', (req,res)=>{
    res.render('auth/signup',{error:req.body.error});
});

router.post('/signup', 
    (req,res)=>{
        User.register(req.body, req.body.password, function(err, user) {
            if (err) return res.send(err);
            console.log("ando acá")
            const authenticate = User.authenticate();
            authenticate(req.body.email, req.body.password, function(err, result) {
                console.log("aqui ando");
                if (err) return res.send(err);
                return res.redirect('/profile');
            })
        })

    });


    module.exports = router;