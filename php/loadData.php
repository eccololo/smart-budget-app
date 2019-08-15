<?php
    require_once('db.php');
    session_start();

    if(isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])) {
        $user_id = $_SESSION['user_id'];
    } else {
        $user_id = null;
    }

    if(empty($user_id)) {
        echo "error";
    } else {
        $sql = "SELECT item_id, description, item_date, item_value, balance FROM operations WHERE user_id = ?";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param('i', $user_id);
        $stmt->bind_result($item_id, $description, $item_date, $item_value, $balance);
  
        $done = $stmt->execute();

        $JSONoperations = array();

        while($stmt->fetch()) {
            $items = array("item_id" => $item_id, "desc" => $description, "date" => $item_date, 
            "value" => $item_value, "type" => $balance);
            array_push($JSONoperations, $items);
        }

        $JSONoperations = json_encode($JSONoperations);
        
        //var_dump($JSONoperations);
        echo $JSONoperations;

        $stmt->close();
    }

    
?>