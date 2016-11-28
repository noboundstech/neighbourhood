angular.module('project', ['ngRoute','homeController','ngStorage'])
 
.config(function($routeProvider) {
 
  $routeProvider
  .when('/', {
      controller:'home',
      templateUrl:'templates/home.html',
    })
  .when('/registration', {
      controller:'registration',
      templateUrl:'templates/registration.html',
    })
    .when('/login', {
      controller:'login',
      templateUrl:'templates/login.html',
    })
    .otherwise({
      redirectTo:'/'
    });
})
.run(function($rootScope,$location){
  $rootScope.logout_user = function(){

    // call an api and send all message to server

    localStorage.removeItem("last_login");
    localStorage.removeItem("user_type");
    localStorage.removeItem("csr_name");
    localStorage.removeItem("char_message");
    $location.url("");
  }
})
