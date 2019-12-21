-- Script Usuario

CREATE TABLE usuario(
	id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nome 	VARCHAR(50) NOT NULL,
	login 	CHAR(3) 	NOT NULL UNIQUE,
	senha 	VARCHAR(50) NOT NULL,
	hash 	VARCHAR(50) NOT NULL
);

INSERT INTO usuario (nome, login, senha, hash)
VALUES ('Administrador','ADM',PASSWORD('123'),PASSWORD('1123'));
