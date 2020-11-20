import { Card, Col, Container, FormControl, Row } from "react-bootstrap";

import Head from "next/head";
import Link from "next/link";
import { useQuery } from "react-query";
import { useState } from "react";

const getPokemon = async (key, q) => {
  const res = await fetch(`/api/search?q=${escape(q)}`);
  const data = await res.json();
  return data.map((pokemon) => ({
    ...pokemon,
    image: `/pokemon/${pokemon.name.english
      .toLowerCase()
      .replace(" ", "-")}.jpg`,
  }));
};

const Home = () => {
  const [query, setQuery] = useState("");
  const { data } = useQuery(["q", query], getPokemon);

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
          onChange={(evt) => setQuery(evt.target.value)}
        />
        {data && (
          <Row>
            {data.map(({ id, name, type, image }) => (
              <Col xs={4} key={id} style={{ padding: 5 }}>
                <Link href={`/pokemon/${name.english}`}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={image}
                      style={{ maxHeight: 300 }}
                    />
                    <Card.Body>
                      <Card.Title>{name.english}</Card.Title>
                      <Card.Subtitle>{type.join(", ")}</Card.Subtitle>
                    </Card.Body>
                  </Card>
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