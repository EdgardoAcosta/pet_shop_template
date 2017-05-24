<?php
/**
 * Manuel Francisco Haro Arroyo: 10223004
 * Edgardo Acosta Leal: 1022755
 * José Richard Tejedo Vega: 10222991
 */

$response = array("success" => 1, "error" => 1, "msg" => "");
$action = "";
$type = "";
$name = "";
$description = "";
$price = "";
$stock = "";
$photo = "";
$array_products = [];
$quantity = 0;
$products = file_get_contents("../Json/product.json");
$jsonString = file_get_contents('jsonFile.json');
if (isset($_POST['action']) && $_POST['action'] != '' ) {
    $action = $_POST['action'];
}
if (isset($_POST['Id']) && $_POST['Id'] != '' ) {
    $action = $_POST['Id'];
}
if (isset($_POST['Type']) && $_POST['Type'] != '' ) {
    $type = $_POST['Type'];
}
if (isset($_POST['Name']) && $_POST['Name'] != '' ) {
    $name = $_POST['Name'];
}
if (isset($_POST['Description']) && $_POST['Description'] != '' ) {
    $description = $_POST['Description'];
}
if (isset($_POST['Price']) && $_POST['Price'] != '' ) {
    $price = $_POST['Price'];
}
if (isset($_POST['Stock']) && $_POST['Stock'] != '' ) {
    $action = $_POST['Stock'];
}
if (isset($_POST['Photo']) && $_POST['Photo'] != '' ) {
    $photo = $_POST['Photo'];
}
if (isset($_POST['products']) && $_POST['products'] != '' ) {
    $array_products = $_POST['products'];
}
if (isset($_POST['quantity']) && $_POST['quantity'] != '' ) {
    $quantity = $_POST['quantity'];
}


if ($action == "add"){
    //Add to stock
}
elseif($action == "subtract"){
    //Substrat from stock

    $data = json_decode($jsonString, true);

    foreach ($products as $prod){
        $response[$prod["Id"]] = $prod["Id"];
    }

    echo json_encode($response);

}
elseif ($action == "new"){
    //Add new item to DB
}
elseif ($action == "remove"){
    //Remove an element from DB

}
else{
    //Error
}