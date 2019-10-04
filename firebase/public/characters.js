function init() {
	initDB()
	watchUser(function() {
		loadCharacterList();	
	});
}

// Load player's characters into selection
function loadCharacterList() {
	let playerRef = db.collection("players").doc(user.uid);
	playerRef.get().then(function(doc) {
		if (doc.exists) {
			let data = doc.data();
			let	characters = data.characters;

			for (i = 0; i < characters.length; i++) {
				let character = characters[i];
				let characterName = character.name;
				addCharacterItem(characterName);
			}
		}
	});
}

// Create the necessary elements and adds it to the list of characters
function addCharacterItem(characterName) {
	let characterList = document.getElementById("characterList");
	let name = characterName;
	let charDiv = document.createElement("div");
	charDiv.className = "character";

	let charSpan = document.createElement("span");
	charSpan.textContent = name;
	charDiv.appendChild(charSpan);

	characterList.appendChild(charDiv);
}

// Create a new character
function createNewCharacter() {
	let name = document.getElementById("newCharacterName").value;
	if (name == "") {
		alert("Character name cannot be blank")
		return
	}
	createDefaultCharacter(name);
}

// Create a new character with default stats
// Add character to current player's character list
function createDefaultCharacter(name) {
	var db = firebase.firestore();
	db.collection("characters").add({
		name: name,
		stats: {
			intelligence: 12,
			strength: 12,
			agility: 12,
			perception: 12,
			commonsense: 12,
			health: 12,
			power: 12,
			will: 12,
			comeliness: 12,
		},
		dvs: {
			cdv: 10,
			gdv: 10,
			mdv: 10,
			ldv: 10,
		},
		dp: 0,
		speed: 60,
		silver: 0,
		xp: 7500,
		events: [],
	}).then(function(docRef) {
		let charID = docRef.id;
		let playerRef = db.collection("players").doc(user.uid);
		playerRef.get().then(function(doc) {
			if (doc.exists) {
				let data = doc.data();
				console.log(data);
				characters = data.characters;
				newCharacter = {
					name: name,
					character: docRef,
				};
				characters.push(newCharacter);
				playerRef.update({
					characters: characters,
				}).then(function() {
					loadCharacterList();
				}).catch(function(error) {
					// The document probably doesn't exist.
					console.error("Error updating document: ", error);
				});
			} else {
				console.log("No such document!");
			}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		});
	}).catch(function(error) {
		console.error("Error adding document: ", error);
	});
}

// Get currently selected character from db
// Populate character sheet with information
function displayCharacter() {
	let name = document.getElementById("characters").value;
	if (name == "") {
		alert("please select a character");
		return;
	}
	let playerRef = db.collection("players").doc(user.uid);
	playerRef.get().then(function(doc) {
		if (doc.exists) {
			let charRef = null;
			let data = doc.data();
			characters = data.characters;

			for (i = 0; i < characters.length; i++) {
				let character = characters[i];
				if (character.name == name) {
					charRef = character.character;
				}
			}
			charRef.get().then(function(charDoc) {
				if (charDoc.exists) {
					let charData = charDoc.data();
					console.log(charData);
					// TODO populate character sheet
				}
			});
		}
	});
}

window.onload = init;

