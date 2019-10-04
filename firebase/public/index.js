function init() {
	console.log("loading")
	signout();
	loginInit();

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log("user signed in\n" + user);
			// User is signed in.
		} else 
			console.log("no user signed in");
		// No user is signed in.
	});
}


window.onload = init;

