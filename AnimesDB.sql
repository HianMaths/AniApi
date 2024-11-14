CREATE TABLE animes (
    id VARCHAR(255) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    sinopse TEXT,
    genero VARCHAR(255)[],
    numero_episodios INT,
    status VARCHAR(50) CHECK (status IN ('em_exibicao', 'finalizado', 'cancelado')),
    ano_lancamento INT,
    imagem_url VARCHAR(255)
);

CREATE TABLE episodios (
    id VARCHAR(255) PRIMARY KEY,
    anime_id VARCHAR(255) REFERENCES animes(id) ON DELETE CASCADE,
    titulo VARCHAR(255),
    descricao TEXT,
    numero INT NOT NULL
);


CREATE TABLE personagens (
    id VARCHAR(255) PRIMARY KEY,
    anime_id VARCHAR(255) REFERENCES animes(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    imagem_url VARCHAR(255)
);