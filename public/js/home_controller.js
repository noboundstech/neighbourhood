angular.module('homeController', ['testService.services'])
.controller('home', function($scope)
{
  $scope.details ="i am in home";
})
.controller('login', function($scope,API,$location,$rootScope)
{
	$scope.details ="Login to Your Account";
	$scope.login = {};
	$scope.loginUser = function(){
		// doing validation of the form
		$scope.error = '';
		if(typeof $scope.login.username =='undefined' || $scope.login.username =='' || $scope.login.username ==null)
		{
			$scope.error = "Please enter the username";
			return false;
		}
		
		if(typeof $scope.login.password =='undefined' || $scope.login.password =='' || $scope.login.password ==null)
		{
			$scope.error = "Please enter your password";
			return false;
		}
	// calling api 

	/*
		API.postDetails($scope.login,"userLogin/login").then(function successCallback(response) {
			if(response.status == 200)
			{
				$rootScope.user_name = $scope.login.username;
				localStorage.setItem('csr_name', JSON.stringify($rootScope.user_name));
				$location.url("user");

			}
			else
			{
				$scope.error = response.data.message;
			}
		    // this callback will be called asynchronously
		    // when the response is available
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});

	*/

	$rootScope.user_name = $scope.login.username;
				localStorage.setItem('csr_name', JSON.stringify($rootScope.user_name));
				$location.url("user");
	}
});