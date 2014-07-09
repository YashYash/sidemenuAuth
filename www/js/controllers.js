angular.module('pyar.controllers', [])

.controller('AppCtrl', function($scope, $stateParams, $location, $firebase, $state, Data, authService) {
	console.log("the global AppCtrl")

  	var ref = new Firebase("https://practicefacebook.firebaseio.com");


	var authClient = new FirebaseSimpleLogin(ref, function (error, user) {
	    if (error) {
	        alert(error);
	        return;
	    }
	    if (user) {
	        // User is already logged in.
	        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
	        myUser = user;
	        // doLogin(user);
	        console.log('logged in')

			var get_profile = new Firebase("https://practicefacebook.firebaseio.com/users/" + user.id + "/profile" );

			get_profile.once('value', function(dataSnapshot) {
				myrefSnapshot = dataSnapshot;
				$scope.$apply(function() {
					$scope.data = myrefSnapshot.val();
					$scope.full_name = $scope.data.full_name;
					$scope.occupation = $scope.data.occuption;
					$scope.gender = $scope.data.gender;
					$scope.orientation = $scope.data.orientation;
				});
				console.log($scope.data.full_name);

			})	        

	    } else {
	        // User is logged out.
	        console.log('logged out');
	    }
	});

})






