/**
 * Manuel Francisco Haro Arroyo: 10223004
 * Edgardo Acosta Leal: 1022755
 * José Richard Tejedo Vega: 10222991
 * */


function get_products() {

    $.post("php/get_products.php", {'action': 'get'}, function (response) {
    }, "json").done(function (response) {
        if (response.success == "1") {
            var id, name, description, type, price, stock, photo;
            var cont = 0, aux = 0;
            for (var i = 0; i < response['products'].length; i++) {

                id = response['products'][i]['Id'];
                type = response['products'][i]['Type'];
                name = response['products'][i]['Name'];
                description = response['products'][i]['Description'];
                price = response['products'][i]['Price'];
                stock = response['products'][i]['Stock'];
                photo = response['products'][i]['Photo'];

                if (cont == 0) {
                    $('#product-list').append('<div class="row products_list" id="row-prod' + aux + '" style="display: none">');
                    $('#row-prod' + aux).append('<div class="col-lg-4 col-md-6 ' + type + '" id="' + id + '"><div class="card">' +
                        '<div class="view overlay hm-white-slight"> <img src="' + photo + '"' +
                        ' alt="' + name + '" class="img-fluid"></div><div class="card-block">' +
                        '<h4 class="card-title"><strong>' + name + '</strong></h4> <hr> ' +
                        '<p class="card-text">' + description + '</p><div class="card-footer">' +
                        '<span class="left">Stock: ' + stock + '</span> <span class="right">' +
                        '<a data-original-title="Adicionar ao carrinho" type="button" data-toggle="tooltip" ' +
                        'data-placement="top" title="" onclick="add_product_to_cart(this)" class="addcart" > <i class="fa fa-cart-plus"></i> </a>' +
                        ' </span> </div> </div> </div> </div>');
                }
                else {
                    $('#row-prod' + aux).append('<div class="col-lg-4 col-md-6 ' + type + '" id="' + id + '"><div class="card">' +
                        '<div class="view overlay hm-white-slight"> <img src="' + photo + '"' +
                        ' alt="' + name + '" class="img-fluid"></div><div class="card-block">' +
                        '<h4 class="card-title"><strong>' + name + '</strong></h4> <hr> ' +
                        '<p class="card-text">' + description + '</p><div class="card-footer">' +
                        '<span class="left">Stock: ' + stock + '</span> <span class="right">' +
                        '<a data-original-title="Adicionar ao carrinho" type="button" data-toggle="tooltip" ' +
                        'data-placement="top" title="" onclick="add_product_to_cart(this)" class="addcart" > <i class="fa fa-cart-plus"></i> </a>' +
                        ' </span> </div> </div> </div> </div>');
                }
                cont++;
                if (cont >= 3) {
                    $('#product-list').append('</div>');
                    cont = 0;
                    aux++;
                }
                /*
                 <div class="row ">
                 <div class="col-md-12">
                 <div class="col-lg-4 col-md-6">
                 <div class="card">
                 <div class="view overlay hm-white-slight">
                 <img src="Images/Categories/Accessories/collar perro.jpg" alt="Collar para cachorro"
                 class="img-fluid">
                 </div>

                 <div class="card-block">
                 <h4 class="card-title"><strong>Collar para cachorro</strong></h4>

                 <hr>

                 <p class="card-text">Descrição do collar para cachorro.</p>

                 <div class="card-footer">
                 <span class="left">Stock: 40</span>
                 <span class="right">
                 <a href="#" data-original-title="Adicionar ao carrinho" type="button"
                 data-toggle="tooltip" data-placement="top" title="">
                 <i class="fa fa-cart-plus"></i>
                 </a>
                 </span>
                 </div>
                 </div>
                 </div>
                 </div>

                 <div class="col-lg-4 col-md-6">
                 <div class="card">
                 <div class="view overlay hm-white-slight">
                 <img src="Images/Categories/Accessories/kennei-trans-.jpg" alt="Casa para cachorro"
                 class="img-fluid">
                 </div>

                 <div class="card-block">
                 <h4 class="card-title"><strong>Casa para cachorro</strong></h4>

                 <hr>

                 <p class="card-text">Descrição da casa para cachorro.</p>

                 <div class="card-footer">
                 <span class="left">Stock: 15</span>
                 <span class="right">
                 <a href="#" data-original-title="Adicionar ao carrinho" type="button"
                 data-toggle="tooltip" data-placement="top" title="">
                 <i class="fa fa-cart-plus"></i>
                 </a>
                 </span>
                 </div>
                 </div>
                 </div>
                 </div>

                 <div class="col-lg-4 col-md-6">
                 <div class="card">
                 <div class="view overlay hm-white-slight">
                 <img src="Images/Categories/Accessories/plato para perro.jpg" alt="Prato para cachorro"
                 class="img-fluid">
                 </div>

                 <div class="card-block">
                 <h4 class="card-title"><strong>Prato para cachorro</strong></h4>

                 <hr>

                 <p class="card-text">Descrição do collar para cachorro.</p>

                 <div class="card-footer">
                 <span class="left">Stock: 40</span>
                 <span class="right">
                 <a href="#" data-original-title="Adicionar ao carrinho" type="button"
                 data-toggle="tooltip" data-placement="top" title="">
                 <i class="fa fa-cart-plus"></i>
                 </a>
                 </span>
                 </div>
                 </div>
                 </div>
                 </div>
                 </div>
                 </div>
                 */
            }
            $('#row-prod0').show();
            $('#product-list').append('<div class="text-xs-center">' +
                '<button type="button" class="btn light-blue darken-4" onclick="show_more();" id="show-more">Ver mais</button>' +
                '<button type="button" class="btn light-blue darken-4" onclick="show_less();" id="show-less" style="display: none">Ver menos</button></div>');

        }
        else {
            /*Error*/
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
}
function add_product_to_cart(element) {
    var value = parseInt($('#num_of_products').text());
    $('#num_of_products').text(value + 1);
    var element_toadd = $(element).closest('.col-lg-4').attr('id');

    $.post("php/insert_to_cart.php", {'id': element_toadd}, function (response) {
    }, "json").done(function (response) {
        if (response.success == 1) {
            toastr.success("Added");
        }
        else {
            toastr.warning("Error al guardar");
        }
    }).fail(function (xhr) {
        console.log(xhr);
    });

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

    get_products();


    $('a.addcart').click(function () {
        (this).css('pointer-events: none;');
        alert("hola2");
    });

});
