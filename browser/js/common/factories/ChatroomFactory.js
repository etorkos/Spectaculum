'use strict';
app.factory('ChatroomFactory', function ($http, DataSetFactory){
	return {
		current_itinerary_id : null,
		set_itinerary_id : function(id){
			// console.log(id, "set id")
			this.current_itinerary_id = id;
		},
		get_itinerary_id : function(){
			return this.current_itinerary_id;
		},
		sync_messages_from_db : function(message_array){
			$http.get('api/')
		},
		set_chatroom_name : function(chatroom_name){
			//a method to change name of chatroom
		},
		send_message : function(message_text){
			//encapsulation of two methods
			this.send_message_to_server(message_text);
			this.save_message_to_database(message_text);
		},
		send_message_to_server : function(name,message_text){
			socket.emit('message',{
				name : name,
				message : message_text
			});
		},
		save_message_to_database : function(message){
			//will get itinerary id from req.user at server
			$http.post('/api/chatroom/message',{
				room_id : this.current_itinerary_id,   
				message : message
			});
		},
		create_room : function(room_name){
			socket.emit('join_room',room_name);
			$http.post('/api/chatroom/create',{
				chatroom:{
					name : room_name
				}
			}).then(function(response){
				alert(response.data);
			});
		},
		join_room : function(room_name){
			if(typeof room_name == "undefined"){
				// console.log(this.current_itinerary_id, "join room from this")
				socket.emit('join_room',this.current_itinerary_id);
			}
			socket.emit('join_room',room_name)
		},
		open_invitation : function(username,lat,lng,range){
			socket.emit('open_invitation',{
				username : username,
				room_name : this.current_itinerary_id,
				lat : lat,
				lng : lng,
				range: range
			})
		},
		close_invitation: function(){
			socket.emit('close_invitation');
		},
		leave_room : function(){
			socket.emit('leave_room');
		},
		up_vote: function(event,eights){
			var obj = {};
			obj.type = event.type;
			obj.name = event.name;
			obj.vote = 1;
			if(event.type == "venues"){
				obj.lat = event.location.lat,
				obj.lng = event.location.lng
			}
			else if (event.type == "event"){
				obj.lat = event.venue.latitude,
				obj.lng = event.venue.longitude
			}
			socket.emit('up_vote', {
				obj : obj,
				eights : eights});
		},
		down_vote : function(event, eights){
			var obj = {};
			obj.type = event.type;
			obj.name = event.name;
			obj.vote = -1;
			if(event.type == "venues"){
				obj.lat = event.location.lat,
				obj.lng = event.location.lng
			}
			else if (event.type == "event"){
				obj.lat = event.venue.latitude,
				obj.lng = event.venue.longitude
			}
			socket.emit('up_vote', {
				obj : obj,
				eights : eights});
		},
		top_eights : function(eights){
			socket.emit('top_eights',eights);
		},
		invite_friend : function(friend_id){
			socket.emit('invite_friend',friend_id);
		},
		bind_user_id : function(user_id){
			socket.emit('bind_user_id',user_id);
		},
		update_vote : function(vote){
			var data = vote.obj;
			var eights = vote.eights;
			var type = data.type;
			var vote = data.vote;
			console.log(eights, "this is the eights")
			DataSetFactory.events.forEach(function(a){
				if(a.name == data.name){
					a.votes += vote
				}
			})
			DataSetFactory.venues.forEach(function(a){
				if(a.name == data.name){
					a.votes += vote
				}
			})
			console.log(eights, "this is the eights")
			if(type == "venue"){
				for(var i = 7; i > 0; i--){
					var set = DataSetFactory.venues;
					for(var j =0; j < set.length; j++){
						if(set[j].name == eights[i].name){
							var temp = set[j];
							console.log(temp)
							set.splice(j,1)
							set.unshift(temp);
							break
						}
					}
				}
				console.log(DataSetFactory.venues.slice(0,8))
			}
		}
	}
});
