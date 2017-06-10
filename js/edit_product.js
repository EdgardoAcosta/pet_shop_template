var db;

var key = getQueryParams(document.location.search);
var id = key['id'];

$(document).ready(function() {
	var openRequest = indexedDB.open("PetShop", 2);
	openRequest.onsuccess = (e) => {
		db = e.target.result;
		var transaction = db.transaction("products", "readonly");
		var objectStore = transaction.objectStore("products");
		var request = objectStore.get(Number(id));

		request.onsuccess = (e) => {
			var data = e.target.result;
			$("#nome").attr("value", data.name);
			$("#descricao").text(data.description);
			$("#photo").attr("value", data.photo);
			$("#preco").attr("value", data.price);
			$("#quantidade").attr("value", data.stock);
			$("#tipo").attr("value", data.type);
		}
	}
	openRequest.onupgradeneeded = (e) => {
		db = e.target.result;
		db.createObjectStore("users", { keyPath: "id" });
		db.createObjectStore("services", { keyPath: "id", autoIncrement: true });
		db.createObjectStore("products", { keyPath: "id", autoIncrement: true });
	}


	$("#ed_product").click(function() {
		var dataArray = $("#edit_product").serializeArray();
		var data = {};

		$(dataArray).each(function(i, field) {
			data[field.name] = field.value;
		});

		var transaction = db.transaction(["products"], "readwrite");
		var objectStore = transaction.objectStore("products");
		var request = objectStore.get(Number(id));

		request.onsuccess = (e) => {
			var d = e.target.result;

			d.name = data['nome'];
			d.type = data['tipo'];
			d.description = data['descricao'];
			d.price = data['preco'];
			d.stock = data['quantidade'];
			d.photo = data['photo'];

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
