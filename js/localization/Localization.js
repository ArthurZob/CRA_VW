define([
	
], function(){

	this.languages = {};
	this.strings = {};
	this.currentLanguage;

	var setCurrentLanguage = function(language) {
		currentLanguage = language;
	};

	var initialize = function(args) {
		if(args.length <= 0) throw 'No language exception...';

		for(var n = 0; n < args.length; n++)
		{
			languages[args[n].lan] = args[n].lan;
			strings[args[n].lan] = args[n].texts;
		};
		setCurrentLanguage(languages[args[0].lan]);
	};

	var getTexts = function() {
		return strings[currentLanguage];
	};

	// What we return here will be used by other modules
	return {
		initialize: initialize,
		languages: languages,
		getTexts: getTexts,
		setCurrentLanguage: setCurrentLanguage
	};
});