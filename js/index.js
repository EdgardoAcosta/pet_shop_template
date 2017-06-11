/**
 * Manuel Francisco Haro Arroyo: 10223004
 * Edgardo Acosta Leal: 1022755
 * José Richard Tejedo Vega: 10222991
 * */
//<editor-fold desc="IDB">
//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}
if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

//</editor-fold>
//
function add_to(table, data, message = "added") {

    var open = indexedDB.open("pet_shop", 1);

    open.onsuccess = function () {
        // Start a new transaction
        var db = open.result;
        var trans = db.transaction(table, "readwrite");
        var store = trans.objectStore(table);

        for (let i in data) {
            store.add(data[i]);
        }

        // Close the db when the transaction is done
        trans.oncomplete = function () {
            db.close();
        };

        console.log(message);
    };
}

function get_products() {
    // Query the data
    getAllItems(function (items) {
        var len = items.length;
        var id, name, description, type, price, stock, photo;
        var cont = 0, aux = 0;
        if (len > 0) {
            for (var i = 0; i < len; i += 1) {
                id = items[i]['Id'];
                type = items[i]['Type'];
                name = items[i]['Name'];
                description = items[i]['Description'];
                price = items[i]['Price'];
                stock = items[i]['Stock'];
                photo = items[i]['Photo'];
                //create row
                if (cont == 0) {
                    $('#product-list').append('<div class="row products_list" id="row-prod' + aux + '" style="display: none">');
                    $('#row-prod' + aux).append('<div class="col-lg-4 col-md-6 ' + type + '" id="' + id + '"><div class="card">' +
                        '<div class="view overlay hm-white-slight"> <img src="' + photo + '"' +
                        ' alt="' + name + '" class="img-fluid"></div><div class="card-block">' +
                        '<h4 class="card-title"><strong class="product-name">' + name + '</strong></h4> <hr> ' +
                        '<p class="card-text">' + description + '</p><div class="card-footer">' +
                        '<span class="left">Stock: ' + stock + '</span> <span class="right">' +
                        '<a data-original-title="Adicionar ao carrinho" type="button" data-toggle="tooltip" ' +
                        'data-placement="top" title="" onclick="add_product_to_cart(this)" class="addcart" > <i class="fa fa-cart-plus"></i> </a>' +
                        ' </span> </div> </div> </div> </div>');
                }
                //Append to row
                else {
                    $('#row-prod' + aux).append('<div class="col-lg-4 col-md-6 ' + type + '" id="' + id + '"><div class="card">' +
                        '<div class="view overlay hm-white-slight"> <img src="' + photo + '"' +
                        ' alt="' + name + '" class="img-fluid"></div><div class="card-block">' +
                        '<h4 class="card-title"><strong class="product-name">' + name + '</strong></h4> <hr> ' +
                        '<p class="card-text">' + description + '</p><div class="card-footer">' +
                        '<span class="left">Stock: ' + stock + '</span> <span class="right">' +
                        '<a data-original-title="Adicionar ao carrinho" type="button" data-toggle="tooltip" ' +
                        'data-placement="top" title="" onclick="add_product_to_cart(this)" class="addcart" > <i class="fa fa-cart-plus"></i> </a>' +
                        ' </span> </div> </div> </div> </div>');
                }
                cont++;
                //Close row
                if (cont >= 3) {
                    $('#product-list').append('</div>');
                    cont = 0;
                    aux++;
                }
            }
            //Show only the first row
            $('#row-prod0').show();
            //Append button to show more
            $('#product-list').append('<div class="text-xs-center">' +
                '<button type="button" class="btn light-blue darken-4" onclick="show_more();" id="show-more">Ver mais</button>' +
                '<button type="button" class="btn light-blue darken-4" onclick="show_less();" id="show-less" style="display: none">Ver menos</button></div>');

        }
        else {
            $('#product-list').append('<div class="row" id="error-list" style="display: ">' +
                '<div class="col-lg-4 col-md-6"><div class="card">' +
                '<div class="view overlay hm-white-slight"></div><div class="card-block">' +
                '<h4 class="card-title"><strong>Error</strong></h4> <hr> ' +
                '<p class="card-text">Nao temos productos hoje</p><div class="card-footer">' +
                '<span class="left"></span> <span class="right">' +
                ' </span> </div> </div> </div> </div></div>');
        }
    });


}
function show_more() {
    var show = document.getElementsByClassName('products_list'), i;
    for (var i = 0; i < show.length; i++) {
        show[i].style.display = 'block';
    }
    document.getElementById('show-more').style.display = 'none';
    document.getElementById('show-less').style.display = 'block';
}
function show_less() {
    var show = document.getElementsByClassName('products_list'), i;
    for (var i = 1; i < show.length; i++) {
        show[i].style.display = 'none';
    }
    document.getElementById('show-more').style.display = 'block';
    document.getElementById('show-less').style.display = 'none';
}
function add_product_to_cart(element) {
    var name;
    var value = parseInt($('#num_of_products').text());
    $('#num_of_products').text(value + 1);
    var element_toadd = $(element).closest('.col-lg-4').attr('id');
    name = $(element).closest('.col-lg-4').find('h4.card-title strong').text();

    //CHANGE TO ID OF USER IN SESSION
    var user = 1;
    var open = indexedDB.open("pet_shop", 1);
    open.onsuccess = function () {
        console.log("add_to_cart");
        // Start a new transaction
        var db = open.result;
        var trans = db.transaction("cart", "readwrite");
        var store = trans.objectStore("cart");


        // Add some data
        store.add({Id:element_toadd,Id_Product: element_toadd,Name:name, Id_User: user,Description: "",Purch_Date: "",Active: "1"});
        toastr.success("Added to cart");

        // Close the db when the transaction is done
        trans.oncomplete = function () {
            db.close();
        };
    }
}

