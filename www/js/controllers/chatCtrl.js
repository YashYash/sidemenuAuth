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
		    $scope.every_message = []; 
		    $scope.clicked = function () {
			    var chittychat = new Firebase("https://practicefacebook.firebaseio.com/users/" + user.id + "/profile/chat" );
			    var all_messages = [];
	            var name = $scope.chat.firstname;
	            var text = $scope.chat.message;
	            chittychat.push({name:name, text:text});
	            $scope.chat.message ='';
	         
		    chittychat.limit(7).on('value', function (snapshot) {
		        var message = snapshot.val();
		        console.log(message.name);
		        $scope.all_messages = message;

		       	$scope.$apply(function() {
					snapshot.forEach(function(childSnapshot) {
					  // This code will be called twice.
					  var name = childSnapshot.name();
					  var childData = childSnapshot.val();
					  console.log(childData.text);
				}); 
				
				  
				}); 
		    });


		    }

		    // Add a callback that is triggered for each chat messag       

	    } else {
	        // User is logged out.
	        console.log('logged out');
	    }
	});

})
