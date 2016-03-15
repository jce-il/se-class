(function() {
    var app = angular.module('store', ['ngRoute']);

    app.controller('galleryController', function($scope) {
        this.images = images;
    });
    app.controller('formController', function($scope) {
        this.user ={};
        this.submitForm = function(data){
            users.push(this.user);
            this.user = {};
        }
    });
    var users = [{}];
    var images = [
        'images/1.jpg',
        'images/2.jpg',
        'images/3.jpg'
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
            .otherwise({
            redirectTo: '/'
        });

    });
})();