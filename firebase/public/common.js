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
			if (playerData.privilege == privilege) {
				callback();
			}
			else {
				alert("You do not have high enough privilege to access this");
			}
		}
	});
}

function changePage(url) {
	location.replace(url);
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

