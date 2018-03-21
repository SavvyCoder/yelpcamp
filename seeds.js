var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "You can do anything here. So don't worry about it. A tree cannot be straight if it has a crooked trunk. See there how easy that is. We don't need any guidelines or formats. All we need to do is just let it flow right out of us. It just happens - whether or not you worried about it or tried to plan it. See. We take the corner of the brush and let it play back-and-forth."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "This is gonna be a happy little seascape. Clouds are free. They just float around the sky all day and have fun. When you buy that first tube of paint it gives you an artist license. Isn't it fantastic that you can change your mind and create all these happy things?"

    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "A big strong tree needs big strong roots. Every highlight needs it's own personal shadow. We're not trying to teach you a thing to copy. We're just here to teach you a technique, then let you loose into the world. Volunteering your time; it pays you and your whole community fantastic dividends. Only God can make a tree - but you can paint one. Brown is such a nice color"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("removed campgrounds!");
        // Comment.remove({}, function(err) {
        //     if(err){
        //         console.log(err);
        //     }
        //     console.log("removed comments!");
        //      //add a few campgrounds
        //     data.forEach(function(seed){
        //         Campground.create(seed, function(err, campground){
        //             if(err){
        //                 console.log(err)
        //             } else {
        //                 console.log("added a campground");
        //                 //create a comment
        //                 Comment.create(
        //                     {
        //                         text: "This present moment is perfect simply due to the fact you're experiencing it. The little tiny Tim easels will let you down. Let's go up in here, and start having some fun This is where you take out all your hostilities and frustrations. It's better than kicking the puppy dog around and all that so.",
        //                         author: "Bob Ross"
        //                     }, function(err, comment){
        //                         if(err){
        //                             console.log(err);
        //                         } else {
        //                             campground.comments.push(comment._id);
        //                             campground.save();
        //                             console.log("Created new comment");
        //                         }
        //                     });
        //             }
        //         });
        //     });
        // });
    }); 
    //add a few comments
}
 
module.exports = seedDB;