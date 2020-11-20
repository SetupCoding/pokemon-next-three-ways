import { Col, Container, Row } from "react-bootstrap";

import Head from "next/head";
import Link from "next/link";
import { Pokemon } from "../../models/pokemon.model";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

const getPokemon = async (_, id): Promise<Pokemon> => {
  const res = await fetch(`/api/pokemon?id=${escape(id)}`);
  const data = (await res.json()) as Pokemon;
  return data;
};

const PokemonDetails = () => {
  const router = useRouter();
  const { data } = useQuery(["id", router.query.id], getPokemon);
  return (
    <div>
      <Head>
        <title>{(data && data.name.english) || "Pokemon"}</title>
      </Head>
      <Link href="/">
        <a>{"<"}</a>
      </Link>
      <Container>
        {data && (
          <>
            <h1>{data.name.english}</h1>
            <Row>
              <Col xs={4}>
                <img
                  src={`/pokemon/${data.name.english
                    .toLowerCase()
                    .replace(" ", "-")}.jpg`}
                  style={{
                    width: "100%",
                  }}
                />
              </Col>
              <Col xs={8}>
                {Object.entries(data.base).map(([key, value]) => (
                  <Row key={key}>
                    <Col xs={2}>{key}</Col>
                    <Col xs={10}>{value}</Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default PokemonDetails;
