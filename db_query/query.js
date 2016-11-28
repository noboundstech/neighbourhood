module.exports = {
	'selectFromDb': function(req,res,condition,selection,table,data,callback)          
	{
		var sql = require('mssql');
		var config = require('config/db_connection')
		var utils = require('utility/utils');
		var connection1 = new sql.Connection(config, function(err) {
			//console.log(err);
			var request = new sql.Request(connection1); // or: var request = connection1.request();
			if(condition.length>0)
			{
				var where = ' WHERE ';
			}
			else
			{
				var where = '';
			}
			for(i=0;i<condition.length;i++)
			{
				
				var type = utils.getTableColumnType(sql,condition[i].type);
			   	request.input(condition[i].name,type,condition[i].value);
			    where+=" "+condition[i].name +" = @"+condition[i].name;
				if(i<condition.length-1)
				{
					where+= " AND ";
				}
			}
			var query = 'select '+selection+' FROM dbo.'+table+' '+where;
		   	request.query(query).then(function(recordset) {
		    	console.log(recordset);
	    		data.details = recordset;
	    		callback();
	    		connection1.close();
		    }).catch(function(err) {
		    	console.log(err)
		    	//res.send({data : err});
		    	connection1.close();
		        // ... query error checks 
		    });
		});
	},
	'insertIntoDb': function(req,res,table,field_name,values,response_data,callback)          
	{
		var sql = require('mssql');
		var config = require('config/db_connection')
		var utils = require('utility/utils');
		var connection1 = new sql.Connection(config, function(err) {
			var transaction = new sql.Transaction(/* [connection] */);
			transaction.begin(function(err) {
			    // ... error checks 
			 
			    var rolledBack = false;
			 
			    transaction.on('rollback', function(aborted) {
			        // emited with aborted === true 
			        rolledBack = true;
			    });
			 
			    var request = new sql.Request(transaction);
			    request.query('insert into '+table+' ('field_names+') values ('+values+')', function(err, recordset) {
			        // insert should fail because of invalid value 
			 
			        if (err) {
			            if (!rolledBack) {
			                transaction.rollback(function(err) {
			                    // ... error checks 
			                });
			            }
			        } else {
			            transaction.commit(function(err) {
			                response_data.insert_details = recordset;
			            });
			        }
			    });
			});
		});
	},
};