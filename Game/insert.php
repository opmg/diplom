<?php
	session_start();
	require_once 'Database.php';
  	$db= new Database;
  	
	$login=$_SESSION['logged_user'];
	$id_u=$db->execute("SELECT id FROM `users` WHERE `login`=:login",array('login'=>$login));
	$id_u=$id_u[0]['id'];

	$Ball=$_POST['Ball'];
	$TestResult=$_POST['TestResult'];
	$Spec=$_POST['Spec'];
	if($Spec=='es'){
		$Spec='eo';
	};

	if($Spec=='eo'){
		$Spec='es';
	};

	$GameResult=$_POST['GameResult'];

	print_r($_POST);


	$db->execute("INSERT INTO `usersresult` SET `id_user`=:id_u, `date`= CURTIME(), `testAnswers`=:TestResult, `pracTotal`=:GameResult, `testTotal`=:Ball, `id_spec`=:Spec", array('id_u'=> $id_u, 'TestResult'=> $TestResult, 'GameResult'=>$GameResult, 'Spec'=>$Spec, 'Ball'=>$Ball));
?>