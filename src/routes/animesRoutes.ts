import express, { Request, Response } from "express";
import db from "../db/knexfile";

const router = express.Router();


//ROTA PARA ACESSAR TODOS OS ANIMES
router.get('/', async (req, res) => {
  console.log("Rota /anime acessada - Método GET");
  try {
    const anime = await db("animes").select("*");
    res.status(200).json(anime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar animes" });
  }
});


//ROTA PARA ADICIONAR UM NOVO ANIME
router.post('/', async (req: Request, res: Response) => {
  try{
  const { titulo,sinopse, genero, numero_episodios, status, ano_lancamento, imagem_url } = req.body;

  console.log("Rota /anime acessada - Método POST");

  if (! titulo || !sinopse || !genero || !numero_episodios || !status || !ano_lancamento || !imagem_url) {
     res.status(401);
    throw new Error("Dados do anime incompletos")
  }
    const newAnime = await db("animes").insert({ titulo,sinopse, genero, numero_episodios, status, ano_lancamento, imagem_url }).returning("*");
    res.status(201).json(newAnime);
  } catch (error:any) {
    const message = error.sqlMessage || error.message
    res.json(message);
  }
});

//ROTA QUE BUSCA UM ANIME PELO SEU ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(`Rota /anime/${id} acessada - Método GET`);

  try {
    const anime = await db("animes").where({ id }).first();

    if (anime) {
      res.status(200).json(anime);
    } else {
      res.status(404).json({ error: "Anime não encontrado." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar anime." });
  }
});

//ROTA PARA DELETAR UM ANIME PELO SEU ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log(`Rota /anime/${id} acessada - Método DELETE`);

  try {
    const deletedAnime = await db("animes").where({ id }).del();

    if (deletedAnime) {
      res.status(200).json({ success: "Anime deletado com sucesso." });
    } else {
      res.status(404).json({ error: "Anime não encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao remover anime" });
  }
});
export default router;
