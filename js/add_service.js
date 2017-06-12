var db;

var key = getQueryParams(document.location.search);
var id = key['id'];

$(document).ready(function () {
	var openRequest = indexedDB.open("pet_shop", 1);
	openRequest.onsuccess = (e) => {
		db = e.target.result;
		var transaction = db.transaction("pet", "readonly");
		var objectStore = transaction.objectStore("pet");

		objectStore.openCursor().onsuccess = (e) => {
			var cursor = e.target.result;
			var element = $("#pets");
			if (cursor) {
				var id = cursor.key;
				var photo = cursor.value.Photo;
				var name = cursor.value.Name;

				element.append(
				'<div class="col-lg-4">' +
					'<div class="card">' +			
				    	'<a href="" id="' + id +'" onclick="agregar(' + id +')"><img src="../../' + photo + '" class="rounded-circle img-responsive" alt="Cliente"></a>' +
				    	'<div class="card-block">' +
				        	'<h4 class="card-title">' + name + '</h4>' +			
				    	'</div>' +
					'</div>' +
				'</div>'
				);
				cursor.continue();
			}
		}
	}
});

function agregar(idPet) {
	var transaction = db.transaction(["calendar"], "readwrite");
	var objectStore = transaction.objectStore("calendar");

	var request = objectStore.get(id);

	request.onsuccess = (e) => {
		var data = e.target.result;

		data.Id_Pet = String(idPet);

		var requestUpdate = objectStore.put(data);

		requestUpdate.onsuccess = (e) => {
				window.location.href="admin_services.html";
				alert("Operação bem sucedida.");
		}			
	}
}

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
