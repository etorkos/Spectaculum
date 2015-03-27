'use strict';
app.factory('ItineraryFactory', function($http){
	return {
		createId: function(data) { // will create a itinerary (pass in a user or no user)
			return $http.post('/api/itinerary', data).then(function(response){
				if(response.status === 500){
					console.log('Database error', response.data);
				}
				else{
					console.log('got back to ItineraryFactory');
					return response.data;
				}
			})
		}
	}

})