var db;

var key = getQueryParams(document.location.search);
var id = key['id'];
var idUser = key['user'];

$(document).ready(function() {
	var openRequest = indexedDB.open("pet_shop", 1);

	openRequest.onsuccess = (e) =>{
		db = e.target.result;
	    var transaction = db.transaction("user", "readonly");
	    var objectStore = transaction.objectStore("user");
	    var request = objectStore.get(idUser);

	    request.onsuccess = (e) => {
	    	var data = e.target.result;
	    	var element = $("#user");
	    	element.append(data.Name);
	    }

	    transaction = db.transaction("pet", "readonly");
		objectStore = transaction.objectStore("pet");
		request = objectStore.get(id);

		request.onsuccess = (e) => {
			data = e.target.result;
			$("#nome").attr("value", data.Name);
			$("#edade").attr("value", data.Age);
			$("#raca").attr("value", data.Race);
			$("#photo").attr("value", data.Photo);
		}
	}

	$('#ed_pet').click(function() {
        var dataArray = $('#edit_pet').serializeArray();
        var data = {};

        $(dataArray).each(function(i, field) {
            data[field.name] = field.value;
        });

       	var transaction = db.transaction(["pet"], "readwrite");
		var objectStore = transaction.objectStore("pet");
		var request = objectStore.get(id);

		request.onsuccess = (e) => {
			var d = e.target.result;

			d.Name = data['nome'];
			d.Age = data['edade'];
			d.Race = data['raca'];
			d.Photo = data['photo'];

			var requestUpdate = objectStore.put(d);

			requestUpdate.onsuccess = (e) => {
 				window.location.href="pets.html?id=" + idUser;
 				alert("Pet editado");
			}			
		}
    });

	$("#edit_user").click(function() {
		window.location.href = "edit_user.html?id=" + idUser;
	});

	$("#user").click(function() {
		window.location.href = "pets.html?id=" + idUser;
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



