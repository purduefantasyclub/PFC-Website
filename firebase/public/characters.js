var selectedCharID = "";

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

			let characterList = document.getElementById("characterList");
			clearList(characterList);

			for (i = 0; i < characters.length; i++) {
				let character = characters[i];
				addCharacterItem(character, i);
			}
		}
	}).catch(function(error) {
		console.log(error);
	});
}

// Create the necessary elements and adds it to the list of characters
function addCharacterItem(character, index) {
	let characterList = document.getElementById("characterList");
	let name = character.name;
	let charDiv = document.createElement("div");
	charDiv.className = "character";
	charDiv.id = "character" + index;
	charDiv.value = character;
	charDiv.onclick = function() {
		selectedCharID = charDiv.id;
		loadCharacterSheet(charDiv.id);
	};
	let charSpan = document.createElement("span");
	charSpan.textContent = name;
	charDiv.appendChild(charSpan);
	characterList.appendChild(charDiv);
}

function loadCharacterSheet(charID) {
	console.log("loading character sheet");
	let characterRef = document.getElementById(charID).value.character;
	characterRef.get().then(function(doc) {
		if (doc.exists) {
			let data = doc.data();
			loadStats(data.stats)
			console.log(data);
		}
	}).catch(function(error) {
		console.log(error);
	});
}

function loadStatSheet() {
	if (selectedCharID == "") {
		return;
	}
	loadCharacterSheet(selectedCharID);
}

function loadItemSheet() {
	if (selectedCharID == "") {
		return;
	}

	let characterRef = db.collection("characters").doc(selectedCharID);
	characterRef.get().then(function(doc) {
		let data = doc.data();
		let items = data.items;
		for (i = 0; i < items.length; i++) {
			let item = items[i];
			let name = item.name;
			let ref = item.item;
			// TODO Create List for Items and add it to it
		}
	}).catch(function(error) {

	});
}

function loadSkillSheet() {
	if (selectedCharID == "") {
		return;
	}

	let characterRef = db.collection("characters").doc(selectedCharID);
	characterRef.get().then(function(doc) {
		let data = doc.data();
		let skills = data.skillss;
		for (i = 0; i < skills.length; i++) {
			let skill = skills[i];
			let name = skill.name;
			let ref = skill.item;
			// TODO Create List for Skills and add it to it
		}
	}).catch(function(error) {

	});
}

function loadAbilitySheet() {
	if (selectedCharID == "") {
		return;
	}

	let characterRef = db.collection("characters").doc(selectedCharID);
	characterRef.get().then(function(doc) {
		let data = doc.data();
		let abilities = data.abilities;
		for (i = 0; i < abilites.length; i++) {
			let ability = abilities[i];
			let name = ability.name;
			let ref = ability.ability;
			// TODO Create List for Abilities and add it to it
		}
	}).catch(function(error) {

	});
}

async function loadStats(stats) {
	loadStat(stats, "STR", "strength");
	loadStat(stats, "CSE", "commonsense");
	loadStat(stats, "INT", "intelligence");
	loadStat(stats, "PER", "perception");
	loadStat(stats, "HEA", "health");
	loadStat(stats, "AGI", "agility");
	loadStat(stats, "PWR", "power");
	loadStat(stats, "WIL", "will");
	loadStat(stats, "COM", "comeliness");
}

function loadStat(stats, statID, statName) {
	let statBlock = document.getElementById("stats");
	let strItem = document.getElementById(statID);
	let strDiv = createStatDiv(statID, stats[statName]);
	strItem.innerHTML = "";
	strItem.appendChild(strDiv);
}

function createStatDiv(statID, stat) {
	let statSpan = document.createElement("span");
	statSpan.className = "stat";
	statSpan.textContent = statID + ": " + stat.toString();

	let statDiv = document.createElement("div");
	statDiv.appendChild(statSpan);
	return statDiv;
}

// Create a new character
function createNewCharacter() {
	let name = document.getElementById("newCharacterName").value;
	if (name == "") {
		alert("Character name cannot be blank")
		return
	}
	createDefaultCharacter(name)
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
			items: {},
			skills: {},
			abilities: {},
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

