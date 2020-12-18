import { Pokemon } from "../models/pokemon.model";
import PokemonList from "../pages/index";
import React from "react";
import { testSnapshot } from "../utils/testUtils";

describe("<PokemonList />", () => {
  const pokemon: Pokemon[] = [
    {
      id: 1,
      name: {
        english: "Bulbasaur",
        japanese: "フシギダネ",
        chinese: "妙蛙种子",
        french: "Bulbizarre",
      },
      type: ["Grass", "Poison"],
      image: `/pokemon/bulbasaur.png`,
      base: {
        HP: 45,
        Attack: 49,
        Defense: 49,
        "Sp. Attack": 65,
        "Sp. Defense": 65,
        Speed: 45,
      },
    },

    {
      id: 2,
      name: {
        english: "Ivysaur",
        japanese: "フシギソウ",
        chinese: "妙蛙草",
        french: "Herbizarre",
      },
      type: ["Grass", "Poison"],
      image: `/pokemon/ivysaur.png`,
      base: {
        HP: 60,
        Attack: 62,
        Defense: 63,
        "Sp. Attack": 80,
        "Sp. Defense": 80,
        Speed: 60,
      },
    },
    {
      id: 3,
      name: {
        english: "Venusaur",
        japanese: "フシギバナ",
        chinese: "妙蛙花",
        french: "Florizarre",
      },
      type: ["Grass", "Poison"],
      image: `/pokemon/venusaur.png`,
      base: {
        HP: 80,
        Attack: 82,
        Defense: 83,
        "Sp. Attack": 100,
        "Sp. Defense": 100,
        Speed: 80,
      },
    },
  ];

  it("renders the PokemonList component", () => {
    testSnapshot(<PokemonList data={pokemon} />);
  });
});
