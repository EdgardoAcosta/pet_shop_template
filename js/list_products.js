var db;

$(document).ready(function () {
	var openRequest = indexedDB.open("pet_shop", 1);
	openRequest.onsuccess = (e) => {
		db = e.target.result;

		var transaction = db.transaction("product", "readonly");
	    var objectStore = transaction.objectStore("product");

	    transaction.oncomplete = (e) => {
	        $(".del_product").click(function() {
	            var id = $(this).data("id");
	            var request = db.transaction(["product"], "readwrite").objectStore("product").delete(id);
	            request.onsuccess = (e) => window.location.href = "admin_products.html";
	        });
	    }

	    objectStore.openCursor().onsuccess = (e) => {
	        var cursor = e.target.result;
	        var element = $("#produtos");
	        if (cursor) {
	            var id = cursor.key;
	            var name = cursor.value.Name;
	            var description = cursor.value.Description;
	            var price = cursor.value.Price;
	            var stock = cursor.value.Stock;
	            var photo = cursor.value.Photo;
	            var type = cursor.value.Type;

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
});
