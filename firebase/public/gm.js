function init() {
	initDB();
	watchUser(function() {
		enforceAccess(PRIV_GM, showPage);
	});
}

function showPage() {
	removeOverlay();
}

function writeup() {
	changePage("writeup.html");
}

function magicItemCreation() {
	changePage("magicItem.html");
}

window.onload = init;

