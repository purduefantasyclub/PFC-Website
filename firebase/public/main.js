function init() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
		} else {
			// No user is signed in.
			location.replace("index.html");
		}
	});

}

function signout() {
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
	}).catch(function(error) {
		// An error happened.
	});
}

window.onload = init

