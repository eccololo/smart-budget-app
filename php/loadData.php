<?php
    require_once('db.php');
    session_start();

    $user_id = $_SESSION['user_id'];
    if(empty($user_id)) {
        echo "error";
    }

    $sql = "SELECT (item_id, description, item_date, item_value, balance) FROM operations WHERE user_id = ?";
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('i', $user_id);
    $stmt->bind_result($item_id, $description, $item_date, $item_value, $balance);
  
    $done = $stmt->execute();

    $JSONoperations = array();

    while($stmt->fetch()) {
        $JSONoperations.push(array($item_id, $description, $item_date, $item_value, $balance));
    }

    $JSONoperations = json_encode($JSONoperations);
    echo var_dump($JSONoperations) . $user_id;
  
    $stmt->close();
?>