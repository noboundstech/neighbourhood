var express = require('express'),
	jwt 	= require('jsonwebtoken'),
	config  = require('config/config'),
    router  = express.Router();
//    _       = require('underscore');
require('rootpath')();
router.route('/')
.get(function (req, res) {
     res.status(404).send("We're sorry,but the page you're looking for can't be found" );
})
.post(function (req, res) {
     res.status(404).send("We're sorry,but the page you're looking for can't be found");
});
// api to read all previous winner ticket from text file 
router.route('/authenticate')
.get(function (req, res) {
 
	var exp = express();
   exp.set('superSecret', config.secret); // secret variable
    var token = jwt.sign({"name":"firdous"}, exp.get('superSecret'), {
    expiresIn: 86400 // expires in 24 hours
  });
    console.log(req.token);
	res.json({
		success: true,
		message: 'Enjoy your token!',
		token: token
	});
});
module.exports = router;