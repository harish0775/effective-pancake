const passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

//creating passport strategy
passport.use(new FacebookStrategy({
    clientID : "1379469932505035",
    clientSecret : "3fc59c601af36fd756a9ebf0c1b8c384",
    callbackURL :  "http://localhost:8000/users/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
},
    function(accessToken, refreshToken, profile, done){
        console.log("profile-facebook",profile);
        User.findOne({email : profile.id}).exec(function(err,user){
            if(err){
                console.log('error in passport-github-oauth',err);
                return;
            }
            console.log(profile);

            //if user exist
            if(user){
                return done(null,user);
            }else{    //if not then create one
                User.create({
                    name : profile.displayName,
                    email : profile.id,
                    password : crypto.randomBytes(20).toString('hex')
                }, function(err,user){
                    if(err){
                        console.log('error in passport-github-oauth',err);
                        return;
                    }
                    return done(null,user);
                });
            }
        });
    }
   
))

module.exports = passport;