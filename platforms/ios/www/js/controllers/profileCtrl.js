pyar.controller('profileCtrl', function($scope, $stateParams, $location, $firebase, $state, Data, authService, $route) {
	console.log("profile controller is working");

  	var ref = new Firebase("https://practicefacebook.firebaseio.com");

	$scope.logout = authService.logout;

	$scope.profile = { full_name: "", gender: "", occupation: "", religion: "", orientation: "" }


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
					$scope.full_name = $scope.data.full_name
		    	$scope.not_filled = function(){
		    		if ($scope.full_name){
		    			console.log("its not empty");
		    			return false;
		    		} else {
		    			console.log("its empty");
		    			return true;
		    		}
		    	}

				});
				console.log($scope.data.full_name);

			})	        

			$scope.profileupdate = function(){
				var full_name = $scope.profile.full_name;
				var gender = $scope.profile.gender;
				var occupation = $scope.profile.occupation;
				var religion = $scope.profile.religion;
				var orientation = $scope.profile.orientation;
				var id = user.id;

				var profile_upload = new Firebase("https://practicefacebook.firebaseio.com/users/" + user.id + "/profile");

				profile_upload.set({
					full_name:full_name, 
					gender:gender, 
					occupation:occupation, 
					religion:religion, 
					orientation:orientation, 
					id:id 
				})

				$state.reload();

			}


	    } else {
	        // User is logged out.
	        console.log('logged out');
	    }
	});

})
