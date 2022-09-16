<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$db = new PDO('mysql:host=localhost;dbname=calculator', "root", "root");
$info = file_get_contents('php://input');
$info = json_decode($info, true); 
if($info !== null){
    $id=  htmlentities($info['id']);
    $sql = "DELETE FROM calcul_register WHERE id = ?";
    $query = $db->prepare($sql);
    $query->execute([$id]);

}else{
    $sql = "DELETE FROM calcul_register";
    $query = $db->query($sql);
}


echo json_encode('bien supprimé');




?>