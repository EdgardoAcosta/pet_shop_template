var db;

var key = getQueryParams(document.location.search);
var id = key['id'];

$(document).ready(function() {
	var openRequest = indexedDB.open("pet_shop", 1);

	openRequest.onsuccess = (e) =>{
		db = e.target.result;
	    var transaction = db.transaction("user", "readonly");
	    var objectStore = transaction.objectStore("user");
	    var request = objectStore.get(id);

	    request.onsuccess = (e) => {
	    	var data = e.target.result;
	    	var element = $("#user");
	    	element.append(data.Name);
	    
	    	$("#email").attr("value", data.Email);
	    	$("#pass").attr("value", data.Password);
			$("#nome").attr("value", data.Name);
			$("#photo").attr("value", data.Photo);
			$("#telefone").attr("value", data.Phone);
			$("#endereco").attr("value", data.Address);
		}
	}

	$('#ed_user').click(function() {
        var dataArray = $('#edit_user').serializeArray();
        var data = {};

        $(dataArray).each(function(i, field) {
            data[field.name] = field.value;
        });

       	var transaction = db.transaction(["user"], "readwrite");
		var objectStore = transaction.objectStore("user");
		var request = objectStore.get(id);

		request.onsuccess = (e) => {
			var d = e.target.result;

			d.Email = data['email'];
			d.Password = data['pass'];
			d.Name = data['nome'];
			d.Photo = data['photo'];
			d.Phone = data['telefone'];
			d.Address = data['endereco'];

			var requestUpdate = objectStore.put(d);

			requestUpdate.onsuccess = (e) => {
 				window.location.href="pets.html?id=" + id;
 				alert("Informação atualizada");
			}			
		}
    });

	$("#edit_usuario").click(function() {
		window.location.href = "edit_user.html?id=" + id;
	});

	$("#user").click(function() {
		window.location.href = "pets.html?id=" + id;
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

