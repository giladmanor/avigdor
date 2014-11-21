var app = {
	// Application Constructor
	initialize : function() {
		
		app.aboutTpl = Handlebars.compile($("#about-tpl").html());
		app.creditLiTpl = Handlebars.compile($("#credit-li-tpl").html());
		
		app.LoginTpl = Handlebars.compile($("#login-tpl").html());
		app.RegOptTpl = Handlebars.compile($("#reg-opt-tpl").html());
		app.ChooseGameTpl = Handlebars.compile($("#choose-game-tpl").html());
		app.ThemeTpl = Handlebars.compile($("#theme-li-tpl").html());
		app.SettingsTpl = Handlebars.compile($("#settings-tpl").html());
		
		
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady : function() {
		app.receivedEvent('deviceready');
		
		localStorage.device_uuid = device.uuid;
		
	},
	login: function() {
		$('.view').html(app.LoginTpl());		
	},
	settings: function() {
		
		$('.view').html(app.SettingsTpl(localStorage));
				
	},
	saveSettings:function(name,color){
		localStorage.name = name;
		localStorage.color = color;
		app.regOpts();
	},
	selectedColor:function(color){
		return localStorage.color==color ? "selected" : "";
	},
	regOpts: function() {
		$('.view').html(app.RegOptTpl());		
	},
	chooseGame: function() {
		var code = app.generate_key(5);
		localStorage.game_code = code;
		$('.view').html(app.ChooseGameTpl({code:code }));	
		var games = [{name:"יחסינו לאן"}];
		$('.theme-list').html(app.ThemeTpl(games));	
	},
	useCode:function(code){
		localStorage.game_code = code;
		app.gotoPage('board.html');
	},
	// Update DOM on a Received Event
	receivedEvent : function(id) {

		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		app.login();
		
		$("#about").on("click", function() {
			console.log("binded via jquery");
			//window.location='about.html';
			$('.view').html(app.aboutTpl());
			var credits = [{role:"developer",name:"Gilad Manor"}];
			$('.credit-list').html(app.creditLiTpl(credits));
			
		});
		
		

		// navigator.geolocation.getCurrentPosition(function(position) {
			// console.log(position.coords.latitude);
			// console.log(position.coords.longitude);
		// }, function() {
			// alert('Error getting location');
		// });
// 
		// var options = {
			// quality : 50,
			// destinationType : Camera.DestinationType.DATA_URL,
			// sourceType : 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
			// encodingType : 0 // 0=JPG 1=PNG
		// };
// 
		// navigator.camera.getPicture(function(imageData) {
			// $('#little_avigdor').attr('src', "data:image/jpeg;base64," + imageData);
		// }, function() {
			// app.showAlert('Error taking picture', 'Error');
		// }, options);

		console.log('Received Event: ' + id);
		setTimeout(function() {
			//navigator.notification.alert("welcome", null, "Avigdor sais", null);
			$("#about").fadeIn("slow");
		}, 500);
		
		
	},
	gotoPage : function(page) {
		console.log("goto");
		$("body").fadeOut("fast");
		setTimeout(function() {
			window.location = page;
			$("body").fadeIn("slow");
		}, 400);
		
		
		
		return;
		
		$("body").addClass("moveout");
		setTimeout(function() {
			window.location = page;
		}, 400);
	},
	generate_key : function(len) {
		var text = "";
		var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
		for (var i = 0; i < len; i++){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}	
		return text;
	}
};
