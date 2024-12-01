import { v7 as uuidv7 } from "uuid";
import {
  fetchPersonagemById,
  fetchPersonagensByAnimeId,
  insertPersonagemInDb,
  updatePersonagemInDb,
  deletePersonagemFromDb,
  buscarPersonagens
} from "../dataApi/personagensData";

export const buscarPersonagemPorIdService = async (id: string) => {
  const personagem = await fetchPersonagemById(id);
  if (!personagem) {
    const error = new Error("Personagem não encontrado.");
    (error as any).status = 404;
    throw error;
  }
  return personagem;
};

export const buscarPersonagensPorAnimeIdService = async (animeId: string) => {
  const personagens = await fetchPersonagensByAnimeId(animeId);
  if (personagens.length === 0) {
    const error = new Error("Nenhum personagem encontrado para este anime.");
    (error as any).status = 404;
    throw error;
  }
  return personagens;
};

export const criarPersonagemService = async (animeId: string, personagemData: any) => {
  const { nome, descricao, imagem_url } = personagemData;

  if (!nome || !descricao || !imagem_url) {
    const error = new Error("Os dados do personagem estão incompletos");
    (error as any).status = 400;
    throw error;
  }

  const id = uuidv7();
  return await insertPersonagemInDb({ id, ...personagemData, anime_id: animeId });
};

interface PersonagemData {
  nome: string;
  descricao: string;
  imagem_url: string;
}
export const atualizarPersonagemService = async (
  id: string,
  personagemData: PersonagemData
) => {
  if (!personagemData.nome || !personagemData.descricao || !personagemData.imagem_url) {
    const error = new Error("Todos os campos são obrigatórios para atualização.");
    (error as any).status = 400;
    throw error;
  }

  const updatedPersonagem = await updatePersonagemInDb(id, personagemData);

  if (!updatedPersonagem) {
    const error = new Error("Personagem não encontrado.");
    (error as any).status = 404;
    throw error;
  }

  return updatedPersonagem;
};

export const deletarPersonagemService = async (id: string) => {
  const deletedPersonagem = await deletePersonagemFromDb(id);
  if (!deletedPersonagem) {
    const error = new Error("Personagem não encontrado.");
    (error as any).status = 404;
    throw error;
  }
};

interface BuscarPersonagemParams {
  nome?: string;
}

interface BuscarPersonagensParams {
  nome?: string;
  descricao?: string;
}

export const buscarPersonagensService = async (params: BuscarPersonagensParams) => {
  const personagens = await buscarPersonagens(params.nome, params.descricao);

  if (!personagens || personagens.length === 0) {
    const error = new Error("Nenhum Personagem foi encontrado.");
    (error as any).status = 404;
    throw error;
  }

  return personagens;
};