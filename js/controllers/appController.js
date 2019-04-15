
var myApp = angular.module("myApp", ['ui.bootstrap']);

myApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

myApp.factory('dataFactory', function() {
  var model = {
        items: [
            { firstname: "Василий", lastname: "Иванов", birthdate: new Date(2000, 0, 13), email: "test@mail.ru" },
            { firstname: "Роман", lastname: "Петров", birthdate: new Date(1955, 5, 17), email: "test@yandex.ru" },

        ]
    };

    if (JSON.parse(localStorage.getItem("myKey")) !== null) {
        model = JSON.parse(localStorage.getItem("myKey"));
        model.items.forEach(function(item, i, arr) {
          item.birthdate = new Date(item.birthdate);
        });
    }

    return model;

});

myApp.controller("appController",function ($scope,$modal,dataFactory) {

    $scope.list = dataFactory;

    $scope.addUser = function () {

        var modalInstance = $modal.open({
                templateUrl: '/angular/views/userForm.html',
                controller: 'addUserCtrl',
                resolve: {
                    title: function () {
                      return 'Добавить пользователя';
                    } 
                }

        });

    };

    $scope.deleteUser = function (id) {
       // $scope.list.items.splice(id, 1);
        //localStorage.setItem("myKey", angular.toJson($scope.list));

        var modalInstance = $modal.open({
                templateUrl: '/angular/views/modal.html',
                controller: 'deleteUserCtrl',
                resolve: {
                    userId: function () {
                      return id;
                    } 
                }

        });    
    };

    $scope.openModal = function (id) {

        var user = [];

        JSON.parse(angular.toJson($scope.list.items[id]), function(k, v) {
          if (k == 'birthdate')  {
             user[k] = new Date(v);
          } else {
             user[k] = v;
          }
          
        });

        var modalInstance = $modal.open({
                templateUrl: '/angular/views/userForm.html',
                controller: 'editUserCtrl',
                resolve: {
                    userId: function () {
                      return id;
                    },
                    user: function () {
                      return user;
                    },
                    title: function () {
                      return 'Редактировать пользователя';
                    } 
                }
            });

    
    };

});