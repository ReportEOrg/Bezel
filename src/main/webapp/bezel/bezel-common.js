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

function displayAjaxError(){
	var spanElement = document.createElement("span");
	$(spanElement).text("Failed to retrieve data from remote server");
	$('#ajaxErrorMsg').append(spanElement);
	
	var buttonElement = document.createElement("button");
	$(buttonElement).attr({type: "button",
						   class: "close"});

	$(buttonElement).html("&times;");
	
	$(buttonElement).click(function(){
		$('#ajaxErrorMsg').hide();
		$('#ajaxErrorMsg').empty();
	});
	
	$('#ajaxErrorMsg').append(buttonElement);
	
	$('#ajaxErrorMsg').show();
	
}