<?php

include "../Classe/conexao.php";
$conn = new Conexao();
$pdo = $conn->Connect();

include "../Classe/entidade/PadraoObjeto.php";
include "funcoes.php";



// if (empty($_POST['master'])){
	if (!empty($_POST['hash'])){
		$id_usuario = returnId($pdo, $_POST['hash']); // $_POST['id_usuario'];
		if ($id_usuario === false){
			echo "Não esta logado no sistema";
			return;
		}
	} else {
		echo "Não esta logado no sistema";
		return;
	}
// }


include 'categoria.php';
include 'produto.php';


if (!empty($_POST['function'])){
	$sql = "SELECT ...";
	echo toJson(padraoResultado($pdo, $sql, 'Nenhum resultado encontrado!'));
}

if (!empty($_POST['function'])){
	$sql = "INSERT ...";
	echo padraoExecute($pdo, $sql, '');
}

?>