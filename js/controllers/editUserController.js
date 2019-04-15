myApp.controller('editUserCtrl', function ($scope, $modalInstance, userId,user,title,dataFactory) {

  $scope.userId = userId;
  $scope.user = user;
  $scope.title = title;
  $scope.list = dataFactory;

  $scope.saveUser = function (id,firstname,lastname,birthdate,email,userForm) {     
        if(userForm.$valid){
            $scope.errorForm = false; 
            $scope.list.items[id].firstname = firstname;
            $scope.list.items[id].lastname = lastname;
            $scope.list.items[id].birthdate = birthdate;
            $scope.list.items[id].email = email;
            $modalInstance.dismiss('cancel');
        } else {
            $scope.errorForm = true;
        }
        localStorage.setItem("myKey", angular.toJson($scope.list));
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});