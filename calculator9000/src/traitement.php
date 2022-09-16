<?php

class Traitement
{
    function __contruct(){
        $user = "root";
        $pass = "root";
        try {
            $this->db = new PDO('mysql:host=localhost;dbname=calculator', $user, $pass);
            echo "connecté";
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }


    }

    
    function addCalculation($calculation, $result){

        $sql = "INSERT INTO calcul-register (`calculation`, `result`) VALUES (:calculation, :result)";
        $query = $this->db->prepare($sql);
        $query->execute([':calculation'=>$calculation, ':result'=>$result]);
    }
}

?>