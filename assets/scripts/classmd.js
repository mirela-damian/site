var $cm = {
	header: new header(),

	init: function(){
		$cm.header.init();
	}
};


/******************
	Javascript associated with the Header
******************/
function header()
{
	/*
	*	Initialize the header, clicks, active classes, etc.
	*/
	this.init = function(){
		$cm.header.initNavigation();
		$cm.header.setActiveItem();
	};

	/*
	*	Initialize clicks on the navigation items
	*/
	this.initNavigation = function(){

		$("#classhome-link").bind("click", function(){
			window.location = "/~mdamian/classes/"+ $class +"/index.html";
		});
		$("#syllabus-link").bind("click", function(){
			window.location = "/~mdamian/classes/"+ $class+ "/Syllabus.html";
		});

		$("#schedule-link").bind("click", function(){
			window.location = "/~mdamian/classes/"+ $class +"/Schedule.html";
		});

		$("#assignments-link").bind("click", function(){
			window.location = "/~mdamian/classes/"+ $class+ "/Assignments.html";
		});

		$("#labs-link").bind("click", function(){
			window.location = "/~mdamian/classes/"+ $class+ "/Labs.html";
		});

		$("#forum-link").bind("click", function(){
			window.location = $forumlink;
		});

		$("#contact-link").bind("click", function(){
			var tagPosition = $('#contactMe').offset();
			$('html, body').animate({scrollTop: tagPosition.top}, "slow");
		});

		$cm.header.initHamburger();
	}; 

	/*
	*	The hamburger is only visible on smaller devices, 
	*	it allows one to click the icon to expand or collapse
	*	the mobile navigation
	*/
	this.initHamburger = function(){
		$('#hamburger').click(function(){
			$(this).toggleClass('open');

			var nav = $("nav ul");

			if(nav.is(":visible")){
				nav.slideUp(400, function(){
					//This is already display:none by css, if we allow the slideUp function
					//to add the inline style (which it does by default) then if the user 
					//expands the window (e.g. "responsive") then the proper CSS will be overridden.
					//So, we remove the unecessary declaration once the animation finishes.
					nav.removeAttr("style");
				});
			}else{
				nav.slideDown();
			}
		});
	};

	/*
	*	Add the appropriate class to the active navigation item
	*/
	this.setActiveItem = function(){
		var pathname = window.location.pathname;
	
		if(pathname.indexOf("Syllabus.htm") >= 0){
			$("#syllabus-link").addClass("active");
		}else if(pathname.indexOf("Schedule.htm") >= 0){
			$("#schedule-link").addClass("active");
		}else if(pathname.indexOf("Assignments.htm") >= 0){
			$("#assignments-link").addClass("active");
		}else if(pathname.indexOf("piazza.com") >= 0){
			$("#forum-link").addClass("active");
		}else {
			$("#classhome-link").addClass("active");
		}
	}
};

//Instead of using jQuery "ready", this event is fired after 
//whole content is loaded, images,css etc.
$(window).on('load', function() { 
//	damian.init();
	$cm.init();
});