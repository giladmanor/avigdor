var app = {
	currentCard : "nothing",
	initialize : function() {

		document.addEventListener('deviceready', this.onDeviceReady, false);
		setTimeout(function() {
			if (!app.initOK) {
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");
				app.onDeviceReady();
				console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
			}
		}, 700);
	},
	onDeviceReady : function() {
		app.initOK = true;
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
		console.log(!localStorage.getItem("user"));
		if (!localStorage.getItem("user_ok")) {
			//init screens
			app.initUser();
		} else {
			//start screen
			app.start();

		}

	},
	start : function() {
		$(".face").removeClass("shake");
		$(".startButtons").fadeIn("fast");
		$(".startButtons").animate({
			"padding" : "17%"
		}, 400, function() {
			$(".startButtons").animate({
				"padding" : "12%"
			}, 800);
		});
	},
	join:function(){
		app.faceOut();
		app.formIn("joinForm");
	},
	setPin:function(pin){
		localStorage.game_code = pin;
		app.formOut("joinForm");
		app.gotoPage('board.html');
	},
	gotoPage : function(page) {
		console.log("goto");
		setTimeout(function() {
			window.location = page;
			$("body").fadeIn("slow");
		}, 800);
	},
	initUser : function() {
		app.faceOut();
		app.formIn("nameForm");
	},
	setUserName : function(frm) {
		var postData = $(frm).serializeArray();
		console.log(postData[0].value);
		localStorage.user = {
			name : postData[0].value
		};
		app.formOut("nameForm");
		app.formIn("sexForm");
	},
	setUserSex : function(sex) {
		localStorage.user.sex = sex;
		app.formOut("sexForm");
		app.formIn("likesForm");
	},
	setUserLikes : function(likes) {
		localStorage.user.likes = likes;
		localStorage.user_ok = true;
		app.formOut("likesForm");
		app.faceIn();
		app.start();
	},
	formIn : function(name) {
		$("." + name).show();
		$("." + name).css("top", -1000);

		$("." + name).animate({
			"top" : "50%"
		}, 1200, function() {
			$("." + name).animate({
				"top" : "20%"
			}, 500);
		});
	},
	formOut : function(name) {
		$("." + name).animate({
			"top" : "-10"
		}, 200, function() {
			$("." + name).animate({
				"top" : "500"
			}, 500, function() {
				$("." + name).remove();
			});
		});
	},
	faceOut : function() {
		$(".face").animate({
			"top" : "-10"
		}, 200, function() {
			$(".face").animate({
				"top" : "500"
			}, 500, function() {
				$(".face").hide();
			});
		});

	},
	faceIn : function() {
		$(".face").show();
		$(".face").css("top", -1000);

		$(".face").animate({
			"top" : "50%"
		}, 1200, function() {
			$(".face").animate({
				"bottom" : "20%"
			}, 500);
		});
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
