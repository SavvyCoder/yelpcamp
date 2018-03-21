var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX - Show all 
router.get("/", function(req, res){
        
        Campground.find({}, function(err,allCampgrounds){
            if(err){
                console.log(err);
            }
            else {
                
                res.render("campgrounds/index", {campgrounds: allCampgrounds});
            }
        });
        //res.render("",{:});
});

//CREATE - add new campground to db
router.post("/", middleware.isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    if(isNaN(price)){
        req.flash("error", "Please enter a valid price");
        return res.redirect("back");
    }
    var newCampground = {name: name, image: image, description: desc, author: author, price: price};
    Campground.create(newCampground, function(err,newlyCreated){
        if(err){
            req.flash("success", "New campground added");
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    })
    // get data from form and add to  array
    // redirect back to  page
    
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//Show - shows more info about one campground 
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
         res.render("campgrounds/edit", {campground: foundCampground});
    });
});



//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership,function(req, res){
    //find and update the correct campground 
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        
        }
    });
});

//destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});


// //middlware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

// function checkCampgroundOwnership(req,res,next){
    
//     if(req.isAuthenticated()){
           
//     Campground.findById(req.params.id, function(err, foundCampground){
//         if(err){
//             //console.log(err);
//             res.redirect("back");
//         }
//         else {
//             if (foundCampground.author.id.equals(req.user._id)){
//                 next();
//             }
//             else {
//                 res.redirect("back");
//             }
//         }
//     });
    
//     } else {
//         res.redirect("back");
//     }
// }






module.exports = router;