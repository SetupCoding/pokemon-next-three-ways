import { Card, Col } from "react-bootstrap";

import Link from "next/link";
import { Pokemon } from "../models/pokemon.model";
import React from "react";

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
    <Col xs={4} key={id} style={{ padding: 5 }}>
      <Link href={`/pokemon/${id}`}>
        <a>
          <Card style={{ cursor: "pointer" }}>
            <Card.Img
              variant="top"
              src={image}
              alt={`Image of ${name.english}`}
              style={{ height: 300, objectFit: "contain" }}
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
