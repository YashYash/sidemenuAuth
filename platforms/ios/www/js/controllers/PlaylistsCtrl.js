pyar.controller('PlaylistsCtrl', function($scope, $stateParams, $location, $firebase, $state, $http, Data, authService) {
  $scope.test = "test";
  console.log($scope.test);
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
	console.log("Playlists controller is working");
  var ref = new Firebase("https://practicefacebook.firebaseio.com/test-1");
  var authClient = new FirebaseSimpleLogin(ref, function (error, user) {
    if(user) {
      console.log("logged in");

      console.log(playlists);
    } else {
    }
  });
});