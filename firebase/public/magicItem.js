function init() {
	initDB();
	watchUser(function() {

	});
}

// Adds the new magic item to the database
function addMagicItem() {
	let uid = user.uid;
	let playerRef = db.collection("players").doc(uid);
	playerRef.get().then(function(doc) {
		let data = doc.data();
		let itemNumber = data.items;
		let itemPrefix = data.gmprefix;
		let itemID = itemPrefix + " " + itemNumber;
		let newItemNumber = itemNumber + 1;
		let item = createItem(itemID);
		playerRef.update({
			items: newItemNumber,
		}).then(function() {
			db.collection("items").doc(itemID).set(item).then(function(docRef) {	
			}).catch(function(error) {
				cnsole.log(error);	
			});
		}).catch(function(error) {
			console.log(error);
		});
	}).catch(function(error) {
		// error creating doc
		console.log(error);
	});
}

function createItem(itemID) {
	let name = document.getElementById("name").value;
	let description = document.getElementById("description").value;
	let gmDescription = document.getElementById("secret").value;
	let magicType = document.getElementById("magicType").value;
	let charges = document.getElementById("charges").value;
	let rechargeRate = document.getElementById("recharge").value;
	let chargeTime = document.getElementById("chargetime").value;
	let creator = db.collection("players").doc(user.uid);
	return {
		name: name,
		description: description,
		gmdescription: gmDescription,
		creator: creator,
		magictype: magicType,
		charges: charges,
		rechargerate: rechargeRate,
		chargetime: chargeTime,
		approval: APPROVAL_PENDING,
		destroyed: false,
	}
}

window.onload = init;

