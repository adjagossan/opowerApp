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
        if(data.persons !== undefined)
        {
            if(data.persons.length > 1){
                $scope.persons=data.persons;
            }
            else{
                $scope.persons.push(data.persons);
            }
        }
    });

    $scope.submit = function(person){
        if(person !== undefined)
            $scope.loading = true;
        if(!editingMode){
        opowerAppFactory.save(/*$scope.*/person, function(data){
               $scope.persons.push(data);
               $scope.loading = false;
           });
        }

        if(editingMode){
            opowerAppFactory.update({personId:/*$scope.*/person.id}, /*$scope.*/person, function(data){
                    $scope.person = data;
                    $scope.loading = false;
            });
        }
        editingMode = false;
    };

    $scope.edit = function(person){
        $scope.person = person;
        editingMode = true;
    };

    $scope.remove = function(person){
        if(person !== undefined)
            $scope.loading = true;
        opowerAppFactory.remove({personId:person.id}, /*person,*/ function(data){
            var index = $scope.persons.indexOf(person);
            $scope.persons.splice(index, 1);
            $scope.loading = false;
        });
    };
  })
;
