import { Pokemon } from "../models/pokemon.model";
import PokemonDetails from "../pages/pokemon/[id]";
import React from "react";
import { testSnapshot } from "../utils/testUtils";

describe("<PokemonDetails />", () => {
  it("renders the PokemonDetails component correctly", () => {
    const data: Pokemon = {
      id: 1,
      name: {
        english: "Bulbasaur",
        japanese: "フシギダネ",
        chinese: "妙蛙种子",
        french: "Bulbizarre",
      },
      type: ["Grass", "Poison"],
      base: {
        HP: 45,
        Attack: 49,
        Defense: 49,
        "Sp. Attack": 65,
        "Sp. Defense": 65,
        Speed: 45,
      },
    };
    testSnapshot(<PokemonDetails data={data} />);
  });
});
