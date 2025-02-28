


$(document).ready(function() {
	var elms = $.find("[data-role='checkmodal']");
	for (var i = 0; i < elms.length; i++) {
	  if (isUserLoggedIn()) {
	    $(elms[i]).attr("href", $(elms[i]).attr("data-href"));
	    $(elms[i]).attr("data-toggle", "");
	    $(elms[i]).attr("data-role", "");
	    $(elms[i]).attr("data-target", "");
	    $(elms[i]).attr("data-href", "");
	  } else {
             $(elms[i]).on('click', function() {
               var url = $(this).attr("data-href");
               if (!/^(f|ht)tps?:\/\//i.test(url)) {
                 url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' +  window.location.port : '') + url;
               }
               $("#loginReferer").val(url);
             });
          }
	}

	function isUserLoggedIn() {
            if (typeof Cookies !== 'undefined') {
	        return Cookies.get('SMSESSION') ? true : false;
            }
            return false;
	}
});
