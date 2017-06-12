var db;

$(document).ready(function() {
	var openRequest = indexedDB.open("pet_shop", 1);
	openRequest.onsuccess = (e) => {
		db = e.target.result;
	}

	$("#reg_service").click(function() {
		var dataArray = $("#register_service").serializeArray();
        var data = {};

        $(dataArray).each(function(i, field) {
            data[field.name] = field.value;
        });

        var transaction = db.transaction(["service"], "readwrite");

        var objectStore = transaction.objectStore("service");
        var request = objectStore.add({ Id: data['id'], Name: data['nome'], Description: data['descricao'], Price: data['preco'], Photo: data['photo']});

        request.onsuccess = (e) => {
            alert("Servico cadastrado");
        }
    });

    $('.fa-instagram').click(function (event) {
        $('#photo-file').click();
    });

    $('#photo-file').change(function (event) {
        var text = $(this).val();
        console.log(text);
        $('#photo').val(text);
    }); 
});
