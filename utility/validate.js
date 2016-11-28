module.exports =
{
	'validateSignin': function(req,res,callback)          
	{
		var validate_success = 1;
		var error_message =''
		if(typeof req.body.username =='undefined' || req.body.username =='' || req.body.username ==null)
		{
			error_message = "Please provide username";
			validate_success = 0;
		}
		if(typeof req.body.password =='undefined' || req.body.password =='' || req.body.password ==null)
		{
			error_message = "Please provide password";
			validate_success = 0;
		}
		if(validate_success ==0) // if validation is unsuccessful
		{
			res.status(203).send({	"status" 		: false,
									"error_type" 	: "validate error",
									"message" 		: error_message
								});
		}
		else
		{
			// if validation 
			callback();
		}
	}
};