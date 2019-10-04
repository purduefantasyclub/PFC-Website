function init() {
	initDB()
	watchUser(function(){
		removeOverlay();	
	});
}

function characters() {
	changePage("characters.html");
}

function gm() {
	verifyPrivilege(3, function() {
		changePage("gm.html");
	});
}

function admin() {
	verifyPrivilege(4, function() {
		changePage("admin.html");
	});
}

function magicItems() {
	changePage("archives.html");
}

window.onload = init

