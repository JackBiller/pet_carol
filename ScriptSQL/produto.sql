

CREATE TABLE categoria(
	id_categoria INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(20) NOT NULL,
	id_usuario INT NOT NULL,
	ck_inativo INT(1) NOT NULL DEFAULT 0
);

ALTER TABLE categoria
ADD CONSTRAINT fk_categoria__usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario);



CREATE TABLE produto(
	id_produto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	cor VARCHAR(10) NOT NULL,
	id_categoria INT NOT NULL,
	id_usuario INT NOT NULL,
	ck_inativo INT(1) NOT NULL DEFAULT 0
);

ALTER TABLE produto
ADD CONSTRAINT fk_produto__categoria FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria);

ALTER TABLE produto
ADD CONSTRAINT fk_produto__usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario);