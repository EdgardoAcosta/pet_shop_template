/**
 * Created by edgardoacosta on 22/05/17.
 */

function get_cart() {
    $.post("php/get_cart.php", function (response) {
    }, "json").done(function (response) {

        if (response.success == 1) {
            var id, name, description, type, price, stock, photo;
            for (var i = 0; i < response["Cart"].length - 1; i++) {
                id = response["Cart"][i]["Id"];
                name = response["Cart"][i]["Name"];
                type = response["Cart"][i]["Type"];
                description = response["Cart"][i]["Description"];
                price = response["Cart"][i]["Price"];
                stock = response["Cart"][i]["Stock"];
                photo = response["Cart"][i]["Photo"];

                $("#table-cart").append(' <tr id="' + id + '"><td scope="row"><img src="../../' + photo + '" ' +
                    'alt="Prato de cachorro" class="img-fluid z-depth-0"></td> <td>' + name + '</td><td class="price">' + price + '</td>' +
                    '<td><span class="quantity">1</span><div class="btn-group" data-toggle="buttons">' +
                    '<label class="btn btn-sm btn-primary btn-rounded waves-effect waves-light">' +
                    '<input type="radio" name="quantity" onclick="rest_quantity(this)"> - </label>' +
                    '<label class="btn btn-sm btn-primary btn-rounded waves-effect waves-light">' +
                    ' <input type="radio" name="quantity" onclick="add_quantity(this)"> +</label></div></td><td class="total"> ' + price + '</td>' +
                    ' <td><button class="btn btn-sm btn-danger waves-effect waves-light"' +
                    ' data-original-title="Eliminar produto" type="button" data-toggle="tooltip"' +
                    ' data-placement="top" title="">x</button> </td></tr>');
            }
            $("#table-cart").append('<tr id="tr-Total"><td></td><td></td><td></td><td style="text-align: right" >Total</td><td id="total-purch"></td></tr>');
        }
        else {

        }

    }).fail(function (xhr) {
        console.log(xhr);
    });
}
function add_quantity(element) {
    var value = "#" + $(element).closest('tr').attr('id');
    var actual_price = parseFloat($(value).closest('tr').find('td.price').text());
    var quiantity = parseInt($(value).closest('tr').find('td span.quantity').text()) + 1;
    var total = $(element).closest('tr').find('td.total').text(actual_price * quiantity);
    $(value).closest('tr').find('td span.quantity').text(quiantity);
    total_purchase()
}
function rest_quantity(element) {
    var value = "#" + $(element).closest('tr').attr('id');
    var actual_price = parseFloat($(value).closest('tr').find('td.price').text());
    var quiantity = parseInt($(value).closest('tr').find('td span.quantity').text()) - 1;
    if (quiantity < 0) {
        quiantity = 0;
    }
    var total = $(element).closest('tr').find('td.total').text(actual_price * quiantity);
    $(value).closest('tr').find('td span.quantity').text(quiantity);
    total_purchase()
}
function total_purchase() {
    var total = $('.total'), sum = 0;
    for (var i = 0; i < total.length; i++) {
        sum += parseFloat($(total[i]).text());
    }
    $('#total-purch').text("$R " + sum);

}
function finish_purch() {
   // var response = confirm("Tu compra sera procesada");
    var data = [], rowData = {};

    var id,sum, x = 0;
    $("#table-cart tr").not('#tr-Total').each(function() {
        id = $(this).attr("id");
        sum = $("#"+id).closest('tr').find('td span.quantity').text();
        rowData.Id = id;
        rowData.quantity = sum;
        //rowData.Id = id;
        //rowData.quantity = sum;

        //console.log(rowData);
        data[x] = rowData;
        console.log(x);
        x++;
    });
    console.log(data);

/*
    if (response == true) {
        $("#table-cart tr").not('#tr-Total').each(function() {
            id = $(this).attr("id");
            sum = $("#"+id).closest('tr').find('td span.quantity').text();
            rowData.Id = id;
            rowData.quantity = sum;


            console.log(id + " - " + sum);
            console.log(rowData);
            data.push(rowData);
        });

        $.post("php/stock.php",{"products":data, "action":"subtract"}, function (response) {
        }, "json").done(function (response) {
            console.log(response);
            if (response.success == 1) {

                $("#table-cart tr").remove();
                toastr.success(response.msg);
                //window.location.replace("index.html");
            }
            else {
                toastr.warning("Error in order");
            }
        });


    }
    */
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
