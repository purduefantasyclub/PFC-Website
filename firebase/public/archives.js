var matchingItems = [];

function init() {
	initDB();
	watchUser(function() {});
}

async function search() {
	let itemSearch = document.getElementById('itemSearch').value;
	let itemList = document.getElementById('itemList');
	if (itemSearch == "") {
		clearItems(itemList);
		return;
	}
	
	matchingItems = [];

	let matches = [];
	await searchGMID(itemSearch, matches);
	await searchItemName(itemSearch, matches);
	clearItems(itemList);
	for (i = 0; i < matches.length; i++) {
		if (document.getElementById('itemSearch').value != itemSearch) {
			return;
		}

		addItem(matches[i].id, matches[i].name);
	}
}

async function searchGMID(searchParameters, matches) {
	await db.collection('items').get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			let itemID = doc.id;
			let name = doc.data().name;
			let desc = doc.data().description;
			if (itemID.toLowerCase().includes(searchParameters.toLowerCase())) {
				let match = {
					id: itemID,
					name: name,
				};
				if (!matches.includes(match)) {
					matches.push(match);
				}
			}
		});
	});
}

async function searchItemName(searchParameters, matches) {
	await db.collection('items').get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				let itemID = doc.id;
				let name = doc.data().name;
				let desc = doc.data().description;
				if (name.toLowerCase().includes(searchParameters.toLowerCase())) {
					let match = {
						id: itemID,
						name: name,
					};
					if (!matches.includes(match)) {
						matches.push(match);
					}
				}
			});
		});
}

function addItem(itemID, name) {
	if (matchingItems.includes(itemID)) {
		return;
	}
	matchingItems.push(itemID);
	let itemDiv = document.createElement('div');
	itemDiv.className = 'item';
	itemDiv.value = itemID;

	let itemCell = document.createElement("span");
	
	let infoID = document.createElement("div");
	let idSpan = document.createElement("span");
	idSpan.textContent = itemID;
	infoID.className = "itemInfo";
	infoID.id = "id";
	infoID.appendChild(idSpan);

	let infoName = document.createElement("div");
	let nameSpan = document.createElement("span");
	nameSpan.textContent = name;
	infoName.className = "itemInfo";
	infoName.id = "name";
	infoName.appendChild(nameSpan);
	
	let itemList = document.getElementById('itemList');
	let item = document.createElement('li');
	itemDiv.appendChild(infoID);
	itemDiv.appendChild(infoName);
	item.appendChild(itemDiv);
	itemList.append(item);
}

function clearItems(list) {
	list.innerHTML = '';
}

window.onload = init;

