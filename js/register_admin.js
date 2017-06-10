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

 	$('#reg_admin').click(function() {
 		var dataArray = $('#register_admin').serializeArray();
 		var data = {};

 		$(dataArray).each(function(i, field) {
 			data[field.name] = field.value;
 		});

 		var transaction = db.transaction(["users"], "readonly");
 		var objectStore = transaction.objectStore("users");
 		var ob = objectStore.get(data['id']);

 		ob.onsuccess = (e) => {
 			var result = e.target.result;
 			
 			if (!result) {
		 		var transaction = db.transaction(["users"], "readwrite");

		 		var objectStore = transaction.objectStore("users");
		 		var request = objectStore.add({ id: data['id'], type: 'admin', password: data['pass'], name: data['nome'], photo: data['photo'], phone: data['telefone'], email: data['email']});

		 		request.onsuccess = (e) => {
		 			alert("Administrador cadastrado.");
		 		}
		 	} else alert("O id já está sendo usado. Use outro.");
 		}
 	});
 });

