<?php
/**
 * Created by PhpStorm.
 * User: edgardoacosta
 * Date: 22/05/17
 * Time: 22:43
 */
$response = array("success" => 1, "error" => 1, "msg" => "");
$ids = [];
$json = file_get_contents("../Json/product.json");
$file = fopen("cart.txt", "r");
$json = json_decode($json, true);
$json = json_encode($json);
$element = json_decode($json);


while (!feof($file)) {
    array_push($ids,fgetc($file));
}
$x = 0;
foreach ($ids as $id) {
    foreach ($element as $item) {
        if ($item->Id == $id) {
            $response["Cart"][$x]["Id"] = $item->Id;
            $response["Cart"][$x]["Type"] = $item->Type;
            $response["Cart"][$x]["Name"] = $item->Name;
            $response["Cart"][$x]["Description"] = $item->Description;
            $response["Cart"][$x]["Price"] = $item->Price;
            $response["Cart"][$x]["Description"] = $item->Description;
            $response["Cart"][$x]["Stock"] = $item->Stock;
            $response["Cart"][$x]["Photo"] = $item->Photo;
            $x++;
        }
    }
}

fclose($file);
echo json_encode($response);

