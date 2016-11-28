require('rootpath')();
module.exports = function (app) {
	app.use('/api', require('controller/api'));
	app.use('/userLogin', require('controller/login'));
	app.use('/details', require('controller/details'));
	app.use('/socket', require('controller/socket'));
};