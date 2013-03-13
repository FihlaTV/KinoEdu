/**
 * Created with JetBrains WebStorm.
 * User: rohit
 * Date: 3/13/13
 * Time: 10:52 PM
 * To change this template use File | Settings | File Templates.
 */


/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , User = mongoose.model('User')

/**
 * Create user
 */

exports.signup = function (req, res) {
    var user = new User(req.body)
    user.provider = 'local'
    user.save(function (err) {
        if (err) {
            return res.send({
                "status":"failure",
                "err":err
            })
        }
        res.send({
            "status":"success",
            "user":{
                "name":user.name,
                "username":user.username,
                "email":user.email
            }
        });
    })
}



/**
 * Find user by id
 */

exports.login = function (req, res) {
    var emailAddress = req.body.email;
    var password = req.body.password;
    User.findOne(
        {
            email:emailAddress
        }
        ,function (err, user) {
            if(user.authenticate(password)){
                res.send({status:"success"});
            }
            else{
                res.send({status:"failure"});
            }

        }
    )
}