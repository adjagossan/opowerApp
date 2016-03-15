'use strict';

angular.module('opowerApp')
  .controller('MainCtrl', function ($scope, $log, opowerAppFactory) {
    $scope.Tabs = [
        {id : 0, heading: 'Person', active : true, templateUrl:'/views/person.html'},
        {id : 1, heading: 'Home', active : false, templateUrl:'/views/home.html'},
        {id : 2, heading: 'Smart device', active : false, templateUrl:'/views/smart.html'}
      ];
      
    $scope.data = opowerAppFactory.query(function(){
        $scope.persons = $scope.data.persons;
    });
     
    $scope.submit = function(person){
        $scope.person = angular.copy(person);
        opowerAppFactory.save($scope.person, function(data){
               $scope.persons.push(data);
           });
       }
  })
;
