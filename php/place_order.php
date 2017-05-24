<?php
/**
 * Created by PhpStorm.
 * User: edgardoacosta
 * Date: 23/05/17
 * Time: 20:14
 */
$response = array("success" => 1, "error" => 1, "msg" => "");

$file = fopen("cart.txt", "w");
fclose($file);

$response['error'] = 0;
$response['msg'] = "order place";

echo json_encode($response);