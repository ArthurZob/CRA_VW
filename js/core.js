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
			'tab:tab': 'displayTab'
		},

		initialize: function() {
			Localization.initialize([fr]);

			this.applicationView = new ApplicationView({
				model: new ApplicationModel()
			});
		},

		/**
		 * Callback of the first route of the application
		 *		- render game page
		 */
		displayTab: function(tab) {

		}
	});
	return Core;

});