pyar.controller('PlaylistCtrl', function($scope, $stateParams, $location, $firebase, $state, authService) {

	console.log("Playlist controller is working");
	var ref = new Firebase("https://practicefacebook.firebaseio.com/test-1");
  	var authClient = new FirebaseSimpleLogin(ref, function (error, user) {
	    if (user) {
		    console.log(user.id);
		    console.log(user.email);
		} else {
		}
  });
})
