<?php

date_default_timezone_set('America/Sao_Paulo');

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
	echo toJson(padraoResultado($pdo, $sql));
}

if (!empty($_POST['function'])){
	$sql = "INSERT ...";
	echo padraoExecute($pdo, $sql);
}


function log_banco($nomeDaTabela,$identificador,$modificacoes,$tipo,$pdo,$id_usuario){
	// class Log extends PadraoObjeto {
	// 	var $data;
	// 	var $tipo;
	// 	var $descricao;
	// 	var $id_usuario;
	// }

	// $log = new Log();
	// $log->set($id_usuario,			'id_usuario' );
	// $log->set($tipo,				'tipo'		 );
	// $log->set($modificacoes,		'descricao'	 );
	// $log->set(date('Y-m-d H:i:s'),	'data'		 );

	$sql = "SELECT id_$nomeDaTabela, COALESCE(logs, '') AS logs
			FROM $nomeDaTabela 
			WHERE id_$nomeDaTabela = $identificador";
	$recebe = padraoResultado($pdo, $sql);
	$recebe = $recebe[0];

	if ($recebe->get('debug') != "OK") return false;
	// if ($recebe->debug != "OK") return false;

	$logs = array();
	$log = array(
		'data'=> date('Y-m-d H:i:s'),
		'tipo'=> $tipo, 
		'descricao'=> $modificacoes, 
		'id_usuario'=> $id_usuario 
	);

	if ($recebe->get('logs') == '') array_push($logs, $log);
	else 							array_push($logs, json_decode($recebe->get('logs')), $log);

	$logs = json_encode($logs);
	$sql = "UPDATE $nomeDaTabela SET logs = '$logs' WHERE id_$nomeDaTabela = $identificador";
	return padraoExecute($pdo, $sql);
}

?>