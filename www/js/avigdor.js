var app = {
	currentCard : "nothing",
	initialize : function() {

		document.addEventListener('deviceready', this.onDeviceReady, false);
		//localStorage.user_ok = "";
		
		
		setTimeout(function() {
			if (!app.initOK) {
				console.log(server);
				app.getTags();
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
			console.log(localStorage.user_name);
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
	join:function(pin){
		app.formOut("newGameForm");
		if(pin){
			$("#pinInput").val(pin);
		}
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
		$("#nameField").focus();
		
	},
	setUserName : function(frm) {
		var postData = $(frm).serializeArray();
		console.log(postData[0].value);
		
		localStorage.user_name= postData[0].value;
		
		console.log(localStorage.user_name);
		app.formOut("nameForm");
		app.formIn("sexForm");
	},
	setUserSex : function(sex) {
		localStorage.user_sex = sex;
		console.log(localStorage.user_sex);
		app.formOut("sexForm");
		app.formIn("likesForm");
	},
	setUserLikes : function(likes) {
		localStorage.user_likes = likes;
		localStorage.user_ok = true;
		app.formOut("likesForm");
		app.faceIn();
		app.start();
	},
	openTagSelector:function(){
		app.faceOut();
		app.formIn("newGameForm");
		app.populateUL(app.tags);
		
	},
	populateUL:function(list){
		list.forEach(function(item){
			$("ul.selector").append("<li onclick='app.setTag(this)'>"+item.name+"</li>");
		});
	},
	selected_tags:[],
	setTag:function(that){
		var tag = $(that).html();
		$(that).toggleClass("yoyo");
		$(that).toggleClass("green");
		console.log("set tag "+tag);
		
		if(app.selected_tags.indexOf(tag)>-1){
			app.selected_tags.splice(app.selected_tags.indexOf(tag),1);
		}else{
			app.selected_tags.push(tag);
		}
		localStorage.selected_tags = app.selected_tags;
		console.log("o>"+ localStorage.selected_tags);
	},
	formIn : function(name) {
		$("." + name).show();
		$("." + name).addClass("form-in");
		setTimeout(function(){
			$("." + name).removeClass("form-in");
		},1200);
		
	},
	formOut : function(name) {
		$("." + name).addClass("form-out");
		setTimeout(function(){
			$("." + name).removeClass("form-out");
			$("." + name).hide();
		},1200);
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
	tags:[],
	getTags : function() {
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
	generate_key : function(len) {
		var text = "";
		var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
		for (var i = 0; i < len; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
};
