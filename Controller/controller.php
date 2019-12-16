<?php

include "../Classe/conexao.php";
$conn = new Conexao();
$pdo = $conn->Connect();

include "../Classe/entidade/PadraoObjeto.php";
include "funcoes.php";


if (!empty($_POST['function'])){
	$sql = "SELECT ...";
	echo toJson(padraoResultado($pdo, $sql, 'Nenhum resultado encontrado!'));
}

if (!empty($_POST['function'])){
	$sql = "INSERT ...";
	echo padraoExecute($pdo, $sql, '');
}

?>