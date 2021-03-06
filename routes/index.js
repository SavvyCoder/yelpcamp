var express = require("express");
var router = express.Router(); 
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");


router.get("/", function(req,res){
    res.render("landing");
});


// ===========
// AUTH ROUTES
// ===========

router.get("/register", function(req, res) {
    res.render("register");
})

//Handle sign up logic

router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/");
        });
    });
});

//show login form
router.get("/login", function(req, res) {
    res.render("login");
})

//handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
    
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged Out!" )
    res.redirect("/campgrounds");
});


module.exports = router; 