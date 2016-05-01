var express = require('express'); //for routing
var app = express(); //init the server
/*
* ROUTING
*/

// to get the absolute path
//used for sending html back
var path = require('path');

//initalization for using POST calls
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));//read URL encoded
app.use(bodyParser.json()); //read json data

//static routes init
app.use('/js', express.static('public/js'));
app.use('/css', express.static('public/css'));
app.use('/images', express.static('public/images'));
app.use('/font', express.static('public/font'));
app.use(express.static('views'));


/*
*DATA BASE
*/
var mongoose = require('mongoose'); //get DB
var Schema = mongoose.Schema; //to create Schema
var connection = mongoose.createConnection('mongodb://localhost:27017/test');//connect to the db server
//Schema = document
var users = new Schema({
  name:  String,
  sureName: String
});

//model = collection
var User = connection.model('User', users);


/*
* ROUTES
*/

//return an html (web page) or other files
app.get('/', function(req, res) {
    /*
    * path.join():
    * get two params-
    *   -__dirname - the absolute path until this js file location
    *   -string containing the file name (including other dirs if needed)
    */
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

/*
* INNER API CALLS
*/
//register new user
app.post('/reg', function(req, res) {
    var js = req.body; //get the json sent from user
    console.log(js); //log it for debugging
    //create new object
    var userJson = {
        name: js.name,
        sureName: js.surename
    }

    var user = new User(userJson); //create new db instance
    //save the new user to db
    user.save(function(err){
        if(err)
            res.status(500).end("error"); //response on error with status code 500
        else
            res.status(200).end("Added", userJson, "to db");//response on success  with status code 200

    });
});

app.post('/delete', function(req, res) {
    var js = req.body; //get the json sent from user
    console.log(js); //log it for debugging
    //create new object
    var userJson = {
        name: js.name,
        sureName: js.surename
    }

    //save the new user to db
    User.remove(userJson, function(err){
        if(err)
            res.status(500).end("error"); //response on error with status code 500
        else
            res.status(200).end("removed", userJson, "from db");//response on success  with status code 200

    });
});
//get all users
app.get('/users', function(req, res){
    //find all users in db
     User.find({}, function(err, users) {
        var userMap = {};//return object

        //fill up the object
        users.forEach(function(user) {
          userMap[user._id] = user;
        });
//    return the users object
    res.end(JSON.stringify(userMap, null, "\t"));
  });
});

//listen on port
app.listen(3000, function(){
    console.log("listening on port 3000");
});
