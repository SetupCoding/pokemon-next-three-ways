import { Card, Col } from "react-bootstrap";

import Link from "next/link";
import { Pokemon } from "../models/pokemon.model";
import React from "react";
import c from "./pokemon-card.module.css";

type Props = Pokemon & {
  pokemonCount: number;
};

export const PokemonCard: React.FC<Props> = ({
  id,
  name,
  type,
  image,
  pokemonCount,
}) => {
  const getNumberWithZeros = (id: number) =>
    `${Array(
      pokemonCount ? pokemonCount.toString().length - id.toString().length : 0
    )
      .fill("0")
      .join("")}${id}`;
  return (
    <Col xs={4} key={id} className={c.cardWrapper}>
      <Link href={`/pokemon/${id}`}>
        <a>
          <Card className={c.card}>
            <Card.Img
              variant="top"
              src={image}
              alt={`Image of ${name.english}`}
              className={c.cardImage}
            />
            <Card.Body>
              <Card.Title>{`Nr.${getNumberWithZeros(id)} - ${
                name.english
              }`}</Card.Title>
              <Card.Subtitle>{type.join(", ")}</Card.Subtitle>
            </Card.Body>
          </Card>
        </a>
      </Link>
    </Col>
  );
};