function add_products_to_DB(open) {
    open.onsuccess = function () {
        // Start a new transaction
        var db = open.result;
        var trans = db.transaction("product", "readwrite");
        var store = trans.objectStore("product");

        // Add some data
        const products = [
            {Id: "1",Type: "dog", Name: "Collar para cachorro", Description: "Descrição do collar para cachorro.",
                Price: "100",Stock: "30",Photo: "Images/Categories/Accessories/collar_perro.jpg"},
            {Id: "2",Type: "cat", Name: "Casa para gato", Description: "Descrição da casa para gatos.",
                Price: "150",Stock: "40",Photo: "Images/Categories/Accessories/kennei-trans.jpg"},
            {Id: "3",Type: "dog", Name: "Roupa do cão", Description: "Descrição roupa do cão.",
                Price: "200",Stock: "60",Photo: "Images/Categories/Clothing/logo.png"},
            {Id: "4",Type: "cat", Name: "Descrição alimento de cão", Description: "Descrição da casa para gatos.",
                Price: "240",Stock: "110",Photo: "Images/Categories/Feeding/alimento8-alimento.jpg"}
        ];

        for (var i in products) {
            store.add(products[i]);
        }

        // Close the db when the transaction is done
        trans.oncomplete = function () {
            db.close();
        };

    }

}

function getAllItems(callback) {
    var open = indexedDB.open("pet_shop", 1);
    open.onsuccess = function () {
        var db = open.result;
        var trans = db.transaction("product", "readwrite");
        var store = trans.objectStore("product");
        var items = [];

        trans.oncomplete = function (evt) {
            callback(items);
        };

        var cursorRequest = store.openCursor();

        cursorRequest.onerror = function (error) {
            console.log(error);
        };

        cursorRequest.onsuccess = function (evt) {
            var cursor = evt.target.result;
            if (cursor) {
                items.push(cursor.value);
                cursor.continue();
            }
        };
    }
}

function add_user_toDB() {
	// Add some data
	const data = [
		{
			Id: "1",
			Type: "0",
			Name: "Ana",
			Phone: "+5511659566351",
			Email: "ana@gmail.com",
			Address: "...",
			Photo: "images/users/798744243.jpg"
		},

		{
			Id: "2",
			Type: "0",
			Name: "Sakura",
			Phone: "+5511659566351",
			Email: "sakura@gmail.com",
			Address: "...",
			Photo: "images/users/763243241.jpg"
		},

		{
			Id: "3",
			Type: "1",
			Name: "Roberto",
			Phone: "+5511659566351",
			Email: "roberto@gmail.com",
			Address: "...",
			Photo: "images/users/7365432423.jpg"
		}
	];

	add_to("user", data, "users added");
}

function add_pet_toDB() {
	// Add some data
	const data = [
		{
			Id: "1",
			Name: "Boby",
			Age: "3 años",
			Race: "...",
			Photo: "images/pets/432413123.jpg",
			Id_User: "1"
		},

		{
			Id: "2",
			Name: "Guffy",
			Age: "3 años",
			Race: "...",
			Photo: "images/pets/654654654.jpg",
			Id_User: "1"
		},

		{
			Id: "3",
			Name: "Spak",
			Age: "2 años",
			Race: "...",
			Photo: "images/pets/554564654.jpg",
			Id_User: "2"
		},

		{
			Id: "4",
			Name: "Docky",
			Age: "1 años",
			Race: "...",
			Photo: "images/pets/698593458.jpg",
			Id_User: "2"
		}
	];

	add_to("pet", data, "pets added");
}

