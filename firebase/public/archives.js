function init() {
	loadDB;
	watchUser(function(){
	});
}

function search() {
	let itemSearch = document.getElementById("itemSearch").value;
	console.log(itemSearch);
}

window.onload = init

