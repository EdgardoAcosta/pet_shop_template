var db;

var key = getQueryParams(document.location.search);
var id = key['id'];

$(document).ready(function() {
	$('.mdb-select').material_select(); // to input select
	var openRequest = indexedDB.open("pet_shop", 1);
	openRequest.onsuccess = (e) => {
		db = e.target.result;
		var transaction = db.transaction("product", "readonly");
		var objectStore = transaction.objectStore("product");
		var request = objectStore.get(id);

		request.onsuccess = (e) => {
			var data = e.target.result;
			$("#nome").attr("value", data.Name);
			$("#descricao").text(data.Description);
			$("#photo").attr("value", data.Photo);
			$("#preco").attr("value", data.Price);
			$("#quantidade").attr("value", data.Stock);
			$("#tipo option[value=" + data.Type + "]").attr("selected", "selected");
		}
	}

	$("#ed_product").click(function() {
		var dataArray = $("#edit_product").serializeArray();
		var data = {};

		$(dataArray).each(function(i, field) {
			data[field.name] = field.value;
		});

		var transaction = db.transaction(["product"], "readwrite");
		var objectStore = transaction.objectStore("product");
		var request = objectStore.get(id);

		request.onsuccess = (e) => {
			var d = e.target.result;

			d.Name = data['nome'];
			d.Type = data['tipo'];
			d.Description = data['descricao'];
			d.Price = data['preco'];
			d.Stock = data['quantidade'];
			d.Photo = data['photo'];

			var requestUpdate = objectStore.put(d);

			requestUpdate.onsuccess = (e) => {
 				window.location.href="admin_products.html";
 				alert("Produto editado");
			}			
		}
	});
});

function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}
