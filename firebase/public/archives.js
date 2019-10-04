var matchingItems = [];

function init() {
	initDB();
	watchUser(function() {});
}

async function search() {
	let itemList = document.getElementById('itemList');
	matchingItems = [];

	let itemSearch = document.getElementById('itemSearch').value;
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
	let itemInfo = document.createElement('div');
	itemInfo.id = 'item';
	itemInfo.value = itemID;

	let nameNode = document.createTextNode(name);
	itemInfo.appendChild(nameNode);

	let itemList = document.getElementById('itemList');
	let item = document.createElement('li');
	item.appendChild(itemInfo);
	itemList.append(item);
	console.log('adding item');
}

function clearItems(list) {
	list.innerHTML = '';
}

window.onload = init;
