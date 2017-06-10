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

	$("#reg_service").click(function() {
		var dataArray = $("#register_service").serializeArray();
		var data = {};

		$(dataArray).each(function(i, field) {
			data[field.name] = field.value;
		});

		var transaction = db.transaction(["services"], "readwrite");

		var objectStore = transaction.objectStore("services");
		var request = objectStore.add({ type: data['tipo'], name: data['nome'], description: data['descricao'], photo: data['photo'], price: data['preco']});

		request.onsuccess = (e) => {
			alert("Servico cadastrado");
		}
	});
});

