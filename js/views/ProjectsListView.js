define([
	'backbone',
	'helpers/html5Preloader',
	'collections/ProjectsCollection',
	'models/ProjectModel',
	'views/ProjectView'
], function(Backbone, Html5Preloader, ProjectsCollection, ProjectModel, ProjectView) {

	var ProjectsListView = Backbone.View.extend({

		events: {
		},

		el: '#task-list',

		projects: null,

		initialize: function() {
			var self = this;
			this.projects = new ProjectsCollection();
			this.projects.on('add', this.onAdd, this);
			this.projects.on('remove', this.onRemove, this);
			this.projects.on('reset', this.onReset, this);
		},

		toggleProject: function(cible){
			if(cible.name == 'Clear'){
    			this.projects.reset();
    			$('.project').removeClass('selected');
    		}else{
	    		if(cible.isSelected){
	    			cible.selector.removeClass('selected');
	    			/*this.projects = $.grep(corps.projects, function(n, i){
	    				return n.name != evt.currentTarget.innerHTML;
	    			});*/
    				this.projects.remove(this.projects.findWhere({'name': cible.name}));
	    		}else{
    				//this.projects.push({name : evt.currentTarget.innerHTML, tasks : [{name: "Tâche", timeSpent: 0, time: 0, status: "WIP"}]});
	    			cible.selector.addClass('selected');
	    			var model = new ProjectModel({
	    				'name': cible.name,
	    				'tasks': [
	    							{
	    								'name': 'tache',
	    								'timeSpent': 0,
	    								'timeNeeded': 0,
	    								'status': 'WIP'
	    							}
	    						]
	    			});
	    			this.projects.add(model);
	    		}
    		}
		},

		onAdd: function(_model){
			var view = new ProjectView(_model);
			$(this.el).prepend(view.returnView());
		},

		onRemove: function(_model){
			$('.' + _model.attributes.name).remove();
		},

		onReset: function(){
			this.$el.empty();
		},

		toString: function(){
			return 'toto';
		}
	});

	return ProjectsListView;

});