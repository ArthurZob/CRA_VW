define([
	'backbone',
	'views/applicationView',
	'models/applicationModel',
	'localization/Localization',
	'localization/fr'
], function(Backbone, ApplicationView, ApplicationModel, Localization, fr) {

	var Core = Backbone.Router.extend({
		currentShowId : 0,

		routes: {
		},

		initialize: function() {
			Localization.initialize([fr]);

			this.applicationView = new ApplicationView({
				model: new ApplicationModel()
			});
		}
	});
	return Core;

});