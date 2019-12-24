<?php

if (!empty($_POST['listaCategoria'])){
	$sql = "SELECT * FROM categoria WHERE ck_inativo = 0";
	echo toJson(padraoResultado($pdo, $sql, 'Nenhum resultado encontrado!'));
}


if (!empty($_POST['cadastrarCategoria'])){
	$descricao = $_POST['descricao'];

	$sql = empty($_POST['id_categoria'])
			? "INSERT INTO categoria (descricao, id_usuario)
				VALUES ('$descricao', $id_usuario)"
			: "UPDATE categoria
				SET   descricao 	= '$descricao'
					, id_usuario 	= $id_usuario
				WHERE id_categoria 	= " . $_POST['id_categoria'];
	// echo $sql;
	echo padraoExecute($pdo, $sql, '');
}


if (!empty($_POST['apagarCategoria'])){
	$id_categoria = $_POST['id_categoria'];
	$sql = "UPDATE categoria SET ck_inativo = 1 WHERE id_categoria = $id_categoria";
	echo padraoExecute($pdo, $sql, '');
}



?>