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
		setTimeout(function() {
			if (!app.initOK) {
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");
				app.onDeviceReady();
				console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
			}
		}, 7000);
	},
	onDeviceReady : function() {
		app.initOK = true;
		app.splashOut();
		app.getTags();
		if (!localStorage.device_uuid) {
			try {
				localStorage.device_uuid = device.uuid;
			} catch(e) {
				console.error(e);
				localStorage.device_uuid = app.generate_key(20);
			}
		}
		localStorage.selected_tags = [];
		console.log(localStorage.device_uuid);
		app.showFooterMenu();
		setTimeout(function() {
			app.join();
		}, 500);

	},
	splashOut : function() {
		$(".splash").animate({
			"top" : "-10"
		}, 200, function() {
			$(".splash").animate({
				"top" : "500"
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
			$('.' + app.currentCard).fadeOut();
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
	tags:[],
	getTags : function() {
		$.ajax({
			type : "GET",
			url : "http://104.131.100.96:4000/tags",
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
	selected_tags:[],
	setTag:function(tag){
		console.log("set tag "+tag);
		
		if(app.selected_tags.indexOf(tag)>-1){
			app.selected_tags.splice(app.selected_tags.indexOf(tag),1);
		}else{
			app.selected_tags.push(tag);
		}
		localStorage.selected_tags = app.selected_tags;
		console.log("o>"+ localStorage.selected_tags);
	},
	newGame : function() {
		var code = app.generate_key(5);
		localStorage.game_code = code;
		var games = app.tags;
		app.setView("new-game", app.newGameTpl({
			code : code
		}));
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
