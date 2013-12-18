define([
	'backbone',
	'models/ProjectModel'
], function(Backbone, ProjectModel) {
	
	var ProjectsCollection = Backbone.Collection.extend({
		
		model: ProjectModel
		
	});
	
	return ProjectsCollection;
});