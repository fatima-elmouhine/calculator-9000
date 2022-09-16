<?php

// include_once('core.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


$db = new PDO('mysql:host=localhost;dbname=calculator', "root", "root");
$sql = "SELECT * FROM calcul_register";
$query = $db->prepare($sql);
$query->execute();
$result = $query->fetchAll(PDO::FETCH_ASSOC);
$status = (http_response_code());

if($status == 200){
    echo json_encode($result);
}



?>