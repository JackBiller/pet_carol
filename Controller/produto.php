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


if (!empty($_POST['listaProduto'])){
	$sql = "SELECT * from produto";
	echo toJson(padraoResultado($pdo, $sql, 'Nenhum resultado encontrado!'));
}


if (!empty($_POST['cadastrarProfuto'])){
	$nome 			= $_POST['nome'];
	$cor 			= $_POST['cor'];
	$id_categoria 	= $_POST['categoria'];

	$sql = "INSERT INTO produto (nome, cor, id_categoria, id_usuario)
			VALUES ('$nome','$cor',$id_categoria,$id_usuario)";
	// echo $sql; 
	echo padraoExecute($pdo, $sql, '');
}

?>