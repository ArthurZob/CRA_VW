define([
	'backbone',
	'helpers/html5Preloader',
	'text!templates/project.hbs'
], function(Backbone, Html5Preloader, tpl) {

	var ProjectView = Backbone.View.extend({

		events: {
			'click .delete-project': 'removeProject',
			'click .add-task': 'addTask'
		},

		initialize: function() {
			this.template = Handlebars.compile(tpl);
			this.render();
		},

		returnView: function() {
			$(this.el).html(this.template(this.model.toJSON()));
			return this.$el;
		},

		removeProject: function(){
			this.model.destroy();
		},

		addTask: function(){
			this.attributes.tasks.add({
	    								'name': 'tache',
	    								'timeSpent': 0,
	    								'timeNeeded': 0,
	    								'status': 'WIP'
	    							});
		}
	});

	return ProjectView;

});