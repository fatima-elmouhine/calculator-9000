<?php

// include_once('core.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$info = file_get_contents('php://input');
$info = json_decode($info, true);

$calcultation = htmlentities($info['prevCalcul']);
$result =  htmlentities($info['result']);


$db = new PDO('mysql:host=localhost;dbname=calculator', "root", "root");
$sql = "INSERT INTO `calcul_register`(`calculation`, `result`) VALUES (:calculation,:result)";
$query = $db->prepare($sql);
$query->execute([
    'calculation' => $calcultation,
    'result' => $result
]);

$sql = "SELECT * FROM calcul_register";
$query = $db->query($sql);
$result = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);

?>