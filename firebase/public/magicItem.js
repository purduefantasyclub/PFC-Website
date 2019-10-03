function init() {
	initDB();
	watchUser(function() {

	});
}

// Adds the new magic item to the database
function addMagicItem() {
	let name = document.getElementById("name").value;
	let description = document.getElementById("description").value;
	let gmDescription = document.getElementById("secret").value;
	let creator = db.collection("players").doc(user.uid);

	db.collection("items").add({
		name: name,
		description: description,
		GMdescription: gmDescription,
		creator: creator,
	}).then(function(docRef) {	
	}).catch(function(error) {
		cnsole.log(error);	
	});
}

window.onload = init;

