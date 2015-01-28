var app = {
	init:function(){
		app.listItem = Handlebars.compile($("#card-list-item-tpl").html());
		app.formItem = Handlebars.compile($("#card-form-item-tpl").html());
	},
	getCards:function(tags){
		$.ajax({
			type : "GET",
			url : server+"tags",
			crossDomain : true,
			data : {},
			//dataType : 'json',
			success : function(d){
				app.tags = d;
			},
			error : function(e) {
				alert('Something went working!');
				console.log(e);
			}
		});   
	},
	getCard:function(id){
		
	},
	setCard:function(data){
		
	}
	
	
};
