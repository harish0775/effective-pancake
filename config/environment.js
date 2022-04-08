

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogstream = rfs.createStream('access.log',{
    interval : '1d',
    path : logDirectory
});


const development = {
   
    name : 'development',
    asset_path : './assets',
    session_cookie_key : 'blahsomething',
    db: 'prod-India',
    smtp : {
        service : 'gmail',
        host : 'smpt.gmail.com',
        port: 587,
        secure: false,
        auth : {
            user : 'webdev0775@gmail.com',
            pass : 'Abhi@8800web'
        }
    },                  
    google_client_id : "777736857759-70nufre95bc28mi8dnm5g39iaj82123n.apps.googleusercontent.com",
    google_client_secret : "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",
    google_call_back_url : "http://localhost:8000/users/auth/google/callback",
    github_cal_back_url : "http://localhost:8000/users/auth/github/callback",
    jwt_secret : 'codeial',
    morgan : {
        mode : 'dev',
        options : {stream : accessLogstream}
    }
}

const production = {
     title : process.env.TITLE,
    name : 'production',
    asset_path : process.env.Node_Express_ASSET_PATH,
    session_cookie_key : process.env.Node_Express_SESSION_COOKIE_KEY,
    db: process.env.Node_Express_DB,
    smtp : {
        service : 'gmail',
        host : 'smpt.gmail.com',
        port: 587,
        secure: false,
        auth : {
            user : process.env.Node_Express_GMAIL_USERNAME,
            pass : 'process.env.Node_Express_GMAIL_USERNAME_PASS'
        }
    },
    google_client_id : process.env.Node_Express_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.Node_Express_GOOGLE_CLIENT_SECRET,
    google_call_back_url : "http://localhost:8000/users/auth/google/callback"
,
    github_cal_back_url : "http://localhost:8000/users/auth/github/callback"
,
    jwt_secret : process.env.Node_Express_JWT_SECRET,
    morgan : {
        mode : 'combined',
        options : {stream : accessLogstream}
    }
}

module.exports = eval(process.env.Node_Express_ENVIRONMENT) == undefined ? development : eval(process.env.Node_Express_ENVIRONMENT);