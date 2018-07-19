var socket = io();
socket.on('newProductAdded', function(data) {
	var product = data.new;
	console.log("One more product just added ", product);
});