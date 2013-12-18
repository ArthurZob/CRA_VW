define([
	'backbone'
], function(Backbone) {
	
	var ProjectModel = Backbone.Model.extend({
		
		defaults: {
			'name': 'Projet',
			'tasks': []
		}
		
	});
	
	return ProjectModel;
});