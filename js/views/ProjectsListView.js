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
			this.projects.on('change', this.onChange, this);
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
	    								'status': 'WIP',
	    								'id' : '0' 
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

		onChange: function(_model){
			
		},

		onReset: function(){
			this.$el.empty();
		},

		toString: function(){
			var corps = "";

			for(var i = 0; i < this.projects.length; i++){
				var proj = this.projects.models[i];
				corps += proj.get('name') + "%20:%0D%0A"
				for(var j = 0; j < proj.get('tasks').length; j++){
					var task = proj.get('tasks')[j];
					corps += '-%20' + task.name + "%20(" + task.timeSpent + 'h/' + task.timeNeeded + ')%20[' + task.status + ']%0D%0A';
				}
				corps += "%0D%0A";
			}
			return corps;
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