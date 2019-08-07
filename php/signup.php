<?php
  require_once('db.php');  

  $email = $_POST['email'];
  $pass = $_POST['pass'];

  if(empty($email) || empty($pass)) {
      echo 'error';
  } else {

    $stmt = $connection->prepare("SELECT username, user_password FROM users WHERE username = ?");
    $stmt->bind_param("s", $email);

    $done = $stmt->execute();
    $stmt->store_result();
    $numrows = $stmt->num_rows;

    $stmt->close();

    if($numrows >= 1) {
        echo 'same';
    } else {
        //Enkryptujemy haslo.
        $pass = password_hash($pass, PASSWORD_BCRYPT);

        $stmt = $connection->prepare("INSERT INTO users (username, user_password) VALUES (?, ?)");
        $stmt->bind_param("ss", $email, $pass);
    
        $done = $stmt->execute();
    
        $stmt->close();
        $connection->close();
    
        if($done) {
            echo 'done';
        } else {
            echo 'error';
        }
    }

    

  }

?>
