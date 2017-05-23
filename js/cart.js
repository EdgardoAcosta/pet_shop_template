/**
 * Created by edgardoacosta on 22/05/17.
 */

function get_cart() {
    $.post("php/get_cart.php", function (response) {
    }, "json").done(function (response) {

        if (response.success == 1){
            var id, name, description, type, price, stock, photo;
            for (var i = 0; i < response["Cart"].length - 1; i++){
                id = response["Cart"][i]["Id"];
                name = response["Cart"][i]["Name"];
                type = response["Cart"][i]["Type"];
                description = response["Cart"][i]["Description"];
                price = response["Cart"][i]["Price"];
                stock = response["Cart"][i]["Stock"];
                photo = response["Cart"][i]["Photo"];

                $("#table-cart").append(' <tr id="'+id+'"><td scope="row"><img src="../../'+photo+'" ' +
                    'alt="Prato de cachorro" class="img-fluid z-depth-0"></td> <td>'+name+'</td><td class="price">'+price+'</td>' +
                    '<td><span class="quantity">1</span><div class="btn-group" data-toggle="buttons">' +
                    '<label class="btn btn-sm btn-primary btn-rounded waves-effect waves-light">' +
                    '<input type="radio" name="quantity"> - </label>' +
                    '<label class="btn btn-sm btn-primary btn-rounded waves-effect waves-light">' +
                    ' <input type="radio" name="quantity" onclick="add_quantity(this)"> +</label></div></td><td class="total" ">R$ '+price+'</td>' +
                    ' <td><button class="btn btn-sm btn-danger waves-effect waves-light"' +
                    ' data-original-title="Eliminar produto" type="button" data-toggle="tooltip"' +
                    ' data-placement="top" title="">x</button> </td></tr>');
            }
        }
        else {

        }

    }).fail(function (xhr) {
        console.log(xhr);
    });
}
function add_quantity(element) {
    console.log("click + ");
    var value = "#" + $(element).closest('tr').attr('id');
    console.log(value);
    var actual_price = parseFloat($(value).closest('td .price').text());


    console.log("price " + $(value).closest('td .price'));
    var quiantity = parseInt($(element).closest('.quantity').text()) + 1;
    console.log("new quantity " + quiantity);
    var total = $(element).closest('.total').text(actual_price * quiantity);
    console.log("total " + total);
    $(element).closest('.quantity').text(quiantity);
}
function rest_quantity() {

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

    get_cart();

});
