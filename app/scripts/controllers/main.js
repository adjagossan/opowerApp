'use strict';
var editingMode = false;

angular.module('opowerApp')
  .controller('MainCtrl', function ($scope, $log, opowerAppFactory) {
    
    $scope.persons = [];
    
    $scope.Tabs = [
        {id : 0, heading: 'Person', active : true, templateUrl:'/views/person.html'},
        {id : 1, heading: 'Home', active : false, templateUrl:'/views/home.html'},
        {id : 2, heading: 'Smart device', active : false, templateUrl:'/views/smart.html'}
      ];
      
    $scope.data = opowerAppFactory.query(function(data){
        $log.log(data.persons);
        if(data.persons !== undefined)
        {
            $scope.persons=data.persons;
        } 
    });
    
    $scope.submit = function(person){
        //$scope.person = angular.copy(person);
        
        if(!editingMode){
        opowerAppFactory.save(/*$scope.*/person, function(data){
               $scope.persons.push(data);
           });
        }
        
        if(editingMode){
            opowerAppFactory.update({personId:/*$scope.*/person.id}, /*$scope.*/person, function(data){
                    $scope.person = data;
            });
        }
        editingMode = false;
    }
    
    $scope.edit = function(person){
        $log.log(person);
        $scope.person = person;
        editingMode = true;
    }
    
    $scope.remove = function(person){
        opowerAppFactory.remove({personId:person.id}, /*person,*/ function(data){
            var index = $scope.persons.indexOf(person);        
            $scope.persons.splice(index, 1);
        });
    }
  })
;
