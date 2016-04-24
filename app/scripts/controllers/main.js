'use strict';
var editingMode = false;
var updatedPerson = {};
var id_ = -1; //ID de personne à supprimer
var opowerApp = angular.module('opowerApp');

opowerApp.controller('MainCtrl', function ($scope, $log, opowerAppFactory) {
    $scope.persons = [];
    $scope.Tabs = [
        {id : 0, heading: 'Person', active : true, templateUrl:'/views/person.html'},
        {id : 1, heading: 'Home', active : false, templateUrl:'/views/home.html'},
        {id : 2, heading: 'Smart device', active : false, templateUrl:'/views/smart.html'}
      ];

    //GET
    opowerAppFactory.query(function(data){
        if(data.persons !== /*undefined*/null)
        {
            if(data.persons.length > 1){
                $scope.persons=data.persons;
            }
            else{
                $scope.persons.push(data.persons);
            }
        }
    }, function(data){
        $scope.serverResponse = data.status+' '+data.statusText;
    });

    $scope.submit = function(person)
    {
        if(person !== null)
        {
                $scope.loading = true;
                //POST
                if(!editingMode){
                    opowerAppFactory.save(person, function(data){
                            $scope.persons.push(data);
                            $scope.reset(person, 'POST');
                            $scope.loading = false;
                       }, function(response){
                            $scope.serverResponse = response.status+' '+response.statusText;
                            $scope.loading = false;
                       });
                }
                //PUT
                if(editingMode){
                        opowerAppFactory.update({personId:person.id}, person, function(data){
                                updatedPerson.forename = data.forename;
                                updatedPerson.surname = data.surname;
                                updatedPerson.mail = data.mail;
                                $scope.reset(person, 'PUT');
                                $scope.loading = false;
                        }, function(response){
                                $scope.serverResponse = response.status+' '+response.statusText;
                                $scope.loading = false;
                        });
                }
                editingMode = false;
        }
    };

    $scope.edit = function(person){
        $scope.person = angular.copy(person);
        updatedPerson = person;
        editingMode = true;
    };
    //DELETE
    $scope.remove = function(person){
              $scope.loading = true;
              id_ = person.id;
              opowerAppFactory.remove({personId:person.id}, function(data){
              //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/findIndex
              var index = $scope.persons.findIndex($scope.getPersonIndex);
              $scope.persons.splice(index, 1);
              $scope.loading = false;
        }, function(response){
              $scope.serverResponse = response.status+' '+response.statusText;
              $scope.loading = false;
        });
    };

    $scope.getPersonIndex = function(element, index, array){
        if(element.id === id_)
            return true;
        return false;
    };

    $scope.reset = function(person, typeRequest){
      delete person.forename;
      delete person.surname;
      delete person.mail;
      if(typeRequest === 'PUT')
            delete person.id;
    };

  })
;
