define([
	'backbone',
	'helpers/html5Preloader',
	'text!templates/project.hbs'
], function(Backbone, Html5Preloader, tpl) {

	var ProjectView = Backbone.View.extend({

		events: {
			'click .add-task': 'addTask'
		},

		initialize: function() {
			this.template = Handlebars.compile(tpl);
			this.render();
		},

		returnView: function() {
			return (this.template(this.attributes));
		},

		removeProject: function(){
			debugger
			$('.' + this.attributes.name).remove();
			this.remove();
		},

		addTask: function(){
			debugger
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