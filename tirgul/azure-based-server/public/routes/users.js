var express = require('express');
var router = express.Router();
var User = require('User');
/*
 *DATA BASE
 */

//model = collection


/*
 * INNER API CALLS
 */
//register new user
router.post('/reg', function(req, res) {
    var js = req.body; //get the json sent from user
    console.log(js); //log it for debugging
    //create new object
    var userJson = {
        name: js.name,
        sureName: js.surename
    }

    var user = new User(userJson); //create new db instance
    //save the new user to db
    user.save(function(err) {
        if (err)
            res.status(500).end("error"); //response on error with status code 500
        else
            res.status(200).end("Added", userJson, "to db"); //response on success  with status code 200

    });
});

router.post('/delete', function(req, res) {
    var js = req.body; //get the json sent from user
    console.log(js); //log it for debugging
    //create new object
    var userJson = {
        name: js.name,
        sureName: js.surename
    }

    //save the new user to db
    User.remove(userJson, function(err) {
        if (err)
            res.status(500).end("error"); //response on error with status code 500
        else
            res.status(200).end("removed", userJson, "from db"); //response on success  with status code 200

    });
});
//get all users
router.get('/users', function(req, res) {
    //find all users in db
    User.find({}, function(err, users) {
        var userMap = {}; //return object

        //fill up the object
        users.forEach(function(user) {
            userMap[user._id] = user;
        });
        //    return the users object
        res.end(JSON.stringify(userMap, null, "\t"));
    });
});

module.exports = router;