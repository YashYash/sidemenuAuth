pyar.controller('loginCtrl', function($scope, $stateParams, $location, $firebase, $state, Data, authService) {
	console.log("login controller is working");

  	var ref = new Firebase("https://practicefacebook.firebaseio.com/test-1");

	//Testing out ng-click functionality
    $scope.forgot = function($scope) {
    	$state.go('app.forgot')
	};

	//Testing out ng-show and ng-hide functionality
	$scope.toggle = true;

	$scope.auth = { username: "", password: ""}

	$scope.register = function(){
		var email = $scope.auth.username;
		var password = $scope.auth.password;
        authClient.createUser(email, password, function (error, user) {
            if (!error) {
                console.log('New user registered');
                authService.doLogin(email, password);
                $state.go('app.home');
                console.log("new user logged in");

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
        authService.doLogin(email, password);
    };

	$scope.fblogin = authService.fblogin;

	$scope.twitterlogin = authService.twitterlogin;

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
	        // doLogin(user);
	        console.log('logged in')
	    } else {
	        // User is logged out.
	        console.log('logged out');
	        $state.go('login');
	    }
	});

})
