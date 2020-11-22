import { HOST_URL } from "../constants/const";
import { Pokemon } from "../models/pokemon.model";

export const enhanceDataWithImages = (
    data: Omit<Pokemon, "image">[],
    withHostUrl?: boolean
  ): Pokemon[] =>
    data.map((pokemon) => ({
      ...pokemon,
      image: `${
        withHostUrl ? HOST_URL : ""
      }/pokemon/${pokemon.name.english.toLowerCase().replace(" ", "-")}.jpg`,
    }));