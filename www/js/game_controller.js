var gameObject = {
	location : 0,
	name : localStorage.name
};

console.log("registering socket with " + localStorage.game_code);

var updateStatus = function(data) {
	updateBoard(data);
	
	$("#dice").fadeOut();
	if (data.event.players && data.event.players.indexOf(localStorage.device_uuid) > -1) {
		console.log("**** EVENT *****");
		resolveEventCard(data.event.players);
	} else if (data.turn == localStorage.device_uuid) {
		myTurn();
		hideStatus();
	}else{
		setStatus(data);
	}
	if(data.players){
		$(".fa-user").css("color",data.players[localStorage.device_uuid].color);
	}
	

};


var setStatus = function(gameObject){
	var turn = gameObject.players[gameObject.turn];
	$(".status").html(turn.name+ " is now playing");
	$(".status").fadeIn();
};
var hideStatus = function(){
	$(".status").fadeOut();
};

var fastStatus = function(msg){
	$(".status").html(msg);
	$(".status").fadeIn();
};

var resolveEventCard = function(players) {
	showCard({
		title : "a card",
		text : "kiss my buttox"
	});
};

var join = function(){
	gameObject.event = "join";
	soketier.send(gameObject);
};


var moveBy = function(val) {
	myData = gameObject;
	console.log(val);
	myData.location = (myData.location + val) % path.length;
	//console.log(gameObject);
	shiftView(myData.location);
	var o = {};
	o[localStorage.device_uuid]=gameObject;
	soketier.send(o);
	
};

var myTurn = function(){
	console.log("my turn");
	$(".flashMessage").fadeOut();
	$(".menu").animate({
		bottom:"2%"
	},400,function(){
		$("#dice").fadeIn();
	});
};

var flash = function(msg) {
	$(".flashMessage").html(msg);
	$(".flashMessage").fadeIn();
};

var rollDice = function() {
	var val = Math.floor((Math.random() * 6) + 1);
	$("#dice").fadeOut();
	flash(val);
	var pos = 0;
	moveBy(val);
	$(".menu").delay(2000).animate({
		bottom:"-50%"
	},400);

};

var showCard = function(data) {
	console.log(".");
	$("#card_title").html(data.title);
	$("#card_text").html(data.text);
	$(".card").fadeIn("slow");
};

var doneCard = function() {
	$(".card").fadeOut("slow");
	soketier.send({
		event : "done",
		player : localStorage.device_uuid
	});

};


//showCard({title:"muhaha",text:"show me your but, and then go fuck yourself in the ass.. you know you like it, dont you... yah..."});

console.log("+++init+++");
var initData = {
	code:localStorage.game_code || "default",
	player:{}
};
initData.player[localStorage.device_uuid]=gameObject;
soketier.init(initData, updateStatus);
shiftView(0);
//showCard({title:"a card",text:"kiss my buttox"});