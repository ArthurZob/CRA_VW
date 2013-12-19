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
			'click .validate': 'sendCra',
			'click .save': 'save'
		},

		el: 'body',

		initialize: function() {
			var self = this;
			this.template = Handlebars.compile(tpl);
			this.render();
			this.wireUpEvents();
			this.load();
		},

		render: function() {
			this.$el.html(this.template());
	    	var  d = new Date();
	    	$('.title').html('CRA du ' + d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear());
			this.projectsList = new ProjectsListView();
		},

		// Todo : Create Destinataire View et mettre ca dedans avec la vue et tout.
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

		// TODO Move to ProjectsListView.js
		toggleProject: function(evt){
			var cible = {
				'name': evt.currentTarget.innerHTML,
				'isSelected': $(evt.currentTarget).hasClass('selected'),
				'selector': $(evt.currentTarget)
			}
			this.projectsList.toggleProject(cible);
		},

		wireUpEvents : function() {			
			window.onbeforeunload = this.save;
		},

		save: function(){
			localStorage['projects'] = JSON.stringify(this.projectsList.saveCollection());
			localStorage['cc'] = $('#withcc').val();
		},

		load: function(){
			if(localStorage['projects'] != undefined){
				this.projectsList.setCollection(JSON.parse(localStorage['projects']));	
			}
			if(localStorage['cc'] != undefined){
				$('#withcc').val(localStorage['cc']);
			}
		},

		sendCra: function(){
			var receiver = $('#sendto')[0].value;
			var reveiverCopy = $('#withcc')[0].value;
			var subject = $('.title')[0].innerText;
			var corps = this.projectsList.toString();

			if(reveiverCopy != ""){
				reveiverCopy = "cc=" + reveiverCopy + "&";
			}

			window.location.href = 'mailto: ' + receiver + "?" + reveiverCopy + 'subject=' + subject + '&body=' + corps;	

		}
	});

	return ApplicationView;

});