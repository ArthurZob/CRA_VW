define([
	'backbone',
	'helpers/html5Preloader',
	'text!templates/project.hbs'
], function(Backbone, Html5Preloader, tpl) {

	var ProjectView = Backbone.View.extend({

		events: {
			'click .delete-project': 'removeProject',
			'click .add-task': 'addTask',
			'blur span': 'updateModel',
			'change .task-status': 'updateModel'
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
			var id = this.model.get('tasks').length;
			this.model.get('tasks').push({
	    								'name': 'tache',
	    								'timeSpent': 0,
	    								'timeNeeded': 0,
	    								'status': 'WIP',
	    								'id': id
	    							});
		},

		updateModel: function(evt){
			var tasks = this.model.get('tasks');
			currentTask = tasks[evt.currentTarget.parentNode.getAttribute('num')]

			switch(evt.currentTarget.className){
				case 'task-name':
					currentTask.name = evt.currentTarget.innerText;
					break;
				case 'task-time-spent':
					currentTask.timeSpent = evt.currentTarget.innerText;
					break;
				case 'task-time':
					currentTask.timeNeeded = evt.currentTarget.innerText;
					break;
				case 'task-status':
					currentTask.status = evt.currentTarget.value;
					break;
			}
			
			this.model.set('tasks', tasks);
		}

	});

	return ProjectView;

});