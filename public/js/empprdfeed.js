var socket = io('/abc-employee');
socket.on('newProductAdded', function(data) {
	var product = data.new;

	/*var itemHtml = '<h2>' + product.name + '</h2>';
	$('#itemcatalog').prepend(itemHtml);*/

	/*var template = '<!-- item -->\r\n<div class=\"col-sm-5 col-md-3 prod-item\">\r\n\t<div class=\"thumbnail\">\r\n\t\t<div class=\'prod-img-container\'>\r\n\t\t\t<% if (product.img != \'\') { %>\r\n\t\t\t<img src=\"<%= product.img %>\" class=\"img-rounded img-responsive prod-img\"\/>\r\n\t\t\t<% } else { %>\r\n\t\t\t<img data-src=\"holder.js\/100%x180\" alt=\"100%x180\" src=\"data:image\/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI\/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTcxIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE3MSAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MTgwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTUzOWY0MDNlMzggdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTM5ZjQwM2UzOCI+PHJlY3Qgd2lkdGg9IjE3MSIgaGVpZ2h0PSIxODAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI1OS4yMTg3NSIgeT0iOTQuNTMyODEyNSI+MTcxeDE4MDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==\" data-holder-rendered=\"true\" style=\"height: 180px; width: 100%; display: block;\">\r\n\t\t\t<% } %>\r\n\t\t<\/div>\r\n\t\t<div class=\"caption prod-caption\">\r\n\t\t\t<h3 class=\'prod-title\'><%= product.name %><\/h3>\r\n\t\t\t<p class=\'prod-desc block-with-text\'><%= product.description %><\/p>\r\n\t\t\t<p>\r\n\t\t\t\tPrice: \u20B9 <%= product.unitPrice %> only\r\n\t\t\t<\/p>\r\n\t\t\t<p>\r\n\t\t\t\tOnly <%= product.unitsAvailable %> more left\r\n\t\t\t<\/p>\r\n\t\t\t<p>\r\n\t\t\t\tSold by : <%= product.soldByVendor %>\r\n\t\t\t<\/p>\r\n\t\t\t<p>\r\n\t\t\t\t<!-- <a href=\"#\" class=\"btn btn-primary\" role=\"button\">Button<\/a> --> \r\n\t\t\t\t<a href=\"#\" class=\"btn btn-default\" role=\"button\">Preview<\/a>\r\n\t\t\t<\/p>\r\n\t\t<\/div> <!-- end of caption -->\r\n\t<\/div> <!-- end of thumbnail -->\r\n<\/div> <!-- End of one item';
	var html = require('ejs').compile(template, {data: product});
	$('#itemcatalog').prepend(html);*/

	var html = '<div class="col-sm-5 col-md-3 prod-item"> \
	<div class="thumbnail"> \
		<div class="prod-img-container">';

	if (product.img != "") {
		html += '<img src="' + product.img  + '" class="img-rounded img-responsive prod-img"/>';
	} else {
		html += '<img data-src="holder.js/100%x180" alt="100%x180" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTcxIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE3MSAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MTgwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTUzOWY0MDNlMzggdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTM5ZjQwM2UzOCI+PHJlY3Qgd2lkdGg9IjE3MSIgaGVpZ2h0PSIxODAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI1OS4yMTg3NSIgeT0iOTQuNTMyODEyNSI+MTcxeDE4MDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==" data-holder-rendered="true" style="height: 180px; width: 100%; display: block;">';
	}

	html += '</div> \
				<div class="caption prod-caption" style="background-color: #FFF7B2;"> \
					<h3 class="prod-title" style="color: blue;">' + product.name + '</h3> \
					<p class="prod-desc block-with-text">' + product.description + '</p> \
					<p> \
						Price: ₹ ' + product.unitPrice + ' only \
					</p> \
					<p> \
						Only ' + product.unitsAvailable + ' more left \
					</p> \
					<p> \
						Sold by : ' + product.soldByVendor + ' \
					</p> \
					<p> \
						<a href="#" class="btn btn-default" role="button">Preview</a> \
						<span class="new">Just arrived</span> \
					</p> \
				</div> \
			</div> \
		</div>';

	console.log(html);
	$('#itemcatalog').prepend(html);

	sleep(1000);
	$('#itemcatalog').firstChild();
});