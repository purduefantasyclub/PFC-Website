// User privilege levels
const PRIV_SUSPENDED = 1;
const PRIV_PLAYER = 2;
const PRIV_GM = 3;
const PRIV_STAFF = 4;
const PRIV_APPROVALS = 5;
const PRIV_ADMIN = 6;

// Item approval status
const APPROVAL_PENDING = "pending";
const APPROVAL_DEFERRED = "deferred";
const APPROVAL_PLAYTEST = "playtest";
const APPROVAL_APPROVED = "approved";
const APPROVAL_REJECTED = "rejected";

var db = null;
var user = null

function initDB() {
	db = firebase.firestore();
}

function verifyPrivilege(privilege, callback) {
	let playerRef = db.collection("players").doc(user.uid);
	playerRef.get().then(function(doc) {
		if (doc.exists) {
			let playerData = doc.data()
			if (playerData.privilege >= privilege) {
				callback();
			}
			else {
				console.log(playerData.privilege);
				alert("You do not have high enough privilege to access this");
			}
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

function changePage(url) {
	window.location.href = url;
}

function removeOverlay() {
	let overlay = document.getElementById("overlay");
	overlay.style.display = "none";
}

function removeOptions(selectbox) {
	var i;
	for(i = selectbox.options.length - 1 ; i >= 0 ; i--) {
		selectbox.remove(i);
	}
}

function watchUser(callback) {
	firebase.auth().onAuthStateChanged(function(watchUser) {
		if (watchUser) {
			user = watchUser;
			callback();
		}
		if (!watchUser) {
			changePage("index.html");
		}
	});
}

function enforceAccess(privilege, callback) {
	let uid = user.uid;
	db.collection("players").doc(uid).get().then(function(doc) {
		let data = doc.data();
		if (privilege > data.privilege) {
			changePage("main.html");
		}
		else {
			callback();
		}
	}).catch(function(error) {

	});
}

