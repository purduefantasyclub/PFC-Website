function init() {
	initDB();
	watchUser(function() {
		enforceAccess(PRIV_ADMIN, showPage);
	});
}

function showPage() {
	removeOverlay();
	loadPlayers();
}

// Loads all players from database into selection
function loadPlayers() {
	let selectPlayer = document.getElementById("players");
	removeOptions(selectPlayer);
	db.collection("players").get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			let data = doc.data();
			if (data.privilege == PRIV_ADMIN) {
				return;
			}

			let name = data.name;
			let id = doc.id;

			let charOption = document.createElement("option");
			charOption.text = name;
			charOption.value = id;
			selectPlayer.appendChild(charOption)
		})
	});
}

// Elevate user privilege to GM
// Assgn user specified GM prefix if not already assigned
function makeGM() {
	let selectPlayer = document.getElementById("players");
	let playerID = selectPlayer.value;
	let playerRef = db.collection("players").doc(playerID);
	let gmPrefix = document.getElementById("gmPrefix").value;
	let gmData = {};
	playerRef.get().then(function(doc) {
		let data = doc.data();
		if (data.gmPrefix == "") {
			gmData["gmPrefix"] = gmPrefix;
		}

		gmData["privilege"] = PRIV_GM;
		playerRef.update(gmData).then(function() {
			alert("GM Privileges have been added");
		});

	});
}

// Demote user privilege to normal plauyer
// Do not remove GM prefix
function revokeGM() {
	let selectPlayer = document.getElementById("players");
	// let playerID = selectPlayer.options[selectPlayer.selectedIndex].value;
	let playerID = selectPlayer.value;
	let playerRef = db.collection("players").doc(playerID);
	playerRef.update({
		privilege: PRIV_PLAYER,
	}).then(function() {
		alert("GM Privileges have been revoked");
	}).catch(function(error) {
		console.log(error);
	});

}

window.onload = init;

