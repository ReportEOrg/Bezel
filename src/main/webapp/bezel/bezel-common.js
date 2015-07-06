$(document).ready(function(){
	
	var sidebarContent = document.getElementById("sidebar-content");
	
	$(sidebarContent).empty();
	$(sidebarContent).load("../sidebar.html");
	
	var loggedUser = document.getElementById("logged-user");
	
	$(loggedUser).empty();
	$(loggedUser).load("../logged_user.html");
	
	var notificationItemGeneral = document.getElementById("notification-item-general");
	
	$(notificationItemGeneral).empty();
	$(notificationItemGeneral).load("../notification_general.html");
	
	var notificationItemInbox = document.getElementById("notification-item-inbox");
	
	$(notificationItemInbox).empty();
	$(notificationItemInbox).load("../notification_inbox.html");
});

function getRestServerUrl(){
	return "http://localhost:8080";
}