<?php
 session_start();
 if($_SESSION['logged_user']!='Admin'){
     header("Location: index.php");
     exit;
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <link rel="stylesheet" href="assets/style/adminStyle.css" type="text/css">
	<meta charset="UTF-8">
	<title>Панель Администратора</title>
</head>
<body>
  <article>
    <div class="logo">
    <p>Панель Администратора</p>
    <a href="/destroy.php" class="exit">Выход</a>
  </div>
  	<form action="/adminPanel.php" method="GET">
  		<label><input type="radio" name="btn" value="users_list" id="all">Все пользователи.</label><br>
  		<label><input type="radio" name="btn" value="test_50" id="t_50">Топ 50 тестов пользователей.</label><br>
  		<label><input type="radio" name="btn" value="prac_50" id="p_50">Топ 50 парктической части пользователей.</label><br>
  		<select size="1" name="spc[]" id="sel">
  		    <option selected disabled>Выберите специальность для топа</option>
  		    <option value="es">Электрические станции сети и системы</option>
  		    <option value="eo">Техническая эксплуатация и обслуживание электрического и электротехнического оборудования</option>
  		    <option value="kip">Мастер контрольно-измерительных приборов и автоматики</option>
  		    <option value="ksk">Компьютерные системы и комплексы</option>
  		    <option value="prog">Информационные системы и программирование</option>
  		    <option value="byx">Экономика и бухгалтерский учёт</option>
  	   	</select><br>
  		<label><input type="submit" name="OK" value="отобразить"></label>
  	</form>
    <script type="text/javascript">  
        var all=document.getElementById('all');
        var t_50=document.getElementById('t_50');
        var p_50=document.getElementById('p_50');
        var sel=document.getElementById('sel');
        sel.disabled=true;
        t_50.onclick = function(){
            sel.disabled=false;
            sel.style='background-color:#ed9a9a;'
        };
        p_50.onclick = function(){
            sel.disabled=false;
            sel.style='background-color:#ed9a9a;'
        };
        all.onclick = function(){
          sel.disabled=true;
          sel.style='background-color:#fff;'
        }
    
    </script>
	<?php
	if(isset($_GET)){
		
		require_once 'Database.php';
  		$db = new Database;

  		if($_GET['btn']=='users_list'){
        echo '<p>Все пользователи</p>';
        echo '<table border="1" width="100%" cellpadding="5">'; 
        echo '<tr> <th>Фамилия Имя</th> <th>Идентификатор</th>';
  			$users_list=$db->query("SELECT `FI`,`id` FROM `users` WHERE `is_admin`='0'");
  			foreach ($users_list as $key1 => $one_user) {
          echo '<tr>';
  				foreach ($one_user as $key2 => $name)
  					if($key2=='FI'){
  						$id=$one_user['id'];
  						echo "<td> <a href=/adminPanel.php?id=$id>$name</a> </td>";
  					}else{
              echo "<td>$name</td>";
            }
          echo '</tr>';
  			}
        echo '</table>';
  		}

  		if($_GET['id']!=''){
  			$id=$_GET['id'];
  			$user_res=$db->execute("SELECT * FROM `usersresult` WHERE `id_user`=:id", array('id'=>$id));
  			$user_info=$db->execute("SELECT `FI`,`login`,`password`,`phoneNumber` FROM `users` WHERE `id`=:id",array('id'=>$id));
  			echo '<p>Информация о пользователе</p>';
  			echo '<table border="1" width="100%" cellpadding="5">';
        echo '<tr> <th>Фамилия Имя</th> <th>Логин пользователя</th> <th>Пароль пользователя</th> <th>Номер телефона</th> </tr>';
  			foreach ($user_info as $key1 => $oneZ) {
  				echo '<tr>';
  				foreach ($oneZ as $key2 => $value) {
  					 
  					echo "<td> $value </td>";
  				}
  				echo '</tr>';
  			}
  			echo '</table>';
  			echo '<p>Результаты пользователя</p>';
			echo '<table border="1" width="100%" cellpadding="5">';
			echo '<tr> <th>id попытки</th> <th>id пользователя</th> <th>Дата попытки</th> <th>Ответы теста</th> <th>Результат практики</th> <th>Результат теста </th><th>Специальность</th>';
  			foreach ($user_res as $key1 => $oneSession) {
  				echo '<tr>';
  				foreach ($oneSession as $key2 => $value) {
  					echo "<td> $value </td>";
  				}
  				echo '</tr>';
  			}
  			echo '</table>';
  		}

  		if($_GET['btn']=='test_50' && $_GET['spc']!=''){
  			$spc=$_GET['spc'][0];
        echo "<p>Топ 50 тестов для специальности $spc</p>";
  			$topTest=$db->execute("SELECT `users`.`id`, `FI`,`PhoneNumber`, `testTotal`  FROM `users`,`usersresult` WHERE  `users`.`id`=`usersresult`.`id_user` AND `id_spec`=:spc ORDER BY `testTotal` DESC LIMIT 50",array('spc'=>$spc));
  			echo '<table border="1" width="100%" cellpadding="5">';
			echo '<tr> <th>id</th> <th>Имя Фамилия</th> <th>Телефон</th> <th>Баллы теста</th>';
  			foreach ($topTest as $key1 => $oneSession) {
  				echo '<tr>';
  				foreach ($oneSession as $key2 => $value) {
            if($key2=='FI'){
              $id=$oneSession['id'];
              echo "<td> <a href=/adminPanel.php?id=$id>$value</a> </td>";
            }else{
  					echo "<td> $value </td>";
          }
  				}
  				echo '</tr>';
  			}
  			echo '</table>';
  		}

  		if($_GET['btn']=='prac_50' && $_GET['spc']!=''){
  			$spc=$_GET['spc'][0];
  			echo "<p>Топ 50 практической части для специальности $spc</p>";
  			$topPrac=$db->execute("SELECT `users`.`id`, `FI`,`PhoneNumber`, `pracTotal`  FROM `users`,`usersresult` WHERE  `users`.`id`=`usersresult`.`id_user` AND `id_spec`=:spc ORDER BY `pracTotal` DESC LIMIT 50",array('spc'=>$spc));
  			echo '<table border="1" width="100%" cellpadding="5">';
			echo '<tr> <th>id</th> <th>Имя Фамилия</th> <th>Телефон</th> <th>Баллы практической части</th>';
  			foreach ($topPrac as $key1 => $oneSession) {
  				echo '<tr>';
  				foreach ($oneSession as $key2 => $value) {
            if($key2=='FI'){
              $id=$oneSession['id'];
              echo "<td> <a href=/adminPanel.php?id=$id>$value</a> </td>";
            }else{
  					echo "<td> $value </td>";
          }
  				}
  				echo '</tr>';
  			}
  			echo '</table>';
  		}

  	}
	?>
</article>
</body>
</html>