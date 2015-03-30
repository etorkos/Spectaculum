'use strict';
app.controller('RoomCtrl', function($scope, $state, MessageFactory, ChatroomFactory, POIFactory){

    $scope.invite_friends = function(){
        var itinerary_id = ChatroomFactory.get_itinerary_id();
        ChatroomFactory.open_invitation(itinerary_id);
    };

    

    $scope.toMaps = function(){
        $state.go('map');//verify route destination
    };

    $scope.today = function() {
        $scope.dt = new Date(); //date object we are using
        POIFactory.date = $scope.dt;
    };
    $scope.today();

    $scope.exportDate = function(){
        POIFactory.date = $scope.dt;
    }

    $scope.clear = function () {
     $scope.dt = null;
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.active = MessageFactory.active;
    $scope.makeActive = function(){
        MessageFactory.changeActive();
        $scope.active = !$scope.active;
    }


});