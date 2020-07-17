<?php
 session_start();
 if(!isset($_SESSION['logged_user'])){
     header("Location: index.php");
     exit;
 }
 $name=$_SESSION['logged_user'];
 ?>
<!Doctype HTML>
<HTML>
	<head>
		<script
		src="https://code.jquery.com/jquery-1.12.3.min.js"
		integrity="sha256-aaODHAgvwQW1bFOGXMeX+pC4PZIPsvn2h1sArYOhgXQ="
		crossorigin="anonymous"></script>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="assets/style/style.css" type="text/css">
	</head>
	<body class= "stateGame">
		<div class="logo">
    		<?php echo "<span> Привет, $name</span>"; ?>
    		<a href="/destroy.php" class="exit">Выход</a>
    	</div>
		<div id="game"></div>
		<script src="assets/js/phaser.js"></script>
		<script src="assets/js/game.js"></script>
	</body>
</HTML>