function buildMenu(menuId){
	
	var groupId = getRequestParam('group');
	var target = getRequestParam('target');

	//read from menu.json
	$.getJSON("../../menu/menu.json", function(data){

		if(data && data.menuItems){
			if($.isArray(data.menuItems)){
				
				var bezelMainMenu = document.getElementById("main-menu");
				
				//clear main menu
				$(bezelMainMenu).empty();
				
				//for each of the menu item
				jQuery.each(data.menuItems, function(index, item) {
					//create menuItem element and append to parent
					$(bezelMainMenu).append(createMainMenuItem(item,groupId));
				});
				
				$li = $('.main-menu #'+menuId).parent('li');
				
				if(!$li.hasClass('active')){
					$li.addClass('active');
				}
				
				if(target){
					
					var targetUrl = getTargetUrl(target, data.menuItems);
					
					if(targetUrl){
						loadContent(targetUrl);
					}
				}
			}
		}
	});
}

function createMainMenuItem(item, groupId) {
	//create listItem to hold menu item
	var listItem = document.createElement("li");
	
	var sameGroup = false;
	
	if(item.group && item.group == groupId){
		sameGroup = true;
	}
	
	//create anchor element 
	var anchor = createAnchor(item, sameGroup);

	$(listItem).append(anchor);
	
	//if item has submenu item(s)
	if(item.subMenuItems && $.isArray(item.subMenuItems)) {
		//create sub menu item elements and append under menu item
		$(listItem).append(createSubMenuItems(item.subMenuItems, sameGroup));
		
		//update anchor attribute to handle sub menu
		$(anchor).attr("class", "js-sub-menu-toggle");
		$(anchor).append(createDownIcon());
		
		//register click listener to the anchor element to handle submenu list
		$(anchor).click( function(e){

			e.preventDefault();

			$li = $(this).parent('li');
			if( !$li.hasClass('active')){
				$li.find(' > a .toggle-icon').removeClass('fa-angle-left').addClass('fa-angle-down');
				$li.addClass('active');
			}
			else {
				$li.find(' > a .toggle-icon').removeClass('fa-angle-down').addClass('fa-angle-left');
				$li.removeClass('active');
			} 

			$li.find(' > .sub-menu').slideToggle(300);
		});
	}

	return listItem;
}

function createAnchor(item, sameGroup) {
	var anchor = document.createElement("a");

	if (item.id) {
		$(anchor).attr('id',item.id);
	}
	
	var targetHref = '#';

	if (item.href) {
		
		if(sameGroup){
			targetHref=createJavascriptLoadContent(item.pageContent);
		}
		else{
			targetHref = item.href;
		}
	}

	$(anchor).attr('href', targetHref);

	if (item.iconClass) {
		$(anchor).append(createIconElement(item.iconClass));
	}

	$(anchor).append(createMenuLabel(item.name));

	return anchor;
}

function createMenuLabel(name) {

	var menuLabel = document.createElement("span");

	if (name) {
		$(menuLabel).text(name);
	}

	$(menuLabel).attr("class", "text");
	$(menuLabel).attr("style", "opacity: 0;");

	return menuLabel;
}

function createIconElement(iconClass) {
	var iconElement = document.createElement("i");

	$(iconElement).attr("class", iconClass);

	return iconElement;
}

function createDownIcon(){
	return createIconElement('toggle-icon fa fa-angle-down');
}


function createSubMenuItems(subMenuItems, sameGroup){
	var submenu =document.createElement("ul");
	
	$(submenu).attr("class", "sub-menu");
	$(submenu).attr("style","display: none; overflow: hidden;");
	
	jQuery.each(subMenuItems, function(index, item){
		$(submenu).append(createSubMenuItemElement(item, sameGroup));
	});
	
	return submenu;
}

function createSubMenuItemElement(item, sameGroup){
	var listItemElement = document.createElement("li");
	
	var anchorElement = document.createElement("a");
	$(listItemElement).append(anchorElement);
	
	var targetHref = '#';
	
	if(item.href){
		
		if(sameGroup){
			targetHref = createJavascriptLoadContent(item.pageContent);
		}
		else{
			targetHref = item.href;
		}
	}
	
	$(anchorElement).attr("href",targetHref);	
		
	
	var spanElement = document.createElement("span");
	$(anchorElement).append(spanElement);
	
	$(spanElement).attr("class","text");
	$(spanElement).text(item.name);
	
	return listItemElement;
}

function getRequestParam(paramName){
	var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    if(vars[paramName]){
    	return vars[paramName];
    }
    else{
    	return '';
    }
}

function getTargetUrl(target, items){
	
	var targetUrl = undefined;
	
	jQuery.each(items, function(index, item) {
		if(item.id && item.id == target){
			targetUrl = item.pageContent;
			//break
			return(false);
		}
		
		//if item has submenu item(s)
		if(item.subMenuItems && $.isArray(item.subMenuItems)) {
			
			jQuery.each(item.subMenuItems, function(sIndex, subItem){
				if(subItem.id && subItem.id == target){
					targetUrl = subItem.pageContent;
					//break
					return(false);
				}
			});
		}

	});
	
	return targetUrl;
}

function createJavascriptLoadContent(pageContent){
	return "javascript:loadContent('"+pageContent+"')";
}

function loadContent(pageContent){
	var contentIncludeDiv = document.getElementById("content-include-div");
	
	$(contentIncludeDiv).empty();
	
	$(contentIncludeDiv).load(pageContent);
}