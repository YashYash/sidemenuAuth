pyar.controller('chatCtrl', function($scope, $stateParams, $location, $firebase, $state, Data, authService) {
	console.log("chat controller is working");

  	var ref = new Firebase("https://practicefacebook.firebaseio.com/test-1");

	$scope.logout = authService.logout;


	var authClient = new FirebaseSimpleLogin(ref, function (error, user) {
	    if (error) {
	        alert(error);
	        return;
	    }
	    if (user) {
	        // User is already logged in.
	        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
	        myUser = user;

	        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
	        myUser = user;
	        // doLogin(user);
	        console.log('logged in')

			var get_profile = new Firebase("https://practicefacebook.firebaseio.com/users/" + user.id + "/profile" );

			get_profile.once('value', function(dataSnapshot) {
				myrefSnapshot = dataSnapshot;
				$scope.$apply(function() {
					$scope.data = myrefSnapshot.val();
					$scope.full_name = $scope.data.full_name
				});
				console.log($scope.data.full_name);

			})	


		    // When the user presses enter on the message input, write the message to firebase.
		    $scope.chat = { firstname: "", message: ""}

		    $scope.clicked = function () {
			    var chittychat = new Firebase("https://practicefacebook.firebaseio.com/users/" + user.id + "/profile/chat" );
			    var all_messages = [];
	            var name = $scope.chat.firstname;
	            var text = $scope.chat.message;
	            chittychat.push({name:name, text:text});
	            var new_array = all_messages.push({text:text});
	            $scope.messages = new_array;
	            $scope.chat.message = '';
	            
		    chittychat.limit(20).on('child_added', function (snapshot) {
		        var message = snapshot.val();
		        $scope.messages = all_messages.push(message);
		        console.log(message);
		        $scope.recieved_message = message;
		    });	 

		    }

		    // Add a callback that is triggered for each chat messag       

	    } else {
	        // User is logged out.
	        console.log('logged out');
	    }
	});

})
