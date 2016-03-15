var pokeDirective = angular.module('pokeDirective', []);
pokeDirective.directive('pokedex', function(){
	return {
		restrict: 'E',
		templateUrl: 'pokedex.html'
	};
});