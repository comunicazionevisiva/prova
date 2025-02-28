


$(window).ready(
	function(){
		var compHost = window.location.host;
		if(compHost.indexOf('www')!==0){
			hostTokens = compHost.split('.');
			hostTokens[0] = 'www';
			compHost = hostTokens.join('.');
		}
		var currentSite = window.location.protocol+'//'+window.location.host;
		var compSite = window.location.protocol+'//'+compHost;
		
		var urlTagsService = compSite+'/sites/Satellite?pagename=Comp&mode=ta&ta='
		if(typeof tags_list !='undefined' && tags_list !== '[]'){
			if(compSite == currentSite){
				$.ajax({
					url: urlTagsService+tags_list,
					dataType: 'html'
				}).always(function() {
					getRecommendations()
				});
			}
			else{
				var iframe = $('<iframe></iframe>').attr('src',urlTagsService+tags_list);
				iframe.css('display','none').css('visibility','hidden');
				iframe.on('load',function(){
					getRecommendations();
					iframe.remove();
				});
				iframe.appendTo('body');
			}
		} else {
			getRecommendations()
		}		
	}
);

function handleRecommentation(config, data){
	$(config.selector).html(data);
	imageLoader();
	if(config.wtac && window.parseWtacContainer){
		parseWtacContainer(config.selector+' div[data-wtac-container]');
	}
}

function getRecommendations() {
	var urlPrefix = "/sites/Satellite?pagename=Service%2FStaticRecommendation";
	if (typeof bowser !== "undefined") {
		if ((bowser.msie && bowser.version < 10)
				|| (bowser.edge && bowser.version < 20)
				|| (bowser.firefox && bowser.version < 40)
				|| (bowser.opera && bowser.version < 33)
				|| (bowser.chrome && bowser.version < 41)
				|| (bowser.safari && bowser.version < 9)) {
			$(".content-alert-browser").show();
		}
	}
	var recommendConfig = [];
	//Home
	if(typeof moduloStoriaHomePrimario_recommendationEnabled !== 'undefined' && moduloStoriaHomePrimario_recommendationEnabled){
		if(typeof urlModuloStoriaHomePrimario !== 'undefined'){
			recommendConfig.push({
				url: urlPrefix+urlModuloStoriaHomePrimario,
				selector: '#moduloStoriaHomePrimario',
				wtac: true
			})
			
		}
	}
	//Home
	if(typeof moduloListaBisogni_recommendationEnabled !== 'undefined' && moduloListaBisogni_recommendationEnabled){
		if(typeof urlModuloListaBisogni !== 'undefined'){
			recommendConfig.push({
				url: urlPrefix+urlModuloListaBisogni,
				selector: '#moduloListaBisogni'
			});
		}
	}
	//Home
	if(typeof moduloStoriaHomeSecondario_recommendationEnabled !== 'undefined' && moduloStoriaHomeSecondario_recommendationEnabled){
		if(typeof urlModuloStoriaHomeSecondario !== 'undefined'){
			recommendConfig.push({
				url: urlPrefix+urlModuloStoriaHomeSecondario,
				selector: '#moduloStoriaHomeSecondario',
				wtac: true
			});
		}
	}
	//Home
	if(typeof moduloInEvidenza_recommendationEnabled !== 'undefined' && moduloInEvidenza_recommendationEnabled){	
		if(typeof urlModuloInEvidenza !== 'undefined'){
			recommendConfig.push({
				url: urlPrefix+urlModuloInEvidenza,
				selector: '#moduloInEvidenza',
				wtac: true
			});
		} 
	}
	//Bisogno, Gamma, Prodotto
	if(typeof moduloProdottiCorrelati_recommendationEnabled !== 'undefined' && moduloProdottiCorrelati_recommendationEnabled){	
		if(typeof urlModuloProdottiCorrelati !== 'undefined'){
			recommendConfig.push({
				url: urlPrefix+urlModuloProdottiCorrelati,
				selector: '#moduloProdottiCorrelati',
				wtac: true
			});
		} 
	}
	//Gamma, Prodotto, HomeBrand
	if(typeof moduloStoria_recommendationEnabled !== 'undefined' && moduloStoria_recommendationEnabled){	
		if(typeof urlModuloStoria !== 'undefined'){
			recommendConfig.push({
				url: urlPrefix+urlModuloStoria,
				selector: '#moduloStoria',
				wtac: true
			});
		}
	}
	//Prodotto, HomeBrand
	if(typeof moduloStoriaTripartito_recommendationEnabled !== 'undefined' && moduloStoriaTripartito_recommendationEnabled){
		if(typeof urlModuloStoriaTripartito !== 'undefined'){
			recommendConfig.push({
				url: urlPrefix+urlModuloStoriaTripartito,
				selector: '#moduloStoriaTripartito'
			});
		}
	}
	var promises = [];
	if(recommendConfig.length>0){
		for(var i=0; i<recommendConfig.length-1; i++){
			promises[i] = $.Deferred();
		}
		for(var i=1; i<recommendConfig.length; i++){
			var iRecConfig = recommendConfig[i];
			$.when(promises[i-1].promise()).then(function(){
				$.ajax({
					url: iRecConfig.url,
					dataType: 'html'
				}).then(function(data){
					handleRecommentation(iRecConfig,data);
					if(promises[i]){
						promises[i].resolve();
					}
				});
			});
		}
		$.ajax({
			url: recommendConfig[0].url,
			dataType: 'html'
		}).then(function(data){
			handleRecommentation(recommendConfig[0],data);
			if(promises[0]){
				promises[0].resolve();
			}
		});
		
		/*
		promises[0] = $.ajax({
			url: recommendConfig[0].url,
			dataType: 'html'
		});
		for(var i=1; i<recommendConfig.length; i++){
			var prevRecConfig = recommendConfig[i-1];
			var iRecConfig = recommendConfig[i];
			promises[i-1].then(function(data){
				handleRecommentation(prevRecConfig,data);
				promises[i] = $.ajax({
					url: iRecConfig.url,
					dataType: 'html'
				});
			});
		}
		promises[recommendConfig.length-1].then(function(data){
			handleRecommentation(recommendConfig[i-1],data);
		});
		*/
	}
}
