var boardColor = "#ff33ff";
var margin = {
	top : 0,
	right : 0,
	bottom : 0,
	left : 0
}, width = 1960, height = 1960;
var center = [window.innerWidth / 2, window.innerHeight / 2];

var path = [[281, 59], [302, 89], [331, 94], [345, 62], [366, 28], [400, 39], [422, 57], [444, 94], [469, 95], [493, 60], [532, 56], [546, 90], [520, 125], [535, 158], [520, 188], [481, 181], [462, 149], [431, 157], [418, 187], [433, 216], [415, 246], [435, 275], [462, 271], [487, 301], [474, 333], [434, 333], [414, 361], [377, 367], [355, 333], [379, 299], [361, 267], [324, 269], [310, 302], [276, 300], [258, 337], [282, 366], [316, 361], [334, 395], [317, 414], [273, 421], [253, 449], [219, 448], [209, 420], [229, 393], [208, 355], [172, 359], [154, 326], [170, 296], [209, 301], [224, 266], [208, 240], [221, 207], [263, 213], [292, 212], [324, 211], [341, 177], [322, 149], [297, 148], [253, 152], [237, 117], [214, 115], [189, 154], [168, 177], [155, 213], [140, 245], [108, 240], [85, 210], [104, 178], [86, 144], [50, 151], [35, 114], [50, 88], [87, 91], [110, 56], [121, 26], [165, 27], [173, 64], [210, 66], [223, 28], [255, 22]];
var svg = d3.select(".board").append("svg");

//var players = [{location:0,color: "red"}, {location:4, color:"blue"}];

$.map(path, function(e, i) {
	e.push(i);
});

var drawBoard = function(points) {
	//var color = d3.scale.linear().domain([0, 3]).range(["white", "steelblue"]).interpolate(d3.interpolateLab);
	var hexbin = d3.hexbin().size([width, height]).radius(20);

	var svg = d3.select("svg").attr("width", width).attr("height", height).append("g");
	svg.append("clipPath").attr("id", "clip").append("rect").attr("class", "mesh").attr("width", width).attr("height", height);
	svg.append("g").attr("clip-path", "url(#clip)").selectAll(".hexagon").data(hexbin(points)).enter().append("path").attr("class", "hexagon").attr("d", hexbin.hexagon()).attr("transform", function(d) {
		//console.log(d[0]);
		return "translate(" + d.x + "," + d.y + ")";
	}).style("fill", function(d) {
		return boardColor;
	}).attr("class", function(d) {
		return "location location_" + d[0][2];
	});
};

var showPlayers = function(items) {
	$.map(items, function(e) {
		$(".location_" + e.location).css("fill", e.color);
	});
};

var clearPlayers = function() {
	$(".location").css("fill", boardColor);
};

var transition = function(svg, start, end) {
	if (start.length == 2) {
		start.push(20);
	}
	if (end.length == 2) {
		end.push(20);
	}

	//console.log(start, "to", end);
	var i = d3.interpolateZoom(start, end);
	svg.attr("transform", transform(start)).transition().delay(100).duration(1000).attrTween("transform", function() {
		return function(t) {
			return transform(i(t));
		};
	});

	function transform(p) {
		var k = 1;
		//console.log(">>", center, "translate(" + (center[0] - p[0] * k) + "," + (center[1] - p[1] * k) + ")scale(" + k + ")");
		return "translate(" + (center[0] - p[0] * k) + "," + (center[1] - p[1] * k) + ")scale(" + k + ")";
	}

};

drawBoard(path);

var currentBoardIndex = 0;
var shiftView = function(index) {
	var s = path[currentBoardIndex];
	var e = path[index];
	d3.select("g").call(transition, s, e);
	currentBoardIndex = index;
};

var updateBoard = function(gameObject) {
	clearPlayers();
	var players = Object.keys(gameObject.players);
	var list = [];
	players.forEach(function(key) {
		list.push(gameObject.players[key]);

	});
	showPlayers(list);
};
