<?php
/**
 * Manuel Francisco Haro Arroyo: 10223004
 * Edgardo Acosta Leal: 1022755
 * José Richard Tejedo Vega: 10222991
 */
#Create response json array
$response = array("success" => 1, "error" => 1, "msg" => "");

#Check if the POST have a value
if (isset($_POST['action']) && $_POST['action'] != '' ) {
    $action = $_POST['action'];
    #Read Json file
    #This will change to work with a DB
    $json = file_get_contents("../Json/product.json");
    $json = json_decode($json,true);

}
else{

    $response["success"] = 0;
    $response["msg"] = "Post error";
    echo json_encode($response);
    exit();
}


if ($action == "get"){
    $response["products"] = $json;

}
elseif ($action == "update"){

}
elseif ($action == "remove"){

}
else{
    $response["success"] = 0;
    $response["error"] = 1;
    $response["msg"] = "No option selected";
}
echo json_encode($response);
exit();
