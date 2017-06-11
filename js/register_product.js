var db;

$(document).ready(function () {
	$('.mdb-select').material_select(); // to input select

	var openRequest = indexedDB.open("pet_shop", 1);
	openRequest.onsuccess = (e) => {
		db = e.target.result;
	}

	$("#reg_product").click(function() {
		var dataArray = $("#register_product").serializeArray();
        var data = {};

        $(dataArray).each(function(i, field) {
            data[field.name] = field.value;
        });
        
        var transaction = db.transaction(["product"], "readwrite");

        var objectStore = transaction.objectStore("product");
        var request = objectStore.add({ Id: data['id'], Type: data['tipo'], Name: data['nome'], Description: data['descricao'], Price: data['preco'], Stock: data['quantidade'], Photo: data['photo']});

        request.onsuccess = (e) => {
            alert("Produto cadastrado");
        }	
    });
});
