function init() {
	initDB()
	watchUser(function(){
	});
}

function signout() {
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
	}).catch(function(error) {
		// An error happened.
	});
}

function characters() {
	changePage("characters.html");
}

function gm() {
	verifyPrivilege("gm", function() {
		changePage("gm.html");
	});
}

function magicItems() {
	changePage("archives.html");
}

window.onload = init

