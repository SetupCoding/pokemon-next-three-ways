import { Card, Col, Container, FormControl, Row } from "react-bootstrap";

import Head from "next/head";
import Link from "next/link";
import { Pokemon } from "../models/pokemon.model";
import useDebouncedCallback from "../hooks/useDebounceCallback";
import { useQuery } from "react-query";
import { useState } from "react";

const getPokemon = async (_, query): Promise<Pokemon[]> => {
  const res = await fetch(`/api/search?q=${escape(query)}`);
  const data = (await res.json()) as Pokemon[];
  return data.map((pokemon) => ({
    ...pokemon,
    image: `/pokemon/${pokemon.name.english
      .toLowerCase()
      .replace(" ", "-")}.jpg`,
  }));
};

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  const { data } = useQuery(["q", debouncedQuery], getPokemon);

  const queryPokemon = useDebouncedCallback(
    (e) => {
      setQuery(e.target.value);
    },
    (e) => {
      setDebouncedQuery(e.target.value);
    },
    200
  );

  return (
    <div className="container">
      <Head>
        <title>Pokemon!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <FormControl
          placeholder="Search"
          aria-label="Search"
          value={query}
          onChange={queryPokemon}
        />
        {data && (
          <Row>
            {data.map(({ id, name, type, image }) => (
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
                        <Card.Title>{name.english}</Card.Title>
                        <Card.Subtitle>{type.join(", ")}</Card.Subtitle>
                      </Card.Body>
                    </Card>
                  </a>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;
