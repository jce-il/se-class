(function() {
    var app = angular.module('store', ['ngRoute', 'ngAnimate']);

    app.controller('MainController', function($scope){
        this.image = 'images/background.png';
    })
    .controller('galleryController', function($scope) {
        this.images = images;
    })
    .controller('formController', function($scope) {
        this.submitForm = function(){
            users.push(this.user);
            this.user = {};
            console.log(users);
        };
    });
    var users = [{}];
    var images = [
        '/images/1.jpg',
        '/images/2.jpg',
        '/images/3.jpg'
    ];
    
    
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/gallery', {
            templateUrl: 'gallery.html',
            controller: 'galleryController',
            controllerAs:'gallery'
        })
            .when('/login', {
            templateUrl: 'login.html',
            controller: 'formController',
            controllerAs: 'form'
        })
        .when('/home', {
            templateUrl:'home.html',
            controller:'MainController',
            controllerAs:'main'
        })
            .otherwise({
            redirectTo: '/home'
        });

    });
})();