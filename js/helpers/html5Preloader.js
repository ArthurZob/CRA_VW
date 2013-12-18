define([ 

], function(Html5Preloader){ 
	
	var events = {
		finish: 'finish'
	};
	
	var load = function(imagesTab) {
		
		var loader = html5Preloader();
		
		for(var i = 0; i < imagesTab.length; i++){
			loader.addFiles(imagesTab[i]);	
		}
		
		loader.on('finish', onFinish);
		loader.on('error', onError);
	};
	
	var onFinish = function() {
		$.publish(events.finish);
	};
	
	var onError = function(error) {
		console.error(error);
	};
	
	// What we return here will be used by other modules 
	return {
		load: load,
		events: events
	}; 
});