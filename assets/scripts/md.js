var $m = {
	header: new header(),

	init: function(){
		$m.header.init();
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
		$m.header.initNavigation();
		$m.header.setActiveItem();
		$m.header.initSearch();
	};

	/*
	*	Initialize clicks on the navigation items
	*/
	this.initNavigation = function(){
		$("#home-link").bind("click", function(){
			window.location = "/site/";
		});
		$("#teaching-link").bind("click", function(){
			window.location = "/site/classes";
		});

		$("#research-link").bind("click", function(){
			window.location = "/site/research";
		});

		$("#publications-link").bind("click", function(){
			window.location = "/site/publications";
		});

		$("#contact-link").bind("click", function(){
			var tagPosition = $('#contactMe').offset();
			$('html, body').animate({scrollTop: tagPosition.top}, "slow");
		});

		$m.header.initHamburger();
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
	
		if(pathname.indexOf("/site/classes/") == 0){
			$("#teaching-link").addClass("active");
		}else if(pathname.indexOf("/site/research/") == 0){
			$("#research-link").addClass("active");
		}else if(pathname.indexOf("/site/publications/") == 0){
			$("#publications-link").addClass("active");
		}else if( pathname == "/site/" || pathname == "/site/index.html"){
			$("#home-link").addClass("active");
		}
	}

	/*
	*	Initialize the search functionality
	*/
	this.initSearch = function(){
   		//Init Google variables, etc
   		var cx = '002369428488218431963:zqnrgggtags';
	    var gcse = document.createElement('script');
	    gcse.type = 'text/javascript';
	    gcse.async = true;
	    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
	    var s = document.getElementsByTagName('script')[0];
	    s.parentNode.insertBefore(gcse, s);

	    //Attach events to the form for submission
		$("#cse-search-box-form-id").submit(function(event){
			event.preventDefault();

			var searchTerm = $("#cse-search-input-box-id").val();
			
			if(searchTerm.length == 0){ //Form is not valid
				$("#cse-search-input-box-id").addClass("required");
			}else{
				$("#cse-search-input-box-id").removeClass("required");

				if(window.location.pathname != "search.html"){
					var urlWithQuery = "/site/search.html?q=" + searchTerm;

					window.location = urlWithQuery;
				}else{
					$m.header.executeSearch();
				} 
			}
		});

		$("#search").click(function(){
			$("#cse-search-box-form-id").trigger("submit");
		});
	}

	/*
	*	Perform a search. 
	*
	*	This is completed asynchronously only if one is already on the
	*	search page. In other words, if you are on search.html, this function
	*	is used to load the search without refreshing the page etc.
	*
	*	If one is not on the search page (see initSearch), then the search
	*	page is loaded with an attached query parameter, searching on load.
	*/
	this.executeSearch = function(){
		var input = document.getElementById('cse-search-input-box-id');
	    var element = google.search.cse.element.getElement('searchresults-only0');
	    if (input.value == '') {
	      element.clearAllResults();
	    } else {
	      element.execute(input.value);
	    }
    
    	return false;
	}
};

//Instead of using jQuery "ready", this event is fired after 
//whole content is loaded, images,css etc.
$(window).on('load', function() { 
//	damian.init();
	$m.init();
});