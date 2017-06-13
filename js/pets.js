var db;

var key = getQueryParams(document.location.search);
var id = key['id'];

$(document).ready(function() {
	var openRequest = indexedDB.open("pet_shop", 1);

	openRequest.onsuccess = (e) =>{
		db = e.target.result;
		var transaction = db.transaction("pet", "readonly");
	    var objectStore = transaction.objectStore("pet");

	    transaction.oncomplete = (e) => {
	        $(".del_pet").click(function() {
	            var idPet = $(this).data("id");
	            var request = db.transaction(["pet"], "readwrite").objectStore("pet").delete(String(idPet));
	            request.onsuccess = (e) => window.location.href = "pets.html?id=" + id;
	        });
	    }
	    
    	objectStore.openCursor().onsuccess = (e) => {
	        var cursor = e.target.result;
	        var element = $("#pets");
	        if (cursor) {
	            var idPet = cursor.key;
	            var name = cursor.value.Name;
	            var age = cursor.value.Age;
	            var race = cursor.value.Race;
	            var photo = cursor.value.Photo;
	            var idUser = cursor.value.Id_User;

	            if (id == idUser) {
	            	element.append(
	            	'<tr>' +
						'<td><img src="../../' + photo + '" alt="Pet"></td>' +
						'<td class="hidden-sm-down">' + name + '</td>' +
						'<td class="hidden-sm-down">' + age + ' anhos</td>' +
						'<td class="hidden-sm-down">' + race + '</td>' +
						'<td>' +
							'<a href="edit_pet.html?id=' + idPet + '&user=' + id + '" class="btn btn-warning btn-rounded" data-original-title="Editar dados de pet" type="button" data-toggle="tooltip" data-placement="top" title="">' +
								'<i class="fa fa-pencil"></i>' +
							'</a>' +
							'<a href="#" class="btn btn-danger btn-rounded del_pet" data-id="' + idPet + '" data-original-title="Remover pet" type="button" data-toggle="tooltip" data-placement="top" title="">' +
								'<i class="fa fa-times"></i>' +
							'</a>' + 
						'</td>' +
					'</tr>'
	            	);
	            }

	            cursor.continue();
	        }
	    }

	    var transaction = db.transaction("user", "readonly");
	    var objectStore = transaction.objectStore("user");
	    var request = objectStore.get(id);

	    request.onsuccess = (e) => {
	    	var data = e.target.result;
	    	var element = $("#user");
	    	element.append(data.Name);
	    }
	}

	$("#add_pet").click(function() {
		window.location.href = "add_pet.html?id=" + id;
	});

	$("#edit_user").click(function() {
		window.location.href = "edit_user.html?id=" + id;
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

