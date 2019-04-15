
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



var myApp = angular.module("myApp", []);
    myApp.controller("appController", function ($scope) {
    $scope.list = model;
    $scope.visible = false;
    $scope.addUser = function (firstname, lastname,birthdate,email,userForm) {

        if(userForm.$valid){
            $scope.list.items.push({ firstname: firstname, lastname: lastname, birthdate: birthdate, email: email  });
        }
        localStorage.setItem("myKey", angular.toJson($scope.list));

    },
    $scope.deleteUser = function (id) {
        $scope.list.items.splice(id, 1);
        localStorage.setItem("myKey", angular.toJson($scope.list));    
    },
    $scope.openModal = function (id) {
        $scope.visible = true; 
        $scope.edit_firstname = $scope.list.items[id].firstname; 
        $scope.edit_lastname = $scope.list.items[id].lastname;   
        $scope.edit_birthdate = $scope.list.items[id].birthdate;
        $scope.edit_email = $scope.list.items[id].email;
        $scope.user = id;     
    },
    $scope.closeModal = function () {
        $scope.visible = false;    

    },
    $scope.editUser = function (id,firstname,lastname,birthdate,email,editForm) {     
        if(editForm.$valid){
            $scope.visible = false;
            $scope.errorForm = false; 
            $scope.list.items[id].firstname = firstname;
            $scope.list.items[id].lastname = lastname;
            $scope.list.items[id].birthdate = birthdate;
            $scope.list.items[id].email = email;
        } else {
            $scope.errorForm = true;
        }
        localStorage.setItem("myKey", angular.toJson($scope.list));
    }
});