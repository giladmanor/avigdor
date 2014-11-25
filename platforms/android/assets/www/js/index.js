var app = {
	currentCard : "nothing",
	initialize : function() {
		app.ThemeTpl = Handlebars.compile($("#theme-li-tpl").html());
		app.newGameTpl = Handlebars.compile($("#new-game-tpl").html());
		app.SettingsTpl = Handlebars.compile($("#settings-tpl").html());
		app.JoinTpl = Handlebars.compile($("#join-tpl").html());

		this.bindEvents();
	},
	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	onDeviceReady : function() {
		app.splashOut();
		app.join();
		localStorage.device_uuid = device.uuid;
		app.showFooterMenu();
	},
	splashOut : function() {
		$(".splash").animate({
			"left" : "-20"
		}, 200, function() {
			$(".splash").animate({
				"left" : "500"
			}, 500, function() {
				$(".splash").remove();
			});
		});

	},
	showClicked : function(obj) {
		$(obj).animate({
			"margin-top" : "-45px"
		}, 200, function() {
			$(obj).animate({
				"margin-top" : "-25px"
			}, 400);
		});
	},
	setView : function(card, template) {
		if (app.currentCard != card) {
			$('.app').append(template);

			$('.' + card).animate({
				"top" : "1%"
			}, 700, function() {
				console.log("remove " + app.currentCard);
				$('.' + app.currentCard).remove();
				app.currentCard = card;
				console.log("now viewing " + app.currentCard);
			});
		}
	},
	join : function() {
		app.setView("join", app.JoinTpl());

	},
	showFooterMenu : function() {
		$('.footer').children('button').each(function(i) {
			//$(this).css("margin-top","70px");
			$(this).delay(i * 200).animate({
				"margin-top" : "-35px"
			}, 400, function() {
				$(this).animate({
					"margin-top" : "-25px"
				}, 400);
			});
		});
	},
	settings : function() {
		app.setView("settings", app.SettingsTpl(localStorage));
	},
	saveSettings : function(name) {
		localStorage.name = name;
		
	},
	getGameThemes:function(){
		
	},
	newGame:function(){
		var code = app.generate_key(5);
		localStorage.game_code = code;
		var games = [{name : "יחסינו לאן"},{name : "kissing game"},{name : "fun with friends"}];
		app.setView("new-game", app.newGameTpl({code : code}));
		$('.theme-list').html(app.ThemeTpl(games));
	},
	selectedColor : function(color) {
		return localStorage.color == color ? "selected" : "";
	},
	regOpts : function() {
		$('.view').html(app.RegOptTpl());
	},
	chooseGame : function() {
		var code = app.generate_key(5);
		localStorage.game_code = code;
		$('.view').html(app.ChooseGameTpl({
			code : code
		}));
		var games = [{
			name : "יחסינו לאן"
		}];
		$('.theme-list').html(app.ThemeTpl(games));
	},
	useCode : function(code) {
		localStorage.game_code = code;
		app.gotoPage('board.html');
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
		for (var i = 0; i < len; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
};
