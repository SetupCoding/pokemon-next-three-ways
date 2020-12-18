import { PokemonCard } from "../components";
import { PokemonType } from "../models/pokemon.model";
import React from "react";
import { testSnapshot } from "../utils/testUtils";

describe("<PokemonCard />", () => {
  const props = {
    id: 100,
    name: {
      english: "Voltorb",
      japanese: "ビリリダマ",
      chinese: "霹雳电球",
      french: "Voltorbe",
    },
    type: ["Electric"] as PokemonType[],
    image: `/pokemon/voltorb.png`,
    base: {
      HP: 40,
      Attack: 30,
      Defense: 50,
      "Sp. Attack": 55,
      "Sp. Defense": 55,
      Speed: 100,
    },
  };
  it("renders the PokemonCard component correctly", () => {
    testSnapshot(<PokemonCard {...props} />);
  });
});
