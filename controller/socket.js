var express = require('express'),
	app 	= express(),
    router  = express.Router();
require('rootpath')();
/*
router.use(function(req, res, next) {
	var utils = require('utility/utils');
	utils.authenticateUser(req,res,next);
});
*/
var express = require('express'),
//	app 	= express(),
    router  = express.Router();
require('rootpath')();
router.route('/')
.get(function (req, res) {
	console.log(app.io);
	res.json({ message: 'Welcome to the coolest API on earth!' });
})
.post(function (req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

module.exports = router;