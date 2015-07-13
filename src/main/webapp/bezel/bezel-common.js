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

function getFormatDate(dateStr){
	var formattedDate = '-';
	
	var dateInt = parseInt(dateStr);
	
	if(!isNaN(dateInt)){
		var date = new Date(dateInt);
		
		formattedDate = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
	}
	
	return formattedDate;
}

/** wrapper function for "page context" variable(s) **/
var bezelParamMap = new Map();

function initBezelParamMap(){
	
	if(!bezelParamMap){
		bezelParamMap = new Map();
	}
	else{
		//Note: min. browser FF 19 Chrome 38 IE 11 Safari 7.1
		bezelParamMap.clear();
	}
}

function setBezelPageParam(key, value){
	
	if(!bezelParamMap){
		bezelParamMap = new Map();
	}
	bezelParamMap.set(key, value);
}

function getBezelPageParam(key){
	return bezelParamMap.get(key);
}