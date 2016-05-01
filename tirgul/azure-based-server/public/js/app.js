(function() {

    var app = angular.module('store', ['ngRoute', 'ngAnimate']);

    app.controller('MainController', function($scope){
        this.image = 'images/background.png';
    })
    .controller('galleryController', function($scope) {
        this.images = images;
    })
    .service('RestService', function($http){
   var getAllUsers = function(){
       var request = {
           method:'GET',
           url:'/users'
       };
       return $http(request);
   };
   var registerUser = function(userJson){
     var request = {
         method:'POST',
         url:'/reg',
         data:userJson
     };
       return $http(request);
   };
        var deleteUser = function(userJson){
            var request = {
                method:'POST',
                url:'/delete',
                data:userJson
            };
            return $http(request);
        }

    return {
        getAllUsers:getAllUsers,
        registerUser:registerUser,
        deleteUser:deleteUser
    };
})
    .controller('formController', function($scope,RestService) {
        $scope.user = {};
        $scope.users = {};
        $scope.getAllUsers = function(){
             RestService.getAllUsers()
            .then(function(response){
                $scope.users = response.data;
                $scope.$apply;
            })
        }
        $scope.submitForm = function(){
        $scope.error = "";
        RestService.registerUser($scope.user)
            .then(function successCallback(response) {
            console.log('OK');
            $scope.user = {};
            $scope.getAllUsers();
        });
        };
        $scope.delete = function(){
            $scope.error = "";
            RestService.deleteUser($scope.user)
            .then(function(data){
                console.log(data.data);
                $scope.getAllUsers();
                $scope.user = {};
            })
            .catch(function(data){
               $scope.error = data.data;
            });
        }
    });

    var images = [
        '/images/1.jpg',
        '/images/2.jpg',
        '/images/3.jpg'
    ];


    app.config(function ($routeProvider) {
        $routeProvider
            .when('/gallery', {
            templateUrl: 'views/gallery.html',
            controller: 'galleryController',
            controllerAs:'gallery'
        })
            .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'formController'
        })
        .when('/home', {
            templateUrl:'views/home.html',
            controller:'MainController',
            controllerAs:'main'
        })
            .otherwise({
            redirectTo: '/home'
        });

    });
})();
