<?php

include "../Classe/conexao.php";
$conn = new Conexao();
$pdo = $conn->Connect();

include "../Classe/entidade/PadraoObjeto.php";
include "funcoes.php";


if (!empty($_POST['login']) && !empty($_POST['senha'])){
	$login = $_POST['login'];
	$senha = $_POST['senha'];

	$sql = "SELECT 
				  nome
				, hash
			FROM usuario
			WHERE login = '$login'
			AND senha = PASSWORD('$senha')";

	echo toJson(padraoResultado($pdo, $sql, 'Nenhum resultado encontrado!'));
}


?>