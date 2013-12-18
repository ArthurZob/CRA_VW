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
    			$('.project-button').removeClass('selected');
    		}else{
	    		if(cible.isSelected){
	    			/*this.projects = $.grep(corps.projects, function(n, i){
	    				return n.name != evt.currentTarget.innerHTML;
	    			});*/
    				this.projects.remove(this.projects.findWhere({'name': cible.name}));
	    		}else{
    				//this.projects.push({name : evt.currentTarget.innerHTML, tasks : [{name: "Tâche", timeSpent: 0, time: 0, status: "WIP"}]});
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
			var name = _model.attributes.name.split(' ')[0].toLowerCase();
			var view = new ProjectView({model : _model});
			$(this.el).prepend(view.returnView());
    		$('.project-button.' + name).addClass('selected');
		},

		onRemove: function(_model){
			var name = _model.attributes.name.split(' ')[0].toLowerCase();
			$('.project.' + _model.attributes.name).remove();
    		$('.project-button.' + name).removeClass('selected');
		},

		onReset: function(){
			this.$el.empty();
		},

		toString: function(){
			return 'toto';
		},

		saveCollection: function(){
			return this.projects.toJSON();
		},

		setCollection: function(_collection){
			for(var i = 0; i < _collection.length; i++){
				this.projects.push(_collection[i]);
			}				
		}

	});

	return ProjectsListView;

});