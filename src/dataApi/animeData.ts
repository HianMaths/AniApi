import db from "../db/knexfile";

export function buscarAnimePorId(animeId:string){
    return db("animes").where({ id: animeId }).first();
};