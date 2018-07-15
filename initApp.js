initApp = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;
      user.getIdToken().then(function(accessToken) {
        var stringify = JSON.stringify({
          email: email,
        }, null, ' ');
        var obj = JSON.parse(stringify);
        $("#userEmail").text(obj.email);
      });
      $("#authBtn").html('Sign out');
      if(email == 'jeffreyteoh4311@gmail.com') {
        //document.getElementById('user-status').textContent = 'Admin'
        $("#adminBtn").removeClass('d-none');
      } else {
        //document.getElementById('user-status').textContent = 'User'
        $("#adminBtn").addClass('d-none');
      }
    } else {
      // User is signed out.
      /*document.getElementById('sign-in-status').textContent = 'Signed out'; 
      document.getElementById('sign-in').textContent = 'Sign in';
      document.getElementById('account-details').textContent = 'null';
      document.getElementById('user-status').textContent = 'Signed out'*/
      $("#authBtn").html('Login');
      $("#adminBtn").addClass('d-none');
      $("#userEmail").text('');;
    }
  }, function(error) {
    console.log(error);
  });
};

window.addEventListener('load', function() {
  initApp()
});