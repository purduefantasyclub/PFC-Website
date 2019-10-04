function loginInit() {
	let passInput = document.getElementById("password");
	passInput.addEventListener("keyup", function(event) {
		// Number 13 is the "Enter" key on the keyboard
		if (event.keyCode === 13) {
			// Cancel the default action, if needed
			event.preventDefault();
			// Trigger the button element with a click
			document.getElementById("loginBtn").click();
		}
	});
}
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

