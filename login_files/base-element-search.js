





var gsaSuggest = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: '/suggest?q=%QUERY&max=10&site=www2_posteit&client=www2_posteit&format=rich',
    wildcard: '%QUERY',
    transform: function(response){
        console.log(response);
        return response.results.map(function(obj){
            obj.name = obj.name.replace(/\*+$/,'');
            return obj;
        });
    }
  }
});

$(document).ready(function() {
	$('button.btn-cta-cerca').click(function() {
		searchbar($(this).parent().parent().find('input.input-search'));
	});
	$('input.input-search').keypress(function(ev) {
		var keycode = (ev.keyCode ? ev.keyCode : ev.which);
		if ('13' == keycode) { searchbar(this); }
	});
	$('input.input-search').attr("placeholder","Cerca uffici postali, prodotti, servizi e spedizioni")
       $('input.input-search').typeahead({
                hint: false, //suggerisci caratteri mancanti
                highlight: true, //evidenza i caratteri digitati 
                minLength: 3, //avvia la ricerca dopo x caratteri digitati
            }, {
                name: 'mydataset',
                source: gsaSuggest,
                display: 'name'
       });
       $('input.input-search').bind('typeahead:select', function(ev, suggestion) {
           searchbar($(this));
       });
      if($('.form-control.input-search').length > 1){
			$('.form-control.input-search').eq(0).focus();
			var intFocus = setInterval(function(){
				if(!$('.pageLoader:visible').length){
					$('.form-control.input-search').eq(0).focus();
					clearInterval(intFocus);
				}
			},500);
		}
	function searchbar (element) {
		var input = $(element).val();
		if (input) {
			if (input.match(/^[a-zA-Z0-9]{7}[0-9]{4}[a-zA-Z0-9]{0,2}[0-9]?$|^(?=.*[0-9])[abcdzyxwABCDZYXW][a-zA-Z][a-zA-Z0-9]{5}$/)){
   				var loc = "https://www.poste.it/cerca/index.html#/risultati-spedizioni/"+encodeURIComponent(input.replace("/", "%2F"));

	                }
			else {
   				var loc = "https://www.poste.it/cerca/index.html#/cerca/"+encodeURIComponent(input.replace("/", "%2F"));
	                }
		        if(typeof Webtrends !== 'undefined' && typeof Webtrends.multiTrack !== 'undefined'){
				Webtrends.multiTrack({
        				argsa: ["DCSext.ricerca_da_hp", 1, "WT.dl", 2016]
	        		});
	        		setTimeout(function() {
					window.location.href = loc;
				}, 200);
			}
			else{
				window.location.href = loc;
			}
		}
		return false;
	}
	
	
});
