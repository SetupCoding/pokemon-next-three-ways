import { HOST_URL } from "../constants/const";
import { Pokemon } from "../models/pokemon.model";

export const addImage = (pokemon: Pokemon) => ({
  ...pokemon,
  image: `/pokemon/${pokemon.name.english.toLowerCase().replace(" ", "-")}.jpg`,
});

export const enhanceDataWithImages = (
  data: Omit<Pokemon, "image">[]
): Pokemon[] => data.map((pokemon) => addImage(pokemon));
