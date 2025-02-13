


if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
  };
}

function isValidUrl(url){
	return url && !url.startsWith('#') && !url.startsWith('javascript');
}

function appendWtac(url,wtac,customad){
	var urlReturn = '';
	//controllo se ho cancelletto
	urlSplitted = url.trim().split('#');
	var paramWtAc = 'wt.ac='+wtac;
	if(customad){
		paramWtAc += '&custadc='+wtac;
	}
	
	if(urlSplitted.length == 2 && urlSplitted[1].startsWith('/')){
		//se ho cancelletto seguito da slash, sono su angular, appendo a seconda se ho parametri o meno dopo il cancelletto
		urlReturn = urlSplitted[0]+'#'+urlSplitted[1]+(urlSplitted[1].indexOf('?')===-1?'?':'&')+paramWtAc;
	}
	else{
		//altrimenti non ho cancelletto o sono su una pagina non angular, appendo nella parte prima del cancelletto
		urlReturn = urlSplitted[0]+(urlSplitted[0].indexOf('?')===-1?'?':'&')+paramWtAc;
		//riappendo il cancelletto se era presente
		if(urlSplitted.length>1){
			urlReturn += '#'+urlSplitted[1];
		}
	}

	return urlReturn;
}

function parseWtacContainer(selector){
	$(selector).each(function(){
		var custom_wtad = $(this).attr('data-custadc');
		var idWtac = $(this).attr('data-wtac-container');
		if(idWtac){
			var i=0;
			$(this).find('a').each(function(){
				var origUrl = $(this).attr('href');
				if(isValidUrl(origUrl) && !$(this).attr('data-disable-wtac')){
					origUrl = appendWtac(origUrl,idWtac,i==0?custom_wtad:null);
					$(this).attr('href',origUrl);
				}
				if($(this).attr('data-dcs-multitrack')){
					var dcsMultiTrack = $(this).attr('data-dcs-multitrack');
					$(this).mousedown(function(){
						Webtrends.multiTrack({
							argsa: ["WT.ac", dcsMultiTrack],
							delayTime: 20 //delay returning to the caller by 20 milliseconds
						});
					});
				}
				i++;
			});
			if($(this).attr('data-wtad')){
				$(this).on('inview', function(event, isInView) {
					if (isInView && !$(this).attr('data-wtad-viewed')) {
						if(typeof Webtrends != 'undefined'){
							// element is now visible in the viewport
							Webtrends.multiTrack({
								argsa: ["WT.dl", "50", "WT.ad", idWtac, "DCSext.pathname", location.pathname, "DCSext.inviewad","1"]
							});
							$(this).attr('data-wtad-viewed','true');
						}
					} else {
						// element has gone out of viewport
					}
				});
			}
		}
	});
}

$(function(){
	var bannerStoriaPrimario = $('#moduloStoriaHomePrimario,#moduloStoria').find('[data-wtad]:first-child')
	if(bannerStoriaPrimario.length){
		bannerStoriaPrimario.attr('data-custadc',bannerStoriaPrimario.attr('data-wtad'));
		bannerStoriaPrimario.removeAttr('data-wtad');
	}
	
	parseWtacContainer('[data-wtac-container]');
	
	$('.navigation-collapse-container').each(function(){
		var sub1 = $('a[href="#'+$(this).attr('id')+'"]').text();
		$(this).find('a').mousedown(function(){
			var sub2 = $(this).text();
                        if (typeof Webtrends !== "undefined") {
			    Webtrends.multiTrack({
				argsa: ["DCSext.click_menu", sub1+' - '+sub2],
				delayTime: 20 //delay returning to the caller by 20 milliseconds
			    });
                        }
		});
	});
	var nomeBisogno = $('.abstract-heading h1').clone().children().remove().end().text();
	$('.configtag').each(function(){
		var prodotto = $(this).find('.panel-heading h4').text();
		$(this).find('a').mousedown(function(){
			var that = $(this);
			var optionList = '';
			$('.config-row:visible').each(function(){
				var $sel = $(this).find('select');
				if($sel.val()){
					optionList += $sel.val()+';';
				}
			})
			optionList = optionList.replace(/;+$/,'');
                        if (typeof Webtrends !== "undefined") {
			    Webtrends.multiTrack({
				argsa: ['DCS.dcsuri', location.href, 'WT.dl', 2016, 'DCSext.CFG-BISOGNI_Bisogno', nomeBisogno, 'DCSext.CFG-BISOGNO_opzioni', optionList, 'DCSext.CFG-BISOGNO_prodotto', prodotto],
				delayTime: 20 //delay returning to the caller by 20 milliseconds
			    });
                        }
		});
	});
        window["customWebtrendsAsyncInitCheck"] = true;
		if(window["webtrendsAsyncInit"]){
			window["webtrendsAsyncInit"]();
		}
});

