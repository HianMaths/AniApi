import db from "../db/knexfile";

export const fetchPersonagemById = async (id: string) => {
  return await db("personagens").where({ id }).first();
};

export const fetchPersonagensByAnimeId = async (animeId: string) => {
  return await db("personagens").where({ anime_id: animeId });
};

export const insertPersonagemInDb = async (personagemData: any) => {
  return await db("personagens").insert(personagemData).returning("*");
};

export const updatePersonagemInDb = async (id: string, personagemData: any) => {
  return await db("personagens").where({ id }).update(personagemData).returning("*");
};

export const deletePersonagemFromDb = async (id: string) => {
  return await db("personagens").where({ id }).del();
};

export const buscarPersonagens = async (nome?: string, descricao?: string) => {
  let query = db("personagens").select("*");

  if (nome) {
    query = query.where("nome", "ilike", `%${nome}%`);
  }
  if (descricao) {
    query = query.where("descricao", "ilike", `%${descricao}%`);
  }

  return await query;
};