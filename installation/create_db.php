<?php
    $db["db_host"] = 'localhost';
    $db["db_user"] = 'root';    
    $db["db_pass"] = '';    
    $db["db_name"] = 'BudgetApp';
      
    foreach($db as $key => $value) {
        define(strtoupper($key), $value); 
    }

    $str = array();

    $connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS);
    
    if(!$connection) {
        die("Database connection failed.");
    }
?>
<?php


    $sql = "DROP DATABASE IF EXISTS " . DB_NAME;
    if (mysqli_query($connection, $sql) === FALSE) {
        die("Error during dropping database: " . mysqli_error($connection));
    } else {
        array_push($str, "Prevention of doubling databases - OK.");
     
    }
    
    // Create database
    $sql = "CREATE DATABASE ". DB_NAME;
    if (mysqli_query($connection, $sql) === FALSE) {
        die("Error during creating database: " . mysqli_error($connection));
    } else {
        array_push($str, "Database " . DB_NAME . " has been created");
         
    }

    mysqli_close($connection); 
    

?>
<?php

    $connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if(!$connection) {
        die("Database connection failed.");
    }

?>

<?php
//    CREATING USERS TABLE
    $sql = "CREATE TABLE users (
          user_id int(3) NOT NULL AUTO_INCREMENT,
          username varchar(255) NOT NULL,
          user_password varchar(255) NOT NULL,
          INDEX( username ),
          PRIMARY KEY( user_id ))"; 
    
    if (mysqli_query($connection, $sql) === FALSE) {
        die("Error during creating table users: " . mysqli_error($connection));
    } else {
        array_push($str, "Table users has been created");
    }
?>

<?php
//    CREATING Operations TABLE
    $sql = "CREATE TABLE operations (
          item_id int(3) NOT NULL AUTO_INCREMENT,
          user_id int(3) NOT NULL,
          item_date date NOT NULL,
          item_value FLOAT(9,2) NOT NULL,
          balance ENUM('plus','minus'),
          INDEX( user_id ),
          PRIMARY KEY( item_id ))"; 
    
    if (mysqli_query($connection, $sql) === FALSE) {
        die("Error during creating table operations: " . mysqli_error($connection));
    } else {
        array_push($str, "Table operations has been created");
    }

    print_r($str);

    mysqli_close($connection); 
?>