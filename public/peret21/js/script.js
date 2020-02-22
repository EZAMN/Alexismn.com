function controller() 
{ 
    this.menuTopValue = 0;
    this.menuHeight = 20
    
    this.setSmoothAnchor();
    this.setAnchorMemory();
    this.enforceAnchor();
    this.setPhoneNav();
    this.setStickyNav();
    this.applyFullBG();
    this.reverseContact();
    this.setGoogleAnalytics();
    this.setInspectlet();
}

controller.prototype = {
	
	setSmoothAnchor : function () 
	{ 
		$('a[href*=#]').on('click', function(e)
		{
			e.preventDefault();
			
			if( $( $.attr(this, 'href') ).length > 0 )
			{
				$('html, body').animate(
				{
					scrollTop: $( $.attr(this, 'href') ).offset().top
				}, 400);
			}
			return false;
		});
	},
	
	setAnchorMemory : function ()
	{
		$('#navbar-example').on('activate.bs.scrollspy', function() 
		{
			window.location.hash = $('.nav .active a').attr('href').replace('#', '#/');
		});
	},
	
	setPhoneNav : function ()
	{ 
		$('.navbar li a').click(function(event) 
		{
			$('.navbar-collapse').removeClass('in').addClass('collapse');
		});
	},
	
	setMenuTopValue :function ()
	{
		if($(window).width() < 786) this.menuHeight = 80;
		this.menuTopValue = $('.scroll-down').offset().top + this.menuHeight;
		this.stickyNav();
	},
	
	setStickyNav : function ()
	{
		this.setMenuTopValue();

		$(window).on('resize', function() 
		{  
			this.setMenuTopValue();
		}.bind(this)); 

		$(window).on('scroll', function() 
		{  
			this.stickyNav();  
		}.bind(this));  
	},
	
	stickyNav : function()
	{
		if($(window).scrollTop() > this.menuTopValue) 
		{   
			if(!$('.navbar').hasClass('fixed')) 
				$('.navbar').addClass('fixed');  
		} 
		else
		{  
			if($('.navbar').hasClass('fixed')) 
				$('.navbar').removeClass('fixed');   
		}  
	},
	
	applyFullBG : function()
	{
		$('.fullBG').each(function(){
			div = $('<div/>', {
				'class':'fullBackground',
				'style':'background-color:'+$(this).css('backgroundColor')+';'
			}).insertAfter($(this));
			$(this).removeClass('fullBG').detach().appendTo(div);
		});
	},
	
	reverseContact : function()
	{
		
		$('a[href*=mailto]').each(function()
		{
			var lstrEmail = $(this).attr('href').replace('mailto:', '');
			
			lstrEmail = lstrEmail.split('').reverse().join('')
			
			$(this).attr('href', 'mailto:' + lstrEmail);
		});
		
		$('.icon-phone').each(function()
		{
			$(this).text($(this).text().split('').reverse().join('')); 
		});
		
		/*phones = document.getElementsByClassName('icon-phone');
		for ( i = 0; i < phones.length; i++){
			phones[i].firstChild.textContent = phones[i].firstChild.textContent.split('').reverse().join('');
		}*/
	},
	
	enforceAnchor : function()
	{
		lstrHash = window.location.hash.replace('#/', '#');
	
		if($('a[href='+ lstrHash +']').length > 0)
			$('a[href='+ lstrHash +']').trigger('click');
	},
	
	setGoogleAnalytics : function()
	{
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', '']);
		_gaq.push(['_trackPageview']);
	
		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	},
	
	setInspectlet : function()
	{
		window.__insp = window.__insp || [];
		__insp.push(['wid', 1802498458]);
		(function() 
		{
			function ldinsp()
			{
				if(typeof window.__inspld != "undefined") return; 
				window.__inspld = 1; 
				var insp = document.createElement('script'); 
				insp.type = 'text/javascript'; 
				insp.async = true; 
				insp.id = "inspsync"; 
				insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js'; 
				var x = document.getElementsByTagName('script')[0]; 
				x.parentNode.insertBefore(insp, x); 
			};
			setTimeout(ldinsp, 500); 
			document.readyState != "complete" ? (window.attachEvent ? window.attachEvent('onload', ldinsp) : window.addEventListener('load', ldinsp, false)) : ldinsp();
		})();
	}
};

function oldBrowserDetector() 
{ 
    this.Browser = this.getBrowser();
    
    this.checkBrowser();
}

oldBrowserDetector.prototype = {
	
	checkBrowser : function()
	{
		if(this.Browser.browser == 'Explorer' && this.Browser.version < 8)
		{ 
			this.buildModalView();
			this.activateModal();
		}
	},
	
	getBrowser : function()
	{
		var browserData = [{
			string: 		navigator.userAgent,
			subString: 		'MSIE',
			identity: 		'Explorer',
			versionSearch: 	'MSIE'
		}];
		
		return {
			browser: this.searchString(browserData) || 'Modern Browser',
			version: this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || '0.0'
		};
	},
	
	searchString : function(paData)
	{
		for(var i = 0; i < paData.length; i++)	
		{
			var lstrDataString 	= paData[i].string;
			var lstrDataProp 	= paData[i].prop;
			
			this.versionSearchString = paData[i].versionSearch || paData[i].identity;
			
			if(lstrDataString) 
			{
				if(lstrDataString.indexOf(paData[i].subString) != -1)
				{
					return paData[i].identity;
				}
			}
			else if(lstrDataProp)
			{
				return paData[i].identity;
			}
		}
	},
	
	searchVersion : function(pstrDataString)
	{
		var lnIndex = pstrDataString.indexOf(this.versionSearchString);
	
		if(lnIndex == -1) 
		{
			return;
		}
		
		return parseFloat(pstrDataString.substring(lnIndex + this.versionSearchString.length + 1));
	},
	
	buildModalView : function()
	{
		article = $('<article/>', {
			'id':'upgrade-browser',
			'class':'modal fade',
			'tabindex':'-1',
			'role':'dialog',
			'aria-hidden':'true'
		});
		
		section = $('<section/>', {
			'class':'modal-dialog modal-content'
		}).appendTo(article);
		
		header = $('<header/>', {
			'class':'modal-header'
		}).appendTo(section);
		
		h4 = $('<h4/>', {
			'class':'modal-title',
			'text':'Your browser is out of date'
		}).appendTo(header);
		
		p = $('<p/>', {
			'class':'modal-body',
			'text':'To get the best possible experience using our site we recommend that you upgrade to a modern web browser. To download a newer web browser click on the Upgrade button.'
		}).appendTo(section);
		
		footer = $('<footer/>', {
			'class':'modal-footer'
		}).appendTo(section);
		
		a = $('<a/>', {
			'class':'btn btn-primary',
			'href':'http://browsehappy.com/',
			'target':'_blank',
			'text':'Upgrade'
		}).appendTo(footer);
		
		article.appendTo('body')
	},
	
	activateModal : function()
	{
		$('#upgrade-browser').modal({
			backdrop: 'static',
			keyboard: false
		});
	}
}

$(document).ready(function()
{	
	controller = new controller();
	oldBrowserDetector = new oldBrowserDetector();
});
