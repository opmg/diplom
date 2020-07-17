<?php
session_start();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
  <script src="assets/js/jquery.maskedinput.js"></script>
	<link rel="stylesheet" href="assets/style/style.css" type="text/css">
	<meta charset="UTF-8">
	<title>Авторизация</title>
</head>
<body class= "stateGame">
	<div class="login-page">
  	<div class="form">
    <form class="register-form" method="POST" action="/">
      <input type="text" placeholder="Логин" class="input" name="RegLogin">
      <input type="text" placeholder="Имя Фамилия" class="input" name="RegFI">
      <input type="password" placeholder="Пароль" class="input" name="RegPassword">
      <input type="text" placeholder="Телефон" class="input" name="RegNumber" id="phone">
      <input type="submit" class="button" value="зарегестрироваться" name="Reg">
      <p class="message">Уже зарегестрированы? <a href="#">Войти</a></p>
    </form>
    <form class="login-form" method="POST" action="/">
      <input type="text" placeholder="Логин" class="input" name="login">
      <input type="password" placeholder="Пароль" class="input" name="password">
      <input type="submit" class="button" value="войти" name="OK">
      <p class="message">Не зарегестрированы? <a href="#">Регистрация</a></p>
    </form>
  	</div>
	</div>
	<script>
		$('.message a').click(function(){
   		$('form').animate({height: "toggle", opacity: "toggle"}, "slow");
		});
    $(function() {
    $("#phone").mask("+7(999) 999-9999");
    });
	</script> 

  <?php
  require_once 'Database.php';
  $db= new Database;
  if(isset($_POST['Reg'])){
  if($_POST['RegLogin']!='' && $_POST['RegFI']!='' && $_POST['RegPassword']!='' && $_POST['RegNumber']!=''){
    
    $Reg=$_POST['Reg'];
    $RegLogin=$_POST['RegLogin'];
    $RegFI=$_POST['RegFI'];
    $RegPassword=$_POST['RegPassword'];
    $RegNumber=$_POST['RegNumber'];
    $logins=$db->execute ("SELECT * FROM users WHERE login=:RegLogin ", array('RegLogin'=>$RegLogin));
    if ($logins[0]==''){
    $db->execute("INSERT INTO `users` SET `login`=:RegLogin, `FI`=:RegFI, `password`=:RegPassword, `phoneNumber`=:RegNumber, `is_admin`='0'", array('RegLogin'=> $RegLogin, 'RegFI'=> $RegFI, 'RegPassword'=>$RegPassword, 'RegNumber'=>$RegNumber));
    }else{
      echo '<h3 style="color: #F8173E; background-color:rgba(255, 255, 255, 0.8);">Логин уже существует. Войдите в систему со своим логином, или зарегестрийте новый.</h3>';
     }

    }else{
      echo '<h3 style="color: #F8173E;  background-color:rgba(255, 255, 255, 0.8)">Заполнены не все поля формы!</h3>';
  }
  }

  if(isset($_POST['OK'])){
    if($_POST['login']!='' && $_POST['password']!=''){
       
      $login=$_POST['login'];
      $password=$_POST['password'];
      $res=$db->execute ("SELECT * FROM users WHERE login=:login AND password=:password", array('login'=>$login, 'password'=>$password));
      $is_admin=$res[0]['is_admin'];
      if ($res[0]!=0 && $is_admin==0){
         $_SESSION['logged_user']=$login;
         echo '<script type="text/javascript">
         window.location = "game.php"
        </script>';
      }else if ($res[0]!=0 && $is_admin==1){
        $_SESSION['logged_user']='Admin';
        echo '<script type="text/javascript">
         window.location = "adminPanel.php"
        </script>';
      }else{
        echo '<h3 style="color: #F8173E;  background-color:rgba(255, 255, 255, 0.8)">Не верный логин или пароль!</h3>';
      }
    }else{
      echo '<h3 style="color: #F8173E;  background-color:rgba(255, 255, 255, 0.8)">Вы не ввели логин или пароль!</h3>';
    }
  }
    ?>
</body>
</html>