define([
	'backbone',
	'helpers/html5Preloader',
	'text!templates/application.hbs',
	'views/ProjectsListView'
], function(Backbone, Html5Preloader, tpl, ProjectsListView) {

	var ApplicationView = Backbone.View.extend({

		events: {
			'click .mail': 'toggleCC',
			'click .project-button': 'toggleProject',
			'click .validate': 'sendCra'
		},

		el: 'body',

		initialize: function() {
			var self = this;
			this.template = Handlebars.compile(tpl);
			this.render();
		},

		render: function() {
			this.$el.html(this.template());
	    	var  d = new Date();
	    	$('.title').html('CRA du ' + d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear());
			this.taskList = new ProjectsListView();
		},

		toggleCC: function(evt){
			if(evt.currentTarget.innerHTML == 'Clear'){
    			$('#withcc').val('');
    			$('.mail').removeClass('selected');
    		}else{
    			if($(evt.currentTarget).hasClass('selected')){
	    			$(evt.currentTarget).removeClass('selected');
	    			$('#withcc').val($('#withcc').val().replace(evt.currentTarget.innerHTML + ';', ''));
	    			$('#withcc').val($('#withcc').val().replace(evt.currentTarget.innerHTML, ''));
	    		}else{
	    			if($('#withcc').val() == ""){
						$('#withcc').val(evt.currentTarget.innerHTML);
		    		}else{
		    			$('#withcc').val($('#withcc').val() + ';' + evt.currentTarget.innerHTML);
		    		}
	    			$(evt.currentTarget).addClass('selected');
	    		}
    		}    	
		},

		toggleProject: function(evt){
			var cible = {
				'name': evt.currentTarget.innerHTML,
				'isSelected': $(evt.currentTarget).hasClass('selected'),
				'selector': $(evt.currentTarget)
			}
			this.taskList.toggleProject(cible);
		},

		sendCra: function(){
			var receiver = $('#sendto')[0].value;
			var reveiverCopy = $('#withcc')[0].value;
			var corps = this.taskList.toString();
		}
	});

	return ApplicationView;

});