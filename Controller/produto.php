<?php

// include "../Classe/conexao.php";
// $conn = new Conexao();
// $pdo = $conn->Connect();

// include "../Classe/entidade/PadraoObjeto.php";
// include "funcoes.php";

// if (empty($_POST['master'])){
	// if (!empty($_POST['hash'])){
	// 	$id_usuario = returnId($pdo, $_POST['hash']); // $_POST['id_usuario'];
	// 	if ($id_usuario === false){
	// 		echo "Não esta logado no sistema";
	// 		return;
	// 	}
	// } else {
	// 	echo "Não esta logado no sistema";
	// 	return;
	// }
// }


if (!empty($_POST['listaProduto'])){
	$sql = "SELECT 
				  produto.*
				, descricao AS ds_categoria
			from produto 
			INNER JOIN categoria ON categoria.id_categoria = produto.id_categoria
			where produto.ck_inativo = 0";
	echo toJson(padraoResultado($pdo, $sql, 'Nenhum resultado encontrado!'));
}


if (!empty($_POST['cadastrarProduto'])){
	$nome 			= $_POST['nome'];
	$cor 			= $_POST['cor'];
	$id_categoria 	= $_POST['categoria'];

	$sql = empty ($_POST['id_produto'])
			? "INSERT INTO produto (nome, cor, id_categoria, id_usuario)
				VALUES ('$nome', '$cor', $id_categoria, $id_usuario)"
			: "UPDATE produto
				SET nome ='$nome'
					cor = '$cor'
					id_categoria = $id_categoria
					id_usuario = $id_usuario
				WHERE id_produto = $id_produto";
	// echo $sql; 
	echo padraoExecute($pdo, $sql, '');
}

if (!empty($_POST['apagarProduto'])){
	$id_produto = $_POST['id_produto'];
	$sql = "UPDATE produto
			SET ck_inativo = 1
			where id_produto = $id_produto" ;
	echo padraoExecute($pdo, $sql, '');
}





?>