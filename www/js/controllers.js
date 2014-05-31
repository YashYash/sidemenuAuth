angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('authCtrl', function($scope, $stateParams, $location, $firebase) {
	console.log("auth controller is working");

	//Testing out ng-click functionality
    $scope.testclick = function($scope) {
    	console.log("Button clicked")
	};

	//Testing out ng-show and ng-hide functionality
	$scope.toggle = true;

	baseurl = "http://local.rocketu.com/local.rocketu.com/ionic/sidemenuAuth/www/#/app";

	myUser = -1;
	var ref = new Firebase("https://practicefacebook.firebaseio.com/test2");
	window.scope = $scope;

	$scope.auth = { username: "", password: ""}

	$scope.register = function(){
		var email = $scope.auth.username;
		var password = $scope.auth.password;
        authClient.createUser(email, password, function (error, user) {
            if (!error) {
                console.log('New user registered');
                doLogin(email, password);
                console.log("new user logged in");
                $location.path(baseurl + "/login");

            } else {
                alert(error);
            }
        });
        console.log("logging in " + $scope.auth.username);
    };

	$scope.login = function(){
		console.log('trying to login: ' + $scope.auth.username);
		var email = $scope.auth.username;
		var password = $scope.auth.password;
        doLogin(email, password);
        $location.path(baseurl + "/home")

    };

	$scope.logout = function(){
		authClient.logout();
		$location.path(baseurl + "/logout");
	}

	function doLogin(email, password) {
	    authClient.login('password', {
	        email: email,
	        password: password
	    });
	};

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
	    } else {
	        // User is logged out.
	        console.log('logged out');
	    }
	});

})