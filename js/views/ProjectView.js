define([
	'backbone',
	'helpers/html5Preloader',
	'text!templates/project.hbs'
], function(Backbone, Html5Preloader, tpl) {

	var ProjectView = Backbone.View.extend({

		events: {
			'click .mail': 'toggleCC'
		},

		initialize: function() {
			var self = this;
			this.template = Handlebars.compile(tpl);
			this.render();
		},

		returnView: function() {
			return (this.template(this.attributes));
		}
	});

	return ProjectView;

});