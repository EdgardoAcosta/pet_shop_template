var db;

$(document).ready(function() {
	var openRequest = indexedDB.open("PetShop", 2);
	openRequest.onsuccess = (e) => {
		db = e.target.result;
	}
	openRequest.onupgradeneeded = (e) => {
		db = e.target.result;
		db.createObjectStore("users", { keyPath: "id" });
		db.createObjectStore("services", { keyPath: "id", autoIncrement: true });
		db.createObjectStore("products", { keyPath: "id", autoIncrement: true });
	}

	$("#reg_product").click(function() {
		var dataArray = $("#register_product").serializeArray();
		var data = {};

		$(dataArray).each(function(i, field) {
			data[field.name] = field.value;
		});

		var transaction = db.transaction(["products"], "readwrite");

		var objectStore = transaction.objectStore("products");
		var request = objectStore.add({ type: data['tipo'], name: data['nome'], description: data['descricao'], price: data['preco'], stock: data['quantidade'], photo: data['photo']});

		request.onsuccess = (e) => {
			alert("Produto cadastrado");
		}
	});
});
