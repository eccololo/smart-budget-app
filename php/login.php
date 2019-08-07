<?php
  session_start();

  require_once('db.php');  

  $email = $_POST['email'];
  $pass = $_POST['pass'];

  if(empty($email) || empty($pass)) {
      echo 'error';
  } else {

    $stmt = $connection->prepare("SELECT user_id, username, user_password FROM users WHERE username = ?");
    $stmt->bind_param("s", $email);

    $done = $stmt->execute();

    $stmt->bind_result($user_id, $username, $user_password);

    $stmt->store_result();
    $numrows = $stmt->num_rows;

    $stmt->fetch();

    if(!empty($user_id)) {
      $_SESSION['user_id'] = $user_id;
    }

    $stmt->close();
    $connection->close();

    if(password_verify($pass, $user_password) && ($numrows === 1)) {
      echo 'done';   
    } else {
      // echo $connection->error;
      echo 'error';
  }

    

  }

?>
