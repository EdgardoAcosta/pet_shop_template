var db;

$(document).ready(function() {
	var openRequest = indexedDB.open("pet_shop", 1);
 	openRequest.onsuccess = (e) => {
 		db = e.target.result;
 	}

 	$("#log_client").click(function() {
 		var dataArray = $("#login_client").serializeArray();
 		var data = {};
 		 $(dataArray).each(function(i, field) {
                data[field.name] = field.value;
            });

 		var transaction = db.transaction("user", "readonly");
 		var objectStore = transaction.objectStore("user");

 		objectStore.openCursor().onsuccess = (e) => {
 			var cursor = e.target.result;
 			var isClient = false;
 			if(cursor) {
 				var email = cursor.value.Email;
 				var password = cursor.value.Password;
 				if (email == data["email"] && password == data["pass"]) isClient = true;
 				else cursor.continue();
 			}
 			if (isClient) window.location.href = "html/user/pets.html?id=" + cursor.key;
 			else alert("Email o senha incorreta");
 		}
 	});

 	$('#reg_client').click(function() {
    	var dataArray = $('#register_client').serializeArray();
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
                    var request = objectStore.add({ Id: data['id'], Type: '0', Password: data['pass'], Name: data['nome'], Photo: "", Phone: data['telefone'], Email: data['email'], Address: data['endereco']});

                    request.onsuccess = (e) => {
                        alert("Cliente cadastrado.");
                    }
                } else alert("O id já está sendo usado. Use outro.");
            }    
    });
});
