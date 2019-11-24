<?php
	session_start();
	include_once "./common/connection.php";
	if (isset($_POST['id']) && isset($_POST['num'])) {
		$id = $_POST['id'];
		$num = $_POST['num'];
		$sql = "SELECT * FROM product WHERE id ='$id' ";
		$result = mysqli_query($conn,$sql);
		$row = mysqli_fetch_row($result);
		if (!isset($_SESSION['cart'])) {
			$cart = array();
			$cart[$id] = array(
				'name' => $row[1],
				'num' => $num,
				'price' => $row[3],
				'image' => $row[2]
			);
		}
		else {
			$cart = $_SESSION['cart'];
			if(array_key_exists($id, $cart)) {
				$cart[$id] = array(
				'name' => $row[1],
				'num' => (int)$cart[$id]['num'] + $num,
				'price' => $row[3],
				'image' => $row[2]
				);
			}
			else {
				$cart[$id] = array(
				'name' => $row[1],
				'num' => $num,
				'price' => $row[3],
				'image' => $row[2]
				);
			}
		}
		$_SESSION['cart'] = $cart ;
		$numCart = 0;
		foreach ($cart as $key => $value) {
			$numCart ++ ;
		}
		echo $numCart;
	} 
?>