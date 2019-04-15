myApp.controller('addUserCtrl', function ($rootScope,$scope, $modalInstance,title,dataFactory) {

  $scope.title = title;
  $scope.list = dataFactory;

  $scope.saveUser = function (id,firstname,lastname,birthdate,email,editForm) {     
        if(editForm.$valid){
            $scope.errorForm = false; 
            $scope.list.items.push({ firstname: firstname, lastname: lastname, birthdate: birthdate, email: email  });
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