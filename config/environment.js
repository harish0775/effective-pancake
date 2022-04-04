
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
            pass : 'abhi@8800webdev'//hidden for sometime
        }
    },
    google_client_id : "777736857759-7dvvr1q2ng4kqb05oqj9ladc2de033c9.apps.googleusercontent.com",
    google_client_secret : "BmXEx2QUg_vRRAGx2AJdroQ4",
    google_call_back_url : "http://localhost:8000/users/auth/google/callback",
    github_cal_back_url : "http://localhost:8000/users/auth/github/callback",
    jwt_secret : 'codeial',
    morgan : {
        mode : 'dev',
        options : {stream : accessLogstream}
    }
}

const production = {
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
            pass : '***'//hidden for sometime
        }
    },
    // google_client_id : process.env.Node_Express_GOOGLE_CLIENT_ID,
    // google_client_secret : process.env.Node_Express_GOOGLE_CLIENT_SECRET,
    // google_call_back_url : "",
    // github_cal_back_url : "",
    jwt_secret : process.env.Node_Express_JWT_SECRET,
    morgan : {
        mode : 'combined',
        options : {stream : accessLogstream}
    }
}

module.exports = eval(process.env.Node_Express_ENVIRONMENT) == undefined ? development : eval(process.env.Node_Express_ENVIRONMENT);