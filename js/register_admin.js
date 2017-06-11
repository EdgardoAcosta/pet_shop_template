var db;

$(document).ready(function() {
	var openRequest = indexedDB.open("pet_shop", 1);
 	openRequest.onsuccess = (e) => {
 		db = e.target.result;
 	}

	$('#reg_admin').click(function() {
        var dataArray = $('#register_admin').serializeArray();
        var data = {};

        $(dataArray).each(function(i, field) {
            data[field.name] = field.value;
        });

        var transaction = db.transaction(["user"], "readonly");
        var objectStore = transaction.objectStore("user");
        var ob = objectStore.get(data['id']);

        ob.onsuccess = (e) => {
            var result = e.target.result;
            
            if (!result) {
                var transaction = db.transaction(["user"], "readwrite");

                var objectStore = transaction.objectStore("user");
                var request = objectStore.add({ Id: data['id'], Type: 'admin', Password: data['pass'], Name: data['nome'], Photo: data['photo'], Phone: data['telefone'], Email: data['email']});

                request.onsuccess = (e) => {
                    alert("Administrador cadastrado.");
                }
            } else alert("O id já está sendo usado. Use outro.");
        }  
    }); 
});
