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
	    }
	}

	$('#add_pet').click(function() {
        var dataArray = $('#adicionar_pet').serializeArray();
        var data = {};

        $(dataArray).each(function(i, field) {
            data[field.name] = field.value;
        });

        var transaction = db.transaction(["pet"], "readonly");
        var objectStore = transaction.objectStore("pet");
        var ob = objectStore.get(data['id']);

        ob.onsuccess = (e) => {
            var result = e.target.result;
            
            if (!result) {
                var transaction = db.transaction(["pet"], "readwrite");

                var objectStore = transaction.objectStore("pet");
                var request = objectStore.add({ Id: data['id'], Name: data['nome'], Age: data['edade'], Race: data['raca'], Photo: data['photo'], Id_User: id});

                request.onsuccess = (e) => {
                	window.location.href = "pets.html?id=" + id;
                    alert("Pet adicionado.");
                }
            } else alert("O id já está sendo usado. Use outro.");
        }  
    });

	$("#edit_user").click(function() {
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


