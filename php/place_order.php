<?php
/**
 * Manuel Francisco Haro Arroyo: 10223004
 * Edgardo Acosta Leal: 1022755
 * José Richard Tejedo Vega: 10222991
 */
$response = array("success" => 1, "error" => 1, "msg" => "");

$file = fopen("cart.txt", "w");
fclose($file);

$response['error'] = 0;
$response['msg'] = "order place";

echo json_encode($response);