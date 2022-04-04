const mongoose = require("mongoose");
const env = require("./environment");

 //mongoose.connect('mongodb://localhost/prod-India',{ useNewUrlParser: true,useUnifiedTopology: true });

const dba = 'mongodb+srv://Node-Express:abhi@8800express@cluster0.3a6vn.mongodb.net/expressapp?retryWrites=true&w=majority';
 mongoose.connect(dba,{ useNewUrlParser: true,useUnifiedTopology: true });
// mongoose.connect(
//   //`mongodb+srv://mongoUser:mongoUser@cluster0.qyh17.mongodb.net/socialarray?retryWrites=true&w=majority`
//    'mongodb+srv://Node-Express:abhi@8800express@cluster0.3a6vn.mongodb.net/expressapp?retryWrites=true&w=majority'
// );
const db = mongoose.connection;

db.on("error", console.error.bind(console, "error in conncting to DB"));

db.once("open", function () {
  console.log("connected to database::MongoDb");
});

module.exports = db;
