<?php
    $conn = new mysqli("localhost", "root", "", "shopping_kangaroo");
    $conn->set_charset("utf8");
    if($conn->connect_error) {
        die( "Connect Failed");
        
    }
    else {
        //echo "Connect success";
    }
?>