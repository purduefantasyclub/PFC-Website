function init() {
	console.log("loading")
	
	try {
		let app = firebase.app();
	} catch (e) {
		console.error(e);
	}

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

