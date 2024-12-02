# AniApi
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)   ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)     ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)    ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)


A AniApi é uma API que se dedica à gestão dos dados relativos à animes, episódios e personagens. Ela fornece uma interface completa usada para acessar, manipular e mostrar dados detalhados dos animes, incluindo dados sobre seus episódios e seus personagens principais, caso ainda tenha alguma duvida em relação aos seus métodos, abaixo, estará um link que leva à documentação da API no Postman, com todos os seus endpoints devidamente explicados

https://documenter.getpostman.com/view/38010881/2sAYBYfVXN

# Banco de Dados (PostgreSQL)
Seu banco de dados foi criado pensando em praticidade e facilidade de seu uso e da implementação de novos recursos, contendo somente três tabelas referentes ao conteúdo presente na AniApi, seu script está presente no trabalho, caso tenha curiosidade de como foi feito e como suas tabelas estão ligadas umas às outras

# Variáveis de Ambiente
Em nosso projeto, também contamos com um arquivo .env.example para definir as variáveis de ambiente necessárias para a conexão com o nosso banco de dados (AnimeDB).

# Composição de pastas
Este projeto é organizado da seguinte forma:

````

src/
├── controllers/     # Lógica para manipulação de requisições e respostas
│   ├── animeController.ts      # Controlador para animes
│   ├── episodioController.ts   # Controlador para episódios
│   └── personagemController.ts # Controlador para personagens
├── dataApi/         # Dados consumidos pela API
│   ├── animeData.ts           # Dados e funções relacionadas aos animes
│   ├── episodioData.ts        # Dados e funções relacionadas aos episódios
│   └── personagemData.ts      # Dados e funções relacionadas aos personagens
├── db/              # Configuração e modelos do banco de dados
│   └── knexfile.ts           # Configuração do Knex.js para conexão com o banco
├── routes/          # Definição de rotas da API
│   ├── animeRoutes.ts         # Rotas para animes
│   ├── episodioRoutes.ts      # Rotas para episódios
│   └── personagemRoutes.ts    # Rotas para personagens
├── server/          # Configuração do servidor
│   └── server.ts             # Inicialização do servidor (Express, etc.)
├── services/        # Lógica de negócios e integração entre camadas
│   ├── animeService.ts        # Lógica de negócio para animes
│   ├── episodioService.ts     # Lógica de negócio para episódios
│   └── personagemService.ts   # Lógica de negócio para personagens
├── .env.example          # Exemplo de variáveis de ambiente
└── AnimesDB.sql          # Arquivo SQL para inicialização ou backup do banco de dados
       
````

# Como rodar o projeto
Para rodar este projeto localmente, siga os passos abaixo:

1. Clone o repositório: 
   ```bash
   git clone https://github.com/HianMaths/AniApi.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação: 
   ```bash
   npm start
   ```

A partir deste comando, a aplicação será executada em `http://localhost:3000`.


# Colaboradores do projeto
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/HianMaths" title="link para o perfil do github">
        <img src="https://avatars.githubusercontent.com/u/153470472?v=4" width="100px;" alt="Foto do Hian Matheus no GitHub"/><br>
        <sub>
          <b>Hian Matheus</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Yuque7" title="link para o perfil do github">
        <img src="https://avatars.githubusercontent.com/u/103937617?v=4" width="100px;" alt="Foto do Yuri Queiroz no GitHub"/><br>
        <sub>
          <b>Yuri Queiroz</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ArthurSilva902" title="link para o perfil do github">
        <img src="https://avatars.githubusercontent.com/u/180798363?v=4" width="100px;" alt="Foto do Athur Silvino"/><br>
        <sub>
          <b>Arthur Silvino</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