function add_calendar_toDB() {
    console.log("Calendar1");
	// Add some data
	const data = [
		{
			Id: "01",
			Id_Service: "1",
			Id_Pet: "0",
			Date: "2017-07-10T08:00"
		},

		{
			Id: "02",
			Id_Service: "2",
			Id_Pet: "1",
			Date: "2017-07-10T09:30"
		},

		{
			Id: "03",
			Id_Service: "1",
			Id_Pet: "4",
			Date: "2017-07-10T10:10"
		},

		{
			Id: "04",
			Id_Service: "3",
			Id_Pet: "0",
			Date: "2017-07-10T11:00"
		},

		{
			Id: "05",
			Id_Service: "3",
			Id_Pet: "3",
			Date: "2017-07-10T11:45"
		},

		{
			Id: "06",
			Id_Service: "1",
			Id_Pet: "2",
			Date: "2017-07-10T12:20"
		},

		{
			Id: "07",
			Id_Service: "1",
			Id_Pet: "0",
			Date: "2017-07-10T13:10"
		},

		{
			Id: "08",
			Id_Service: "1",
			Id_Pet: "0",
			Date: "2017-07-10T14:00"
		},

		{
			Id: "09",
			Id_Service: "1",
			Id_Pet: "0",
			Date: "2017-07-10T15:30"
		},

		{
			Id: "10",
			Id_Service: "1",
			Id_Pet: "0",
			Date: "2017-07-10T16:45"
		}
	];

	add_to("calendar", data, "calendar table added");
}

function add_service_toDB() {
    // Add some data
    const data = [
        {
            Id: "1",
            Name: "Banhos",
            Description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur adipisci sed velit.",
            Price: "45.50",
            Photo: "images/services/510231231.jpg"
        },

        {
            Id: "2",
            Name: "Corte de unhas",
            Description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur adipisci sed velit.",
            Price: "75.80",
            Photo: "images/services/5012412032.png"
        },

        {
            Id: "3",
            Name: "Corte de cabelo",
            Description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur adipisci sed velit.",
            Price: "90.40",
            Photo: "images/services/54331234.jpg"
        }
    ];

    add_to("service", data, "services added");
}

function create_DB(open) {
    console.log("Create DB's");

    // Create the schema
    open.onupgradeneeded = function () {
        console.log("open");
		var db = open.result;
		// var store = db.createObjectStore("product", {keyPath: "Id", autoIncrement:true });
		var store = db.createObjectStore("product", {keyPath: "Id"});
		var index = store.createIndex("Index", ["Id","Type", "Name", "Description", "Price", "Stock", "Photo", "Id_Category"]);
		store.createIndex("by_id", "Id", { unique: true });

		console.log("products table created");

		//store = db.createObjectStore("cart", {keyPath: "Id", autoIncrement:true });
		store = db.createObjectStore("cart", {keyPath: "Id"});
		index = store.createIndex("Index", ["Id","Id_Product","Name","Id_User", "Description", "Purch_Date", "Active"]);
		store.createIndex("by_id", "Id", { unique: true });
		store.createIndex('user_prod', ['Id_User','Active'], {unique:false});

		console.log("cart table created");

		store = db.createObjectStore("category", {keyPath: "Id"});
		index = store.createIndex("Index", ["Id","Name", "Photo"]);
		store.createIndex('by_id', 'Id', {unique: true});

		console.log("categories table created");

		store = db.createObjectStore("service", {keyPath: "Id"});
		index = store.createIndex("Index", ["Id", "Name","Description", "Price", "Photo"]);
		store.createIndex("by_id", "Id", { unique: true });

		console.log("services table created");

		store = db.createObjectStore("user", {keyPath: "Id"});
		index = store.createIndex("Index", ["Id", "Type", "Name","Phone", "Email", "Address", "Photo"]);
		store.createIndex("by_id", "Id", { unique: true });

		console.log("users table created");

		store = db.createObjectStore("pet", {keyPath: "Id"});
		index = store.createIndex("Index", ["Id", "Name", "Age", "Race", "Photo", "Id_User"]);
		store.createIndex("by_id", "Id", { unique: true });

		console.log("pets table created");

		store = db.createObjectStore("calendar", {keyPath: "Id"});
		index = store.createIndex("Index", ["Id", "Id_Service","id_Pet", "Date"]);
		store.createIndex("by_id", "Id", { unique: true });

		console.log("calendar table created");
    };
}

$(document).ready(function () {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    // Open (or create) the database
    var open = indexedDB.open("pet_shop", 1);
    create_DB(open);
    add_products_to_DB(open);
    get_products();
    add_user_toDB();
    add_pet_toDB();
    add_calendar_toDB();
    add_service_toDB();

//Disable adding more than 1 item to cart, in cart can be change the number of items
    $(document).on('click', "a.addcart", function () {
        $(this).attr('style', 'pointer-events: none');
    });
});
