<?php
	session_start();
	include_once "./common/connection.php";
	if (isset($_POST['id'])) {
		$id = $_POST['id'];
		$sql = "SELECT * FROM product WHERE id ='$id' ";
		$result = mysqli_query($conn,$sql);
        $row = mysqli_fetch_row($result);
        
        if(!isset($_SESSION['cart'])) {
			$cart[$id] = array(
				'name' => $row[1],
				'num' => 1,
				'price' => $row[3],
				'image' => $row[2]
			);
        }
        else {
            $cart = $_SESSION['cart'];
            if(array_key_exists($id, $cart)) {
				$cart[$id] = array(
				'name' => $row[1],
				'num' => (int)$cart[$id]['num'] + 1,
				'price' => $row[3],
				'image' => $row[2]
				);
			}
            else {
				$cart[$id] = array(
				'name' => $row[1],
				'num' => 1,
				'price' => $row[3],
				'image' => $row[2]
				);
			}
        }
        $_SESSION['cart'] = $cart;
        $number = 0;
        foreach($cart as $value) {
            $number += (int)$value['num'];
        }
        echo "<pre>";
        print_r ($_SESSION['cart']);
    } 
?>