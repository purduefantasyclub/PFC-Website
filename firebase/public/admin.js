function init() {
	initDB();
	watchUser(function() {
		enforceAccess(PRIV_ADMIN, showPage);
		loadPlayers();
	});
}

function showPage() {
	removeOverlay();
	loadPlayers();
}

// Loads all players from database into selection
function loadPlayers() {
	
}

// Elevate user privilege to GM
// Assgn user specified GM prefix
function makeGM() {

}

// Demote user privilege to normal plauyer
//
function revokeGM() {

}

window.onload = init;

