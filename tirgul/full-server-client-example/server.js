var express = require('express'); //for routing
var path = require('path'); // to get the absolute path

var app = express(); //init the server

app.use('/js', express.static('public/js'));
app.use('/css', express.static('public/css'));
app.use('/images', express.static('public/images'));
app.use('/font', express.static('public/font'));
app.use(express.static('views'));



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

//listen on port
app.listen(3000);