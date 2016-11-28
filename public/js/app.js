angular.module('project', ['ngRoute','homeController','userController','ngStorage','localytics.directives'])
 
.config(function($routeProvider) {
 
  $routeProvider
    .when('/', {
      controller:'login',
      templateUrl:'templates/login.html',
    })
    .when('/user', {
      controller:'user',
      templateUrl:'templates/user.html',
    })
     .when('/customer:userId', {
      controller:'customer',
      templateUrl:'templates/customer.html',
    })

    .otherwise({
      redirectTo:'/'
    });
})
