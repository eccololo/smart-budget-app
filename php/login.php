<?php
  session_start();

  require_once('db.php');  

  $email = $_POST['email'];
  $pass = $_POST['pass'];

  if(empty($email) || empty($pass)) {
      echo 'error';
  } else {

    $stmt = $connection->prepare("SELECT user_id, username, user_password FROM users WHERE username = ? 
    AND user_password = ?");
    $stmt->bind_param("ss", $email, $pass);

    $done = $stmt->execute();

    $stmt->bind_result($user_id, $username, $user_password);

    if(!empty($user_id)) {
        $_SESSION['user_id'] = $user_id;
    }

    $stmt->store_result();
    $numrows = $stmt->num_rows;

    $stmt->close();
    $connection->close();

    if($numrows === 1) {
        echo 'done';
    } else {
        // echo $connection->error;
        echo 'error';
    }

  }

?>
