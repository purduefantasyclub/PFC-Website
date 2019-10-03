function init() {
	initDB();
	watchUser(function() {
	});
}

function writeup() {
	changePage("writeup.html");
}

function magicItemCreation() {
	changePage("magicItem.html");
}

window.onload = init;

