<?php
    session_start();

    if(isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])) {
        echo 'done';
    } else {
        echo 'error';
    }
?>