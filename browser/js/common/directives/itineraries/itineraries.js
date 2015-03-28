app.directive('NavbarItineraries', function(){
	return {
		restrict : "E",
		templateUrl : "js/common/directives/itineraries/itineraries.html",
		link : function(scope,element,attribute){
			scope.toItinerary = function(dir){
				$window.location.href="/plan/"+dir.type+'/'+dir._id;
			};
		}
})