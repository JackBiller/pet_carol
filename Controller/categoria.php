<?php

if (!empty($_POST['listaCategoria'])){
	$sql = "SELECT * from categoria";
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

?>