var express = require('express'); //for routing
var path = require('path'); // to get the absolute path

var app = express(); //init the server


/*
 * WHICH FILE ARE STATIC?    
 *   client-side files, such as:
 *       js
 *       css
 *       images and icons        
 *       fonts
 *
 * FOLDER HIRARCHY:
 *  -app.js - the server main file 
 *  >-public
 *    >-css
 *       -css files
 *    >-js
 *       -js files
 *    ...
 *  >-views
 *      -html files
 */

app.use(express.static('public')); //set static file directory


//simple get function
app.get('/', function(req, res) {
    res.end('Hey!');
});


/*
 * get with query
 * call route:
 *   address/user?name=<val>&age=<val>
 *   address/admin/<name>/<age>
 *   (unordered)
 */
app.get('/user', function(req, res) {
    //get url query
    var name = req.query.name;
    var age = req.query.age;
    //return the data
    res.end('user name: ' + name + " age= " + age);
});

/*
 * parameters call
 * call route:
 *   address/admin/<name>/<age>
 *   (ordered)    
 */

app.get('/admin/:name/:age', function(req, res) {
    //get url parameters
    var name = req.params.name;
    var age = req.params.age;
    //create an object to return
    var data = {
        name: name,
        age: age,
        isFriend: 'yes'
    };
    //we need to convert to string formt to be able to send an object
    var toSend = JSON.stringify(data);
    //return the stringified object 
    res.end(toSend);
});

//return an html (web page) or other files
app.get('/home', function(req, res) {
    /*
    * path.join():
    * get two params-
    *   -__dirname - the absolute path until this js file location
    *   -string containing the file name (including other dirs if needed)
    */
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

/*
* get with query
* call route:
*   address/user?name=<val>&age=<val>
*   address/admin/<name>/<age>
*   (unordered)
*/
app.get('/user', function(req, res){
    //get url query
    var name = req.query.name;
    var age = req.query.age;
    //some result conditions
    if(age > 25)
        res.sendFile(path.join(__dirname+"/views/index.html"));
    else
        res.end('user name: '+name+" age= "+age);
});


//listen on port
app.listen(3000);