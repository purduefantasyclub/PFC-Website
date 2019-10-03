// Make firebase signup call with provided information
function signup() {
	let username = document.getElementById('username').value;
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	let conf = document.getElementById('confirm').value;
	
	if (!verifyInfo(username, email, password, conf)) {
		return;
	}
	
	firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
		var user = firebase.auth().currentUser;	
		if (user) {
			//User is signed in.
			console.log("adding user to database");
			createPlayer(user, username);
		}
		else {
			// User was not signed in
			changePage("index.html");
		}

	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log("ERROR " + errorCode + ": " + errorMessage);
		// ...
	});
}

// Verify signup information is valid
function verifyInfo(username, email, password, conf) {
	if (username == "") {
		alert("username is blank");	
		return false;
	}
	if (email == "") {
		alert("email is blank");
		return false;
	}
	if (password == "") {
		alert("password is blank");
		return false;
	}
	if (conf == "") {
		alert("please confirm your password");
		return false;
	}
	if (conf != password) {
		console.log("passwords do not match");
		return false;
	}

	return true;
}

// Create a new player for the user in the database
function createPlayer(user, name) {
	let uid = user.uid;
	console.log(name + "->" + uid);
	// Get a reference to the database service
	var db = firebase.firestore();
	db.collection("players").doc(uid).set({
		name: 	    name,
		characters: [],
		userLevel:  "player",
	}).then(function() {
		changePage("main.html");
	}).catch(function(error) {
		// error creating doc
		console.log(error)
	});
}

function login() {
	location.replace("index.html");
}

