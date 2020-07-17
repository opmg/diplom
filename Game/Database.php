<?php

Class Database{

	private $link;

	public function __construct(){
		$this->connect();
	}

	private function connect(){
		$config = require_once 'config.php';
		$dsn='mysql:host='.$config['host'].';dbname='.$config['dbname'].';charset='.$config['charset'];
		$this->link = new PDO($dsn, $config['username'], $config['password']);

		return $this;
	}

	public function execute($sql,$perem){
		$sth=$this->link->prepare($sql);

		$sth->execute($perem);

		$result=$sth->fetchAll(PDO::FETCH_ASSOC);

		return $result;
	}

	public function query($sql){

		$sth=$this->link->query($sql);

		$result=$sth->fetchAll(PDO::FETCH_ASSOC);

		return $result;
	}
}
?>