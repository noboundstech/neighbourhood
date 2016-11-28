angular.module('testService.services', [])
    .factory('API', function ($http) 
    {
	   	var base = "http://localhost:3500/";
        return  {
				getDetails : function (url,params) {
					return $http.get(base+url,
                    {
                        method : 'GET',  
                        headers:{'Content-Type': 'application/json'},
                        params: params
                    });
				},
				postDetails : function (form,url) {
					return $http.post(base+url,
                    form,
                    {
                        method : 'POST',  
                        headers:{'Content-Type': 'application/json'}
                    });
				},
			}
    })
    