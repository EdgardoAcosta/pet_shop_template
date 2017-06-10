var db;

var key = getQueryParams(document.location.search);
var id = key['id'];

$(document).ready(function() {
	var openRequest = indexedDB.open("PetShop", 2);
	openRequest.onsuccess = (e) => {
		db = e.target.result;
		var transaction = db.transaction("products", "readonly");
		var objectStore = transaction.objectStore("products");
		var request = objectStore.get(Number(id));

		request.onsuccess = (e) => {
			var data = e.target.result;
			var element = $("#product");

			element.append(
			'<div class="card-header default-color-dark white-text">' +
        		'<h1>' + data.name + '</h1>' +
    		'</div>' +
    		'<div class="card-block">' +
	    		'<div class="row">' +
	    			'<div class="col-lg-4 offset-lg-4">' +
	    				'<img class="img-fluid" src="' + data.photo + '">' +
	    			'</div>' +
    			'</div>' +
    			'<div class="row">' +
    				'<div class="col-lg-12">' +
    					'<h4 class="card-title"><strong>Preço:</strong> R$ ' + data.price + '</h4>' +
    					'<h4 class="card-title"><strong>Stock:</strong> ' + data.stock + ' unidades</h4>' +	
    					'<h4 class="card-title"><strong>Descrição:</strong></h4>' +
    					'<p class="card-text">' + data.description + '</p>' +   			
    				'</div>' +
    			'</div>' +
    		'</div>'
			)

			$("#nome").attr("value", data.name);
			$("#descricao").text(data.description);
			$("#photo").attr("value", data.photo);
			$("#preco").attr("value", data.price);
			$("#quantidade").attr("value", data.stock);
			$("#tipo").attr("value", data.type);
		}
	}
	openRequest.onupgradeneeded = (e) => {
		db = e.target.result;
		db.createObjectStore("users", { keyPath: "id" });
		db.createObjectStore("services", { keyPath: "id", autoIncrement: true });
		db.createObjectStore("products", { keyPath: "id", autoIncrement: true });
	}
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

