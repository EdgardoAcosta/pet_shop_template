var db;

$(document).ready(function() {
 	var openRequest = indexedDB.open("PetShop", 2);
 	openRequest.onsuccess = (e) => {
 		db = e.target.result;

 		var transaction = db.transaction("products", "readonly");
	 	var objectStore = transaction.objectStore("products");

	 	transaction.oncomplete = (e) => {
	 		$(".del_product").click(function() {
 			var id = $(this).data("id");

 			var request = db.transaction(["products"], "readwrite").objectStore("products").delete(id);

 			request.onsuccess = (e) =>  {
 				window.location.href="admin_products.html";
 			}

 			});
	 	}

	 	objectStore.openCursor().onsuccess = (e) => {
	 		var cursor = e.target.result;
	 		var element = $("#produtos");
	 		if (cursor) {
	 			var id = cursor.key;
	 			var name = cursor.value.name;
	 			var description = cursor.value.description;
	 			var price = cursor.value.price;
	 			var stock = cursor.value.stock;
	 			var photo = cursor.value.photo;

	 			element.append(
	 			'<div class="col-lg-4">' +
	 				'<div class="card">' +
				    	'<img class="img-fluid" src="' + photo + '">' +
				    	'<div class="card-block">' +
				        	'<h4 class="card-title"><strong>' + name + '</strong></h4>' +
				        	'<p class="card-text">' + description.substring(0, 50) + '...</p>' +
				        	'<a href="detail_product.html?id=' + id + '" class="black-text"><h5>Ler mais <i class="fa fa-chevron-right"></i></h5></a>' +
				        	'<div class="offset-lg-1">' +
					        	'<a href="edit_product.html?id=' + id + '" target="_blank" class="btn btn-primary">Editar</a>' +
					        	'<button class="btn btn-danger del_product" data-id="' + id +'">Remover</button>' +
				        	'</div>' +
				    	'</div>' +
					'</div>' +
				'</div>'
				);

	 			cursor.continue();
	 		}
	 	}
 	}
 	openRequest.onupgradeneeded = (e) => {
 		db = e.target.result;
 		db.createObjectStore("users", { keyPath: "id" });
 		db.createObjectStore("services", { keyPath: "id", autoIncrement: true });
		db.createObjectStore("products", { keyPath: "id", autoIncrement: true });
 	}

 });
