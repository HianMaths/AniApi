import db from "../db/knexfile";

export const fetchAllAnimes = async () => {
  return await db("animes").select("*");
};

export const buscarAnimes = async (genero?: string, titulo?: string, ano?: string) => {
  let query = db("animes").select("*");

  if (genero) {
    query = query.whereRaw("? = ANY(genero)", [genero]);
  }
  if (titulo) {
    query = query.where("titulo", "ilike", `%${titulo}%`);
  }
  if (ano) {
    const anoNumero = Number(ano);
    if (!isNaN(anoNumero)) {
      query = query.where("ano_lancamento", anoNumero);
    } else {
      throw new Error("O parâmetro 'ano' deve ser um número válido.");
    }
  }

  return await query;
};

export const insertAnimeInDb = async (animeData: any) => {
  return await db("animes").insert(animeData).returning("*");
};

export const fetchAnimeById = async (id: string) => {
  return await db("animes").where({ id }).first();
};

export const deleteAnimeFromDb = async (id: string) => {
  return await db("animes").where({ id }).del();
};

export const updateAnimeInDb = async (id: string, animeData: any) => {
  return await db("animes").where({ id }).update(animeData).returning("*");
};
