var io = require('socket.io')();

io
	.of('/abc-employee')
	.on('connection', function(socket) {
		socket.on('newproduct', function(product) {
			socket.broadcast.emit('newProductAdded', {new: product});
		});
	});

module.exports = io;