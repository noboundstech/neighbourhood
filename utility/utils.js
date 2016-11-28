module.exports =
{
	'authenticateUser': function(req,res,next)          
	{
		var jwt 	= require('jsonwebtoken'),
			express = require('express'),
			config 	= require('config/config');
			// check header or url parameters or post parameters for token
		var token = req.body.token || req.param('token') || req.headers['x-access-token'];
		// decode token
		if (token) {
			// verifies secret and checks exp
			jwt.verify(token,config.secret, function(err, decoded) {			
				if (err) {
					return res.json({ success: false, message: 'Failed to authenticate token.',err :err });		
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;	
					next();
				}
			});
		} else {
			// if there is no token
			// return an error
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.'
			});
		}
	},
	'getTableColumnType' : function(sql,type)
	{
		var constant = require("config/constant");
		if(type == constant.VARCHAR50)
		{
			return sql.VarChar(50);
		}
	}
};