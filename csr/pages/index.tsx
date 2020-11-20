import { Card, Col, Container, FormControl, Row } from "react-bootstrap";
import { ErrorComponent, Loading } from "../components";
import { useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";
import { Pokemon } from "../models/pokemon.model";
import { handleErrors } from "../utils/handleErrors";
import useDebouncedCallback from "../hooks/useDebounceCallback";
import { useQuery } from "react-query";

const getPokemon = async (_, query): Promise<Pokemon[]> => {
  const res = await fetch(`/api/search?q=${escape(query)}`);
  const data = await handleErrors(res);
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
  const [pokemonCount, setPokemonCount] = useState(0);
  const { data, error, isFetching } = useQuery(
    ["q", debouncedQuery],
    getPokemon
  );

  useEffect(() => {
    data &&
      setPokemonCount((prev) => (data.length > prev ? data.length : prev));
  }, [data]);

  const queryPokemon = useDebouncedCallback(
    (e) => {
      setQuery(e.target.value);
    },
    (e) => {
      setDebouncedQuery(e.target.value);
    },
    300
  );

  const getNumberWithZeros = (id: number) =>
    `${Array(
      pokemonCount ? pokemonCount.toString().length - id.toString().length : 0
    )
      .fill("0")
      .join("")}${id}`;

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
                        <Card.Title>{`Nr.${getNumberWithZeros(id)} - ${
                          name.english
                        }`}</Card.Title>
                        <Card.Subtitle>{type.join(", ")}</Card.Subtitle>
                      </Card.Body>
                    </Card>
                  </a>
                </Link>
              </Col>
            ))}
          </Row>
        )}
        <Loading isLoading={isFetching} />
        <ErrorComponent error={error} />
      </Container>
    </div>
  );
};

export default Home;
