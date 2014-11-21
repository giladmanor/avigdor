// requires http://104.131.100.96:4000/socket.io/socket.io.js

var soketier = {
	socket:io('http://104.131.100.96:4000/'),
	code:"",
	uuid:"",
	init:function(code,handler){
		soketier.socket.emit("register", code);
		soketier.code = code;
		soketier.socket.on(code,handler);
	},
	send:function(data){
		soketier.socket.emit(soketier.code, data);
	}
};
