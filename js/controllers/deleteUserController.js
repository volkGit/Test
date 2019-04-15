myApp.controller('deleteUserCtrl', function ($scope, $modalInstance,userId,dataFactory) {

  $scope.list = dataFactory;
  $scope.userId= userId;

  $scope.deleteUser = function (id) {     
      $scope.list.items.splice(id, 1);
      localStorage.setItem("myKey", angular.toJson($scope.list));
      $modalInstance.dismiss('cancel');
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});