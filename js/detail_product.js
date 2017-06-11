var db;

var key = getQueryParams(document.location.search);
var id = key['id'];

$(document).ready(function () {
	var openRequest = indexedDB.open("pet_shop", 1);

	openRequest.onsuccess = (e) => {
		db = e.target.result;
		var transaction = db.transaction("product", "readonly");
	    var objectStore = transaction.objectStore("product");
	    var request = objectStore.get(id);

	    request.onsuccess = (e) => {
	        var data = e.target.result;
	        var element = $("#product");

	        element.append(
	        '<div class="card-header default-color-dark white-text">' +
	            '<h1>' + data.Name + '</h1>' +
	        '</div>' +
	        '<div class="card-block">' +
	            '<div class="row">' +
	                '<div class="col-lg-4 offset-lg-4">' +
	                    '<img class="img-fluid" src="' + data.Photo + '">' +
	                '</div>' +
	            '</div>' +
	            '<div class="row">' +
	                '<div class="col-lg-12">' +
	                    '<h4 class="card-title"><strong>Preço:</strong> R$ ' + data.Price + '</h4>' +
	                    '<h4 class="card-title"><strong>Stock:</strong> ' + data.Stock + ' unidades</h4>' + 
	                    '<h4 class="card-title"><strong>Descrição:</strong></h4>' +
	                    '<p class="card-text">' + data.Description + '</p>' +               
	                '</div>' +
	            '</div>' +
	        '</div>'
	        )
	    }
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
