// requires http://104.131.100.96:4000/socket.io/socket.io.js

var soketier = {
	// socket:io('http://104.131.100.96:4000/'),
	socket:io('http://127.0.0.1:4444/'),
	code:"",
	uuid:"",
	init:function(initData,handler){
		var code = initData.code;
		
		soketier.socket.emit("register", initData);
		soketier.code = code;
		soketier.socket.on(code,handler);
	},
	send:function(data){
		soketier.socket.emit(soketier.code, data);
	}
};
