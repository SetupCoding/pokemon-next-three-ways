import { Col, Container, Row } from "react-bootstrap";

import Head from "next/head";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

const getPokemon = async (key, name) => {
  const { data } = await axios.get(`/api/pokemon?name=${escape(name)}`);
  return data;
};

const PokemonDetails = () => {
  const router = useRouter();
  const { data } = useQuery(["name", router.query.name], getPokemon);
  return (
    <div>
      <Head>
        <title>{(data && data.name.english) || "Pokemon"}</title>
      </Head>
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
