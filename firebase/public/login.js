// login with the provided email and password
function login() {
	email = document.getElementById('email').value;
	password = document.getElementById('password').value;
	firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
		changePage("main.html");
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log("SIGN IN ERROR" + errorCode + ": " + errorMessage);
		// ...
	})
}

function signup() {
	changePage("signup.html");
}

