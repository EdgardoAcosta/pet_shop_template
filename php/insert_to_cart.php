<?php
/**
 * Manuel Francisco Haro Arroyo: 10223004
 * Edgardo Acosta Leal: 1022755
 * José Richard Tejedo Vega: 10222991
 */
#Create response json array
$response = array("success" => 1, "error" => 0, "msg" => "");

$id_prod = "";
#Check if the POST have a value
if (isset($_POST['id']) && $_POST['id'] != '' ) {
    $id_prod = $_POST['id'] + "\n";
    #write Json file
    #This will change to work with a DB

    file_put_contents("cart.txt", $id_prod, FILE_APPEND);

    $response['msg'] = "element added";
    echo json_encode($response);
}
else{
    $response['msg'] = "element added";
    $response['success'] = 0;
    $response['error'] = 1;
    echo json_encode($response);

}