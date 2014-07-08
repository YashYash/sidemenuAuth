pyar.service('authService', function($firebase, $state) {

	myUser = -1;
	var ref = new Firebase("https://practicefacebook.firebaseio.com/test2");



	this.logout = function(){
		authClient.logout();
		$state.go('app.auth');
	}

	this.doLogin = function(email, password) {
	    authClient.login('password', {
	        email: email,
	        password: password
	    });
	    $state.go('app.home');
	};

	this.fblogin = function(){
	    authClient.login('facebook');
	    $state.go('app.home');
    };

	this.twitterlogin = function(){
	    authClient.login('twitter');
	    $state.go('app.home');
    };

	var authClient = new FirebaseSimpleLogin(ref, function (error, user) {
	    if (error) {
	        alert(error);
	        return;
	    }
	    if (user) {
	        // User is already logged in.
	        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
	        
	        // doLogin(user);
	        console.log('logged in')
	    } else {
	        // User is logged out.
	        $state.go('login');
	        console.log('logged out');
	        
	    }
	});

});