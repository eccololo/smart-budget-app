<?php
    session_start();
   
    require_once('db.php');  
  
    $desc = $_POST['text'];
    $value = $_POST['value'];
    $type = $_POST['type'];
    $user_id = $_SESSION['user_id'];
    $month = $_POST['month'];
    $year = $_POST['year'];
  
    if(empty($desc) || empty($value) || empty($type) || empty($user_id) || empty($month) || empty($year)) {
        echo 'error';
    } else {
      $date = $year . $month . date("d");
      $type = ($type === "inc") ? "plus" : "minus";

      $sql = "INSERT INTO operations(user_id, description, item_date, item_value, balance) ";
      $sql .= "VALUES (?, ?, ?, ?, ?)";  

      $stmt = $connection->prepare($sql);
      $stmt->bind_param("issis", $user_id, $desc, $date, $value, $type);
  
      $done = $stmt->execute();
  
      $stmt->close();
  
      if($done) {
        echo 'done';
      } else {
        // echo $connection->error;
        echo 'error';
      }
  }
  
?>